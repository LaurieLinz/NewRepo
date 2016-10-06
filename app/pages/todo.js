var $ = window.$;
var Handlebars = window.Handlebars;
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';

var controller = {
  init: function () {
    model.init();
    //cache a jquery selector
    controller.addButton = $('.btn-add');
    // complie todo item template
    controller.compiledTemplate = Handlebars.compile(view);
    // render the todo item template
    controller.renderTemplates();
  },

  //do all the visual stuff
  render: function (compiledTodos) {
    // remove the event handlers
    // event handlers are function that get run when an event happens
    controller.destroyEventHandlers();
    // compiled todo is an array
    // we are joing the elements of the array together to make one long string
    // put the long string into the HTML element with a class of "todo-list"
    // add all the event handlers which are function that run when an event happens
    $('.todo-list').html(compiledTodos.join(''));
    // now that all the todos have been added to the DOM
    // add all the event handlers for the todo app 
    controller.createEventHandlers();
  },
  renderTemplates: function(){
    // creates an empty array
    var compiledTodos = [];
    // database is an array - see model
    //loop over each item in the database
    model.get().forEach(function(item, index) {
      // creates an id for the item that is the current index + 1 (zero indexed this is to be more human readable)
      // ID is required by the view
      item.id = index + 1;
      // use handlebars, step 2 use handlebars passing the data object to the template to render both
      // replace {{id}} with the item's id value
      var renderedTodo = controller.compiledTemplate(item);
      // add this rendered todo to our list of todos
      compiledTodos.push(renderedTodo);
    }); // end of forEach
    // pass list of todos to the render function
    controller.render(compiledTodos);
    // tell the model to save our data
    model.save();
  },
  // remove event handlers from app so we can get ready to re-render
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  // add the event handler back we do this to prevent memory leak since the handeler will still be there but the item will be gone
  createEventHandlers: function() {
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
  },
  //event handler for the close X button
  // deletes the todo
  removeHandler: function(event){
    //which one was clicked??
    var index = $(event.currentTarget).parent().parent().index();
    //update the database
    model.get().splice(index, 1);
    // update the view
    controller.renderTemplates();
  },
  // event handler for the checkboxes
  checkedHandler: function (event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index();
    // update the database
    model.get()[index].completed = !model.get()[index].completed;
    model.save();
    controller.renderTemplates();
  },
  // even handler for the ADD button
  // creates a new todo
  addTodoHandler: function() {
    //reads the input
    var newTitle = $('.add-input').val();
    // if input is empy string just exit
    if (newTitle === '') return;
    // model.get() returns the database
    // push adds an item to the database
    model.get().push({
      title: newTitle,
      complete: false
    });
    // clear the text box
    $('.add-input').val('');
    // updates the display/page
    controller.renderTemplates();
  }
};
// specifies what will be returned when imported
module.exports = controller;