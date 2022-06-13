import AbstractView from './abstract-view.js';
import { FilterType } from '../utils/const.js';
import { filters } from '../utils/filter';


const createFilterTemplate = ( currentFilterType, isFilterDisabled, isFiltersDisabled) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}"  ${currentFilterType === FilterType.FUTURE ? 'checked' : ''} ${isFilterDisabled || isFiltersDisabled.filterFuture ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${currentFilterType === FilterType.PAST ? 'checked' : ''} ${isFilterDisabled || isFiltersDisabled.filterPast ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form> `);

export default class FilterView extends AbstractView {
  #newPointPresenter = null;
  #currentFilter = null;
  #pointModel = null;
  constructor(currentFilterType, newPointPresenter, pointModel){
    super();
    this.#newPointPresenter = newPointPresenter;
    this.#currentFilter = currentFilterType;
    this.#pointModel = pointModel;
  }

  get template() {
    const points = this.#pointModel.points;
    const pointsFuture = filters[FilterType.FUTURE](points);
    const pointsPast = filters[FilterType.PAST](points);
    const isFiltersDisabled = {
      filterFuture : pointsFuture.length === 0,
      filterPast : pointsPast.length === 0,
    };
    // console.log(isFiltersDisabled);
    // console.log(pointsPast);

    return createFilterTemplate(this.#currentFilter, this.#newPointPresenter.isFilterDisabled, isFiltersDisabled);
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
