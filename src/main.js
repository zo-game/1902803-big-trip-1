import SiteMenuView from './view/site-menu-view';
// import FilterView from './view/filter-view';
import { render, renderPosition } from './render';
import { generatePoint } from './mock/point';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';

import HeaderInfoView from './view/header-info-view';
// import MessageWithoutPoints from './view/empty-points-list';

const POINT_COUNT = 4;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');

const pointModel = new PointModel();
const filterModel = new FilterModel();

pointModel.points = points;

const tripPresenter = new TripPresenter(mainContainer, pointModel, headerMenu);


const filterPresenter = new FilterPresenter(filtersElement);

render(siteMenuElement, new SiteMenuView(), renderPosition.BEFOREEND);

filterPresenter.init();
tripPresenter.init(points);
