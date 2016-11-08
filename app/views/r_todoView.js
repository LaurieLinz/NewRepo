
import React from 'react';
import TodoItemView from './r_todoItemView';

var todoView = React.createClass({
  getInitialState: function(){
    return {
      newTitle: ''
    };
  },
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    controller: React.PropTypes.object.isRequired
  },
  render: function(){
    var controller = this.props.controller;
    var todosHtml = this.props.todos.map(function(todo, index){
      todo.id = index + 1;
      return <TodoItemView key={index} item={todo} controller={controller} />
        ;
    });
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 title-row">
            <h1>Stuff I Need To Get Done!</h1>
          </div>
        </div>
        <div className="row add-todo-row">
          <div className= "col-sm-1"></div>
          <div className="col-sm-9">
            <input type="text" className="form-control add-input" value={this.state.newTitle} onChange={this.titleChange} onKeyPress={this.hitEnter} />
          </div>
          <div className="col-sm-2">
            <button className= "btn btn-primary btn-add" onClick={this.createTodo}>Add</button>
          </div>
        </div>
        <div className="row todo-list">{todosHtml}</div>
      </div>
    );
  },
  createTodo: function(){
  //get new title
    var title = this.state.newTitle;
  //clear the text box
    this.setState({ newTitle: ''});
  // tell contoller to add todo
    this.props.controller.addTodo(title);
  },
  titleChange: function(event){
    //if they hit enter
    //create the todo
    // otherwise
    // update the new title
    this.setState({
      newTitle: event.target.value
    });
  },
  hitEnter: function(event){
    if (event.which === 13) {
      this.createTodo();
    }
  }
});

module.exports = todoView;