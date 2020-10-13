import firebase, { GeoFirestore } from '../../config/firebase';
import { toast } from 'react-toastify';
import { startSubmit, stopSubmit } from './asyncActions';

const getEvents = (coords) => {
  const geocollection = GeoFirestore.collection('events');
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(coords.latitude, coords.longitude), radius: 80.4672 });
  return async (dispatch) => {
    if(coords) {
      try {
        query.get().then((value) => {
          // All GeoDocument returned by GeoQuery, like the GeoDocument added above
          let localEvents = [];
          value.docs.forEach(doc => {
            localEvents.push(doc.data());
          })
          dispatch({type: 'GET_LOCAL_EVENTS', payload: localEvents});
        });
      } catch(err) {
        console.log(err);
      }
    }
    try {
      let events = [];
      await firebase
        .firestore()
        .collection('events')
        .orderBy('date', 'desc')
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
      return;
    } catch (err) {
      console.log(err);
    }
  };
};

const createEvent = (event) => {
  return async (dispatch, getState) => {
    dispatch(startSubmit());
    let hostId = getState().profile.userProfile.uid;
    let name =
      getState().profile.userProfile.name ||
      getState().profile.userProfile.displayName;
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
      let eventCollection = GeoFirestore.collection('events');
      let docRef = await eventCollection.add(createdEvent);

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
      dispatch(stopSubmit());
      toast.success('Your event is live! 🎉', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
      });
      return docRef.id;
    } catch (err) {
      dispatch(stopSubmit());
      console.log(err);
    }
  };
};

const editEvent = (event) => {
  return async (dispatch, getState) => {
    let userCoords = getState().profile.userCoords;
    dispatch(startSubmit());
    try {
      await firebase.firestore().collection('events').doc(event.id).set(event);
      await dispatch(getEvents(userCoords));
      toast.success('Event updated! 🎉', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
      });
      dispatch(stopSubmit());
      return event.id;
    } catch (err) {
      dispatch(stopSubmit());
      console.log(err);
    }
  };
};

export { getEvents, createEvent, editEvent };
