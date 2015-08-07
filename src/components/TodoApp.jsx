import 'normalize.css';
import 'styles/style';

import React from 'react/addons';
import request from 'axios';
import TodoItem from 'components/TodoItem';
import TodoCount from 'components/TodoCount';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({
  displayName: 'TodoApp',

  getInitialState: function() {
    return {
      todos: null
    };
  },

  componentDidMount: function() {
    // Fake TODOs API
    request
      .get('http://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        this._onLoadTodos(response.data);
      })
      .catch((response) => {
        alert('Check console!');
        console.log('Error:', response);
      });
  },

  _onLoadTodos: function(todos) {
    this.setState({ todos: todos });
  },

  _handleChange: function(updatedTodoItem) {
    let todos = this.state.todos;

    request
      .patch('http://jsonplaceholder.typicode.com/todos/' + updatedTodoItem.id, {
        completed: updatedTodoItem.completed
      })
      .then((response) => {
        todos = todos.map((todoItem) => {
          return todoItem.id === response.data.id ? updatedTodoItem : todoItem;
        });
        this.setState({todos: todos});
      })
      .catch((response) => {
        console.warn('Error:', response);
      });
  },

  _completedCount: function() {
    return this.state.todos.filter((todo) => todo.completed).length;
  },

  _renderTodoCount: function () {
    return <TodoCount
      count={ this.state.todos.length }
      completedCount={ this._completedCount(this.state.todos) }
    />;
  },

  _renderTodos: function() {
    if (this.state.todos === null) return <div className='loading'>Fetching TODOs&hellip;</div>;

    if (this.state.todos.length > 0) {
      return (
        <div>
          { this._renderTodoCount() }
          <ReactCSSTransitionGroup component='ol' transitionName='todo-list' transitionAppear={ true } className='todo-list'>
            { this.state.todos.map((todo) =>
              <TodoItem
                key={ todo.id }
                todo={ todo }
                onChange={ this._handleChange }
              />
            )}
          </ReactCSSTransitionGroup>,
          { this._renderTodoCount() }
        </div>
      );
    } else {
      return <div className='todo-list-empty'>Sorry, no TODOs for you.</div>;
    }
  },

  render: function() {
    return (
      <div>
        <h1>TodoApp</h1>
        <p>Data by <a href='https://github.com/typicode/jsonplaceholder'>JSONPlaceholder</a>.</p>
        { this._renderTodos() }
      </div>
    );
  }
});
