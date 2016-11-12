var $ = window.$;

var app = {
  init: function(){
    app.render();
  },

  render: function(){
    $('#simple_sketch').sketch();
  } 
};

module.exports = app;