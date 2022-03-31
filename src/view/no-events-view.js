import AbstractClass from './abstract-class';

const createNoTripEventTemplate = () => (
  `<p class="trip-events__msg">
        Click New Event to create your first point
    </p>`
);
export default class NoTripEventElement extends AbstractClass{
  get template(){
    return createNoTripEventTemplate();
  }
}
