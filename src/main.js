import { createSiteMenuTemplate } from "./view/site-menu-view";
import { createEventsTemlate } from "./view/site-events-view";
import { createFilterTemlate } from "./view/site-filter-view";
import { renderTemplate, RenderPosition } from './render.js';

const tripBody = document.querySelector('.page-body');


const tripEvents = tripBody.querySelector('.trip-events');

const tripNavigation = tripBody.querySelector('.trip-controls__navigation');

const tripFilters = tripBody.querySelector('.trip-controls__filters');

renderTemplate(tripFilters, createFilterTemlate(), RenderPosition.BEFOREEND);
renderTemplate(tripNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEvents, createEventsTemlate(), RenderPosition.BEFOREEND);


