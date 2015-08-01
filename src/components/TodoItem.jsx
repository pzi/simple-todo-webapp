import React from 'react';

export default React.createClass({
  displayName: 'TodoItem',

  propTypes: {
    todo: React.PropTypes.object
  },

  _handleChange: function(event) {
    event.preventDefault();
    // use the changeHandler from the parent component
    this.props.onChange({
      ...this.props.todo,
      completed: !this.props.todo.completed
    });
  },

  render: function() {
    const todo = this.props.todo;

    return (
      <li>
        <label>
          <input type='checkbox' checked={ todo.completed } onChange={ this._handleChange } />
          { todo.title }
          <span className='created-by'>Created by { this.props.userName }</span>
        </label>
      </li>
    );
  }

});
