import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Mahasiswa/dashboard';
import Login from '../../Pages/Mahasiswa/Login';
import Register from '../../Pages/Mahasiswa/Register';
import UpdateProfile from '../../Pages/Mahasiswa/Updateprofile';
import Approved from '../../Pages/OperatorVD/Approved';
import Approving from '../../Pages/OperatorVD/Approving';


const Routing = () => {
  return (
    <Router>
    <Switch>
    <Route exact path='/'>
          <Dashboard />
      </Route>
      <Route path='/login'>
            <Login />
      </Route>
      <Route path='/updateprofile'>
          <UpdateProfile />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/approving'>
        <Approving />
      </Route>
      <Route path='/approved'>
        <Approved />
      </Route>
    </Switch>
  </Router>
  )
};

export default Routing;