import { FilterType } from './const';
import dayjs from 'dayjs';

const isPointFuture =(p)=>{
  const today = dayjs();
  const dateDifference = today.diff(p.dateStartEvent);
  if(dateDifference <= 0){
    return true;
  }

  return false;
};

const isPointPast =(p)=>{
  const today = dayjs();
  const dateDifference = today.diff(p.dateEndEvent);
  if(dateDifference > 0){
    return true;
  }

  return false;
};

export const filters = {
  [FilterType.EVERYTHING]: (points) => points.filter(() => true),
  [FilterType.FUTURE]: (points) => points.filter((point)=> isPointFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point)=> isPointPast(point))
};


