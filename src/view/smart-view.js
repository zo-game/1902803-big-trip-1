import AbstractView from './abstract-view';
import { nanoid } from 'nanoid';

export default class SmartView extends AbstractView{
    _data = {};
    _pointType = null;
    initialData = null;


    reset = (point) =>{
      this.updateData({...point,
        destination : point.destination,
        destinationInfo : {description: point.destinationInfo.description,
          pictures : point.destinationInfo.pictures},
        id: nanoid()});
    }

}
