import AbstractObservable from '../abstract-observable';

export default class PointModel extends AbstractObservable{
    #points = [];

    set points(points){
      this.#points = points;
    }

    get points(){
      return this.#points;
    }
}
