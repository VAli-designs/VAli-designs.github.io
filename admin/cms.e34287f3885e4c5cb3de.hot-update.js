webpackHotUpdate("cms",{

/***/ "./node_modules/add-px-to-style/index.js":
/*!***********************************************!*\
  !*** ./node_modules/add-px-to-style/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

module.exports = function(name, value) {
  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
    return value + 'px';
  } else {
    return value;
  }
};

/***/ }),

/***/ "./node_modules/dom-css/index.js":
/*!***************************************!*\
  !*** ./node_modules/dom-css/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var prefix = __webpack_require__(/*! prefix-style */ "./node_modules/prefix-style/index.js")
var toCamelCase = __webpack_require__(/*! to-camel-case */ "./node_modules/to-camel-case/index.js")
var cache = { 'float': 'cssFloat' }
var addPxToStyle = __webpack_require__(/*! add-px-to-style */ "./node_modules/add-px-to-style/index.js")

function style (element, property, value) {
  var camel = cache[property]
  if (typeof camel === 'undefined') {
    camel = detect(property)
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel]
    }

    element.style[camel] = addPxToStyle(camel, value)
  }
}

function each (element, properties) {
  for (var k in properties) {
    if (properties.hasOwnProperty(k)) {
      style(element, k, properties[k])
    }
  }
}

function detect (cssProp) {
  var camel = toCamelCase(cssProp)
  var result = prefix(camel)
  cache[camel] = cache[cssProp] = cache[result] = result
  return result
}

function set () {
  if (arguments.length === 2) {
    if (typeof arguments[1] === 'string') {
      arguments[0].style.cssText = arguments[1]
    } else {
      each(arguments[0], arguments[1])
    }
  } else {
    style(arguments[0], arguments[1], arguments[2])
  }
}

module.exports = set
module.exports.set = set

module.exports.get = function (element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '')
      return obj
    }, {})
  } else {
    return style(element, properties || '')
  }
}


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/index.js":
/*!*************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


module.exports = __webpack_require__(/*! ./lib/GphApiClient */ "./node_modules/giphy-js-sdk-core/lib/GphApiClient.js");

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/GphApiClient.js":
/*!************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/GphApiClient.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var _ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
var RequestHandler = __webpack_require__(/*! ./handlers/RequestHandler */ "./node_modules/giphy-js-sdk-core/lib/handlers/RequestHandler.js");

var serverUrl = "https://api.giphy.com";

/**
 * Class representing the networking client.
 */

var GphApiClient = function () {
  function GphApiClient(apiKey) {
    _classCallCheck(this, GphApiClient);

    this.apiKey = apiKey;
  }

  /**
   * Initialize the SDK by passing in the apiKey.
   */


  _createClass(GphApiClient, [{
    key: 'setCredentials',
    value: function setCredentials(apiKey) {
      this.apiKey = apiKey;
    }

    /**
     * @return a list of gifs that match the inputted search query
     * @param {String} type - specify whether it is a gif or a sticker
     * @param {Object} params an object containing parameters
     * @param {String} params.q search query term or phrase
     * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
     * @param {Integer} params.offset(optional) results offset, defaults to 0.
     * @param {String}  params.rating (optional) limit results to those rated (y,g, pg, pg-13 or r).
     * @param {String} params.lang (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code. See list of supported languages here
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'search',
    value: function search(type, params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/' + type + '/search',
        method: 'get',
        type: type,
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'search', cb);
    }

    /**
     * @return a list of currently trending gifs
     * @param {Object} params an object containing parameters
     * @param {String} type specify whether it is a gif or a sticker
     * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
     * @param {Integer} params.offset(optional) results offset, defaults to 0.
     * @param {String} params.rating (optional) limit results to those rated (y,g, pg, pg-13 or r).
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'trending',
    value: function trending(type, params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/' + type + '/trending',
        method: 'get',
        type: type,
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'trending', cb);
    }

    /**
     * @return a single gif
     * @param {String} type specify whether it is a gif or a sticker
     * @param {Object} params an object containing parameters
     * @param {String} params.s (optional) the term you would like to have translated
     * @param {String} params.rating (optional) @type string limit results to those rated (y,g, pg, pg-13 or r).   
     * @param {String} params.lang (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'translate',
    value: function translate(type, params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/' + type + '/translate',
        method: 'get',
        type: type,
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'translate', cb);
    }

    /**
     * @return a random gif
     * @param {String} type specify whether it is a gif or a sticker
     * @param {Object} params an object containing parameters
     * @param {String} params.tag (optional) the GIF tag to limit randomness by
     * @param {String} params.rating (optional) limit results to those rated (y,g, pg, pg-13 or r).
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'random',
    value: function random(type, params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/' + type + '/random',
        method: 'get',
        type: type,
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'random', cb);
    }

    /**
     * @return single gif based on the provided ID
     * @param {String} id ID associated with a specific gif
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'gifByID',
    value: function gifByID(id, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/gifs/' + id,
        method: 'get',
        params: {
          api_key: this.apiKey
        }
      };

      return RequestHandler(data, 'gifByID', cb);
    }

    /**
     * @return a list of gifs per ID
     * @param {Object} params an object containing parameters
     * @param {Array} params.ids (optional) return results in html or json format (useful for viewing responses as GIFs to debug/test)
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'gifsByIDs',
    value: function gifsByIDs(params, cb) {

      //separate teh array into a string of separated values as superagent needs special formatting for array params
      params.ids = params.ids.join(',');

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/gifs',
        method: 'get',
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'gifsByIDs', cb);
    }

    /**
     * @return a list of categories
     * @param {String} type gif or a sticker
     * @param {Object} params an object containing parameters
     * @param {String} params.sort (optional)
     * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'categoriesForGifs',
    value: function categoriesForGifs(params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/gifs/categories',
        method: 'get',
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'categoriesForGifs', cb);
    }

    /**
     * @return a list of subcategories for a category
     * @param {String} subcategory subcategory name
     * @param {Object} params an object containing parameters
     * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
     * @param {Integer} params.offset (optional) results offset, defaults to 0.
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'subCategoriesForGifs',
    value: function subCategoriesForGifs(subcategory, params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/gifs/categories/' + subcategory,
        method: 'get',
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'subCategoriesForGifs', cb);
    }

    /**
     * @return a list of gifs
     * @param {Object} params an object containing parameters
     * @param {String} category category name
     * @param {String} subcategory subcategory name
     * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
     * @param {Integer} params.offset offset (optional) results offset, defaults to 0.
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'gifsByCategories',
    value: function gifsByCategories(category, subcategory, params, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/gifs/categories/' + category + '/' + subcategory,
        method: 'get',
        params: _.extend({
          api_key: this.apiKey
        }, params)
      };

      return RequestHandler(data, 'gifsByCategories', cb);
    }

    /**
     * @return a list of term suggestions
     * @param {String} term a term to receive back similar terms
     * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
     */

  }, {
    key: 'termSuggestions',
    value: function termSuggestions(term, cb) {

      var data = {
        //grabs the correct endpoint from an object
        url: serverUrl + '/v1/queries/suggest/' + term,
        method: 'get',
        params: _.extend({
          api_key: this.apiKey
        })
      };

      return RequestHandler(data, 'termSuggestions', cb);
    }
  }]);

  return GphApiClient;
}();

module.exports = function (apiKey) {
  return new GphApiClient(apiKey);
};

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/handlers/RequestHandler.js":
/*!***********************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/handlers/RequestHandler.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var ResponseHandler = __webpack_require__(/*! ./ResponseHandler */ "./node_modules/giphy-js-sdk-core/lib/handlers/ResponseHandler.js");
__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill();
if (typeof fetch === 'undefined') {
  __webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
}

function RequestHandler(vals, endpoint, cb) {

  function req(args, cb) {
    var canceled = false;
    var query_params_string = "?";

    Object.keys(args.params).forEach(function (key) {
      query_params_string = query_params_string.concat(key + "=" + args.params[key] + "&");
    });

    var constructedRequest = new Promise(function (resolve, reject) {
      if (vals.type && vals.type !== 'gifs' && vals.type !== 'stickers') {
        reject("The type argument was passed in incorrectly. It should be either 'gifs' or 'stickers'");
      }

      fetch(args.url + query_params_string, {
        method: args.method
      }).then(function (response) {
        //calling the end function will send the actual request 
        if (canceled === true) {
          return;
        } else {
          response.json().then(function (data) {
            ResponseHandler(response, data, function (res) {
              resolve(res);
              if (cb !== undefined) {
                cb(res, null);
              }
            }, function (err) {
              reject(err);
              if (cb !== undefined) {
                cb(null, err);
              }
            }, endpoint); //pass in args.url so you can determine before resolving the promise what request was just made
            // we pass the response to our helper method imported from ./helpers/
          });
        }
      }).catch(function (err) {
        reject(err);
      });
    });
    //allows users to cancel outgoing requests
    constructedRequest.cancel = function () {
      canceled = true;
    };

    return constructedRequest;
  }

  return req(vals, cb);
  //return the promise
}

module.exports = RequestHandler;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/handlers/ResponseHandler.js":
/*!************************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/handlers/ResponseHandler.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var responseFormatter = __webpack_require__(/*! ../utils/responseFormatter */ "./node_modules/giphy-js-sdk-core/lib/utils/responseFormatter.js");

//handle status code and resolve/reject promise
function ResponseHandler(res, data, resolve, reject, endpoint) {
  //handle error status code
  if (res.status >= 400 && res.status <= 502) {
    reject({
      status: res && res.status ? res.status : "unknown api error",
      error: res && data && data.meta && data.meta.msg ? data.meta.msg : null,
      statusText: res && res.statusText ? res.statusText : null
    });
  }
  //deal with successful status code
  if (res && res.status >= 200 && res.status < 300) {
    //pass the api response into a formatter to ensure it is to spec
    var constructorModifiedData = formatApiReturn(data, endpoint);
    resolve(constructorModifiedData);
  } else {
    //reject promise with unexpected error
    reject({
      status: res && res.status ? res.status : 'unknown api error',
      error: res && res.status ? res.status : 'unknown api error',
      statusText: res && res.statusText ? res.statusText : null
    });
  }
}

//creates the response object
function formatApiReturn(body, endpoint) {
  var responseObject = {};
  //modify the data field to match spec
  responseObject.data = responseFormatter(body.data, endpoint);
  responseObject.meta = body.meta;
  if (body.pagination) {
    responseObject.pagination = body.pagination;
    if (!responseObject.pagination.offset) {
      responseObject.pagination.offset = null;
    }
  }
  return responseObject;
}

module.exports = ResponseHandler;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/Category.js":
/*!**************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/Category.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
var Media = __webpack_require__(/*! ./Media */ "./node_modules/giphy-js-sdk-core/lib/utils/Media.js");
var _ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");

var Category = function Category(data) {
  return {
    name: data.name ? data.name : null,
    name_encoded: data.name_encoded ? data.name_encoded : null,
    gif: data.gif ? Media(data.gif) : null,
    subcategories: data.subcategories ? _.map(data.subcategories, function (subcat) {
      return Category(subcat);
    }) : null
  };
};

module.exports = Category;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/Image.js":
/*!***********************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/Image.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * Custom Image object.
 *
 * @param {object} data
 * @param {string} id
 * @param {string} rendition_type
 * 
 * @returns {object} Object containing API Image object, id from GIF 
 * object and rendition type.
 */
var Image = function Image(data, id, rendition_type) {
  return {
    media_id: id ? id : null,
    rendition_type: rendition_type ? rendition_type : null,
    url: data.url ? data.url : null,
    width: data.width ? data.width : null,
    height: data.height ? data.height : null,
    size: data.size ? data.size : null,
    frames: data.frames ? data.frames : null,
    mp4: data.mp4 ? data.mp4 : null,
    mp4_size: data.mp4_size ? data.mp4_size : null,
    webp: data.webp ? data.webp : null,
    webp_size: data.webp_size ? data.webp_size : null
  };
};

module.exports = Image;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/Images.js":
/*!************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/Images.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var Image = __webpack_require__(/*! ./Image */ "./node_modules/giphy-js-sdk-core/lib/utils/Image.js");

var Images = function Images(data, id) {
  return {
    media_id: id,
    fixed_height: data.fixed_height ? Image(data.fixed_height, id, 'fixed_height') : null,
    fixed_height_still: data.fixed_height_still ? Image(data.fixed_height_still, id, 'fixed_height_still') : null,
    fixed_height_downsampled: data.fixed_height_downsampled ? Image(data.fixed_height_downsampled, id, 'fixed_height_downsampled') : null,
    fixed_width: data.fixed_width ? Image(data.fixed_width, id, 'fixed_width') : null,
    fixed_width_still: data.fixed_width_still ? Image(data.fixed_width_still, id, 'fixed_width_still') : null,
    fixed_width_downsampled: data.fixed_width_downsampled ? Image(data.fixed_width_downsampled, id, 'fixed_width_downsampled') : null,
    fixed_height_small: data.fixed_height_small ? Image(data.fixed_height_small, id, 'fixed_height_small') : null,
    fixed_height_small_still: data.fixed_height_small_still ? Image(data.fixed_height_small_still, id, 'fixed_height_small_still') : null,
    fixed_width_small: data.fixed_width_small ? Image(data.fixed_width_small, id, 'fixed_width_small') : Image({}, id, 'fixed_width_small'),
    fixed_width_small_still: data.fixed_width_small_still ? Image(data.fixed_width_small_still, id, 'fixed_width_small_still') : null,
    downsized: data.downsized ? Image(data.downsized, id, 'downsized') : null,
    downsized_still: data.downsized_still ? Image(data.downsized_still, id, 'downsized_still') : null,
    downsized_large: data.downsized_large ? Image(data.downsized_large, id, 'downsized_large') : null,
    downsized_medium: data.downsized_medium ? Image(data.downsized_medium, id, 'downsized_medium') : null,
    original: data.original ? Image(data.original, id, 'original') : null,
    original_still: data.original_still ? Image(data.original_still, id, 'original_still') : null,
    looping: data.looping ? Image(data.looping, id, 'looping') : null,
    preview: data.preview ? Image(data.preview, id, 'preview') : null,
    preview_gif: data.preview_gif ? Image(data.preview_gif, id, 'preview_gif') : null,
    downsized_small: data.downsized_small ? Image(data.downsized_small, id, 'downsized_small') : null
  };
};

module.exports = Images;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/Media.js":
/*!***********************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/Media.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var Images = __webpack_require__(/*! ./Images */ "./node_modules/giphy-js-sdk-core/lib/utils/Images.js");
var User = __webpack_require__(/*! ./User */ "./node_modules/giphy-js-sdk-core/lib/utils/User.js");

var Media = function Media(data) {
  return {
    type: data.type ? data.type : null,
    id: data.id ? data.id : null,
    slug: data.slug ? data.slug : null,
    url: data.url ? data.url : null,
    bitly_gif_url: data.bitly_gif_url ? data.bitly_gif_url : null,
    bitly_url: data.bitly_url ? data.bitly_url : null,
    embed_url: data.embed_url ? data.embed_url : null,
    source: data.source ? data.source : null,
    rating: data.rating ? data.rating : null,
    content_url: data.content_url ? data.content_url : null,
    tags: data.tags ? data.tags : null,
    featured_tags: data.features_tags ? data.features_tags : null,
    user: data.user ? User(data.user) : null,
    images: data.images ? Images(data.images, data.id) : null,
    source_tld: data.source_tld ? data.source_tld : null,
    source_post_url: data.source_post_url ? new Date(data.source_post_url) : null,
    update_datetime: data.update_datetime ? new Date(data.update_datetime) : null,
    create_datetime: data.create_datetime ? new Date(data.create_datetime) : null,
    import_datetime: data.import_datetime ? new Date(data.import_datetime) : null,
    trending_datetime: data.trending_datetime ? new Date(data.trending_datetime) : null,
    title: data.title ? data.title : null,
    is_hidden: data.is_hidden ? true : false,
    is_removed: data.is_removed ? true : false,
    is_community: data.is_community ? true : false,
    is_anonymous: data.is_anonymous ? true : false,
    is_featured: data.is_featured ? true : false,
    is_realtime: data.is_realtime ? true : false,
    is_indexable: data.is_indexable ? true : false,
    is_sticker: data.is_sticker ? true : false
  };
};

module.exports = Media;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/TermSuggestion.js":
/*!********************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/TermSuggestion.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var TermSuggestion = function TermSuggestion(data) {
  return {
    "term": data.name ? data.name : null
  };
};

module.exports = TermSuggestion;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/User.js":
/*!**********************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/User.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var User = function User(data) {
  return {
    id: data.id ? data.is_sticker : null,
    avatar_url: data.avatar_url ? data.avatar_url : null,
    banner_url: data.banner_url ? data.banner_url : null,
    profile_url: data.profile_url ? data.profile_url : null,
    username: data.username ? data.username : null,
    display_name: data.display_name ? data.display_name : null,
    twitter: data.twitter ? data.twitter : null,
    is_public: data.is_public ? data.is_public : null,
    attribution_display_name: data.attribution_display_name ? data.attribution_display_name : null,
    name: data.name ? data.name : null,
    description: data.description ? data.description : null,
    facebook_url: data.facebook_url ? data.facebook_url : null,
    twitter_url: data.twitter_url ? data.twitter_url : null,
    instagram_url: data.instagram_url ? data.instagram_url : null,
    tumblr_url: data.tumblr_url ? data.tumblr_url : null,
    suppress_chrome: data.suppress_chrome ? data.suppress_chrome : null,
    website_url: data.website_url ? data.website_url : null,
    website_display_url: data.website_display_url ? data.website_display_url : null
  };
};

module.exports = User;

/***/ }),

