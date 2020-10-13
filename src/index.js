import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/toastStyles.css';
import App from './app/layout/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store/configureStore';
import { getEvents } from './app/redux/actions/eventActions';
import { getUsers, supplyCoords } from './app/redux/actions/userActions';
import firebase from './app/config/firebase';

const store = configureStore();

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
  const dispatchActions = async (coords = {latitude: 0 , longitude: 0}) => {
    await store.dispatch(getEvents(coords));
    await store.dispatch(getUsers());
    store.dispatch(supplyCoords(coords));
    store.dispatch({ type: 'APP_LOADED' });
  };

  const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const userLocation = async () => {
    let userCoordsJSON = localStorage.getItem('userCoords');
    let userCoordsParsed = JSON.parse(userCoordsJSON);

    if (userCoordsParsed) {
      dispatchActions(userCoordsParsed);
    } else {
      try {
        const result = await getUserLocation();
        const userCoordsObj = {
          latitude: result.latitude,
          longitude: result.longitude,
        }
        localStorage.setItem(
          'userCoords',
          JSON.stringify(userCoordsObj)
        );
        dispatchActions(userCoordsObj);
      } catch (err) {
        console.log(err.message);
        dispatchActions();
      }
    }
  };

  if (user) {
    store.dispatch({ type: 'GET_AUTH_STATUS', payload: user });
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            store.dispatch({
              type: 'LOAD_USER_PROFILE',
              payload: doc.data(),
            });
          }
        });
      })
      .then(() => {
        userLocation();
      });
  } else {
    userLocation();
  }
});

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
