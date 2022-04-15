import { generateEvent } from './mock/event';
import TripPresenter from './presenter/trip-presenter';

const eventCount = 8;
const events = Array.from({length: eventCount}, generateEvent);
const tripBody = document.querySelector('.page-body');
const tripControls = tripBody.querySelector('.trip-main');
const siteMain = tripBody.querySelector('.page-main');
const tripFilters = tripBody.querySelector('.trip-controls__filters');

const tripPresenterContainer = new TripPresenter(siteMain, tripControls, tripFilters);
tripPresenterContainer.init(events);