/***/ "./node_modules/giphy-js-sdk-core/lib/utils/responseFormatter.js":
/*!***********************************************************************!*\
  !*** ./node_modules/giphy-js-sdk-core/lib/utils/responseFormatter.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Created by Cosmo Cochrane on 4/20/17.
 * Copyright (c) 2017 Giphy Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var _ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
var Media = __webpack_require__(/*! ./Media */ "./node_modules/giphy-js-sdk-core/lib/utils/Media.js");
var Category = __webpack_require__(/*! ./Category */ "./node_modules/giphy-js-sdk-core/lib/utils/Category.js");
var TermSuggestion = __webpack_require__(/*! ./TermSuggestion */ "./node_modules/giphy-js-sdk-core/lib/utils/TermSuggestion.js");

function responseFormatter(data, endpoint) {
  switch (endpoint) {
    case "translate":
    case "gifByID":
      return Media(data);

    case "search":
    case "trending":
    case "gifsByIDs":
    case "gifsByCategories":
      return _.map(data, function (gifObject) {
        return Media(gifObject);
      });

    case "categoriesForGifs":
      return _.map(data, function (singleCategory) {
        return Category(singleCategory);
      });

    case "subCategoriesForGifs":
      return _.map(data, function (singleSubCategory) {
        return Category(singleSubCategory);
      });

    case "termSuggestions":
      return _.map(data, function (singleTerm) {
        return TermSuggestion(singleTerm);
      });
    case "random":
      return {
        images: {
          fixed_height_downsampled: {
            gif_url: data.fixed_height_downsampled_url,
            height: data.fixed_height_downsampled_height,
            width: data.fixed_height_downsampled_width
          },
          fixed_height_small: {
            gif_url: data.fixed_height_small_url,
            height: data.fixed_height_small_height,
            width: data.fixed_height_small_width
          },
          fixed_width_downsampled: {
            gif_url: data.fixed_height_small_url,
            height: data.fixed_height_small_height,
            width: data.fixed_height_small_width
          },
          fixed_width_small: {
            gif_url: data.fixed_width_small_url,
            height: data.fixed_width_small_height,
            width: data.fixed_width_small_width
          },
          fixed_width_small_still: {
            gif_url: data.fixed_width_small_url,
            height: data.fixed_width_small_height,
            width: data.fixed_width_small_width
          },
          original: {
            frames: data.image_frames,
            gif_url: data.image_original_url,
            height: data.image_height,
            mp4: data.image_mp4_url,
            width: data.image_width
          },
          id: data.id
        },
        user: {
          username: data.username
        },
        url: data.url,
        type: data.type
      };

    default:
      throw "Unimplemented endpoint " + endpoint;
  }
}

module.exports = responseFormatter;

/***/ }),

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ }),

/***/ "./node_modules/performance-now/lib/performance-now.js":
/*!*************************************************************!*\
  !*** ./node_modules/performance-now/lib/performance-now.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/prefix-style/index.js":
/*!********************************************!*\
  !*** ./node_modules/prefix-style/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var div = null
var prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ]

module.exports = function prefixStyle (prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div')
  }

  var style = div.style

  // prop exists without prefix
  if (prop in style) {
    return prop
  }

  // borderRadius -> BorderRadius
  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)

  // find the vendor-prefixed prop
  for (var i = prefixes.length; i >= 0; i--) {
    var name = prefixes[i] + titleCase
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name
    }
  }

  return false
}


/***/ }),

/***/ "./node_modules/raf/index.js":
/*!***********************************!*\
  !*** ./node_modules/raf/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(/*! performance-now */ "./node_modules/performance-now/lib/performance-now.js")
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/Scrollbars/defaultRenderElements.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/Scrollbars/defaultRenderElements.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.renderViewDefault = renderViewDefault;
exports.renderTrackHorizontalDefault = renderTrackHorizontalDefault;
exports.renderTrackVerticalDefault = renderTrackVerticalDefault;
exports.renderThumbHorizontalDefault = renderThumbHorizontalDefault;
exports.renderThumbVerticalDefault = renderThumbVerticalDefault;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/prop-types */

function renderViewDefault(props) {
    return _react2["default"].createElement('div', props);
}

function renderTrackHorizontalDefault(_ref) {
    var style = _ref.style,
        props = _objectWithoutProperties(_ref, ['style']);

    var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

function renderTrackVerticalDefault(_ref2) {
    var style = _ref2.style,
        props = _objectWithoutProperties(_ref2, ['style']);

    var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

function renderThumbHorizontalDefault(_ref3) {
    var style = _ref3.style,
        props = _objectWithoutProperties(_ref3, ['style']);

    var finalStyle = _extends({}, style, {
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

function renderThumbVerticalDefault(_ref4) {
    var style = _ref4.style,
        props = _objectWithoutProperties(_ref4, ['style']);

    var finalStyle = _extends({}, style, {
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/Scrollbars/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/Scrollbars/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf2 = __webpack_require__(/*! raf */ "./node_modules/raf/index.js");

var _raf3 = _interopRequireDefault(_raf2);

var _domCss = __webpack_require__(/*! dom-css */ "./node_modules/dom-css/index.js");

var _domCss2 = _interopRequireDefault(_domCss);

var _react = __webpack_require__(/*! react */ "react");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isString = __webpack_require__(/*! ../utils/isString */ "./node_modules/react-custom-scrollbars/lib/utils/isString.js");

var _isString2 = _interopRequireDefault(_isString);

var _getScrollbarWidth = __webpack_require__(/*! ../utils/getScrollbarWidth */ "./node_modules/react-custom-scrollbars/lib/utils/getScrollbarWidth.js");

var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

var _returnFalse = __webpack_require__(/*! ../utils/returnFalse */ "./node_modules/react-custom-scrollbars/lib/utils/returnFalse.js");

var _returnFalse2 = _interopRequireDefault(_returnFalse);

var _getInnerWidth = __webpack_require__(/*! ../utils/getInnerWidth */ "./node_modules/react-custom-scrollbars/lib/utils/getInnerWidth.js");

var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);

var _getInnerHeight = __webpack_require__(/*! ../utils/getInnerHeight */ "./node_modules/react-custom-scrollbars/lib/utils/getInnerHeight.js");

var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);

var _styles = __webpack_require__(/*! ./styles */ "./node_modules/react-custom-scrollbars/lib/Scrollbars/styles.js");

var _defaultRenderElements = __webpack_require__(/*! ./defaultRenderElements */ "./node_modules/react-custom-scrollbars/lib/Scrollbars/defaultRenderElements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scrollbars = function (_Component) {
    _inherits(Scrollbars, _Component);

    function Scrollbars(props) {
        var _ref;

        _classCallCheck(this, Scrollbars);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Scrollbars.__proto__ || Object.getPrototypeOf(Scrollbars)).call.apply(_ref, [this, props].concat(rest)));

        _this.getScrollLeft = _this.getScrollLeft.bind(_this);
        _this.getScrollTop = _this.getScrollTop.bind(_this);
        _this.getScrollWidth = _this.getScrollWidth.bind(_this);
        _this.getScrollHeight = _this.getScrollHeight.bind(_this);
        _this.getClientWidth = _this.getClientWidth.bind(_this);
        _this.getClientHeight = _this.getClientHeight.bind(_this);
        _this.getValues = _this.getValues.bind(_this);
        _this.getThumbHorizontalWidth = _this.getThumbHorizontalWidth.bind(_this);
        _this.getThumbVerticalHeight = _this.getThumbVerticalHeight.bind(_this);
        _this.getScrollLeftForOffset = _this.getScrollLeftForOffset.bind(_this);
        _this.getScrollTopForOffset = _this.getScrollTopForOffset.bind(_this);

        _this.scrollLeft = _this.scrollLeft.bind(_this);
        _this.scrollTop = _this.scrollTop.bind(_this);
        _this.scrollToLeft = _this.scrollToLeft.bind(_this);
        _this.scrollToTop = _this.scrollToTop.bind(_this);
        _this.scrollToRight = _this.scrollToRight.bind(_this);
        _this.scrollToBottom = _this.scrollToBottom.bind(_this);

        _this.handleTrackMouseEnter = _this.handleTrackMouseEnter.bind(_this);
        _this.handleTrackMouseLeave = _this.handleTrackMouseLeave.bind(_this);
        _this.handleHorizontalTrackMouseDown = _this.handleHorizontalTrackMouseDown.bind(_this);
        _this.handleVerticalTrackMouseDown = _this.handleVerticalTrackMouseDown.bind(_this);
        _this.handleHorizontalThumbMouseDown = _this.handleHorizontalThumbMouseDown.bind(_this);
        _this.handleVerticalThumbMouseDown = _this.handleVerticalThumbMouseDown.bind(_this);
        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.handleDrag = _this.handleDrag.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);

        _this.state = {
            didMountUniversal: false
        };
        return _this;
    }

    _createClass(Scrollbars, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addListeners();
            this.update();
            this.componentDidMountUniversal();
        }
    }, {
        key: 'componentDidMountUniversal',
        value: function componentDidMountUniversal() {
            // eslint-disable-line react/sort-comp
            var universal = this.props.universal;

            if (!universal) return;
            this.setState({ didMountUniversal: true });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.update();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeListeners();
            (0, _raf2.cancel)(this.requestFrame);
            clearTimeout(this.hideTracksTimeout);
            clearInterval(this.detectScrollingInterval);
        }
    }, {
        key: 'getScrollLeft',
        value: function getScrollLeft() {
            if (!this.view) return 0;
            return this.view.scrollLeft;
        }
    }, {
        key: 'getScrollTop',
        value: function getScrollTop() {
            if (!this.view) return 0;
            return this.view.scrollTop;
        }
    }, {
        key: 'getScrollWidth',
        value: function getScrollWidth() {
            if (!this.view) return 0;
            return this.view.scrollWidth;
        }
    }, {
        key: 'getScrollHeight',
        value: function getScrollHeight() {
            if (!this.view) return 0;
            return this.view.scrollHeight;
        }
    }, {
        key: 'getClientWidth',
        value: function getClientWidth() {
            if (!this.view) return 0;
            return this.view.clientWidth;
        }
    }, {
        key: 'getClientHeight',
        value: function getClientHeight() {
            if (!this.view) return 0;
            return this.view.clientHeight;
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            var _ref2 = this.view || {},
                _ref2$scrollLeft = _ref2.scrollLeft,
                scrollLeft = _ref2$scrollLeft === undefined ? 0 : _ref2$scrollLeft,
                _ref2$scrollTop = _ref2.scrollTop,
                scrollTop = _ref2$scrollTop === undefined ? 0 : _ref2$scrollTop,
                _ref2$scrollWidth = _ref2.scrollWidth,
                scrollWidth = _ref2$scrollWidth === undefined ? 0 : _ref2$scrollWidth,
                _ref2$scrollHeight = _ref2.scrollHeight,
                scrollHeight = _ref2$scrollHeight === undefined ? 0 : _ref2$scrollHeight,
                _ref2$clientWidth = _ref2.clientWidth,
                clientWidth = _ref2$clientWidth === undefined ? 0 : _ref2$clientWidth,
                _ref2$clientHeight = _ref2.clientHeight,
                clientHeight = _ref2$clientHeight === undefined ? 0 : _ref2$clientHeight;

            return {
                left: scrollLeft / (scrollWidth - clientWidth) || 0,
                top: scrollTop / (scrollHeight - clientHeight) || 0,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop,
                scrollWidth: scrollWidth,
                scrollHeight: scrollHeight,
                clientWidth: clientWidth,
                clientHeight: clientHeight
            };
        }
    }, {
        key: 'getThumbHorizontalWidth',
        value: function getThumbHorizontalWidth() {
            var _props = this.props,
                thumbSize = _props.thumbSize,
                thumbMinSize = _props.thumbMinSize;
            var _view = this.view,
                scrollWidth = _view.scrollWidth,
                clientWidth = _view.clientWidth;

            var trackWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
            var width = Math.ceil(clientWidth / scrollWidth * trackWidth);
            if (trackWidth === width) return 0;
            if (thumbSize) return thumbSize;
            return Math.max(width, thumbMinSize);
        }
    }, {
        key: 'getThumbVerticalHeight',
        value: function getThumbVerticalHeight() {
            var _props2 = this.props,
                thumbSize = _props2.thumbSize,
                thumbMinSize = _props2.thumbMinSize;
            var _view2 = this.view,
                scrollHeight = _view2.scrollHeight,
                clientHeight = _view2.clientHeight;

            var trackHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
            var height = Math.ceil(clientHeight / scrollHeight * trackHeight);
            if (trackHeight === height) return 0;
            if (thumbSize) return thumbSize;
            return Math.max(height, thumbMinSize);
        }
    }, {
        key: 'getScrollLeftForOffset',
        value: function getScrollLeftForOffset(offset) {
            var _view3 = this.view,
                scrollWidth = _view3.scrollWidth,
                clientWidth = _view3.clientWidth;

            var trackWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
            var thumbWidth = this.getThumbHorizontalWidth();
            return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
        }
    }, {
        key: 'getScrollTopForOffset',
        value: function getScrollTopForOffset(offset) {
            var _view4 = this.view,
                scrollHeight = _view4.scrollHeight,
                clientHeight = _view4.clientHeight;

            var trackHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
            var thumbHeight = this.getThumbVerticalHeight();
            return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
        }
    }, {
        key: 'scrollLeft',
        value: function scrollLeft() {
            var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (!this.view) return;
            this.view.scrollLeft = left;
        }
    }, {
        key: 'scrollTop',
        value: function scrollTop() {
            var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (!this.view) return;
            this.view.scrollTop = top;
        }
    }, {
        key: 'scrollToLeft',
        value: function scrollToLeft() {
            if (!this.view) return;
            this.view.scrollLeft = 0;
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            if (!this.view) return;
            this.view.scrollTop = 0;
        }
    }, {
        key: 'scrollToRight',
        value: function scrollToRight() {
            if (!this.view) return;
            this.view.scrollLeft = this.view.scrollWidth;
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            if (!this.view) return;
            this.view.scrollTop = this.view.scrollHeight;
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            /* istanbul ignore if */
            if (typeof document === 'undefined' || !this.view) return;
            var view = this.view,
                trackHorizontal = this.trackHorizontal,
                trackVertical = this.trackVertical,
                thumbHorizontal = this.thumbHorizontal,
                thumbVertical = this.thumbVertical;

            view.addEventListener('scroll', this.handleScroll);
            if (!(0, _getScrollbarWidth2["default"])()) return;
            trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
            trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
            trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
            trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
            trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
            trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
            thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
            thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
            window.addEventListener('resize', this.handleWindowResize);
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            /* istanbul ignore if */
            if (typeof document === 'undefined' || !this.view) return;
            var view = this.view,
                trackHorizontal = this.trackHorizontal,
                trackVertical = this.trackVertical,
                thumbHorizontal = this.thumbHorizontal,
                thumbVertical = this.thumbVertical;

            view.removeEventListener('scroll', this.handleScroll);
            if (!(0, _getScrollbarWidth2["default"])()) return;
            trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
            trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
            trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
            trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
            trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
            trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
            thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
            thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
            window.removeEventListener('resize', this.handleWindowResize);
            // Possibly setup by `handleDragStart`
            this.teardownDragging();
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll(event) {
            var _this2 = this;

            var _props3 = this.props,
                onScroll = _props3.onScroll,
                onScrollFrame = _props3.onScrollFrame;

            if (onScroll) onScroll(event);
            this.update(function (values) {
                var scrollLeft = values.scrollLeft,
                    scrollTop = values.scrollTop;

                _this2.viewScrollLeft = scrollLeft;
                _this2.viewScrollTop = scrollTop;
                if (onScrollFrame) onScrollFrame(values);
            });
            this.detectScrolling();
        }
    }, {
        key: 'handleScrollStart',
        value: function handleScrollStart() {
            var onScrollStart = this.props.onScrollStart;

            if (onScrollStart) onScrollStart();
            this.handleScrollStartAutoHide();
        }
    }, {
        key: 'handleScrollStartAutoHide',
        value: function handleScrollStartAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.showTracks();
        }
    }, {
        key: 'handleScrollStop',
        value: function handleScrollStop() {
            var onScrollStop = this.props.onScrollStop;

            if (onScrollStop) onScrollStop();
            this.handleScrollStopAutoHide();
        }
    }, {
        key: 'handleScrollStopAutoHide',
        value: function handleScrollStopAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            this.update();
        }
    }, {
        key: 'handleHorizontalTrackMouseDown',
        value: function handleHorizontalTrackMouseDown(event) {
            event.preventDefault();
            var target = event.target,
                clientX = event.clientX;

            var _target$getBoundingCl = target.getBoundingClientRect(),
                targetLeft = _target$getBoundingCl.left;

            var thumbWidth = this.getThumbHorizontalWidth();
            var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
            this.view.scrollLeft = this.getScrollLeftForOffset(offset);
        }
    }, {
        key: 'handleVerticalTrackMouseDown',
        value: function handleVerticalTrackMouseDown(event) {
            event.preventDefault();
            var target = event.target,
                clientY = event.clientY;

            var _target$getBoundingCl2 = target.getBoundingClientRect(),
                targetTop = _target$getBoundingCl2.top;

            var thumbHeight = this.getThumbVerticalHeight();
            var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
            this.view.scrollTop = this.getScrollTopForOffset(offset);
        }
    }, {
        key: 'handleHorizontalThumbMouseDown',
        value: function handleHorizontalThumbMouseDown(event) {
            event.preventDefault();
            this.handleDragStart(event);
            var target = event.target,
                clientX = event.clientX;
            var offsetWidth = target.offsetWidth;

            var _target$getBoundingCl3 = target.getBoundingClientRect(),
                left = _target$getBoundingCl3.left;

            this.prevPageX = offsetWidth - (clientX - left);
        }
    }, {
        key: 'handleVerticalThumbMouseDown',
        value: function handleVerticalThumbMouseDown(event) {
            event.preventDefault();
            this.handleDragStart(event);
            var target = event.target,
                clientY = event.clientY;
            var offsetHeight = target.offsetHeight;

            var _target$getBoundingCl4 = target.getBoundingClientRect(),
                top = _target$getBoundingCl4.top;

            this.prevPageY = offsetHeight - (clientY - top);
        }
    }, {
        key: 'setupDragging',
        value: function setupDragging() {
            (0, _domCss2["default"])(document.body, _styles.disableSelectStyle);
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.handleDragEnd);
            document.onselectstart = _returnFalse2["default"];
        }
    }, {
        key: 'teardownDragging',
        value: function teardownDragging() {
            (0, _domCss2["default"])(document.body, _styles.disableSelectStyleReset);
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.handleDragEnd);
            document.onselectstart = undefined;
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(event) {
            this.dragging = true;
            event.stopImmediatePropagation();
            this.setupDragging();
        }
    }, {
        key: 'handleDrag',
        value: function handleDrag(event) {
            if (this.prevPageX) {
                var clientX = event.clientX;

                var _trackHorizontal$getB = this.trackHorizontal.getBoundingClientRect(),
                    trackLeft = _trackHorizontal$getB.left;

                var thumbWidth = this.getThumbHorizontalWidth();
                var clickPosition = thumbWidth - this.prevPageX;
                var offset = -trackLeft + clientX - clickPosition;
                this.view.scrollLeft = this.getScrollLeftForOffset(offset);
            }
            if (this.prevPageY) {
                var clientY = event.clientY;

                var _trackVertical$getBou = this.trackVertical.getBoundingClientRect(),
                    trackTop = _trackVertical$getBou.top;

                var thumbHeight = this.getThumbVerticalHeight();
                var _clickPosition = thumbHeight - this.prevPageY;
                var _offset = -trackTop + clientY - _clickPosition;
                this.view.scrollTop = this.getScrollTopForOffset(_offset);
            }
            return false;
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this.dragging = false;
            this.prevPageX = this.prevPageY = 0;
            this.teardownDragging();
            this.handleDragEndAutoHide();
        }
    }, {
        key: 'handleDragEndAutoHide',
        value: function handleDragEndAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'handleTrackMouseEnter',
        value: function handleTrackMouseEnter() {
            this.trackMouseOver = true;
            this.handleTrackMouseEnterAutoHide();
        }
    }, {
        key: 'handleTrackMouseEnterAutoHide',
        value: function handleTrackMouseEnterAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.showTracks();
        }
    }, {
        key: 'handleTrackMouseLeave',
        value: function handleTrackMouseLeave() {
            this.trackMouseOver = false;
            this.handleTrackMouseLeaveAutoHide();
        }
    }, {
        key: 'handleTrackMouseLeaveAutoHide',
        value: function handleTrackMouseLeaveAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'showTracks',
        value: function showTracks() {
            clearTimeout(this.hideTracksTimeout);
            (0, _domCss2["default"])(this.trackHorizontal, { opacity: 1 });
            (0, _domCss2["default"])(this.trackVertical, { opacity: 1 });
        }
    }, {
        key: 'hideTracks',
        value: function hideTracks() {
            var _this3 = this;

            if (this.dragging) return;
            if (this.scrolling) return;
            if (this.trackMouseOver) return;
            var autoHideTimeout = this.props.autoHideTimeout;

            clearTimeout(this.hideTracksTimeout);
            this.hideTracksTimeout = setTimeout(function () {
                (0, _domCss2["default"])(_this3.trackHorizontal, { opacity: 0 });
                (0, _domCss2["default"])(_this3.trackVertical, { opacity: 0 });
            }, autoHideTimeout);
        }
    }, {
        key: 'detectScrolling',
        value: function detectScrolling() {
            var _this4 = this;

            if (this.scrolling) return;
            this.scrolling = true;
            this.handleScrollStart();
            this.detectScrollingInterval = setInterval(function () {
                if (_this4.lastViewScrollLeft === _this4.viewScrollLeft && _this4.lastViewScrollTop === _this4.viewScrollTop) {
                    clearInterval(_this4.detectScrollingInterval);
                    _this4.scrolling = false;
                    _this4.handleScrollStop();
                }
                _this4.lastViewScrollLeft = _this4.viewScrollLeft;
                _this4.lastViewScrollTop = _this4.viewScrollTop;
            }, 100);
        }
    }, {
        key: 'raf',
        value: function raf(callback) {
            var _this5 = this;

            if (this.requestFrame) _raf3["default"].cancel(this.requestFrame);
            this.requestFrame = (0, _raf3["default"])(function () {
                _this5.requestFrame = undefined;
                callback();
            });
        }
    }, {
        key: 'update',
        value: function update(callback) {
            var _this6 = this;

            this.raf(function () {
                return _this6._update(callback);
            });
        }
    }, {
        key: '_update',
        value: function _update(callback) {
            var _props4 = this.props,
                onUpdate = _props4.onUpdate,
                hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;

            var values = this.getValues();
            if ((0, _getScrollbarWidth2["default"])()) {
                var scrollLeft = values.scrollLeft,
                    clientWidth = values.clientWidth,
                    scrollWidth = values.scrollWidth;

                var trackHorizontalWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
                var thumbHorizontalWidth = this.getThumbHorizontalWidth();
                var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
                var thumbHorizontalStyle = {
                    width: thumbHorizontalWidth,
                    transform: 'translateX(' + thumbHorizontalX + 'px)'
                };
                var scrollTop = values.scrollTop,
                    clientHeight = values.clientHeight,
                    scrollHeight = values.scrollHeight;

                var trackVerticalHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
                var thumbVerticalHeight = this.getThumbVerticalHeight();
                var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
                var thumbVerticalStyle = {
                    height: thumbVerticalHeight,
                    transform: 'translateY(' + thumbVerticalY + 'px)'
                };
                if (hideTracksWhenNotNeeded) {
                    var trackHorizontalStyle = {
                        visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
                    };
                    var trackVerticalStyle = {
                        visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
                    };
                    (0, _domCss2["default"])(this.trackHorizontal, trackHorizontalStyle);
                    (0, _domCss2["default"])(this.trackVertical, trackVerticalStyle);
                }
                (0, _domCss2["default"])(this.thumbHorizontal, thumbHorizontalStyle);
                (0, _domCss2["default"])(this.thumbVertical, thumbVerticalStyle);
            }
            if (onUpdate) onUpdate(values);
            if (typeof callback !== 'function') return;
            callback(values);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var scrollbarWidth = (0, _getScrollbarWidth2["default"])();
            /* eslint-disable no-unused-vars */

            var _props5 = this.props,
                onScroll = _props5.onScroll,
                onScrollFrame = _props5.onScrollFrame,
                onScrollStart = _props5.onScrollStart,
                onScrollStop = _props5.onScrollStop,
                onUpdate = _props5.onUpdate,
                renderView = _props5.renderView,
                renderTrackHorizontal = _props5.renderTrackHorizontal,
                renderTrackVertical = _props5.renderTrackVertical,
                renderThumbHorizontal = _props5.renderThumbHorizontal,
                renderThumbVertical = _props5.renderThumbVertical,
                tagName = _props5.tagName,
                hideTracksWhenNotNeeded = _props5.hideTracksWhenNotNeeded,
                autoHide = _props5.autoHide,
                autoHideTimeout = _props5.autoHideTimeout,
                autoHideDuration = _props5.autoHideDuration,
                thumbSize = _props5.thumbSize,
                thumbMinSize = _props5.thumbMinSize,
                universal = _props5.universal,
                autoHeight = _props5.autoHeight,
                autoHeightMin = _props5.autoHeightMin,
                autoHeightMax = _props5.autoHeightMax,
                style = _props5.style,
                children = _props5.children,
                props = _objectWithoutProperties(_props5, ['onScroll', 'onScrollFrame', 'onScrollStart', 'onScrollStop', 'onUpdate', 'renderView', 'renderTrackHorizontal', 'renderTrackVertical', 'renderThumbHorizontal', 'renderThumbVertical', 'tagName', 'hideTracksWhenNotNeeded', 'autoHide', 'autoHideTimeout', 'autoHideDuration', 'thumbSize', 'thumbMinSize', 'universal', 'autoHeight', 'autoHeightMin', 'autoHeightMax', 'style', 'children']);
            /* eslint-enable no-unused-vars */

            var didMountUniversal = this.state.didMountUniversal;


            var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }), style);

            var viewStyle = _extends({}, _styles.viewStyleDefault, {
                // Hide scrollbars by setting a negative margin
                marginRight: scrollbarWidth ? -scrollbarWidth : 0,
                marginBottom: scrollbarWidth ? -scrollbarWidth : 0
            }, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
                // Add scrollbarWidth to autoHeight in order to compensate negative margins
                minHeight: (0, _isString2["default"])(autoHeightMin) ? 'calc(' + autoHeightMin + ' + ' + scrollbarWidth + 'px)' : autoHeightMin + scrollbarWidth,
                maxHeight: (0, _isString2["default"])(autoHeightMax) ? 'calc(' + autoHeightMax + ' + ' + scrollbarWidth + 'px)' : autoHeightMax + scrollbarWidth
            }), autoHeight && universal && !didMountUniversal && {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }, universal && !didMountUniversal && _styles.viewStyleUniversalInitial);

            var trackAutoHeightStyle = {
                transition: 'opacity ' + autoHideDuration + 'ms',
                opacity: 0
            };

            var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
                display: 'none'
            });

            var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
                display: 'none'
            });

            return (0, _react.createElement)(tagName, _extends({}, props, { style: containerStyle, ref: function ref(_ref3) {
                    _this7.container = _ref3;
                } }), [(0, _react.cloneElement)(renderView({ style: viewStyle }), { key: 'view', ref: function ref(_ref4) {
                    _this7.view = _ref4;
                } }, children), (0, _react.cloneElement)(renderTrackHorizontal({ style: trackHorizontalStyle }), { key: 'trackHorizontal', ref: function ref(_ref5) {
                    _this7.trackHorizontal = _ref5;
                } }, (0, _react.cloneElement)(renderThumbHorizontal({ style: _styles.thumbHorizontalStyleDefault }), { ref: function ref(_ref6) {
                    _this7.thumbHorizontal = _ref6;
                } })), (0, _react.cloneElement)(renderTrackVertical({ style: trackVerticalStyle }), { key: 'trackVertical', ref: function ref(_ref7) {
                    _this7.trackVertical = _ref7;
                } }, (0, _react.cloneElement)(renderThumbVertical({ style: _styles.thumbVerticalStyleDefault }), { ref: function ref(_ref8) {
                    _this7.thumbVertical = _ref8;
                } }))]);
        }
    }]);

    return Scrollbars;
}(_react.Component);

