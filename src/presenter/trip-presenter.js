import SortView from '../view/sort-view';
import { nanoid } from 'nanoid';
import PointListView from '../view/point-list-view';
import MessageWithoutPoints from '../view/empty-points-list';
import { remove, render, renderPosition } from '../render.js';
import PointPresenter from './point-presenter';
import { filters } from '../utils/filter';
import LoadingView from '../view/loading-view';
import HeaderInfoView from '../view/header-info-view';
import FilterView from '../view/filter-view';
import NewPointPresenter from './new-point-presenter';
import StatisticView from '../view/statistic-view';
import { State } from './point-presenter';

import { SortType, sortPointsByPrice, sortPointsByTime, sortPointsByDate, UpdateAction, UpdateType, FilterType } from '../utils/const';
import dayjs from 'dayjs';


export default class TripPresenter {
  #tripContainer = null;
  #headerMenuContainer = null;

  #currentFilter = FilterType.EVERYTHING;
  #noPointsComponent = new MessageWithoutPoints(this.#currentFilter);
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #pointListComponent = new PointListView();
  #pointModel = null;
  #statisticComponent = null;

  #filterContainer = null;
  #filterComponent = null;

  #newPointPresenter = null;
  #isLoading = true;

  #pointPresenter = new Map();
  #currentSortType = null;
  constructor(tripContainer, pointsModel, headerMenu, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointsModel;
    this.#filterContainer = filterContainer;
    this.#headerMenuContainer = headerMenu;
    this.#newPointPresenter = new NewPointPresenter(this.#pointListComponent,  this.#handleViewAction, this.#pointPresenter, this.#pointModel);

    this.#pointModel.addObserver(this.#handleModeEvent);
  }

  init = (isFirstRendering = true) => {
    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);
    this.#renderBoard(isFirstRendering, true);
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

  #handleViewAction = async (actionType, updateType, update) =>{
    switch(actionType){
      case UpdateAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(State.SAVING);
        try{
          await this.#pointModel.updatePoint(updateType, update);
        }
        catch(err){
          this.#pointPresenter(update.id).setViewState(State.ABORTING);
        }
        break;
      case UpdateAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try{
          await this.#pointModel.addPoint(updateType, update);
        }
        catch(err){
          // console.log(err);
        }
        break;
      case UpdateAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(State.DELETING);
        try{
          await this.#pointModel.deletePoint(updateType, update);
        }
        catch(err){
          // console.log(err);
        }
        break;
    }
  }

  #handleModeEvent  =  (updateType, data = null) => {
    switch(updateType){
      case UpdateType.PATCH:
        // console.log(this.#pointPresenter);/
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true, true);
        this.#renderBoard(true, true);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard(true, true);
        this.#renderBoard(true, true);

        break;
    }
  }

  #headerInfoComponent = null;
  #renderHeaderInfo = () => {
    if (this.points.length !== 0) {
      remove(this.#headerInfoComponent);
      // this.#headerInfoComponent = null;
      this.#headerInfoComponent = new HeaderInfoView(this.points);
      render(this.#headerMenuContainer, this.#headerInfoComponent, renderPosition.AFTERBEGIN);
    }
  }

  #renderLoading = () => {
    render(this.#tripContainer, this.#loadingComponent, renderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handleViewAction, this.#handleModeChange, this.#pointModel);
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

  #renderBoard = (isMajor = false, isRenderFilter = true) => {

    if(this.#isLoading){
      this.#renderLoading();
      return;
    }
    if(this.#currentSortType === null){
      this.#currentSortType = SortType.DAY;
    }
    if(this.#currentFilter === null){
      this.#currentFilter = FilterType.EVERYTHING;
    }
    if(this.points.length === 0){
      this.#renderNoPoints();
    }
    if(isMajor){
      this.#renderFilter();
      this.#renderHeaderInfo();
    }
    if(isRenderFilter){
      this.#renderSort();
    }
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

    remove(this.#noPointsComponent);
    remove(this.#sortComponent);
  }

  #renderFilter = () =>{
    this.#filterComponent = new FilterView(this.#currentFilter, this.#newPointPresenter, this.#pointModel);
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

    const point = {
      pointType : 'taxi',
      id: nanoid(),
      price: 110,
      destination: 'Valencia',
      offer: {
        type: 'taxi',
        offers: [
          {id: 0, title: 'Choose the radio station', price: 30},
          {id: 1, title: 'Choose temperature', price: 170},
          {id: 2, title: 'Drive quickly, Im in hurry', price: 100},
        ],
      },
      destinationInfo: {
        description: 'Valencia, a true asian pearl, with crowded streets…street markets with the best street food in Asia.',
        pictures: [{src: 'http://picsum.photos/300/200?r=0.320218355382026',
          description: 'testDescription'}]
      },

      isFavorite: false,
      waitingTime: 100,
      period: ['02:20', '07:30'],
      dateStartEvent: dayjs(new Date()),
      dateEndEvent: dayjs(new Date()),
      formatDate: dayjs(new Date()).format('DD MMM'),
    };
    this.#newPointPresenter.init(point);
  }

}


