import { createElement } from '../render';

const createSiteMenuTemplate = () => (
  `<div class="trip-controls__navigation"><h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav></div>`
);

export default class SiteMenuView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createSiteMenuTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
