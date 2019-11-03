'use strict';

(function () {

  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var inputType = document.querySelector('#housing-type');
  var inputPrice = document.querySelector('#housing-price');
  var inputRooms = document.querySelector('#housing-rooms');
  var inputGuests = document.querySelector('#housing-guests');
  var inputFeatures = document.querySelector('#housing-features');

  var filterInput = function (adFilteredElement) {
    return adFilteredElement.filter(function (e) {
      return inputType.value === 'any' ? true : e.offer.type === inputType.value;
    })
    .filter(function (e) {
      var filteringPrice = PriceRange[inputPrice.value.toUpperCase()];
      return filteringPrice ? e.offer.price >= filteringPrice.MIN && e.offer.price <= filteringPrice.MAX : true;
    })
    .filter(function (e) {
      return inputRooms.value === 'any' ? true : e.offer.rooms === +inputRooms.value;
    })
    .filter(function (e) {
      return inputGuests.value === 'any' ? true : e.offer.guests === +inputGuests.value;
    })
    .filter(function (e) {
      return filterFeatures(inputFeatures).every(function (element) {
        return e.offer.features.includes(element.value);
      });
    })
    .slice(0, window.PINS_LIMIT);
  };

  var filterFeatures = function (features) {
    features = Array.from(features.querySelectorAll('input'));
    var featuresChecked = features.filter(function (feature) {
      return feature.checked;
    });
    return featuresChecked;
  };

  var updateAdverts = function () {
    var adFilteredElement = filterInput(window.data);

    window.closeCard();
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    window.drawPins(adFilteredElement);
  };

  inputType.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });

  inputPrice.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });

  inputRooms.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });

  inputGuests.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });
  inputFeatures.addEventListener('change', function () {
    window.debounce(updateAdverts)();
  });
})();
