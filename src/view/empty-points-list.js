import AbstractView from './abstract-view.js';

const createEmptyList = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class MessageWithoutPoints extends AbstractView{
  get template() {
    return createEmptyList();
  }
}
