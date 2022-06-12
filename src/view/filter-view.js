import AbstractView from './abstract-view.js';
import { FilterType } from '../utils/const.js';
import { filters } from '../utils/filter';


const createFilterTemplate = (currentFilterType, isFilterDisabled, isFiltersDisable) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}"  ${currentFilterType === FilterType.FUTURE ? 'checked' : ''} ${isFilterDisabled || isFiltersDisable.isFutureDisable ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${currentFilterType === FilterType.PAST ? 'checked' : ''} ${isFilterDisabled || isFiltersDisable.isPastDisable ? 'disabled' : ''}>
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
    const filteredPoints = this.#getFilteredPoints();
    const isFiltersDisable = {
      isFutureDisable : filteredPoints[0].length === 0,
      isPastDisable : filteredPoints[1].length === 0
    };
    return createFilterTemplate(this.#currentFilter, this.#newPointPresenter.isFilterDisabled, isFiltersDisable);
  }

  setFilterTypeChangeHandler = (callback) =>{
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) =>{
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  #getFilteredPoints = () => {
    const filteredPoints = [];
    const points = this.#pointModel.points;
    filteredPoints.push(filters[FilterType.FUTURE](points));
    filteredPoints.push(filters[FilterType.PAST](points));
    return filteredPoints;
  }
}
