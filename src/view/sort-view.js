import AbstractView from './abstract-view.js';
import { SortType } from '../utils/const.js';

const CreateSortTemplate = (sortType = SortType.DAY) =>
  (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden ${sortType === SortType.DAY.text ? 'board__sort-item--active' : ''}" type="radio" name="trip-sort" data-sort-type="${SortType.DAY.text}" value="sort-day">
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden ${sortType === SortType.DAY.text ? 'board__sort-item--active' : ''}" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.TIME.text}" >
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden ${sortType === SortType.DAY.text ? 'board__sort-item--active' : ''}" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE.text}" >
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>
  `);


export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(sortType){
    super();
    this.#currentSortType = sortType;
  }

  get template() {
    return CreateSortTemplate(this.#currentSortType);
  }

  setSortChangeClickHandler = (callback) => {
    this._callback.sortChange = callback;
    this.element.querySelectorAll('.trip-sort__input').forEach((element) => element.addEventListener('click', this.#SortChangeHandler));
  }

  #SortChangeHandler = (evt) => {
    if (evt.target.checked === true) {
      this._callback.sortChange(evt.target.dataset.sortType);
    }
  }
}
