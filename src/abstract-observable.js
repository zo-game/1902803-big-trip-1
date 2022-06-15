export default class AbstractObservable{
    #observers = new Set();

    addObserver(observer){
      this.#observers.add(observer);
    }

    removeObserver(observers){
      this.#observers.delete(observers);
    }

    _notify(event, payload){
      this.#observers.forEach((observer)=>observer(event, payload));
    }
}
