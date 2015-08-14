import React from 'react';

export default class TodoCount extends React.Component {
  render() {
    return (
      <dl>
        <dt>Number of Todos:</dt>
        <dd>{ this.props.count }</dd>
        <dt>Completed Todos:</dt>
        <dd>{ this.props.completedCount }</dd>
      </dl>
    );
  }
}

TodoCount.propTypes = {
  count: React.PropTypes.number,
  completedCount: React.PropTypes.number
}
