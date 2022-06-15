import AbstractView from './abstract-view.js';
import { createElement } from '../render.js';
import { FilterType } from '../utils/const.js';

const NoPointTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyList = (filterType) =>
{
  const textType = NoPointTextType[filterType];
  return `<p class="trip-events__msg">${textType}</p>`;
};


export default class MessageWithoutPoints extends AbstractView{
  #element = null;
  _data = null;
  constructor(data){
    super();
    this._data = data;
  }

  get template() {
    return createEmptyList(this._data);
  }

  get element(){
    if(this.#element === null){
      this.#element =  createElement(this.template);
    }

    return this.#element;
  }
}
