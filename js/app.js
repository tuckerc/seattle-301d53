'use strict';

$(function() {
  $.get('data/images.json')
    .then(imageLoader => {
      imageLoader.forEach(image => {
        // add images to main
        $('main').append(`<h2>${image.title}</h2>`);
        $('main').append(`<img src='${image.image_url}' alt='${image.description}'></img>`);
        $('main').append(`<p>${image.description}</p>`);
        // populate select
        $('select').append(`<option value='${image.keyword}'>${image.keyword}</option>`);
      })
    })
  $('select').on('change',() => {
    $('main *').remove();
    $.get('data/images.json')
    .then(imageLoader => {
      imageLoader.forEach(image => {
        console.log(`image.keyword: ${image.keyword}`);
        console.log(`$('select').first().value ${$('select').first().val()}`);
        if(image.keyword === $('select').first().val()) {
          // add images to main
          $('main').append(`<h2>${image.title}</h2>`);
          $('main').append(`<img src='${image.image_url}' alt='${image.description}'></img>`);
          $('main').append(`<p>${image.description}</p>`);
        }
      })
    })
  });
});
