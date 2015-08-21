import request from 'axios';
import React from 'react';
import TodoItem from 'components/TodoItem';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({

  propTypes: {
    todo: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  render: function() {
    if (this.props.todos.length > 0) {
      return (
        <ReactCSSTransitionGroup component='ol' transitionName='todo-list' transitionAppear={ true } className='todo-list'>
          { this.props.todos.map((todo) =>
            <TodoItem
              key={ todo.id }
              todo={ todo }
              onChange={ this.props.onChange }
            />
          )}
        </ReactCSSTransitionGroup>
      );
    } else {
      return <div className='todo-list-empty'>Sorry, no TODOs for you.</div>;
    }
  }

});
