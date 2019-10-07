'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main');

  window.mainPin.addEventListener('mousedown', function () {
    window.mapRender();
  });

  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.mapRender();
    }
  });
})();
