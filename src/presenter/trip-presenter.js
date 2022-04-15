import NoTripEventElement from '../view/no-events-view';
import EventContainer from '../view/site-event-container';
import {render, RenderPosition } from '../utils/render';
import ControlsTemplate from '../view/trip-controls-template';
import SortTicketView from '../view/sort-ticket-view';
import SiteFiltersView from '../view/site-filter-view';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common';

export default class TripPresenter {
    #tripComponent = null;
    #tripControlsComponent = null;
    #tripFiltersComponent = null;

    #noTripComponent = new NoTripEventElement();
    #controlsTemplate = new ControlsTemplate();
    #sortTicketTemplate = new SortTicketView();
    #siteFiltersTemplate = new SiteFiltersView();
    #firstTicketTemplate = null;

    #pointPresenter = new Map();
    #events = [];

    constructor(tripComponent, tripControlsComponent, tripFiltersComponent){
      this.#tripComponent = tripComponent;
      this.#tripControlsComponent = tripControlsComponent;
      this.#tripFiltersComponent = tripFiltersComponent;
    }

    init = (events) =>{
      this.#events = [...events];
      this.#firstTicketTemplate = new EventContainer();
      this.#renderTrip();
    }

    #renderNoTrip = () =>{
      render(this.#tripComponent, this.#noTripComponent.element, RenderPosition.AFTERBEGIN);
    }

    #renderTripEvent = (event) =>{
      const pointPresenter = new PointPresenter(this.#firstTicketTemplate, this.#handleEventChange);
      pointPresenter.init(event);
      this.#pointPresenter.set(event.id, pointPresenter);
    }

    #renderTripEvents = () =>{
      this.#events
        .forEach((event) => this.#renderTripEvent(event));
    }

    #renderTicketTemplate = () =>{
      render(this.#sortTicketTemplate.element, this.#firstTicketTemplate.element, RenderPosition.BEFOREEND);
    }

    #renderControlsTemplate = () =>{
      render(this.#tripControlsComponent, this.#controlsTemplate.element, RenderPosition.BEFOREEND);
    }

    #renderSortTemplate = () =>{
      render(this.#tripComponent, this.#sortTicketTemplate.element, RenderPosition.BEFOREBEGIN);
    }

    #renderFilters = () =>{
      render(this.#tripFiltersComponent, this.#siteFiltersTemplate.element, RenderPosition.BEFOREEND);
    }

    #renderTopNavbar = ()=>{
      this.#renderControlsTemplate();
      this.#renderFilters();
      this.#renderSortTemplate();
    }

    #renderTrip = () =>{
      if((this.#events.every((event) => event.isArchive))){
        this.#renderNoTrip();
        return;
      }

      this.#renderTopNavbar();
      this.#renderTicketTemplate();
      this.#renderTripEvents();

    }

    #handleEventChange = (updatedEvent) => {
      this.#events = updateItem(this.#events, updatedEvent);
      this.#pointPresenter.get(updatedEvent.id).init(updatedEvent);
    }

    #clearEventsList = () =>{
      this.#pointPresenter.forEach((presenter) => presenter.destroy());
      this.#pointPresenter.clear();
    }
}

