import firebase from '../../config/firebase';

const signUp = (creds, history) => {
  return async (dispatch) => {
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
        about: ''
      };

      await firebase
        .firestore()
        .collection('users')
        .doc(signup.user.uid)
        .set({
          ...userProfile,
        });

      dispatch({ type: 'SIGN_UP', payload: { ...signup.user } });
      dispatch({ type: 'LOAD_USER_PROFILE', payload: { ...userProfile } });
      history.push('/');
    } catch (err) {
      dispatch({ type: 'SIGNUP_FAILED', payload: err.message });
    }
  };
};

const login = (creds, history) => {
  return async (dispatch) => {
    try {
      const signin = await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      const currentUser = signin.user;

      dispatch({ type: 'LOGIN', payload: currentUser });
      history.push('/');
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/user-not-found') {
        err.message = 'The provided email is not recognised!';
      } else if (err.code === 'auth/wrong-password') {
        err.message = 'The provided password is incorrect!';
      }
      dispatch({ type: 'LOGIN_FAILED', payload: err.message });
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    try{  
      await firebase.auth().signOut();
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
        console.log(err);
    }
  };
};

const logInWithGoogle = (history) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return async (dispatch) => {
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
          about: ''
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
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILED', payload: err.message });
    }
  };
};



export { login, logout, logInWithGoogle, signUp };
