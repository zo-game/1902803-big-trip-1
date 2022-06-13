import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import he from 'he';


const createOfferForm = (point, offers) => {
  const {pointType,
    destination,
    destinationInfo,
    dateStartEvent,
    dateEndEvent,
    price,
    isSaving} = point;
  const startEventTime = dayjs(dateStartEvent).format('DD/MM/YY H:m');
  const endEventTime = dayjs(dateEndEvent).format('DD/MM/YY H:m');
  let picturesList = '';
  destinationInfo.pictures.forEach((picture) => {
    picturesList += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });

  let offersList = '';
  offers.offers.forEach((offer) => {
    offersList += `<div class="${offer === undefined ? 'visually-hidden' : 'event__offer-selector'}">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers.offers.indexOf(offer)}" type="checkbox" name="event-offer-luggage">
    <label class="event__offer-label" for="event-offer-${offers.offers.indexOf(offer)}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      <span class="event__offer-price">${offer.price}</span>
      &euro;&nbsp;
    </label>
  </div>`;
  });

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

          <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers ">
              ${offersList}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationInfo.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${picturesList}
                
                
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`;
};

export default class NewPointView extends SmartView {
  #datepicker = null;
  #pointModel = null;

  constructor(point, pointModel) {
    super();

    this._data = point;
    this.initialData = point;
    this._pointType = point.pointType;
    this.#pointModel = pointModel;

    // this.#setOfferClickHandler();
    this.setFormClickHandler();
    this.setFormSubmitHandler();
    this.#setDatePikcker();
    this.#setDestinationHandler();
  }

  get template() {
    const offers = this.#pointModel.offers.filter((offer) => offer.type === this._data.pointType)[0];

    return createOfferForm(this._data, offers);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#updateForms();
    this._callback.formSubmit(this._data);
  }

  #setDatePikcker = () => {
    this.#setDatePickerStart();
    this.#setDatePickerEnd();
  }

  #setDatePickerStart =()=>{
    const defaultData = this._data.date ? this._data.date.dateStartEvent : '';
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: defaultData,
        onchange: this.#dueDateStartChangeHandler,
        // eslint-disable-next-line camelcase
        time_24hr: true,
      }
    );
  }

  #setDatePickerEnd =()=>{
    const defaultData = this._data.date ? this._data.date.dateEndEvent : '';
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: defaultData,
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

    this._restoreHandlers();
  }

  _restoreHandlers = ()=> {
    this.setFormClickHandler();
    this.setFormDeleteHandler();
    this.#setDatePikcker();
    this.#setDestinationHandler();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  updateData = (update) => {
    if(!update){
      return;
    }
    this._data = { ...this._data, ...update};
    this.updateElement();
  }

  setFormDeleteHandler = (callback) => {
    if(this._callback.formDelete === undefined){
      this._callback.formDelete = callback;
    }
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
  }

  #formDeleteHandler = (evt) =>{
    evt.preventDefault();
    this._callback.formDelete(this._data);
  }

  setFormClickHandler = () =>{
    (this.element.querySelectorAll('.event__type-input'))
      .forEach((element) => {
        element.addEventListener('click', this.#updateClickHandler);
      });
  }

  #updateClickHandler = (evt) =>{
    evt.preventDefault();
    this._pointType = evt.target.value;
    const priceValue = this.element.querySelector('.event__input--price').value;
    const destinationValue = this.element.querySelector('.event__input--destination').value;

    this.updateData({pointType : this._pointType, price : priceValue, destination : destinationValue});
  }

  #updateForms = () =>{
    const priceValue = this.element.querySelector('.event__input--price').value;
    const destinationValue = this.element.querySelector('.event__input--destination').value;
    const timeStart = (this.element.querySelector('#event-start-time-1').value).split('/');
    const timeEnd = (this.element.querySelector('#event-end-time-1').value).split('/');
    const timeStartValue = new Date(`${timeStart[1]}/${timeStart[0]}/${timeStart[2]}`).toISOString();
    const timeEndValue = new Date(`${timeEnd[1]}/${timeEnd[0]}/${timeEnd[2]}`).toISOString();
    this.updateData({...this._data,
      price : priceValue, destination : destinationValue,
      dateStartEvent: timeStartValue, dateEndEvent: timeEndValue});
  }

  #setDestinationHandler = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationHandler);
  }

  #destinationHandler = () => {
    const description = this.element.querySelector('.event__input--destination').value;
    const currentDestination = this.#pointModel.destinations
      .filter((des) => des.name === description)[0];
    this._data = {...this._data, destinationInfo: {
      description: currentDestination.description,
      pictures: currentDestination.pictures
    }};
    this.#updateForms();
  }


}
