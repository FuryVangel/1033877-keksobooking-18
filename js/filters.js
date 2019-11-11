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
      return inputType.value === 'any' || e.offer.type === inputType.value;
    })
    .filter(function (e) {
      var filteringPrice = PriceRange[inputPrice.value.toUpperCase()];
      return !filteringPrice || e.offer.price >= filteringPrice.MIN && e.offer.price <= filteringPrice.MAX;
    })
    .filter(function (e) {
      return inputRooms.value === 'any' || e.offer.rooms === +inputRooms.value;
    })
    .filter(function (e) {
      return inputGuests.value === 'any' || e.offer.guests === +inputGuests.value;
    })
    .filter(function (e) {
      return filterFeatures(inputFeatures).every(function (element) {
        return e.offer.features.includes(element.value);
      });
    })
    .slice(0, window.main.PINS_LIMIT);
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

    window.main.closeCard();
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    window.main.drawPins(adFilteredElement);
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

  window.filterInputs = {
    inputType: inputType,
    inputPrice: inputPrice,
    inputRooms: inputRooms,
    inputGuests: inputGuests,
    inputFeatures: inputFeatures
  };
})();
