import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

export const isEqualCities = (inputValue) =>{
  const cities = ['Moscow', 'Berlin', 'Prague', 'Perm',
    'Geneva', 'Chamonix', 'Amsterdam', 'Ekaterinburg','Kyiv', 'Paris'];
  return cities.some((city) => city === inputValue);
};

const createOffer = (cost, name) => ({price: cost, description : name});
export const servises = {
  'taxi' : [createOffer(30, 'Add luggage'),
    createOffer(100, 'Switch to comfort class')],
  'bus' : [createOffer(20, 'Add luggage'), createOffer(10, 'Add meal'), createOffer(100, 'Switch to comfort class')],
  'train':[createOffer(25, 'Add luggage'), createOffer(15, 'Add a bed'), createOffer(15, 'Choose seats')],
  'ship':[createOffer(25, 'Add luggage'), createOffer(15, 'Add a bed'), createOffer(100, 'Switch to comfort class')],
  'drive':[createOffer(25, 'Add luggage'), createOffer(15, 'Add meal'), createOffer(100, 'Switch to comfort class')],
  'flight': [createOffer(30, 'Add luggage'), createOffer(15, 'Choose seats'), createOffer(100, 'Switch to comfort class')],
  'check-in': [createOffer(30, ' Smoking room'), createOffer(100, ' VIP hall')],
  'sightseeing': [createOffer(50, 'guide'), createOffer(100, 'Rent a car')],
  'restaurant' : [createOffer(30, ' Smoking room'), createOffer(100, ' VIP hall')]
};
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  ];

  return description.slice(0, getRandomIntInclusive(1, 5));
};

const generatePointType = () => {
  const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  return pointTypes[getRandomIntInclusive(0, pointTypes.length - 1)];
};

const generateDestinationCity = () => {
  const cities = ['Ekaterinburg', 'Moscow', 'Perm', 'Kyiv', 'Paris', 'Prague', 'Amsterdam'];

  return cities[getRandomIntInclusive(0, cities.length - 1)];
};

const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < getRandomIntInclusive(0, 5); i++) {
    offers.push({ id: i, title: 'example title', price: getRandomIntInclusive(10, 100) });
  }

  return offers;
};

export const generatePictures = () => {
  const picturesSrc = [];
  for (let i = 0; i <= 4; i++) {
    picturesSrc.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return picturesSrc;
};

const getTimePeriod = (waitingTime) => {
  const randomHour = getRandomIntInclusive(9, 23);
  const startRandomMinute = getRandomIntInclusive(0, 11) * 10;
  const startPeriod = new Date();
  startPeriod.setHours(randomHour, startRandomMinute);
  const endPeriod = new Date();
  endPeriod.setHours(startPeriod.getHours());
  endPeriod.setMinutes(startPeriod.getMinutes() + waitingTime);
  return [`${startPeriod.getHours()}:${startPeriod.getMinutes()}`, `${endPeriod.getHours()}:${endPeriod.getMinutes()}`];
};

const getDate = ()=>{
  const randomMonth = getRandomIntInclusive(0, 12);
  const randomDay = getRandomIntInclusive(0, 28);
  const day = dayjs(`2022-${randomMonth}-${randomDay}`);

  return day;
};

const getWaitingTime = () => {
  const randomNumber = getRandomIntInclusive(1, 24);
  return randomNumber * 5;
};

export const generatePoint = () => {
  const pointType = generatePointType();
  const waitingTime = getWaitingTime();
  const date = getDate();
  return {
    pointType,
    id: nanoid(),
    price: getRandomIntInclusive(5, 200),
    destination: generateDestinationCity(),
    offer: {
      type: pointType,
      offers: generateOffers(),
    },
    destinationInfo: {
      description: generateDescription(),
      pictures: generatePictures()
    },
    isFavorite: false,
    waitingTime: waitingTime,
    period: getTimePeriod(waitingTime),
    offersForm : servises[pointType],
    dateStartEvent: date,
    dateEndEvent: date,
    formatDate: date.format('DD MMM'),
    month : date.format('M')
  };
};


