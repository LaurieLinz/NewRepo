// base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import navbar from './components/navbar';
import todoController from './pages/todo';
import D3pageController from './pages/D3page';
import threeExampleController from './pages/threeExample';
import bbTodoController from './pages/bb_todo';
import photosearchController from './pages/photosearch';
// import multimediaController from '.pages/multimedia';


// on document load
$(function(){


// Kick off the app!
  console.log('%c App Started', 'color:green');

  //launch navbar
  navbar.init();

  // This is the Router: which page are we on??
  switch(window.location.pathname){
  case '/pages/bb_todo.html': 
    new bbTodoController();
    break;
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

  case '/pages/photosearch.html': 
    new photosearchController();
    break;
  }


  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Impressed yet? Hire me now! www.laurielinz.com');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  
});
