import {createElement} from '../render.js';

const createHeaderInfoTemplate = (pointStart) => {
  const {destination} = pointStart;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destination} &mdash; Chamonix</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;
};
export default class HeaderInfoView {
  #element = null;
  #pointStart = null;

  constructor (pointStart) {
    this.#pointStart = pointStart;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createHeaderInfoTemplate(this.#pointStart);
  }

  removeElement() {
    this.#element = null;
  }
}
