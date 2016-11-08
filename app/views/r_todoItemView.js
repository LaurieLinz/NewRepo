import React from 'react';

var ItemView = React.createClass({
  getInitialState: function(){
    return { editing: false };
  },
  propTypes: {
    item: React.PropTypes.object.isRequired,
    controller: React.PropTypes.object.isRequired
  },
  render: function(){
    var baseClasses = 'todo';
    if (this.props.item.completed) {
      baseClasses += ' completed';
    }
    return (
      <div className={baseClasses}>
        <div className="col-sm-1">{this.props.item.id}</div>
        { this.state.editing !== true &&
        <div className="col-sm-7 todo-title">{this.props.item.title}</div>
        }
        { this.state.editing === true && 
        <div className="col-sm-7 todo-title-edit">
          <input className="title-edit-input" type="text" defaultValue={this.props.item.title} />
        </div>
        }
        <div className="col-sm-1">
          { this.props.item.completed === 1 &&
            <input type="checkbox" checked onChange={this.toggleCheckbox} />
          } 
          { this.props.item.completed === 0 &&
            <input type="checkbox" onChange={this.toggleCheckbox}/>
          }
        </div>
        <div className="col-sm-2">

          {this.state.editing !== true &&
          <button className="btn btn-default edit" onClick={this.editTodo}>Edit</button>
          }
          { this.state.editing === true &&
          <button className ="btn btn-primary save" onClick={this.saveTodo}>Save</button>
          }
        </div>
        <div className="col-sm-1">
          <button type="button" className="close" aria-label="Close" onClick={this.removeTodo}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> 
      </div>
    );
  },
  toggleCheckbox: function(){
    this.props.controller.changeComplete(this.props.item.id);
  },
  removeTodo: function(){
    this.props.controller.removeTodo(this.props.item.id);
  },
  editTodo: function(){
    this.setState({editing: true});
  },
  saveTodo: function(){
    var newTitle = document.querySelector('.title-edit-input').value;
    this.setState({editing: false});
    this.props.controller.editTodo(this.props.item.id, newTitle);
  }
});

module.exports = ItemView;