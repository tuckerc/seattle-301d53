'use strict';

$(function() {
  $.get('data/images.json')
    .then(imageLoader => {
      let seen = {};
      imageLoader.forEach(image => {
        // add images to main
        let mainDivs = $('<div></div>');
        mainDivs.append(`<h2>${image.title}</h2>`);
        mainDivs.append(`<img src='${image.image_url}' alt='${image.description}'></img>`);
        mainDivs.append(`<p>${image.description}</p>`);
        $('main').append(mainDivs);
        // populate select
        if(!seen[image.keyword]) {
          $('select').append(`<option value='${image.keyword}'>${image.keyword}</option>`);
          seen[image.keyword] = true;
        }
      })
    })
  $('select').on('change',() => {
    $('main *').remove();
    $.get('data/images.json')
      .then(imageLoader => {
        imageLoader.forEach(image => {
          if(image.keyword === $('select').first().val()) {
            // add images to main
            let mainDivs = $('<div></div>');
            mainDivs.append(`<h2>${image.title}</h2>`);
            mainDivs.append(`<img src='${image.image_url}' alt='${image.description}'></img>`);
            mainDivs.append(`<p>${image.description}</p>`);
            $('main').append(mainDivs);
          }
        })
      })
  });
});