exports["default"] = Scrollbars;


Scrollbars.propTypes = {
    onScroll: _propTypes2["default"].func,
    onScrollFrame: _propTypes2["default"].func,
    onScrollStart: _propTypes2["default"].func,
    onScrollStop: _propTypes2["default"].func,
    onUpdate: _propTypes2["default"].func,
    renderView: _propTypes2["default"].func,
    renderTrackHorizontal: _propTypes2["default"].func,
    renderTrackVertical: _propTypes2["default"].func,
    renderThumbHorizontal: _propTypes2["default"].func,
    renderThumbVertical: _propTypes2["default"].func,
    tagName: _propTypes2["default"].string,
    thumbSize: _propTypes2["default"].number,
    thumbMinSize: _propTypes2["default"].number,
    hideTracksWhenNotNeeded: _propTypes2["default"].bool,
    autoHide: _propTypes2["default"].bool,
    autoHideTimeout: _propTypes2["default"].number,
    autoHideDuration: _propTypes2["default"].number,
    autoHeight: _propTypes2["default"].bool,
    autoHeightMin: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
    autoHeightMax: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
    universal: _propTypes2["default"].bool,
    style: _propTypes2["default"].object,
    children: _propTypes2["default"].node
};

Scrollbars.defaultProps = {
    renderView: _defaultRenderElements.renderViewDefault,
    renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
    renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
    renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
    renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
    tagName: 'div',
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 200,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    universal: false
};

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/Scrollbars/styles.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/Scrollbars/styles.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var containerStyleDefault = exports.containerStyleDefault = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%'
};

// Overrides containerStyleDefault properties
var containerStyleAutoHeight = exports.containerStyleAutoHeight = {
    height: 'auto'
};

var viewStyleDefault = exports.viewStyleDefault = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch'
};

// Overrides viewStyleDefault properties
var viewStyleAutoHeight = exports.viewStyleAutoHeight = {
    position: 'relative',
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined
};

var viewStyleUniversalInitial = exports.viewStyleUniversalInitial = {
    overflow: 'hidden',
    marginRight: 0,
    marginBottom: 0
};

var trackHorizontalStyleDefault = exports.trackHorizontalStyleDefault = {
    position: 'absolute',
    height: 6
};

var trackVerticalStyleDefault = exports.trackVerticalStyleDefault = {
    position: 'absolute',
    width: 6
};

var thumbHorizontalStyleDefault = exports.thumbHorizontalStyleDefault = {
    position: 'relative',
    display: 'block',
    height: '100%'
};

var thumbVerticalStyleDefault = exports.thumbVerticalStyleDefault = {
    position: 'relative',
    display: 'block',
    width: '100%'
};

var disableSelectStyle = exports.disableSelectStyle = {
    userSelect: 'none'
};

var disableSelectStyleReset = exports.disableSelectStyleReset = {
    userSelect: ''
};

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrollbars = undefined;

var _Scrollbars = __webpack_require__(/*! ./Scrollbars */ "./node_modules/react-custom-scrollbars/lib/Scrollbars/index.js");

var _Scrollbars2 = _interopRequireDefault(_Scrollbars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _Scrollbars2["default"];
exports.Scrollbars = _Scrollbars2["default"];

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/utils/getInnerHeight.js":
/*!**************************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/utils/getInnerHeight.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getInnerHeight;
function getInnerHeight(el) {
    var clientHeight = el.clientHeight;

    var _getComputedStyle = getComputedStyle(el),
        paddingTop = _getComputedStyle.paddingTop,
        paddingBottom = _getComputedStyle.paddingBottom;

    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/utils/getInnerWidth.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/utils/getInnerWidth.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getInnerWidth;
function getInnerWidth(el) {
    var clientWidth = el.clientWidth;

    var _getComputedStyle = getComputedStyle(el),
        paddingLeft = _getComputedStyle.paddingLeft,
        paddingRight = _getComputedStyle.paddingRight;

    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/utils/getScrollbarWidth.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/utils/getScrollbarWidth.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getScrollbarWidth;

var _domCss = __webpack_require__(/*! dom-css */ "./node_modules/dom-css/index.js");

var _domCss2 = _interopRequireDefault(_domCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var scrollbarWidth = false;

function getScrollbarWidth() {
    if (scrollbarWidth !== false) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        var div = document.createElement('div');
        (0, _domCss2["default"])(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar'
        });
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
    } else {
        scrollbarWidth = 0;
    }
    return scrollbarWidth || 0;
}

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/utils/isString.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/utils/isString.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = isString;
function isString(maybe) {
    return typeof maybe === 'string';
}

/***/ }),

/***/ "./node_modules/react-custom-scrollbars/lib/utils/returnFalse.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-custom-scrollbars/lib/utils/returnFalse.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = returnFalse;
function returnFalse() {
    return false;
}

/***/ }),

