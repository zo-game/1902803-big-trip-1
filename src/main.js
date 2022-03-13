import { createSiteMenuTemplate } from "./view/site-menu-view";
import { createTicketTemlate } from "./view/site-ticket-view";
import { createFilterTemlate } from "./view/site-filter-view";
import { createEventsTemplate } from "./view/site-events-view";
import { renderTemplate, RenderPosition } from './render.js';
import { generateEvent } from "./mock/event";

const eventCount = 6;
const events = Array.from({length: eventCount}, generateEvent);

const tripBody = document.querySelector('.page-body');

const tripMenu = tripBody.querySelector('.trip-controls__navigation');
renderTemplate(tripMenu, createSiteMenuTemplate(), RenderPosition.BEFOREEND);

const tripEvents = tripBody.querySelector('.trip-events');
renderTemplate(tripEvents, createTicketTemlate(events[0]), RenderPosition.BEFOREEND);


for(let i = 1; i < eventCount; i++){
    renderTemplate(tripEvents, createEventsTemplate(events[i]), RenderPosition.BEFOREEND);    
}

const tripFilters = tripBody.querySelector('.trip-controls__filters');
renderTemplate(tripFilters, createFilterTemlate(), RenderPosition.BEFOREEND);



