var $ = window.$;

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('.form').on('submit', app.validateForm);

  },
  validateForm: function() {
    var x = document.forms['myForm']['email'].value;
    var atpos = x.indexOf('@');
    var dotpos = x.lastIndexOf('.');
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      document.getElementById('emailmsg').style.display='';
    } else {
      document.getElementById('thanks').style.display='';
      $('.input').val('').removeAttr('placeholder');
    }
    return false;
  }
};

module.exports = app;



