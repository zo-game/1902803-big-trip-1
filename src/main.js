import HeaderInfoView from './view/header-info-view';
import SiteMenuView from './view/site-menu-view';
import FilterView from './view/filter-view';
import { render, renderPosition } from './render';
import { generatePoint } from './mock/point';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';

const POINT_COUNT = 4;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');

const pointModel = new PointModel();
pointModel.points = points;


// const tripPresenter = new TripPresenter(mainContainer);
const tripPresenter = new TripPresenter(mainContainer, pointModel);

if (points.length !== 0) {
  render(headerMenu, new HeaderInfoView(points[0]).element, renderPosition.AFTERBEGIN);
}

render(siteMenuElement, new SiteMenuView(), renderPosition.BEFOREEND);
render(filtersElement, new FilterView(), renderPosition.BEFOREEND);


tripPresenter.init(points);
