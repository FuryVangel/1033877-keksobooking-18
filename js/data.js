'use strict';

(function () {
  var CHECK_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  window.CHECK_TIME = CHECK_TIME;

  window.getAdvert = function (avatarNumber) {
    var ADVERT_ROOMS = [
      1,
      2,
      3,
      0
    ];

    var ADVERT_TYPE = [
      'bungalo',
      'palace',
      'flat',
      'house'
    ];

    var ADVERT_FEATURES = [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ];

    var ADVERT_PHOTOS = [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];

    var getRandom = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getRandomItemFromArray = function (arr) {
      return arr[getRandom(0, arr.length - 1)];
    };

    var getRandomLengthArray = function (array) {
      var tempArray = [];
      array.sort(function () {
        return Math.random() - 0.5;
      });

      for (var i = 0; i < getRandom(1, array.length); i++) {
        tempArray[i] = array[i];
      }

      return tempArray;
    };

    var locationX = getRandom(0, window.map.offsetWidth);
    var locationY = getRandom(130, 630);

    if (avatarNumber < 10) {
      avatarNumber = '0' + avatarNumber;
    }
    return {
      author: {
        avatar: 'img/avatars/user' + avatarNumber + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: locationX + ', ' + locationY,
        price: getRandom(100, 5000),
        type: getRandomItemFromArray(ADVERT_TYPE),
        rooms: getRandomItemFromArray(ADVERT_ROOMS),
        guests: getRandom(0, 3),
        checkin: getRandomItemFromArray(CHECK_TIME),
        checkout: getRandomItemFromArray(CHECK_TIME),
        features: getRandomLengthArray(ADVERT_FEATURES),
        description: 'Любой текст',
        photos: getRandomLengthArray(ADVERT_PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      },
    };
  };
})();
