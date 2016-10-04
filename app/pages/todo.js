
var $ = window.$;
var Handlebars = window.Handlebars;
import lscache from 'lscache';


var database = [];
var model = {
  init: function(){
    var savedData = lscache.get('todos');
    if (savedData) {
      database = savedData;
    } else {
      database = [];
    }
  },
  save: function(){
    var dataToSave = JSON.stringify(database);
    lscache.set('todos', dataToSave);
  },
  get: function(){
    return database;
  }
};

var view = $('script[type="text/x-template"]').html();

var controller = {
  init: function () {
    model.init();
    //cache some selectors
    controller.addButton = $('.btn-add');
    // start everything up
    controller.compiledTemplate = Handlebars.compile(view);
    controller.renderTemplates();
  },
  render: function (compiledTodos) {
    //do all the visual stuff
    controller.destroyEventHandlers();
    $('.todo-list').html(compiledTodos.join('')); 
    controller.createEventHandlers();
  },
  renderTemplates: function(){
    var compiledTodos = [];
    model.get().forEach(function(item, index) {
      item.id = index + 1;
      var renderedTodo = controller.compiledTemplate(item);
      compiledTodos.push(renderedTodo);
    });
    controller.render(compiledTodos);
    model.save();
  },
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  createEventHandlers: function() {
    controller.addButton.on('click', controller.addTodoHandler);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
  },
  removeHandler: function(event){
    //which one was clicked??
    var index = $(event.currentTarget).parent().parent().index();
    //update the database
    model.get().splice(index, 1);
    // update the view
    controller.renderTemplates();
  },
  checkedHandler: function (event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index();
    // update the database
    model.get()[index].completed = !model.get()[index].completed;
    // view updates automatically yay HTML!
    model.save();
  },
  addTodoHandler: function() {
    var newTitle = $('.add-input').val();
    if (newTitle === '') return;
    model.get().push({
      title: newTitle,
      complete: false
    });
    $('.add-input').val('');
    controller.renderTemplates();
  }
};

module.exports = controller;