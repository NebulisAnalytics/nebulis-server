import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './routes/Home';
import Login from './routes/Login';
import ProjectPage from './routes/ProjectPage';
import Page2 from './routes/Page2';
import NotFound from './routes/NotFound';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/projectpage" component={ProjectPage} />
          <Route path="/projectpage:id" component={Page2} /> //will fix later
          <Route path="*" component={NotFound} />
        </Route>
      </Router>);
  }
}
