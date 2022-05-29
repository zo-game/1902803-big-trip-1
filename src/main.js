import SiteMenuView from './view/site-menu-view';
import { render, renderPosition } from './render';
import { generatePoint } from './mock/point';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
// import FilterModel from './model/filter-model';
import { MenuItem } from './utils/const';
// import StatisticView from './view/statisticView';

const POINT_COUNT = 4;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');
const pointModel = new PointModel();
pointModel.points = points;
const tripPresenter = new TripPresenter(mainContainer, pointModel, headerMenu, filtersElement);
const siteMenuComponent = new SiteMenuView();
let currentTab = null;

tripPresenter.init(pointModel.points);
render(siteMenuElement, siteMenuComponent, renderPosition.BEFOREEND);

const handlePointFormClose = () => {
  siteMenuComponent.element.querySelector( `[value=${MenuItem.STATS}]`).classList.add('visually-hidden');
  siteMenuComponent.element.querySelector( `[value=${MenuItem.TABLE}]`).classList.add('visually-hidden');
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
  handlePointFormClose();
});


const handleSiteMenuClick = (menuItem) => {
  switch(menuItem){
    case MenuItem.STATS:
      if(currentTab !== MenuItem.STATS){
        siteMenuComponent.setMenuItem(MenuItem.STATS);
        tripPresenter.createStatistic();
        tripPresenter.destroy();
        currentTab = MenuItem.STATS;
      }
      break;
    case MenuItem.TABLE:
      if(currentTab !== MenuItem.TABLE){
        siteMenuComponent.setMenuItem(MenuItem.TABLE);
        tripPresenter.deleteStatistic();
        tripPresenter.init(false);
        currentTab = MenuItem.TABLE;
      }
      break;
    // case MenuItem.ADD_NEW_EVENT:
    //   remove(statisticComponent);
    //   tripPresenter.destroy();
    //   tripPresenter.init();
    //   tripPresenter.createPoint();
    //   break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);


