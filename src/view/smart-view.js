import AbstractView from './abstract-view';
import { generateDescription,  generatePictures, isEqualCities, servises} from '../mock/point';

export default class SmartView extends AbstractView{
    _data = {};
    #pointType = null;

    updateData = (update, justDataUpdating) => {
      if(!update){
        return;
      }
      this._data = { ...this._data, ...update};
      if(justDataUpdating){
        return;
      }

      this.updateElement();
    }

    updateElement = () =>{
      const prevElement = this.element;
      const parent = prevElement.parentElement;
      this.removeElement();

      const newElement = this.element;
      parent.replaceChild(newElement, prevElement);
      this.renderOffers(this.#pointType);

      this.#restoreHandlers();
    }

    #restoreHandlers = ()=>{
      this.setFormClickHandler();
      this.setFormSubmitHandler(this._callback.formSubmit);
      this.setEditDestinationForm();
    }

    setFormClickHandler = () =>{
      (this.element.querySelectorAll('.event__type-input'))
        .forEach((element) => {
          element.addEventListener('click', this.#updateClickHandler);
        });
    }

    setEditDestinationForm = () =>{
      this.element.querySelector('.event__input--destination')
        .addEventListener('input', this.#updateDestinationHandler);
    }

    #updateDestinationHandler = (evt) =>{
      evt.preventDefault();
      if(isEqualCities(evt.target.value)){
        this.updateData({destination : evt.target.value, destinationInfo : {description: generateDescription(),
          pictures : generatePictures()}}, false);
      }
    }

    #updateClickHandler = (evt) =>{
      evt.preventDefault();
      this.#pointType = evt.target.value;
      this.updateData({pointType : this.#pointType}, false);
      // this.renderOffers(this.#pointType);
    }

    renderOffers = (point) =>{
      const count = servises[point].length;
      const offers = this.element.querySelectorAll('.event__offer-selector');
      for(let i = count; i < 5; i++){
        offers[i].classList.add('visually-hidden');
      }
      for(let i = 0; i < count; i++){
        offers[i].classList.remove('visually-hidden');
      }
    }

}
