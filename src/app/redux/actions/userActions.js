import React from 'react';
import firebase from '../../config/firebase';
import { toast } from 'react-toastify';
import { startSubmit, stopSubmit } from './asyncActions';
import { getEvents } from './eventActions';
import { Notification, NotificationIcon } from '../../styles/toastNotification';

const getUsers = () => {
  return async (dispatch) => {
    try {
      let users = [];
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
      dispatch({ type: 'GET_USERS', payload: users });
      return;
    } catch (err) {
      console.log(err);
    }
  };
};

const supplyCoords = (coords) => {
  return async (dispatch) => {
    dispatch({ type: 'USER_COORDS', payload: coords });
  };
};

const supplySearchLocation = (location) => {
  return async (dispatch) => {
    dispatch({ type: 'SEARCH_LOCATION', payload: location });
  };
};

const attendEvent = (event) => {
  return async (dispatch, getState) => {
    dispatch(startSubmit());
    let userCoords = getState().profile.userCoords;
    let currentUser = getState().auth.currentUser.uid;
    let newAttendee = {
      attending: true,
      attendeePhoto: getState().profile.userProfile.photoURL,
      name: getState().profile.userProfile.displayName,
    };
    try {
      await firebase
        .firestore()
        .collection('events')
        .doc(event.id)
        .update({
          [`attendees.${currentUser}`]: newAttendee,
        });

      await firebase
        .firestore()
        .collection('event_attendee')
        .doc(`${event.id}_${currentUser}`)
        .set({
          eventDate: event.date,
          eventId: event.id,
          host: false,
          userId: currentUser,
        });

      await dispatch(getEvents(userCoords));
      toast.info(
        <Notification>
          <NotificationIcon src='/assets/notification.png' />
          You've booked your place for {event.title}.
        </Notification>,
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      dispatch(stopSubmit());
    } catch (err) {
      console.log(err);
    }
  };
};

const unattendEvent = (event) => {
  return async (dispatch, getState) => {
    dispatch(startSubmit());
    let currentUser = getState().auth.currentUser.uid;
    let userCoords = getState().profile.userCoords;
    try {
      await firebase
        .firestore()
        .collection('events')
        .doc(event.id)
        .update({
          [`attendees.${currentUser}`]: firebase.firestore.FieldValue.delete(),
        });
      await firebase
        .firestore()
        .collection('event_attendee')
        .doc(`${event.id}_${currentUser}`)
        .delete();

      await dispatch(getEvents(userCoords));
      toast.info(
        <Notification>
          <NotificationIcon src='/assets/notification.png' />
          You've cancelled your place for {event.title}.
        </Notification>,
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      dispatch(stopSubmit());
    } catch (err) {
      console.log(err);
    }
  };
};

const editPassword = (newPassword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'CLEAR_PROFILE_UPDATE_ERROR' });
      dispatch(startSubmit());
      await firebase.auth().currentUser.updatePassword(newPassword);
      dispatch(stopSubmit());
      toast.info(
        <Notification>
          <NotificationIcon src='/assets/notification.png' />
          Your password has been updated.
        </Notification>,
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (err) {
      dispatch(stopSubmit());
      dispatch({ type: 'PROFILE_UPDATE_ERROR', payload: err });
      console.log(err);
    }
  };
};

const updateProfile = (updatedInfo) => {
  const currentUser = firebase.auth().currentUser.uid;
  return async (dispatch) => {
    try {
      dispatch(startSubmit());
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser)
        .update({
          ...updatedInfo,
        });
      dispatch(stopSubmit());
      toast.info(
        <Notification>
          <NotificationIcon src='/assets/notification.png' />
          Your profile has been updated.
        </Notification>,
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      const getUser = firebase.firestore().collection('users').doc(currentUser);

      const getUserProfile = await getUser.get();

      const profileData = getUserProfile.data();

      dispatch({ type: 'UPDATE_USER_PROFILE', payload: profileData });
    } catch (err) {
      dispatch(stopSubmit());
      console.log(err);
    }
  };
};

const handlePhotoUpload = (file) => {
  let currentUser = firebase.auth().currentUser;
  let batch = firebase.firestore().batch();
  return async (dispatch, getState) => {
    let userCoords = getState().profile.userCoords;
    try {
      const path = `${currentUser.uid}/images/${file.name}`;
      const storageRef = firebase.storage().ref(path);
      await storageRef.put(file);

      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid);

      let imageUrl = await storageRef.getDownloadURL();

      await userRef.update({
        photoURL: imageUrl,
      });

      await firebase
      .firestore()
      .collection('events')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if(doc.data().attendees.hasOwnProperty(currentUser.uid)) {
            console.log(doc.data().attendees);
            const docRef = firebase.firestore().collection('events').doc(doc.id);
            batch.update(docRef, {[`attendees.${currentUser.uid}`]: {...doc.data().attendees[currentUser.uid], attendeePhoto: imageUrl}})
          }
        })
      })
      .catch(err => {
        console.log(err);
      })

      await firebase
      .firestore()
      .collection('events')
      .where(`hostedBy.hostId`, '==', currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const docRef = firebase.firestore().collection('events').doc(doc.id)
          batch.update(docRef, {hostedBy: {...doc.data().hostedBy, hostPhoto: imageUrl}})
        })
      })

      await batch.commit();

      await dispatch(getEvents(userCoords));

      const userProfileData = await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();

      dispatch({
        type: 'UPDATE_USER_PROFILE',
        payload: userProfileData.data(),
      });

      if (userProfileData) {
        toast.info(
          <Notification>
            <NotificationIcon src='/assets/notification.png' />
            Your profile photo has been updated.
          </Notification>,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
          }
        );
        return;
      } else {
        console.log('Sorry, there has been an error.');
      }
    } catch (err) {
      console.log('Error getting document.', err);
    }
  };
};

export {
  getUsers,
  supplyCoords,
  supplySearchLocation,
  attendEvent,
  unattendEvent,
  editPassword,
  handlePhotoUpload,
  updateProfile,
};
