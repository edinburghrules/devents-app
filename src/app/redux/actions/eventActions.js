import firebase from '../../config/firebase';
import { toast } from 'react-toastify';
import { startSubmit, stopSubmit } from './asyncActions';

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
  return async (dispatch, getState) => {
    dispatch(startSubmit())
    let hostId = getState().profile.userProfile.uid;
    let name = getState().profile.userProfile.name || getState().profile.userProfile.displayName;
    let hostPhoto = getState().profile.userProfile.photoURL;
    let joined = getState().profile.userProfile.joined;
    let createdEvent = {
      ...event,
      hostedBy: {
        hostId,
        name,
        hostPhoto,
      },
      attendees: {
        [hostId]: {
          attending: true,
          joined,
          hostPhoto,
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
      await dispatch(getEvents());
      dispatch(stopSubmit())
      toast('🎉 Your event has been created!', toastOptions);
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
      await dispatch(getEvents());
      dispatch(stopSubmit())
      return event.id;
    } catch (err) {
      dispatch(stopSubmit())
      console.log(err);
    }
  };
};


export { getEvents, createEvent, editEvent };
