'use strict';
(function () {
  var ADVERT_COUNT = 8;
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

  var mapFragments = document.createDocumentFragment();
  var cardsFragment = document.createDocumentFragment();
  var advertVariants = [];

  for (var i = 0; i < ADVERT_COUNT; i++) {

    advertVariants[i] = window.getAdvert(i + 1);
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
})();
