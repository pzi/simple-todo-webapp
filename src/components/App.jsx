import "normalize.css";
import "../styles/style";

import * as someContent from "./content.jsx";

import React from "react";

class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.theTime(),
      msg: "State says the time is:"
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  theTime() {
    return (new Date()).toLocaleTimeString();
  }

  onClickHandler() {
    this.setState({date: this.theTime()});
  }

  render() {
    return (
      <div onClick={this.onClickHandler}>
        {someContent.default}
        <br />
        {this.state.msg} {this.state.date}
        <br />
        {this.props.title}
      </div>
    );
  }
}

React.render(
  <TodoApp title="I am a property!" />,
  document.getElementById("todo-app")
);
