import SmartView from './smart-view';
import { servises } from '../mock/point';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import he from 'he';


const createOfferForm = (point) => {
  const {pointType, destination, destinationInfo, dateStartEvent, dateEndEvent, price} = point;
  const startEventTime = dayjs(dateStartEvent).format('DD/MM/YY H:m');
  const endEventTime = dayjs(dateEndEvent).format('DD/MM/YY H:m');
  const offersForm = servises[point.pointType];

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input ${pointType === 'taxi' ? 'checked' : ''} id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'bus' ? 'checked' : ''} id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'train' ? 'checked' : ''} id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'ship' ? 'checked' : ''} id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'drive' ? 'checked' : ''} id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'flight' ? 'checked' : ''} id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" >
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'check-in' ? 'checked' : ''} id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'sightseeing' ? 'checked' : ''} id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input ${pointType === 'restaurant' ? 'checked' : ''} id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${pointType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination)}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Moscow"></option>
              <option value="Perm"></option>
              <option value="Prague"></option>
              </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startEventTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endEventTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                <label class="event__offer-label" for="event-offer-luggage-1">
                  <span class="event__offer-title">${offersForm[0].description}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offersForm[0].price}</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                <label class="event__offer-label" for="event-offer-comfort-1">
                  <span class="event__offer-title">${offersForm[1].description}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offersForm[1].price}</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                <label class="event__offer-label" for="event-offer-meal-1">
                  <span class="event__offer-title">${(offersForm.length === 2) ? 'Restaurant' : offersForm[2].description}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${(offersForm.length === 2) ? '50' : offersForm[2].price}</span>
                </label>
              </div>
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationInfo.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                <img class="event__photo" src="${destinationInfo.pictures[0]}" alt="Event photo">
                <img class="event__photo" src="${destinationInfo.pictures[1]}" alt="Event photo">
                <img class="event__photo" src="${destinationInfo.pictures[2]}" alt="Event photo">
                <img class="event__photo" src="${destinationInfo.pictures[3]}" alt="Event photo">
                <img class="event__photo" src="${destinationInfo.pictures[4]}" alt="Event photo">
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`;
};

export default class OfferFormView extends SmartView {
  #datepicker = null;

  constructor(point) {
    super();

    this._data = point;
    this.initialData = point;
    this._pointType = point.pointType;
    this.renderOffers(point.pointType);

    this.#setEditPriceForm();
    this.setFormClickHandler();
    this.setEditDestinationForm();
    this.#setDatePikcker();
    this.setFormSubmitHandler();
  }

  get template() {
    return createOfferForm(this._data);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormDeleteHandler = (callback) =>{
    this._callback.formDelete = callback;
    this.element.querySelector('.event--edit').addEventListener('click', this.#formDeleteHandler);
    // this.element.querySelector('.event__reset-btn').addEventListener('submit', this.#formDeleteHandler);
  }

  #formDeleteHandler = (evt) =>{
    evt.preventDefault();
    // this.removeElement();
    this._callback.formDelete(this._data);
  }

  #setEditPriceForm = () => {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#updatePriceHandler);
  }

  #updatePriceHandler = (evt) => {
    evt.preventDefault();
    const priceValue = this.element.querySelector('.event__input--price').value;
    this.updateData({price : priceValue});
  }

  #setDatePikcker = () => {
    this.#setDatePickerStart();
    this.#setDatePickerEnd();
  }

  #setDatePickerStart =()=>{
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        onchange: this.#dueDateStartChangeHandler,
        defaultDate: this._data.dateStartEvent,
        // eslint-disable-next-line camelcase
        time_24hr: true,
      }
    );
  }

  #setDatePickerEnd =()=>{
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        onchange: this.#dueDateEndChangeHandler,
        // eslint-disable-next-line camelcase
        time_24hr: true,
      }
    );
  }

  #dueDateEndChangeHandler = ([userDate]) => {
    this.updateData({
      dateEndEvent: userDate,
    });
  }

  #dueDateStartChangeHandler = ([userDate]) => {
    this.updateData({
      dateStartEvent: userDate,
    });
  }

  removeElement =() =>{
    super.removeElement();

    if(this.#datepicker){
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  updateElement = () =>{
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);
    this.renderOffers(this._pointType);

    this._restoreHandlers();
  }

  _restoreHandlers = () => {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickHandler();
    this.setEditDestinationForm();
    this.#setEditPriceForm();
    this.#setDatePikcker();
  }

  updateData = (update) => {
    if(!update){
      return;
    }
    this._data = { ...this._data, ...update};
    this.updateElement();
  }


}
