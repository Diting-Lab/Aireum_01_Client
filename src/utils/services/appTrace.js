const StackTrace = require('stacktrace-js');

var callback = function (stackframes) {
  var stringifiedStack = stackframes
    .map(function (sf) {
      return sf.toString();
    })
    .join('\n');
  //console.log(stackframes);
  //console.log('heyy');
};

var errback = function (err) {
  console.log(err.message);
};

// var myFunc = function (arg) {
//   return 'Hello ' + arg;
// };

//var error = new Error('BOOM!');

var addTrace = (myFunc) => {
  StackTrace.instrument(myFunc, callback, errback);
  //StackTrace.get().then(callback).catch(errback);
  //StackTrace.fromError(error).then(callback).catch(errback);
};

var getTrace = () => {
  // StackTrace.instrument(myFunc, callback, errback);
  StackTrace.get().then(callback).catch(errback);
  //StackTrace.fromError(error).then(callback).catch(errback);
};

module.exports = { getTrace, addTrace, StackTrace, callback, errback };
