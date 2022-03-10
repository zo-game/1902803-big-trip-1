import { getRandomInteger } from "./event";

const getRandomImages = () => {
    const images = [];    
    for(let i = 0; i < 5; i++){
        images.push(`http://picsum.photos/248/152?r=${Math.random()}`);
    }
    return images;
}

const generateTitle = (key) => {
    const titles = 
    {
        'taxi':'Taxi Amsterdam',
        'flight':'Flight Chamonix',
        'drive':'Drive Chamonix',
        'check-in':'Check-in Chamonix',
        'sightseeing':'Sightseeing Chamonix'
    }       
    
    if (titles.hasOwnProperty(key)) 
    {
        return titles[key];
    }
    else 
    {
        return titles['taxi'];
    }
}

const generateIcon = (key) => {
    const iconArray = {
        'taxi':'img/icons/taxi.png',
        'flight':'img/icons/flight.png',
        'drive':"img/icons/drive.png",
        'check-in':'img/icons/check-in.png',
        'sightseeing':"img/icons/sightseeing.png"
    }

    return iconArray[key];
}
export const generateTicket = () => {
    const orderType = generateOrderType();
    return {
        eventIcon : generateIcon(orderType),
        eventTitle : generateTitle(orderType),
        imgIndexes : getRandomImages()      
    }    
}

