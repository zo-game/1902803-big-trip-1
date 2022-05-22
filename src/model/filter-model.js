import AbstractObservable from '../abstract-observable';
import { FilterType } from '../utils/const';

export default class FilterModel extends AbstractObservable{
    #filter = null;

    get filter(){
      return this.#filter;
    }

    setFilter(filter, updateType){
      this.#filter = filter;
      this._notify(updateType, filter);
    }
}
