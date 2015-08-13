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

    return (
      <div>
        { this._renderTodoCount() }
        <TodoItems todos={ this.state.todos } />
        { this._renderTodoCount() }
      </div>
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
