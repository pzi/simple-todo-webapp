import 'normalize.css';
import 'styles/style';

import React from 'react/addons';
import request from 'axios';
import _find from 'lodash/collection/find';
import _result from 'lodash/object/result';
import TodoItem from 'components/TodoItem';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const USERS = [
  {userId: 1, name: 'Patrik'},
  {userId: 2, name: 'Stefan'},
  {userId: 3, name: 'Sarah'},
  {userId: 4, name: 'Levi'},
  {userId: 5, name: 'Vinny'},
  {userId: 6, name: 'John'},
  {userId: 7, name: 'Jane'},
  {userId: 8, name: 'Caroline'},
  {userId: 9, name: 'Nina'},
  {userId: 10, name: 'Antoinette'}
];

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

  _renderTodos: function() {
    if (this.state.todos === null) return <div className='loading'>Fetching TODOs&hellip;</div>;

    return this.state.todos.length > 0 ? (
      <ReactCSSTransitionGroup component='ol' transitionName='todo-list' transitionAppear={true} className='todo-list'>
        { this.state.todos.map((todo) =>
          <TodoItem
            key={ todo.id }
            todo={ todo }
            userName={ _result(_find(USERS, 'userId', todo.userId), 'name') }
            onChange={ this._handleChange }
          />
        )}
      </ReactCSSTransitionGroup>
    ) : (
      <div className='todo-list-empty'>Sorry, no TODOs for you.</div>
    );
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
