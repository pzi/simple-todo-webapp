import 'normalize.css';
import 'styles/style';

import React from 'react/addons';
import request from 'axios';
import TodoItems from 'components/TodoItems';
import TodoCount from 'components/TodoCount';

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
        console.log('Error: ', response);
      });
  },

  _onLoadTodos: function(todos) {
    this.setState({ todos: todos });
  },

  _handleChange: function(updatedTodoItem) {
    const todos = this.state.todos;

    request
      .patch(`http://jsonplaceholder.typicode.com/todos/${updatedTodoItem.id}`, {
        completed: updatedTodoItem.completed
      })
      .then((response) => {
        const index = todos.findIndex((todo, index, todos) => todo.id === updatedTodoItem.id);
        todos[index] = updatedTodoItem;
        this.setState({ todos: todos });
      })
      .catch((response) => {
        console.warn('Error: ', response);
      });
  },

  _renderTodoCount: function() {
    return <TodoCount todos={ this.state.todos } />;
  },

  _renderTodos: function() {
    if (this.state.todos === null) return <div className='loading'>Fetching TODOs&hellip;</div>;

    return (
      <div>
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
