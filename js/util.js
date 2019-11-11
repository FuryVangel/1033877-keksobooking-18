'use strict';

(function () {
  window.util = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 81,

    HeightLimit: {
      MIN: 130,
      MAX: 630
    },

    AdvertApartment: {
      FLAT: 'Квартира',
      BUNGALO: 'Бунгало',
      HOUSE: 'Дом',
      PALACE: 'Дворец'
    },

    map: document.querySelector('.map')
  };
})();
