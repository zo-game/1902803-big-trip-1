import { createElement } from '../render';

const createControlsTemplate = () => ('<div class=\'trip-main__trip-controls\'></div>');

export default class ControlsTemplate {
    #element = null;

    get element() {
      if(!this.#element) {
        this.#element = createElement(this.template);
      }

      return this.#element;
    }

    get template(){
      return createControlsTemplate();
    }

    removeElement() {
      this.#element = null;
    }
}
