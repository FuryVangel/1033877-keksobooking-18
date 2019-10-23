'use strict';

(function () {

  var PriceRange = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var inputType = document.querySelector('#housing-type');
  var inputPrice = document.querySelector('#housing-price');
  var inputRooms = document.querySelector('#housing-rooms');
  var inputGuests = document.querySelector('#housing-guests');
  var inputFeatures = document.querySelector('#housing-features');

  var filterInput = function (adFilteredElement) {
    return adFilteredElement.filter(function (e) {
      if (inputType.value === 'any') {
        return true;
      }
      return e.offer.type === inputType.value;
    })
    .filter(function (e) {
      if (inputPrice.value === 'any') {
        return true;
      }
      if ((PriceRange[inputPrice.value].min < e.offer.price) && (e.offer.price < PriceRange[inputPrice.value].max)) {
        return true;
      }
      return false;
    })
    .filter(function (e) {
      if (inputRooms.value === 'any') {
        return true;
      }
      return e.offer.rooms === +inputRooms.value;
    })
    .filter(function (e) {
      if (inputGuests.value === 'any') {
        return true;
      }
      return e.offer.guests === +inputGuests.value;
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
    window.drawingPins(adFilteredElement);
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