/***/ "./node_modules/react-infinite-scroller/dist/InfiniteScroll.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-infinite-scroller/dist/InfiniteScroll.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScroll = function (_Component) {
  _inherits(InfiniteScroll, _Component);

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

    _this.scrollListener = _this.scrollListener.bind(_this);
    _this.eventListenerOptions = _this.eventListenerOptions.bind(_this);
    _this.mousewheelListener = _this.mousewheelListener.bind(_this);
    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pageLoaded = this.props.pageStart;
      this.options = this.eventListenerOptions();
      this.attachScrollListener();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.isReverse && this.loadMore) {
        var parentElement = this.getParentElement(this.scrollComponent);
        parentElement.scrollTop = parentElement.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop;
        this.loadMore = false;
      }
      this.attachScrollListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachScrollListener();
      this.detachMousewheelListener();
    }
  }, {
    key: 'isPassiveSupported',
    value: function isPassiveSupported() {
      var passive = false;

      var testOptions = {
        get passive() {
          passive = true;
        }
      };

      try {
        document.addEventListener('test', null, testOptions);
        document.removeEventListener('test', null, testOptions);
      } catch (e) {
        // ignore
      }
      return passive;
    }
  }, {
    key: 'eventListenerOptions',
    value: function eventListenerOptions() {
      var options = this.props.useCapture;

      if (this.isPassiveSupported()) {
        options = {
          useCapture: this.props.useCapture,
          passive: true
        };
      }
      return options;
    }

    // Set a defaut loader for all your `InfiniteScroll` components

  }, {
    key: 'setDefaultLoader',
    value: function setDefaultLoader(loader) {
      this.defaultLoader = loader;
    }
  }, {
    key: 'detachMousewheelListener',
    value: function detachMousewheelListener() {
      var scrollEl = window;
      if (this.props.useWindow === false) {
        scrollEl = this.scrollComponent.parentNode;
      }

      scrollEl.removeEventListener('mousewheel', this.mousewheelListener, this.options ? this.options : this.props.useCapture);
    }
  }, {
    key: 'detachScrollListener',
    value: function detachScrollListener() {
      var scrollEl = window;
      if (this.props.useWindow === false) {
        scrollEl = this.getParentElement(this.scrollComponent);
      }

      scrollEl.removeEventListener('scroll', this.scrollListener, this.options ? this.options : this.props.useCapture);
      scrollEl.removeEventListener('resize', this.scrollListener, this.options ? this.options : this.props.useCapture);
    }
  }, {
    key: 'getParentElement',
    value: function getParentElement(el) {
      var scrollParent = this.props.getScrollParent && this.props.getScrollParent();
      if (scrollParent != null) {
        return scrollParent;
      }
      return el && el.parentNode;
    }
  }, {
    key: 'filterProps',
    value: function filterProps(props) {
      return props;
    }
  }, {
    key: 'attachScrollListener',
    value: function attachScrollListener() {
      var parentElement = this.getParentElement(this.scrollComponent);

      if (!this.props.hasMore || !parentElement) {
        return;
      }

      var scrollEl = window;
      if (this.props.useWindow === false) {
        scrollEl = parentElement;
      }

      scrollEl.addEventListener('mousewheel', this.mousewheelListener, this.options ? this.options : this.props.useCapture);
      scrollEl.addEventListener('scroll', this.scrollListener, this.options ? this.options : this.props.useCapture);
      scrollEl.addEventListener('resize', this.scrollListener, this.options ? this.options : this.props.useCapture);

      if (this.props.initialLoad) {
        this.scrollListener();
      }
    }
  }, {
    key: 'mousewheelListener',
    value: function mousewheelListener(e) {
      // Prevents Chrome hangups
      // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
      if (e.deltaY === 1 && !this.isPassiveSupported()) {
        e.preventDefault();
      }
    }
  }, {
    key: 'scrollListener',
    value: function scrollListener() {
      var el = this.scrollComponent;
      var scrollEl = window;
      var parentNode = this.getParentElement(el);

      var offset = void 0;
      if (this.props.useWindow) {
        var doc = document.documentElement || document.body.parentNode || document.body;
        var scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;
        if (this.props.isReverse) {
          offset = scrollTop;
        } else {
          offset = this.calculateOffset(el, scrollTop);
        }
      } else if (this.props.isReverse) {
        offset = parentNode.scrollTop;
      } else {
        offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
      }

      // Here we make sure the element is visible as well as checking the offset
      if (offset < Number(this.props.threshold) && el && el.offsetParent !== null) {
        this.detachScrollListener();
        this.beforeScrollHeight = parentNode.scrollHeight;
        this.beforeScrollTop = parentNode.scrollTop;
        // Call loadMore after detachScrollListener to allow for non-async loadMore functions
        if (typeof this.props.loadMore === 'function') {
          this.props.loadMore(this.pageLoaded += 1);
          this.loadMore = true;
        }
      }
    }
  }, {
    key: 'calculateOffset',
    value: function calculateOffset(el, scrollTop) {
      if (!el) {
        return 0;
      }

      return this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
    }
  }, {
    key: 'calculateTopPosition',
    value: function calculateTopPosition(el) {
      if (!el) {
        return 0;
      }
      return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var renderProps = this.filterProps(this.props);

      var children = renderProps.children,
          element = renderProps.element,
          hasMore = renderProps.hasMore,
          initialLoad = renderProps.initialLoad,
          isReverse = renderProps.isReverse,
          loader = renderProps.loader,
          loadMore = renderProps.loadMore,
          pageStart = renderProps.pageStart,
          ref = renderProps.ref,
          threshold = renderProps.threshold,
          useCapture = renderProps.useCapture,
          useWindow = renderProps.useWindow,
          getScrollParent = renderProps.getScrollParent,
          props = _objectWithoutProperties(renderProps, ['children', 'element', 'hasMore', 'initialLoad', 'isReverse', 'loader', 'loadMore', 'pageStart', 'ref', 'threshold', 'useCapture', 'useWindow', 'getScrollParent']);

      props.ref = function (node) {
        _this2.scrollComponent = node;
        if (ref) {
          ref(node);
        }
      };

      var childrenArray = [children];
      if (hasMore) {
        if (loader) {
          isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
        } else if (this.defaultLoader) {
          isReverse ? childrenArray.unshift(this.defaultLoader) : childrenArray.push(this.defaultLoader);
        }
      }
      return _react2.default.createElement(element, props, childrenArray);
    }
  }]);

  return InfiniteScroll;
}(_react.Component);

InfiniteScroll.propTypes = {
  children: _propTypes2.default.node.isRequired,
  element: _propTypes2.default.node,
  hasMore: _propTypes2.default.bool,
  initialLoad: _propTypes2.default.bool,
  isReverse: _propTypes2.default.bool,
  loader: _propTypes2.default.node,
  loadMore: _propTypes2.default.func.isRequired,
  pageStart: _propTypes2.default.number,
  ref: _propTypes2.default.func,
  getScrollParent: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  useCapture: _propTypes2.default.bool,
  useWindow: _propTypes2.default.bool
};
InfiniteScroll.defaultProps = {
  element: 'div',
  hasMore: false,
  initialLoad: true,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: true,
  isReverse: false,
  useCapture: false,
  loader: null,
  getScrollParent: null
};
exports.default = InfiniteScroll;
module.exports = exports['default'];


/***/ }),

/***/ "./node_modules/react-infinite-scroller/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-infinite-scroller/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/InfiniteScroll */ "./node_modules/react-infinite-scroller/dist/InfiniteScroll.js")


/***/ }),

/***/ "./node_modules/react-md-spinner/dist/react-md-spinner.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-md-spinner/dist/react-md-spinner.esm.js ***!
  \********************************************************************/
/*! exports provided: default, ssrBehavior */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ssrBehavior", function() { return ssrBehavior; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/stylis.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stylis__WEBPACK_IMPORTED_MODULE_1__);
/*! @preserve react-md-spinner v1.0.0 - tsuyoshiwada | MIT license. */



function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var STYLE_DATA_NAME = "react-md-spinner";

var KEYFRAME_PREFIX = "__react-md-spinner-animation__";
var stylis = new stylis__WEBPACK_IMPORTED_MODULE_1___default.a({
  global: false,
  cascade: true,
  keyframe: true,
  prefix: true,
  compress: false
});
var Keyframe = {
  ROOT_ROTATE: "".concat(KEYFRAME_PREFIX, "root-rotate"),
  FILL_UNFILL_ROTATE: "".concat(KEYFRAME_PREFIX, "fill-unfill-rotate"),
  LAYER_1_FADE_IN_OUT: "".concat(KEYFRAME_PREFIX, "layer-1-fade-in-out"),
  LAYER_2_FADE_IN_OUT: "".concat(KEYFRAME_PREFIX, "layer-2-fade-in-out"),
  LAYER_3_FADE_IN_OUT: "".concat(KEYFRAME_PREFIX, "layer-3-fade-in-out"),
  LAYER_4_FADE_IN_OUT: "".concat(KEYFRAME_PREFIX, "layer-4-fade-in-out"),
  LEFT_SPIN: "".concat(KEYFRAME_PREFIX, "left-spin"),
  RIGHT_SPIN: "".concat(KEYFRAME_PREFIX, "right-spin")
};
var keyframes = stylis("", "\n@keyframes ".concat(Keyframe.ROOT_ROTATE, " {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes ").concat(Keyframe.FILL_UNFILL_ROTATE, " {\n  12.5% { transform: rotate(135deg) }\n  25% { transform: rotate(270deg) }\n  37.5% { transform: rotate(405deg) }\n  50% { transform: rotate(540deg) }\n  62.5% { transform: rotate(675deg) }\n  75% { transform: rotate(810deg) }\n  87.5% { transform: rotate(945deg) }\n  100% { transform: rotate(1080deg) }\n}\n\n@keyframes ").concat(Keyframe.LAYER_1_FADE_IN_OUT, " {\n  0% { opacity: 1 }\n  25% { opacity: 1 }\n  26% { opacity: 0 }\n  89% { opacity: 0 }\n  90% { opacity: 1 }\n  100% { opacity: 1 }\n}\n\n@keyframes ").concat(Keyframe.LAYER_2_FADE_IN_OUT, " {\n  0% { opacity: 0 }\n  15% { opacity: 0 }\n  25% { opacity: 1 }\n  50% { opacity: 1 }\n  51% { opacity: 0 }\n  100% { opacity: 0 }\n}\n\n@keyframes ").concat(Keyframe.LAYER_3_FADE_IN_OUT, " {\n  0% { opacity: 0 }\n  40% { opacity: 0 }\n  50% { opacity: 1 }\n  75% { opacity: 1 }\n  76% { opacity: 0 }\n  100% { opacity: 0 }\n}\n\n@keyframes ").concat(Keyframe.LAYER_4_FADE_IN_OUT, " {\n  0% { opacity: 0 }\n  65% { opacity: 0 }\n  75% { opacity: 1 }\n  90% { opacity: 1 }\n  100% { opacity: 0 }\n}\n\n@keyframes ").concat(Keyframe.LEFT_SPIN, " {\n  0% { transform: rotate(130deg) }\n  50% { transform: rotate(-5deg) }\n  100% { transform: rotate(130deg) }\n}\n\n@keyframes ").concat(Keyframe.RIGHT_SPIN, " {\n  0% { transform: rotate(-130deg) }\n  50% { transform: rotate(5deg) }\n  100% { transform: rotate(-130deg) }\n}\n"));

var getStylesheetString = function getStylesheetString() {
  return "<style type=\"text/css\" data-".concat(STYLE_DATA_NAME, "=\"\">").concat(keyframes, "</style>");
};
var getStylesheetComponent = function getStylesheetComponent() {
  var _React$createElement;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", (_React$createElement = {
    type: "text/css"
  }, _defineProperty(_React$createElement, "data-".concat(STYLE_DATA_NAME), ""), _defineProperty(_React$createElement, "dangerouslySetInnerHTML", {
    __html: keyframes
  }), _React$createElement));
};

var ssrBehavior = /*#__PURE__*/Object.freeze({
  getStylesheetString: getStylesheetString,
  getStylesheetComponent: getStylesheetComponent
});

var getColors = function getColors(props) {
  var singleColor = props.singleColor,
      color1 = props.color1,
      color2 = props.color2,
      color3 = props.color3,
      color4 = props.color4;
  return singleColor ? [singleColor, singleColor, singleColor, singleColor] : [color1, color2, color3, color4];
};

var getStyles = function getStyles(props) {
  var size = props.size;
  var duration = props.duration;
  var borderSize = props.borderSize;
  var borderWidth = borderSize || Math.max(1, Math.round(size * 0.107142));
  var colors = getColors(props);
  var arcSize = 270;
  var arcStartRotate = 216;
  var rootDuration = 360 * duration / (arcStartRotate + (360 - arcSize));
  var rootStyle = {
    display: "inline-block",
    position: "relative",
    width: size,
    height: size,
    verticalAlign: "middle",
    fontSize: "0",
    animation: "".concat(Keyframe.ROOT_ROTATE, " ").concat(rootDuration, "ms linear infinite"),
    WebkitAnimation: "".concat(Keyframe.ROOT_ROTATE, " ").concat(rootDuration, "ms linear infinite")
  };
  var layerStyles = colors.map(function (color, i) {
    return {
      boxSizing: "border-box",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderColor: color,
      whiteSpace: "nowrap",
      opacity: 1,
      animationName: "".concat(Keyframe.FILL_UNFILL_ROTATE, ", ").concat(Keyframe["LAYER_".concat(i + 1, "_FADE_IN_OUT")]),
      WebkitAnimationName: "".concat(Keyframe.FILL_UNFILL_ROTATE, ", ").concat(Keyframe["LAYER_".concat(i + 1, "_FADE_IN_OUT")]),
      animationDuration: "".concat(duration * colors.length, "ms"),
      WebkitAnimationDuration: "".concat(duration * colors.length, "ms"),
      animationTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
      WebkitAnimationTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
      animationIterationCount: "infinite",
      WebkitAnimationIterationCount: "infinite"
    };
  });
  var clipStyle = {
    display: "inline-block",
    boxSizing: "border-box",
    position: "relative",
    width: "50%",
    height: "100%",
    overflow: "hidden",
    borderColor: "inherit"
  };
  var layerClipAfterStyle = {
    display: "inline-block",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    borderRadius: "50%"
  };

  var layerAfterStyle = _objectSpread({}, layerClipAfterStyle, {
    left: "45%",
    width: "10%",
    borderWidth: borderWidth,
    borderColor: "inherit",
    borderTopStyle: "solid"
  });

  var clipAfterStyle = _objectSpread({}, layerClipAfterStyle, {
    bottom: 0,
    width: "200%",
    borderWidth: borderWidth,
    borderStyle: "solid",
    animationDuration: "".concat(duration, "ms"),
    WebkitAnimationDuration: "".concat(duration, "ms"),
    animationTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
    WebkitAnimationTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
    animationIterationCount: "infinite",
    WebkitAnimationIterationCount: "infinite"
  });

  var clip1AfterStyle = _objectSpread({}, clipAfterStyle, {
    left: 0,
    transform: "rotate(129deg)",
    WebkitTransform: "rotate(129deg)",
    animationName: Keyframe.LEFT_SPIN,
    WebkitAnimationName: Keyframe.LEFT_SPIN
  });

  var clip1AfterStyles = colors.map(function (color) {
    return _objectSpread({}, clip1AfterStyle, {
      borderColor: "".concat(color, " transparent transparent ").concat(color)
    });
  });

  var clip2AfterStyle = _objectSpread({}, clipAfterStyle, {
    left: "-100%",
    transform: "rotate(-129deg)",
    WebkitTransform: "rotate(-129deg)",
    animationName: Keyframe.RIGHT_SPIN,
    WebkitAnimationName: Keyframe.RIGHT_SPIN
  });

  var clip2AfterStyles = colors.map(function (color) {
    return _objectSpread({}, clip2AfterStyle, {
      borderColor: "".concat(color, " ").concat(color, " transparent transparent")
    });
  });
  return {
    rootStyle: rootStyle,
    layerStyles: layerStyles,
    layerAfterStyle: layerAfterStyle,
    clipStyle: clipStyle,
    clip1AfterStyles: clip1AfterStyles,
    clip2AfterStyles: clip2AfterStyles
  };
};

var injectStyles = function injectStyles(name, rules) {
  var el = document.createElement("style");
  el.type = "text/css";
  el.setAttribute("data-".concat(name), "");
  el.innerHTML = rules;
  document.head.appendChild(el);
};
var uninjectStyles = function uninjectStyles(name) {
  var el = document.querySelector("[data-".concat(name, "]"));

  if (el != null && el.parentNode != null) {
    el.parentNode.removeChild(el);
  }
};

