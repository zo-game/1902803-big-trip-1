import { createElement } from '../render';

const createNoTripEventTemplate = () => (
  `<p class="trip-events__msg">
        Click New Event to create your first point
    </p>`
);

export default class NoTripEventElement{
    #element = null;

    get element(){
      if(!this.#element){
        this.#element = createElement(this.template);
      }

      return this.#element;
    }

    get template(){
      return createNoTripEventTemplate();
    }

    removeElement(){
      this.#element = null;
    }
}
