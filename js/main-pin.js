'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main');

  window.mainPin.addEventListener('mousedown', function (evt) {
    window.mapRender();

    evt.preventDefault();

    window.mainPin.style.zIndex = 2;
    var shiftX = evt.pageX - window.mainPin.offsetLeft - window.map.offsetLeft;
    var shiftY = evt.pageY - window.mainPin.offsetTop - window.map.offsetTop;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.setAddressInput((window.MAIN_PIN_WIDTH / 2), window.MAIN_PIN_HEIGHT);

      var moveAt = function (x, y) {
        if (x < -window.MAIN_PIN_WIDTH / 2) {
          x = -window.MAIN_PIN_WIDTH / 2;
        }

        if (y < 0) {
          y = 0;
        }

        if (x > window.map.offsetWidth - window.MAIN_PIN_WIDTH / 2) {
          x = window.map.offsetWidth - window.MAIN_PIN_WIDTH / 2;
        }

        if (y > window.map.offsetHeight - window.MAIN_PIN_HEIGHT) {
          y = window.map.offsetHeight - window.MAIN_PIN_HEIGHT;
        }

        window.mainPin.style.top = y + 'px';
        window.mainPin.style.left = x + 'px';
      };

      moveAt(moveEvt.pageX - window.map.offsetLeft - shiftX, moveEvt.pageY - window.map.offsetTop - shiftY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.mapRender();
    }
  });
})();