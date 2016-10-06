// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import _ from 'underscore';
import todoController from './pages/todo';
import D3pageController from './pages/D3page';
import threeExampleController from './pages/threeExample';
// import multimediaController from '.pages/multimedia';


// on document load
$(function(){


// Kick off the app!
  console.log('%c App Started', 'color:green');

  // set default template settings
  _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g,
    escape:      /{{=([\s\S]+?)}}/g
  };

  // This is the Router: which page are we on??
  switch(window.location.pathname){
  case '/pages/todo.html': 
    todoController.init();
    break;
  case '/pages/multimedia.html': 
    console.log('multimedia page started');
    break;
  case '/pages/D3page.html': 
    D3pageController.init();
    break;
  case '/pages/threeExample.html': 
    threeExampleController.init();
    break;
  }


  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Impressed yet? Hire me now! www.laurielinz.com');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  
});
