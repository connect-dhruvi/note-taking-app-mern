import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Register';
import ForGotPassword from './components/ForGotPassword';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import { Route, Switch, Router } from 'react-router-dom';
import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
   <App />
  </React.StrictMode>,
  document.getElementById('root')
);


