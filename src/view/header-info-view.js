import {createElement} from '../render.js';
import AbstractView from './abstract-view.js';

const createHeaderInfoTemplate = (points) => {
  const firstPoint = points[0];
  const secondPoint = points[points.length - 1];
  let middlePoint = null;

  if(points.length === 3){
    middlePoint = `${points[1].destination  }&mdash;`;
  }
  else if(points.length > 3){
    middlePoint = '... &mdash;';
  }
  else{
    middlePoint = '';
  }
  const wholePrice = points.reduce((sum, point) => sum + point.price, 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${firstPoint.destination} &mdash; ${middlePoint } ${secondPoint.destination}</h1>

      <p class="trip-info__dates">${firstPoint.dateStartEvent.format('MMM')} ${firstPoint.dateStartEvent.format('DD')}&nbsp;&mdash;&nbsp;${secondPoint.dateStartEvent.format('MMM')} ${secondPoint.dateStartEvent.format('DD')}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${wholePrice}</span>
    </p>
  </section>`;
};
export default class HeaderInfoView extends AbstractView{
  #element = null;
  #points = null;

  constructor (points) {
    super();
    this.#points = points;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points);
  }

  removeElement() {
    this.#element = null;
  }
}
