import SortView from '../view/sort-view';
import PointListView from '../view/point-list-view';
import MessageWithoutPoints from '../view/empty-points-list';
import { remove, render, renderPosition } from '../render.js';
import PointPresenter from './point-presenter';
import { filters } from '../utils/filter';
import HeaderInfoView from '../view/header-info-view';
// import MessageWithoutPoints from '../view/empty-points-list';

import { SortType, sortPointsByPrice, sortPointsByTime, sortPointsByDate, UpdateAction, UpdateType, FilterType } from '../utils/const';


export default class TripPresenter {
  #tripContainer = null;
  #headerMenuContainer = null;

  #noPointsComponent = new MessageWithoutPoints();
  #sortComponent = null;
  #pointListComponent = new PointListView();
  #pointModel = null;
  #filterModel = null;

  #pointPresenter = new Map();
  #currentSortType = null;
  constructor(tripContainer, pointsModel, headerMenu, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointsModel;
    this.#headerMenuContainer = headerMenu;
    this.#filterModel = filterModel;
  }


  init = () => {
    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);
    this.#renderBoard(true);
    this.#pointModel.addObserver(this.#handleModeEvent);
    this.#filterModel.addObserver(this.#handleModeEvent);


  }

  get points(){
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filters[filterType](points);
    switch(this.#currentSortType){
      case SortType.PRICE.text:
        return filteredPoints.sort(sortPointsByPrice);
        // return [...this.#pointModel.points].sort(sortPointsByPrice);
      case SortType.TIME.text:
        // return [...this.#pointModel.points].sort(sortPointsByTime);
        return filteredPoints.sort(sortPointsByTime);
      case SortType.DAY.text:
        // return [...this.#pointModel.points].sort(sortPointsByDate);
        return filteredPoints.sort(sortPointsByDate);
    }
    return filteredPoints;
    // return this.#pointModel.points;
  }

  #handleViewAction = (actionType, updateType, update) =>{
    switch(actionType){
      case UpdateAction.UPDATE_TASK:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UpdateAction.ADD_TASK:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UpdateAction.DELETE_TASK:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModeEvent = (updateType, data = null) => {
    switch(updateType){
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  // #infoViewComponent = null;
  #renderHeaderInfo = () =>{
    if (this.points.length !== 0) {
      // this.#infoViewComponent = new HeaderInfoView(this.points[0]);
      render(this.#headerMenuContainer, new HeaderInfoView(this.points[0]).element, renderPosition.AFTERBEGIN);
    }
    else {
      // this.#infoViewComponent = new MessageWithoutPoints();
      render(this.#tripContainer, new MessageWithoutPoints().element, renderPosition.AFTERBEGIN);
    }
  }


  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handleModeEvent, this.#handleViewAction);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);

  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#handleModeEvent(UpdateType.MINOR);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortChangeClickHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, renderPosition.AFTERBEGIN);
  }


  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent, renderPosition.BEFOREEND);
  }

  #renderPoints = (points) => {
    points
      .forEach((point) => this.#renderPoint(point));
  }

  #renderBoard = (isFullRendering = false) => {
    if (this.#pointModel.length === 0) {
      this.#renderNoPoints();
      return;
    }
    if(this.#currentSortType === null){
      this.#currentSortType = SortType.DAY;
    }
    if(isFullRendering){
      this.#renderHeaderInfo();
    }

    this.#renderSort();
    this.#renderPoints(this.points);
  }

  #clearBoard = ({resetSortType = false} = {}) => {

    if(resetSortType){
      this.#currentSortType = SortType.DAY;
    }

    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy()
    );
    this.#pointPresenter.clear();

    // if(isFullClearing){
    //   remove(this.#infoViewComponent);
    // }

    remove(this.#noPointsComponent);
    remove(this.#sortComponent);

  }
}
