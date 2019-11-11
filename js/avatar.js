'use strict';

(function () {
  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];

  var ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarChooser = document.querySelector('#avatar');

  var imagesContainer = document.querySelector('.ad-form__photo');
  var imageChooser = document.querySelector('#images');

  var createImage = function () {
    var image = document.createElement('img');
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    return image;
  };

  var addPhoto = function (chooser, photo) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[0];
      if (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            photo.src = reader.result;
          });
          reader.readAsDataURL(file);
        }
      }
    });
  };

  var image = imagesContainer.appendChild(createImage());

  addPhoto(avatarChooser, avatarPreview);
  addPhoto(imageChooser, image);
  window.avatars = {
    avatar: avatarChooser,
    image: imageChooser,
    avatarPreview: avatarPreview,
    imagePreview: image
  };
})();
