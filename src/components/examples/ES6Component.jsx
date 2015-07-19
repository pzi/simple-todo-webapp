import React from 'react';

// This component is the latest-and-greatest syntax. Much of it is non-standard,
// because the standards haven't been defined yet.
export default class ES6Component extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    initialCount: React.PropTypes.number
  }

  static defaultProps = {
    title: 'Default title'
  }

  // State is not static!
  state = {
    count: this.props.initialCount || 0
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid black' }}>
        <div style={{ fontWeight: 'bold' }}>ES6Component ({ this.props.title })</div>
        <div>Click Count: { this.state.count }</div>
        <button onClick={ this.handleClick }>Click</button>
      </div>
    )
  }

  // Magical arrow function will retian the content of `this`
  handleClick = (event) => {
    event.preventDefault()
    this.setState({
      count: this.state.count + 1
    })
  }
}
