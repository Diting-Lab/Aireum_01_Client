/* This service takes care of:
- Manage logging to Google Logging
- TODO: Need to replace with your own service account file in server/util/googleLogging.js
*/

import axios from 'axios';

// get source from .env
const source = process.env.REACT_APP_SOURCE;
console.log('source is ', source);

const localhost = process.env.REACT_APP_LOCAL_HOST;
const port = process.env.REACT_APP_SERVER_PORT_NUMBER;

function log(message, severity) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log?severity=${severity}&message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logDebug(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_debug?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logInfo(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_info?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logNotice(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_notice?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logWarning(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_warning?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logError(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_error?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logCritical(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_critical?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logAlert(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_alert?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

function logEmergency(message) {
  var stacktrace = new Error().stack;
  axios
    .post(
      `http://${localhost}:${port}/log_emergency?message=${message}&source=${source}&stacktrace=${stacktrace}`
    )
    .then((data) => console.log('call api data is ', data));
}

export {
  log,
  logDebug,
  logInfo,
  logNotice,
  logWarning,
  logError,
  logCritical,
  logAlert,
  logEmergency,
};
