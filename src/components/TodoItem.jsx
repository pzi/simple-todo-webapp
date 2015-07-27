import React from 'react';

export default React.createClass({
  displayName: 'TodoItem',

  propTypes: {
    todo: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      // props in getInitialState is an anti-pattern :| what to do?
      // So far I am only using title & completed, should only these 2 be passed down
      // as props from TodoApp?
      checked: this.props.todo.completed || false
    };
  },

  _onChangeHandler: function(event) {
    this.setState({
      checked: !this.state.checked
    });
  },

  render: function() {
    var todo = this.props.todo;

    return (
      <li>
        <label>
          <input type='checkbox' checked={ this.state.checked } onChange={ this._onChangeHandler } />
          {todo.title}
        </label>
      </li>
    );
  }

});
