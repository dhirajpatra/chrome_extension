// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$(document).ready(function () {

  function parseQueryString(queryString) {
    if (!queryString) {
      return false;
    }

    let queries = queryString.split("&"), params = {}, temp, temp1;

    for (let i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split('=');
      if (temp[1] !== '') {
        if (i == 0) {
          temp1 = temp[0].split('?');
          params[temp1[1]] = temp[1];
        } else {
          params[temp[0]] = temp[1];
        }
      }
    }
    return params;
  }

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let tab_url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    $('#video_url').val(tab_url);
    let params = parseQueryString(tab_url);
    $('#comments').val(params.v);
    let api_url = 'https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=' + params.v + '&format=json';

    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", api_url, true);
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4) {
    //     var data = $.parseJSON(xhr.responseText);
    //     $('#thumbnail_url').val(data.thumbnail_url);
    //     $('#author').val(data.author_name);
    //     $('#title').val(data.title);
    //     $('#video_iframe').html(data.html);
    //   }
    // }
    // xhr.send();

    $.ajax({
      url: api_url,
      method: "GET",
      data: {},
      dataType: "json",
      success: function (data) {
        $('#thumbnail_url').val(data.thumbnail_url);
        $('#author').val(data.author_name);
        $('#title').val(data.title);
        $('#video_iframe').html(data.html);
      }
    });


  });


});

