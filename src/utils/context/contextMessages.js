import React, { useReducer, createContext } from 'react';
import update from 'lodash/update';
import { AppLog } from '../services/appLog';

const initialState = {
  messages: [
    // { error: 'initial errors' },
    // { error1: { errorKey1: 'errorValue1', errorKey2: 'errorValue2' } },
    // { error2: { errorKey3: 'errorValue3', errorKey4: 'errorValue4' } },
  ],
};

// if (localStorage.getItem("jwtToken")) {
//   const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("jwtToken");
//   } else {
//     initialState.user = decodedToken;
//   }
// }

const MessagesContext = createContext({
  messages: null,
  addMessage: (message) => {},
});

function messageReducer(state, action) {
  switch (action.type) {
    case 'UPDATEMESSAGE':
      return {
        ...state,
        messages: update(state.messages, Object.keys(action.payload)[0], () => {
          return Object.values(action.payload)[0];
        }),
        // state.messages.concat(action.payload),
      };

    case 'ADDMESSAGE':
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };

    default:
      return state;
  }
}

function MessageProvider(props) {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  function addMessage(message) {
    // localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'ADDMESSAGE',
      payload: message,
    });
  }

  function updateMessage(message) {
    // localStorage.setItem('jwtToken', userData.token);
    AppLog(Object.keys(message), 'KEY IS');
    AppLog(Object.values(message), 'VALUE IS');
    dispatch({
      type: 'UPDATEMESSAGE',
      payload: message,
    });
  }

  return (
    <MessagesContext.Provider
      value={{ messages: state.messages, addMessage, updateMessage }}
      {...props}
    />
  );
}

export { MessagesContext, MessageProvider };
