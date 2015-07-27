import 'normalize.css';
import '../styles/style';

import React from 'react';
import content from './content';
import ES5Component from 'components/examples/ES5Component';
import ES6Component from 'components/examples/ES6Component';
import ES6StandardComponent from 'components/examples/ES6StandardComponent';

export default class ExampleApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tick: 0 };
  }

  componentDidMount() {
    this._interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  tick() {
    this.setState({ tick: this.state.tick + 1 });
  }

  render() {
    const date = (new Date()).toLocaleTimeString();

    return (
      <div>
        <h1>{ this.props.title }</h1>
        { content }
        <div>
          The time is: { date } (Tick: { this.state.tick })
        </div>
        <ES6Component title="Test" initialCount={ 123 } />
        <ES6StandardComponent />
        <ES5Component />
      </div>
    );
  }
}
