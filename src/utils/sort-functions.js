export const SortType = {
  DAY: { text: 'day', checked: true },
  TIME: { text: 'time', checked: false },
  PRICE: { text: 'price', checked: false }
};

export const sortPointsByTime = (pointA, pointB) => pointB.waitingTime - pointA.waitingTime;

export const sortPointsByPrice = (pointA, pointB) => pointB.price - pointA.price;
