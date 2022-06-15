import AbstractView from './abstract-view.js';
import he from 'he';

const formatTime = (timeInMinute) => {
  const days = Math.floor(timeInMinute / 1440) === 0 ? '' : `${Math.floor(timeInMinute / 1440)}D`;
  const hours = Math.floor((timeInMinute % 1440) / 60) === 0 ? '' : `${Math.floor((timeInMinute % 1440) / 60)}H`;
  const minutesRemainder = (timeInMinute % 1440) % 60;

  return [days, hours, minutesRemainder];
};

const createPointTemplate = (point) => {
  const {pointType, price, destination, isFavorite, waitingTime, period, formatDate, offer} = point;
  const time = formatTime(waitingTime);
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';
  let checkedOfferList = '';
  offer.offers.forEach((currentOffer) => {
    checkedOfferList += `${currentOffer.isChecked ? currentOffer.title : ''} ${currentOffer.isChecked ? `&plus; ${currentOffer.price } &euro;&nbsp; <br>` : ''}`;
  });


  return `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="2019-03-18">${formatDate}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${pointType} ${he.encode(destination)}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${period[0]}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${period[1]}</time>
            </p>
            <p class="event__duration">${time[0]} ${time[1]} ${time[2]}M</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            <li class="event__offer">
              <span class="event__offer-title"></span>
              ${checkedOfferList}
              <span class="event__offer-price"></span>
            </li>
          </ul>
          <button class="${favoriteClassName}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
`;
};


export default class PointView extends AbstractView{
  #point = null;
  #pointModel = null;

  constructor(point, pointModel) {
    super();
    this.#point = point;
    this.#pointModel = pointModel;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  setFormResetHandler = (callback) => {
    this._callback.formReset = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetClickHandler);
  }

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
