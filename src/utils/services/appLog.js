// import { AppLogMode } from '../../config';
import StackTrace from './appTrace';

const AppLogMode = process.env.REACT_APP_APPLOG_MODE;

let moduleName = '?';

function setModuleName(name) {
  moduleName = name;
}

function addStack(myFunc) {
  StackTrace.addTrace(myFunc);
}

function AppLog(message, label, mode) {
  //If mode = DEV or null => display in PROD_BEBUG and DEV modes
  //If mode = PROD_DEBUG => display in PROD_BEBUG
  //If mode = PROD => display in ALL modes

  if (mode == null) mode = 'DEV';
  var isLogToConsole = false;

  switch (AppLogMode) {
    case 'DEV':
      if (mode === 'PROD_DEBUG' || mode === 'DEV') {
        isLogToConsole = true;
      }
      isLogToConsole = true;
      break;
    case 'PROD_DEBUG':
      if (mode === 'PROD_DEBUG') {
        isLogToConsole = true;
      }
      break;
    case 'PROD':
      break;
    default:
  }

  if (isLogToConsole) {
    const msg =
      new Date().toLocaleTimeString() +
      '|AppLog(' +
      mode +
      ')>' +
      moduleName +
      '>' +
      label +
      ':';
    console.log(msg, message);
  }

  return false;
}

export { AppLog, addStack, setModuleName };