var MDSpinner =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MDSpinner, _React$PureComponent);

  function MDSpinner() {
    _classCallCheck(this, MDSpinner);

    return _possibleConstructorReturn(this, _getPrototypeOf(MDSpinner).apply(this, arguments));
  }

  _createClass(MDSpinner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (MDSpinner.mountedInstanceCount < 1) {
        injectStyles(STYLE_DATA_NAME, keyframes);
      }

      MDSpinner.mountedInstanceCount++;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      MDSpinner.mountedInstanceCount = Math.max(0, MDSpinner.mountedInstanceCount - 1);

      if (MDSpinner.mountedInstanceCount < 1) {
        uninjectStyles(STYLE_DATA_NAME);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _singleColor = _this$props.singleColor,
          _size = _this$props.size,
          _borderSize = _this$props.borderSize,
          _duration = _this$props.duration,
          _color1 = _this$props.color1,
          _color2 = _this$props.color2,
          _color3 = _this$props.color3,
          _color4 = _this$props.color4,
          rest = _objectWithoutProperties(_this$props, ["singleColor", "size", "borderSize", "duration", "color1", "color2", "color3", "color4"]);

      var _getStyles = getStyles(this.props),
          rootStyle = _getStyles.rootStyle,
          layerStyles = _getStyles.layerStyles,
          layerAfterStyle = _getStyles.layerAfterStyle,
          clipStyle = _getStyles.clipStyle,
          clip1AfterStyles = _getStyles.clip1AfterStyles,
          clip2AfterStyles = _getStyles.clip2AfterStyles;

      var layers = [];

      for (var i = 0; i < 4; i++) {
        layers.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: i,
          style: layerStyles[i]
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: clipStyle
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: clip1AfterStyles[i]
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: clipStyle
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: clip2AfterStyles[i]
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: layerAfterStyle
        })));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", _extends({}, rest, {
        style: _objectSpread({}, rootStyle, rest.style != null ? rest.style : {})
      }), layers);
    }
  }]);

  return MDSpinner;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

_defineProperty(MDSpinner, "defaultProps", {
  size: 28,
  duration: 1333,
  color1: "rgb(66, 165, 245)",
  color2: "rgb(239, 83, 80)",
  color3: "rgb(253, 216, 53)",
  color4: "rgb(76, 175, 80)"
});

_defineProperty(MDSpinner, "mountedInstanceCount", 0);

/* harmony default export */ __webpack_exports__["default"] = (MDSpinner);



/***/ }),

