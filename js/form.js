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
    for (var i = 0; i < window.CHECK_TIME.length; i++) {
      if (shiftTimeIn.value === window.CHECK_TIME[i]) {
        shiftTimeOut.value = window.CHECK_TIME[i];
      }
    }
  };

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

  var setAddressInput = function (x, y) {
    document.querySelector('#address')
    .value = Math.floor(parseInt(window.mainPin.style.left, 10) + x) + ', ' + Math.floor(parseInt(window.mainPin.style.top, 10) + y);
  };

  var adFormDisabled = function (status) {
    var adForm = document.querySelector('.ad-form');
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

  adFormAddress.disabled = true;
  adFormRoomNumberValidity();
  adFormTypeValidity();
  window.disabledStatusForm = true;
  adFormDisabled(window.disabledStatusForm);
  setAddressInput((window.MAIN_PIN_WIDTH / 2), (window.MAIN_PIN_WIDTH / 2));

  window.setAddressInput = setAddressInput;
  window.adFormDisabled = adFormDisabled;
})();
