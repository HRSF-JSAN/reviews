import $ from 'jquery';

const helpers = {
  get: (route, callback) => {
    $.get({
      url: route,
      success: (data) => {
        callback(data);
      },
    });
  },

  post: (route, request, callback) => {
    $.post({
      url: route,
      contentType: 'application/json',
      data: JSON.stringify(request),
      success: () => {
        callback();
      },
    });
  },

  put: (route, request) => {
    $.ajax({
      url: route,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(request),
    });
  },
};

export default helpers;
