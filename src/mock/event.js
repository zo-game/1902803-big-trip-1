import dayjs from 'dayjs';

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateOrderType = () => {
  const titles = [
    'taxi',
    'flight',
    'drive',
    'check-in',
    'sightseeing'];
  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};


const generateTitle = (key) => {
  const titles =
    {
      'taxi':'Taxi Amsterdam',
      'flight':'Flight Chamonix',
      'drive':'Drive Chamonix',
      'check-in':'Check-in Chamonix',
      'sightseeing':'Sightseeing Chamonix'
    };
  //   if (titles.hasOwnProperty(key))
  if (key in titles)
  {
    return titles[key];
  }
  else
  {
    return titles['taxi'];
  }
};

const generateIcon = (key) => {
  const iconArray = {
    'taxi':'img/icons/taxi.png',
    'flight':'img/icons/flight.png',
    'drive':'img/icons/drive.png',
    'check-in':'img/icons/check-in.png',
    'sightseeing':'img/icons/sightseeing.png'
  };

  return iconArray[key];
};


const generateCost = () =>{
  const randomNumber = getRandomInteger(1, 60);
  const cost = randomNumber * 5;
  return (cost);
};

const getFavoriteEvent = () => {
  const bollearnArray = [false, true];
  const randomIndex = getRandomInteger(0,1);

  return bollearnArray[randomIndex];
};

const getDate = () =>{
  const randomNumber = getRandomInteger(0, 180);

  return dayjs().add(randomNumber, 'day').format('MMM DD');
};

const getWaitingTime = () =>
{
  const randomNumber = getRandomInteger(1, 24);
  return randomNumber * 5;
};

const getTimePeriod = (waitingTime) =>
{
  const randomHour = getRandomInteger(9, 23);
  const startRandomMinute = getRandomInteger(0, 11) * 5;
  const startPeriod = new Date();
  startPeriod.setHours(randomHour, startRandomMinute);
  const endPeriod = new Date();
  endPeriod.setHours(startPeriod.getHours());
  endPeriod.setMinutes(startPeriod.getMinutes() + waitingTime);
  return [`${startPeriod.getHours()}:${startPeriod.getMinutes()}`, `${endPeriod.getHours()}:${endPeriod.getMinutes()}`];
};

const generateServises = (key) =>{
  const servises = {
    'taxi':'Order Uber',
    'flight':'Add luggage',
    'drive':'Rent a car',
    'check-in':'Add breakfast',
    'sightseeing':'Book tickets'
  };
  return servises[key];
};

export const generateCostServise = (key) =>
{
  const serviseCost = {
    'taxi':'€  20',
    'flight':'€  50',
    'drive':'€  200',
    'check-in':'€  50',
    'sightseeing':'€  40'
  };
  return serviseCost[key];
};

const getRandomImages = () => {
  const imagesIndexes = [];
  for(let i = 0; i < 5; i++){
    imagesIndexes.push(`http://picsum.photos/248/152?r=${Math.random() * 20}`);
  }
  return imagesIndexes;
};

export const generateEvent = () => {
  const orderType = generateOrderType();
  const waitingTime = getWaitingTime();
  return {data : getDate(),eventIcon : generateIcon(orderType),eventTitle : generateTitle(orderType),periodTime : getTimePeriod(waitingTime),waitingTime : `${waitingTime}M`,eventCost : generateCost(),eventServises : generateServises(orderType),serviseCost : generateCostServise(orderType),isFavorite : getFavoriteEvent(),    imgIndexes : getRandomImages() };
};

