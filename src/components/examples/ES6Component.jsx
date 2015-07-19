import React from "react";

export default class ES6Component extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    initialCount: React.PropTypes.number
  }

  static defaultProps = {
    title: "Default title"
  }

  state = {
    count: this.props.initialCount || 0
  }

  render() {
    return (
      <div style={{ padding: "10px", border: "1px solid black" }}>
        <div style={{ fontWeight: "bold" }}>ES6Component ({ this.props.title })</div>
        <div>Click Count: { this.state.count }</div>
        <button onClick={ this.handleClick }>Click</button>
      </div>
    );
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      count: this.state.count + 1
    });
  }
}