/***/ "./node_modules/stylis/stylis.js":
/*!***************************************!*\
  !*** ./node_modules/stylis/stylis.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
(function (factory) {/* eslint-disable */
	 true ? (module['exports'] = factory(null)) :
		undefined
}(/** @param {*=} options */function factory (options) {/* eslint-disable */

	'use strict'

	/**
	 * Notes
	 *
	 * The ['<method name>'] pattern is used to support closure compiler
	 * the jsdoc signatures are also used to the same effect
	 *
	 * ----
	 *
	 * int + int + int === n4 [faster]
	 *
	 * vs
	 *
	 * int === n1 && int === n2 && int === n3
	 *
	 * ----
	 *
	 * switch (int) { case ints...} [faster]
	 *
	 * vs
	 *
	 * if (int == 1 && int === 2 ...)
	 *
	 * ----
	 *
	 * The (first*n1 + second*n2 + third*n3) format used in the property parser
	 * is a simple way to hash the sequence of characters
	 * taking into account the index they occur in
	 * since any number of 3 character sequences could produce duplicates.
	 *
	 * On the other hand sequences that are directly tied to the index of the character
	 * resolve a far more accurate measure, it's also faster
	 * to evaluate one condition in a switch statement
	 * than three in an if statement regardless of the added math.
	 *
	 * This allows the vendor prefixer to be both small and fast.
	 */

	var nullptn = /^\0+/g /* matches leading null characters */
	var formatptn = /[\0\r\f]/g /* matches new line, null and formfeed characters */
	var colonptn = /: */g /* splits animation rules */
	var cursorptn = /zoo|gra/ /* assert cursor varient */
	var transformptn = /([,: ])(transform)/g /* vendor prefix transform, older webkit */
	var animationptn = /,+\s*(?![^(]*[)])/g /* splits multiple shorthand notation animations */
	var propertiesptn = / +\s*(?![^(]*[)])/g /* animation properties */
	var elementptn = / *[\0] */g /* selector elements */
	var selectorptn = /,\r+?/g /* splits selectors */
	var andptn = /([\t\r\n ])*\f?&/g /* match & */
	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g /* matches :global(.*) */
	var invalidptn = /\W+/g /* removes invalid characters from keyframes */
	var keyframeptn = /@(k\w+)\s*(\S*)\s*/ /* matches @keyframes $1 */
	var plcholdrptn = /::(place)/g /* match ::placeholder varient */
	var readonlyptn = /:(read-only)/g /* match :read-only varient */
	var beforeptn = /\s+(?=[{\];=:>])/g /* matches \s before ] ; = : */
	var afterptn = /([[}=:>])\s+/g /* matches \s after characters [ } = : */
	var tailptn = /(\{[^{]+?);(?=\})/g /* matches tail semi-colons ;} */
	var whiteptn = /\s{2,}/g /* matches repeating whitespace */
	var pseudoptn = /([^\(])(:+) */g /* pseudo element */
	var writingptn = /[svh]\w+-[tblr]{2}/ /* match writing mode property values */
	var gradientptn = /([\w-]+t\()/g /* match *gradient property */
	var supportsptn = /\(\s*(.*)\s*\)/g /* match supports (groups) */
	var propertyptn = /([\s\S]*?);/g /* match properties leading semicolon */
	var selfptn = /-self|flex-/g /* match flex- and -self in align-self: flex-*; */
	var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/ /* extrats :readonly or :placholder from selector */
	var trimptn = /[ \t]+$/ /* match tail whitspace */
	var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/ /* match max/min/fit-content, fill-available */
	var imgsrcptn = /([^-])(image-set\()/

	/* vendors */
	var webkit = '-webkit-'
	var moz = '-moz-'
	var ms = '-ms-'

	/* character codes */
	var SEMICOLON = 59 /* ; */
	var CLOSEBRACES = 125 /* } */
	var OPENBRACES = 123 /* { */
	var OPENPARENTHESES = 40 /* ( */
	var CLOSEPARENTHESES = 41 /* ) */
	var OPENBRACKET = 91 /* [ */
	var CLOSEBRACKET = 93 /* ] */
	var NEWLINE = 10 /* \n */
	var CARRIAGE = 13 /* \r */
	var TAB = 9 /* \t */
	var AT = 64 /* @ */
	var SPACE = 32 /*   */
	var AND = 38 /* & */
	var DASH = 45 /* - */
	var UNDERSCORE = 95 /* _ */
	var STAR = 42 /* * */
	var COMMA = 44 /* , */
	var COLON = 58 /* : */
	var SINGLEQUOTE = 39 /* ' */
	var DOUBLEQUOTE = 34 /* " */
	var FOWARDSLASH = 47 /* / */
	var GREATERTHAN = 62 /* > */
	var PLUS = 43 /* + */
	var TILDE = 126 /* ~ */
	var NULL = 0 /* \0 */
	var FORMFEED = 12 /* \f */
	var VERTICALTAB = 11 /* \v */

	/* special identifiers */
	var KEYFRAME = 107 /* k */
	var MEDIA = 109 /* m */
	var SUPPORTS = 115 /* s */
	var PLACEHOLDER = 112 /* p */
	var READONLY = 111 /* o */
	var IMPORT = 105 /* <at>i */
	var CHARSET = 99 /* <at>c */
	var DOCUMENT = 100 /* <at>d */
	var PAGE = 112 /* <at>p */

	var column = 1 /* current column */
	var line = 1 /* current line numebr */
	var pattern = 0 /* :pattern */

	var cascade = 1 /* #id h1 h2 vs h1#id h2#id  */
	var prefix = 1 /* vendor prefix */
	var escape = 1 /* escape :global() pattern */
	var compress = 0 /* compress output */
	var semicolon = 0 /* no/semicolon option */
	var preserve = 0 /* preserve empty selectors */

	/* empty reference */
	var array = []

	/* plugins */
	var plugins = []
	var plugged = 0
	var should = null

	/* plugin context */
	var POSTS = -2
	var PREPS = -1
	var UNKWN = 0
	var PROPS = 1
	var BLCKS = 2
	var ATRUL = 3

	/* plugin newline context */
	var unkwn = 0

	/* keyframe animation */
	var keyed = 1
	var key = ''

	/* selector namespace */
	var nscopealt = ''
	var nscope = ''

	/**
	 * Compile
	 *
	 * @param {Array<string>} parent
	 * @param {Array<string>} current
	 * @param {string} body
	 * @param {number} id
	 * @param {number} depth
	 * @return {string}
	 */
	function compile (parent, current, body, id, depth) {
		var bracket = 0 /* brackets [] */
		var comment = 0 /* comments /* // or /* */
		var parentheses = 0 /* functions () */
		var quote = 0 /* quotes '', "" */

		var first = 0 /* first character code */
		var second = 0 /* second character code */
		var code = 0 /* current character code */
		var tail = 0 /* previous character code */
		var trail = 0 /* character before previous code */
		var peak = 0 /* previous non-whitespace code */

		var counter = 0 /* count sequence termination */
		var context = 0 /* track current context */
		var atrule = 0 /* track @at-rule context */
		var pseudo = 0 /* track pseudo token index */
		var caret = 0 /* current character index */
		var format = 0 /* control character formating context */
		var insert = 0 /* auto semicolon insertion */
		var invert = 0 /* inverted selector pattern */
		var length = 0 /* generic length address */
		var eof = body.length /* end of file(length) */
		var eol = eof - 1 /* end of file(characters) */

		var char = '' /* current character */
		var chars = '' /* current buffer of characters */
		var child = '' /* next buffer of characters */
		var out = '' /* compiled body */
		var children = '' /* compiled children */
		var flat = '' /* compiled leafs */
		var selector /* generic selector address */
		var result /* generic address */

		// ...build body
		while (caret < eof) {
			code = body.charCodeAt(caret)

			// eof varient
			if (caret === eol) {
				// last character + noop context, add synthetic padding for noop context to terminate
				if (comment + quote + parentheses + bracket !== 0) {
					if (comment !== 0) {
						code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH
					}

					quote = parentheses = bracket = 0
					eof++
					eol++
				}
			}

			if (comment + quote + parentheses + bracket === 0) {
				// eof varient
				if (caret === eol) {
					if (format > 0) {
						chars = chars.replace(formatptn, '')
					}

					if (chars.trim().length > 0) {
						switch (code) {
							case SPACE:
							case TAB:
							case SEMICOLON:
							case CARRIAGE:
							case NEWLINE: {
								break
							}
							default: {
								chars += body.charAt(caret)
							}
						}

						code = SEMICOLON
					}
				}

				// auto semicolon insertion
				if (insert === 1) {
					switch (code) {
						// false flags
						case OPENBRACES:
						case CLOSEBRACES:
						case SEMICOLON:
						case DOUBLEQUOTE:
						case SINGLEQUOTE:
						case OPENPARENTHESES:
						case CLOSEPARENTHESES:
						case COMMA: {
							insert = 0
						}
						// ignore
						case TAB:
						case CARRIAGE:
						case NEWLINE:
						case SPACE: {
							break
						}
						// valid
						default: {
							insert = 0
							length = caret
							first = code
							caret--
							code = SEMICOLON

							while (length < eof) {
								switch (body.charCodeAt(length++)) {
									case NEWLINE:
									case CARRIAGE:
									case SEMICOLON: {
										++caret
										code = first
										length = eof
										break
									}
									case COLON: {
										if (format > 0) {
											++caret
											code = first
										}
									}
									case OPENBRACES: {
										length = eof
									}
								}
							}
						}
					}
				}

				// token varient
				switch (code) {
					case OPENBRACES: {
						chars = chars.trim()
						first = chars.charCodeAt(0)
						counter = 1
						length = ++caret

						while (caret < eof) {
							switch (code = body.charCodeAt(caret)) {
								case OPENBRACES: {
									counter++
									break
								}
								case CLOSEBRACES: {
									counter--
									break
								}
								case FOWARDSLASH: {
									switch (second = body.charCodeAt(caret + 1)) {
										// /*, //
										case STAR:
										case FOWARDSLASH: {
											caret = delimited(second, caret, eol, body)
										}
									}
									break
								}
								// given "[" === 91 & "]" === 93 hence forth 91 + 1 + 1 === 93
								case OPENBRACKET: {
									code++
								}
								// given "(" === 40 & ")" === 41 hence forth 40 + 1 === 41
								case OPENPARENTHESES: {
									code++
								}
								// quote tail delimiter is identical to the head delimiter hence noop,
								// fallthrough clauses have been shifted to the correct tail delimiter
								case DOUBLEQUOTE:
								case SINGLEQUOTE: {
									while (caret++ < eol) {
										if (body.charCodeAt(caret) === code) {
											break
										}
									}
								}
							}

							if (counter === 0) {
								break
							}

							caret++
						}

						child = body.substring(length, caret)

						if (first === NULL) {
							first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0)
						}

						switch (first) {
							// @at-rule
							case AT: {
								if (format > 0) {
									chars = chars.replace(formatptn, '')
								}

								second = chars.charCodeAt(1)

								switch (second) {
									case DOCUMENT:
									case MEDIA:
									case SUPPORTS:
									case DASH: {
										selector = current
										break
									}
									default: {
										selector = array
									}
								}

								child = compile(current, selector, child, second, depth+1)
								length = child.length

								// preserve empty @at-rule
								if (preserve > 0 && length === 0) {
									length = chars.length
								}

								// execute plugins, @at-rule context
								if (plugged > 0) {
									selector = select(array, chars, invert)
									result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id)
									chars = selector.join('')

									if (result !== void 0) {
										if ((length = (child = result.trim()).length) === 0) {
											second = 0
											child = ''
										}
									}
								}

								if (length > 0) {
									switch (second) {
										case SUPPORTS: {
											chars = chars.replace(supportsptn, supports)
										}
										case DOCUMENT:
										case MEDIA:
										case DASH: {
											child = chars + '{' + child + '}'
											break
										}
										case KEYFRAME: {
											chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''))
											child = chars + '{' + child + '}'

											if (prefix === 1 || (prefix === 2 && vendor('@'+child, 3))) {
												child = '@' + webkit + child + '@' + child
											} else {
												child = '@' + child
											}
											break
										}
										default: {
											child = chars + child

											if (id === PAGE) {
												child = (out += child, '')
											}
										}
									}
								} else {
									child = ''
								}

								break
							}
							// selector
							default: {
								child = compile(current, select(current, chars, invert), child, id, depth+1)
							}
						}

						children += child

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						atrule = 0
						chars = ''
						child = ''
						code = body.charCodeAt(++caret)
						break
					}
					case CLOSEBRACES:
					case SEMICOLON: {
						chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim()

						if ((length = chars.length) > 1) {
							// monkey-patch missing colon
							if (pseudo === 0) {
								first = chars.charCodeAt(0)

								// first character is a letter or dash, buffer has a space character
								if ((first === DASH || first > 96 && first < 123)) {
									length = (chars = chars.replace(' ', ':')).length
								}
							}

							// execute plugins, property context
							if (plugged > 0) {
								if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
									if ((length = (chars = result.trim()).length) === 0) {
										chars = '\0\0'
									}
								}
							}

							first = chars.charCodeAt(0)
							second = chars.charCodeAt(1)

							switch (first) {
								case NULL: {
									break
								}
								case AT: {
									if (second === IMPORT || second === CHARSET) {
										flat += chars + body.charAt(caret)
										break
									}
								}
								default: {
									if (chars.charCodeAt(length-1) === COLON) {
										break
									}

									out += property(chars, first, second, chars.charCodeAt(2))
								}
							}
						}

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						chars = ''
						code = body.charCodeAt(++caret)
						break
					}
				}
			}

			// parse characters
			switch (code) {
				case CARRIAGE:
				case NEWLINE: {
					// auto insert semicolon
					if (comment + quote + parentheses + bracket + semicolon === 0) {
						// valid non-whitespace characters that
						// may precede a newline
						switch (peak) {
							case CLOSEPARENTHESES:
							case SINGLEQUOTE:
							case DOUBLEQUOTE:
							case AT:
							case TILDE:
							case GREATERTHAN:
							case STAR:
							case PLUS:
							case FOWARDSLASH:
							case DASH:
							case COLON:
							case COMMA:
							case SEMICOLON:
							case OPENBRACES:
							case CLOSEBRACES: {
								break
							}
							default: {
								// current buffer has a colon
								if (pseudo > 0) {
									insert = 1
								}
							}
						}
					}

					// terminate line comment
					if (comment === FOWARDSLASH) {
						comment = 0
					} else if (cascade + context === 0 && id !== KEYFRAME && chars.length > 0) {
						format = 1
						chars += '\0'
					}

					// execute plugins, newline context
					if (plugged * unkwn > 0) {
						proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id)
					}

					// next line, reset column position
					column = 1
					line++
					break
				}
				case SEMICOLON:
				case CLOSEBRACES: {
					if (comment + quote + parentheses + bracket === 0) {
						column++
						break
					}
				}
				default: {
					// increment column position
					column++

					// current character
					char = body.charAt(caret)

					// remove comments, escape functions, strings, attributes and prepare selectors
					switch (code) {
						case TAB:
						case SPACE: {
							if (quote + bracket + comment === 0) {
								switch (tail) {
									case COMMA:
									case COLON:
									case TAB:
									case SPACE: {
										char = ''
										break
									}
									default: {
										if (code !== SPACE) {
											char = ' '
										}
									}
								}
							}
							break
						}
						// escape breaking control characters
						case NULL: {
							char = '\\0'
							break
						}
						case FORMFEED: {
							char = '\\f'
							break
						}
						case VERTICALTAB: {
							char = '\\v'
							break
						}
						// &
						case AND: {
							// inverted selector pattern i.e html &
							if (quote + comment + bracket === 0 && cascade > 0) {
								invert = 1
								format = 1
								char = '\f' + char
							}
							break
						}
						// ::p<l>aceholder, l
						// :read-on<l>y, l
						case 108: {
							if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
								switch (caret - pseudo) {
									// ::placeholder
									case 2: {
										if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
											pattern = tail
										}
									}
									// :read-only
									case 8: {
										if (trail === READONLY) {
											pattern = trail
										}
									}
								}
							}
							break
						}
						// :<pattern>
						case COLON: {
							if (quote + comment + bracket === 0) {
								pseudo = caret
							}
							break
						}
						// selectors
						case COMMA: {
							if (comment + parentheses + quote + bracket === 0) {
								format = 1
								char += '\r'
							}
							break
						}
						// quotes
						case DOUBLEQUOTE:
						case SINGLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						// attributes
						case OPENBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket++
							}
							break
						}
						case CLOSEBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket--
							}
							break
						}
						// functions
						case CLOSEPARENTHESES: {
							if (quote + comment + bracket === 0) {
								parentheses--
							}
							break
						}
						case OPENPARENTHESES: {
							if (quote + comment + bracket === 0) {
								if (context === 0) {
									switch (tail*2 + trail*3) {
										// :matches
										case 533: {
											break
										}
										// :global, :not, :nth-child etc...
										default: {
											counter = 0
											context = 1
										}
									}
								}

								parentheses++
							}
							break
						}
						case AT: {
							if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
								atrule = 1
							}
							break
						}
						// block/line comments
						case STAR:
						case FOWARDSLASH: {
							if (quote + bracket + parentheses > 0) {
								break
							}

							switch (comment) {
								// initialize line/block comment context
								case 0: {
									switch (code*2 + body.charCodeAt(caret+1)*3) {
										// //
										case 235: {
											comment = FOWARDSLASH
											break
										}
										// /*
										case 220: {
											length = caret
											comment = STAR
											break
										}
									}
									break
								}
								// end block comment context
								case STAR: {
									if (code === FOWARDSLASH && tail === STAR && length + 2 !== caret) {
										// /*<!> ... */, !
										if (body.charCodeAt(length+2) === 33) {
											out += body.substring(length, caret+1)
										}
										char = ''
										comment = 0
									}
								}
							}
						}
					}

					// ignore comment blocks
					if (comment === 0) {
						// aggressive isolation mode, divide each individual selector
						// including selectors in :not function but excluding selectors in :global function
						if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
							switch (code) {
								case COMMA:
								case TILDE:
								case GREATERTHAN:
								case PLUS:
								case CLOSEPARENTHESES:
								case OPENPARENTHESES: {
									if (context === 0) {
										// outside of an isolated context i.e nth-child(<...>)
										switch (tail) {
											case TAB:
											case SPACE:
											case NEWLINE:
											case CARRIAGE: {
												char = char + '\0'
												break
											}
											default: {
												char = '\0' + char + (code === COMMA ? '' : '\0')
											}
										}
										format = 1
									} else {
										// within an isolated context, sleep untill it's terminated
										switch (code) {
											case OPENPARENTHESES: {
												// :globa<l>(
												if (pseudo + 7 === caret && tail === 108) {
													pseudo = 0
												}
												context = ++counter
												break
											}
											case CLOSEPARENTHESES: {
												if ((context = --counter) === 0) {
													format = 1
													char += '\0'
												}
												break
											}
										}
									}
									break
								}
								case TAB:
								case SPACE: {
									switch (tail) {
										case NULL:
										case OPENBRACES:
										case CLOSEBRACES:
										case SEMICOLON:
										case COMMA:
										case FORMFEED:
										case TAB:
										case SPACE:
										case NEWLINE:
										case CARRIAGE: {
											break
										}
										default: {
											// ignore in isolated contexts
											if (context === 0) {
												format = 1
												char += '\0'
											}
										}
									}
								}
							}
						}

						// concat buffer of characters
						chars += char

						// previous non-whitespace character code
						if (code !== SPACE && code !== TAB) {
							peak = code
						}
					}
				}
			}

			// tail character codes
			trail = tail
			tail = code

			// visit every character
			caret++
		}

		length = out.length

		// preserve empty selector
 		if (preserve > 0) {
 			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
 				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
					length = current.join(',').length + 2
 				}
 			}
		}

		if (length > 0) {
			// cascade isolation mode?
			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current

			// execute plugins, block context
			if (plugged > 0) {
				result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id)

				if (result !== void 0 && (out = result).length === 0) {
					return flat + out + children
				}
			}

			out = selector.join(',') + '{' + out + '}'

			if (prefix*pattern !== 0) {
				if (prefix === 2 && !vendor(out, 2))
					pattern = 0

				switch (pattern) {
					// ::read-only
					case READONLY: {
						out = out.replace(readonlyptn, ':'+moz+'$1')+out
						break
					}
					// ::placeholder
					case PLACEHOLDER: {
						out = (
							out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
							out.replace(plcholdrptn, '::' + moz + '$1') +
							out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
						)
						break
					}
				}

				pattern = 0
			}
		}

		return flat + out + children
	}

	/**
	 * Select
	 *
	 * @param {Array<string>} parent
	 * @param {string} current
	 * @param {number} invert
	 * @return {Array<string>}
	 */
	function select (parent, current, invert) {
		var selectors = current.trim().split(selectorptn)
		var out = selectors

		var length = selectors.length
		var l = parent.length

		switch (l) {
			// 0-1 parent selectors
			case 0:
			case 1: {
				for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
					out[i] = scope(selector, out[i], invert, l).trim()
				}
				break
			}
			// >2 parent selectors, nested
			default: {
				for (var i = 0, j = 0, out = []; i < length; ++i) {
					for (var k = 0; k < l; ++k) {
						out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim()
					}
				}
			}
		}

		return out
	}

	/**
	 * Scope
	 *
	 * @param {string} parent
	 * @param {string} current
	 * @param {number} invert
	 * @param {number} level
	 * @return {string}
	 */
	function scope (parent, current, invert, level) {
		var selector = current
		var code = selector.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (selector = selector.trim()).charCodeAt(0)
		}

		switch (code) {
			// &
			case AND: {
				switch (cascade + level) {
					case 0:
					case 1: {
						if (parent.trim().length === 0) {
							break
						}
					}
					default: {
						return selector.replace(andptn, '$1'+parent.trim())
					}
				}
				break
			}
			// :
			case COLON: {
				switch (selector.charCodeAt(1)) {
					// g in :global
					case 103: {
						if (escape > 0 && cascade > 0) {
							return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
						}
						break
					}
					default: {
						// :hover
						return parent.trim() + selector.replace(andptn, '$1'+parent.trim())
					}
				}
			}
			default: {
				// html &
				if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
					return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
				}
			}
		}

		return parent + selector
	}

	/**
	 * Property
	 *
	 * @param {string} input
	 * @param {number} first
	 * @param {number} second
	 * @param {number} third
	 * @return {string}
	 */
	function property (input, first, second, third) {
		var index = 0
		var out = input + ';'
		var hash = (first*2) + (second*3) + (third*4)
		var cache

		// animation: a, n, i characters
		if (hash === 944) {
			return animation(out)
		} else if (prefix === 0 || (prefix === 2 && !vendor(out, 1))) {
			return out
		}

		// vendor prefix
		switch (hash) {
			// text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
			case 1015: {
				// text-shadow/text-align/text-transform, a
				return out.charCodeAt(10) === 97 ? webkit + out + out : out
			}
			// filter/fill f, i, l
			case 951: {
				// filter, t
				return out.charCodeAt(3) === 116 ? webkit + out + out : out
			}
			// color/column, c, o, l
			case 963: {
				// column, n
				return out.charCodeAt(5) === 110 ? webkit + out + out : out
			}
			// box-decoration-break, b, o, x
			case 1009: {
				if (out.charCodeAt(4) !== 100) {
					break
				}
			}
			// mask, m, a, s
			// clip-path, c, l, i
			case 969:
			case 942: {
				return webkit + out + out
			}
			// appearance: a, p, p
			case 978: {
				return webkit + out + moz + out + out
			}
			// hyphens: h, y, p
			// user-select: u, s, e
			case 1019:
			case 983: {
				return webkit + out + moz + out + ms + out + out
			}
			// background/backface-visibility, b, a, c
			case 883: {
				// backface-visibility, -
				if (out.charCodeAt(8) === DASH) {
					return webkit + out + out
				}

				// image-set(...)
				if (out.indexOf('image-set(', 11) > 0) {
					return out.replace(imgsrcptn, '$1'+webkit+'$2') + out
				}

				return out
			}
			// flex: f, l, e
			case 932: {
				if (out.charCodeAt(4) === DASH) {
					switch (out.charCodeAt(5)) {
						// flex-grow, g
						case 103: {
							return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out
						}
						// flex-shrink, s
						case 115: {
							return webkit + out + ms + out.replace('shrink', 'negative') + out
						}
						// flex-basis, b
						case 98: {
							return webkit + out + ms + out.replace('basis', 'preferred-size') + out
						}
					}
				}

				return webkit + out + ms + out + out
			}
			// order: o, r, d
			case 964: {
				return webkit + out + ms + 'flex' + '-' + out + out
			}
			// justify-items/justify-content, j, u, s
			case 1023: {
				// justify-content, c
				if (out.charCodeAt(8) !== 99) {
					break
				}

				cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify')
				return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
			}
			// cursor, c, u, r
			case 1005: {
				return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out
			}
			// writing-mode, w, r, i
			case 1000: {
				cache = out.substring(13).trim()
				index = cache.indexOf('-') + 1

				switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
					// vertical-lr
					case 226: {
						cache = out.replace(writingptn, 'tb')
						break
					}
					// vertical-rl
					case 232: {
						cache = out.replace(writingptn, 'tb-rl')
						break
					}
					// horizontal-tb
					case 220: {
						cache = out.replace(writingptn, 'lr')
						break
					}
					default: {
						return out
					}
				}

				return webkit + out + ms + cache + out
			}
			// position: sticky
			case 1017: {
				if (out.indexOf('sticky', 9) === -1) {
					return out
				}
			}
			// display(flex/inline-flex/inline-box): d, i, s
			case 975: {
				index = (out = input).length - 10
				cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim()

				switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
					// inline-
					case 203: {
						// inline-box
						if (cache.charCodeAt(8) < 111) {
							break
						}
					}
					// inline-box/sticky
					case 115: {
						out = out.replace(cache, webkit+cache)+';'+out
						break
					}
					// inline-flex
					// flex
					case 207:
					case 102: {
						out = (
							out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
							out.replace(cache, webkit+cache)+';'+
							out.replace(cache, ms+cache+'box')+';'+
							out
						)
					}
				}

				return out + ';'
			}
			// align-items, align-center, align-self: a, l, i, -
			case 938: {
				if (out.charCodeAt(5) === DASH) {
					switch (out.charCodeAt(6)) {
						// align-items, i
						case 105: {
							cache = out.replace('-items', '')
							return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
						}
						// align-self, s
						case 115: {
							return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
						}
						// align-content
						default: {
							return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out
						}
					}
				}
				break
			}
			// min/max
			case 973:
			case 989: {
				// min-/max- height/width/block-size/inline-size
				if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
					break
				}
			}
			// height/width: min-content / width: max-content
			case 931:
			case 953: {
				if (dimensionptn.test(input) === true) {
					// stretch
					if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115)
						return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch')
					else
						return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out
				}
				break
			}
			// transform, transition: t, r, a
			case 962: {
				out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out

				// transitions
				if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
					return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
				}

				break
			}
		}

		return out
	}

	/**
	 * Vendor
	 *
	 * @param {string} content
	 * @param {number} context
	 * @return {boolean}
	 */
	function vendor (content, context) {
		var index = content.indexOf(context === 1 ? ':' : '{')
		var key = content.substring(0, context !== 3 ? index : 10)
		var value = content.substring(index + 1, content.length - 1)

		return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context)
	}

	/**
	 * Supports
	 *
	 * @param {string} match
	 * @param {string} group
	 * @return {string}
	 */
	function supports (match, group) {
		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2))

		return out !== group+';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '('+group+')'
	}

	/**
	 * Animation
	 *
	 * @param {string} input
	 * @return {string}
	 */
	function animation (input) {
		var length = input.length
		var index = input.indexOf(':', 9) + 1
		var declare = input.substring(0, index).trim()
		var out = input.substring(index, length-1).trim()

		switch (input.charCodeAt(9)*keyed) {
			case 0: {
				break
			}
			// animation-*, -
			case DASH: {
				// animation-name, n
				if (input.charCodeAt(10) !== 110) {
					break
				}
			}
			// animation/animation-name
			default: {
				// split in case of multiple animations
				var list = out.split((out = '', animationptn))

				for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
					var value = list[i]
					var items = value.split(propertiesptn)

					while (value = items[index]) {
						var peak = value.charCodeAt(0)

						if (keyed === 1 && (
							// letters
							(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
							// dash but not in sequence i.e --
							(peak === DASH && value.charCodeAt(1) !== DASH)
						)) {
							// not a number/function
							switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
								case 1: {
									switch (value) {
										// not a valid reserved keyword
										case 'infinite': case 'alternate': case 'backwards': case 'running':
										case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
										case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
										case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
										case 'initial': case 'unset': case 'step-start': case 'step-end': {
											break
										}
										default: {
											value += key
										}
									}
								}
							}
						}

						items[index++] = value
					}

					out += (i === 0 ? '' : ',') + items.join(' ')
				}
			}
		}

		out = declare + out + ';'

		if (prefix === 1 || (prefix === 2 && vendor(out, 1)))
			return webkit + out + out

		return out
	}

	/**
	 * Isolate
	 *
	 * @param {Array<string>} current
	 */
	function isolate (current) {
		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
			// split individual elements in a selector i.e h1 h2 === [h1, h2]
			var elements = current[i].split(elementptn)
			var out = ''

			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
				// empty element
				if ((size = (element = elements[j]).length) === 0 && l > 1) {
					continue
				}

				tail = out.charCodeAt(out.length-1)
				code = element.charCodeAt(0)
				padding = ''

				if (j !== 0) {
					// determine if we need padding
					switch (tail) {
						case STAR:
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case OPENPARENTHESES:  {
							break
						}
						default: {
							padding = ' '
						}
					}
				}

				switch (code) {
					case AND: {
						element = padding + nscopealt
					}
					case TILDE:
					case GREATERTHAN:
					case PLUS:
					case SPACE:
					case CLOSEPARENTHESES:
					case OPENPARENTHESES: {
						break
					}
					case OPENBRACKET: {
						element = padding + element + nscopealt
						break
					}
					case COLON: {
						switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
							// :global
							case 530: {
								if (escape > 0) {
									element = padding + element.substring(8, size - 1)
									break
								}
							}
							// :hover, :nth-child(), ...
							default: {
								if (j < 1 || elements[j-1].length < 1) {
									element = padding + nscopealt + element
								}
							}
						}
						break
					}
					case COMMA: {
						padding = ''
					}
					default: {
						if (size > 1 && element.indexOf(':') > 0) {
							element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2')
						} else {
							element = padding + element + nscopealt
						}
					}
				}

				out += element
			}

			selector[i] = out.replace(formatptn, '').trim()
		}

		return selector
	}

	/**
	 * Proxy
	 *
	 * @param {number} context
	 * @param {string} content
	 * @param {Array<string>} selectors
	 * @param {Array<string>} parents
	 * @param {number} line
	 * @param {number} column
	 * @param {number} length
	 * @param {number} id
	 * @param {number} depth
	 * @param {number} at
	 * @return {(string|void|*)}
	 */
	function proxy (context, content, selectors, parents, line, column, length, id, depth, at) {
		for (var i = 0, out = content, next; i < plugged; ++i) {
			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
				case void 0:
				case false:
				case true:
				case null: {
					break
				}
				default: {
					out = next
				}
			}
		}
		if (out !== content) {
		  return out
		}
	}

	/**
	 * @param {number} code
	 * @param {number} index
	 * @param {number} length
	 * @param {string} body
	 * @return {number}
	 */
	function delimited (code, index, length, body) {
		for (var i = index + 1; i < length; ++i) {
			switch (body.charCodeAt(i)) {
				// /*
				case FOWARDSLASH: {
					if (code === STAR) {
						if (body.charCodeAt(i - 1) === STAR &&  index + 2 !== i) {
							return i + 1
						}
					}
					break
				}
				// //
				case NEWLINE: {
					if (code === FOWARDSLASH) {
						return i + 1
					}
				}
			}
		}

		return i
	}

	/**
	 * @param {number} type
	 * @param {number} index
	 * @param {number} length
	 * @param {number} find
	 * @param {string} body
	 * @return {number}
	 */
	function match (type, index, length, body) {
		for (var i = index + 1; i < length; ++i) {
			switch (body.charCodeAt(i)) {
				case type: {
					return i
				}
			}
		}

		return i
	}

	/**
	 * Minify
	 *
	 * @param {(string|*)} output
	 * @return {string}
	 */
	function minify (output) {
		return output
			.replace(formatptn, '')
			.replace(beforeptn, '')
			.replace(afterptn, '$1')
			.replace(tailptn, '$1')
			.replace(whiteptn, ' ')
	}

	/**
	 * Use
	 *
	 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
	 */
	function use (plugin) {
		switch (plugin) {
			case void 0:
			case null: {
				plugged = plugins.length = 0
				break
			}
			default: {
				if (typeof plugin === 'function') {
					plugins[plugged++] = plugin
				}	else if (typeof plugin === 'object') {
					for (var i = 0, length = plugin.length; i < length; ++i) {
						use(plugin[i])
					}
				} else {
					unkwn = !!plugin|0
				}
			}
 		}

 		return use
	}

	/**
	 * Set
	 *
	 * @param {*} options
	 */
	function set (options) {
		for (var name in options) {
			var value = options[name]
			switch (name) {
				case 'keyframe': keyed = value|0; break
				case 'global': escape = value|0; break
				case 'cascade': cascade = value|0; break
				case 'compress': compress = value|0; break
				case 'semicolon': semicolon = value|0; break
				case 'preserve': preserve = value|0; break
				case 'prefix':
					should = null

					if (!value) {
						prefix = 0
					} else if (typeof value !== 'function') {
						prefix = 1
					} else {
						prefix = 2
						should = value
					}
			}
		}

		return set
	}

	/**
	 * Stylis
	 *
	 * @param {string} selector
	 * @param {string} input
	 * @return {*}
	 */
	function stylis (selector, input) {
		if (this !== void 0 && this.constructor === stylis) {
			return factory(selector)
		}

		// setup
		var ns = selector
		var code = ns.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (ns = ns.trim()).charCodeAt(0)
		}

		// keyframe/animation namespace
		if (keyed > 0) {
			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-')
		}

		// reset, used to assert if a plugin is moneky-patching the return value
		code = 1

		// cascade/isolate
		if (cascade === 1) {
			nscope = ns
		} else {
			nscopealt = ns
		}

		var selectors = [nscope]
		var result

		// execute plugins, pre-process context
		if (plugged > 0) {
			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0)

			if (result !== void 0 && typeof result === 'string') {
				input = result
			}
		}

		// build
		var output = compile(array, selectors, input, 0, 0)

		// execute plugins, post-process context
		if (plugged > 0) {
			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0)

			// bypass minification
			if (result !== void 0 && typeof(output = result) !== 'string') {
				code = 0
			}
		}

		// reset
		key = ''
		nscope = ''
		nscopealt = ''
		pattern = 0
		line = 1
		column = 1

		return compress*code === 0 ? output : minify(output)
	}

	stylis['use'] = use
	stylis['set'] = set

	if (options !== void 0) {
		set(options)
	}

	return stylis
}));


