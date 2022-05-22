import { render, renderPosition} from '../render';
import FilterView from '../view/filter-view';
import { FilterType } from '../utils/const';

export default class FilterPresenter{
    #filterContainer = null;
    #filterComponent = null;
    #currentFilterType = FilterType.EVERYTHING;
    #pointModel = null;
    #filterModel = null;


    constructor(filterContainer){
      this.#filterContainer = filterContainer;
    }

    init(){
      this.#filterComponent = new FilterView(this.#currentFilterType);
      render(this.#filterContainer, this.#filterComponent, renderPosition.BEFOREEND);
    }
}
