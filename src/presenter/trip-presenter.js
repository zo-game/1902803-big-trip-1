import SortView from '../view/sort-view';
import PointListView from '../view/point-list-view';
import MessageWithoutPoints from '../view/empty-points-list';
import { remove, render, renderPosition } from '../render.js';
import PointPresenter from './point-presenter';
import { filters } from '../utils/filter';
import HeaderInfoView from '../view/header-info-view';
import FilterView from '../view/filter-view';
import NewPointPresenter from './new-point-presenter';
import { generatePoint } from '../mock/point';
import StatisticView from '../view/statistic-view';

import { SortType, sortPointsByPrice, sortPointsByTime, sortPointsByDate, UpdateAction, UpdateType, FilterType } from '../utils/const';


export default class TripPresenter {
  #tripContainer = null;
  #headerMenuContainer = null;

  #currentFilter = FilterType.EVERYTHING;
  #noPointsComponent = new MessageWithoutPoints(this.#currentFilter);
  #sortComponent = null;
  #pointListComponent = new PointListView();
  #pointModel = null;
  #statisticComponent = null;

  #filterContainer = null;
  #filterComponent = null;

  #newPointPresenter = null;

  #pointPresenter = new Map();
  #currentSortType = null;
  constructor(tripContainer, pointsModel, headerMenu, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointsModel;
    this.#filterContainer = filterContainer;
    this.#headerMenuContainer = headerMenu;
    this.#newPointPresenter = new NewPointPresenter(this.#pointListComponent,  this.#handleViewAction, this.#pointPresenter);

  }

  init = (isFirstRendering = true) => {
    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);
    this.#renderBoard(isFirstRendering, true);
    this.#pointModel.addObserver(this.#handleModeEvent);
  }

  createStatistic = () =>{
    this.#statisticComponent = new StatisticView(this.#pointModel.points);
    render(this.#tripContainer, this.#statisticComponent, renderPosition.BEFOREBEGIN);
  }

  deleteStatistic = () =>{
    remove(this.#statisticComponent);
  }

  destroy = () => {
    this.#clearBoard(true, true);
    this.#pointModel.removeObserver(this.#handleModeEvent);
  }

  get points(){
    const filterType = this.#currentFilter;

    const filteredPoints = filters[filterType](this.#pointModel.points);
    switch(this.#currentSortType){
      case SortType.PRICE.text:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME.text:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.DAY.text:
        return filteredPoints.sort(sortPointsByDate);
    }
    return filteredPoints;
  }

  #handleViewAction = (actionType, updateType, update) =>{
    switch(actionType){
      case UpdateAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UpdateAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UpdateAction.DELETE_POINT:
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
        this.#clearBoard(true, true);
        this.#renderBoard(false, true);
        break;
    }
  }

  #headerInfoComponent = null;
  #renderHeaderInfo = () => {
    if (this.points.length !== 0) {
      this.#headerInfoComponent = new HeaderInfoView(this.points[0]).element;
      render(this.#headerMenuContainer, this.#headerInfoComponent, renderPosition.AFTERBEGIN);
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handleViewAction);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handleModeChange = () =>{
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#handleModeEvent(UpdateType.MINOR);
  }

  #renderNoPoints = () => {
    this.#noPointsComponent = new MessageWithoutPoints(this.#currentFilter);
    render(this.#tripContainer, this.#noPointsComponent, renderPosition.BEFOREEND);
  }

  #renderPoints = (points) => {
    points
      .forEach((point) => this.#renderPoint(point));
  }

  #renderBoard = (isFirstRendering = false, isMajor = false) => {

    if(this.#currentSortType === null){
      this.#currentSortType = SortType.DAY;
    }
    if(this.#currentFilter === null){
      this.#currentFilter = FilterType.EVERYTHING;
    }
    if(isFirstRendering){
      this.#renderHeaderInfo();

    }
    if(this.points.length === 0){
      this.#renderNoPoints();
    }
    if(isMajor){
      this.#renderFilter();
    }
    this.#renderSort();
    this.#renderPoints(this.points);
  }

  #clearBoard = ({resetSortType = false} = {}, isMajor = false) => {

    if(resetSortType){
      this.#currentSortType = SortType.DAY;
    }

    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy()
    );
    if(isMajor){
      remove(this.#filterComponent);
      this.#filterComponent = null;
    }

    this.#headerInfoComponent = null;
    remove(this.#noPointsComponent);
    remove(this.#sortComponent);
  }

  #renderFilter = () =>{
    this.#filterComponent = new FilterView(this.#currentFilter, this.#newPointPresenter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterChange);
    render(this.#filterContainer, this.#filterComponent, renderPosition.BEFOREEND);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortChangeClickHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, renderPosition.AFTERBEGIN);
  }

  #handleFilterChange = (filterType) =>{
    if(this.#currentFilter === filterType){
      return;
    }
    this.#currentFilter = filterType;
    this.#handleModeEvent(UpdateType.MINOR);
  }

  createPoint = () => {
    this.#newPointPresenter.isFilterDisabled = true;
    this.#currentSortType = null;
    this.#currentFilter = null;
    remove(this.#statisticComponent);
    this.#handleModeEvent(UpdateType.MAJOR);

    const point = generatePoint();
    this.#newPointPresenter.init(point);
  }
  //

}


