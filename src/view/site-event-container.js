import AbstractClass from './abstract-class';

export const createEventContainer = () => '<div class="trip-events__list"></div>';

export default class EventContainer extends AbstractClass
{
  get template() {
    return createEventContainer();
  }
}
