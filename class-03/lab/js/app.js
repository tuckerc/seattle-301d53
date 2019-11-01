'use strict';

$(function() {
  
  let images1 = new ImageContainer(1, 'data/images.json');
  images1.getData();

  let images2 = new ImageContainer(2, 'data/images2.json');
  images2.getData();

  let currentImages = images1;

  $('#dropDownMenu').on('change',() => {
    currentImages.renderPage($('#dropDownMenu').val());
  });
  
  function Image(img) {
    this.image_url = img.image_url;
    this.title = img.title;
    this.description = img.description;
    this.keyword = img.keyword;
    this.horns = img.horns;
  }

  function ImageContainer(pageNum, path) {
    this.pageNum = pageNum,
    this.path = path,
    this.images = new Array(),
    this.getData = function() {
      $.get(this.path)
        .then(images => {
          images.forEach(img => {
            this.images.push(new Image(img));
          });
        })
        .then( () => {
          this.renderPage();
        });
    },
    this.renderPage = function(keyword) {
      $('main').empty();      
      // loop through images
      this.images.forEach(image => {
        if(!keyword || (keyword && image.keyword === $('select').first().val())) {
          // Grab the template script
          let theTemplateScript = $("#image-gallery").html();
          // Compile the template
          let theTemplate = Handlebars.compile(theTemplateScript);
          // Pass our data to the template
          var theCompiledHtml = theTemplate(image);
          // Add the compiled html to the page
          $('.content-placeholder').append(theCompiledHtml);
        }
      });
      this.updateSelect();
    },
    this.updateSelect = function() {
      $('option').not(':first').remove();
      let seen = {};
      this.images.forEach(image => {
        // populate select
        if(!seen[image.keyword]) {
          // Grab the template script
          let theTemplateScript = $("#dropDown").html();
          // Compile the template
          let theTemplate = Handlebars.compile(theTemplateScript);
          // Pass our data to the template
          var theCompiledHtml = theTemplate(image);
          // Add the compiled html to the page
          $('#dropDownMenu').append(theCompiledHtml);
          seen[image.keyword] = true;
        }
      });
    };
  }
});
