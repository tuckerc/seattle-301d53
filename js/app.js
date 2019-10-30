'use strict';

$(function() {
  $.get('data/images.json')
    .then(imageLoader => {
      imageLoader.forEach(image => {
        // add images to main
        let mainDivs = $('<div></div>');
        mainDivs.append(`<h2>${image.title}</h2>`);
        mainDivs.append(`<img src='${image.image_url}' alt='${image.description}'></img>`);
        mainDivs.append(`<p>${image.description}</p>`);
        $('main').append(mainDivs);
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
