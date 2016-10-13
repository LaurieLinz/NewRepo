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
    var renderedTodos = todos.map(function(item, index){
      item.id = index;
      var view = new bbTodoItemView(item);
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
  }
});

module.exports = ControllerView;