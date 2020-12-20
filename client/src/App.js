
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Dashboard from './Pages/Dashboard';
import Sidebare from './Components/Layout/Sidebar';
import Profile from './Pages/Profile';
import Welcom from './Pages/Welcom';
import Announce from './Pages/Announce';




function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Welcom} />
        <Route path='/Dashboard' component={Dashboard} />
        <Route path='/register' component={Signup} />
        <Route path='/login' component={Signin} />
        <Route path='/profile' component={Profile} />
        <Route path='/announce' component={Announce}/>
        
      </Switch>
    </BrowserRouter>

  )

}

export default App;
