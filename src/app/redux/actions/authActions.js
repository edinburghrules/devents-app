import firebase from '../../config/firebase';
import { startAuthorising, stopAuthorising } from '../actions/asyncActions';

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
      dispatch({ type: 'SIGNUP_FAILED', payload: err.message });
    }
  };
};

const login = (creds, history) => {
  return async (dispatch) => {
    dispatch(startAuthorising());
    try {
      const signin = await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      const currentUser = signin.user;

      dispatch({ type: 'LOGIN', payload: currentUser });
      history.push('/');
      dispatch(stopAuthorising());
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
        type: 'LOGIN_FAILED',
        payload: { errorType: errType, msg: err.message },
      });
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch({ type: 'LOGOUT' });
      dispatch(stopAuthorising());
      return;
    } catch (err) {
      console.log(err);
    }
  };
};

const logInWithGoogle = (history) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return async (dispatch) => {
    dispatch(startAuthorising());
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

      history.push('/');
      dispatch(stopAuthorising());
    } catch (err) {
      dispatch(stopAuthorising());
      dispatch({ type: 'LOGIN_FAILED', payload: err.message });
    }
  };
};

const clearLoginErrMsg = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_LOGIN_ERROR' });
  };
};

export { login, logout, logInWithGoogle, signUp, clearLoginErrMsg };
