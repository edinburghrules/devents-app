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
          photoURL: imageUrl
        });

        const userProfileData = await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();
        
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: userProfileData.data() });
      
    } catch (err) {
      console.log('Error getting document.', err);
    }
  };
};

export { editPassword, handlePhotoUpload, updateProfile };
