import 'normalize.css';
import '../styles/style';

import React from 'react';
import request from 'axios';

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: null
    };
  }

  componentDidMount() {
    // Fake TODOs API
    request
      .get('http://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        this.onLoadTodos(response.data)
      })
      .catch((response) => {
        console.log('Error:', response)
      })
  }

  onLoadTodos(todos) {
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div>
        <h1>TodoApp</h1>
        { this.renderTodos() }
      </div>
    );
  }

  renderTodos() {
    if (this.state.todos == null) return <div>Loading...</div>;

    return this.state.todos.length > 0 ? (
      <ol>
        { this.state.todos.map(this.renderTodo) }
      </ol>
    ) : (
      <div>Sorry, no TODOs for you.</div>
    )
  }

  renderTodo(todo) {
    return (
      <li key={ todo.id }>
        { todo.completed ? '✅' : '❎' }
        { todo.title }
      </li>
    );
  }
}
