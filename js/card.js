'use strict';

(function () {
  window.renderCard = function (advertisment) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = advertisment.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advertisment.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advertisment.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.ADVERT_APARTMENT[advertisment.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = advertisment.offer.rooms + ' комнаты для ' + advertisment.offer.rooms + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisment.offer.checkin + ' выезд до ' + advertisment.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advertisment.offer.description;

    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    for (var i = 0; i < advertisment.offer.features.length; i++) {
      var featuresElement = document.createElement('li');
      featuresElement.classList.add('popup__feature', 'popup__feature--' + advertisment.offer.features[i]);
      featuresList.appendChild(featuresElement);
    }

    var cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    for (var j = 0; j < advertisment.offer.photos.length; j++) {
      var photosElement = document.createElement('img');
      photosElement.classList.add('popup__photo');
      photosElement.src = advertisment.offer.photos[j];
      photosElement.width = '45';
      photosElement.height = '40';
      photosElement.alt = 'Фотография жилья';
      cardPhotos.appendChild(photosElement);
    }

    cardElement.querySelector('.popup__avatar').src = advertisment.author.avatar;

    return cardElement;
  };
})();

