import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import Login from '../../features/auth/Login/Login';
import Signup from '../../features/auth/Signup/Signup';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetails from '../../features/event/EventDetails/EventDetails';

function App() {
  return (
    <Fragment>
      <NavBar />
        <Switch>
          <Route exact path='/' component={EventDashboard} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/eventform' component={EventForm} />
          <Route exact path='/event/:id' component={EventDetails} />
        </Switch>
    </Fragment>
  );
}

export default App;
