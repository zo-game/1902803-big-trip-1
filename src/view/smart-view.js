import AbstractView from './abstract-view';
import { generateDescription,  generatePictures, isEqualCities, servises} from '../mock/point';
import { nanoid } from 'nanoid';

export default class SmartView extends AbstractView{
    _data = {};
    _pointType = null;
    initialData = null;


    reset = (point) =>{
      this.updateData({...point,
        destination : point.destination,
        destinationInfo : {description: point.destinationInfo.description,
          pictures : point.destinationInfo.pictures},
        id: nanoid()});
      this.renderOffers(point.pointType);
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
          pictures : generatePictures()}});
      }
    }

    #updateClickHandler = (evt) =>{
      evt.preventDefault();
      this._pointType = evt.target.value;
      this.updateData({pointType : this._pointType});
    }

    renderOffers = (pointDestination) =>{
      const count = servises[pointDestination].length;
      const offers = this.element.querySelectorAll('.event__offer-selector');
      for(let i = 0; i < 3; i++){
        offers[i].classList.add('visually-hidden');
      }
      for(let i = 0; i < count; i++){
        offers[i].classList.remove('visually-hidden');
      }
    }

}
