import _ from 'underscore';
import Backbone from 'backbone';
import itemTemplate from 'text!./todoItem.tpl';

var todoItemView = Backbone.View.extend({
  tagName: 'div',
<<<<<<< HEAD
  events: {
    'click .close': 'removeHandler',
    'click .edit': 'editHandler',
    'click .save': 'saveHandler',
    'change input[type="checkbox"]': 'checkboxHandler',
    'keypress .todo-title-edit input': 'editKeypressHandler'
  },
  initialize: function(item, controller){
    // compile the template
    this.id = item.id;
    this.controller = controller;
=======
  events: {},
  initialize: function(item){
    // compile the template
>>>>>>> c940cbd81139c7dd295b11756ecf3ca568369c65
    this.template = _.template(itemTemplate);
    this.render(item);
  },
  render: function(item){
    this.$el.html(this.template(item));
<<<<<<< HEAD
  },
  removeHandler: function(){
    this.controller.removeTodo(this.id);
  },
  editHandler: function(){
    // go into edit mode
    this.$el.find('.edit').addClass('hidden');
    this.$el.find('.save').removeClass('hidden');
    this.$el.find('.todo-title').addClass('hidden');
    this.$el.find('.todo-title-edit').removeClass('hidden'); 
  },
  editKeypressHandler: function(event){
    if (event.which === 13) {
      this.saveHandler();
    }
  },
  saveHandler: function(){
    var newTitle = this.$el.find('.todo-title-edit input').val();
    this.controller.editTodo(this.id, newTitle);
  },
  checkboxHandler: function(){
    this.controller.changeComplete(this.id);
=======
>>>>>>> c940cbd81139c7dd295b11756ecf3ca568369c65
  }
});

module.exports = todoItemView;