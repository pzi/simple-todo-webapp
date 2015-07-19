import React from 'react';

// This is using less cutting edge, more standardised ES6/ES2015 syntax.
class ES6StandardComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: props.initialCount || 0
    }
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid black' }}>
        <div style={{ fontWeight: 'bold' }}>ES6StandardComponent ({ this.props.title })</div>
        <div>Click Count: { this.state.count }</div>
        <button onClick={ this.handleClick.bind(this) }>Click</button>
      </div>
    )
  }

  // No arrow function here, notice the `.bind(this)` in the render method.
  handleClick(event) {
    event.preventDefault()
    this.setState({
      count: this.state.count + 1
    })
  }
}

ES6StandardComponent.propTypes = {
  title: React.PropTypes.string,
  initialCount: React.PropTypes.number
}

ES6StandardComponent.defaultProps = {
  title: 'Default title'
}

// Notice we export at the bottom, because we need to export after setting all
// the class properties.
export default ES6StandardComponent
