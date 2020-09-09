import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import Navigation from '../../features/nav/NavBar/NavBar';
import Login from '../../features/auth/Login/Login';
import Signup from '../../features/auth/Signup/Signup';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetails from '../../features/event/EventDetails/EventDetails';
import AccountDashboard from '../../features/user/Settings/AccountDashboard';
import DetailedUserPage from '../../features/user/DetailedUser/DetailedUserPage';
import LoadingPage from './LoadingPage';
import { GlobalStyles } from '../../app/styled/global/globalStyles/GlobalStyle';

function App(props) {
  if (!props.isAppLoaded || props.loggingOut)
    return (
      <Fragment>
        <Navigation />
        <LoadingPage />
      </Fragment>
    );
  return (
    <Fragment>
      <GlobalStyles/>
      <Navigation />
      <ToastContainer />
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
        <Route path='/user' component={AccountDashboard} />
        <Route path='/detailed-user' component={DetailedUserPage} />
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAppLoaded: state.async.appLoaded,
  loggingOut: state.async.loading,
});

export default connect(mapStateToProps)(withRouter(App));
