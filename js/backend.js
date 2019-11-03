'use strict';

(function () {

  var SUCCESS_CODE = 200;
  var TIME_OUT = 10000;

  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT; // 10s

    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('POST', ServerUrl.UPLOAD);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('GET', ServerUrl.LOAD);
    xhr.send();
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
