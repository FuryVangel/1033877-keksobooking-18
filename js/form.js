'use strict';

(function () {
  var ROOMS_VS_GUESTS = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var AdvertMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var ARRIVAL_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var validateInputFormType = function () {
    for (var key in window.AdvertApartment) {
      if (adFormType.value.toUpperCase() === key) {
        adFormPrice.placeholder = AdvertMinPrice[key];
        adFormPrice.min = AdvertMinPrice[key];
      }
    }
  };

  var validateInputFormRoomNumber = function () {
    var guestsAmount = ROOMS_VS_GUESTS[adFormRoomNumber.value];

    for (var i = 0; i < adFormCapacity.length; i++) {
      adFormCapacity[i].disabled = true;
      adFormCapacity[i].selected = false;
      guestsAmount.forEach(function (amount) {
        if (+adFormCapacity[i].value === amount) {
          adFormCapacity[i].disabled = false;
          adFormCapacity[i].selected = true;
        }
      });
    }
  };

  var validateInputFormTime = function (shiftTimeIn, shiftTimeOut) {
    ARRIVAL_TIMES.forEach(function (arrivalTime) {
      if (shiftTimeIn.value === arrivalTime) {
        shiftTimeOut.value = arrivalTime;
      }
    });
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
    validateInputFormType();
  });

  adFormTimeIn.addEventListener('change', function () {
    validateInputFormTime(adFormTimeIn, adFormTimeOut);
  });

  adFormTimeOut.addEventListener('change', function () {
    validateInputFormTime(adFormTimeOut, adFormTimeIn);
  });

  adFormRoomNumber.addEventListener('change', function () {
    validateInputFormRoomNumber();
  });

  var setAddressInput = function (x, y) {
    document.querySelector('#address')
    .value = Math.floor(parseInt(window.mainPin.style.left, 10) + x) + ', ' + Math.floor(parseInt(window.mainPin.style.top, 10) + y);
  };

  var addFormDisabled = function (status) {

    var adFormFieldset = adForm.querySelectorAll('fieldset');
    var mapFiltersFormFieldset = document.querySelector('.map__filters').querySelectorAll('select, fieldset');
    mapFiltersFormFieldset.forEach(function (item) {
      item.disabled = status;
    });

    adForm.classList.toggle('ad-form--disabled', status);

    adFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = status;
    });
    window.disabledStatusForm = !status;
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);

  var adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', function (evt) {
    adFormAddress.disabled = false;
    window.backend.upload(new FormData(adForm), onSuccess, onError);
    adFormAddress.disabled = true;
    evt.preventDefault();

    document.addEventListener('click', function () {
      successElement.remove();
      errorElement.remove();
    });

    var onPopupClose = function (e) {
      if (e.keyCode === window.ESC_KEYCODE) {
        successElement.remove();
        errorElement.remove();
        document.removeEventListener('keydown', onPopupClose);
      }
    };
    document.addEventListener('keydown', onPopupClose);
  });

  var onError = function (message) {
    errorElement.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElement);
  };

  var reset = function () {
    adFormTitle.value = '';
    adFormDescription.value = '';
    adFormPrice.value = '';
    adFormPrice.placeholder = '1000';
    adFormType.value = 'flat';
    adFormRoomNumber.value = '1';
    adFormCapacity.value = '1';
    adFormTimeIn.value = '12:00';
    adFormTimeOut.value = '12:00';
    var features = document.querySelector('.features').querySelectorAll('input');
    features.forEach(function (feature) {
      feature.checked = false;
    });
    addMapFaded();
    addFormDisabled(window.disabledStatusForm);
    window.closeCard();
  };

  var onSuccess = function () {
    document.querySelector('main').appendChild(successElement);
    reset();
    successElement.focus();
  };

  var addMapFaded = function () {
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
  validateInputFormRoomNumber();
  validateInputFormType();
  window.disabledStatusForm = true;
  addFormDisabled(window.disabledStatusForm);
  setAddressInput((window.MAIN_PIN_WIDTH / 2), (window.MAIN_PIN_WIDTH / 2));

  window.setAddressInput = setAddressInput;
  window.addFormDisabled = addFormDisabled;

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', reset);
})();
