import Backbone from 'backbone';
import photosearchModel from '../models/photosearchModel';

var controller = Backbone.View.extend({
  el: '.photo-search-container',
  events: {
    'keypress .search-input': 'handleKeypress'
  }, 
  initialize: function(){
    this.render();
  },
  render: function(){

  },
  handleKeypress: function(event){
    if (event.which === 13) {
      var currentVal = this.$el.find('.search-input').val();
      if (currentVal !== '') {
        photosearchModel.fetch(currentVal, this.renderPhotos.bind(this));
      }
    }
  },
  renderPhotos: function(resp){
    var response = resp.responseText;
    response = response.slice(14, -1);
    var photoData = JSON.parse(response);
    var photos = photoData.photos.photo;
    var photoHtml = photos.map(function(photo){
      var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
      return '<li><img src="'+ url +'" /></li>';
    });
    this.$el.find('.photo-list').html(photoHtml);
  }
});

module.exports = controller;
