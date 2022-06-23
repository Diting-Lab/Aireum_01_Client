/* This helper takes care of:
- Managing local storage, set/get/update/remove/clear context
*/

import assign from 'lodash/assign';
import update from 'lodash/update';
import { AppLog } from '../services/appLog';
import { usersRef, updateDoc } from '../firebase/firebaseAuth';

function setContext(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function getContext(key) {
  return JSON.parse(localStorage.getItem(key));
}

function removeContext(key) {
  return localStorage.removeItem(key);
}

function clearContext() {
  return localStorage.clear();
}

function listFullContext() {
  var items = [],
    keys = Object.keys(localStorage),
    i = 0,
    key;

  for (; (key = keys[i]); i++) {
    key !== ('_grecaptcha' && 'loglevel') &&
      items.push({ key: key, value: JSON.parse(localStorage.getItem(key)) });
  }

  return items;
}

function setCurUserContext(user) {
  AppLog(user, 'user get is ');
  usersRef
    .where('uid', '==', user.uid)
    .get()
    .then((querySnapshot) => {
      AppLog(querySnapshot, 'querySnapshot is ');
      querySnapshot.docs.map((doc) => {
        const curUser = assign({}, doc.data(), user);
        AppLog(user, ' user is ');
        AppLog(curUser, 'current user is ');
        return setContext('curUser', curUser);
      });
    })
    .then(() => {
      // window.location.assign('/content');
    });
}

function updateContext(key, newContext) {
  const newKey = Object.keys(newContext)[0];
  const newValue = Object.values(newContext)[0];
  AppLog(newKey, 'key is');

  AppLog(newValue, 'value is');
  var items = getContext(key);
  AppLog(items, 'item before update is');
  AppLog(items.newKey, 'items.newKey is');
  AppLog(newValue, 'updateValue before update is');

  update(items, newKey, () => {
    return newValue;
  });

  AppLog(items, 'after update is');
  setContext(key, items);
}

function isLoggedIn() {
  if (getContext('user')) return true;
  return false;
}

function setProfileContext(uid) {
  usersRef
    .where('uid', '==', uid)
    .get()
    .then((querySnapshot) => {
      AppLog(querySnapshot, 'querySnapshot is ');
      querySnapshot.docs.map((doc) => {
        return setContext('appProfile', doc.data());
      });
    })
    // TODO: change the landing page after user logged in
    .then(() => {
      window.location.assign('/content');
      // window.location.assign(`/user/${uid}`);
    });
}

async function addProfile(usersRef, uid, username, providerId, email, phone) {
  await usersRef
    .where('uid', '==', uid)
    .get()
    .then((query) => {
      AppLog(query, 'query is ');
      if (query.docs.length === 0) {
        usersRef.add({
          uid: uid,
          name: username,
          authProvider: providerId,
          email: email,
          bio: '',
          phone: phone,
          gender: '',
          preference: {
            darkTheme: process.env.REACT_APP_DEFAULT_THEME !== 'LIGHT',
            locale: process.env.REACT_APP_DEFAULT_LOCALE,
          },
        });
      }
    });
}

// newProfile is an object with key value pair
async function updateAppProfile(uid, newProfile) {
  await usersRef
    .where('uid', '==', uid)
    .get()
    .then((doc) => {
      // doc.docs[0].ref.update(newProfile);
      updateDoc(doc.docs[0].ref, newProfile);
    })
    .then(() => {
      updateContext('appProfile', newProfile);
    });
}

export {
  setContext,
  getContext,
  removeContext,
  clearContext,
  listFullContext,
  updateContext,
  isLoggedIn,
  setProfileContext,
  setCurUserContext,
  addProfile,
  updateAppProfile,
};
