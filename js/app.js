$(function() {
  $.get('data/images.json')
    .then(imageLoader => {
      imageLoader.forEach(image => {
        $('main').append(`<h2>${image.title}</h2>`);
        $('main').append(`<img src='${image.image_url}' alt='${image.description}'></img>`);
        $('main').append(`<p>${image.description}</p>`);
      })
    })
});
