import "normalize.css";
import "../styles/style";

import * as someContent from "./content.jsx";

import React from "react"

class TodoApp extends React.Component {

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
        {someContent.default}
        <br />
        {this.state.msg} {this.state.date}
        <br />
        {this.state.title}
      </div>
    )
  }
}

React.render(
  <TodoApp title="I am a property!" />,
  document.getElementById("todo-app")
)
