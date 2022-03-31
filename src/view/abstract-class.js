import { createElement } from '../utils/render';

export default class AbstractClass {
    #element = null;
    _callback = {};

    get element(){
      if(!this.#element){
        this.#element = createElement(this.template);
      }

      return this.#element;
    }

    get template(){
      throw('метод tempalte не реализован у наследника');
    }

    removeElement(){
      this.#element = null;
    }
}
