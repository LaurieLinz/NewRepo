import Backbone from 'backbone';
import bbTodoItemView from '../views/bb_todoItemView';

var TodoView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo',
    // 'keypress .add-input': 'addKeyPress'
  },
  initialize: function(todos, controller){
    this.controller = controller;
    this.render(todos);
  },
  render: function(todos){
    // render each item
    var controller = this.controller;
    var renderedTodos = todos.map(function(item, index){
      item.id = index + 1;
      var view = new bbTodoItemView(item, controller); 
      return view.$el;
    });
    // put all the todo items in to the dom
    this.$el.find('.todo-list').html(renderedTodos);
  },
  removeHandlers: function(){
    this.$el.find('.btn-add').off();
    // this.$el.find('.add-input').off();
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
    this.$el.find('.add-input').val('');
    this.controller.addTodo(newTitle);
  },
  addKeyPress: function(event) {
    var newTitle = this.$el.find('.add-input').val();
    this.$el.find('.add-input').val('');
    this.controller.addKeyPress(event, newTitle);
  },
  removeTodo: function(id){
    this.controller.removeTodo(id);
  },
  editTodo: function(id, newTitle){
    this.controller.editTodo(id, newTitle);
  },
  changeComplete: function(id){
    this.controller.changeComplete(id);
  }
});

module.exports = TodoView;
