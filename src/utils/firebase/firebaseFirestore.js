import { firebase } from './firebaseAuth';
import 'firebase/compat/firestore';

const firebaseDB = firebase.firestore();

const usersRef = firebaseDB.collection('users');

// This will cause error, as firebase is not initialized when firebase is called.
const addToUsersCollection = (uid, name, authProvider, email) => {
  usersRef.add({
    uid,
    name,
    authProvider,
    email,
  });
};

export { addToUsersCollection };
