import firebase from '../../config/firebase';
import { startLoading, stopLoading, startAuthorising, stopAuthorising } from '../actions/asyncActions';

const signUp = (creds) => {
  return async (dispatch) => {
    dispatch(startAuthorising());
    try {
      const signup = await firebase
        .auth()
        .createUserWithEmailAndPassword(creds.email, creds.password);

      const userProfile = {
        uid: signup.user.uid,
        displayName: `${creds.firstName} ${creds.lastName}`,
        photoURL: signup.user.photoURL,
        joined: new Date(),
        dob: null,
        homeCity: '',
        about: '',
      };

      await firebase
        .firestore()
        .collection('users')
        .doc(signup.user.uid)
        .set({
          ...userProfile,
        });

      await dispatch({ type: 'SIGN_UP', payload: { ...signup.user } });
      await dispatch({
        type: 'LOAD_USER_PROFILE',
        payload: { ...userProfile },
      });
      dispatch(stopAuthorising());
      return signup.user.uid;
    } catch (err) {
      dispatch(stopAuthorising());
      dispatch({ type: 'AUTH_FAILED', payload: err.message });
    }
  };
};

const login = (creds) => {
  return async (dispatch) => {
    dispatch(startAuthorising());
    try {
      const signin = await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      const currentUser = signin.user;

      await dispatch({ type: 'LOGIN', payload: currentUser });
   
      dispatch(stopAuthorising());

      return currentUser.uid;

    } catch (err) {
      dispatch(stopAuthorising());
      let errType;
      if (err.code === 'auth/user-not-found') {
        err.message = 'The provided email is not recognised!';
        errType = 'email';
      } else if (err.code === 'auth/wrong-password') {
        errType = 'password';
        err.message = 'The provided password is incorrect!';
      }
      dispatch({
        type: 'AUTH_FAILED',
        payload: { errorType: errType, msg: err.message },
      });
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      await firebase.auth().signOut();
      dispatch({ type: 'LOGOUT' });
      setTimeout(() => {
        dispatch(stopLoading());
      }, 500);
      return;
    } catch (err) {
      console.log(err);
    }
  };
};

const logInWithGoogle = (googleLogin) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return async (dispatch) => {
      dispatch(startAuthorising(googleLogin));
    try {
      const signin = await firebase.auth().signInWithPopup(provider);
      const isNewUser = signin.additionalUserInfo.isNewUser;
      const currentUser = signin.user;

      if (isNewUser) {
        const userProfile = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          joined: new Date(),
          dob: null,
          homeCity: '',
          about: '',
        };

        firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set({
            ...userProfile,
          });

        dispatch({ type: 'LOAD_USER_PROFILE', payload: { ...userProfile } });
      }

      dispatch({ type: 'GOOGLE_LOGIN', payload: currentUser });

      dispatch(stopAuthorising());

      return;
      
    } catch (err) {
      dispatch(stopAuthorising());
      dispatch({ type: 'AUTH_FAILED', payload: err.message });
    }
  };
};

const clearLoginErrMsg = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_AUTH_FAILED_ERROR' });
  };
};

export { login, logout, logInWithGoogle, signUp, clearLoginErrMsg };
