import React from 'react';
import Register from './Register';
import ForGotPassword from './ForGotPassword';
import Login from './Login';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from './DashBoard';

export const customHistory = createBrowserHistory();

export default function App() {
  return (
    <div>
      <Router history={customHistory}>
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/Login' exact component={Login}></Route>
          <Route path='/Register' exact component={Register}></Route>
          <Route path='/ForGotPassword' exact component={ForGotPassword}></Route>
          <Route path='/Dashboard' exact component={Dashboard}></Route>
          <Route component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}