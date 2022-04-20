import HeaderInfoView from './view/header-info-view';
import SiteMenuView from './view/site-menu-view';
import FilterView from './view/filter-view';
import { render, renderPosition } from './render';
import { generatePoint } from './mock/point';
import TripPresenter from './presenter/Trip-presenter';


const POINT_COUNT = 4;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');


const tripPresenter = new TripPresenter(mainContainer);

if (points.length !== 0) {
  render(headerMenu, new HeaderInfoView(points[0]).element, renderPosition.AFTERBEGIN);
}

render(siteMenuElement, new SiteMenuView(), renderPosition.BEFOREEND);
render(filtersElement, new FilterView(), renderPosition.BEFOREEND);


tripPresenter.init(points);
