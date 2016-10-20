// var $ = window.$;
import Backbone from 'backbone';
import bbTodoModel from '../models/bb_TodoModel';
import bbTodoItemView from '../views/bb_todoItemView';

var ControllerView = Backbone.View.extend({
  el:'.todo-container', // equal to the raw document node
  events: {
    // event space object the function
    'click .btn-add': 'addTodo',
    'keypress .add-input': 'addKeypress'
  },
  model: new bbTodoModel(),
  initialize: function(){
    this.model.fetch();
    this.render();
  },
  render: function(){
    // alert('You have ' + this.model.get('todos').length + ' todos!');
    var todos = this.model.get('todos');
    // render each todo item
<<<<<<< HEAD
    var me = this;
    var renderedTodos = todos.map(function(item, index){
      item.id = index +1;
      var view = new bbTodoItemView(item, me);
=======
    var renderedTodos = todos.map(function(item, index){
      item.id = index;
      var view = new bbTodoItemView(item);
>>>>>>> c940cbd81139c7dd295b11756ecf3ca568369c65
      return view.$el;
    });
    // puts all the todo items into the dom
    this.$el.find('.todo-list').html(renderedTodos);
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
    this.model.addTodo(newTitle);
    this.$el.find('.add-input').val('');
    this.render();
  },
  addKeypress: function(event){
    if (event.which === 13) {
      this.addTodo();
    }
<<<<<<< HEAD
  },
  removeTodo: function(id) {
    if (id >= 0) {
      this.model.removeTodo(id);
      this.render();
    }
  },
  editTodo: function(id, newTitle){
    if (id >= 0) {
      this.model.editTodo(id, newTitle);
      this.render();
    }
  },
  changeComplete: function(id){
    if (id >= 0) {
      this.model.completeTodo(id);
      this.render();
    }
=======
>>>>>>> c940cbd81139c7dd295b11756ecf3ca568369c65
  }
});

module.exports = ControllerView;