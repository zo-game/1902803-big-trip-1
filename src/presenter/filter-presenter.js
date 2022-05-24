import { remove, render, renderPosition, replace} from '../render';
import FilterView from '../view/filter-view';
import { FilterType, UpdateType } from '../utils/const';
//можно удалить
export default class FilterPresenter{
    #filterContainer = null;
    #filterComponent = null;
    #currentFilterType = FilterType.EVERYTHING;
    #filterModel = null;


    constructor(filterContainer, filterModel){
      this.#filterContainer = filterContainer;
      this.#filterModel = filterModel;


      this.#filterModel.addObserver(this.#handleModelEvent);
    }

    get filters(){

      return [
        FilterType.EVERYTHING,
        FilterType.FUTURE,
        FilterType.PAST
      ];
    }

    init(){
      // const filters = this.filters;
      const prevFilterComponent = this.#filterComponent;

      this.#filterComponent = new FilterView(this.#currentFilterType);
      this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

      if(prevFilterComponent === null){
        render(this.#filterContainer, this.#filterComponent, renderPosition.BEFOREEND);
      }

      // replace(this.#filterComponent, prevFilterComponent);
      // remove(prevFilterComponent);
    }

    #handleModelEvent = ()=>{
      this.init();
    }

    #handleFilterTypeChange = (filterType)=>{
      if(this.#filterModel.filter === filterType){
        return;
      }

      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }


}
