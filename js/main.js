'use strict';

var ADVERT_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var ADVERT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var ADVERT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var ADVERT_ROOMS = [
  '1 комната',
  '2 комнаты',
  '3 комнаты',
  '100 комнат'
];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var ADVERT_COUNT = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItemFromArray(arr) {
  return arr[getRandom(0, arr.length - 1)];
}

function getRandomLengthArray(array) {
  var tempArray = [];
  var isExist = false;

  for (var i = 0; i < getRandom(1, array.length); i++) {
    tempArray[i] = getRandomItemFromArray(array);

    for (var j = 0; j < i; j++) {
      if (tempArray[j] === tempArray[i]) {
        isExist = true;
      }

      if (isExist) {
        --i;
        isExist = false;
      }
    }
  }
  return tempArray;
}

function getAdvert(avatarNumber) {
  var locationX = getRandom(0, map.offsetWidth);
  var locationY = getRandom(130, 630);

  if (avatarNumber < 10) {
    avatarNumber = '0' + avatarNumber;
  }
  return {
    author: {
      avatar: 'img/avatars/user' + avatarNumber + '.png'
    },
    offer: {
      title: 'Заголовок предложения',
      address: locationX + ',' + locationY,
      price: getRandom(100, 5000),
      type: getRandomItemFromArray(ADVERT_TYPE),
      rooms: getRandomItemFromArray(ADVERT_ROOMS),
      guests: getRandom(0, 3),
      checkin: getRandomItemFromArray(CHECK_TIME),
      checkout: getRandomItemFromArray(CHECK_TIME),
      features: getRandomLengthArray(ADVERT_FEATURES),
      description: 'Любой текст',
      photos: getRandomLengthArray(ADVERT_PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY
    },
  };
}

var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var renderPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = advert.location.y - PIN_HEIGHT + 'px';

  var pinImg = pinElement.querySelector('img');

  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ADVERT_COUNT; i++) {
  fragment.appendChild(renderPin(getAdvert(i + 1)));
}

var pins = document.querySelector('.map__pins');
pins.appendChild(fragment);
