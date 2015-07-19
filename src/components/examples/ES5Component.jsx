import React from 'react';

// This one uses the older, but more documented ES5 syntax and class builders.
// Using this syntax will allow you to use Mixins and all the standard React
// lifecycle events (getDefaultProps, getInitialState etc.)
export default React.createClass({

  displayName: 'ES5Component',

  // To use mixins:
  // mixins: [SetIntervalMixin],

  propTypes: {
    title: React.PropTypes.string,
    initialCount: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      title: 'Default title'
    }
  },

  getInitialState: function() {
    return {
      count: this.props.initialCount || 0
    }
  },

  render: function() {
    return (
      <div style={{ padding: '10px', border: '1px solid black' }}>
        <div style={{ fontWeight: 'bold' }}>ES5Component ({ this.props.title })</div>
        <div>Click Count: { this.state.count }</div>
        <button onClick={ this.handleClick }>Click</button>
      </div>
    )
  },

  // Notice, no .bind(this) required when using the createClass builder.
  handleClick: function(event) {
    event.preventDefault()
    this.setState({
      count: this.state.count + 1
    })
  }
});
