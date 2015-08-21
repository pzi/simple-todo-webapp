import React from 'react';
import { addons } from 'react/addons';

const { PureRenderMixin } = addons;

const USERS = [
  {userId: 1, name: 'Patrik'},
  {userId: 2, name: 'Stefan'},
  {userId: 3, name: 'Sarah'},
  {userId: 4, name: 'Levi'},
  {userId: 5, name: 'Vinny'},
  {userId: 6, name: 'John'},
  {userId: 7, name: 'Jane'},
  {userId: 8, name: 'Caroline'},
  {userId: 9, name: 'Nina'},
  {userId: 10, name: 'Antoinette'}
];

export default React.createClass({
  displayName: 'TodoItem',

  mixins: [PureRenderMixin],

  getInitialState: function() {
    return {
      pending: false
    };
  },

  propTypes: {
    todo: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  _handleChange: function(event) {
    this.setState({ pending: true });

    event.preventDefault();
    // use the changeHandler from the parent component
    this.props.onChange({
      ...this.props.todo,
      completed: !this.props.todo.completed
    });
  },

  _resolveUserName: function(todo) {
    return USERS.filter((user) => user.userId === todo.userId)[0].name;
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.todo.completed !== this.props.todo.completed) {
      this.setState({
        pending: false
      });
    }
  },

  render: function() {
    const todo = this.props.todo;

    return (
      <li>
        <div className='toggle'>
          <input type='checkbox'
            id={ 'todoitem-' + todo.id }
            checked={ todo.completed }
            onChange={ this._handleChange }
            disabled={ this.state.pending } />
        </div>
        <label htmlFor={ 'todoitem-' + todo.id } className={ todo.completed ? 'completed' : '' }>
          { todo.title }
          <span className='created-by'>Created by { this._resolveUserName(todo) }</span>
        </label>
      </li>
    );
  }

});
