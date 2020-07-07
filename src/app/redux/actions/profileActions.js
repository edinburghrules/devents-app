import firebase from '../../config/firebase';

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
  let currentUser = firebase.auth().currentUser;
  return async dispatch => {
    let storageRef = firebase.storage().ref(`${currentUser.uid}/images/${file.name}`);
    storageRef.put(file).then(() => {
      console.log('done!');
    });
  }

};

export { editPassword, handlePhotoUpload, updateProfile };
