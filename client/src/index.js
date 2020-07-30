import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Register';
import ForGotPassword from './components/ForGotPassword';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import { Route,Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

export const customHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
     <Router  history={customHistory}>
  
  <Switch>
   <Route path='/' exact component={Register}></Route>
   <Route path='/Login' exact component={Login}></Route>
   <Route path='/Register' exact component={Register}></Route>
   <Route path='/ForGotPassword' exact component={ForGotPassword}></Route>
   <Route path='/DashBoard' exact component={DashBoard}></Route>
   <Route component={Register}></Route>
</Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


