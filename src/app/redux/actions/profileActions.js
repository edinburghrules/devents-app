import firebase from '../../config/firebase';
import { toast } from 'react-toastify';
import { startSubmit, stopSubmit } from './asyncActions';

const editPassword = (newPassword) => {
  return async (dispatch) => {
    try {
      dispatch({type: 'CLEAR_PROFILE_UPDATE_ERROR'})
      dispatch(startSubmit());
      await firebase.auth().currentUser.updatePassword(newPassword);
      dispatch(stopSubmit());
      toast.info('🔒 Password updated!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      dispatch(stopSubmit());
      dispatch({type: 'PROFILE_UPDATE_ERROR', payload: err})
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
      toast.info('✅ Profile updated!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

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
  console.log('is it working?');
  let currentUser = firebase.auth().currentUser;
  return async (dispatch) => {
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
        toast.info('📷 Profile photo updated!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true
        });
        return;
      } else {
        console.log('Sorry, there has been an error.');
      }
    } catch (err) {
      console.log('Error getting document.', err);
    }
  };
};

export { editPassword, handlePhotoUpload, updateProfile };
