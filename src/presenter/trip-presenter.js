import SortView from '../view/sort-view';
import PointListView from '../view/point-list-view';
import MessageWithoutPoints from '../view/empty-points-list';
import { remove, render, renderPosition } from '../render.js';
import PointPresenter from './point-presenter';

import HeaderInfoView from '../view/header-info-view';
// import MessageWithoutPoints from '../view/empty-points-list';

import { SortType, sortPointsByPrice, sortPointsByTime, sortPointsByDate, UpdateAction, UpdateType } from '../utils/const';


export default class TripPresenter {
  #tripContainer = null;
  #headerMenuContainer = null;

  #noPointsComponent = new MessageWithoutPoints();
  #sortComponent = new SortView();
  #pointListComponent = new PointListView();
  #pointModel = null;

  #pointPresenter = new Map();
  #currentSortType = null;
  constructor(tripContainer, pointsModel, headerMenu) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointsModel;
    this.#headerMenuContainer = headerMenu;
  }


  init = () => {
    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);

    this.#renderHeaderInfo();
    this.#renderBoard();
  }

  get points(){
    switch(this.#currentSortType){
      case SortType.PRICE.text:
        return [...this.#pointModel.points].sort(sortPointsByPrice);
      case SortType.TIME.text:
        return [...this.#pointModel.points].sort(sortPointsByTime);
      case SortType.DAY.text:
        return [...this.#pointModel.points].sort(sortPointsByDate);
    }
    return this.#pointModel.points;
  }


  #handleModeChange = () => {
    this.#pointPresenter.forEach((element) => element.resetView());
  }

  #handleViewAction = (actionType, updateType, update) =>{
    // console.log(actionType, updateType, update);

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

  #handleModeEvent = (updateType, data) => {
    // console.log(updateType, data);

    switch(updateType){
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderBoard();
        // this.#pointPresenter.get(data.id).init(data);//добавить минор
        break;
      case UpdateType.MAJOR:
        this.#renderBoard();
        this.#renderHeaderInfo();
        // this.#pointPresenter.get(data.id).init(data);//добавить майор
        break;

    }
  }

  #handlePointChange = (updateAction, updateType, updatePoint) => {
    this.#handleModeEvent(updateType, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderPoints(this.points);
  }

  #renderHeaderInfo = () =>{
    if (this.points.length !== 0) {
      render(this.#headerMenuContainer, new HeaderInfoView(this.points[0]).element, renderPosition.AFTERBEGIN);
    }
    else {
      render(this.#tripContainer, new MessageWithoutPoints().element, renderPosition.AFTERBEGIN);
    }
  }


  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points
      .forEach((point) => this.#renderPoint(point));
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy()
    );
    this.#pointPresenter.clear();

    remove(this.#noPointsComponent);
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, renderPosition.AFTERBEGIN);
    this.#sortComponent.setSortChangeClickHandler(this.#handleSortTypeChange);
  }


  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent, renderPosition.BEFOREEND);
  }

  #renderBoard = () => {
    if (this.#pointModel.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPoints(this.#pointModel.points);
  }
}
