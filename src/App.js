import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './login/Login.js';
import Signup from './signup/Signup.js';
import Payee from './payee/Payee.js';
import HomePage from './home/HomePage.js';

import { BankProvider } from './contextProvider/BankProvider';

function App() {
  return (
    <BankProvider>
      <Router>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/payee' component={Payee} exact />
          <Route path='/home' component={HomePage} exact />
          <Route path='/' component={Login} exact />
        </Switch>
      </Router>
    </BankProvider>
  );
}

export default App;
