import 'normalize.css';
import '../styles/style';

import React from 'react';
import request from 'superagent';
import TodoItem from 'components/TodoItem';

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
      .end((err, res) => {
        if (res.ok) {
          this._onLoadTodos(res.body);
        } else {
          alert('Error!');
          throw new Error(res);
        }
      });
  },

  _onLoadTodos: function(todos) {
    this.setState({ todos: todos });
  },

  _handleChange: function(updatedTodoItem) {
    let todos = this.state.todos;

    request
      .patch(`http://jsonplaceholder.typicode.com/todos/${updatedTodoItem.id}`)
      .send(updatedTodoItem)
      .end((err, res) => {
        if (res.ok) {
          todos = todos.map((todoItem) => {
            return todoItem.id === res.body.id ? updatedTodoItem : todoItem;
          });
          this.setState({todos: todos});
        } else {
          alert('Error!');
          throw new Error(res);
        }
      });
  },

  _renderTodos: function() {
    if (this.state.todos === null) return <div>Loading...</div>;

    return this.state.todos.length > 0 ? (
      <ol>
        { this.state.todos.map((todo) =>
          <TodoItem key={ todo.id } todo={ todo } onChange={ this._handleChange } />
        )}
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
