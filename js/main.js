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
  1,
  2,
  3,
  100
];

var ADVERT_APARTMENT = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

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
      address: locationX + ', ' + locationY,
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

var advertVariants = [];
for (var k = 0; k < ADVERT_COUNT; k++) {
  advertVariants[k] = getAdvert(k + 1);
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
  fragment.appendChild(renderPin(advertVariants[i]));
}

var pins = document.querySelector('.map__pins');
pins.appendChild(fragment);

var cardTemplate = document.querySelector('#card')
.content
.querySelector('.map__card');

var renderCard = function (advertisment) {

  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advertisment.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisment.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advertisment.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ADVERT_APARTMENT[advertisment.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = advertisment.offer.rooms + ' комнаты для ' + advertisment.offer.rooms + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisment.offer.checkin + ' выезд до ' + advertisment.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advertisment.offer.description;

  var featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (var q = 0; q < advertisment.offer.features.length; q++) {
    var featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature', 'popup__feature--' + advertisment.offer.features[q]);
    featuresList.appendChild(featuresElement);
  }

  var cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  for (var j = 0; j < advertisment.offer.photos.length; j++) {
    var photosElement = document.createElement('img');
    photosElement.classList.add('popup__photo' + advertisment.offer.photos[j]);
    photosElement.src = advertisment.offer.photos[j];
    photosElement.width = '45';
    photosElement.height = '40';
    photosElement.alt = 'Фотография жилья';
    cardPhotos.appendChild(photosElement);
  }

  cardElement.querySelector('.popup__avatar').src = advertisment.author.avatar;

  return cardElement;
};

var card = document.createDocumentFragment();
card.appendChild(renderCard(advertVariants[0]));
document.querySelector('.map').insertBefore(card, document.querySelector('.map__filters-container'));

