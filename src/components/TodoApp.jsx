import 'normalize.css';
import 'styles/style';

import React from 'react/addons';
import request from 'axios';
import TodoItems from 'components/TodoItems';
import TodoCount from 'components/TodoCount';

const JSON_PLACEHOLDER_URL = 'http://jsonplaceholder.typicode.com';
const ENTER_KEY = 13;

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
      .get(`${JSON_PLACEHOLDER_URL}/todos`, {
        params: {
          userId: 1
        }
      })
      .then((response) => {
        this._onLoadTodos(response.data);
      })
      .catch((response) => {
        alert('Check console!');
        console.log('Error: ', response);
      });
  },

  _onLoadTodos: function(todos) {
    this.setState({ todos: todos });
  },

  _handleChange: function(updatedTodoItem) {
    const todos = this.state.todos;

    request
      .patch(`${JSON_PLACEHOLDER_URL}/todos/${updatedTodoItem.id}`, {
        completed: updatedTodoItem.completed
      })
      .then((response) => {
        const index = todos.findIndex((todo, index, todos) => todo.id === updatedTodoItem.id);
        todos[index] = updatedTodoItem;
        this.setState({ todos: todos });
      })
      .catch((response) => {
        alert('Check console!');
        console.warn('Error: ', response);
      });
  },

  _handleKeyDown: function(event) {
    if (event.keyCode !== ENTER_KEY) { return; }

    event.preventDefault();

    const todos = this.state.todos;
    const newTodoField = React.findDOMNode(this.refs.newTodo);
    const newTodoText = newTodoField.value.trim();

    if(newTodoText) {
      request
        .post(`${JSON_PLACEHOLDER_URL}/todos`, {
          'userId': Math.floor(Math.random() * 10),
          'title': newTodoText,
          'completed': false
        })
        .then((response) => {
          todos.push(response.data);
          this.setState({ todos: todos });
          newTodoField.value = '';
        })
        .catch((response) => {
          alert('Check console!');
          console.log('Error: ', response);
        });
    }
  },

  _renderTodoCount: function() {
    return <TodoCount todos={ this.state.todos } />;
  },

  _renderTodos: function() {
    if (this.state.todos === null) return <div className='loading'>Fetching TODOs&hellip;</div>;

    return (
      <div>
        <input onKeyDown={ this._handleKeyDown } ref='newTodo' placeholder='What&apos;s next?' />
        { this._renderTodoCount() }
        <TodoItems todos={ this.state.todos } onChange={ this._handleChange } />
        { this._renderTodoCount() }
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <h1>TodoApp</h1>
        { this._renderTodos() }
        <p>Data by <a href='https://github.com/typicode/jsonplaceholder'>JSONPlaceholder</a>.</p>
      </div>
    );
  }
});
