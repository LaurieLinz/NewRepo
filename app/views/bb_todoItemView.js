import _ from 'underscore';
import Backbone from 'backbone';
import itemTemplate from 'text!./todoItem.tpl';

var todoItemView = Backbone.View.extend({
  tagName: 'div',
  events: {},
  initialize: function(item){
    // compile the template
    this.template = _.template(itemTemplate);
    this.render(item);
  },
  render: function(item){
    this.$el.html(this.template(item));
  }
});

module.exports = todoItemView;