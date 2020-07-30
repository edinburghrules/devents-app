import firebase from '../../config/firebase';
import { stopLoading } from '../../redux/actions/asyncActions';

const editPassword = (newPassword) => {
  try {
    firebase.auth().currentUser.updatePassword(newPassword);
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = (updatedInfo) => {
  const currentUser = firebase.auth().currentUser.uid;
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser)
        .update({
          ...updatedInfo,
        });
      console.log('Updated!');

      const getUser = firebase.firestore().collection('users').doc(currentUser);

      const getUserProfile = await getUser.get();

      const profileData = getUserProfile.data();

      dispatch({ type: 'UPDATE_USER_PROFILE', payload: profileData });
    } catch (err) {
      console.log(err);
    }
  };
};

const handlePhotoUpload = (file) => {
  console.log('is it working?')
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

      return new Promise((resolve, reject) => {
        console.log('is it working in the promise?');
        if (userProfileData) {
          setTimeout(resolve, 1200);
          dispatch(stopLoading());
        } else {
          reject('Sorry there has been an error');
        }
      });
    } catch (err) {
      console.log('Error getting document.', err);
    }
  };
};

export { editPassword, handlePhotoUpload, updateProfile };
