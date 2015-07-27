import 'normalize.css';
import '../styles/style';

import React from 'react';
import request from 'axios';
import TodoItem from './todoItem';

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
        alert("Check console!");
        console.log('Error:', response);
      })
  },

  _onLoadTodos: function(todos) {
    this.setState({ todos: todos });
  },

  _renderTodos: function() {
    if (this.state.todos === null) return <div>Loading...</div>;

    return this.state.todos.length > 0 ? (
      <ol>
        { this.state.todos.map(function(todo) {
          return <TodoItem key={ todo.id } todo={ todo } />;
        })}
      </ol>
    ) : (
      <div>Sorry, no TODOs for you.</div>
    )
  },

  render: function() {
    return (
      <div>
        <h1>TodoApp</h1>
        { this._renderTodos() }
      </div>
    );
  }
});
