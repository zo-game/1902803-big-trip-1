import AbstractView from './abstract-view.js';
import { FilterType } from '../utils/const.js';


const createFilterTemplate = ( currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}"  ${currentFilterType === FilterType.FUTURE ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${currentFilterType === FilterType.PAST ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form> `);

export default class FilterView extends AbstractView {
  // #filters = null;
  #currentFilter = null;
  constructor(currentFilterType){
    super();

    // this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) =>{
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) =>{
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
