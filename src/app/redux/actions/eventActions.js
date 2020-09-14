import firebase from '../../config/firebase';
import { toast } from 'react-toastify';
import { startSubmit, stopSubmit } from './asyncActions';

const getEventsAndUsers = () => {
  return async (dispatch) => {
    try {
      let events = [];
      let users = []; 
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
        await firebase
        .firestore()
        .collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            users.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        });
      dispatch({ type: 'GET_EVENTS', payload: events });
      dispatch({ type: 'GET_USERS', payload: users });
      return;
    } catch (err) {
      console.log(err);
    }
  };
};

const createEvent = (event) => {
  return async (dispatch, getState) => {
    dispatch(startSubmit())
    let hostId = getState().profile.userProfile.uid;
    let name = getState().profile.userProfile.name || getState().profile.userProfile.displayName;
    let userPhoto = getState().profile.userProfile.photoURL;
    let joined = getState().profile.userProfile.joined;
    let createdEvent = {
      ...event,
      hostedBy: {
        hostId,
        name,
        hostPhoto: userPhoto,
      },
      attendees: {
        [hostId]: {
          attending: true,
          joined,
          attendeePhoto: userPhoto,
          name,
        },
      },
    };
    try {
      let docRef = await firebase
        .firestore()
        .collection('events')
        .add(createdEvent);

      await firebase
        .firestore()
        .collection('event_attendee')
        .doc(`${docRef.id}_${hostId}`)
        .set({
          eventId: docRef.id,
          hostId,
          eventDate: event.date,
          host: true,
        });
      await dispatch(getEventsAndUsers());
      dispatch(stopSubmit())
      toast.success('Your event is live! 🎉', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true
      });
      return docRef.id;
    } catch (err) {
      dispatch(stopSubmit())
      console.log(err);
    }
  };
};

const editEvent = (event) => {
  return async (dispatch) => {
    dispatch(startSubmit())
    try {
      await firebase.firestore().collection('events').doc(event.id).set(event);
      await dispatch(getEventsAndUsers());
      toast.success('Event updated! 🎉', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true
      });
      dispatch(stopSubmit())
      return event.id;
    } catch (err) {
      dispatch(stopSubmit())
      console.log(err);
    }
  };
};


export { getEventsAndUsers, createEvent, editEvent };
