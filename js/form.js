'use strict';

(function () {
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

  var CHECK_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var adFormTypeValidity = function () {
    for (var key in window.ADVERT_APARTMENT) {
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

  var adFormType = document.querySelector('#type');
  var adFormPrice = document.querySelector('#price');
  var adFormTimeIn = document.querySelector('#timein');
  var adFormTimeOut = document.querySelector('#timeout');
  var adFormRoomNumber = document.querySelector('#room_number');
  var adFormDescription = document.querySelector('#description');
  var adFormCapacity = document.querySelector('#capacity');
  var adFormAddress = document.querySelector('#address');
  var adFormTitle = document.querySelector('#title');


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

  var setAddressInput = function (x, y) {
    document.querySelector('#address')
    .value = Math.floor(parseInt(window.mainPin.style.left, 10) + x) + ', ' + Math.floor(parseInt(window.mainPin.style.top, 10) + y);
  };

  var adFormDisabled = function (status) {

    var adFormFieldset = adForm.querySelectorAll('fieldset');
    var mapFiltersFormFieldset = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
    mapFiltersFormFieldset.forEach(function (item) {
      item.disabled = status;
    });

    adForm.classList.toggle('ad-form--disabled', status);

    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = status;
    }
    window.disabledStatusForm = !status;
  };

  var URL = 'https://js.dump.academy/keksobooking';

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);

  var adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', function (evt) {
    adFormAddress.disabled = false;
    window.upload(URL, new FormData(adForm), onSuccess, onError);
    adFormAddress.disabled = true;
    evt.preventDefault();
    document.addEventListener('click', function () {
      successElement.remove();
      errorElement.remove();
    });
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === window.ESC_KEYCODE) {
        successElement.remove();
        errorElement.remove();
      }
    });
  });

  var onError = function (message) {
    errorElement.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElement);
  };

  var onSuccess = function () {
    document.querySelector('main').appendChild(successElement);
    adFormTitle.value = '';
    adFormDescription.value = '';
    adFormPrice.value = '';

    mapFaded();
    window.closeCard();
    adFormDisabled(window.disabledStatusForm);
  };

  var mapFaded = function () {
    window.map.classList.add('map--faded');
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    window.mainPin.style.top = window.map.offsetHeight / 2 + 'px';
    window.mainPin.style.left = window.map.offsetWidth / 2 - window.MAIN_PIN_WIDTH / 2 + 'px';
    setAddressInput((window.MAIN_PIN_WIDTH / 2), (window.MAIN_PIN_WIDTH / 2));
  };

  adFormAddress.disabled = true;
  adFormRoomNumberValidity();
  adFormTypeValidity();
  window.disabledStatusForm = true;
  adFormDisabled(window.disabledStatusForm);
  setAddressInput((window.MAIN_PIN_WIDTH / 2), (window.MAIN_PIN_WIDTH / 2));

  window.setAddressInput = setAddressInput;
  window.adFormDisabled = adFormDisabled;
})();
