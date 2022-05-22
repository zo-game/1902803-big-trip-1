import AbstractView from './abstract-view.js';
import { createElement } from '../render.js';

// const createEmptyList = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';
const createEmptyList =() => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class MessageWithoutPoints extends AbstractView{
  #element = null;
  get template() {
    return createEmptyList();
  }

  get element(){
    if(this.#element === null){
      this.#element =  createElement(this.template);
    }

    return this.#element;
  }
}
