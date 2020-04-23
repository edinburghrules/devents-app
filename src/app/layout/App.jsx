import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import Login from '../../features/auth/Login/Login';
import Signup from '../../features/auth/Signup/Signup';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetails from '../../features/event/EventDetails/EventDetails';

function App(props) {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route exact path='/' component={EventDashboard} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route
          key={props.location.key}
          exact
          path={['/createEvent', '/manageEvent/:id']}
          component={EventForm}
        />
        <Route exact path='/event/:id' component={EventDetails} />
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);
