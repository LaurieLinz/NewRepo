import Backbone from 'backbone';
import lscache from 'lscache';

var model = Backbone.Model.extend({
  defaults: {
    todos: []
  },
  fetch: function(){
    var savedTodos = lscache.get('todos');
    if (savedTodos !== null) {
      this.set('todos', savedTodos);
    }
  },
  save: function (){
    var todos = this.get('todos');
    lscache.set('todos', todos);
  },
  addTodo: function(newTitle){
    if (newTitle.length > 0) {
      var todos = this.get('todos');
      todos.push({
        title: newTitle,
        complete: 0
      });
      this.set('todos', todos);
      this.save();
    }
  },
  removeTodo: function(id) {
    var todos = this.get('todos');
    todos.splice(id, 1);
    this.set('todos', todos);
    this.save();
  }
});

module.exports = model;