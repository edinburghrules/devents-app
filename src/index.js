import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/toastStyles.css';
import App from './app/layout/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store/configureStore';
import { getEvents } from './app/redux/actions/eventActions';
import { getUsers } from './app/redux/actions/userActions';
import firebase from './app/config/firebase';

const store = configureStore();

const fetchEvents = async() => {
  await store.dispatch(getUsers());
  await store.dispatch(getEvents());
  return;
}


fetchEvents();

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch({ type: 'GET_AUTH_STATUS', payload: user });
      firebase
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            store.dispatch({ type: 'LOAD_USER_PROFILE', payload: doc.data() });
            setTimeout(() => {
              store.dispatch({ type: 'APP_LOADED' });
            }, 500);
          }
        });
      });
  } else {
    store.dispatch({ type: 'APP_LOADED' });
  }
});

render();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
