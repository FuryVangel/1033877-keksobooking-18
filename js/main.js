'use strict';

(function () {
  var mapFragments = document.createDocumentFragment();
  var cardsFragment = document.createDocumentFragment();

  var mapVisible = function () {
    window.map.classList.remove('map--faded');

    var pins = document.querySelector('.map__pins');
    pins.appendChild(mapFragments);

    window.setAddressInput((window.MAIN_PIN_WIDTH / 2), window.MAIN_PIN_HEIGHT);
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

  var onSuccess = function (data) {
    var advertVariants = data;

    // var ADVERT_COUNT = 8;

    // var advertVariants = [];

    for (var i = 0; i < advertVariants.length; i++) {
      // advertVariants[i] = window.getAdvert(i + 1);
      if (advertVariants[i].offer) {
        mapFragments.appendChild(window.pins.renderPins(advertVariants[i]));
        mapFragments.childNodes[i].dataset.id = i + 1;
        mapFragments.childNodes[i].addEventListener('click', function (evt) {
          var closeCard = function () {
            var card = document.querySelector('.map__card');
            if (card) {
              window.map.removeChild(card);
            }
          };
          closeCard();

          var id = evt.target.closest('.map__pin').dataset.id;
          cardsFragment.appendChild(window.renderCard(advertVariants[id - 1]));

          window.map.insertBefore(cardsFragment, document.querySelector('.map__filters-container'));

          var cardCloseButton = document.querySelector('.popup__close');
          cardCloseButton.addEventListener('mousedown', closeCard);
          document.addEventListener('keydown', function (e) {
            if (e.keyCode === window.ESC_KEYCODE) {
              closeCard();
            }
          });
        });
      }
    }
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
})();
