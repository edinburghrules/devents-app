import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
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
import DetailedUserPage from '../../features/user/UserProfile/UserProfilePage';
import EventCategoryPage from '../../features/event/EventCategories/EventCategoryPage/EventCategoryPage';
import EventSearchResultsList from '../../features/event/EventSearch/EventSearchResultsList';
import LoadingPage from './LoadingPage';

const GlobalStyles = createGlobalStyle`
  body {
  font-family: 'Poppins', serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background: #fafafa !important;
}
`;

function App(props) {
  window.scrollTo(0, 0);
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
        <Route path='/user-profile/:id' component={DetailedUserPage} />
        <Route path='/event-category/:id' component={EventCategoryPage} />
        <Route exact path='/search-results/:id' component={EventSearchResultsList}/>
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAppLoaded: state.async.appLoaded,
  loggingOut: state.async.loading,
});

export default connect(mapStateToProps)(withRouter(App));
