import React from 'react';
import firebase, { GeoFirestore } from '../../config/firebase';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { fromUnixTime } from 'date-fns';
import { startSubmit, stopSubmit } from './asyncActions';

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const NotificationIcon = styled.img`
  height: 25px;
  margin-right: 1rem;
`;

export { Notification, NotificationIcon };

const getEvents = (coords) => {
  return async (dispatch) => {
    dispatch(startSubmit());
    const geocollection = GeoFirestore.collection('events');
    const locationQuery = geocollection.near({
      center: new firebase.firestore.GeoPoint(
        coords.latitude,
        coords.longitude
      ),
      radius: 65,
    });

    if (coords) {
      try {
        await locationQuery.get().then((value) => {
          let events = [];

          value.docs.forEach((doc) => {
            let event = {
              ...doc.data(),
              id: doc.id,
            };
            events.push(event);
          });

          events.sort((a, b) => {
            if (fromUnixTime(a.date.seconds) > fromUnixTime(b.date.seconds)) {
              return 1;
            } else if (
              fromUnixTime(a.date.seconds) < fromUnixTime(b.date.seconds)
            ) {
              return -1;
            } else {
              return 0;
            }
          });

          dispatch({ type: 'GET_EVENTS', payload: events });
          dispatch(stopSubmit());
          return;
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
};

const createEvent = (event) => {
  return async (dispatch, getState) => {
    dispatch(startSubmit());
    let userCoords = getState().profile.userCoords;
    let hostId = getState().profile.userProfile.uid;
    let name =
      getState().profile.userProfile.name ||
      getState().profile.userProfile.displayName;
    let userPhoto = getState().profile.userProfile.photoURL;
    let joined = getState().profile.userProfile.joined;
    let createdEvent = {
      ...event,
      photo: '',
      hostedBy: {
        hostId,
        name,
        hostPhoto: userPhoto,
      },
      attendees: {
        [hostId]: {
          attending: true,
          host: true,
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

      await dispatch(getEvents(userCoords));

      dispatch(stopSubmit());

      return docRef.id;
    } catch (err) {
      dispatch(stopSubmit());
      console.log(err);
    }
  };
};

const eventPhotoUpload = (file, eventId, isNewEvent) => {
  return async (dispatch, getState) => {
    const coords = getState().profile.userCoords;

    try {
      const path = `${eventId}/event_images/${file.name}`;
      const storageRef = firebase.storage().ref(path);
      await storageRef.put(file.blob);

      const eventRef = firebase.firestore().collection('events').doc(eventId);

      let imageUrl = await storageRef.getDownloadURL();

      await eventRef.update({
        photo: {
          photoURL: imageUrl,
          filename: file.blob.name
        },
      });

      const eventData = await firebase
        .firestore()
        .collection('events')
        .doc(eventId)
        .get();

      dispatch(getEvents(coords));

      if (isNewEvent) {
        toast.success(
          <Notification>
            <NotificationIcon src='/assets/notification.png' />
            Your event has been successfully submitted.
          </Notification>,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
          }
        );
      } else {
        toast.success(
          <Notification>
            <NotificationIcon src='/assets/notification.png' />
            Your event has been amended.
          </Notification>,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
          }
        );
      }

      return eventData.id;
    } catch (err) {
      return {
        error: err,
        msg: 'There has been an error'
      }
    }
  };
};

const editEvent = (event) => {
  return async (dispatch, getState) => {
    let userCoords = getState().profile.userCoords;
    dispatch(startSubmit());
    let editedEvent;
    if(event.photo.blob) {
      editedEvent = {
        ...event,
        photo: '',
      };
    } else  {
      editedEvent = {
        ...event
      }
    }

    try {
      await firebase
        .firestore()
        .collection('events')
        .doc(editedEvent.id)
        .set(editedEvent);
      await dispatch(getEvents(userCoords));
      dispatch(stopSubmit());
      return editedEvent.id;
    } catch (err) {
      dispatch(stopSubmit());
      console.log(err);
    }
  };
};

export { getEvents, createEvent, eventPhotoUpload, editEvent };
