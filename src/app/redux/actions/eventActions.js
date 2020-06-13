import firebase from '../../config/firebase';

import { toast } from 'react-toastify';

const toastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
};

const getEvents = () => {
  return async (dispatch) => {
    try {
      let events = [];
      await firebase
        .firestore()
        .collection('events')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            events.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        });
      dispatch({ type: 'GET_EVENTS', payload: events });
    } catch (err) {
      console.log(err);
    }
  };
};

const createEvent = (event) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('events')
        .add({ ...event });
      dispatch({ type: 'CREATE_EVENT', payload: event });
      dispatch(getEvents());
      toast('🎉 Your event has been created! 🎉', toastOptions);
    } catch (err) {
      console.log(err);
    }
  };
};

const editEvent = (event) => {
  return (dispatch) => {
    dispatch({ type: 'EDIT_EVENT', payload: event });
  };
};

export { getEvents, createEvent, editEvent };
