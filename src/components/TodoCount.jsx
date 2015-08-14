import React from 'react';

export default React.createClass({
  displayName: 'TodoCount',

  getInitialState: function() {
    return {
      count: 0,
      completedCount: 0,
      active: 0
    };
  },

  propTypes: {
    todos: React.PropTypes.array
  },

  componentDidMount: function() {
    this._count(this.props.todos);
  },

  componentWillReceiveProps: function() {
    this._count(this.props.todos);
  },

  _count: function(todos) {
    const completed = todos.filter((todo) => todo.completed).length;

    this.setState({
      count: this.props.todos.length,
      completedCount: completed,
      active: this.props.todos.length - completed
    });
  },

  render: function () {
    return (
      <dl>
        <dt>Number of Todos:</dt>
        <dd>{ this.state.count }</dd>
        <dt>Active Todos:</dt>
        <dd>{ this.state.active }</dd>
        <dt>Completed Todos:</dt>
        <dd>{ this.state.completedCount }</dd>
      </dl>
    );
  }
});
