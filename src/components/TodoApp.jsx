import "normalize.css";
import "../styles/style";

import React from "react"
import content from "./content"
import ES6Component from 'components/examples/ES6Component'

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.state = {
      date: this.theTime(),
      msg: "State says the time is:",
      title: props.title
    };
  }

  theTime() {
    return (new Date).toLocaleTimeString()
  }

  onClickHandler(e) {
    this.setState({date: this.theTime()})
  }

  render() {
    return (
      <div onClick={this.onClickHandler}>
        { content }
        <br />
        {this.state.msg} {this.state.date}
        <br />
        {this.state.title}
        <ES6Component title="Test" initialCount={ 123 } />
      </div>
    )
  }
}
