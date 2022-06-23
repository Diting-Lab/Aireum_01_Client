/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import {
  getAuth,
  updateProfile,
  updateEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  PhoneAuthProvider,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { updateDoc, doc, getDoc, setDoc } from '@firebase/firestore';

/***************************************************************
 * Custom Components
 ***************************************************************/
import {
  setContext,
  clearContext,
  updateContext,
  setProfileContext,
  setCurUserContext,
  addProfile,
  updateAppProfile,
} from '../helpers/appContext';
import { AppLog, setModuleName } from '../services/appLog';
// import { addToUsersCollection } from './firebaseFirestore';

setModuleName('firebase');

// firebase config
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'aireumapp.firebaseapp.com',
  projectId: 'aireumapp',
  storageBucket: 'aireumapp.appspot.com',
  messagingSenderId: '86449097425',
  appId: '1:86449097425:web:1abdb71a6c24e9cf8853f0',
};

// Configure FirebaseUI.

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/content',
  // We will display Google and Facebook as auth providers.

  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      // scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      // customParameters: {
      //   // Forces account selection even when one account
      //   // is available.
      //   prompt: 'select_account',
      // },

      // set the label shown when login
      // fullLabel: `Sign in APP with Google`,
    },
    {
      provider: FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends',
        'user_birthday',
      ],
      // customParameters: {
      //   // Forces password re-entry.
      //   auth_type: 'reauthenticate',
      // },
    },
    {
      provider: PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image', // 'audio'
        size: 'normal', // 'invisible' or 'compact'
        badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
      },
      defaultCountry: 'CA',
      defaultNationalNumber: '1234567890',
      loginHint: '+11234567890',
      whitelistedCountries: ['US', '+44', '+86'],
    },
  ],

  callbacks: {
    signInSuccessWithAuthResult: (result) => {
      AppLog(result, 'sign in call back is ');

      if (result) {
        //Sign in

        const { uid, displayName, email } = result.user;
        const providerId = result.additionalUserInfo.providerId;

        const phone = providerId === 'phone' ? result.user.phoneNumber : '';
        const username = providerId === 'phone' ? `user${uid}` : displayName;
        // save user
        addProfile(usersRef, uid, username, providerId, email, phone).then(
          () => {
            //save user&& permission in local storage
            setContext('user', result.user);
            setContext('permission', 'readOnly');
            setContext('authProviderData', result);

            //get app profile from firestore, and save in local storage
            setProfileContext(uid);
          }
        );
      } else {
        //Sign out
      }
    },
  },
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth();

// access firestore
const firebaseDB = firebase.firestore();
const usersRef = firebaseDB.collection('profiles');
const videosRef = firebaseDB.collection('videos');
const categoriesRef = firebaseDB.collection('categories');
const contentsRef = firebaseDB.collection('contents');
const albumsRef = firebaseDB.collection('mediaAlbums');
const mediaRef = firebaseDB.collection('media');

const storage = firebase.storage();

// sign up with email
const createUserWithEmail = async (email, password) => {
  //TODO: handle password validation, only handle password not empty error for now.
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      AppLog(result, 'result is');

      const { email, uid } = result.user;
      const username = `user${uid}`;
      const providerId = result.additionalUserInfo.providerId;
      // save user
      addProfile(usersRef, uid, username, providerId, email, '').then(() => {
        // save user object to local storage
        setContext('user', result.user);
        setContext('authProviderData', result);
        setContext('permission', 'readOnly');

        //get app profile from firestore, and save in local storage
        setProfileContext(uid);
      });

      // addToUsersCollection(result.user.uid, username, 'email/password', email);
    });
};

// sign in with Google
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    signInWithPopup(auth, googleProvider).then((result) => {
      const { uid, displayName, email } = result.user;
      const providerId = result.additionalUserInfo.providerId;
      const phone = '';
      addProfile(usersRef, uid, displayName, providerId, email, phone);
    });
  } catch (err) {
    console.error(err);
  }
};

// login with email
const loginUserWithEmail = async (email, password) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      AppLog(result, 'login by email result is ');
      if (result) {
        //Sign in

        //save user&& permission in local storage
        setContext('user', result.user);
        setContext('authProviderData', result);
        setContext('permission', 'readOnly');
        setCurUserContext(result.user);

        //get app profile from firestore, and save in local storage
        setProfileContext(result.user.uid);
      } else {
        //TODO:handle error
      }
    });
};

// sign out
const logoutUser = () => {
  signOut(auth);
  clearContext();
};

// update user profile
const updateUserProfile = (displayName) => {
  updateProfile(auth.currentUser, {
    displayName: displayName,
  })
    .then((result) => {
      // Profile updated!
      updateAppProfile(auth.currentUser.uid, {
        name: displayName,
      }).then(() => {
        // update localstorage
        updateContext('user', { displayName: displayName });
        updateContext('authProviderData', { 'user.displayName': displayName });
        updateContext('appProfile', { name: displayName });
      });
    })
    .catch((error) => {
      // An error occurred
      alert(error);
    });
};

// update user email
const updateUserEmail = async (email) => {
  // try {
  await updateEmail(auth.currentUser, email).then(() => {
    // Email updated!
    usersRef
      .where('uid', '==', auth.currentUser.uid)
      .get()
      .then((doc) => {
        doc.docs[0].ref.update({ email: email });

        // update localstorage
        updateContext('user', { email: email });
        updateContext('authProviderData', { email: email });
        updateContext('appProfile', { email: email });
      });
  });
};

//update password
const updateUserPassword = async (newPassword) => {
  await updatePassword(auth.currentUser, newPassword).then(() => {
    AppLog('successfull', 'update password ');
  });
};

//re-authenticate user
const reAuth = async (email, password) => {
  var user = auth.currentUser;
  var credential = EmailAuthProvider.credential(email, password);

  await reauthenticateWithCredential(user, credential).then(() => {
    // User re-authenticated.
    AppLog('successfull', 'reAuth ');
  });
};

export {
  firebase,
  firebaseDB,
  usersRef,
  videosRef,
  categoriesRef,
  contentsRef,
  albumsRef,
  mediaRef,
  auth,
  storage,
  createUserWithEmail,
  loginUserWithEmail,
  logoutUser,
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
  onAuthStateChanged,
  signInWithGoogle,
  uiConfig,
  reAuth,
  updateDoc,
  doc,
  getDoc,
  setDoc,
};
