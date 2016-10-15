import _ from 'underscore';
import Backbone from 'backbone';
import itemTemplate from 'text!./todoItem.tpl';

var todoItemView = Backbone.View.extend({
  tagName: 'div',
  events: {
    'click .close': 'removeHandler'
  },
  initialize: function(item, controller){
    // compile the template
    this.id = item.id;
    this.controller = controller;
    this.template = _.template(itemTemplate);
    this.render(item);
  },
  render: function(item){
    this.$el.html(this.template(item));
  },

  removeHandler: function(){
    this.controller.removeTodo(this.id);
  }
});

module.exports = todoItemView;