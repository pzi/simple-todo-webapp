import React from 'react';

export default React.createClass({
  displayName: 'TodoCount',

  propTypes: {
    count: React.PropTypes.number,
    completedCount: React.PropTypes.number
  },

  render: function () {
    return (
      <dl>
        <dt>Number of Todos:</dt>
        <dd>{ this.props.count }</dd>
        <dt>Completed Todos:</dt>
        <dd>{ this.props.completedCount }</dd>
      </dl>
    );
  }
});
