'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;

  window.MAIN_PIN_WIDTH = 65;
  window.MAIN_PIN_HEIGHT = 65 + 16;

  window.HEIGHT_LIMIT = {
    min: 130,
    max: 630
  };

  window.ADVERT_APARTMENT = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  window.map = document.querySelector('.map');
})();
