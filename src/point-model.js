import AbstractObservable from './utils/abstract-observable';

export default class PointsModel extends AbstractObservable{
    #points = []

    set points(points){
      this.#points = [...points];
    }

    get points(){
      return this.#points;
    }
}