/***/ }),

/***/ "./node_modules/to-camel-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-camel-case/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toCamelCase

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}


/***/ }),

/***/ "./node_modules/to-no-case/index.js":
/*!******************************************!*\
  !*** ./node_modules/to-no-case/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}


/***/ }),

/***/ "./node_modules/to-space-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-space-case/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var clean = __webpack_require__(/*! to-no-case */ "./node_modules/to-no-case/index.js")

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),

/***/ "./node_modules/wix-rich-content-plugin-giphy/dist/module.js":
/*!*******************************************************************!*\
  !*** ./node_modules/wix-rich-content-plugin-giphy/dist/module.js ***!
  \*******************************************************************/
/*! exports provided: GIPHY_TYPE, GiphyViewer, Modals, ModalsMap, createGiphyPlugin, pluginGiphy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GIPHY_TYPE", function() { return GIPHY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiphyViewer", function() { return GiphyViewer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modals", function() { return Modals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalsMap", function() { return ModalsMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGiphyPlugin", function() { return createGiphyPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pluginGiphy", function() { return pluginGiphy; });
/* harmony import */ var wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wix-rich-content-editor-common */ "./node_modules/wix-rich-content-editor-common/dist/module.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wix-rich-content-common */ "./node_modules/wix-rich-content-common/dist/module.js");
/* harmony import */ var react_infinite_scroller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-infinite-scroller */ "./node_modules/react-infinite-scroller/index.js");
/* harmony import */ var react_infinite_scroller__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_infinite_scroller__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_md_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-md-spinner */ "./node_modules/react-md-spinner/dist/react-md-spinner.esm.js");
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-custom-scrollbars */ "./node_modules/react-custom-scrollbars/lib/index.js");
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
var _extends_1=function(fn,module){return fn(module={exports:{}},module.exports),module.exports}((function(module){function _extends(){return module.exports=_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}module.exports=_extends}));var objectWithoutPropertiesLoose=function(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target},InsertPluginIcon=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg",_extends_1({xmlns:"http://www.w3.org/2000/svg",width:19,height:13,viewBox:"0 0 19 13"},props),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{fill:"none",fillRule:"evenodd",stroke:"currentColor"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{d:"M10 1v11.2M14.51 12.227V1.405h4.502M14.154 5.407h3.85M6 3.089a2.08 2.08 0 0 0-2.041-1.684h-.875a2.59 2.59 0 0 0-2.59 2.59v5.068a2.753 2.753 0 0 0 2.753 2.753h.346A2.407 2.407 0 0 0 6 9.409V8a1 1 0 0 0-1-1H2.804"})))},MediaReplaceIcon=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg",_extends_1({xmlnsXlink:"http://www.w3.org/1999/xlink",width:19,height:19,viewBox:"0 0 19 19"},props),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("defs",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{id:"giphy-replace-path",d:"M3 7.8V3.2c0-.11.09-.2.2-.2h.6c.11 0 .2.09.2.2v2.592A6.607 6.607 0 0 1 9.412 3C13.05 3 16 5.91 16 9.5c0 .168-.006.335-.02.5h-1.016a5.51 5.51 0 0 0 .022-.5c0-3.038-2.495-5.5-5.574-5.5a5.583 5.583 0 0 0-4.967 3H7.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H3.2a.2.2 0 0 1-.2-.2zm13 3.4v4.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-2.592A6.607 6.607 0 0 1 9.588 16C5.95 16 3 13.09 3 9.5c0-.168.006-.335.02-.5h1.016a5.496 5.496 0 0 0-.022.5c0 3.038 2.495 5.5 5.574 5.5a5.583 5.583 0 0 0 4.967-3H11.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h4.6c.11 0 .2.09.2.2z"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("mask",{id:"giphy-replace-mask"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("use",{xlinkHref:"#giphy-replace-path"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("use",{fillRule:"nonzero",xlinkHref:"#giphy-replace-path"})))},SearchIcon=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg",_extends_1({width:13,height:13,viewBox:"0 0 13 13",xmlns:"http://www.w3.org/2000/svg"},props),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Symbols",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"Giphy-window",transform:"translate(-234.000000, -20.000000)"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect",{fill:"#FFF",x:"0",y:"0",width:"265",height:"383"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect",{fill:"#FFF",x:"0",y:"0",width:"265",height:"360",rx:"2"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Find-Member-Copy",opacity:"0.7",transform:"translate(234.000000, 20.000000)",fill:"currentColor",fillRule:"nonzero"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Find-Member"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Search-Icon"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{d:"M9.90458476,9 L12.9363236,12.0724408 C13.0131754,12.1503243 13.0131754,12.2755077 12.9363236,12.3533913 L12.3127143,12.9853727 C12.3120899,12.9860055 12.3114612,12.9866341 12.3108284,12.9872586 C12.2322045,13.0648409 12.1055743,13.0639966 12.027992,12.9853727 L9,9.91672906 L9.90458476,9 Z M5.5,11 C2.46243388,11 0,8.53756612 0,5.5 C0,2.46243388 2.46243388,0 5.5,0 C8.53756612,0 11,2.46243388 11,5.5 C11,8.53756612 8.53756612,11 5.5,11 Z M5.5,10 C7.98528137,10 10,7.98528137 10,5.5 C10,3.01471863 7.98528137,1 5.5,1 C3.01471863,1 1,3.01471863 1,5.5 C1,7.98528137 3.01471863,10 5.5,10 Z"})))),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{d:"M18.4852814,366.263456 L25.2487373,359.5 L263,359.5 C263.828427,359.5 264.5,358.828427 264.5,358 L264.5,2 C264.5,1.17157288 263.828427,0.5 263,0.5 L2,0.5 C1.17157288,0.5 0.5,1.17157288 0.5,2 L0.5,358 C0.5,358.828427 1.17157288,359.5 2,359.5 L11.7218254,359.5 L18.4852814,366.263456 Z",id:"Combined-Shape",strokeOpacity:"0.2",stroke:"currentColor"}))))},InsertPluginMobileIcon=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg",_extends_1({xmlns:"http://www.w3.org/2000/svg",width:11,height:14,viewBox:"0 0 11 14"},props),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{stroke:"currentColor",d:"M.5.5v13h10V5.499H5.49V.5H.5z"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{fill:"currentColor",d:"M5 1h1v1H5zM6 0h1v1H6zM9 5h1v1H9zM9 3h1v1H9zM10 4h1v1h-1zM5 5h1v1H5zM7 1h1v1H7zM8 2h1v1H8z"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{stroke:"currentColor",d:"M.465 10.594L4.67 8 8.09 9.947l2.472-1.604"})))},CloseIcon=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg",_extends_1({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:9,height:9,viewBox:"0 0 9 9"},props),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Master",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"Giphy-02-Search",transform:"translate(-974.000000, -258.000000)",fill:"currentColor"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"Giphy-window",transform:"translate(736.000000, 232.000000)"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Window",transform:"translate(238.000000, 26.000000)"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{id:"giphy-Xicon"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect",{id:"giphy-Rectangle",transform:"translate(4.500000, 4.500000) rotate(45.000000) translate(-4.500000, -4.500000) ",x:"-1",y:"4",width:"11",height:"1"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect",{id:"giphy-Rectangle-2",transform:"translate(4.500000, 4.500000) rotate(45.000000) translate(-4.500000, -4.500000) ",x:"4",y:"-1",width:"1",height:"11"})))))))},PoweredByGiphy=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg",_extends_1({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:79,height:9,viewBox:"0 0 53 6"},props),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("defs",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{id:"giphy-a",d:"M.203.01h5.254V6H.203z"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{id:"giphy-c",d:"M0 5.99h52.224V0H0z"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{fill:"none",fillRule:"evenodd",opacity:".3"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{fill:"currentColor"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{d:"M.418 3.536h.793c.691 0 .688-1.14 0-1.14H.418v1.14zm0 .42v.875H0V1.98c.4 0 .811-.004 1.211-.004 1.248 0 1.252 1.97 0 1.979H.418z"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{d:"M3.76 4.472c.651 0 .924-.5.924-1.046 0-.525-.277-1.07-.916-1.082-.605 0-.93.46-.93 1.082.007.505.276 1.046.923 1.046m1.338-1.054c0 .77-.43 1.474-1.338 1.474-.909 0-1.338-.72-1.338-1.47 0-.867.556-1.494 1.345-1.494.894.005 1.331.72 1.331 1.49M8.21 4.835h-.37l-.348-1.006-.287-.956-.288.96-.344 1.002h-.367l-.95-2.854h.468l.666 2.194.676-2.194h.27l.69 2.194.651-2.194h.467zM11.474 4.83H9.541V1.982h1.922v.444H9.96v.77h1.443v.422H9.96v.766h1.514zM12.432 2.397V3.43h.796c.348 0 .5-.24.5-.508 0-.257-.152-.525-.496-.525h-.8zM14.27 4.83h-.49l-.796-.985h-.553v.985h-.419V1.977c.407 0 .811.004 1.219.004.605 0 .923.452.923.933 0 .406-.195.806-.71.887l.78.948.046.082zM16.642 4.83h-1.933V1.982h1.922v.444h-1.504v.77h1.443v.422h-1.443v.766h1.515zM17.595 4.39h.576c.64 0 .908-.512.897-1.013-.011-.48-.28-.96-.897-.96h-.576V4.39zm.576-2.409c.893 0 1.3.696 1.312 1.4.015.721-.396 1.45-1.312 1.45h-.99V1.98h.99zM21.33 4.407h.786c.231 0 .553-.081.553-.395 0-.305-.31-.443-.55-.443h-.789v.838zm0-1.245h.79c.313 0 .47-.135.47-.358 0-.2-.16-.411-.474-.411h-.786v.769zm.786-1.18c.497 0 .889.248.889.813 0 .24-.116.456-.363.566.315.102.445.44.445.656 0 .622-.456.814-.971.814h-1.2V1.98h1.2zM24.404 3.24l.744-1.259h.504v.021l-1.039 1.66v1.169h-.418V3.662l-1.01-1.66v-.02h.497z"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g",{transform:"translate(26.66)"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("mask",{id:"giphy-b",fill:"#fff"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("use",{xlinkHref:"#giphy-a"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{fill:"currentColor",d:"M4.38 1.85a1.728 1.728 0 0 0-1.23-.494c-.877 0-1.447.551-1.447 1.661 0 .73.362 1.63 1.447 1.63.284 0 .73-.057 1.038-.292v-.73H2.827V2.37h2.63v2.52C5.12 5.612 4.181 6 3.142 6 1.011 6 .203 4.5.203 3.017S1.126.011 3.15.011c.746 0 1.407.162 2.115.915l-.885.924z"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("mask",{id:"giphy-d",fill:"#fff"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("use",{xlinkHref:"#giphy-c"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path",{fill:"currentColor",d:"M32.981 5.846h1.516V.173H32.98zM37.113 2.96h1.092c.423 0 .639-.323.639-.696 0-.373-.224-.714-.639-.714h-1.092v1.41zm0 1.354v1.532H35.59V.173h2.615c1.446 0 2.162.956 2.162 2.066 0 1.16-.724 2.059-2.162 2.075h-1.092zM44.507 5.854V3.706h-1.939v2.148h-1.523V.181h1.523v2.156h1.939V.18h1.507v5.673zM49.347 2.118L50.51.173h1.715v.073l-2.138 3.339v2.261h-1.523V3.585L46.516.237V.173h1.716z"}))))};var inheritsLoose=function(subClass,superClass){subClass.prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,subClass.__proto__=superClass},styles={giphy_api_input_modal_container:"At7CS",giphy_api_input_modal_search_textinput_group:"_2oomy",giphy_api_input_modal_search:"_2ZL2f",giphy_api_input_modal_searchIcon:"_1M2LQ",giphy_api_input_modal_closeIcon:"_3S5dn",giphy_api_input_modal_navbar:"_RGEh",giphy_api_input_modal_backButton:"_260uQ"},GIPHY_TYPE="wix-draft-plugin-giphy",DEFAULTS=Object.freeze({config:{size:"content",alignment:"center"},configViewer:{sizes:{desktop:"original",mobile:"original"}}}),DEFAULT_RESOLUTION=Object.freeze({desktop:"original",mobile:"original"}),MobileFullScreenCustomStyle=Object.freeze({overlay:{backgroundColor:"transparent"},content:{top:0,left:0,overflow:"hidden",paddingRight:"6px"}}),DesktopFlyOutModalStyles=Object.freeze({overlay:{backgroundColor:"rgba(0, 0, 0, 0)",zIndex:5},content:{width:"265px",boxSizing:"border-box",height:"357px",overflow:"visible",border:"1px solid #ccc",paddingRight:"10px",paddingLeft:"18px",display:"block",borderRadius:"2px",position:"absolute",zIndex:6,paddingTop:"9px"}}),styles$1={giphy_selecter_container:"_3LhJ2",giphy_selecter_infinite_scroll_container:"_3iOxo",giphy_selecter_infinite_scroll:"_2DsZR",giphy_selecter_customize_scrollbar_container:"P5B7E",giphy_selecter_headerInfiniteScroll:"_2HiA4",giphy_selecter_scrollbarThumb:"pJecw",giphy_selecter_trending:"_1L6df",giphy_selecter_powerdByGiphy:"CpGa-",giphy_selecter_gif_img_container:"_1PnEy",giphy_selecter_gif_img:"KDDu-",giphy_selecter_spinner_more:"_3543q",giphy_selecter_spinner_empty_modal:"_1jDYZ",giphy_selecter_error_msg:"_1dAiV"},GiphySelector=function(_Component){function GiphySelector(props){var _this;(_this=_Component.call(this,props)||this).getGifs=function(searchTag,page){searchTag?_this.giphySdkCore.search("gifs",{q:searchTag,offset:25*page,limit:25}).then((function(response){page>1?_this.setState({gifs:_this.state.gifs.concat(response.data),hasMoreItems:!0,page:_this.state.page+1,didFail:!1}):_this.setState({gifs:response.data,hasMoreItems:!0,page:_this.state.page+1,didFail:!1})})).catch((function(){_this.setState({didFail:!0,hasMoreItems:!1})})):_this.giphySdkCore.trending("gifs",{limit:100}).then((function(response){searchTag||_this.setState({gifs:response.data,hasMoreItems:!1,didFail:!1})})).catch((function(){_this.setState({didFail:!0,hasMoreItems:!1})}))},_this.getMoreGifs=function(){var searchTag=_this.props.searchTag;_this.getGifs(searchTag,_this.state.page)},_this.onClick=function(gif){var gifObj={originalUrl:gif.images.original.url,originalMp4:gif.images.original.mp4,stillUrl:gif.images.original_still.url,downsizedUrl:gif.images.downsized.url,downsizedStillUrl:gif.images.downsized_still.url,downsizedSmallMp4:gif.images.downsized_small.mp4,height:parseInt(gif.images.original.height),width:parseInt(gif.images.original.width)},_this$props=_this.props,componentData=_this$props.componentData,helpers=_this$props.helpers,pubsub=_this$props.pubsub,onConfirm=_this$props.onConfirm,onCloseRequested=_this$props.onCloseRequested;onConfirm?onConfirm(_extends_1({},componentData,{gif:gifObj})):pubsub.update("componentData",{gif:gifObj}),helpers&&helpers.openModal((function(data){return pubsub.update("componentData",{metadata:_extends_1({},data)})})),onCloseRequested()},_this.handleKeyPress=function(e){27===e.charCode&&_this.onClick()};var _componentData=_this.props.componentData;_this.state={url:_componentData.src||"",isLoaded:!1,hasMoreItems:!0,gifs:[],page:0,didFail:!1},_this.styles=Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["mergeStyles"])({styles:styles$1,theme:_this.props.theme});var gphApiClient=__webpack_require__(/*! giphy-js-sdk-core */ "./node_modules/giphy-js-sdk-core/index.js");return _this.giphySdkCore=gphApiClient(_this.props.giphySdkApiKey),_this}inheritsLoose(GiphySelector,_Component);var _proto=GiphySelector.prototype;return _proto.componentWillReceiveProps=function(nextProps){var _this2=this;null!==this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){return _this2.getGifs(nextProps.searchTag)}),300)},_proto.componentDidMount=function(){this.timer=null},_proto.render=function(){var _this3=this,styles=this.styles,t=this.props.t,loader=react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles["giphy_selecter_spinner_"+(this.state.gifs.length?"more":"empty_modal")]},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_md_spinner__WEBPACK_IMPORTED_MODULE_4__["default"],{borderSize:1.5,singleColor:"#000000"})),trending=this.props.searchTag||this.state.didFail&&!this.state.gifs.length?null:t("GiphyPlugin_Trending");return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_selecter_container},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_selecter_trending},trending),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PoweredByGiphy,{className:styles.giphy_selecter_powerdByGiphy})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_selecter_infinite_scroll_container},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_5__["Scrollbars"],{renderThumbVertical:function(){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_selecter_scrollbarThumb})},className:styles.giphy_selecter_customize_scrollbar_container},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_infinite_scroller__WEBPACK_IMPORTED_MODULE_3___default.a,{pageStart:0,loadMore:this.getMoreGifs.bind(this),hasMore:this.state.hasMoreItems,loader:this.state.didFail?null:loader,useWindow:!1,className:styles.giphy_selecter_infinite_scroll},this.state.gifs.map((function(gif,i){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{key:gif.id.toString()+i,role:"button",tabIndex:"0",className:styles.giphy_selecter_gif_img_container,onKeyPress:_this3.handleKeyPress,onClick:function(){return _this3.onClick(gif)}},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img",{className:styles.giphy_selecter_gif_img,src:gif.images.fixed_width_downsampled.url,alt:"gif"}))}))))),this.state.didFail&&!this.state.gifs.length?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_selecter_error_msg}," ",t("GiphyPlugin_ApiErrorMsg")):null)},GiphySelector}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]),GiphyApiInputModal=function(_Component){function GiphyApiInputModal(props){var _this;return(_this=_Component.call(this,props)||this).onChange=function(e){_this.setState({searchTag:e.target.value})},_this.onCloseRequested=function(){_this.setState({isOpen:!1}),_this.props.helpers.closeModal()},_this.handleKeyPress=function(e){27===e.charCode&&_this.onCloseRequested()},_this.handleClearText=function(){_this.setState({searchTag:""})},_this.styles=Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["mergeStyles"])({styles:styles,theme:props.theme}),_this.state={searchTag:""},_this}return inheritsLoose(GiphyApiInputModal,_Component),GiphyApiInputModal.prototype.render=function(){var _this2=this,styles=this.styles,_this$props=this.props,t=_this$props.t,theme=_this$props.theme,isMobile=_this$props.isMobile,languageDir=_this$props.languageDir,searchTag=this.state.searchTag,backButton=react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_api_input_modal_backButton,onClick:this.onCloseRequested,role:"button",tabIndex:"0",onKeyPress:null}),mobileNavbar=react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_api_input_modal_navbar},t("GiphyUploadModal_mobileNavbar_Title")," ",backButton));return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{dir:languageDir},isMobile?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",null,mobileNavbar):null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_api_input_modal_container,"data-hook":"giphyUploadModal"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_api_input_modal_search_textinput_group},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["TextInput"],{inputRef:function(ref){_this2.input=ref},className:styles.giphy_api_input_modal_search,onKeyPress:this.handleKeyPress,onChange:this.onChange,value:this.state.searchTag,placeholder:t("GiphyUploadModal_Input_Placeholder"),theme:theme,"data-hook":"giphyUploadModalInput"}),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles.giphy_api_input_modal_searchIcon},this.state.searchTag?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{onClick:this.handleClearText,role:"button",tabIndex:"0",onKeyPress:null,className:styles.giphy_api_input_modal_closeIcon},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CloseIcon,null)):react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SearchIcon,null))),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GiphySelector,_extends_1({searchTag:searchTag,onCloseRequested:this.onCloseRequested},this.props))))},GiphyApiInputModal}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]),styles$2={giphy_modal_arrow_down:"_1vs7a",giphy_modal_arrow_up:"_3EYCf"},Arrow=function(_Component){function Arrow(props){var _this;return(_this=_Component.call(this,props)||this).styles=Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["mergeStyles"])({styles:styles$2,theme:props.theme}),_this}return inheritsLoose(Arrow,_Component),Arrow.prototype.render=function(){var styles=this.styles,top=this.props.buttonRef.getBoundingClientRect().top;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:styles["giphy_modal_arrow_"+(top>357?"down":"up")]}))},Arrow}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]),createInlineButtons=function(_ref){var _settings$toolbar,_settings$toolbar$ico,t=_ref.t,settings=_ref.settings,isMobile=_ref.isMobile,icon=(null==settings||null===(_settings$toolbar=settings.toolbar)||void 0===_settings$toolbar||null===(_settings$toolbar$ico=_settings$toolbar.icons)||void 0===_settings$toolbar$ico?void 0:_settings$toolbar$ico.replace)||MediaReplaceIcon,modalStyles=isMobile?Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["getModalStyles"])({customStyles:MobileFullScreenCustomStyle,fullScreen:!0,isMobile:isMobile}):null;return[{keyName:"sizeOriginal",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SIZE_ORIGINAL,mobile:!1},{keyName:"sizeSmallCenter",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SIZE_SMALL_CENTER,mobile:!1},{keyName:"sizeContent",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SIZE_CONTENT,mobile:!1},{keyName:"sizeFullWidth",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SIZE_FULL_WIDTH,mobile:!1},{keyName:"separator1",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SEPARATOR,mobile:!1},{keyName:"sizeSmallLeft",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SIZE_SMALL_LEFT,mobile:!1},{keyName:"sizeSimallRight",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SIZE_SMALL_RIGHT,mobile:!1},{keyName:"separator2",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].SEPARATOR,mobile:!1},{keyName:"replace",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].EXTERNAL_MODAL,icon:icon,modalElement:Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["decorateComponentWithProps"])(GiphyApiInputModal,settings),modalStyles:modalStyles,modalStylesFn:function(_ref2){var buttonRef=_ref2.buttonRef,modalStyles=Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["getModalStyles"])({customStyles:DesktopFlyOutModalStyles,fullScreen:!0,isMobile:isMobile}),_buttonRef$getBoundin=buttonRef.getBoundingClientRect(),top=_buttonRef$getBoundin.top,modalLeft=_buttonRef$getBoundin.left-15,modalTop=top>357?top-365:top+30;return _extends_1({},modalStyles,{content:_extends_1({},modalStyles.content,{top:modalTop,left:modalLeft,margin:0,position:"absolute"})})},modalDecorations:[{decorationMode:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["DECORATION_MODE"].APPEND,decorator:Arrow}],mobile:!0,tooltipTextKey:"ReplaceGiphyButton_Tooltip",t:t},{keyName:"delete",type:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["BUTTONS"].DELETE,mobile:!0}]},createInsertButtons=function(_ref){var _settings$toolbar,_settings$toolbar$ico,helpers=_ref.helpers,t=_ref.t,settings=_ref.settings,isMobile=_ref.isMobile,Icon=(null==settings||null===(_settings$toolbar=settings.toolbar)||void 0===_settings$toolbar||null===(_settings$toolbar$ico=_settings$toolbar.icons)||void 0===_settings$toolbar$ico?void 0:_settings$toolbar$ico.InsertPluginButtonIcon)||(isMobile?InsertPluginMobileIcon:InsertPluginIcon),modalStyles=isMobile?Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["getModalStyles"])({customStyles:MobileFullScreenCustomStyle,fullScreen:!0,isMobile:isMobile}):null;return[{type:"modal",name:"GIF",tooltipText:t("GiphyPlugin_InsertButton_Tooltip"),Icon:Icon,componentData:settings.componentDataDefaults||DEFAULTS,toolbars:settings.insertToolbars||[wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["TOOLBARS"].FOOTER],modalElement:Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["decorateComponentWithProps"])(GiphyApiInputModal,settings),modalStyles:modalStyles,modalStylesFn:function(_ref2){var buttonRef=_ref2.buttonRef;return Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["getBottomToolbarModalStyles"])(buttonRef,{customStyles:DesktopFlyOutModalStyles,isMobile:isMobile})},modalDecorations:[{decorationMode:wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["DECORATION_MODE"].APPEND,decorator:Arrow}],helpers:helpers}]};function createToolbar(_ref){var helpers=_ref.helpers,t=_ref.t,settings=_ref.settings,isMobile=_ref.isMobile;return{InlineButtons:createInlineButtons({t:t,settings:settings,isMobile:isMobile}),InsertButtons:createInsertButtons({helpers:helpers,t:t,settings:settings,isMobile:isMobile}),name:"giphy"}}var styles$3={giphy_player:"_1ILCL"},GiphyViewer=function(_Component){function GiphyViewer(props){var _this;return(_this=_Component.call(this,props)||this).getSourceUrl=function(){var componentData=_this.props.componentData,sizes=(_this.props.settings||{}).sizes;switch(sizes=_extends_1({},DEFAULT_RESOLUTION,{},sizes),_this.props.isMobile?sizes.mobile:sizes.desktop){case"original":return componentData.gif.originalMp4||componentData.gif.originalUrl;case"downsizedSmall":return componentData.gif.downsizedSmallMp4||componentData.gif.originalUrl;default:return componentData.gif.originalUrl}},Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["validate"])(props.componentData,wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["pluginGiphySchema"]),_this}inheritsLoose(GiphyViewer,_Component);var _proto=GiphyViewer.prototype;return _proto.componentWillReceiveProps=function(nextProps){Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(nextProps.componentData,this.props.componentData)||Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["validate"])(nextProps.componentData,wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["pluginGiphySchema"])},_proto.render=function(){this.styles=this.styles||Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_2__["mergeStyles"])({styles:styles$3,theme:this.props.theme});var _this$props=this.props,componentData=_this$props.componentData,setComponentUrl=_this$props.setComponentUrl,gifUrl=this.getSourceUrl();return null==setComponentUrl||setComponentUrl(gifUrl),gifUrl.endsWith(".mp4")?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("video",{role:"img",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":"gif",className:this.styles.giphy_player,src:gifUrl}):react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img",{role:"img","aria-label":"gif",className:this.styles.giphy_player,src:componentData.gif.originalUrl,alt:"gif"})},GiphyViewer}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);GiphyViewer.defaultProps={width:"100%",height:"100%",controls:!0};var GiphyComponent=function(_Component){function GiphyComponent(props){var _this;return(_this=_Component.call(this,props)||this).handleReady=function(){_this.state.isLoaded||_this.setState({isLoaded:!0})},_this.renderPlayer=function(){var _this$props=_this.props,componentData=_this$props.componentData,theme=_this$props.theme,settings=_this$props.settings,isMobile=_this$props.isMobile,setComponentUrl=_this$props.setComponentUrl;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GiphyViewer,{ref:_this.setPlayer,componentData:componentData,theme:theme,settings:settings,isMobile:isMobile,setComponentUrl:setComponentUrl})},_this.onKeyDown=function(e,handler){"Enter"!==e.key&&" "!==e.key||handler()},_this.state={isLoading:!1,isLoaded:!1},_this}return inheritsLoose(GiphyComponent,_Component),GiphyComponent.prototype.render=function(){var _this2=this,onClick=this.props.onClick;return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{"data-hook":"giphyPlayer",onClick:onClick,onKeyDown:function(e){return _this2.onKeyDown(e,onClick)}},this.renderPlayer())},GiphyComponent}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);function _toPropertyKey(arg){var key=function(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"==typeof key?key:String(key)}GiphyComponent.type={GIPHY_TYPE:GIPHY_TYPE};var _ModalsMap,createGiphyPlugin=function(config){void 0===config&&(config={});var type=GIPHY_TYPE,_config=config,helpers=_config.helpers,t=_config.t,_config$type=_config[type],settings=void 0===_config$type?{}:_config$type,isMobile=_config.isMobile,rest=objectWithoutPropertiesLoose(_config,["helpers","t",type,"isMobile"].map(_toPropertyKey));return Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_0__["createBasePlugin"])(_extends_1({component:GiphyComponent,type:GIPHY_TYPE,toolbar:createToolbar({helpers:helpers,t:t,settings:settings,isMobile:isMobile}),helpers:helpers,settings:settings,t:t,isMobile:isMobile,defaultPluginData:DEFAULTS},rest))},Modals={GIPHY_API_INPUT:"giphy-api-input"},ModalsMap=((_ModalsMap={})[Modals.GIPHY_API_INPUT]=GiphyApiInputModal,_ModalsMap),pluginGiphy=function(config){return void 0===config&&(config={}),{config:_extends_1({},DEFAULTS.config,{},config),type:GIPHY_TYPE,createPlugin:createGiphyPlugin,ModalsMap:ModalsMap}};
//# sourceMappingURL=module.js.map


