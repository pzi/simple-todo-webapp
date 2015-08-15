import React from 'react';

export default React.createClass({
  displayName: 'TodoCount',

  propTypes: {
    todos: React.PropTypes.array
  },

  _count: function(todos) {
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      completed: completed,
      active: todos.length - completed
    };
  },

  render: function () {
    const todos = this.props.todos;

    return (
      <dl>
        <dt>Number of Todos:</dt>
        <dd>{ todos.length }</dd>
        <dt>Active Todos:</dt>
        <dd>{ this._count(todos).active }</dd>
        <dt>Completed Todos:</dt>
        <dd>{ this._count(todos).completed }</dd>
      </dl>
    );
  }
});
