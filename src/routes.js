import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
 
import Home from './routes/Home';
import Login from './routes/Login';
import ProjectPage from './routes/projects/index';
import ProjectContainer from './routes/projects/view';
import MembersPage from './routes/MembersPage';
import Page2 from './routes/Page2';
import NotFound from './routes/NotFound';
import RouterProvider from './routes';
 
export default (
    <Route path="/">
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/projects" component={ProjectPage} />
      <Route path="/projects/:id" component={ProjectContainer} />
      <Route path="/members" component={MembersPage} />
      <Route path="*" component={NotFound} />
    </Route>
);