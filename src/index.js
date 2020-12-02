import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/toastStyles.css';
import App from './app/layout/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './app/redux/store/configureStore';
import { getEvents } from './app/redux/actions/eventActions';
import {
  getUsers,
  supplyCoords,
  supplySearchLocation,
} from './app/redux/actions/userActions';
import firebase from './app/config/firebase';
import getAddressDetails, {
  getFormattedAddress,
} from './app/utils/locationHelper';

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

export let authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
  // Actions for app initialisation
  const dispatchActions = async (
    coords = { latitude: 56.462018, longitude: -2.970721 }
  ) => {
    try {
      const address = await getAddressDetails({
        lat: Number(coords.latitude),
        lng: Number(coords.longitude),
      });
      let formattedAddress = getFormattedAddress(address);
      store.dispatch(supplyCoords(coords));
      store.dispatch(supplySearchLocation(formattedAddress));
      await store.dispatch(getEvents(coords));
      await store.dispatch(getUsers());
      store.dispatch({ type: 'APP_LOADED' });
    } catch (err) {
      new Error('There has been an error fetching  data', err);
    }
  };

  // Prompt user for their location
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
      // If user has location services turned off in os system
      setTimeout(() => {
        resolve({ latitude: 56.462018, longitude: -2.970721 })
      }, 5000)
    });
  };

  // Submit user location either from local storage if exists or
  // from user input and then dispatch all actions for app initatialisation
  const userLocation = async () => {
    let userCoordsJSON = localStorage.getItem('userCoords');
    let userCoordsParsed = JSON.parse(userCoordsJSON);

    if (userCoordsParsed) {
      dispatchActions(userCoordsParsed);
    } else {
      try {
        const result = await getUserLocation();
        console.log(result);
        const userCoordsObj = {
          latitude: result.latitude,
          longitude: result.longitude,
        };
        localStorage.setItem('userCoords', JSON.stringify(userCoordsObj));
        dispatchActions(userCoordsObj);
      } catch (err) {
        dispatchActions();
        console.log(err.message);
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
