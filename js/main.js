'use strict';

(function () {
  window.PINS_LIMIT = 5;

  var mapFragments = document.createDocumentFragment();
  var cardsFragment = document.createDocumentFragment();

  var mapVisible = function () {
    window.map.classList.remove('map--faded');

    window.setAddressInput((window.MAIN_PIN_WIDTH / 2), window.MAIN_PIN_HEIGHT);

    window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  };

  window.mapRender = function () {
    if (!window.disabledStatusForm) {
      window.adFormDisabled(window.disabledStatusForm);
      mapVisible();
    }
  };

  var onError = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = message;

    document.querySelector('main').appendChild(errorElement);
  };

  window.closeCard = function () {
    desactivatedPins();
    var card = document.querySelector('.map__card');
    if (card) {
      window.map.removeChild(card);
    }
  };

  var desactivatedPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
  };

  var onSuccess = function (data) {
    window.data = data;
    var advertVariants = data.slice(0, window.PINS_LIMIT);

    window.drawingPins = function (adVariants) {
      adVariants.forEach(function (advert, i) {
        if (advert.offer) {
          mapFragments.appendChild(window.pins.renderPins(advert));
          mapFragments.childNodes[i].addEventListener('click', function (evt) {

            window.closeCard();

            var pin = evt.target.closest('.map__pin');
            pin.classList.add('map__pin--active');

            cardsFragment.appendChild(window.renderCard(advert));

            window.map.insertBefore(cardsFragment, document.querySelector('.map__filters-container'));

            var cardCloseButton = document.querySelector('.popup__close');
            cardCloseButton.addEventListener('mousedown', window.closeCard);
            document.addEventListener('keydown', function (e) {
              if (e.keyCode === window.ESC_KEYCODE) {
                window.closeCard();
              }
            });
          });
        }
      });
      var pins = document.querySelector('.map__pins');
      pins.appendChild(mapFragments);
    };
    window.drawingPins(advertVariants);
  };
})();
