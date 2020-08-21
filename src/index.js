import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Loading from './Loading';
//import * as serviceWorker from '../public/sw';
//import registerValidSW from '../public/serviceWorker';
//import swConfig from '../swConfig'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch,
  Route } from 'react-router-dom';
 // import ForgotPassword from './Forgot';
  import {unregister} from './serviceWorker';
ReactDOM.render(
  
  <Router>
  
   <Switch>
    <Route  exact path='/' component={Login}/>
    <Route component={Loading}/>
    </Switch>
    
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//unregister();
serviceWorker.register();
