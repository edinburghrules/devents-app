import React from 'react';
import ReactDOM from 'react-dom';
import './app/css/index.css';
import App from './app/layout/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store/configureStore';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { getEvents } from './app/redux/actions/eventActions';
import firebase from './app/config/firebase';

const store = configureStore();
let persistor = persistStore(store);
store.dispatch(getEvents());

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
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
          }
        });
      });
  } else {
    console.log('No user');
  }
});

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
