export const SortType = {
  DAY: { text: 'day', checked: true },
  TIME: { text: 'time', checked: false },
  PRICE: { text: 'price', checked: false }
};

export const UpdateAction = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT:'DELETE_TASK',
};

export const UpdateType = {
  PATCH:'PATCH',
  MINOR:'MINOR',
  MAJOR:'MAJOR',
};

export const FilterType ={
  EVERYTHING : 'EVERYTHING',
  FUTURE : 'FUTURE',
  PAST : 'PAST',
};

export const MenuItem = {
  TABLE : 'TABLE',
  STATS : 'STATS',
  ADD_NEW_EVENT : 'ADD_NEW_EVENT'
};

export const sortPointsByTime = (pointA, pointB) => pointB.waitingTime - pointA.waitingTime;

export const sortPointsByPrice = (pointA, pointB) => pointB.price - pointA.price;

export const sortPointsByDate = (pointA, pointB) => pointB.month - pointA.month;
