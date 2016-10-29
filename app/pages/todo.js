var $ = window.$;
import _ from 'underscore';
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';

var controller = {
  init: function () {
    model.init();
    //cache a jquery selector
    controller.addButton = $('.btn-add');
    //compile template
    controller.compiledTemplate = _.template(view);
    // compile todo item template
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
    var compiledTodos = model.get().map(function(item, index) {
    // database is an array - see model
    //loop over each item in the database
    
      // creates an id for the item that is the current index + 1 (zero indexed this is to be more human readable)
      // ID is required by the view
      item.id = index + 1;
      // use handlebars, step 2 use handlebars passing the data object to the template to render both
      // replace {{id}} with the item's id value
      return controller.compiledTemplate(item);
      // add this rendered todo to our list of todos
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
    $('.edit').off();
  },
  // add the event handler back we do this to prevent memory leak since the handeler will still be there but the item will be gone
  createEventHandlers: function() {
    controller.addButton.on('click', controller.addTodoHandler);
    $('.add-input').on('keypress', controller.addTodoKeypress);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
    // edit button handler
    $('.edit').on('click', controller.editHandler);
  },

  addTodoKeypress: function(event){
    if (event.which === 13) {
      controller.addTodoHandler(event);  
    }
  },

    //handler for edit button
  editHandler: function(event){
    // which item to edit??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    //title text disappears
    $item.find('.todo-title').addClass('hidden');
    // text input appears
    $item.find('.todo-title-edit').removeClass('hidden');
    // edit button replaced by save button 
    $item.find('.edit').addClass('hidden');
    $item.find('.save').removeClass('hidden');
    //make change when they click on save button
    $item.find('.save').on('click', controller.updateTitle);
    $item.find('.todo-title-edit input').on('keypress', controller.updateTitleKeypress);
  },
  // handler to update title on enter
  updateTitleKeypress: function(event){
    if (event.which === 13) {
      // they hit enter
      controller.updateTitle(event);
    }  
  },
  //save edit button handler
  updateTitle: function(event){
    // which title
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    $item.find('.save').off();
    $item.find('.todo-title-edit input').off();
    var newTodoTitle = $item.find('.todo-title-edit input').val();
    // update the database
    model.get()[index].title = newTodoTitle;
    model.save();
    controller.renderTemplates();
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
    // if input is empty string just exit
    if (newTitle === '') return;
    // model.get() returns the database
    // push adds an item to the database
    model.get().push({
      title: newTitle,
      completed: false
    });
    // clear the text box
    $('.add-input').val('');
    // updates the display/page
    controller.renderTemplates();
  }
};
// specifies what will be returned when imported
module.exports = controller;