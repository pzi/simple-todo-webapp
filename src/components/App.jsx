import "normalize.css";
import "../styles/style";

import * as someText from "./content.jsx";

import React from "react"

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        {someText}
      </div>
    )
  }
}

React.render(
  <TodoApp />,
  document.getElementById("todo-app")
)
