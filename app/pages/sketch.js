var $ = window.$;

var app = {
  init: function(){
    app.render();
  },

  render: function(){
    $('#simple_sketch').sketch();
    $.each(['#f00', '#ff0', '#0f0', '#ff8c1f', '#00f', '#7E20B0', '#000', '#fff'], function() {
      $('#colors-demo').append('<a href="#simple_sketch" data-color="' + this + '" style="width: 25px; background: ' + this + ';"></a> ');
    });
  } 
};

module.exports = app;
