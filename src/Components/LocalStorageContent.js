/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
import { listFullContext } from '../utils/helpers/appContext';

export default function LocalStorageContent() {
  setModuleName('LocalStorageContent');
  const lsItems = listFullContext();
  AppLog(lsItems, 'local storage items is ');

  let itemDetail =
    lsItems.length === 0 ? (
      <p>local storage is empty</p>
    ) : (
      lsItems.map((item, index) => {
        if (item.key === 'user') {
          const {
            apiKey,
            appName,
            displayName,
            email,
            emailVerified,
            photoURL,
            uid,
            phoneNumber,
          } = item.value;
          return (
            <div key={index}>
              <h3>Key: </h3>
              <p>{item.key}</p>
              <h3>Value: </h3>
              <p>uid: {uid}</p>
              <p>apiKey: {apiKey}</p>
              <p>appName: {appName}</p>
              <p>email: {email}</p>
              <p>phone: {phoneNumber}</p>
              <p>emailVerified: {emailVerified}</p>
              <p>displayName: {displayName}</p>
              <img alt="photo url" src={photoURL} />
              <p>---------------------------------</p>
            </div>
          );
        }
        if (item.key === 'permission') {
          return (
            <div key={index}>
              <h3>Key: </h3>
              <p>{item.key}</p>
              <h3>Value: </h3>
              <p>{item.value}</p>
              <p>---------------------------------</p>
            </div>
          );
        }
      })
    );
  return (
    <div style={{ margin: 20 }}>
      <h2>This component list all local storage ltems detail</h2>
      <p>---------------------------------</p>
      {itemDetail}
    </div>
  );
}
