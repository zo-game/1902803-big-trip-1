import SiteMenuView from './view/site-menu-view';
import { render, renderPosition } from './render';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import { MenuItem } from './utils/const';
import ApiService from './api-service';


const AUTHORIZATION = 'Basic sdf90dfsjk3dnkl3sd';

const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');
const pointModel = new PointModel(new ApiService(END_POINT, AUTHORIZATION));

const siteMenuComponent = new SiteMenuView();
let currentTab = MenuItem.TABLE;
const tripPresenter = new TripPresenter(mainContainer, pointModel, headerMenu, filtersElement);
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
        tripPresenter.init(true);
        currentTab = MenuItem.TABLE;
      }
      break;
  }
};

tripPresenter.init();
pointModel.init().finally(()=>{
  render(siteMenuElement, siteMenuComponent, renderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});