/***/ }),

/***/ "./src/cms/ModalsMap.js":
/*!******************************!*\
  !*** ./src/cms/ModalsMap.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.assign.js");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wix_rich_content_plugin_video__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wix-rich-content-plugin-video */ "./node_modules/wix-rich-content-plugin-video/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_sound_cloud__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wix-rich-content-plugin-sound-cloud */ "./node_modules/wix-rich-content-plugin-sound-cloud/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_giphy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wix-rich-content-plugin-giphy */ "./node_modules/wix-rich-content-plugin-giphy/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wix-rich-content-plugin-image */ "./node_modules/wix-rich-content-plugin-image/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wix-rich-content-plugin-text-color */ "./node_modules/wix-rich-content-plugin-text-color/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wix-rich-content-plugin-line-spacing */ "./node_modules/wix-rich-content-plugin-line-spacing/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_vertical_embed__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wix-rich-content-plugin-vertical-embed */ "./node_modules/wix-rich-content-plugin-vertical-embed/dist/module.js");


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




 // import { ModalsMap as GalleryModalsMap } from 'wix-rich-content-plugin-gallery';





var _default = Object.assign({}, wix_rich_content_plugin_video__WEBPACK_IMPORTED_MODULE_1__["ModalsMap"], {}, wix_rich_content_plugin_sound_cloud__WEBPACK_IMPORTED_MODULE_2__["ModalsMap"], {}, wix_rich_content_plugin_giphy__WEBPACK_IMPORTED_MODULE_3__["ModalsMap"], {}, wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_4__["ModalsMap"], {}, wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_5__["ModalsMap"], {}, wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_6__["ModalsMap"], {}, wix_rich_content_plugin_vertical_embed__WEBPACK_IMPORTED_MODULE_7__["ModalsMap"]);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/ModalsMap.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.e34287f3885e4c5cb3de.hot-update.js.map