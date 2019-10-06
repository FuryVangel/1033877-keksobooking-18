'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.pins = {
    renderPins: function (advert) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
      pinElement.style.top = advert.location.y - PIN_HEIGHT + 'px';

      var pinImg = pinElement.querySelector('img');

      pinImg.src = advert.author.avatar;
      pinImg.alt = advert.offer.title;

      return pinElement;
    }
  };
})();

