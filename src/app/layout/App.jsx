import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import Login from '../../features/auth/Login/Login';
import { Container } from 'react-bootstrap';
import Signup from '../../features/auth/Signup/Signup';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container>
        {/* <EventDashboard /> */}
        <Signup/>
        {/* <Login /> */}
      </Container>
    </Fragment>
  );
}

export default App;
