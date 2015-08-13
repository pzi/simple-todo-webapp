import request from 'axios';
import React from 'react';
import TodoItem from 'components/TodoItem';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({

  _handleChange: function(updatedTodoItem) {
    const todos = this.props.todos;

    request
      .patch(`http://jsonplaceholder.typicode.com/todos/${updatedTodoItem.id}`, {
        completed: updatedTodoItem.completed
      })
      .then((response) => {
        const index = todos.findIndex((todo, index, todos) => todo.id === updatedTodoItem.id);
        todos[index] = updatedTodoItem;
        this.setState({todos: todos});
      })
      .catch((response) => {
        console.warn('Error: ', response);
      });
  },

  render: function() {
    if (this.props.todos.length > 0) {
      return (
        <ReactCSSTransitionGroup component='ol' transitionName='todo-list' transitionAppear={ true } className='todo-list'>
          { this.props.todos.map((todo) =>
            <TodoItem
              key={ todo.id }
              todo={ todo }
              onChange={ this._handleChange }
            />
          )}
        </ReactCSSTransitionGroup>
      );
    } else {
      return <div className='todo-list-empty'>Sorry, no TODOs for you.</div>;
    }
  }

});
