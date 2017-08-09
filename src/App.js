import React, { Component } from 'react';
import routes from './routes';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={browserHistory}>
        {routes}
      </Router>);
  }
}
