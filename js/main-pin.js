'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main');

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shiftX = evt.pageX - window.mainPin.offsetLeft - window.util.map.offsetLeft;
    var shiftY = evt.pageY - window.mainPin.offsetTop - window.util.map.offsetTop;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.setAddressInput((window.util.MAIN_PIN_WIDTH / 2), window.util.MAIN_PIN_HEIGHT);

      var moveAt = function (x, y) {
        if (x < -window.util.MAIN_PIN_WIDTH / 2) {
          x = -window.util.MAIN_PIN_WIDTH / 2;
        }

        if (y < window.util.HeightLimit.MIN - window.util.MAIN_PIN_HEIGHT) {
          y = window.util.HeightLimit.MIN - window.util.MAIN_PIN_HEIGHT;
        }

        if (x > window.util.map.offsetWidth - window.util.MAIN_PIN_WIDTH / 2) {
          x = window.util.map.offsetWidth - window.util.MAIN_PIN_WIDTH / 2;
        }

        if (y > window.util.HeightLimit.MAX - window.util.MAIN_PIN_HEIGHT) {
          y = window.util.HeightLimit.MAX - window.util.MAIN_PIN_HEIGHT;
        }

        window.mainPin.style.top = y + 'px';
        window.mainPin.style.left = x + 'px';
      };

      moveAt(moveEvt.pageX - window.util.map.offsetLeft - shiftX, moveEvt.pageY - window.util.map.offsetTop - shiftY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.main.mapRender();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onMainPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.main.mapRender();
    }
    window.mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  window.mainPin.addEventListener('keydown', onMainPinEnterPress);
})();
