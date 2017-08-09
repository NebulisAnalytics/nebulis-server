import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './routes/Home';
import Login from './routes/Login';
import ProjectPage from './routes/projects/index';
import ProjectContainer from './routes/projects/view';
import MemberPage from './routes/members/index';
import MembersContainer from './routes/members/view';
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
          <Route path="/projects" component={ProjectPage} />
          <Route path="/projects/:id" component={ProjectContainer} />
          <Route path="/members" component={MembersContainer} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>);
  }
}
