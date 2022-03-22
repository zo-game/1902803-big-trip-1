import SiteMenuView from './view/site-menu-view';
import TicketTemplate from './view/site-ticket-view';
import SiteFiltersView from './view/site-filter-view';
import TripEventView from './view/site-events-view';
import TripEditEventView from './view/site-edit-events-view';
import { RenderPosition, render as render } from './render.js';
import { generateEvent } from './mock/event';
import ControlsTemplate from './view/trip-controls-template';
import NoTripEventElement from './view/no-events-view';

const eventCount = 8;
const events = Array.from({length: eventCount}, generateEvent);

const renderTripEvent = (eventTripListElement, tripEvent) => {
  const tripEventComponent = new TripEventView(tripEvent);
  const eventEditComponent = new TripEditEventView(tripEvent);

  const replaceCardToForm = () => {
    eventTripListElement.replaceChild(eventEditComponent.element, tripEventComponent.element);
  };
  const replaceFormToCard = () => {
    eventTripListElement.replaceChild(tripEventComponent.element, eventEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc'){
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  tripEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  eventEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  return render(eventTripListElement, tripEventComponent.element, RenderPosition.BEFOREEND);
};
const tripBody = document.querySelector('.page-body');

const tripControls = tripBody.querySelector('.trip-main');
const controlsTemplate = new ControlsTemplate();

render(tripControls, controlsTemplate.element, RenderPosition.BEFOREEND);
render(controlsTemplate.element, new SiteMenuView().element, RenderPosition.AFTERBEGIN);

const renderBoard = (boardTemplate, boardEvents) => {

  if(boardEvents.every((event) => event.isArchive)){
    render(boardTemplate, new NoTripEventElement().element, RenderPosition.AFTERBEGIN);
    return;
  }

  render(boardTemplate, new TicketTemplate(events[0]).element, RenderPosition.AFTERBEGIN);

  const tripEvents = tripBody.querySelector('.trip-events');
  for(let i = 0; i < eventCount; i++){
    renderTripEvent(tripEvents, events[i]);
  }

};
const siteMain = tripBody.querySelector('.page-main');
renderBoard(siteMain,events);

const tripFilters = tripBody.querySelector('.trip-controls__filters');
render(tripFilters, new SiteFiltersView().element, RenderPosition.BEFOREEND);
