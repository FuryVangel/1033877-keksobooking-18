'use strict';

// ============ ПЕРЕМЕННЫЕ-КОНСТАНТЫ > ============ //

var ROOMS_VS_GUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var ADVERT_MIN_PRICE = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

var ADVERT_TYPE = [
  'bungalo',
  'palace',
  'flat',
  'house'
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
  0
];

var ADVERT_APARTMENT = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65 + 22;

var ADVERT_COUNT = 8;

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var disabledStatusForm = true;

var map = document.querySelector('.map');

// ============ < ПЕРЕМЕННЫЕ-КОНСТАНТЫ ============ //


// ============ ФУНКЦИИ > ============ //

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItemFromArray(arr) {
  return arr[getRandom(0, arr.length - 1)];
}

function getRandomLengthArray(array) {
  var tempArray = [];
  array.sort(function () {
    return Math.random() - 0.5;
  });

  for (var i = 0; i < getRandom(1, array.length); i++) {
    tempArray[i] = array[i];
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

var renderPin = function (advert) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = advert.location.y - PIN_HEIGHT + 'px';

  var pinImg = pinElement.querySelector('img');

  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;

  return pinElement;
};

var renderCard = function (advertisment) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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
  for (var i = 0; i < advertisment.offer.features.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature', 'popup__feature--' + advertisment.offer.features[i]);
    featuresList.appendChild(featuresElement);
  }

  var cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  for (var j = 0; j < advertisment.offer.photos.length; j++) {
    var photosElement = document.createElement('img');
    photosElement.classList.add('popup__photo');
    photosElement.src = advertisment.offer.photos[j];
    photosElement.width = '45';
    photosElement.height = '40';
    photosElement.alt = 'Фотография жилья';
    cardPhotos.appendChild(photosElement);
  }

  cardElement.querySelector('.popup__avatar').src = advertisment.author.avatar;

  return cardElement;
};

function mapVisible() {
  map.classList.remove('map--faded');

  var pins = document.querySelector('.map__pins');
  pins.appendChild(mapFragments);

  setAddressInput((MAIN_PIN_WIDTH / 2), MAIN_PIN_HEIGHT);
}

function setAddressInput(x, y) {
  document.querySelector('#address')
  .value = (parseInt(mainPin.style.left, 10) + x) + ', ' + (parseInt(mainPin.style.top, 10) + y);
}

function adFormDisabled(status) {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFiltersFormFieldset = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
  mapFiltersFormFieldset.forEach(function (item) {
    item.disabled = status;
  });

  if (!status) {
    adForm.classList.toggle('ad-form--disabled');
  }
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = status;
  }
  disabledStatusForm = !status;
}

var mapRender = function () {
  if (!disabledStatusForm) {
    adFormDisabled(disabledStatusForm);
    mapVisible();
  }
};

var adFormTypeValidity = function () {
  for (var key in ADVERT_APARTMENT) {
    if (adFormType.value === key) {
      adFormPrice.placeholder = ADVERT_MIN_PRICE[key];
      adFormPrice.min = ADVERT_MIN_PRICE[key];
    }
  }
};

var adFormRoomNumberValidity = function () {
  var tempArray = ROOMS_VS_GUESTS[adFormRoomNumber.value];
  for (var i = 0; i < adFormCapacity.length; i++) {
    adFormCapacity[i].disabled = true;
    for (var j = 0; j < tempArray.length; j++) {
      if (+adFormCapacity[i].value === tempArray[j]) {
        adFormCapacity[i].disabled = false;
      }
    }
  }
};

var adFormTimeValidity = function (shiftTimeIn, shiftTimeOut) {
  for (var i = 0; i < CHECK_TIME.length; i++) {
    if (shiftTimeIn.value === CHECK_TIME[i]) {
      shiftTimeOut.value = CHECK_TIME[i];
    }
  }
};

// ============ < ФУНКЦИИ ============ //


// ============ ОБРАБОТЧИКИ СОБЫТИЙ и ПЕРЕМЕННЫЕ-DOM-ЭЛЕМЕНТЫ > ============ //

var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function () {
  mapRender();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mapRender();
  }
});

var adFormType = document.querySelector('#type');
var adFormPrice = document.querySelector('#price');
var adFormTimeIn = document.querySelector('#timein');
var adFormTimeOut = document.querySelector('#timeout');
var adFormRoomNumber = document.querySelector('#room_number');
var adFormCapacity = document.querySelector('#capacity');
var adFormAddress = document.querySelector('#address');

adFormType.addEventListener('input', function () {
  adFormTypeValidity();
});

adFormTimeIn.addEventListener('change', function () {
  adFormTimeValidity(adFormTimeIn, adFormTimeOut);
});

adFormTimeOut.addEventListener('change', function () {
  adFormTimeValidity(adFormTimeOut, adFormTimeIn);
});

adFormRoomNumber.addEventListener('change', function () {
  adFormRoomNumberValidity();
});

// ============ < ОБРАБОТЧИКИ СОБЫТИЙ и ПЕРЕМЕННЫЕ-DOM-ЭЛЕМЕНТЫ ============ //


// ============ ИСПОЛНЯЕМЫЙ КОД > ============ //

adFormDisabled(disabledStatusForm);
adFormRoomNumberValidity();
adFormTypeValidity();


setAddressInput((MAIN_PIN_WIDTH / 2), (MAIN_PIN_WIDTH / 2));
adFormAddress.disabled = true;

var mapFragments = document.createDocumentFragment();
var cardsFragment = document.createDocumentFragment();
var advertVariants = [];

for (var i = 0; i < ADVERT_COUNT; i++) {

  advertVariants[i] = getAdvert(i + 1);
  mapFragments.appendChild(renderPin(advertVariants[i]));

  mapFragments.childNodes[i].dataset.id = i + 1;
  mapFragments.childNodes[i].addEventListener('click', function (evt) {
    var closeCard = function () {
      var card = document.querySelector('.map__card');
      if (card) {
        map.removeChild(card);
      }
    };
    closeCard();

    var id = evt.target.closest('.map__pin').dataset.id;
    cardsFragment.appendChild(renderCard(advertVariants[id - 1]));

    map.insertBefore(cardsFragment, document.querySelector('.map__filters-container'));

    var cardCloseButton = document.querySelector('.popup__close');
    cardCloseButton.addEventListener('mousedown', closeCard);
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    });
  });
}

// ============ < ИСПОЛНЯЕМЫЙ КОД ============ //
