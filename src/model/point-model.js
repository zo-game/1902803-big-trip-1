import AbstractObservable from '../abstract-observable';
import dayjs from 'dayjs';
import { UpdateType } from '../utils/const';


export default class PointModel extends AbstractObservable{
    #points = [];
    #apiService = null;

    constructor(apiService){
      super();
      this.#apiService = apiService;
    }

    get points(){
      return this.#points;
    }

    init = async () => {
      try{
        const points = await this.#apiService.points;

        this.#points = points.map(this.#adaptToClient);
      }
      catch(err){
        this.#points = [];
      }
      console.log(this.#points);
      this._notify(UpdateType.INIT);
    }

    updatePoint = async (updateType, update)=>{
      const index = this.#points.findIndex((point)=>point.id === update.id);

      if(index === -1){
        throw new Error('Can\'t update unexisting point');
      }

      try{
        const response = await this.#apiService.updatePoint(update);
        const updatedPoint = this.#adaptToClient(response);


        this.#points =[
          ...this.#points.slice(0, index),
          updatedPoint,
          ...this.#points.slice(index + 1)
        ];

        this._notify(updateType, updatedPoint);
      }catch(err){
        // console.log(err);
        return new Error('Cant Update this element');
      }

      // this.#points =[
      //   ...this.#points.slice(0, index),
      //   update,
      //   ...this.#points.slice(index + 1)
      // ];

      // this._notify(updateType, update);

    }

    addPoint = async (updateType, update) => {
      try{
        const response = await this.#apiService.addPoint(update);
        const newPoint = this.#adaptToClient(response);
        this.#points = [newPoint, ...this.#points];
        this._notify(updateType, newPoint);
      } catch(err){
        throw new Error('Cant add point');
      }
      // this._notify(updateType, update);//
    }

    // addPoint = (updateType, update) => {
    //   this.#points = [update, ...this.#points];

    //   this._notify(updateType, update);
    // }

    // deletePoint = (updateType, update) => {
    //   const index = this.#points.findIndex((point) => point.id === update.id);

    //   if(index === -1){
    //     throw new Error('Cant delete unexisting point');
    //   }

    //   this.#points = [
    //     ...this.#points.slice(0, index),
    //     ...this.#points.slice(index + 1),
    //   ];

    //   this._notify(updateType);
    // }
    deletePoint = async (updateType, update) => {
      const index = this.#points.findIndex((point) => point.id === update.id);

      if(index === -1){
        throw new Error('Cant delete unexisting point');
      }

      try{
        await this.#apiService.deletePoint(update);
        this.#points = [
          ...this.#points.slice(0, index),
          ...this.#points.slice(index + 1),
        ];
        this._notify(updateType);
      }catch(err){
        throw new Error('Cant delete point');
      }
    }

    #adaptToClient = (point) => {
      const adaptedPoint = {
        ...point,
        dateStartEvent: dayjs(point['date_from']),
        dateEndEvent: dayjs(point['date_to']),
        period: [dayjs(point['date_from']).format('HH:mm'), dayjs(point['date_to']).format('HH:mm')],
        price: point['base_price'],
        pointType: point['type'],
        isFavorite: point['is_favorite'],
        destinationInfo: {
          description:  point['destination']['description'],
          pictures: point['destination']['pictures'],
        },
        destination: point['destination']['name'],
        offer: {
          offers: point['offers'],
          type: point['type'],
        },
        formatDate: dayjs(point['date_from']).format('DD MMM'),
        waitingTime: Math.round(((dayjs(point['date_to'])).diff(dayjs(point['date_from'])))
        / 60000)
      };

      delete adaptedPoint['date_from'];
      delete adaptedPoint['type'];
      delete adaptedPoint['offers'];

      delete adaptedPoint['is_favorite'];
      delete adaptedPoint['base_price'];
      delete adaptedPoint['date_to'];

      return adaptedPoint;
    }
}


