import 'normalize.css';
import '../styles/style';

import React from 'react';
import content from './content';
import ES6Component from 'components/examples/ES6Component';
import ES6StandardComponent from 'components/examples/ES6StandardComponent';
import ES5Component from 'components/examples/ES5Component';

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.theTime(),
      msg: 'State says the time is:'
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
        { content }
        <br />
        {this.state.msg} {this.state.date}
        <br />
        {this.props.title}
        <ES6Component title='Test' initialCount={ 123 } />
        <ES6StandardComponent />
        <ES5Component />
      </div>
    );
  }
}
