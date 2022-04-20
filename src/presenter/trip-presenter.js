import SortView from '../view/sort-view';
import PointListView from '../view/point-list-view';
import MessageWithoutPoints from '../view/empty-points-list';
import { render, renderPosition } from '../render.js';
import PointPresenter from './Point-presenter';
import { updateItem } from '../common';

import { SortType, sortPointsByPrice, sortPointsByTime } from '../utils/sort-functions';


export default class TripPresenter {
  #tripContainer = null;

  #noPointsComponent = new MessageWithoutPoints();
  #sortComponent = new SortView();
  #pointListComponent = new PointListView();


  #boardPoints = [];
  #pointPresenter = new Map();
  #sourceBoardPoints = [];
  #currentSortType = null;

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    this.#sourceBoardPoints = [...boardPoints];

    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((element) => element.resetView());
  }

  #handlePointChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE.text:
        this.#boardPoints.sort(sortPointsByPrice);
        break;
      case SortType.TIME.text:
        this.#boardPoints.sort(sortPointsByTime);
        break;
      default:
        this.#boardPoints = [...this.#sourceBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#boardPoints
      .forEach((boardPoint) => this.#renderPoint(boardPoint));
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, renderPosition.AFTERBEGIN);
    this.#sortComponent.setSortChengeClickHandler(this.#handleSortTypeChange);
  }


  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent, renderPosition.BEFOREEND);
  }

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPoints();

  }
}
