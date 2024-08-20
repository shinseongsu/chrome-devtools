/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/callsite/index.js":
/*!****************************************!*\
  !*** ./node_modules/callsite/index.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = function () {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  var err = new Error();
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
};

/***/ }),

/***/ "./node_modules/lodash.throttle/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.throttle/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
  nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = throttle;

/***/ }),

/***/ "./node_modules/reconnecting-websocket/dist/reconnecting-websocket-mjs.js":
/*!********************************************************************************!*\
  !*** ./node_modules/reconnecting-websocket/dist/reconnecting-websocket-mjs.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
    i = 0;
  if (m) return m.call(o);
  return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}
var Event = /** @class */function () {
  function Event(type, target) {
    this.target = target;
    this.type = type;
  }
  return Event;
}();
var ErrorEvent = /** @class */function (_super) {
  __extends(ErrorEvent, _super);
  function ErrorEvent(error, target) {
    var _this = _super.call(this, 'error', target) || this;
    _this.message = error.message;
    _this.error = error;
    return _this;
  }
  return ErrorEvent;
}(Event);
var CloseEvent = /** @class */function (_super) {
  __extends(CloseEvent, _super);
  function CloseEvent(code, reason, target) {
    if (code === void 0) {
      code = 1000;
    }
    if (reason === void 0) {
      reason = '';
    }
    var _this = _super.call(this, 'close', target) || this;
    _this.wasClean = true;
    _this.code = code;
    _this.reason = reason;
    return _this;
  }
  return CloseEvent;
}(Event);

/*!
 * Reconnecting WebSocket
 * by Pedro Ladaria <pedro.ladaria@gmail.com>
 * https://github.com/pladaria/reconnecting-websocket
 * License MIT
 */
var getGlobalWebSocket = function getGlobalWebSocket() {
  if (typeof WebSocket !== 'undefined') {
    // @ts-ignore
    return WebSocket;
  }
};
/**
 * Returns true if given argument looks like a WebSocket class
 */
var isWebSocket = function isWebSocket(w) {
  return typeof w !== 'undefined' && !!w && w.CLOSING === 2;
};
var DEFAULT = {
  maxReconnectionDelay: 10000,
  minReconnectionDelay: 1000 + Math.random() * 4000,
  minUptime: 5000,
  reconnectionDelayGrowFactor: 1.3,
  connectionTimeout: 4000,
  maxRetries: Infinity,
  maxEnqueuedMessages: Infinity,
  startClosed: false,
  debug: false
};
var ReconnectingWebSocket = /** @class */function () {
  function ReconnectingWebSocket(url, protocols, options) {
    var _this = this;
    if (options === void 0) {
      options = {};
    }
    this._listeners = {
      error: [],
      message: [],
      open: [],
      close: []
    };
    this._retryCount = -1;
    this._shouldReconnect = true;
    this._connectLock = false;
    this._binaryType = 'blob';
    this._closeCalled = false;
    this._messageQueue = [];
    /**
     * An event listener to be called when the WebSocket connection's readyState changes to CLOSED
     */
    this.onclose = null;
    /**
     * An event listener to be called when an error occurs
     */
    this.onerror = null;
    /**
     * An event listener to be called when a message is received from the server
     */
    this.onmessage = null;
    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data
     */
    this.onopen = null;
    this._handleOpen = function (event) {
      _this._debug('open event');
      var _a = _this._options.minUptime,
        minUptime = _a === void 0 ? DEFAULT.minUptime : _a;
      clearTimeout(_this._connectTimeout);
      _this._uptimeTimeout = setTimeout(function () {
        return _this._acceptOpen();
      }, minUptime);
      _this._ws.binaryType = _this._binaryType;
      // send enqueued messages (messages sent before websocket open event)
      _this._messageQueue.forEach(function (message) {
        return _this._ws.send(message);
      });
      _this._messageQueue = [];
      if (_this.onopen) {
        _this.onopen(event);
      }
      _this._listeners.open.forEach(function (listener) {
        return _this._callEventListener(event, listener);
      });
    };
    this._handleMessage = function (event) {
      _this._debug('message event');
      if (_this.onmessage) {
        _this.onmessage(event);
      }
      _this._listeners.message.forEach(function (listener) {
        return _this._callEventListener(event, listener);
      });
    };
    this._handleError = function (event) {
      _this._debug('error event', event.message);
      _this._disconnect(undefined, event.message === 'TIMEOUT' ? 'timeout' : undefined);
      if (_this.onerror) {
        _this.onerror(event);
      }
      _this._debug('exec error listeners');
      _this._listeners.error.forEach(function (listener) {
        return _this._callEventListener(event, listener);
      });
      _this._connect();
    };
    this._handleClose = function (event) {
      _this._debug('close event');
      _this._clearTimeouts();
      if (_this._shouldReconnect) {
        _this._connect();
      }
      if (_this.onclose) {
        _this.onclose(event);
      }
      _this._listeners.close.forEach(function (listener) {
        return _this._callEventListener(event, listener);
      });
    };
    this._url = url;
    this._protocols = protocols;
    this._options = options;
    if (this._options.startClosed) {
      this._shouldReconnect = false;
    }
    this._connect();
  }
  Object.defineProperty(ReconnectingWebSocket, "CONNECTING", {
    get: function get() {
      return 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket, "OPEN", {
    get: function get() {
      return 1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket, "CLOSING", {
    get: function get() {
      return 2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket, "CLOSED", {
    get: function get() {
      return 3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "CONNECTING", {
    get: function get() {
      return ReconnectingWebSocket.CONNECTING;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "OPEN", {
    get: function get() {
      return ReconnectingWebSocket.OPEN;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "CLOSING", {
    get: function get() {
      return ReconnectingWebSocket.CLOSING;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "CLOSED", {
    get: function get() {
      return ReconnectingWebSocket.CLOSED;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "binaryType", {
    get: function get() {
      return this._ws ? this._ws.binaryType : this._binaryType;
    },
    set: function set(value) {
      this._binaryType = value;
      if (this._ws) {
        this._ws.binaryType = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "retryCount", {
    /**
     * Returns the number or connection retries
     */
    get: function get() {
      return Math.max(this._retryCount, 0);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "bufferedAmount", {
    /**
     * The number of bytes of data that have been queued using calls to send() but not yet
     * transmitted to the network. This value resets to zero once all queued data has been sent.
     * This value does not reset to zero when the connection is closed; if you keep calling send(),
     * this will continue to climb. Read only
     */
    get: function get() {
      var bytes = this._messageQueue.reduce(function (acc, message) {
        if (typeof message === 'string') {
          acc += message.length; // not byte size
        } else if (message instanceof Blob) {
          acc += message.size;
        } else {
          acc += message.byteLength;
        }
        return acc;
      }, 0);
      return bytes + (this._ws ? this._ws.bufferedAmount : 0);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "extensions", {
    /**
     * The extensions selected by the server. This is currently only the empty string or a list of
     * extensions as negotiated by the connection
     */
    get: function get() {
      return this._ws ? this._ws.extensions : '';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "protocol", {
    /**
     * A string indicating the name of the sub-protocol the server selected;
     * this will be one of the strings specified in the protocols parameter when creating the
     * WebSocket object
     */
    get: function get() {
      return this._ws ? this._ws.protocol : '';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "readyState", {
    /**
     * The current state of the connection; this is one of the Ready state constants
     */
    get: function get() {
      if (this._ws) {
        return this._ws.readyState;
      }
      return this._options.startClosed ? ReconnectingWebSocket.CLOSED : ReconnectingWebSocket.CONNECTING;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ReconnectingWebSocket.prototype, "url", {
    /**
     * The URL as resolved by the constructor
     */
    get: function get() {
      return this._ws ? this._ws.url : '';
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Closes the WebSocket connection or connection attempt, if any. If the connection is already
   * CLOSED, this method does nothing
   */
  ReconnectingWebSocket.prototype.close = function (code, reason) {
    if (code === void 0) {
      code = 1000;
    }
    this._closeCalled = true;
    this._shouldReconnect = false;
    this._clearTimeouts();
    if (!this._ws) {
      this._debug('close enqueued: no ws instance');
      return;
    }
    if (this._ws.readyState === this.CLOSED) {
      this._debug('close: already closed');
      return;
    }
    this._ws.close(code, reason);
  };
  /**
   * Closes the WebSocket connection or connection attempt and connects again.
   * Resets retry counter;
   */
  ReconnectingWebSocket.prototype.reconnect = function (code, reason) {
    this._shouldReconnect = true;
    this._closeCalled = false;
    this._retryCount = -1;
    if (!this._ws || this._ws.readyState === this.CLOSED) {
      this._connect();
    } else {
      this._disconnect(code, reason);
      this._connect();
    }
  };
  /**
   * Enqueue specified data to be transmitted to the server over the WebSocket connection
   */
  ReconnectingWebSocket.prototype.send = function (data) {
    if (this._ws && this._ws.readyState === this.OPEN) {
      this._debug('send', data);
      this._ws.send(data);
    } else {
      var _a = this._options.maxEnqueuedMessages,
        maxEnqueuedMessages = _a === void 0 ? DEFAULT.maxEnqueuedMessages : _a;
      if (this._messageQueue.length < maxEnqueuedMessages) {
        this._debug('enqueue', data);
        this._messageQueue.push(data);
      }
    }
  };
  /**
   * Register an event handler of a specific event type
   */
  ReconnectingWebSocket.prototype.addEventListener = function (type, listener) {
    if (this._listeners[type]) {
      // @ts-ignore
      this._listeners[type].push(listener);
    }
  };
  ReconnectingWebSocket.prototype.dispatchEvent = function (event) {
    var e_1, _a;
    var listeners = this._listeners[event.type];
    if (listeners) {
      try {
        for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
          var listener = listeners_1_1.value;
          this._callEventListener(event, listener);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    return true;
  };
  /**
   * Removes an event listener
   */
  ReconnectingWebSocket.prototype.removeEventListener = function (type, listener) {
    if (this._listeners[type]) {
      // @ts-ignore
      this._listeners[type] = this._listeners[type].filter(function (l) {
        return l !== listener;
      });
    }
  };
  ReconnectingWebSocket.prototype._debug = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (this._options.debug) {
      // not using spread because compiled version uses Symbols
      // tslint:disable-next-line
      console.log.apply(console, __spread(['RWS>'], args));
    }
  };
  ReconnectingWebSocket.prototype._getNextDelay = function () {
    var _a = this._options,
      _b = _a.reconnectionDelayGrowFactor,
      reconnectionDelayGrowFactor = _b === void 0 ? DEFAULT.reconnectionDelayGrowFactor : _b,
      _c = _a.minReconnectionDelay,
      minReconnectionDelay = _c === void 0 ? DEFAULT.minReconnectionDelay : _c,
      _d = _a.maxReconnectionDelay,
      maxReconnectionDelay = _d === void 0 ? DEFAULT.maxReconnectionDelay : _d;
    var delay = 0;
    if (this._retryCount > 0) {
      delay = minReconnectionDelay * Math.pow(reconnectionDelayGrowFactor, this._retryCount - 1);
      if (delay > maxReconnectionDelay) {
        delay = maxReconnectionDelay;
      }
    }
    this._debug('next delay', delay);
    return delay;
  };
  ReconnectingWebSocket.prototype._wait = function () {
    var _this = this;
    return new Promise(function (resolve) {
      setTimeout(resolve, _this._getNextDelay());
    });
  };
  ReconnectingWebSocket.prototype._getNextUrl = function (urlProvider) {
    if (typeof urlProvider === 'string') {
      return Promise.resolve(urlProvider);
    }
    if (typeof urlProvider === 'function') {
      var url = urlProvider();
      if (typeof url === 'string') {
        return Promise.resolve(url);
      }
      if (!!url.then) {
        return url;
      }
    }
    throw Error('Invalid URL');
  };
  ReconnectingWebSocket.prototype._connect = function () {
    var _this = this;
    if (this._connectLock || !this._shouldReconnect) {
      return;
    }
    this._connectLock = true;
    var _a = this._options,
      _b = _a.maxRetries,
      maxRetries = _b === void 0 ? DEFAULT.maxRetries : _b,
      _c = _a.connectionTimeout,
      connectionTimeout = _c === void 0 ? DEFAULT.connectionTimeout : _c,
      _d = _a.WebSocket,
      WebSocket = _d === void 0 ? getGlobalWebSocket() : _d;
    if (this._retryCount >= maxRetries) {
      this._debug('max retries reached', this._retryCount, '>=', maxRetries);
      return;
    }
    this._retryCount++;
    this._debug('connect', this._retryCount);
    this._removeListeners();
    if (!isWebSocket(WebSocket)) {
      throw Error('No valid WebSocket class provided');
    }
    this._wait().then(function () {
      return _this._getNextUrl(_this._url);
    }).then(function (url) {
      // close could be called before creating the ws
      if (_this._closeCalled) {
        return;
      }
      _this._debug('connect', {
        url: url,
        protocols: _this._protocols
      });
      _this._ws = _this._protocols ? new WebSocket(url, _this._protocols) : new WebSocket(url);
      _this._ws.binaryType = _this._binaryType;
      _this._connectLock = false;
      _this._addListeners();
      _this._connectTimeout = setTimeout(function () {
        return _this._handleTimeout();
      }, connectionTimeout);
    });
  };
  ReconnectingWebSocket.prototype._handleTimeout = function () {
    this._debug('timeout event');
    this._handleError(new ErrorEvent(Error('TIMEOUT'), this));
  };
  ReconnectingWebSocket.prototype._disconnect = function (code, reason) {
    if (code === void 0) {
      code = 1000;
    }
    this._clearTimeouts();
    if (!this._ws) {
      return;
    }
    this._removeListeners();
    try {
      this._ws.close(code, reason);
      this._handleClose(new CloseEvent(code, reason, this));
    } catch (error) {
      // ignore
    }
  };
  ReconnectingWebSocket.prototype._acceptOpen = function () {
    this._debug('accept open');
    this._retryCount = 0;
  };
  ReconnectingWebSocket.prototype._callEventListener = function (event, listener) {
    if ('handleEvent' in listener) {
      // @ts-ignore
      listener.handleEvent(event);
    } else {
      // @ts-ignore
      listener(event);
    }
  };
  ReconnectingWebSocket.prototype._removeListeners = function () {
    if (!this._ws) {
      return;
    }
    this._debug('removeListeners');
    this._ws.removeEventListener('open', this._handleOpen);
    this._ws.removeEventListener('close', this._handleClose);
    this._ws.removeEventListener('message', this._handleMessage);
    // @ts-ignore
    this._ws.removeEventListener('error', this._handleError);
  };
  ReconnectingWebSocket.prototype._addListeners = function () {
    if (!this._ws) {
      return;
    }
    this._debug('addListeners');
    this._ws.addEventListener('open', this._handleOpen);
    this._ws.addEventListener('close', this._handleClose);
    this._ws.addEventListener('message', this._handleMessage);
    // @ts-ignore
    this._ws.addEventListener('error', this._handleError);
  };
  ReconnectingWebSocket.prototype._clearTimeouts = function () {
    clearTimeout(this._connectTimeout);
    clearTimeout(this._uptimeTimeout);
  };
  return ReconnectingWebSocket;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReconnectingWebSocket);

/***/ }),

/***/ "./node_modules/string-random/index.js":
/*!*********************************************!*\
  !*** ./node_modules/string-random/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-01-20
 * @author Liang <liang@maichong.it>
 */



var numbers = '0123456789';
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
function random(length, options) {
  length || (length = 8);
  options || (options = {});
  var chars = '';
  var result = '';
  if (options === true) {
    chars = numbers + letters + specials;
  } else if (typeof options == 'string') {
    chars = options;
  } else {
    if (options.numbers !== false) {
      chars += typeof options.numbers == 'string' ? options.numbers : numbers;
    }
    if (options.letters !== false) {
      chars += typeof options.letters == 'string' ? options.letters : letters;
    }
    if (options.specials) {
      chars += typeof options.specials == 'string' ? options.specials : specials;
    }
  }
  while (length > 0) {
    length--;
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
module.exports = random.default = random;

/***/ }),

/***/ "./src/client/sdk/common/constant.js":
/*!*******************************************!*\
  !*** ./src/client/sdk/common/constant.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEVTOOL_OVERLAY: () => (/* binding */ DEVTOOL_OVERLAY),
/* harmony export */   HTML_TO_CANVAS: () => (/* binding */ HTML_TO_CANVAS),
/* harmony export */   IGNORE_NODE: () => (/* binding */ IGNORE_NODE)
/* harmony export */ });
var DEVTOOL_OVERLAY = '__devtools-overlay__';
var HTML_TO_CANVAS = 'html2canvas-container';
var IGNORE_NODE = [DEVTOOL_OVERLAY, HTML_TO_CANVAS];

/***/ }),

/***/ "./src/client/sdk/common/nodes.js":
/*!****************************************!*\
  !*** ./src/client/sdk/common/nodes.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/client/sdk/common/constant.js");

var Nodes = /*#__PURE__*/function () {
  function Nodes() {
    // DOM node id collection
    this.nodeIds = new Map();
    // DOM node collection
    this.nodes = new Map();
    this.hasRequestedChildNode = new Set();
    this.currentId = 0;
  }
  var _proto = Nodes.prototype;
  /**
   * Is it a node
   * @public
   * @param {HTMLElement} node DOM
   */
  _proto.isNode = function isNode(node) {
    if (!node) return false;
    // Ignore DOM nodes for debugging
    if (node.getAttribute && _constant__WEBPACK_IMPORTED_MODULE_0__.IGNORE_NODE.includes(node.getAttribute('class'))) return false;
    // non-text node
    if (node.nodeType !== Node.TEXT_NODE) return true;
    // non-empty text node
    if (node.nodeType === Node.TEXT_NODE && (node.nodeValue || '').trim() !== '') return true;
    return false;
  };
  _proto.create = function create(nodeId, node) {
    this.nodeIds.set(node, nodeId);
    this.nodes.set(nodeId, node);
  };
  _proto.init = function init() {
    this.nodeIds.clear();
    this.nodes.clear();
    this.hasRequestedChildNode.clear();
  };
  _proto.hasNode = function hasNode(node) {
    return this.nodeIds.has(node);
  }

  /**
   * @public
   * @param {Number} nodeId Unique id of DOM
   */;
  _proto.getNodeById = function getNodeById(nodeId) {
    return this.nodes.get(nodeId);
  }

  /**
   * @public
   * @param {HTMLElement} node DOM
   */;
  _proto.getIdByNode = function getIdByNode(node) {
    var nodeId = this.nodeIds.get(node);
    if (nodeId) return nodeId;

    // eslint-disable-next-line
    nodeId = this.currentId++;
    this.create(nodeId, node);
    return nodeId;
  }

  /**
   * Collect child nodes
   * @public
   * @param {Element} node DOM node
   * @param {Number} depth child node depth
   */;
  _proto.collectNodes = function collectNodes(node, depth) {
    if (depth === void 0) {
      depth = 2;
    }
    var nodeId = this.getIdByNode(node);
    var nodeType = node.nodeType,
      nodeName = node.nodeName,
      localName = node.localName,
      nodeValue = node.nodeValue,
      parentNode = node.parentNode,
      attributes = node.attributes,
      childNodes = node.childNodes;
    var res = {
      nodeId: nodeId,
      nodeType: nodeType,
      nodeName: nodeName,
      localName: localName,
      nodeValue: nodeValue,
      backendNodeId: nodeId,
      childNodeCount: childNodes.length
    };
    if (attributes) {
      res.attributes = Array.from(attributes).reduce(function (pre, curr) {
        return pre.concat(curr.name, curr.value);
      }, []);
    }
    if (parentNode) {
      res.parentId = this.getIdByNode(parentNode);
    }
    if (depth > 0) {
      res.children = this.getChildNodes(node, depth);
    }
    return res;
  }

  /**
   * Collect DOM child elements
   * @public
   * @param {HTMLElement} node DOM
   * @param {Number} depth
   */;
  _proto.getChildNodes = function getChildNodes(node, depth) {
    var _this = this;
    if (depth === void 0) {
      depth = 1;
    }
    return Array.from(node.childNodes).filter(this.isNode).map(function (childNode) {
      return _this.collectNodes(childNode, depth - 1);
    });
  }

  /**
   * Get the former sibling node of DOM
   * @public
   * @param {HTMLElement} node DOM
   */;
  _proto.getPreviousNode = function getPreviousNode(node) {
    var previousNode = node.previousSibling;
    if (!previousNode) return;
    while (!this.isNode(previousNode) && previousNode.previousSibling) {
      previousNode = previousNode.previousSibling;
    }
    return previousNode;
  };
  return Nodes;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Nodes());

/***/ }),

/***/ "./src/client/sdk/common/remoteObject.js":
/*!***********************************************!*\
  !*** ./src/client/sdk/common/remoteObject.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getObjectById: () => (/* binding */ getObjectById),
/* harmony export */   getObjectProperties: () => (/* binding */ getObjectProperties),
/* harmony export */   objectFormat: () => (/* binding */ objectFormat),
/* harmony export */   objectRelease: () => (/* binding */ objectRelease)
/* harmony export */ });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var objectIds = new Map();
var objects = new Map();
var origins = new Map();
var currentId = 1;
var getIdByObject = function getIdByObject(object, origin) {
  var id = objectIds.get(object);
  if (id) return id;

  // eslint-disable-next-line
  id = "" + currentId++;
  objects.set(id, object);
  objectIds.set(object, id);
  origins.set(id, origin);
  return id;
};
var getRealType = function getRealType(val) {
  var reg = /\[object\s+(.*)\]/;
  var res = reg.exec(Object.prototype.toString.call(val));
  return res ? res[1] : '';
};
var getSubType = function getSubType(val) {
  // DOM node type
  try {
    if (val && [1, 8, 9].includes(val.nodeType)) return 'node';
  } catch (_unused) {}
  ;
  var realType = getRealType(val).toLowerCase();
  return ['array', 'null', 'regexp', 'date', 'map', 'set', 'weakmap', 'weakset', 'error', 'proxy', 'promise', 'arraybuffer', 'iterator', 'generator'].includes(realType) ? realType : '';
};
var getType = function getType(val) {
  return {
    type: typeof val,
    subtype: getSubType(val)
  };
};
var getPreview = function getPreview(val, others) {
  if (others === void 0) {
    others = {};
  }
  var _others = others,
    _others$length = _others.length,
    length = _others$length === void 0 ? 5 : _others$length,
    _others$origin = _others.origin,
    origin = _others$origin === void 0 ? val : _others$origin;
  // TODO: Map/Set data types pending
  // if (subtype === 'map' || subtype === 'set') {

  // }

  var keys = Object.keys(val);
  var properties = [];
  keys.slice(0, length).forEach(function (key) {
    var subVal;
    try {
      subVal = origin[key];
    } catch (e) {}
    var _getType = getType(subVal),
      type = _getType.type,
      subtype = _getType.subtype;
    if (type === 'object') {
      if (subtype === 'array') {
        subVal = "Array(" + subVal.length + ")";
      } else if (subtype === 'null') {
        subVal = 'null';
      } else if (['date', 'regexp'].includes(subtype)) {
        subVal = subVal.toString();
      } else if (subtype === 'node') {
        subVal = "#" + subVal.nodeName;
      } else {
        subVal = subVal.constructor.name;
      }
    } else {
      subVal = subVal === undefined ? 'undefined' : subVal.toString();
    }
    properties.push({
      name: key,
      type: type,
      subtype: subtype,
      value: subVal
    });
  });
  return {
    overflow: keys.length > length,
    properties: properties
  };
};
function objectFormat(val, others) {
  if (others === void 0) {
    others = {};
  }
  var _others2 = others,
    _others2$origin = _others2.origin,
    origin = _others2$origin === void 0 ? val : _others2$origin,
    _others2$preview = _others2.preview,
    preview = _others2$preview === void 0 ? false : _others2$preview;
  var _getType2 = getType(val),
    type = _getType2.type,
    subtype = _getType2.subtype;
  if (type === 'undefined') return {
    type: type
  };
  if (type === 'number') return {
    type: type,
    value: val,
    description: val.toString()
  };
  if (type === 'string' || type === 'boolean') return {
    type: type,
    value: val
  };
  if (type === 'symbol') {
    return {
      type: type,
      objectId: getIdByObject(val, origin),
      description: val.toString()
    };
  }
  if (subtype === 'null') return {
    type: type,
    subtype: subtype,
    value: val
  };
  var res = {
    type: type,
    subtype: subtype,
    objectId: getIdByObject(val, origin)
  };
  // Some different data types need to be processed separately
  // function
  if (type === 'function') {
    res.className = 'Function';
    res.description = val.toString();
    preview && (res.preview = _extends({
      type: type,
      subtype: subtype,
      description: val.toString()
    }, getPreview(val, {
      origin: origin
    })));
    // Array
  } else if (subtype === 'array') {
    res.className = 'Array';
    res.description = "Array(" + val.length + ")";
    preview && (res.preview = _extends({
      type: type,
      subtype: subtype,
      description: "Array(" + val.length + ")"
    }, getPreview(val, {
      length: 100,
      origin: origin
    })));
    // Error
  } else if (subtype === 'error') {
    res.className = 'Error';
    res.description = val.stack;
    preview && (res.preview = _extends({
      type: type,
      subtype: subtype,
      description: val.stack
    }, getPreview(val, {
      origin: origin
    })));
    // HTML Element
  } else if (subtype === 'node') {
    res.className = res.description = val.constructor.name;
    // Others
  } else {
    try {
      res.className = res.description = val.constructor.name;
    } catch (_unused2) {
      res.className = res.description = '';
    }
    preview && (res.preview = _extends({
      type: type,
      subtype: subtype,
      description: res.description
    }, getPreview(val, {
      origin: origin
    })));
  }
  return res;
}

// Get object properties, the level can be infinitely deep
function getObjectProperties(params) {
  // ownProperties identifies whether it is a property of the object itself
  var accessorPropertiesOnly = params.accessorPropertiesOnly,
    generatePreview = params.generatePreview,
    objectId = params.objectId,
    ownProperties = params.ownProperties;
  var curObject = objects.get(objectId);
  var origin = origins.get(objectId);
  var result = [];
  // eslint-disable-next-line no-proto
  var proto = curObject.__proto__;

  // If the current object has a __proto__ prototype and needs to obtain non-self attributes (that is, attributes under __proto__)
  // otherwise the current object
  var nextObject = proto && !ownProperties ? proto : curObject;
  var keys = Object.getOwnPropertyNames(nextObject);
  for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
    var key = _step.value;
    // Skip key is an attribute of __proto__
    if (key === '__proto__') continue;
    var property = {
      name: key
    };
    var propVal = void 0;
    try {
      propVal = origin[key];
    } catch (e) {
      // nothing to do
    }
    var descriptor = Object.getOwnPropertyDescriptor(nextObject, key);
    if (accessorPropertiesOnly && !descriptor.get && !descriptor.set) continue;
    property.configurable = descriptor.configurable;
    property.enumerable = descriptor.enumerable;
    property.writable = descriptor.writable;
    // eslint-disable-next-line no-prototype-builtins
    property.isOwn = ownProperties ? true : proto.hasOwnProperty(key);
    property.value = objectFormat(propVal, {
      preview: generatePreview
    });
    result.push(property);
  }

  // Append __proto__ prototype
  if (proto) {
    result.push({
      name: '__proto__',
      configurable: true,
      enumerable: false,
      isOwn: ownProperties,
      value: objectFormat(proto, {
        origin: origin
      })
    });
  }
  return result;
}

// release object
function objectRelease(_ref) {
  var objectId = _ref.objectId;
  var object = objects.get(objectId);
  objects.delete(objectId, object);
  objectIds.delete(object, objectId);
  origins.delete(objectId, origin);
}
function getObjectById(objectId) {
  return objects.get(objectId);
}

/***/ }),

/***/ "./src/client/sdk/common/utils.js":
/*!****************************************!*\
  !*** ./src/client/sdk/common/utils.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAbsolutePath: () => (/* binding */ getAbsolutePath),
/* harmony export */   isMatches: () => (/* binding */ isMatches),
/* harmony export */   isMobile: () => (/* binding */ isMobile),
/* harmony export */   key2UpperCase: () => (/* binding */ key2UpperCase),
/* harmony export */   loadScript: () => (/* binding */ loadScript)
/* harmony export */ });
/**
 * get absolute path
 * @param {String} url
 */
function getAbsolutePath(url) {
  if (!url || typeof url !== 'string') return '';
  var a = document.createElement('a');
  a.href = url;
  return a.href;
}
function key2UpperCase(key) {
  return key.replace(/^\S|-[a-z]/g, function (s) {
    return s.toUpperCase();
  });
}
function isMatches(element, selector) {
  // When some selectors in the safair kernel cannot be parsed, calling the matches method will throw an exception, which is captured here
  try {
    if (element.matches) {
      return element.matches(selector);
    }
    // deprecated
    if (element.webkitMatchesSelector) {
      return element.webkitMatchesSelector(selector);
    }
    if (element.mozMatchesSelector) {
      return element.mozMatchesSelector(selector);
    }
  } catch (_unused) {
    return false;
  }
}
function isMobile() {
  return /ios|iphone|ipod|android/.test(navigator.userAgent.toLowerCase());
}
function loadScript(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

/***/ }),

/***/ "./src/client/sdk/domain/css.js":
/*!**************************************!*\
  !*** ./src/client/sdk/domain/css.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CSS)
/* harmony export */ });
/* harmony import */ var _common_nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nodes */ "./src/client/sdk/common/nodes.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "./src/client/sdk/common/utils.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var CSS = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(CSS, _BaseDomain);
  function CSS() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'CSS';
    // css style collection
    _this.styles = new Map();
    // The unique id of the css style sheet
    _this.styleSheetId = 0;
    return _this;
  }
  /**
   * Formatting css rules
   * @static
   * @param {string} rule css selector rules
   * @param {Node} node DOM node
   */
  CSS.formatCssRule = function formatCssRule(rule, node) {
    var index = 0;
    var selectors = rule.selectorText.split(',').map(function (item, i) {
      var text = item.trim();
      if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isMatches)(node, text)) {
        index = i;
      }
      return {
        text: text
      };
    });
    var cssText = /\{(.*)\}/.exec(rule.cssText)[1];
    return {
      index: index,
      cssRule: {
        style: {
          cssText: cssText,
          cssProperties: CSS.formatCssProperties(cssText),
          shorthandEntries: []
        },
        selectorList: {
          selectors: selectors,
          text: rule.selectorText
        }
      }
    };
  }

  /**
   * Formatting css properties
   * @static
   * @param {String} cssText css text，eg：height:100px;width:100px !important;
   */;
  CSS.formatCssProperties = function formatCssProperties(cssText) {
    if (cssText === void 0) {
      cssText = '';
    }
    return cssText.split(';').filter(function (val) {
      return val.trim();
    }).map(function (style) {
      var _style$split = style.split(':'),
        name = _style$split[0],
        value = _style$split[1];
      return {
        name: name.trim(),
        value: value.trim(),
        text: style,
        important: value.includes('important'),
        disabled: false,
        shorthandEntries: []
      };
    });
  }

  /**
   * Enable CSS Domains
   * @public
   */;
  var _proto = CSS.prototype;
  _proto.enable = function enable() {
    var _this2 = this;
    var styleSheets = Array.from(document.styleSheets);
    styleSheets.forEach(function (style) {
      if (!style.styleSheetId) {
        var styleSheetId = _this2.getStyleSheetId();
        style.styleSheetId = styleSheetId;
        var sourceURL = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getAbsolutePath)(style.href);
        if (sourceURL) {
          _this2.fetchStyleSource(styleSheetId, sourceURL);
        }
        _this2.send({
          method: _protocol__WEBPACK_IMPORTED_MODULE_3__.Event.styleSheetAdded,
          params: {
            header: {
              styleSheetId: styleSheetId,
              sourceURL: sourceURL
            }
          }
        });
      }
    });
  }

  /**
   * Get the matching style of the DOM node
   * @public
   * @param {Object} param
   * @param {Number} param.nodeId DOM node id
   */;
  _proto.getMatchedStylesForNode = function getMatchedStylesForNode(_ref) {
    var nodeId = _ref.nodeId;
    var matchedCSSRules = [];
    var node = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    var styleSheets = Array.from(document.styleSheets);
    styleSheets.forEach(function (style) {
      try {
        // Chrome does not allow access to css rules under different domain names, here are the errors captured
        // https://stackoverflow.com/questions/49993633/uncaught-domexception-failed-to-read-the-cssrules-property
        Array.from(style.cssRules).forEach(function (rule) {
          if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isMatches)(node, rule.selectorText)) {
            var _CSS$formatCssRule = CSS.formatCssRule(rule, node),
              index = _CSS$formatCssRule.index,
              cssRule = _CSS$formatCssRule.cssRule;
            matchedCSSRules.push({
              matchingSelectors: [index],
              rule: cssRule
            });
          }
        });
      } catch (_unused) {
        // nothing to do.
      }
    });
    var _ref2 = node.style || {},
      cssText = _ref2.cssText;
    return {
      matchedCSSRules: matchedCSSRules,
      inlineStyle: {
        cssText: cssText,
        cssProperties: CSS.formatCssProperties(cssText),
        shorthandEntries: []
      }
    };
  }

  /**
   * Get the computed style of a DOM node
   * @public
   * @param {Object} param
   * @param {Number} param.nodeId DOM node id
   */;
  _proto.getComputedStyleForNode = function getComputedStyleForNode(_ref3) {
    var nodeId = _ref3.nodeId;
    var node = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    if (!(node instanceof Element)) return;
    var computedStyle = window.getComputedStyle(node);
    computedStyle = Array.from(computedStyle).map(function (style) {
      return {
        name: style,
        value: computedStyle[style]
      };
    });
    return {
      computedStyle: computedStyle
    };
  }

  /**
   * get style content
   * @public
   * @param {Object} param
   * @param {Number} param.styleSheetId style id
   */;
  _proto.getStyleSheetText = function getStyleSheetText(_ref4) {
    var styleSheetId = _ref4.styleSheetId;
    return {
      text: this.styles.get(styleSheetId)
    };
  }

  /**
   * fetch the source content of the dynamic css file
   * @public
   * @param {string} url style file url address
   */;
  _proto.getDynamicLink = function getDynamicLink(url) {
    var styleSheetId = this.getStyleSheetId();
    this.fetchStyleSource(styleSheetId, (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getAbsolutePath)(url));
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_3__.Event.styleSheetAdded,
      params: {
        header: {
          styleSheetId: styleSheetId,
          sourceURL: url
        }
      }
    });
  }

  /**
   * fetch the source content of the css file
   * @private
   * @param {number} styleSheetId style file id
   * @param {string} url style file url address
   */;
  _proto.fetchStyleSource = function fetchStyleSource(styleSheetId, url) {
    var _this3 = this;
    var xhr = new XMLHttpRequest();
    xhr.$$requestType = 'Stylesheet';
    xhr.onload = function () {
      _this3.styles.set(styleSheetId, xhr.responseText);
    };
    xhr.onerror = function () {
      _this3.styles.set(styleSheetId, 'Cannot get style source code');
    };
    xhr.open('GET', url);
    xhr.send();
  }

  /**
   * Get the unique id of the style
   * @private
   */;
  _proto.getStyleSheetId = function getStyleSheetId() {
    this.styleSheetId += 1;
    return "" + this.styleSheetId;
  };
  return CSS;
}(_domain__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./src/client/sdk/domain/debugger.js":
/*!*******************************************!*\
  !*** ./src/client/sdk/domain/debugger.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Debugger)
/* harmony export */ });
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "./src/client/sdk/common/utils.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Debugger = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Debugger, _BaseDomain);
  function Debugger() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'Debugger';
    // collection of javascript scripts
    _this.scripts = new Map();
    // Unique id for javascript scripts
    _this.scriptId = 0;
    return _this;
  }
  var _proto = Debugger.prototype;
  /**
   * @public
   */
  _proto.enable = function enable() {
    var _this2 = this;
    var scripts = this.collectScripts();
    scripts.forEach(function (_ref) {
      var scriptId = _ref.scriptId,
        url = _ref.url;
      _this2.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_2__.Event.scriptParsed,
        params: {
          scriptId: scriptId,
          startColumn: 0,
          startLine: 0,
          endColumn: 999999,
          endLine: 999999,
          scriptLanguage: 'JavaScript',
          url: url
        }
      });
    });
  }

  /**
   * Get the content of the js script file
   * @public
   * @param {Object} param
   * @param {Number} param.scriptId
   */;
  _proto.getScriptSource = function getScriptSource(_ref2) {
    var scriptId = _ref2.scriptId;
    return {
      scriptSource: this.getScriptSourceById(scriptId)
    };
  }

  /**
   * fetch the source content of the dynamic script file
   * @public
   * @param {string} url script file url address
   */;
  _proto.getDynamicScript = function getDynamicScript(url) {
    var scriptId = this.getScriptId();
    this.fetchScriptSource(scriptId, (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getAbsolutePath)(url));
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_2__.Event.scriptParsed,
      params: {
        url: url,
        scriptId: scriptId,
        startColumn: 0,
        startLine: 0,
        endColumn: 999999,
        endLine: 999999,
        scriptLanguage: 'JavaScript'
      }
    });
  }

  /**
   * Collect all scripts of the page
   * @private
   */;
  _proto.collectScripts = function collectScripts() {
    var _this3 = this;
    var scriptElements = document.querySelectorAll('script');
    var ret = [];
    scriptElements.forEach(function (script) {
      var scriptId = _this3.getScriptId();
      var src = script.getAttribute('src');
      if (src) {
        var url = (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getAbsolutePath)(src);
        ret.push({
          scriptId: scriptId,
          url: url
        });
        _this3.fetchScriptSource(scriptId, url);
      }
    });
    return ret;
  }

  /**
   * Fetch javascript file source content
   * @private
   * @param {Number} scriptId javascript script unique id
   * @param {String} url javascript file url
   */;
  _proto.fetchScriptSource = function fetchScriptSource(scriptId, url) {
    var _this4 = this;
    var xhr = new XMLHttpRequest();
    xhr.$$requestType = 'Script';
    xhr.onload = function () {
      _this4.scripts.set(scriptId, xhr.responseText);
    };
    xhr.onerror = function () {
      _this4.scripts.set(scriptId, 'Cannot get script source code');
    };
    xhr.open('GET', url);
    xhr.send();
  }

  /**
   * Get javascript content
   * @private
   * @param {Object} param
   * @param {Number} param.scriptId javascript script unique id
   */;
  _proto.getScriptSourceById = function getScriptSourceById(scriptId) {
    return this.scripts.get(scriptId);
  }

  /**
   * Get unique id of javascript script
   * @private
   */;
  _proto.getScriptId = function getScriptId() {
    this.scriptId += 1;
    return "" + this.scriptId;
  };
  return Debugger;
}(_domain__WEBPACK_IMPORTED_MODULE_0__["default"]);

;

/***/ }),

/***/ "./src/client/sdk/domain/dom-storage.js":
/*!**********************************************!*\
  !*** ./src/client/sdk/domain/dom-storage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DomStorage)
/* harmony export */ });
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var DomStorage = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(DomStorage, _BaseDomain);
  function DomStorage() {
    var _this2;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this2.namespace = 'DOMStorage';
    return _this2;
  }
  /**
   * @static
   * @param {Boolean} isLocalStorage
   */
  DomStorage.getStorage = function getStorage(_ref) {
    var isLocalStorage = _ref.isLocalStorage;
    return isLocalStorage ? localStorage : sessionStorage;
  }

  /**
   * @public
   */;
  var _proto = DomStorage.prototype;
  _proto.enable = function enable() {
    this.hookStorage(localStorage);
    this.hookStorage(sessionStorage);
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} param.storageId
   */;
  _proto.getDOMStorageItems = function getDOMStorageItems(_ref2) {
    var storageId = _ref2.storageId;
    var storage = DomStorage.getStorage(storageId);
    return {
      entries: Object.entries(storage)
    };
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} param.key
   * @param {String} param.storageId
   */;
  _proto.removeDOMStorageItem = function removeDOMStorageItem(_ref3) {
    var key = _ref3.key,
      storageId = _ref3.storageId;
    var storage = DomStorage.getStorage(storageId);
    storage.removeItem(key);
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_1__.Event.domStorageItemRemoved,
      params: {
        key: key,
        storageId: storageId
      }
    });
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} param.storageId
   */;
  _proto.clear = function clear(_ref4) {
    var storageId = _ref4.storageId;
    var storage = DomStorage.getStorage(storageId);
    storage.clear();
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_1__.Event.domStorageItemsCleared,
      params: {
        storageId: storageId
      }
    });
  };
  _proto.setDOMStorageItem = function setDOMStorageItem(_ref5) {
    var storageId = _ref5.storageId,
      key = _ref5.key,
      value = _ref5.value;
    var storage = DomStorage.getStorage(storageId);
    storage.setItem(key, value);
  };
  _proto.hookStorage = function hookStorage(storage) {
    var _this = this;
    var storageId = {
      isLocalStorage: storage === localStorage,
      securityOrigin: location.origin,
      storageKey: location.origin
    };
    var _Storage$prototype = Storage.prototype,
      nativeSetItem = _Storage$prototype.setItem,
      nativeRemoveItem = _Storage$prototype.removeItem,
      nativeClear = _Storage$prototype.clear;
    Storage.prototype.setItem = function (key, newValue) {
      var isKeyExisted = Object.keys(storage).includes(key);
      var oldValue = this.getItem(key);
      nativeSetItem.call(this, key, newValue);
      _this.send({
        method: isKeyExisted ? _protocol__WEBPACK_IMPORTED_MODULE_1__.Event.domStorageItemUpdated : _protocol__WEBPACK_IMPORTED_MODULE_1__.Event.domStorageItemAdded,
        params: {
          storageId: storageId,
          key: key,
          newValue: newValue,
          oldValue: oldValue
        }
      });
    };
    Storage.prototype.removeItem = function (key) {
      nativeRemoveItem.call(this, key);
      _this.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_1__.Event.domStorageItemRemoved,
        params: {
          storageId: storageId,
          key: key
        }
      });
    };
    Storage.prototype.clear = function () {
      nativeClear.call(this);
      _this.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_1__.Event.domStorageItemsCleared,
        params: {
          storageId: storageId
        }
      });
    };
  };
  return DomStorage;
}(_domain__WEBPACK_IMPORTED_MODULE_0__["default"]);

;

/***/ }),

/***/ "./src/client/sdk/domain/dom.js":
/*!**************************************!*\
  !*** ./src/client/sdk/domain/dom.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dom)
/* harmony export */ });
/* harmony import */ var _common_nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nodes */ "./src/client/sdk/common/nodes.js");
/* harmony import */ var _common_remoteObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/remoteObject */ "./src/client/sdk/common/remoteObject.js");
/* harmony import */ var _common_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/constant */ "./src/client/sdk/common/constant.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
/* harmony import */ var _overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./overlay */ "./src/client/sdk/domain/overlay.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Dom = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Dom, _BaseDomain);
  function Dom() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'DOM';
    _this.searchId = 0;
    _this.searchRet = new Map();
    _this.currentSearchKey = '';
    return _this;
  }
  /**
   * set $ and $$ methods
   * @static
   */
  Dom.set$Function = function set$Function() {
    if (typeof window.$ !== 'function') {
      window.$ = function (selector) {
        return document.querySelector(selector);
      };
    }
    if (typeof window.$$ !== 'function') {
      window.$$ = function (selector) {
        return document.querySelectorAll(selector);
      };
    }
  }

  /**
   * Enable Dom domain
   * @public
   */;
  var _proto = Dom.prototype;
  _proto.enable = function enable() {
    _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].init();
    this.nodeObserver();
    this.setDomInspect();
    Dom.set$Function();
  }

  /**
   * Get root's documentation
   * @public
   */;
  _proto.getDocument = function getDocument() {
    return {
      root: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].collectNodes(document)
    };
  }

  /**
   * @public
   * @param {Object} param
   * @param {Number} nodeId DOM Node Id
   */;
  _proto.requestChildNodes = function requestChildNodes(_ref) {
    var nodeId = _ref.nodeId;
    if (_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].hasRequestedChildNode.has(nodeId)) {
      return;
    }
    _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].hasRequestedChildNode.add(nodeId);
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.setChildNodes,
      params: {
        parentId: nodeId,
        nodes: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getChildNodes(_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId), 2)
      }
    });
  }

  /**
   * @public
   * @param {Object} param
   * @param {Number} nodeId DOM Node Id
   */;
  _proto.getOuterHTML = function getOuterHTML(_ref2) {
    var nodeId = _ref2.nodeId;
    return {
      outerHTML: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId).outerHTML
    };
  }

  /**
   * @public
   * @param {Object} param
   * @param {Number} nodeId DOM Node Id
   * @param {String} outerHTML
   */;
  _proto.setOuterHTML = function setOuterHTML(_ref3) {
    var nodeId = _ref3.nodeId,
      outerHTML = _ref3.outerHTML;
    _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId).outerHTML = outerHTML;
  }

  /**
   * Set the text property of the node
   * @public
   * @param {Object} param
   * @param {Number} nodeId DOM Node Id
   * @param {String} text attribute text，eg: class="test" style="color:red;" data-index="1"
   */;
  _proto.setAttributesAsText = function setAttributesAsText(_ref4) {
    var nodeId = _ref4.nodeId,
      text = _ref4.text;
    var node = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    if (text) {
      text.split(' ').filter(function (item) {
        return item;
      }).forEach(function (item) {
        var _item$split = item.split('='),
          name = _item$split[0],
          value = _item$split[1];
        node.setAttribute(name, value.replace(/["']/g, ''));
      });
    } else {
      Array.from(node.attributes).forEach(function (attr) {
        return node.removeAttribute(attr.name);
      });
    }
  }

  /**
   * @public
   * @param {Object} param
   * @param {Number} objectId remoteObject id
   */;
  _proto.requestNode = function requestNode(_ref5) {
    var objectId = _ref5.objectId;
    var node = (0,_common_remoteObject__WEBPACK_IMPORTED_MODULE_1__.getObjectById)(objectId);
    var nodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node);
    return {
      nodeId: nodeId
    };
  }

  /**
   * Set the currently selected node
   * @public
   * @param {Object} param
   * @param {Number} nodeId DOM Node Id
   */;
  _proto.setInspectedNode = function setInspectedNode(_ref6) {
    var nodeId = _ref6.nodeId;
    window.$0 = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
  }

  /**
   * @public
   * @param {Object} param
   * @param {Number} nodeId DOM Node Id
   */;
  _proto.removeNode = function removeNode(_ref7) {
    var _node$parentNode;
    var nodeId = _ref7.nodeId;
    var node = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    node === null || node === void 0 ? void 0 : (_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.removeChild(node);
  }

  /**
   * @public
   */;
  _proto.pushNodesByBackendIdsToFrontend = function pushNodesByBackendIdsToFrontend(_ref8) {
    var backendNodeIds = _ref8.backendNodeIds;
    return {
      nodeIds: backendNodeIds
    };
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} query search keyword
   */;
  _proto.performSearch = function performSearch(_ref9) {
    var query = _ref9.query;
    var ret = this.searchRet.get(this.searchId);
    if (this.currentSearchKey !== query) {
      this.currentSearchKey = query;
      var allNodes = document.querySelectorAll('*');
      ret = Array.from(allNodes).filter(function (node) {
        if (!_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].isNode(node)) return false;

        // element node
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase().includes(query)) {
          return true;
        }

        // match attributes
        for (var i = 0; i < node.attributes.length; i++) {
          var curr = node.attributes[i];
          if (curr.name.includes(query) || curr.value.includes(query)) {
            return true;
          }
        }
        return false;
      });
      this.searchRet.delete(this.searchId);
      this.searchRet.set(++this.searchId, ret);
    }
    return {
      searchId: this.searchId,
      resultCount: ret.length
    };
  }

  /**
  * @public
  */;
  _proto.getSearchResults = function getSearchResults(_ref10) {
    var _this2 = this;
    var fromIndex = _ref10.fromIndex,
      toIndex = _ref10.toIndex,
      searchId = _ref10.searchId;
    var ret = this.searchRet.get(searchId).slice(fromIndex, toIndex);
    var nodeIds = [];
    ret.forEach(function (node) {
      _this2.expandNode(node);
      nodeIds.push(_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node));
    });
    return {
      nodeIds: nodeIds
    };
  }

  /**
   * @public
   */;
  _proto.discardSearchResults = function discardSearchResults(_ref11) {
    var searchId = _ref11.searchId;
    this.searchRet.delete(searchId);
  }

  /**
   * @public
   */;
  _proto.getNodeForLocation = function getNodeForLocation(_ref12) {
    var x = _ref12.x,
      y = _ref12.y;
    var hoverNode = document.elementFromPoint(x, y);
    if (hoverNode) {
      this.expandNode(hoverNode);
      var nodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(hoverNode);
      return {
        frameId: 1,
        backendNodeId: nodeId,
        nodeId: nodeId
      };
    }
  }

  /**
   * @public
   */;
  _proto.setNodeValue = function setNodeValue(_ref13) {
    var nodeId = _ref13.nodeId,
      value = _ref13.value;
    var node = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    node.nodeValue = value;
  }

  /**
   * @public
   */;
  _proto.getBoxModel = function getBoxModel(_ref14) {
    var nodeId = _ref14.nodeId;
    var node = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    var styles = window.getComputedStyle(node);
    var margin = _overlay__WEBPACK_IMPORTED_MODULE_5__["default"].getStylePropertyValue(['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], styles);
    var padding = _overlay__WEBPACK_IMPORTED_MODULE_5__["default"].getStylePropertyValue(['padding-top', 'padding-right', 'padding-bottom', 'padding-left'], styles);
    var border = _overlay__WEBPACK_IMPORTED_MODULE_5__["default"].getStylePropertyValue(['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'], styles);
    var _node$getBoundingClie = node.getBoundingClientRect(),
      left = _node$getBoundingClie.left,
      right = _node$getBoundingClie.right,
      top = _node$getBoundingClie.top,
      bottom = _node$getBoundingClie.bottom,
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height;
    return {
      model: {
        width: width,
        height: height,
        content: [left + border[3] + padding[3], top + border[0] + padding[0], right - border[1] - padding[1], top + border[0] + padding[0], right - border[1] - padding[1], bottom - border[2] - padding[2], left + border[3] + padding[3], bottom - border[2] - padding[2]],
        padding: [left + border[3], top + border[0], right - border[1], top + border[0], right - border[1], bottom - border[2], left + border[3], bottom - border[2]],
        border: [left, top, right, top, right, bottom, left, bottom],
        margin: [left - margin[3], top - margin[0], right + margin[1], top - margin[0], right + margin[1], bottom + margin[2], left - margin[3], bottom + margin[2]]
      }
    };
  }

  /**
   * @private
   */;
  _proto.expandNode = function expandNode(node) {
    var _this3 = this;
    var nodeIds = [];
    while (!_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].hasNode(node)) {
      var nodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node);
      nodeIds.unshift(nodeId);
      node = node.parentNode;
    }
    nodeIds.unshift(_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node));
    nodeIds.forEach(function (nodeId) {
      _this3.requestChildNodes({
        nodeId: nodeId
      });
    });
  }

  /**
   * @private
   */;
  _proto.setDomInspect = function setDomInspect() {
    var _this4 = this;
    document.addEventListener('click', function (e) {
      if (window.$$inspectMode !== 'searchForNode') return;
      e.stopPropagation();
      e.preventDefault();
      var previousNode = e.target.parentNode;
      var currentNodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(e.target);
      _this4.expandNode(previousNode);
      _this4.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.nodeHighlightRequested,
        params: {
          nodeId: currentNodeId
        }
      });
      _this4.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.inspectNodeRequested,
        params: {
          backendNodeId: currentNodeId
        }
      });
      document.getElementById(_common_constant__WEBPACK_IMPORTED_MODULE_2__.DEVTOOL_OVERLAY).style.display = 'none';
    }, true);
  }

  /**
   * @private
   */;
  _proto.nodeObserver = function nodeObserver() {
    var _this5 = this;
    var isDevtoolMutation = function isDevtoolMutation(_ref15) {
      var _target$getAttribute, _addedNodes$, _addedNodes$$getAttri, _removedNodes$, _removedNodes$$getAtt;
      var target = _ref15.target,
        addedNodes = _ref15.addedNodes,
        removedNodes = _ref15.removedNodes;
      if (_common_constant__WEBPACK_IMPORTED_MODULE_2__.IGNORE_NODE.includes((_target$getAttribute = target.getAttribute) === null || _target$getAttribute === void 0 ? void 0 : _target$getAttribute.call(target, 'class'))) return true;
      if (_common_constant__WEBPACK_IMPORTED_MODULE_2__.IGNORE_NODE.includes((_addedNodes$ = addedNodes[0]) === null || _addedNodes$ === void 0 ? void 0 : (_addedNodes$$getAttri = _addedNodes$.getAttribute) === null || _addedNodes$$getAttri === void 0 ? void 0 : _addedNodes$$getAttri.call(_addedNodes$, 'class'))) return true;
      if (_common_constant__WEBPACK_IMPORTED_MODULE_2__.IGNORE_NODE.includes((_removedNodes$ = removedNodes[0]) === null || _removedNodes$ === void 0 ? void 0 : (_removedNodes$$getAtt = _removedNodes$.getAttribute) === null || _removedNodes$$getAtt === void 0 ? void 0 : _removedNodes$$getAtt.call(_removedNodes$, 'class'))) return true;
      return false;
    };
    var observer = new MutationObserver(function (mutationList) {
      mutationList.forEach(function (mutation) {
        var attributeName = mutation.attributeName,
          target = mutation.target,
          type = mutation.type,
          addedNodes = mutation.addedNodes,
          removedNodes = mutation.removedNodes;

        // Ignore devtool dom changes
        if (isDevtoolMutation(mutation)) return;
        var parentNodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(target);
        var updateChildNodeCount = function updateChildNodeCount() {
          _this5.send({
            method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.childNodeCountUpdated,
            params: {
              nodeId: parentNodeId,
              childNodeCount: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getChildNodes(target).length
            }
          });
        };
        switch (type) {
          case 'childList':
            addedNodes.forEach(function (node) {
              updateChildNodeCount();
              _this5.send({
                method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.childNodeInserted,
                params: {
                  node: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].collectNodes(node, 0),
                  parentNodeId: parentNodeId,
                  previousNodeId: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getPreviousNode(node))
                }
              });
            });
            removedNodes.forEach(function (node) {
              updateChildNodeCount();
              var nodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node);
              _this5.send({
                method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.childNodeRemoved,
                params: {
                  nodeId: nodeId,
                  parentNodeId: parentNodeId
                }
              });
            });
            break;
          case 'attributes':
            // eslint-disable-next-line
            var value = target.getAttribute(attributeName);
            _this5.send({
              method: value ? _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.attributeModified : _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.attributeRemoved,
              params: {
                nodeId: parentNodeId,
                value: value || undefined,
                name: attributeName
              }
            });
            break;
          case 'characterData':
            _this5.send({
              method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.characterDataModified,
              params: {
                nodeId: parentNodeId,
                characterData: target.nodeValue
              }
            });
            break;
        }
      });
    });

    // Observe the changes of the document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
  };
  return Dom;
}(_domain__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./src/client/sdk/domain/domain.js":
/*!*****************************************!*\
  !*** ./src/client/sdk/domain/domain.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseDomain)
/* harmony export */ });
var BaseDomain = /*#__PURE__*/function () {
  function BaseDomain(options) {
    this.socket = options.socket;
  }
  var _proto = BaseDomain.prototype;
  _proto.enable = function enable() {};
  _proto.send = function send(data) {
    this.socket.send(JSON.stringify(data));
  };
  return BaseDomain;
}();


/***/ }),

/***/ "./src/client/sdk/domain/index.js":
/*!****************************************!*\
  !*** ./src/client/sdk/domain/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChromeDomain)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/client/sdk/domain/dom.js");
/* harmony import */ var _dom_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-storage */ "./src/client/sdk/domain/dom-storage.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/client/sdk/domain/storage.js");
/* harmony import */ var _overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay */ "./src/client/sdk/domain/overlay.js");
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime */ "./src/client/sdk/domain/runtime.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page */ "./src/client/sdk/domain/page.js");
/* harmony import */ var _network__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network */ "./src/client/sdk/domain/network.js");
/* harmony import */ var _css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./css */ "./src/client/sdk/domain/css.js");
/* harmony import */ var _debugger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./debugger */ "./src/client/sdk/domain/debugger.js");
/* harmony import */ var _screen_preview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./screen-preview */ "./src/client/sdk/domain/screen-preview.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");











var ChromeDomain = /*#__PURE__*/function () {
  function ChromeDomain(options) {
    this.protocol = {};
    this.registerProtocol(options);
    this.proxyAppendChild();
  }

  /**
   * Execution CDP method
   * @public
   * @param {Object} message socket data
   */
  var _proto = ChromeDomain.prototype;
  _proto.execute = function execute(message) {
    if (message === void 0) {
      message = {};
    }
    var _message = message,
      id = _message.id,
      method = _message.method,
      params = _message.params;
    var methodCall = this.protocol[method];
    if (typeof methodCall !== 'function') return {
      id: id
    };
    return {
      id: id,
      result: methodCall(params)
    };
  }

  /**
   * @private
   */;
  _proto.registerProtocol = function registerProtocol(options) {
    var _this = this;
    var domains = [new _dom__WEBPACK_IMPORTED_MODULE_0__["default"](options), new _dom_storage__WEBPACK_IMPORTED_MODULE_1__["default"](options), new _storage__WEBPACK_IMPORTED_MODULE_2__["default"](options), new _overlay__WEBPACK_IMPORTED_MODULE_3__["default"](options), new _runtime__WEBPACK_IMPORTED_MODULE_4__["default"](options), new _page__WEBPACK_IMPORTED_MODULE_5__["default"](options), new _network__WEBPACK_IMPORTED_MODULE_6__["default"](options), new _css__WEBPACK_IMPORTED_MODULE_7__["default"](options), new _debugger__WEBPACK_IMPORTED_MODULE_8__["default"](options), new _screen_preview__WEBPACK_IMPORTED_MODULE_9__["default"](options)];
    domains.forEach(function (domain) {
      var namespace = domain.namespace;
      var cmds = _protocol__WEBPACK_IMPORTED_MODULE_10__["default"][namespace];
      cmds.forEach(function (cmd) {
        _this.protocol[namespace + "." + cmd] = domain[cmd].bind(domain);
      });
    });
  };
  _proto.proxyAppendChild = function proxyAppendChild() {
    var _this2 = this;
    var originHeadAppendChild = HTMLHeadElement.prototype.appendChild;
    var originBodyAppendChild = HTMLBodyElement.prototype.appendChild;
    var fetchSource = function fetchSource(node) {
      var _node$tagName;
      var tag = node === null || node === void 0 ? void 0 : (_node$tagName = node.tagName) === null || _node$tagName === void 0 ? void 0 : _node$tagName.toLowerCase();
      if (tag === 'link') {
        var url = node.getAttribute('href');
        var rel = node.getAttribute('rel');
        if (url && (!rel || rel === 'stylesheet')) {
          _this2.protocol['CSS.getDynamicLink'](url);
        }
      }
      if (tag === 'script') {
        var _url = node.getAttribute('src');
        if (_url) {
          _this2.protocol['Debugger.getDynamicScript'](_url);
        }
      }
    };
    HTMLHeadElement.prototype.appendChild = function (node) {
      var result = originHeadAppendChild.call(this, node);
      fetchSource(node);
      return result;
    };
    HTMLBodyElement.prototype.appendChild = function (node) {
      var result = originBodyAppendChild.call(this, node);
      fetchSource(node);
      return result;
    };
  };
  return ChromeDomain;
}();

;

/***/ }),

/***/ "./src/client/sdk/domain/network.js":
/*!******************************************!*\
  !*** ./src/client/sdk/domain/network.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Network)
/* harmony export */ });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/* harmony import */ var mime_lite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mime/lite */ "./node_modules/mime/dist/src/index_lite.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils */ "./src/client/sdk/common/utils.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var getTimestamp = function getTimestamp() {
  return Date.now() / 1000;
};
var originFetch = window.fetch;
var Network = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Network, _BaseDomain);
  function Network(options) {
    var _this;
    _this = _BaseDomain.call(this, options) || this;
    _this.namespace = 'Network';
    // the unique id of the request
    _this.requestId = 0;
    _this.responseData = new Map();
    _this.cacheRequest = [];
    _this.isEnable = false;
    _this.socketSend = function (data) {
      _this.cacheRequest.push(data);
      if (_this.isEnable) {
        _this.send(data);
      }
    };
    _this.hookXhr();
    _this.hookFetch();
    return _this;
  }

  /**
   * Format http response header
   * @static
   * @param {String} header http response header eg：content-type: application/json; charset=UTF-8\n date: Wed, 15 Sep 2021 07:20:26 GMT
   */
  Network.formatResponseHeader = function formatResponseHeader(header) {
    var headers = {};
    header.split('\n').filter(function (val) {
      return val;
    }).forEach(function (item) {
      var _item$split = item.split(':'),
        key = _item$split[0],
        val = _item$split[1];
      headers[(0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.key2UpperCase)(key)] = val;
    });
    return headers;
  }

  /**
   * Get the default http request header, currently only ua, cookie
   * @static
   */;
  Network.getDefaultHeaders = function getDefaultHeaders() {
    var headers = {
      'User-Agent': navigator.userAgent
    };
    if (document.cookie) {
      headers.Cookie = document.cookie;
    }
    return headers;
  }

  /**
   * @public
   */;
  var _proto = Network.prototype;
  _proto.enable = function enable() {
    var _this2 = this;
    this.isEnable = true;
    this.cacheRequest.forEach(function (data) {
      return _this2.send(data);
    });
    this.reportImageNetwork();
  }

  /**
   * Get network response content
   * @public
   * @param {Object} param
   * @param {Number} param.requestId
   */;
  _proto.getResponseBody = function getResponseBody(_ref) {
    var requestId = _ref.requestId;
    var body = '';
    var base64Encoded = false;
    var response = this.responseData.get(requestId);
    if (typeof response === 'string') {
      body = response;
    } else {
      body = response === null || response === void 0 ? void 0 : response.data;
      base64Encoded = true;
    }
    return {
      body: body,
      base64Encoded: base64Encoded
    };
  }

  /**
   * @public
   */;
  _proto.getCookies = function getCookies() {
    var cookies = js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].get();
    return {
      cookies: Object.keys(cookies).map(function (name) {
        return {
          name: name,
          value: cookies[name]
        };
      })
    };
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} param.name cookie name
   */;
  _proto.deleteCookies = function deleteCookies(_ref2) {
    var name = _ref2.name;
    js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].remove(name, {
      path: '/'
    });
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} param.name cookie name
   * @param {String} param.value cookie value
   * @param {String} param.path path
   */;
  _proto.setCookie = function setCookie(_ref3) {
    var name = _ref3.name,
      value = _ref3.value,
      path = _ref3.path;
    js_cookie__WEBPACK_IMPORTED_MODULE_0__["default"].set(name, value, {
      path: path
    });
  }

  /**
   * Get the unique id of the request
   * @private
   */;
  _proto.getRequestId = function getRequestId() {
    this.requestId += 1;
    return this.requestId;
  }

  /**
   * Intercept XMLHttpRequest request
   * @private
   */;
  _proto.hookXhr = function hookXhr() {
    var instance = this;
    var xhrSend = XMLHttpRequest.prototype.send;
    var xhrOpen = XMLHttpRequest.prototype.open;
    var xhrSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.open = function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      var method = params[0],
        url = params[1];
      this.$$request = {
        method: method,
        url: (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.getAbsolutePath)(url),
        requestId: instance.getRequestId(),
        headers: Network.getDefaultHeaders()
      };
      xhrOpen.apply(this, params);
    };
    XMLHttpRequest.prototype.send = function (data) {
      var _this3 = this;
      xhrSend.call(this, data);
      var request = this.$$request;
      var requestId = request.requestId,
        url = request.url,
        method = request.method;
      if (method.toLowerCase() === 'post') {
        request.postData = data;
        request.hasPostData = !!data;
      }
      instance.socketSend({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.requestWillBeSent,
        params: {
          requestId: requestId,
          request: request,
          documentURL: location.href,
          timestamp: getTimestamp(),
          wallTime: Date.now(),
          type: this.$$requestType || 'XHR'
        }
      });
      this.addEventListener('readystatechange', function () {
        // After the request is completed, get the http response header
        if (_this3.readyState === 4) {
          var headers = _this3.getAllResponseHeaders();
          var responseHeaders = Network.formatResponseHeader(headers);
          instance.sendNetworkEvent({
            requestId: requestId,
            url: (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.getAbsolutePath)(url),
            headers: responseHeaders,
            blockedCookies: [],
            headersText: headers,
            type: _this3.$$requestType || 'XHR',
            status: _this3.status,
            statusText: _this3.statusText,
            encodedDataLength: Number(_this3.getResponseHeader('Content-Length'))
          });
        }
      });
      this.addEventListener('load', function () {
        if (_this3.responseType === '' || _this3.responseType === 'text') {
          // Cache the response result after the request ends, which will be used when getResponseBody
          instance.responseData.set(_this3.$$request.requestId, _this3.responseText);
        }
      });
    };
    XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
      if (this.$$request) {
        this.$$request.headers[key] = String(value);
      }
      xhrSetRequestHeader.call(this, key, value);
    };
  }

  /**
   * Intercept Fetch requests
   * @private
   */;
  _proto.hookFetch = function hookFetch() {
    var instance = this;
    window.fetch = function (request, initConfig) {
      if (initConfig === void 0) {
        initConfig = {};
      }
      var url;
      var method;
      var data = '';
      // When request is a string, it is the requested url
      if (typeof request === 'string' || request instanceof URL) {
        url = request;
        method = initConfig.method || 'get';
        data = initConfig.body;
      } else {
        // Otherwise it is a Request object
        url = request.url;
        method = request.method;
      }
      url = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.getAbsolutePath)(url);
      var requestId = instance.getRequestId();
      var sendRequest = {
        url: url,
        method: method,
        requestId: requestId,
        headers: Network.getDefaultHeaders()
      };
      if (method.toLowerCase() === 'post') {
        sendRequest.postData = data;
        sendRequest.hasPostData = !!data;
      }
      instance.socketSend({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.requestWillBeSent,
        params: {
          requestId: requestId,
          documentURL: location.href,
          timestamp: getTimestamp(),
          wallTime: Date.now(),
          type: 'Fetch',
          request: sendRequest
        }
      });
      var oriResponse;
      return originFetch(request, initConfig).then(function (response) {
        // Temporarily save the raw response to the request
        oriResponse = response;
        var headers = response.headers,
          status = response.status,
          statusText = response.statusText;
        var responseHeaders = {};
        var headersText = '';
        headers.forEach(function (val, key) {
          key = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.key2UpperCase)(key);
          responseHeaders[key] = val;
          headersText += key + ": " + val + "\r\n";
        });
        instance.sendNetworkEvent({
          url: url,
          requestId: requestId,
          status: status,
          statusText: statusText,
          headersText: headersText,
          type: 'Fetch',
          blockedCookies: [],
          headers: responseHeaders,
          encodedDataLength: Number(headers.get('Content-Length'))
        });
        var contentType = headers.get('Content-Type');
        if (['application/json', 'application/javascript', 'text/plain', 'text/html', 'text/css'].some(function (type) {
          return contentType.includes(type);
        })) {
          return response.clone().text();
        }
        return '';
      }).then(function (responseBody) {
        instance.responseData.set(requestId, responseBody);
        // Returns the raw response to the request
        return oriResponse;
      }).catch(function (error) {
        instance.sendNetworkEvent({
          url: url,
          requestId: requestId,
          blockedCookies: [],
          type: 'Fetch'
        });
        throw error;
      });
    };
  }

  /**
   * @private
   * report image request for Network panel
   */;
  _proto.reportImageNetwork = function reportImageNetwork() {
    var _this4 = this;
    var imgUrls = new Set();
    var reportNetwork = function reportNetwork(urls) {
      urls.forEach( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
          var requestId, _yield$originFetch$th, base64;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                requestId = _this4.getRequestId();
                _context.prev = 1;
                _context.next = 4;
                return originFetch("http://localhost:8080" + "/remote/debug/image_base64?url=" + encodeURIComponent(url)).then(function (res) {
                  return res.json();
                });
              case 4:
                _yield$originFetch$th = _context.sent;
                base64 = _yield$originFetch$th.base64;
                _this4.responseData.set(requestId, {
                  data: base64,
                  base64Encoded: true
                });
                _context.next = 11;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
              case 11:
                _this4.send({
                  method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.requestWillBeSent,
                  params: {
                    requestId: requestId,
                    documentURL: location.href,
                    timestamp: getTimestamp(),
                    wallTime: Date.now(),
                    type: 'Image',
                    request: {
                      method: 'GET',
                      url: url
                    }
                  }
                });
                _this4.sendNetworkEvent({
                  url: url,
                  requestId: requestId,
                  status: 200,
                  statusText: '',
                  headersText: '',
                  type: 'Image',
                  blockedCookies: [],
                  encodedDataLength: 0
                });
              case 13:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 9]]);
        }));
        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }());
    };
    var getImageUrls = function getImageUrls() {
      var urls = [];
      Object.values(document.images).forEach(function (image) {
        var url = image.getAttribute('src');
        if (!imgUrls.has(url)) {
          imgUrls.add(url);
          urls.push(url);
        }
      });
      return urls;
    };
    var observerBodyMutation = function observerBodyMutation() {
      var observer = new MutationObserver(function () {
        var urls = getImageUrls();
        if (urls.length) {
          reportNetwork(urls);
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    };
    reportNetwork(getImageUrls());
    observerBodyMutation();
  }

  /**
   * @private
   */;
  _proto.sendNetworkEvent = function sendNetworkEvent(params) {
    var _this5 = this;
    var requestId = params.requestId,
      headers = params.headers,
      headersText = params.headersText,
      type = params.type,
      url = params.url,
      status = params.status,
      statusText = params.statusText,
      encodedDataLength = params.encodedDataLength;
    this.socketSend({
      method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.responseReceivedExtraInfo,
      params: {
        requestId: requestId,
        headers: headers,
        blockedCookies: [],
        headersText: headersText
      }
    });
    this.socketSend({
      method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.responseReceived,
      params: {
        type: type,
        requestId: requestId,
        timestamp: getTimestamp(),
        response: {
          url: url,
          status: status,
          statusText: statusText,
          headers: headers,
          mimeType: mime_lite__WEBPACK_IMPORTED_MODULE_1__["default"].getType(url)
        }
      }
    });
    setTimeout(function () {
      // loadingFinished event delay report
      _this5.socketSend({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.loadingFinished,
        params: {
          requestId: requestId,
          encodedDataLength: encodedDataLength,
          timestamp: getTimestamp()
        }
      });
    }, 10);
  };
  return Network;
}(_domain__WEBPACK_IMPORTED_MODULE_3__["default"]);

;

/***/ }),

/***/ "./src/client/sdk/domain/overlay.js":
/*!******************************************!*\
  !*** ./src/client/sdk/domain/overlay.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Overlay)
/* harmony export */ });
/* harmony import */ var _common_nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nodes */ "./src/client/sdk/common/nodes.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _common_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/constant */ "./src/client/sdk/common/constant.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Overlay = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Overlay, _BaseDomain);
  function Overlay() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'Overlay';
    _this.highlightConfig = {};
    _this.highlightBox = {};
    return _this;
  }
  /**
   * @static
   */
  Overlay.formatNumber = function formatNumber(num) {
    if (num % 1 === 0) return num;
    var fixed = num.toFixed(2);
    var numArr = fixed.split('.');
    if (numArr[1] === '00') return numArr[0];
    return fixed;
  }

  /**
   * Extract attribute value from style
   * @static
   */;
  Overlay.getStylePropertyValue = function getStylePropertyValue(properties, styles) {
    if (Array.isArray(properties)) {
      return properties.map(function (key) {
        return Number(styles[key].replace('px', ''));
      });
    }
    return Number(styles[properties].replace('px', ''));
  }

  /**
   * rgba color
   * @static
   */;
  Overlay.rgba = function rgba(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
      r = _ref.r,
      g = _ref.g,
      b = _ref.b,
      a = _ref.a;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  /**
   * @public
   */;
  var _proto = Overlay.prototype;
  _proto.enable = function enable() {
    this.createHighlightBox();
    this.nodeHighlightRequested();
  }

  /**
   * @public
   * @param {Object} param
   * @param {String} param.nodeId node unique id
   * @param {String} param.nodeElement
   * @param {Object} param.highlightConfig
   */;
  _proto.highlightNode = function highlightNode(_ref2) {
    var nodeId = _ref2.nodeId,
      nodeElement = _ref2.nodeElement,
      highlightConfig = _ref2.highlightConfig;
    var node = nodeElement || _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId);
    if (!node || [Node.TEXT_NODE, Node.COMMENT_NODE, Node.DOCUMENT_TYPE_NODE].includes(node.nodeType) || ['LINK', 'SCRIPT', 'HEAD'].includes(node.nodeName) || !(node instanceof HTMLElement)) {
      return;
    }
    this.updateHighlightBox(highlightConfig, node);
  }

  /**
   * @public
   */;
  _proto.hideHighlight = function hideHighlight() {
    if (this.highlightBox.containerBox) {
      this.highlightBox.containerBox.style.display = 'none';
    }
  }

  /**
   * Set dom inspection mode
   * @public
   * @param {Object} param
   * @param {String} param.mode inspect mode
   * @param {Object} param.highlightConfig
   */;
  _proto.setInspectMode = function setInspectMode(_ref3) {
    var mode = _ref3.mode,
      highlightConfig = _ref3.highlightConfig;
    window.$$inspectMode = mode;
    this.highlightConfig = highlightConfig;
  }

  /**
  * @private
  */;
  _proto.expandNode = function expandNode(node) {
    var _this2 = this;
    var nodeIds = [];
    while (!_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].hasNode(node)) {
      var nodeId = _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node);
      nodeIds.unshift(nodeId);
      node = node.parentNode;
    }
    nodeIds.unshift(_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(node));
    nodeIds.forEach(function (nodeId) {
      _this2.requestChildNodes({
        nodeId: nodeId
      });
    });
  }

  /**
   * @private
   */;
  _proto.requestChildNodes = function requestChildNodes(_ref4) {
    var nodeId = _ref4.nodeId;
    if (_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].hasRequestedChildNode.has(nodeId)) {
      return;
    }
    _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].hasRequestedChildNode.add(nodeId);
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_3__.Event.setChildNodes,
      params: {
        parentId: nodeId,
        nodes: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getChildNodes(_common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getNodeById(nodeId), 2)
      }
    });
  }

  /**
   * @private
   */;
  _proto.nodeHighlightRequested = function nodeHighlightRequested() {
    var _this3 = this;
    var highlight = function highlight(e) {
      if (window.$$inspectMode !== 'searchForNode') return;
      e.stopPropagation();
      e.preventDefault();
      var target = e.target;
      if (e.touches) {
        var touch = e.touches[0];
        target = document.elementFromPoint(touch.clientX, touch.clientY);
      }
      _this3.highlightNode({
        nodeElement: target,
        highlightConfig: _this3.highlightConfig
      });
      _this3.expandNode(e.target.parentNode);
      _this3.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_3__.Event.nodeHighlightRequested,
        params: {
          nodeId: _common_nodes__WEBPACK_IMPORTED_MODULE_0__["default"].getIdByNode(target)
        }
      });
    };
    document.addEventListener('mousemove', highlight, true);
    document.addEventListener('touchmove', highlight, {
      passive: false
    });
  }

  /**
   * @private
   */;
  _proto.createHighlightBox = function createHighlightBox() {
    var containerBox = document.createElement('div');
    var contentBox = document.createElement('div');
    var marginBox = document.createElement('div');
    var tooltipsBox = document.createElement('div');
    [marginBox, contentBox, tooltipsBox].forEach(function (item) {
      Object.assign(item.style, {
        padding: 0,
        margin: 0,
        position: 'fixed',
        borderSizing: 'border-box'
      });
      item.className = _common_constant__WEBPACK_IMPORTED_MODULE_2__.DEVTOOL_OVERLAY;
      containerBox.appendChild(item);
    });
    Object.assign(containerBox.style, {
      display: 'none',
      position: 'fixed',
      zIndex: 99999,
      pointerEvents: 'none'
    });
    containerBox.className = _common_constant__WEBPACK_IMPORTED_MODULE_2__.DEVTOOL_OVERLAY;
    containerBox.id = _common_constant__WEBPACK_IMPORTED_MODULE_2__.DEVTOOL_OVERLAY;
    document.body.appendChild(containerBox);
    this.highlightBox = {
      containerBox: containerBox,
      contentBox: contentBox,
      marginBox: marginBox,
      tooltipsBox: tooltipsBox
    };
  }

  /**
   * @private
   */;
  _proto.updateHighlightBox = function updateHighlightBox(highlightConfig, node) {
    var styles = window.getComputedStyle(node);
    var margin = Overlay.getStylePropertyValue(['margin-top', 'margin-right', 'margin-bottom', 'margin-left'], styles);
    var padding = Overlay.getStylePropertyValue(['padding-top', 'padding-right', 'padding-bottom', 'padding-left'], styles);
    var border = Overlay.getStylePropertyValue(['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'], styles);
    var width = Overlay.getStylePropertyValue('width', styles);
    var height = Overlay.getStylePropertyValue('height', styles);
    var isBorderBox = window.getComputedStyle(node)['box-sizing'] === 'border-box';
    var _node$getBoundingClie = node.getBoundingClientRect(),
      left = _node$getBoundingClie.left,
      top = _node$getBoundingClie.top;
    var contentWidth = isBorderBox ? width - padding[1] - padding[3] : width + border[1] + border[3];
    var contentHeight = isBorderBox ? height - padding[0] - padding[2] : height + border[0] + border[2];
    var marginWidth = isBorderBox ? width : width + padding[1] + padding[3] + border[1] + border[3];
    var marginHeight = isBorderBox ? height : height + padding[0] + padding[2] + border[0] + border[2];
    var contentColor = highlightConfig.contentColor,
      paddingColor = highlightConfig.paddingColor,
      marginColor = highlightConfig.marginColor;
    var _this$highlightBox = this.highlightBox,
      containerBox = _this$highlightBox.containerBox,
      contentBox = _this$highlightBox.contentBox,
      marginBox = _this$highlightBox.marginBox,
      tooltipsBox = _this$highlightBox.tooltipsBox;
    containerBox.style.display = 'block';
    Object.assign(contentBox.style, {
      left: left + "px",
      top: top + "px",
      width: contentWidth + "px",
      height: contentHeight + "px",
      background: Overlay.rgba(contentColor),
      borderColor: Overlay.rgba(paddingColor),
      borderStyle: 'solid',
      borderWidth: padding[0] + "px " + padding[1] + "px " + padding[2] + "px " + padding[3] + "px"
    });
    Object.assign(marginBox.style, {
      left: left - margin[3] + "px",
      top: top - margin[0] + "px",
      width: marginWidth + "px",
      height: marginHeight + "px",
      borderColor: Overlay.rgba(marginColor),
      borderStyle: 'solid',
      borderWidth: margin[0] + "px " + margin[1] + "px " + margin[2] + "px " + margin[3] + "px"
    });
    var isTopPosition = top - margin[0] > 25;
    var cls = _common_constant__WEBPACK_IMPORTED_MODULE_2__.DEVTOOL_OVERLAY;
    var currentClassName = node.getAttribute('class');
    tooltipsBox.innerHTML = "\n      <span class=\"" + cls + "\" style=\"color:#973090;font-weight:bold\">" + node.nodeName.toLowerCase() + "</span>\n      <span class=\"" + cls + "\" style=\"color:#3434B0;font-weight:bold\">" + (currentClassName ? "." + currentClassName : '') + "</span>\n      <span class=\"" + cls + "\" style=\"position:absolute;top:" + (isTopPosition ? 'auto' : '-4px') + ";bottom:" + (isTopPosition ? '-4px' : 'auto') + ";left:10px;width:8px;height:8px;background:#fff;transform:rotate(45deg);\"></span>\n      " + Overlay.formatNumber(contentWidth) + " x " + Overlay.formatNumber(contentHeight) + "\n    ";
    Object.assign(tooltipsBox.style, {
      background: '#fff',
      left: left - margin[3] + "px",
      top: isTopPosition ? top - margin[0] - 30 + "px" : top + marginHeight + 10 + "px",
      filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
      'border-radius': '2px',
      'font-size': '12px',
      padding: '2px 4px',
      color: '#8d8d8d'
    });
  };
  return Overlay;
}(_domain__WEBPACK_IMPORTED_MODULE_1__["default"]);

;

/***/ }),

/***/ "./src/client/sdk/domain/page.js":
/*!***************************************!*\
  !*** ./src/client/sdk/domain/page.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var _screen_preview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen-preview */ "./src/client/sdk/domain/screen-preview.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Page = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Page, _BaseDomain);
  function Page() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'Page';
    _this.frame = new Map();
    return _this;
  }
  var _proto = Page.prototype;
  /**
     * @public
   */
  _proto.enable = function enable() {
    var _this2 = this;
    var xhr = new XMLHttpRequest();
    xhr.$$requestType = 'Document';
    xhr.onload = function () {
      _this2.frame.set(location.href, xhr.responseText);
    };
    xhr.onerror = function () {
      _this2.frame.set(location.href, 'Cannot get script source code');
    };
    xhr.open('GET', location.href);
    xhr.send();
  }

  /**
   * Get root frame
   * @public
   */;
  _proto.getResourceTree = function getResourceTree() {
    return {
      frameTree: {
        frame: {
          id: 1,
          mimeType: 'text/html',
          securityOrigin: location.origin,
          url: location.href
        },
        resources: []
      }
    };
  }

  /**
   * Get html content
   * @public
   * @param {Object} param
   * @param {String} param.url page url
   */;
  _proto.getResourceContent = function getResourceContent(_ref) {
    var url = _ref.url;
    return {
      content: this.frame.get(url)
    };
  };
  _proto.startScreencast = function startScreencast() {
    var _this3 = this;
    var captureScreen = function captureScreen() {
      if (document.hidden) return;
      _screen_preview__WEBPACK_IMPORTED_MODULE_0__["default"].captureScreen().then(function (base64) {
        _this3.send({
          method: _protocol__WEBPACK_IMPORTED_MODULE_2__.Event.screencastFrame,
          params: {
            data: base64.replace(/^data:image\/jpeg;base64,/, ''),
            sessionId: 1,
            metadata: {
              deviceHeight: window.innerHeight,
              deviceWidth: window.innerWidth,
              pageScaleFactor: 1,
              offsetTop: 0,
              scrollOffsetX: 0,
              scrollOffsetY: 0,
              timestamp: Date.now()
            }
          }
        });
      });
    };
    captureScreen();
    this.intervalTimer = setInterval(captureScreen, 2000);
  };
  _proto.stopScreencast = function stopScreencast() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  };
  return Page;
}(_domain__WEBPACK_IMPORTED_MODULE_1__["default"]);

;

/***/ }),

/***/ "./src/client/sdk/domain/protocol.js":
/*!*******************************************!*\
  !*** ./src/client/sdk/domain/protocol.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Event: () => (/* binding */ Event),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Implemented CDP
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  CSS: ['enable', 'getStyleSheetText', 'getMatchedStylesForNode', 'getComputedStyleForNode', 'getDynamicLink'],
  Debugger: ['enable', 'getScriptSource', 'getDynamicScript'],
  DOMStorage: ['enable', 'getDOMStorageItems', 'removeDOMStorageItem', 'clear', 'setDOMStorageItem'],
  Storage: ['getStorageKeyForFrame'],
  DOM: ['enable', 'getDocument', 'removeNode', 'requestChildNodes', 'requestNode', 'getOuterHTML', 'setOuterHTML', 'setAttributesAsText', 'setInspectedNode', 'pushNodesByBackendIdsToFrontend', 'performSearch', 'getSearchResults', 'discardSearchResults', 'getNodeForLocation', 'setNodeValue', 'getBoxModel'],
  Network: ['enable', 'getCookies', 'setCookie', 'deleteCookies', 'getResponseBody'],
  Overlay: ['enable', 'highlightNode', 'hideHighlight', 'setInspectMode'],
  Page: ['enable', 'startScreencast', 'stopScreencast', 'getResourceTree', 'getResourceContent'],
  Runtime: ['enable', 'evaluate', 'getProperties', 'releaseObject'],
  ScreenPreview: ['startPreview', 'stopPreview'] // ScreenPreview is a custom protocol
});

var Event = {
  styleSheetAdded: 'CSS.styleSheetAdded',
  scriptParsed: 'Debugger.scriptParsed',
  domStorageItemAdded: 'DOMStorage.domStorageItemAdded',
  domStorageItemRemoved: 'DOMStorage.domStorageItemRemoved',
  domStorageItemsCleared: 'DOMStorage.domStorageItemsCleared',
  domStorageItemUpdated: 'DOMStorage.domStorageItemUpdated',
  setChildNodes: 'DOM.setChildNodes',
  childNodeCountUpdated: 'DOM.childNodeCountUpdated',
  childNodeInserted: 'DOM.childNodeInserted',
  childNodeRemoved: 'DOM.childNodeRemoved',
  attributeModified: 'DOM.attributeModified',
  attributeRemoved: 'DOM.attributeRemoved',
  characterDataModified: 'DOM.characterDataModified',
  requestWillBeSent: 'Network.requestWillBeSent',
  responseReceivedExtraInfo: 'Network.responseReceivedExtraInfo',
  responseReceived: 'Network.responseReceived',
  loadingFinished: 'Network.loadingFinished',
  screencastFrame: 'Page.screencastFrame',
  executionContextCreated: 'Runtime.executionContextCreated',
  consoleAPICalled: 'Runtime.consoleAPICalled',
  exceptionThrown: 'Runtime.exceptionThrown',
  nodeHighlightRequested: 'Overlay.nodeHighlightRequested',
  inspectNodeRequested: 'Overlay.inspectNodeRequested',
  captured: 'ScreenPreview.captured',
  syncScroll: 'ScreenPreview.syncScroll',
  syncMouse: 'ScreenPreview.syncMouse'
};

/***/ }),

/***/ "./src/client/sdk/domain/runtime.js":
/*!******************************************!*\
  !*** ./src/client/sdk/domain/runtime.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Runtime)
/* harmony export */ });
/* harmony import */ var _common_remoteObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/remoteObject */ "./src/client/sdk/common/remoteObject.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var callsite = __webpack_require__(/*! callsite */ "./node_modules/callsite/index.js");
var Runtime = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Runtime, _BaseDomain);
  function Runtime(options) {
    var _this;
    _this = _BaseDomain.call(this, options) || this;
    _this.namespace = 'Runtime';
    _this.cacheConsole = [];
    _this.cacheError = [];
    _this.isEnable = false;
    _this.socketSend = function (type, data) {
      if (type === 'console') {
        _this.cacheConsole.push(data);
      } else if (type === 'error') {
        _this.cacheError.push(data);
      }
      if (_this.isEnable) {
        _this.send(data);
      }
    };
    _this.hookConsole();
    _this.listenError();
    return _this;
  }

  /**
   * Get call stack
   * @static
   * @param {Error} error
   */
  Runtime.getCallFrames = function getCallFrames(error) {
    var callFrames = [];
    var stack;
    if (error) {
      stack = error.stack;
      callFrames = stack.split('\n').map(function (val) {
        return _extends({
          functionName: val
        }, Runtime.getPositionAndUrl(val));
      });
      // Safari does not support captureStackTrace
    } else if (Error.captureStackTrace) {
      callFrames = callsite().map(function (val) {
        return {
          functionName: val.getFunctionName(),
          lineNumber: val.getLineNumber(),
          columnNumber: val.getColumnNumber(),
          url: val.getFileName()
        };
      });
    } else {
      stack = new Error().stack;
      callFrames = stack.split('\n').map(function (val) {
        return _extends({
          functionName: val
        }, Runtime.getPositionAndUrl(val));
      });
    }
    callFrames.shift();
    return callFrames;
  }

  /**
   * Get the line number and column number of each stack code from the error stack
   * @static
   */;
  Runtime.getPositionAndUrl = function getPositionAndUrl(str) {
    var reg = /at\s+(.*)(?::([0-9]+):([0-9]+))$/; // for android
    var reg1 = /@+(.*)(?::([0-9]+):([0-9]+))$/; // for ios

    var res;
    if (reg.test(str)) {
      res = reg.exec(str);
    } else if (reg1.test(str)) {
      res = reg1.exec(str);
    }
    if (res) {
      return {
        url: res[1],
        lineNumber: res[2],
        columnNumber: res[3]
      };
    }
    return {};
  }

  /**
   * @public
   */;
  var _proto = Runtime.prototype;
  _proto.enable = function enable() {
    var _this2 = this;
    this.isEnable = true;
    this.cacheConsole.forEach(function (data) {
      return _this2.send(data);
    });
    this.cacheError.forEach(function (data) {
      return _this2.send(data);
    });
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_2__.Event.executionContextCreated,
      params: {
        context: {
          id: 1,
          name: 'top',
          origin: location.origin
        }
      }
    });
  }

  /**
   * script execution
   * @public
   * @param {Object} param
   * @param {String} param.expression expression string
   * @param {Boolean} param.generatePreview whether to generate a preview
   */;
  _proto.evaluate = function evaluate(_ref) {
    var expression = _ref.expression,
      generatePreview = _ref.generatePreview;
    // eslint-disable-next-line
    var res = eval(expression);
    return {
      result: (0,_common_remoteObject__WEBPACK_IMPORTED_MODULE_0__.objectFormat)(res, {
        preview: generatePreview
      })
    };
  }

  /**
   * Get object properties
   * @public
   */;
  _proto.getProperties = function getProperties(params) {
    return {
      result: (0,_common_remoteObject__WEBPACK_IMPORTED_MODULE_0__.getObjectProperties)(params)
    };
  }

  /**
   * release object
   * @public
   */;
  _proto.releaseObject = function releaseObject(params) {
    (0,_common_remoteObject__WEBPACK_IMPORTED_MODULE_0__.objectRelease)(params);
  }

  /**
   * Intercept method of console object
   * @private
   */;
  _proto.hookConsole = function hookConsole() {
    var _this3 = this;
    var methods = {
      log: 'log',
      warn: 'warning',
      info: 'info',
      error: 'error'
    };
    Object.keys(methods).forEach(function (key) {
      var nativeConsoleFunc = window.console[key];
      window.console[key] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        nativeConsoleFunc.apply(void 0, args);
        var data = {
          method: _protocol__WEBPACK_IMPORTED_MODULE_2__.Event.consoleAPICalled,
          params: {
            type: methods[key],
            args: args.map(function (arg) {
              return (0,_common_remoteObject__WEBPACK_IMPORTED_MODULE_0__.objectFormat)(arg, {
                preview: true
              });
            }),
            executionContextId: 1,
            timestamp: Date.now(),
            stackTrace: {
              // error, warn processing call stack
              callFrames: ['error', 'warn'].includes(key) ? Runtime.getCallFrames() : []
            }
          }
        };
        _this3.socketSend('console', data);
      };
    });
  }

  /**
   * Global error monitor
   * @private
   */;
  _proto.listenError = function listenError() {
    var _this4 = this;
    var exceptionThrown = function exceptionThrown(error) {
      var data = {
        method: _protocol__WEBPACK_IMPORTED_MODULE_2__.Event.exceptionThrown,
        params: {
          timestamp: Date.now(),
          exceptionDetails: {
            text: 'Uncaught',
            exception: {
              type: 'object',
              subtype: 'error',
              className: error ? error.name : 'Error',
              description: error ? error.stack : 'Script error.'
            },
            stackTrace: {
              callFrames: Runtime.getCallFrames(error)
            }
          }
        }
      };
      _this4.socketSend('error', data);
    };
    window.addEventListener('error', function (e) {
      return exceptionThrown(e.error);
    });
    window.addEventListener('unhandledrejection', function (e) {
      return exceptionThrown(e.reason);
    });
  };
  return Runtime;
}(_domain__WEBPACK_IMPORTED_MODULE_1__["default"]);

;

/***/ }),

/***/ "./src/client/sdk/domain/screen-preview.js":
/*!*************************************************!*\
  !*** ./src/client/sdk/domain/screen-preview.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScreenPreview)
/* harmony export */ });
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.throttle */ "./node_modules/lodash.throttle/index.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "./src/client/sdk/common/utils.js");
/* harmony import */ var _common_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/constant */ "./src/client/sdk/common/constant.js");
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./protocol */ "./src/client/sdk/domain/protocol.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ScreenPreview = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(ScreenPreview, _BaseDomain);
  function ScreenPreview() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'ScreenPreview';
    _this.syncScroll = lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(function () {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
      _this.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.syncScroll,
        params: {
          scrollTop: scrollTop,
          scrollLeft: scrollLeft
        }
      });
    }, 100);
    _this.syncMouse = lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(function (e) {
      var type = e.type || 'mousemove';
      var left = e.clientX;
      var top = e.clientY;
      if (type.includes('touch')) {
        left = (e.touches[0] || e.changedTouches[0]).clientX;
        top = (e.touches[0] || e.changedTouches[0]).clientY;
      }
      _this.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.syncMouse,
        params: {
          type: type,
          left: left,
          top: top
        }
      });
    }, 50);
    return _this;
  }
  ScreenPreview.captureScreen = function captureScreen() {
    var renderScreen = function renderScreen() {
      return window.html2canvas(document.body, {
        allowTaint: true,
        backgroundColor: null,
        useCORS: true,
        imageTimeout: 10000,
        scale: 1,
        ignoreElements: function ignoreElements(element) {
          if (!(element !== null && element !== void 0 && element.style)) return false;
          var _element$style = element.style,
            display = _element$style.display,
            opacity = _element$style.opacity,
            visibility = _element$style.visibility;
          return (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isMatches)(element, "." + _common_constant__WEBPACK_IMPORTED_MODULE_2__.DEVTOOL_OVERLAY) || display === 'none' || opacity === 0 || visibility === 'hidden';
        }
      }).then(function (canvas) {
        return canvas.toDataURL('image/jpeg');
      });
    };
    if (window.html2canvas) {
      return renderScreen();
    }
    return (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.loadScript)('https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js').then(renderScreen);
  }

  /**
   * Start live preview
   * @public
   */;
  var _proto = ScreenPreview.prototype;
  _proto.startPreview = function startPreview() {
    var _this2 = this;
    var selector = 'link[rel="stylesheet"],style';
    var styles = document.querySelectorAll(selector);
    var counts = styles.length;
    var joinStyleTags = function joinStyleTags(styles) {
      var tags = '';
      Array.from(styles).forEach(function (style) {
        var tag = style.tagName.toLowerCase();
        if (tag === 'link') {
          tags += "<link href=\"" + style.href + "\" rel=\"stylesheet\">";
        }
        if (tag === 'style') {
          tags += "<style>" + style.innerHTML + "</style>";
        }
      });
      return "<head>" + tags + "</head>";
    };
    this.send({
      method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.captured,
      params: {
        isMobile: (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isMobile)(),
        head: joinStyleTags(styles),
        body: document.body.innerHTML,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });

    // Observe the changes of the document
    this.observerInst = new MutationObserver(lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(function () {
      var curStyles = document.querySelectorAll(selector);
      var head;
      if (curStyles.length !== counts) {
        counts = curStyles.length;
        head = joinStyleTags(curStyles);
      }
      _this2.send({
        method: _protocol__WEBPACK_IMPORTED_MODULE_4__.Event.captured,
        params: {
          head: head,
          body: document.body.innerHTML,
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.isMobile)()
        }
      });
    }, 1000));
    this.observerInst.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    window.addEventListener('scroll', this.syncScroll);
    ['mousemove', 'mousedown', 'mouseup', 'touchmove', 'touchstart', 'touchend'].forEach(function (event) {
      window.addEventListener(event, _this2.syncMouse);
    });
  }

  /**
   * stop live preview
   * @public
   */;
  _proto.stopPreview = function stopPreview() {
    var _this3 = this;
    this.observerInst && this.observerInst.disconnect();
    window.removeEventListener('scroll', this.syncScroll);
    ['mousemove', 'mousedown', 'mouseup', 'touchmove', 'touchstart', 'touchend'].forEach(function (event) {
      window.removeEventListener(event, _this3.syncMouse);
    });
  };
  return ScreenPreview;
}(_domain__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./src/client/sdk/domain/storage.js":
/*!******************************************!*\
  !*** ./src/client/sdk/domain/storage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain */ "./src/client/sdk/domain/domain.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Storage = /*#__PURE__*/function (_BaseDomain) {
  _inheritsLoose(Storage, _BaseDomain);
  function Storage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseDomain.call.apply(_BaseDomain, [this].concat(args)) || this;
    _this.namespace = 'Storage';
    return _this;
  }
  var _proto = Storage.prototype;
  /**
   * @public
   */
  _proto.getStorageKeyForFrame = function getStorageKeyForFrame() {
    return {
      storageKey: location.origin
    };
  };
  return Storage;
}(_domain__WEBPACK_IMPORTED_MODULE_0__["default"]);

;

/***/ }),

/***/ "./node_modules/mime/dist/src/Mime.js":
/*!********************************************!*\
  !*** ./node_modules/mime/dist/src/Mime.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mime_extensionToType, _Mime_typeToExtension, _Mime_typeToExtensions;
var Mime = /*#__PURE__*/function () {
  function Mime() {
    _Mime_extensionToType.set(this, new Map());
    _Mime_typeToExtension.set(this, new Map());
    _Mime_typeToExtensions.set(this, new Map());
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    for (var _i = 0, _args = args; _i < _args.length; _i++) {
      var arg = _args[_i];
      this.define(arg);
    }
  }
  var _proto = Mime.prototype;
  _proto.define = function define(typeMap, force) {
    if (force === void 0) {
      force = false;
    }
    for (var _i2 = 0, _Object$entries = Object.entries(typeMap); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _Object$entries[_i2],
        type = _Object$entries$_i[0],
        extensions = _Object$entries$_i[1];
      type = type.toLowerCase();
      extensions = extensions.map(function (ext) {
        return ext.toLowerCase();
      });
      if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").has(type)) {
        __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, new Set());
      }
      var allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
      var first = true;
      for (var _iterator = _createForOfIteratorHelperLoose(extensions), _step; !(_step = _iterator()).done;) {
        var extension = _step.value;
        var starred = extension.startsWith('*');
        extension = starred ? extension.slice(1) : extension;
        allExtensions === null || allExtensions === void 0 ? void 0 : allExtensions.add(extension);
        if (first) {
          __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
        }
        first = false;
        if (starred) continue;
        var currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
        if (currentType && currentType != type && !force) {
          throw new Error("\"" + type + " -> " + extension + "\" conflicts with \"" + currentType + " -> " + extension + "\". Pass `force=true` to override this definition.");
        }
        __classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
      }
    }
    return this;
  };
  _proto.getType = function getType(path) {
    var _classPrivateFieldGe;
    if (typeof path !== 'string') return null;
    var last = path.replace(/^.*[/\\]/, '').toLowerCase();
    var ext = last.replace(/^.*\./, '').toLowerCase();
    var hasPath = last.length < path.length;
    var hasDot = ext.length < last.length - 1;
    if (!hasDot && hasPath) return null;
    return (_classPrivateFieldGe = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext)) != null ? _classPrivateFieldGe : null;
  };
  _proto.getExtension = function getExtension(type) {
    var _type, _type$split, _ref;
    if (typeof type !== 'string') return null;
    type = (_type = type) === null || _type === void 0 ? void 0 : (_type$split = _type.split) === null || _type$split === void 0 ? void 0 : _type$split.call(_type, ';')[0];
    return (_ref = type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) != null ? _ref : null;
  };
  _proto.getAllExtensions = function getAllExtensions(type) {
    var _classPrivateFieldGe2;
    if (typeof type !== 'string') return null;
    return (_classPrivateFieldGe2 = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type.toLowerCase())) != null ? _classPrivateFieldGe2 : null;
  };
  _proto._freeze = function _freeze() {
    this.define = function () {
      throw new Error('define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances');
    };
    Object.freeze(this);
    for (var _iterator2 = _createForOfIteratorHelperLoose(__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").values()), _step2; !(_step2 = _iterator2()).done;) {
      var extensions = _step2.value;
      Object.freeze(extensions);
    }
    return this;
  };
  _proto._getTestState = function _getTestState() {
    return {
      types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
      extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f")
    };
  };
  return Mime;
}();
_Mime_extensionToType = new WeakMap(), _Mime_typeToExtension = new WeakMap(), _Mime_typeToExtensions = new WeakMap();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mime);

/***/ }),

/***/ "./node_modules/mime/dist/src/index_lite.js":
/*!**************************************************!*\
  !*** ./node_modules/mime/dist/src/index_lite.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mime: () => (/* reexport safe */ _Mime_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types_standard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/standard.js */ "./node_modules/mime/dist/types/standard.js");
/* harmony import */ var _Mime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mime.js */ "./node_modules/mime/dist/src/Mime.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _Mime_js__WEBPACK_IMPORTED_MODULE_1__["default"](_types_standard_js__WEBPACK_IMPORTED_MODULE_0__["default"])._freeze());

/***/ }),

/***/ "./node_modules/mime/dist/types/standard.js":
/*!**************************************************!*\
  !*** ./node_modules/mime/dist/types/standard.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var types = {
  "application/andrew-inset": ["ez"],
  "application/appinstaller": ["appinstaller"],
  "application/applixware": ["aw"],
  "application/appx": ["appx"],
  "application/appxbundle": ["appxbundle"],
  "application/atom+xml": ["atom"],
  "application/atomcat+xml": ["atomcat"],
  "application/atomdeleted+xml": ["atomdeleted"],
  "application/atomsvc+xml": ["atomsvc"],
  "application/atsc-dwd+xml": ["dwd"],
  "application/atsc-held+xml": ["held"],
  "application/atsc-rsat+xml": ["rsat"],
  "application/automationml-aml+xml": ["aml"],
  "application/automationml-amlx+zip": ["amlx"],
  "application/bdoc": ["bdoc"],
  "application/calendar+xml": ["xcs"],
  "application/ccxml+xml": ["ccxml"],
  "application/cdfx+xml": ["cdfx"],
  "application/cdmi-capability": ["cdmia"],
  "application/cdmi-container": ["cdmic"],
  "application/cdmi-domain": ["cdmid"],
  "application/cdmi-object": ["cdmio"],
  "application/cdmi-queue": ["cdmiq"],
  "application/cpl+xml": ["cpl"],
  "application/cu-seeme": ["cu"],
  "application/cwl": ["cwl"],
  "application/dash+xml": ["mpd"],
  "application/dash-patch+xml": ["mpp"],
  "application/davmount+xml": ["davmount"],
  "application/docbook+xml": ["dbk"],
  "application/dssc+der": ["dssc"],
  "application/dssc+xml": ["xdssc"],
  "application/ecmascript": ["ecma"],
  "application/emma+xml": ["emma"],
  "application/emotionml+xml": ["emotionml"],
  "application/epub+zip": ["epub"],
  "application/exi": ["exi"],
  "application/express": ["exp"],
  "application/fdf": ["fdf"],
  "application/fdt+xml": ["fdt"],
  "application/font-tdpfr": ["pfr"],
  "application/geo+json": ["geojson"],
  "application/gml+xml": ["gml"],
  "application/gpx+xml": ["gpx"],
  "application/gxf": ["gxf"],
  "application/gzip": ["gz"],
  "application/hjson": ["hjson"],
  "application/hyperstudio": ["stk"],
  "application/inkml+xml": ["ink", "inkml"],
  "application/ipfix": ["ipfix"],
  "application/its+xml": ["its"],
  "application/java-archive": ["jar", "war", "ear"],
  "application/java-serialized-object": ["ser"],
  "application/java-vm": ["class"],
  "application/javascript": ["*js"],
  "application/json": ["json", "map"],
  "application/json5": ["json5"],
  "application/jsonml+json": ["jsonml"],
  "application/ld+json": ["jsonld"],
  "application/lgr+xml": ["lgr"],
  "application/lost+xml": ["lostxml"],
  "application/mac-binhex40": ["hqx"],
  "application/mac-compactpro": ["cpt"],
  "application/mads+xml": ["mads"],
  "application/manifest+json": ["webmanifest"],
  "application/marc": ["mrc"],
  "application/marcxml+xml": ["mrcx"],
  "application/mathematica": ["ma", "nb", "mb"],
  "application/mathml+xml": ["mathml"],
  "application/mbox": ["mbox"],
  "application/media-policy-dataset+xml": ["mpf"],
  "application/mediaservercontrol+xml": ["mscml"],
  "application/metalink+xml": ["metalink"],
  "application/metalink4+xml": ["meta4"],
  "application/mets+xml": ["mets"],
  "application/mmt-aei+xml": ["maei"],
  "application/mmt-usd+xml": ["musd"],
  "application/mods+xml": ["mods"],
  "application/mp21": ["m21", "mp21"],
  "application/mp4": ["*mp4", "*mpg4", "mp4s", "m4p"],
  "application/msix": ["msix"],
  "application/msixbundle": ["msixbundle"],
  "application/msword": ["doc", "dot"],
  "application/mxf": ["mxf"],
  "application/n-quads": ["nq"],
  "application/n-triples": ["nt"],
  "application/node": ["cjs"],
  "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"],
  "application/oda": ["oda"],
  "application/oebps-package+xml": ["opf"],
  "application/ogg": ["ogx"],
  "application/omdoc+xml": ["omdoc"],
  "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
  "application/oxps": ["oxps"],
  "application/p2p-overlay+xml": ["relo"],
  "application/patch-ops-error+xml": ["xer"],
  "application/pdf": ["pdf"],
  "application/pgp-encrypted": ["pgp"],
  "application/pgp-keys": ["asc"],
  "application/pgp-signature": ["sig", "*asc"],
  "application/pics-rules": ["prf"],
  "application/pkcs10": ["p10"],
  "application/pkcs7-mime": ["p7m", "p7c"],
  "application/pkcs7-signature": ["p7s"],
  "application/pkcs8": ["p8"],
  "application/pkix-attr-cert": ["ac"],
  "application/pkix-cert": ["cer"],
  "application/pkix-crl": ["crl"],
  "application/pkix-pkipath": ["pkipath"],
  "application/pkixcmp": ["pki"],
  "application/pls+xml": ["pls"],
  "application/postscript": ["ai", "eps", "ps"],
  "application/provenance+xml": ["provx"],
  "application/pskc+xml": ["pskcxml"],
  "application/raml+yaml": ["raml"],
  "application/rdf+xml": ["rdf", "owl"],
  "application/reginfo+xml": ["rif"],
  "application/relax-ng-compact-syntax": ["rnc"],
  "application/resource-lists+xml": ["rl"],
  "application/resource-lists-diff+xml": ["rld"],
  "application/rls-services+xml": ["rs"],
  "application/route-apd+xml": ["rapd"],
  "application/route-s-tsid+xml": ["sls"],
  "application/route-usd+xml": ["rusd"],
  "application/rpki-ghostbusters": ["gbr"],
  "application/rpki-manifest": ["mft"],
  "application/rpki-roa": ["roa"],
  "application/rsd+xml": ["rsd"],
  "application/rss+xml": ["rss"],
  "application/rtf": ["rtf"],
  "application/sbml+xml": ["sbml"],
  "application/scvp-cv-request": ["scq"],
  "application/scvp-cv-response": ["scs"],
  "application/scvp-vp-request": ["spq"],
  "application/scvp-vp-response": ["spp"],
  "application/sdp": ["sdp"],
  "application/senml+xml": ["senmlx"],
  "application/sensml+xml": ["sensmlx"],
  "application/set-payment-initiation": ["setpay"],
  "application/set-registration-initiation": ["setreg"],
  "application/shf+xml": ["shf"],
  "application/sieve": ["siv", "sieve"],
  "application/smil+xml": ["smi", "smil"],
  "application/sparql-query": ["rq"],
  "application/sparql-results+xml": ["srx"],
  "application/sql": ["sql"],
  "application/srgs": ["gram"],
  "application/srgs+xml": ["grxml"],
  "application/sru+xml": ["sru"],
  "application/ssdl+xml": ["ssdl"],
  "application/ssml+xml": ["ssml"],
  "application/swid+xml": ["swidtag"],
  "application/tei+xml": ["tei", "teicorpus"],
  "application/thraud+xml": ["tfi"],
  "application/timestamped-data": ["tsd"],
  "application/toml": ["toml"],
  "application/trig": ["trig"],
  "application/ttml+xml": ["ttml"],
  "application/ubjson": ["ubj"],
  "application/urc-ressheet+xml": ["rsheet"],
  "application/urc-targetdesc+xml": ["td"],
  "application/voicexml+xml": ["vxml"],
  "application/wasm": ["wasm"],
  "application/watcherinfo+xml": ["wif"],
  "application/widget": ["wgt"],
  "application/winhlp": ["hlp"],
  "application/wsdl+xml": ["wsdl"],
  "application/wspolicy+xml": ["wspolicy"],
  "application/xaml+xml": ["xaml"],
  "application/xcap-att+xml": ["xav"],
  "application/xcap-caps+xml": ["xca"],
  "application/xcap-diff+xml": ["xdf"],
  "application/xcap-el+xml": ["xel"],
  "application/xcap-ns+xml": ["xns"],
  "application/xenc+xml": ["xenc"],
  "application/xfdf": ["xfdf"],
  "application/xhtml+xml": ["xhtml", "xht"],
  "application/xliff+xml": ["xlf"],
  "application/xml": ["xml", "xsl", "xsd", "rng"],
  "application/xml-dtd": ["dtd"],
  "application/xop+xml": ["xop"],
  "application/xproc+xml": ["xpl"],
  "application/xslt+xml": ["*xsl", "xslt"],
  "application/xspf+xml": ["xspf"],
  "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
  "application/yang": ["yang"],
  "application/yin+xml": ["yin"],
  "application/zip": ["zip"],
  "audio/3gpp": ["*3gpp"],
  "audio/aac": ["adts", "aac"],
  "audio/adpcm": ["adp"],
  "audio/amr": ["amr"],
  "audio/basic": ["au", "snd"],
  "audio/midi": ["mid", "midi", "kar", "rmi"],
  "audio/mobile-xmf": ["mxmf"],
  "audio/mp3": ["*mp3"],
  "audio/mp4": ["m4a", "mp4a"],
  "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  "audio/ogg": ["oga", "ogg", "spx", "opus"],
  "audio/s3m": ["s3m"],
  "audio/silk": ["sil"],
  "audio/wav": ["wav"],
  "audio/wave": ["*wav"],
  "audio/webm": ["weba"],
  "audio/xm": ["xm"],
  "font/collection": ["ttc"],
  "font/otf": ["otf"],
  "font/ttf": ["ttf"],
  "font/woff": ["woff"],
  "font/woff2": ["woff2"],
  "image/aces": ["exr"],
  "image/apng": ["apng"],
  "image/avci": ["avci"],
  "image/avcs": ["avcs"],
  "image/avif": ["avif"],
  "image/bmp": ["bmp", "dib"],
  "image/cgm": ["cgm"],
  "image/dicom-rle": ["drle"],
  "image/dpx": ["dpx"],
  "image/emf": ["emf"],
  "image/fits": ["fits"],
  "image/g3fax": ["g3"],
  "image/gif": ["gif"],
  "image/heic": ["heic"],
  "image/heic-sequence": ["heics"],
  "image/heif": ["heif"],
  "image/heif-sequence": ["heifs"],
  "image/hej2k": ["hej2"],
  "image/hsj2": ["hsj2"],
  "image/ief": ["ief"],
  "image/jls": ["jls"],
  "image/jp2": ["jp2", "jpg2"],
  "image/jpeg": ["jpeg", "jpg", "jpe"],
  "image/jph": ["jph"],
  "image/jphc": ["jhc"],
  "image/jpm": ["jpm", "jpgm"],
  "image/jpx": ["jpx", "jpf"],
  "image/jxr": ["jxr"],
  "image/jxra": ["jxra"],
  "image/jxrs": ["jxrs"],
  "image/jxs": ["jxs"],
  "image/jxsc": ["jxsc"],
  "image/jxsi": ["jxsi"],
  "image/jxss": ["jxss"],
  "image/ktx": ["ktx"],
  "image/ktx2": ["ktx2"],
  "image/png": ["png"],
  "image/sgi": ["sgi"],
  "image/svg+xml": ["svg", "svgz"],
  "image/t38": ["t38"],
  "image/tiff": ["tif", "tiff"],
  "image/tiff-fx": ["tfx"],
  "image/webp": ["webp"],
  "image/wmf": ["wmf"],
  "message/disposition-notification": ["disposition-notification"],
  "message/global": ["u8msg"],
  "message/global-delivery-status": ["u8dsn"],
  "message/global-disposition-notification": ["u8mdn"],
  "message/global-headers": ["u8hdr"],
  "message/rfc822": ["eml", "mime"],
  "model/3mf": ["3mf"],
  "model/gltf+json": ["gltf"],
  "model/gltf-binary": ["glb"],
  "model/iges": ["igs", "iges"],
  "model/jt": ["jt"],
  "model/mesh": ["msh", "mesh", "silo"],
  "model/mtl": ["mtl"],
  "model/obj": ["obj"],
  "model/prc": ["prc"],
  "model/step+xml": ["stpx"],
  "model/step+zip": ["stpz"],
  "model/step-xml+zip": ["stpxz"],
  "model/stl": ["stl"],
  "model/u3d": ["u3d"],
  "model/vrml": ["wrl", "vrml"],
  "model/x3d+binary": ["*x3db", "x3dbz"],
  "model/x3d+fastinfoset": ["x3db"],
  "model/x3d+vrml": ["*x3dv", "x3dvz"],
  "model/x3d+xml": ["x3d", "x3dz"],
  "model/x3d-vrml": ["x3dv"],
  "text/cache-manifest": ["appcache", "manifest"],
  "text/calendar": ["ics", "ifb"],
  "text/coffeescript": ["coffee", "litcoffee"],
  "text/css": ["css"],
  "text/csv": ["csv"],
  "text/html": ["html", "htm", "shtml"],
  "text/jade": ["jade"],
  "text/javascript": ["js", "mjs"],
  "text/jsx": ["jsx"],
  "text/less": ["less"],
  "text/markdown": ["md", "markdown"],
  "text/mathml": ["mml"],
  "text/mdx": ["mdx"],
  "text/n3": ["n3"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  "text/richtext": ["rtx"],
  "text/rtf": ["*rtf"],
  "text/sgml": ["sgml", "sgm"],
  "text/shex": ["shex"],
  "text/slim": ["slim", "slm"],
  "text/spdx": ["spdx"],
  "text/stylus": ["stylus", "styl"],
  "text/tab-separated-values": ["tsv"],
  "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
  "text/turtle": ["ttl"],
  "text/uri-list": ["uri", "uris", "urls"],
  "text/vcard": ["vcard"],
  "text/vtt": ["vtt"],
  "text/wgsl": ["wgsl"],
  "text/xml": ["*xml"],
  "text/yaml": ["yaml", "yml"],
  "video/3gpp": ["3gp", "3gpp"],
  "video/3gpp2": ["3g2"],
  "video/h261": ["h261"],
  "video/h263": ["h263"],
  "video/h264": ["h264"],
  "video/iso.segment": ["m4s"],
  "video/jpeg": ["jpgv"],
  "video/jpm": ["*jpm", "*jpgm"],
  "video/mj2": ["mj2", "mjp2"],
  "video/mp2t": ["ts"],
  "video/mp4": ["mp4", "mp4v", "mpg4"],
  "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  "video/ogg": ["ogv"],
  "video/quicktime": ["qt", "mov"],
  "video/webm": ["webm"]
};
Object.freeze(types);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (types);

/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ api)
/* harmony export */ });
/*! js-cookie v3.0.5 | MIT */
/* eslint-disable no-var */
function assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (name, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      name + '=' + converter.write(value, name) + stringifiedAttributes)
  }

  function get (name) {
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);

        if (name === found) {
          break
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar
  }

  return Object.create(
    {
      set,
      get,
      remove: function (name, attributes) {
        set(
          name,
          '',
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************!*\
  !*** ./src/client/sdk/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var string_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! string-random */ "./node_modules/string-random/index.js");
/* harmony import */ var string_random__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(string_random__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reconnecting_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reconnecting-websocket */ "./node_modules/reconnecting-websocket/dist/reconnecting-websocket-mjs.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/utils */ "./src/client/sdk/common/utils.js");
/* harmony import */ var _domain_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domain/index */ "./src/client/sdk/domain/index.js");




function getDocumentFavicon() {
  var links = document.head.querySelectorAll('link');
  var icon = Array.from(links).find(function (link) {
    var rel = link.getAttribute('rel');
    return rel.includes('icon') || rel.includes('shortcut');
  });
  var iconUrl = '';
  if (icon) {
    iconUrl = (0,_common_utils__WEBPACK_IMPORTED_MODULE_2__.getAbsolutePath)(icon.getAttribute('href'));
  }
  return iconUrl;
}

// debug id
function getId() {
  var id = sessionStorage.getItem('debug_id');
  if (!id) {
    id = string_random__WEBPACK_IMPORTED_MODULE_0___default()();
    sessionStorage.setItem('debug_id', id);
  }
  return id;
}
function getQuery() {
  var search = new URLSearchParams();
  search.append('url', location.href);
  search.append('title', document.title);
  search.append('favicon', getDocumentFavicon());
  search.append('time', Date.now());
  search.append('ua', navigator.userAgent);
  return search.toString();
}
function initSocket() {
  var protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  var host = "http://localhost:8080".replace(/^(http|https):\/\//ig, '');
  var socket = new reconnecting_websocket__WEBPACK_IMPORTED_MODULE_1__["default"](protocol + "//" + host + "/remote/debug/client/" + getId() + "?" + getQuery());
  var domain = new _domain_index__WEBPACK_IMPORTED_MODULE_3__["default"]({
    socket: socket
  });
  socket.addEventListener('message', function (_ref) {
    var data = _ref.data;
    try {
      var message = JSON.parse(data);
      var ret = domain.execute(message);
      socket.send(JSON.stringify(ret));
    } catch (e) {
      console.log(e);
    }
  });
  var heartbeat;
  socket.addEventListener('open', function () {
    // Heartbeat keep alive
    heartbeat = setInterval(function () {
      socket.send('{}');
    }, 10000);
  });
  socket.addEventListener('close', function () {
    clearInterval(heartbeat);
  });
  socket.addEventListener('error', function () {
    clearInterval(heartbeat);
  });
}
function keepScreenDisplay() {
  if (!navigator.wakeLock) return;
  navigator.wakeLock.request('screen');
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      navigator.wakeLock.request('screen');
    }
  });
}
initSocket();
keepScreenDisplay();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sRUFBQyxLQUFLLENBQUM7RUFBQyxhQUFhLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxhQUFhLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDO0VBQUMsWUFBWSxFQUFDLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDO0VBQUMsa0JBQWtCLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDO0VBQUMsWUFBWSxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxVQUFVLEVBQUMsQ0FBQyxJQUFJLENBQUM7RUFBQyxpQkFBaUIsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFVBQVUsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFVBQVUsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE9BQU8sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxpQkFBaUIsRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLGFBQWEsRUFBQyxDQUFDLElBQUksQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLHFCQUFxQixFQUFDLENBQUMsT0FBTyxDQUFDO0VBQUMsWUFBWSxFQUFDLENBQUMsTUFBTSxDQUFDO0VBQUMscUJBQXFCLEVBQUMsQ0FBQyxPQUFPLENBQUM7RUFBQyxhQUFhLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDO0VBQUMsWUFBWSxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDO0VBQUMsV0FBVyxFQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1B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LEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDO0VBQUMsZUFBZSxFQUFDLENBQUMsS0FBSyxDQUFDO0VBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxDQUFDO0VBQUMsV0FBVyxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLE1BQU0sRUFBQyxLQUFLLENBQUM7RUFBQyxXQUFXLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxhQUFhLEVBQUMsQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDO0VBQUMsMkJBQTJCLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQztFQUFDLGFBQWEsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLGVBQWUsRUFBQyxDQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDO0VBQUMsWUFBWSxFQUFDLENBQUMsT0FBTyxDQUFDO0VBQUMsVUFBVSxFQUFDLENBQUMsS0FBSyxDQUFDO0VBQUMsV0FBVyxFQUFDLENBQUMsTUFBTSxDQUFDO0VBQUMsVUFBVSxFQUFDLENBQUMsTUFBTSxDQUFDO0VBQUMsV0FBVyxFQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7RUFBQyxhQUFhLEVBQUMsQ0FBQyxLQUFLLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxZQUFZLEVBQUMsQ0FBQyxNQUFNLENBQUM7RUFBQyxtQkFBbUIsRUFBQyxDQUFDLEtBQUssQ0FBQztFQUFDLFlBQVksRUFBQyxDQUFDLE1BQU0sQ0FBQztFQUFDLFdBQVcsRUFBQyxDQUFDLE1BQU0sRUFBQyxPQUFPLENBQUM7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QUFNLEVBQUUsWUFBTTtJQUNwQztJQUNBNnZCLFNBQVMsR0FBR3ZILFdBQVcsQ0FBQyxZQUFNO01BQzVCalEsTUFBTSxDQUFDcGEsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDLEVBQUUsS0FBSyxDQUFDO0VBQ1gsQ0FBQyxDQUFDO0VBRUZvYSxNQUFNLENBQUNyWSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNyQ3dvQixhQUFhLENBQUNxSCxTQUFTLENBQUM7RUFDMUIsQ0FBQyxDQUFDO0VBQ0Z4WCxNQUFNLENBQUNyWSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNyQ3dvQixhQUFhLENBQUNxSCxTQUFTLENBQUM7RUFDMUIsQ0FBQyxDQUFDO0FBQ0o7QUFFQSxTQUFTQyxpQkFBaUJBLENBQUEsRUFBRztFQUMzQixJQUFJLENBQUM3bEIsU0FBUyxDQUFDOGxCLFFBQVEsRUFBRTtFQUV6QjlsQixTQUFTLENBQUM4bEIsUUFBUSxDQUFDcFAsT0FBTyxDQUFDLFFBQVEsQ0FBQztFQUVwQ3ZYLFFBQVEsQ0FBQ3BKLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07SUFDbEQsSUFBSW9KLFFBQVEsQ0FBQzRtQixlQUFlLEtBQUssU0FBUyxFQUFFO01BQzFDL2xCLFNBQVMsQ0FBQzhsQixRQUFRLENBQUNwUCxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3RDO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7QUFFQStPLFVBQVUsQ0FBQyxDQUFDO0FBQ1pJLGlCQUFpQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9jYWxsc2l0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9ub2RlX21vZHVsZXMvbG9kYXNoLnRocm90dGxlL2luZGV4LmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9yZWNvbm5lY3Rpbmctd2Vic29ja2V0L2Rpc3QvcmVjb25uZWN0aW5nLXdlYnNvY2tldC1tanMuanMiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyLy4vbm9kZV9tb2R1bGVzL3N0cmluZy1yYW5kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyLy4vc3JjL2NsaWVudC9zZGsvY29tbW9uL2NvbnN0YW50LmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL3NyYy9jbGllbnQvc2RrL2NvbW1vbi9ub2Rlcy5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9jb21tb24vcmVtb3RlT2JqZWN0LmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL3NyYy9jbGllbnQvc2RrL2NvbW1vbi91dGlscy5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vY3NzLmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL3NyYy9jbGllbnQvc2RrL2RvbWFpbi9kZWJ1Z2dlci5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vZG9tLXN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyLy4vc3JjL2NsaWVudC9zZGsvZG9tYWluL2RvbS5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vZG9tYWluLmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL3NyYy9jbGllbnQvc2RrL2RvbWFpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vbmV0d29yay5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vcGFnZS5qcyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9kb21haW4vcHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyLy4vc3JjL2NsaWVudC9zZGsvZG9tYWluL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyLy4vc3JjL2NsaWVudC9zZGsvZG9tYWluL3NjcmVlbi1wcmV2aWV3LmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL3NyYy9jbGllbnQvc2RrL2RvbWFpbi9zdG9yYWdlLmpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uLi8uLi9zcmMvTWltZS50cyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi4vLi4vc3JjL2luZGV4X2xpdGUudHMiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyLy4uLy4uL3R5cGVzL3N0YW5kYXJkLnRzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci8uL25vZGVfbW9kdWxlcy9qcy1jb29raWUvZGlzdC9qcy5jb29raWUubWpzIiwid2VicGFjazovL2RldnRvb2xzLXJlbW90ZS1kZWJ1Z2dlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZGV2dG9vbHMtcmVtb3RlLWRlYnVnZ2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kZXZ0b29scy1yZW1vdGUtZGVidWdnZXIvLi9zcmMvY2xpZW50L3Nkay9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBvcmlnID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2U7XHJcbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBmdW5jdGlvbihfLCBzdGFjayl7IHJldHVybiBzdGFjazsgfTtcclxuICB2YXIgZXJyID0gbmV3IEVycm9yO1xyXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgYXJndW1lbnRzLmNhbGxlZSk7XHJcbiAgdmFyIHN0YWNrID0gZXJyLnN0YWNrO1xyXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gb3JpZztcclxuICByZXR1cm4gc3RhY2s7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XHJcbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxyXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cclxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxyXG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxyXG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuICovXHJcblxyXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xyXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xyXG5cclxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXHJcbnZhciBOQU4gPSAwIC8gMDtcclxuXHJcbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cclxudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xyXG5cclxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cclxudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xyXG5cclxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cclxudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcclxuXHJcbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cclxudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XHJcblxyXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cclxudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XHJcblxyXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xyXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XHJcblxyXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xyXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XHJcblxyXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xyXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcclxuXHJcbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xyXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxuXHJcbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cclxudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXHJcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxyXG4gKiBvZiB2YWx1ZXMuXHJcbiAqL1xyXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcclxuXHJcbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cclxudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxyXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXHJcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZW1iZXJPZiBfXHJcbiAqIEBzaW5jZSAyLjQuMFxyXG4gKiBAY2F0ZWdvcnkgRGF0ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXHJcbiAqIEBleGFtcGxlXHJcbiAqXHJcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcclxuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xyXG4gKiB9LCBfLm5vdygpKTtcclxuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cclxuICovXHJcbnZhciBub3cgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxyXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcclxuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxyXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cclxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXHJcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcclxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxyXG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxyXG4gKiBpbnZvY2F0aW9uLlxyXG4gKlxyXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXHJcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXHJcbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cclxuICpcclxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXHJcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cclxuICpcclxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXHJcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQG1lbWJlck9mIF9cclxuICogQHNpbmNlIDAuMS4wXHJcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxyXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cclxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXHJcbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXHJcbiAqIEBleGFtcGxlXHJcbiAqXHJcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXHJcbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XHJcbiAqXHJcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxyXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XHJcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxyXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXHJcbiAqIH0pKTtcclxuICpcclxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cclxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XHJcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcclxuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xyXG4gKlxyXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxyXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcclxuICovXHJcbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcclxuICB2YXIgbGFzdEFyZ3MsXHJcbiAgICAgIGxhc3RUaGlzLFxyXG4gICAgICBtYXhXYWl0LFxyXG4gICAgICByZXN1bHQsXHJcbiAgICAgIHRpbWVySWQsXHJcbiAgICAgIGxhc3RDYWxsVGltZSxcclxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxyXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXHJcbiAgICAgIG1heGluZyA9IGZhbHNlLFxyXG4gICAgICB0cmFpbGluZyA9IHRydWU7XHJcblxyXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XHJcbiAgfVxyXG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xyXG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xyXG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xyXG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XHJcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xyXG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xyXG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcclxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XHJcblxyXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcclxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcclxuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xyXG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cclxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcclxuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXHJcbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xyXG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXHJcbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcclxuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXHJcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcclxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XHJcblxyXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XHJcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxyXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XHJcblxyXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcclxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXHJcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXHJcbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxyXG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xyXG4gICAgdmFyIHRpbWUgPSBub3coKTtcclxuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcclxuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcclxuICAgIH1cclxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxyXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XHJcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cclxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxyXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XHJcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xyXG4gICAgfVxyXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XHJcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcclxuICAgIH1cclxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcclxuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZmx1c2goKSB7XHJcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcclxuICAgIHZhciB0aW1lID0gbm93KCksXHJcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcclxuXHJcbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcclxuICAgIGxhc3RUaGlzID0gdGhpcztcclxuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XHJcblxyXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcclxuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtYXhpbmcpIHtcclxuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxyXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XHJcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcclxuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcclxuICByZXR1cm4gZGVib3VuY2VkO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxyXG4gKiBtZXRob2QgdG8gY2FuY2VsIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvXHJcbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxyXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXHJcbiAqIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGVcclxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxyXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXHJcbiAqXHJcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcclxuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cclxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxyXG4gKlxyXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcclxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxyXG4gKlxyXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcclxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy50aHJvdHRsZWAgYW5kIGBfLmRlYm91bmNlYC5cclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyT2YgX1xyXG4gKiBAc2luY2UgMC4xLjBcclxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV1cclxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxyXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxyXG4gKiBAZXhhbXBsZVxyXG4gKlxyXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxyXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XHJcbiAqXHJcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxyXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XHJcbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCB0aHJvdHRsZWQpO1xyXG4gKlxyXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxyXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCB0aHJvdHRsZWQuY2FuY2VsKTtcclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcclxuICB2YXIgbGVhZGluZyA9IHRydWUsXHJcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcclxuICB9XHJcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XHJcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XHJcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xyXG4gIH1cclxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xyXG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxyXG4gICAgJ21heFdhaXQnOiB3YWl0LFxyXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxyXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXHJcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyT2YgX1xyXG4gKiBAc2luY2UgMC4xLjBcclxuICogQGNhdGVnb3J5IExhbmdcclxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxyXG4gKiBAZXhhbXBsZVxyXG4gKlxyXG4gKiBfLmlzT2JqZWN0KHt9KTtcclxuICogLy8gPT4gdHJ1ZVxyXG4gKlxyXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XHJcbiAqIC8vID0+IHRydWVcclxuICpcclxuICogXy5pc09iamVjdChfLm5vb3ApO1xyXG4gKiAvLyA9PiB0cnVlXHJcbiAqXHJcbiAqIF8uaXNPYmplY3QobnVsbCk7XHJcbiAqIC8vID0+IGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xyXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcclxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZW1iZXJPZiBfXHJcbiAqIEBzaW5jZSA0LjAuMFxyXG4gKiBAY2F0ZWdvcnkgTGFuZ1xyXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cclxuICogQGV4YW1wbGVcclxuICpcclxuICogXy5pc09iamVjdExpa2Uoe30pO1xyXG4gKiAvLyA9PiB0cnVlXHJcbiAqXHJcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XHJcbiAqIC8vID0+IHRydWVcclxuICpcclxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcclxuICogLy8gPT4gZmFsc2VcclxuICpcclxuICogXy5pc09iamVjdExpa2UobnVsbCk7XHJcbiAqIC8vID0+IGZhbHNlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcclxuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyT2YgX1xyXG4gKiBAc2luY2UgNC4wLjBcclxuICogQGNhdGVnb3J5IExhbmdcclxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXHJcbiAqIEBleGFtcGxlXHJcbiAqXHJcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcclxuICogLy8gPT4gdHJ1ZVxyXG4gKlxyXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcclxuICogLy8gPT4gZmFsc2VcclxuICovXHJcbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxyXG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQG1lbWJlck9mIF9cclxuICogQHNpbmNlIDQuMC4wXHJcbiAqIEBjYXRlZ29yeSBMYW5nXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cclxuICogQGV4YW1wbGVcclxuICpcclxuICogXy50b051bWJlcigzLjIpO1xyXG4gKiAvLyA9PiAzLjJcclxuICpcclxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcclxuICogLy8gPT4gNWUtMzI0XHJcbiAqXHJcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xyXG4gKiAvLyA9PiBJbmZpbml0eVxyXG4gKlxyXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcclxuICogLy8gPT4gMy4yXHJcbiAqL1xyXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xyXG4gICAgcmV0dXJuIE5BTjtcclxuICB9XHJcbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xyXG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcclxuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xyXG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxyXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXHJcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxudmFyIEV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXZlbnQodHlwZSwgdGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuICAgIHJldHVybiBFdmVudDtcclxufSgpKTtcclxudmFyIEVycm9yRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRXJyb3JFdmVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEVycm9yRXZlbnQoZXJyb3IsIHRhcmdldCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsICdlcnJvcicsIHRhcmdldCkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5tZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICBfdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBFcnJvckV2ZW50O1xyXG59KEV2ZW50KSk7XHJcbnZhciBDbG9zZUV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENsb3NlRXZlbnQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDbG9zZUV2ZW50KGNvZGUsIHJlYXNvbiwgdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKGNvZGUgPT09IHZvaWQgMCkgeyBjb2RlID0gMTAwMDsgfVxyXG4gICAgICAgIGlmIChyZWFzb24gPT09IHZvaWQgMCkgeyByZWFzb24gPSAnJzsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsICdjbG9zZScsIHRhcmdldCkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy53YXNDbGVhbiA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMuY29kZSA9IGNvZGU7XHJcbiAgICAgICAgX3RoaXMucmVhc29uID0gcmVhc29uO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBDbG9zZUV2ZW50O1xyXG59KEV2ZW50KSk7XHJcblxyXG4vKiFcclxuICogUmVjb25uZWN0aW5nIFdlYlNvY2tldFxyXG4gKiBieSBQZWRybyBMYWRhcmlhIDxwZWRyby5sYWRhcmlhQGdtYWlsLmNvbT5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3BsYWRhcmlhL3JlY29ubmVjdGluZy13ZWJzb2NrZXRcclxuICogTGljZW5zZSBNSVRcclxuICovXHJcbnZhciBnZXRHbG9iYWxXZWJTb2NrZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIFdlYlNvY2tldCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIFdlYlNvY2tldDtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBnaXZlbiBhcmd1bWVudCBsb29rcyBsaWtlIGEgV2ViU29ja2V0IGNsYXNzXHJcbiAqL1xyXG52YXIgaXNXZWJTb2NrZXQgPSBmdW5jdGlvbiAodykgeyByZXR1cm4gdHlwZW9mIHcgIT09ICd1bmRlZmluZWQnICYmICEhdyAmJiB3LkNMT1NJTkcgPT09IDI7IH07XHJcbnZhciBERUZBVUxUID0ge1xyXG4gICAgbWF4UmVjb25uZWN0aW9uRGVsYXk6IDEwMDAwLFxyXG4gICAgbWluUmVjb25uZWN0aW9uRGVsYXk6IDEwMDAgKyBNYXRoLnJhbmRvbSgpICogNDAwMCxcclxuICAgIG1pblVwdGltZTogNTAwMCxcclxuICAgIHJlY29ubmVjdGlvbkRlbGF5R3Jvd0ZhY3RvcjogMS4zLFxyXG4gICAgY29ubmVjdGlvblRpbWVvdXQ6IDQwMDAsXHJcbiAgICBtYXhSZXRyaWVzOiBJbmZpbml0eSxcclxuICAgIG1heEVucXVldWVkTWVzc2FnZXM6IEluZmluaXR5LFxyXG4gICAgc3RhcnRDbG9zZWQ6IGZhbHNlLFxyXG4gICAgZGVidWc6IGZhbHNlLFxyXG59O1xyXG52YXIgUmVjb25uZWN0aW5nV2ViU29ja2V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmVjb25uZWN0aW5nV2ViU29ja2V0KHVybCwgcHJvdG9jb2xzLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcclxuICAgICAgICAgICAgZXJyb3I6IFtdLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBbXSxcclxuICAgICAgICAgICAgb3BlbjogW10sXHJcbiAgICAgICAgICAgIGNsb3NlOiBbXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3JldHJ5Q291bnQgPSAtMTtcclxuICAgICAgICB0aGlzLl9zaG91bGRSZWNvbm5lY3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RMb2NrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmluYXJ5VHlwZSA9ICdibG9iJztcclxuICAgICAgICB0aGlzLl9jbG9zZUNhbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VRdWV1ZSA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbidzIHJlYWR5U3RhdGUgY2hhbmdlcyB0byBDTE9TRURcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIGFuIGVycm9yIG9jY3Vyc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub25lcnJvciA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIHdoZW4gYSBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub25tZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbiBldmVudCBsaXN0ZW5lciB0byBiZSBjYWxsZWQgd2hlbiB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24ncyByZWFkeVN0YXRlIGNoYW5nZXMgdG8gT1BFTjtcclxuICAgICAgICAgKiB0aGlzIGluZGljYXRlcyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIHJlYWR5IHRvIHNlbmQgYW5kIHJlY2VpdmUgZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub25vcGVuID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9oYW5kbGVPcGVuID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9kZWJ1Zygnb3BlbiBldmVudCcpO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5fb3B0aW9ucy5taW5VcHRpbWUsIG1pblVwdGltZSA9IF9hID09PSB2b2lkIDAgPyBERUZBVUxULm1pblVwdGltZSA6IF9hO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuX2Nvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICAgICAgX3RoaXMuX3VwdGltZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9hY2NlcHRPcGVuKCk7IH0sIG1pblVwdGltZSk7XHJcbiAgICAgICAgICAgIF90aGlzLl93cy5iaW5hcnlUeXBlID0gX3RoaXMuX2JpbmFyeVR5cGU7XHJcbiAgICAgICAgICAgIC8vIHNlbmQgZW5xdWV1ZWQgbWVzc2FnZXMgKG1lc3NhZ2VzIHNlbnQgYmVmb3JlIHdlYnNvY2tldCBvcGVuIGV2ZW50KVxyXG4gICAgICAgICAgICBfdGhpcy5fbWVzc2FnZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHsgcmV0dXJuIF90aGlzLl93cy5zZW5kKG1lc3NhZ2UpOyB9KTtcclxuICAgICAgICAgICAgX3RoaXMuX21lc3NhZ2VRdWV1ZSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMub25vcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vbm9wZW4oZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLl9saXN0ZW5lcnMub3Blbi5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikgeyByZXR1cm4gX3RoaXMuX2NhbGxFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7IH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5faGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fZGVidWcoJ21lc3NhZ2UgZXZlbnQnKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLm9ubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub25tZXNzYWdlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5fbGlzdGVuZXJzLm1lc3NhZ2UuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHsgcmV0dXJuIF90aGlzLl9jYWxsRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpOyB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZUVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9kZWJ1ZygnZXJyb3IgZXZlbnQnLCBldmVudC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgX3RoaXMuX2Rpc2Nvbm5lY3QodW5kZWZpbmVkLCBldmVudC5tZXNzYWdlID09PSAnVElNRU9VVCcgPyAndGltZW91dCcgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMub25lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub25lcnJvcihldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMuX2RlYnVnKCdleGVjIGVycm9yIGxpc3RlbmVycycpO1xyXG4gICAgICAgICAgICBfdGhpcy5fbGlzdGVuZXJzLmVycm9yLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBfdGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTsgfSk7XHJcbiAgICAgICAgICAgIF90aGlzLl9jb25uZWN0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVDbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fZGVidWcoJ2Nsb3NlIGV2ZW50Jyk7XHJcbiAgICAgICAgICAgIF90aGlzLl9jbGVhclRpbWVvdXRzKCk7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5fc2hvdWxkUmVjb25uZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5vbmNsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vbmNsb3NlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5fbGlzdGVuZXJzLmNsb3NlLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBfdGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTsgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcHJvdG9jb2xzID0gcHJvdG9jb2xzO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnN0YXJ0Q2xvc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3VsZFJlY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjb25uZWN0aW5nV2ViU29ja2V0LCBcIkNPTk5FQ1RJTkdcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWNvbm5lY3RpbmdXZWJTb2NrZXQsIFwiT1BFTlwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY29ubmVjdGluZ1dlYlNvY2tldCwgXCJDTE9TSU5HXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjb25uZWN0aW5nV2ViU29ja2V0LCBcIkNMT1NFRFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUsIFwiQ09OTkVDVElOR1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWNvbm5lY3RpbmdXZWJTb2NrZXQuQ09OTkVDVElORztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLCBcIk9QRU5cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVjb25uZWN0aW5nV2ViU29ja2V0Lk9QRU47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZSwgXCJDTE9TSU5HXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlY29ubmVjdGluZ1dlYlNvY2tldC5DTE9TSU5HO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUsIFwiQ0xPU0VEXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlY29ubmVjdGluZ1dlYlNvY2tldC5DTE9TRUQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZSwgXCJiaW5hcnlUeXBlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dzID8gdGhpcy5fd3MuYmluYXJ5VHlwZSA6IHRoaXMuX2JpbmFyeVR5cGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9iaW5hcnlUeXBlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl93cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3MuYmluYXJ5VHlwZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZSwgXCJyZXRyeUNvdW50XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb3IgY29ubmVjdGlvbiByZXRyaWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCh0aGlzLl9yZXRyeUNvdW50LCAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLCBcImJ1ZmZlcmVkQW1vdW50XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIGJ5dGVzIG9mIGRhdGEgdGhhdCBoYXZlIGJlZW4gcXVldWVkIHVzaW5nIGNhbGxzIHRvIHNlbmQoKSBidXQgbm90IHlldFxyXG4gICAgICAgICAqIHRyYW5zbWl0dGVkIHRvIHRoZSBuZXR3b3JrLiBUaGlzIHZhbHVlIHJlc2V0cyB0byB6ZXJvIG9uY2UgYWxsIHF1ZXVlZCBkYXRhIGhhcyBiZWVuIHNlbnQuXHJcbiAgICAgICAgICogVGhpcyB2YWx1ZSBkb2VzIG5vdCByZXNldCB0byB6ZXJvIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2VkOyBpZiB5b3Uga2VlcCBjYWxsaW5nIHNlbmQoKSxcclxuICAgICAgICAgKiB0aGlzIHdpbGwgY29udGludWUgdG8gY2xpbWIuIFJlYWQgb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYnl0ZXMgPSB0aGlzLl9tZXNzYWdlUXVldWUucmVkdWNlKGZ1bmN0aW9uIChhY2MsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2MgKz0gbWVzc2FnZS5sZW5ndGg7IC8vIG5vdCBieXRlIHNpemVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBCbG9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjICs9IG1lc3NhZ2Uuc2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjYyArPSBtZXNzYWdlLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ5dGVzICsgKHRoaXMuX3dzID8gdGhpcy5fd3MuYnVmZmVyZWRBbW91bnQgOiAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLCBcImV4dGVuc2lvbnNcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBleHRlbnNpb25zIHNlbGVjdGVkIGJ5IHRoZSBzZXJ2ZXIuIFRoaXMgaXMgY3VycmVudGx5IG9ubHkgdGhlIGVtcHR5IHN0cmluZyBvciBhIGxpc3Qgb2ZcclxuICAgICAgICAgKiBleHRlbnNpb25zIGFzIG5lZ290aWF0ZWQgYnkgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dzID8gdGhpcy5fd3MuZXh0ZW5zaW9ucyA6ICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUsIFwicHJvdG9jb2xcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIHN1Yi1wcm90b2NvbCB0aGUgc2VydmVyIHNlbGVjdGVkO1xyXG4gICAgICAgICAqIHRoaXMgd2lsbCBiZSBvbmUgb2YgdGhlIHN0cmluZ3Mgc3BlY2lmaWVkIGluIHRoZSBwcm90b2NvbHMgcGFyYW1ldGVyIHdoZW4gY3JlYXRpbmcgdGhlXHJcbiAgICAgICAgICogV2ViU29ja2V0IG9iamVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd3MgPyB0aGlzLl93cy5wcm90b2NvbCA6ICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUsIFwicmVhZHlTdGF0ZVwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGNvbm5lY3Rpb247IHRoaXMgaXMgb25lIG9mIHRoZSBSZWFkeSBzdGF0ZSBjb25zdGFudHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3dzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3MucmVhZHlTdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5zdGFydENsb3NlZFxyXG4gICAgICAgICAgICAgICAgPyBSZWNvbm5lY3RpbmdXZWJTb2NrZXQuQ0xPU0VEXHJcbiAgICAgICAgICAgICAgICA6IFJlY29ubmVjdGluZ1dlYlNvY2tldC5DT05ORUNUSU5HO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUsIFwidXJsXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgVVJMIGFzIHJlc29sdmVkIGJ5IHRoZSBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd3MgPyB0aGlzLl93cy51cmwgOiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvbiBvciBjb25uZWN0aW9uIGF0dGVtcHQsIGlmIGFueS4gSWYgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeVxyXG4gICAgICogQ0xPU0VELCB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmdcclxuICAgICAqL1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChjb2RlLCByZWFzb24pIHtcclxuICAgICAgICBpZiAoY29kZSA9PT0gdm9pZCAwKSB7IGNvZGUgPSAxMDAwOyB9XHJcbiAgICAgICAgdGhpcy5fY2xvc2VDYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3Nob3VsZFJlY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyVGltZW91dHMoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX3dzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdjbG9zZSBlbnF1ZXVlZDogbm8gd3MgaW5zdGFuY2UnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fd3MucmVhZHlTdGF0ZSA9PT0gdGhpcy5DTE9TRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWcoJ2Nsb3NlOiBhbHJlYWR5IGNsb3NlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dzLmNsb3NlKGNvZGUsIHJlYXNvbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIG9yIGNvbm5lY3Rpb24gYXR0ZW1wdCBhbmQgY29ubmVjdHMgYWdhaW4uXHJcbiAgICAgKiBSZXNldHMgcmV0cnkgY291bnRlcjtcclxuICAgICAqL1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbiAoY29kZSwgcmVhc29uKSB7XHJcbiAgICAgICAgdGhpcy5fc2hvdWxkUmVjb25uZWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jbG9zZUNhbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3JldHJ5Q291bnQgPSAtMTtcclxuICAgICAgICBpZiAoIXRoaXMuX3dzIHx8IHRoaXMuX3dzLnJlYWR5U3RhdGUgPT09IHRoaXMuQ0xPU0VEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc2Nvbm5lY3QoY29kZSwgcmVhc29uKTtcclxuICAgICAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEVucXVldWUgc3BlY2lmaWVkIGRhdGEgdG8gYmUgdHJhbnNtaXR0ZWQgdG8gdGhlIHNlcnZlciBvdmVyIHRoZSBXZWJTb2NrZXQgY29ubmVjdGlvblxyXG4gICAgICovXHJcbiAgICBSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLl93cyAmJiB0aGlzLl93cy5yZWFkeVN0YXRlID09PSB0aGlzLk9QRU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWcoJ3NlbmQnLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5fd3Muc2VuZChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuX29wdGlvbnMubWF4RW5xdWV1ZWRNZXNzYWdlcywgbWF4RW5xdWV1ZWRNZXNzYWdlcyA9IF9hID09PSB2b2lkIDAgPyBERUZBVUxULm1heEVucXVldWVkTWVzc2FnZXMgOiBfYTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VRdWV1ZS5sZW5ndGggPCBtYXhFbnF1ZXVlZE1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnZW5xdWV1ZScsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVF1ZXVlLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBoYW5kbGVyIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZVxyXG4gICAgICovXHJcbiAgICBSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgZV8xLCBfYTtcclxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50LnR5cGVdO1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGxpc3RlbmVyc18xID0gX192YWx1ZXMobGlzdGVuZXJzKSwgbGlzdGVuZXJzXzFfMSA9IGxpc3RlbmVyc18xLm5leHQoKTsgIWxpc3RlbmVyc18xXzEuZG9uZTsgbGlzdGVuZXJzXzFfMSA9IGxpc3RlbmVyc18xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc18xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsbEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc18xXzEgJiYgIWxpc3RlbmVyc18xXzEuZG9uZSAmJiAoX2EgPSBsaXN0ZW5lcnNfMS5yZXR1cm4pKSBfYS5jYWxsKGxpc3RlbmVyc18xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1t0eXBlXSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5maWx0ZXIoZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwgIT09IGxpc3RlbmVyOyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5fZGVidWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmRlYnVnKSB7XHJcbiAgICAgICAgICAgIC8vIG5vdCB1c2luZyBzcHJlYWQgYmVjYXVzZSBjb21waWxlZCB2ZXJzaW9uIHVzZXMgU3ltYm9sc1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX19zcHJlYWQoWydSV1M+J10sIGFyZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5fZ2V0TmV4dERlbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMuX29wdGlvbnMsIF9iID0gX2EucmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yLCByZWNvbm5lY3Rpb25EZWxheUdyb3dGYWN0b3IgPSBfYiA9PT0gdm9pZCAwID8gREVGQVVMVC5yZWNvbm5lY3Rpb25EZWxheUdyb3dGYWN0b3IgOiBfYiwgX2MgPSBfYS5taW5SZWNvbm5lY3Rpb25EZWxheSwgbWluUmVjb25uZWN0aW9uRGVsYXkgPSBfYyA9PT0gdm9pZCAwID8gREVGQVVMVC5taW5SZWNvbm5lY3Rpb25EZWxheSA6IF9jLCBfZCA9IF9hLm1heFJlY29ubmVjdGlvbkRlbGF5LCBtYXhSZWNvbm5lY3Rpb25EZWxheSA9IF9kID09PSB2b2lkIDAgPyBERUZBVUxULm1heFJlY29ubmVjdGlvbkRlbGF5IDogX2Q7XHJcbiAgICAgICAgdmFyIGRlbGF5ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5fcmV0cnlDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgZGVsYXkgPVxyXG4gICAgICAgICAgICAgICAgbWluUmVjb25uZWN0aW9uRGVsYXkgKiBNYXRoLnBvdyhyZWNvbm5lY3Rpb25EZWxheUdyb3dGYWN0b3IsIHRoaXMuX3JldHJ5Q291bnQgLSAxKTtcclxuICAgICAgICAgICAgaWYgKGRlbGF5ID4gbWF4UmVjb25uZWN0aW9uRGVsYXkpIHtcclxuICAgICAgICAgICAgICAgIGRlbGF5ID0gbWF4UmVjb25uZWN0aW9uRGVsYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGVidWcoJ25leHQgZGVsYXknLCBkZWxheSk7XHJcbiAgICAgICAgcmV0dXJuIGRlbGF5O1xyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX3dhaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBfdGhpcy5fZ2V0TmV4dERlbGF5KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX2dldE5leHRVcmwgPSBmdW5jdGlvbiAodXJsUHJvdmlkZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHVybFByb3ZpZGVyID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVybFByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmxQcm92aWRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gdXJsUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEhdXJsLnRoZW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVVJMJyk7XHJcbiAgICB9O1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5fY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0TG9jayB8fCAhdGhpcy5fc2hvdWxkUmVjb25uZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY29ubmVjdExvY2sgPSB0cnVlO1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMuX29wdGlvbnMsIF9iID0gX2EubWF4UmV0cmllcywgbWF4UmV0cmllcyA9IF9iID09PSB2b2lkIDAgPyBERUZBVUxULm1heFJldHJpZXMgOiBfYiwgX2MgPSBfYS5jb25uZWN0aW9uVGltZW91dCwgY29ubmVjdGlvblRpbWVvdXQgPSBfYyA9PT0gdm9pZCAwID8gREVGQVVMVC5jb25uZWN0aW9uVGltZW91dCA6IF9jLCBfZCA9IF9hLldlYlNvY2tldCwgV2ViU29ja2V0ID0gX2QgPT09IHZvaWQgMCA/IGdldEdsb2JhbFdlYlNvY2tldCgpIDogX2Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JldHJ5Q291bnQgPj0gbWF4UmV0cmllcykge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnbWF4IHJldHJpZXMgcmVhY2hlZCcsIHRoaXMuX3JldHJ5Q291bnQsICc+PScsIG1heFJldHJpZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JldHJ5Q291bnQrKztcclxuICAgICAgICB0aGlzLl9kZWJ1ZygnY29ubmVjdCcsIHRoaXMuX3JldHJ5Q291bnQpO1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVycygpO1xyXG4gICAgICAgIGlmICghaXNXZWJTb2NrZXQoV2ViU29ja2V0KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTm8gdmFsaWQgV2ViU29ja2V0IGNsYXNzIHByb3ZpZGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dhaXQoKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fZ2V0TmV4dFVybChfdGhpcy5fdXJsKTsgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICAvLyBjbG9zZSBjb3VsZCBiZSBjYWxsZWQgYmVmb3JlIGNyZWF0aW5nIHRoZSB3c1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuX2Nsb3NlQ2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMuX2RlYnVnKCdjb25uZWN0JywgeyB1cmw6IHVybCwgcHJvdG9jb2xzOiBfdGhpcy5fcHJvdG9jb2xzIH0pO1xyXG4gICAgICAgICAgICBfdGhpcy5fd3MgPSBfdGhpcy5fcHJvdG9jb2xzXHJcbiAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXQodXJsLCBfdGhpcy5fcHJvdG9jb2xzKVxyXG4gICAgICAgICAgICAgICAgOiBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgICAgICAgICAgIF90aGlzLl93cy5iaW5hcnlUeXBlID0gX3RoaXMuX2JpbmFyeVR5cGU7XHJcbiAgICAgICAgICAgIF90aGlzLl9jb25uZWN0TG9jayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBfdGhpcy5fYWRkTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIF90aGlzLl9jb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2hhbmRsZVRpbWVvdXQoKTsgfSwgY29ubmVjdGlvblRpbWVvdXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX2hhbmRsZVRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGVidWcoJ3RpbWVvdXQgZXZlbnQnKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihuZXcgRXJyb3JFdmVudChFcnJvcignVElNRU9VVCcpLCB0aGlzKSk7XHJcbiAgICB9O1xyXG4gICAgUmVjb25uZWN0aW5nV2ViU29ja2V0LnByb3RvdHlwZS5fZGlzY29ubmVjdCA9IGZ1bmN0aW9uIChjb2RlLCByZWFzb24pIHtcclxuICAgICAgICBpZiAoY29kZSA9PT0gdm9pZCAwKSB7IGNvZGUgPSAxMDAwOyB9XHJcbiAgICAgICAgdGhpcy5fY2xlYXJUaW1lb3V0cygpO1xyXG4gICAgICAgIGlmICghdGhpcy5fd3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl93cy5jbG9zZShjb2RlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVDbG9zZShuZXcgQ2xvc2VFdmVudChjb2RlLCByZWFzb24sIHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBSZWNvbm5lY3RpbmdXZWJTb2NrZXQucHJvdG90eXBlLl9hY2NlcHRPcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2RlYnVnKCdhY2NlcHQgb3BlbicpO1xyXG4gICAgICAgIHRoaXMuX3JldHJ5Q291bnQgPSAwO1xyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX2NhbGxFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgIGlmICgnaGFuZGxlRXZlbnQnIGluIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGlzdGVuZXIuaGFuZGxlRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsaXN0ZW5lcihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX3JlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3dzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGVidWcoJ3JlbW92ZUxpc3RlbmVycycpO1xyXG4gICAgICAgIHRoaXMuX3dzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLl9oYW5kbGVPcGVuKTtcclxuICAgICAgICB0aGlzLl93cy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMuX2hhbmRsZUNsb3NlKTtcclxuICAgICAgICB0aGlzLl93cy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5faGFuZGxlTWVzc2FnZSk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuX3dzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5faGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX2FkZExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3dzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGVidWcoJ2FkZExpc3RlbmVycycpO1xyXG4gICAgICAgIHRoaXMuX3dzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLl9oYW5kbGVPcGVuKTtcclxuICAgICAgICB0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHRoaXMuX2hhbmRsZUNsb3NlKTtcclxuICAgICAgICB0aGlzLl93cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5faGFuZGxlTWVzc2FnZSk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuX3dzLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5faGFuZGxlRXJyb3IpO1xyXG4gICAgfTtcclxuICAgIFJlY29ubmVjdGluZ1dlYlNvY2tldC5wcm90b3R5cGUuX2NsZWFyVGltZW91dHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Nvbm5lY3RUaW1lb3V0KTtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdXB0aW1lVGltZW91dCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlY29ubmVjdGluZ1dlYlNvY2tldDtcclxufSgpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlY29ubmVjdGluZ1dlYlNvY2tldDtcclxuIiwiLyoqXHJcbiAqIEBjb3B5cmlnaHQgTWFpY2hvbmcgU29mdHdhcmUgTHRkLiAyMDE2IGh0dHA6Ly9tYWljaG9uZy5pdFxyXG4gKiBAZGF0ZSAyMDE2LTAxLTIwXHJcbiAqIEBhdXRob3IgTGlhbmcgPGxpYW5nQG1haWNob25nLml0PlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBudW1iZXJzID0gJzAxMjM0NTY3ODknO1xyXG52YXIgbGV0dGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcclxudmFyIHNwZWNpYWxzID0gJ34hQCMkJV4qKClfKy09W117fXw7OiwuLzw+Pyc7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgcmFuZG9tIHN0cmluZ1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqL1xyXG5mdW5jdGlvbiByYW5kb20obGVuZ3RoLCBvcHRpb25zKSB7XHJcbiAgbGVuZ3RoIHx8IChsZW5ndGggPSA4KTtcclxuICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xyXG5cclxuICB2YXIgY2hhcnMgPSAnJztcclxuICB2YXIgcmVzdWx0ID0gJyc7XHJcblxyXG4gIGlmIChvcHRpb25zID09PSB0cnVlKSB7XHJcbiAgICBjaGFycyA9IG51bWJlcnMgKyBsZXR0ZXJzICsgc3BlY2lhbHM7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJykge1xyXG4gICAgY2hhcnMgPSBvcHRpb25zO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAob3B0aW9ucy5udW1iZXJzICE9PSBmYWxzZSkge1xyXG4gICAgICBjaGFycyArPSAodHlwZW9mIG9wdGlvbnMubnVtYmVycyA9PSAnc3RyaW5nJykgPyBvcHRpb25zLm51bWJlcnMgOiBudW1iZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmxldHRlcnMgIT09IGZhbHNlKSB7XHJcbiAgICAgIGNoYXJzICs9ICh0eXBlb2Ygb3B0aW9ucy5sZXR0ZXJzID09ICdzdHJpbmcnKSA/IG9wdGlvbnMubGV0dGVycyA6IGxldHRlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuc3BlY2lhbHMpIHtcclxuICAgICAgY2hhcnMgKz0gKHR5cGVvZiBvcHRpb25zLnNwZWNpYWxzID09ICdzdHJpbmcnKSA/IG9wdGlvbnMuc3BlY2lhbHMgOiBzcGVjaWFscztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdoaWxlIChsZW5ndGggPiAwKSB7XHJcbiAgICBsZW5ndGgtLTtcclxuICAgIHJlc3VsdCArPSBjaGFyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpXTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByYW5kb20uZGVmYXVsdCA9IHJhbmRvbTtcclxuIiwiZXhwb3J0IGNvbnN0IERFVlRPT0xfT1ZFUkxBWSA9ICdfX2RldnRvb2xzLW92ZXJsYXlfXyc7XHJcblxyXG5leHBvcnQgY29uc3QgSFRNTF9UT19DQU5WQVMgPSAnaHRtbDJjYW52YXMtY29udGFpbmVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBJR05PUkVfTk9ERSA9IFtERVZUT09MX09WRVJMQVksIEhUTUxfVE9fQ0FOVkFTXTtcclxuIiwiaW1wb3J0IHsgSUdOT1JFX05PREUgfSBmcm9tICcuL2NvbnN0YW50JztcclxuXHJcbmNsYXNzIE5vZGVzIHtcclxuICAvLyBET00gbm9kZSBpZCBjb2xsZWN0aW9uXHJcbiAgbm9kZUlkcyA9IG5ldyBNYXAoKTtcclxuXHJcbiAgLy8gRE9NIG5vZGUgY29sbGVjdGlvblxyXG4gIG5vZGVzID0gbmV3IE1hcCgpO1xyXG5cclxuICBoYXNSZXF1ZXN0ZWRDaGlsZE5vZGUgPSBuZXcgU2V0KCk7XHJcblxyXG4gIGN1cnJlbnRJZCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGEgbm9kZVxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIERPTVxyXG4gICAqL1xyXG4gIGlzTm9kZShub2RlKSB7XHJcbiAgICBpZiAoIW5vZGUpIHJldHVybiBmYWxzZTtcclxuICAgIC8vIElnbm9yZSBET00gbm9kZXMgZm9yIGRlYnVnZ2luZ1xyXG4gICAgaWYgKG5vZGUuZ2V0QXR0cmlidXRlICYmIElHTk9SRV9OT0RFLmluY2x1ZGVzKG5vZGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gbm9uLXRleHQgbm9kZVxyXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gdHJ1ZTtcclxuICAgIC8vIG5vbi1lbXB0eSB0ZXh0IG5vZGVcclxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiAobm9kZS5ub2RlVmFsdWUgfHwgJycpLnRyaW0oKSAhPT0gJycpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKG5vZGVJZCwgbm9kZSkge1xyXG4gICAgdGhpcy5ub2RlSWRzLnNldChub2RlLCBub2RlSWQpO1xyXG4gICAgdGhpcy5ub2Rlcy5zZXQobm9kZUlkLCBub2RlKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLm5vZGVJZHMuY2xlYXIoKTtcclxuICAgIHRoaXMubm9kZXMuY2xlYXIoKTtcclxuICAgIHRoaXMuaGFzUmVxdWVzdGVkQ2hpbGROb2RlLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBoYXNOb2RlKG5vZGUpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVJZHMuaGFzKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBub2RlSWQgVW5pcXVlIGlkIG9mIERPTVxyXG4gICAqL1xyXG4gIGdldE5vZGVCeUlkKG5vZGVJZCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZXMuZ2V0KG5vZGVJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBET01cclxuICAgKi9cclxuICBnZXRJZEJ5Tm9kZShub2RlKSB7XHJcbiAgICBsZXQgbm9kZUlkID0gdGhpcy5ub2RlSWRzLmdldChub2RlKTtcclxuICAgIGlmIChub2RlSWQpIHJldHVybiBub2RlSWQ7XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBub2RlSWQgPSB0aGlzLmN1cnJlbnRJZCsrO1xyXG4gICAgdGhpcy5jcmVhdGUobm9kZUlkLCBub2RlKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZUlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGVjdCBjaGlsZCBub2Rlc1xyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGUgRE9NIG5vZGVcclxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVwdGggY2hpbGQgbm9kZSBkZXB0aFxyXG4gICAqL1xyXG4gIGNvbGxlY3ROb2Rlcyhub2RlLCBkZXB0aCA9IDIpIHtcclxuICAgIGNvbnN0IG5vZGVJZCA9IHRoaXMuZ2V0SWRCeU5vZGUobm9kZSk7XHJcbiAgICBjb25zdCB7IG5vZGVUeXBlLCBub2RlTmFtZSwgbG9jYWxOYW1lLCBub2RlVmFsdWUsIHBhcmVudE5vZGUsIGF0dHJpYnV0ZXMsIGNoaWxkTm9kZXMgfSA9IG5vZGU7XHJcbiAgICBjb25zdCByZXMgPSB7XHJcbiAgICAgIG5vZGVJZCxcclxuICAgICAgbm9kZVR5cGUsXHJcbiAgICAgIG5vZGVOYW1lLFxyXG4gICAgICBsb2NhbE5hbWUsXHJcbiAgICAgIG5vZGVWYWx1ZSxcclxuICAgICAgYmFja2VuZE5vZGVJZDogbm9kZUlkLFxyXG4gICAgICBjaGlsZE5vZGVDb3VudDogY2hpbGROb2Rlcy5sZW5ndGhcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgcmVzLmF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGF0dHJpYnV0ZXMpLnJlZHVjZSgocHJlLCBjdXJyKSA9PiBwcmUuY29uY2F0KGN1cnIubmFtZSwgY3Vyci52YWx1ZSksIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFyZW50Tm9kZSkge1xyXG4gICAgICByZXMucGFyZW50SWQgPSB0aGlzLmdldElkQnlOb2RlKHBhcmVudE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZXB0aCA+IDApIHtcclxuICAgICAgcmVzLmNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZE5vZGVzKG5vZGUsIGRlcHRoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGVjdCBET00gY2hpbGQgZWxlbWVudHNcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBET01cclxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVwdGhcclxuICAgKi9cclxuICBnZXRDaGlsZE5vZGVzKG5vZGUsIGRlcHRoID0gMSkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKVxyXG4gICAgICAuZmlsdGVyKHRoaXMuaXNOb2RlKVxyXG4gICAgICAubWFwKGNoaWxkTm9kZSA9PiB0aGlzLmNvbGxlY3ROb2RlcyhjaGlsZE5vZGUsIGRlcHRoIC0gMSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmb3JtZXIgc2libGluZyBub2RlIG9mIERPTVxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIERPTVxyXG4gICAqL1xyXG4gIGdldFByZXZpb3VzTm9kZShub2RlKSB7XHJcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICBpZiAoIXByZXZpb3VzTm9kZSkgcmV0dXJuO1xyXG5cclxuICAgIHdoaWxlICghdGhpcy5pc05vZGUocHJldmlvdXNOb2RlKSAmJiBwcmV2aW91c05vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHByZXZpb3VzTm9kZSA9IHByZXZpb3VzTm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByZXZpb3VzTm9kZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBOb2RlcygpO1xyXG4iLCJjb25zdCBvYmplY3RJZHMgPSBuZXcgTWFwKCk7XHJcbmNvbnN0IG9iamVjdHMgPSBuZXcgTWFwKCk7XHJcbmNvbnN0IG9yaWdpbnMgPSBuZXcgTWFwKCk7XHJcbmxldCBjdXJyZW50SWQgPSAxO1xyXG5cclxuY29uc3QgZ2V0SWRCeU9iamVjdCA9IChvYmplY3QsIG9yaWdpbikgPT4ge1xyXG4gIGxldCBpZCA9IG9iamVjdElkcy5nZXQob2JqZWN0KTtcclxuICBpZiAoaWQpIHJldHVybiBpZDtcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgaWQgPSBgJHtjdXJyZW50SWQrK31gO1xyXG4gIG9iamVjdHMuc2V0KGlkLCBvYmplY3QpO1xyXG4gIG9iamVjdElkcy5zZXQob2JqZWN0LCBpZCk7XHJcbiAgb3JpZ2lucy5zZXQoaWQsIG9yaWdpbik7XHJcbiAgcmV0dXJuIGlkO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UmVhbFR5cGUgPSAodmFsKSA9PiB7XHJcbiAgY29uc3QgcmVnID0gL1xcW29iamVjdFxccysoLiopXFxdLztcclxuICBjb25zdCByZXMgPSByZWcuZXhlYyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSk7XHJcbiAgcmV0dXJuIHJlcyA/IHJlc1sxXSA6ICcnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0U3ViVHlwZSA9ICh2YWwpID0+IHtcclxuICAvLyBET00gbm9kZSB0eXBlXHJcbiAgdHJ5IHtcclxuICAgIGlmICh2YWwgJiYgWzEsIDgsIDldLmluY2x1ZGVzKHZhbC5ub2RlVHlwZSkpIHJldHVybiAnbm9kZSc7XHJcbiAgfSBjYXRjaCB7IH07XHJcblxyXG4gIGNvbnN0IHJlYWxUeXBlID0gZ2V0UmVhbFR5cGUodmFsKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBbXHJcbiAgICAnYXJyYXknLCAnbnVsbCcsICdyZWdleHAnLCAnZGF0ZScsICdtYXAnLCAnc2V0JywgJ3dlYWttYXAnLCAnd2Vha3NldCcsXHJcbiAgICAnZXJyb3InLCAncHJveHknLCAncHJvbWlzZScsICdhcnJheWJ1ZmZlcicsICdpdGVyYXRvcicsICdnZW5lcmF0b3InLFxyXG4gIF0uaW5jbHVkZXMocmVhbFR5cGUpXHJcbiAgICA/IHJlYWxUeXBlXHJcbiAgICA6ICcnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VHlwZSA9IHZhbCA9PiAoe1xyXG4gIHR5cGU6IHR5cGVvZiB2YWwsXHJcbiAgc3VidHlwZTogZ2V0U3ViVHlwZSh2YWwpLFxyXG59KTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXcgPSAodmFsLCBvdGhlcnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IHsgbGVuZ3RoID0gNSwgb3JpZ2luID0gdmFsIH0gPSBvdGhlcnM7XHJcbiAgLy8gVE9ETzogTWFwL1NldCBkYXRhIHR5cGVzIHBlbmRpbmdcclxuICAvLyBpZiAoc3VidHlwZSA9PT0gJ21hcCcgfHwgc3VidHlwZSA9PT0gJ3NldCcpIHtcclxuXHJcbiAgLy8gfVxyXG5cclxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcclxuICBjb25zdCBwcm9wZXJ0aWVzID0gW107XHJcbiAga2V5cy5zbGljZSgwLCBsZW5ndGgpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgbGV0IHN1YlZhbDtcclxuICAgIHRyeSB7XHJcbiAgICAgIHN1YlZhbCA9IG9yaWdpbltrZXldO1xyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcblxyXG4gICAgY29uc3QgeyB0eXBlLCBzdWJ0eXBlIH0gPSBnZXRUeXBlKHN1YlZhbCk7XHJcbiAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHN1YnR5cGUgPT09ICdhcnJheScpIHtcclxuICAgICAgICBzdWJWYWwgPSBgQXJyYXkoJHtzdWJWYWwubGVuZ3RofSlgO1xyXG4gICAgICB9IGVsc2UgaWYgKHN1YnR5cGUgPT09ICdudWxsJykge1xyXG4gICAgICAgIHN1YlZhbCA9ICdudWxsJztcclxuICAgICAgfSBlbHNlIGlmIChbJ2RhdGUnLCAncmVnZXhwJ10uaW5jbHVkZXMoc3VidHlwZSkpIHtcclxuICAgICAgICBzdWJWYWwgPSBzdWJWYWwudG9TdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIGlmIChzdWJ0eXBlID09PSAnbm9kZScpIHtcclxuICAgICAgICBzdWJWYWwgPSBgIyR7c3ViVmFsLm5vZGVOYW1lfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3ViVmFsID0gc3ViVmFsLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN1YlZhbCA9IHN1YlZhbCA9PT0gdW5kZWZpbmVkID8gJ3VuZGVmaW5lZCcgOiBzdWJWYWwudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgIG5hbWU6IGtleSxcclxuICAgICAgdHlwZSxcclxuICAgICAgc3VidHlwZSxcclxuICAgICAgdmFsdWU6IHN1YlZhbCxcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgb3ZlcmZsb3c6IGtleXMubGVuZ3RoID4gbGVuZ3RoLFxyXG4gICAgcHJvcGVydGllcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdEZvcm1hdCh2YWwsIG90aGVycyA9IHt9KSB7XHJcbiAgY29uc3QgeyBvcmlnaW4gPSB2YWwsIHByZXZpZXcgPSBmYWxzZSB9ID0gb3RoZXJzO1xyXG5cclxuICBjb25zdCB7IHR5cGUsIHN1YnR5cGUgfSA9IGdldFR5cGUodmFsKTtcclxuXHJcbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnKSByZXR1cm4geyB0eXBlIH07XHJcblxyXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJykgcmV0dXJuIHsgdHlwZSwgdmFsdWU6IHZhbCwgZGVzY3JpcHRpb246IHZhbC50b1N0cmluZygpIH07XHJcblxyXG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHJldHVybiB7IHR5cGUsIHZhbHVlOiB2YWwgfTtcclxuXHJcbiAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlLFxyXG4gICAgICBvYmplY3RJZDogZ2V0SWRCeU9iamVjdCh2YWwsIG9yaWdpbiksXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB2YWwudG9TdHJpbmcoKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAoc3VidHlwZSA9PT0gJ251bGwnKSByZXR1cm4geyB0eXBlLCBzdWJ0eXBlLCB2YWx1ZTogdmFsIH07XHJcblxyXG4gIGNvbnN0IHJlcyA9IHsgdHlwZSwgc3VidHlwZSwgb2JqZWN0SWQ6IGdldElkQnlPYmplY3QodmFsLCBvcmlnaW4pIH07XHJcbiAgLy8gU29tZSBkaWZmZXJlbnQgZGF0YSB0eXBlcyBuZWVkIHRvIGJlIHByb2Nlc3NlZCBzZXBhcmF0ZWx5XHJcbiAgLy8gZnVuY3Rpb25cclxuICBpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmVzLmNsYXNzTmFtZSA9ICdGdW5jdGlvbic7XHJcbiAgICByZXMuZGVzY3JpcHRpb24gPSB2YWwudG9TdHJpbmcoKTtcclxuICAgIHByZXZpZXcgJiYgKHJlcy5wcmV2aWV3ID0ge1xyXG4gICAgICB0eXBlLFxyXG4gICAgICBzdWJ0eXBlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogdmFsLnRvU3RyaW5nKCksXHJcbiAgICAgIC4uLmdldFByZXZpZXcodmFsLCB7IG9yaWdpbiB9KSxcclxuICAgIH0pO1xyXG4gICAgLy8gQXJyYXlcclxuICB9IGVsc2UgaWYgKHN1YnR5cGUgPT09ICdhcnJheScpIHtcclxuICAgIHJlcy5jbGFzc05hbWUgPSAnQXJyYXknO1xyXG4gICAgcmVzLmRlc2NyaXB0aW9uID0gYEFycmF5KCR7dmFsLmxlbmd0aH0pYDtcclxuICAgIHByZXZpZXcgJiYgKHJlcy5wcmV2aWV3ID0ge1xyXG4gICAgICB0eXBlLFxyXG4gICAgICBzdWJ0eXBlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogYEFycmF5KCR7dmFsLmxlbmd0aH0pYCxcclxuICAgICAgLi4uZ2V0UHJldmlldyh2YWwsIHsgbGVuZ3RoOiAxMDAsIG9yaWdpbiB9KSxcclxuICAgIH0pO1xyXG4gICAgLy8gRXJyb3JcclxuICB9IGVsc2UgaWYgKHN1YnR5cGUgPT09ICdlcnJvcicpIHtcclxuICAgIHJlcy5jbGFzc05hbWUgPSAnRXJyb3InO1xyXG4gICAgcmVzLmRlc2NyaXB0aW9uID0gdmFsLnN0YWNrO1xyXG4gICAgcHJldmlldyAmJiAocmVzLnByZXZpZXcgPSB7XHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIHN1YnR5cGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB2YWwuc3RhY2ssXHJcbiAgICAgIC4uLmdldFByZXZpZXcodmFsLCB7IG9yaWdpbiB9KSxcclxuICAgIH0pO1xyXG4gICAgLy8gSFRNTCBFbGVtZW50XHJcbiAgfSBlbHNlIGlmIChzdWJ0eXBlID09PSAnbm9kZScpIHtcclxuICAgIHJlcy5jbGFzc05hbWUgPSByZXMuZGVzY3JpcHRpb24gPSB2YWwuY29uc3RydWN0b3IubmFtZTtcclxuICAgIC8vIE90aGVyc1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXMuY2xhc3NOYW1lID0gcmVzLmRlc2NyaXB0aW9uID0gdmFsLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmVzLmNsYXNzTmFtZSA9IHJlcy5kZXNjcmlwdGlvbiA9ICcnO1xyXG4gICAgfVxyXG4gICAgcHJldmlldyAmJiAocmVzLnByZXZpZXcgPSB7XHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIHN1YnR5cGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiByZXMuZGVzY3JpcHRpb24sXHJcbiAgICAgIC4uLmdldFByZXZpZXcodmFsLCB7IG9yaWdpbiB9KSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8gR2V0IG9iamVjdCBwcm9wZXJ0aWVzLCB0aGUgbGV2ZWwgY2FuIGJlIGluZmluaXRlbHkgZGVlcFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0UHJvcGVydGllcyhwYXJhbXMpIHtcclxuICAvLyBvd25Qcm9wZXJ0aWVzIGlkZW50aWZpZXMgd2hldGhlciBpdCBpcyBhIHByb3BlcnR5IG9mIHRoZSBvYmplY3QgaXRzZWxmXHJcbiAgY29uc3QgeyBhY2Nlc3NvclByb3BlcnRpZXNPbmx5LCBnZW5lcmF0ZVByZXZpZXcsIG9iamVjdElkLCBvd25Qcm9wZXJ0aWVzIH0gPSBwYXJhbXM7XHJcbiAgY29uc3QgY3VyT2JqZWN0ID0gb2JqZWN0cy5nZXQob2JqZWN0SWQpO1xyXG4gIGNvbnN0IG9yaWdpbiA9IG9yaWdpbnMuZ2V0KG9iamVjdElkKTtcclxuICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG9cclxuICBjb25zdCBwcm90byA9IGN1ck9iamVjdC5fX3Byb3RvX187XHJcblxyXG4gIC8vIElmIHRoZSBjdXJyZW50IG9iamVjdCBoYXMgYSBfX3Byb3RvX18gcHJvdG90eXBlIGFuZCBuZWVkcyB0byBvYnRhaW4gbm9uLXNlbGYgYXR0cmlidXRlcyAodGhhdCBpcywgYXR0cmlidXRlcyB1bmRlciBfX3Byb3RvX18pXHJcbiAgLy8gb3RoZXJ3aXNlIHRoZSBjdXJyZW50IG9iamVjdFxyXG4gIGNvbnN0IG5leHRPYmplY3QgPSBwcm90byAmJiAhb3duUHJvcGVydGllcyA/IHByb3RvIDogY3VyT2JqZWN0O1xyXG5cclxuICBjb25zdCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobmV4dE9iamVjdCk7XHJcblxyXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcclxuICAgIC8vIFNraXAga2V5IGlzIGFuIGF0dHJpYnV0ZSBvZiBfX3Byb3RvX19cclxuICAgIGlmIChrZXkgPT09ICdfX3Byb3RvX18nKSBjb250aW51ZTtcclxuICAgIGNvbnN0IHByb3BlcnR5ID0geyBuYW1lOiBrZXkgfTtcclxuXHJcbiAgICBsZXQgcHJvcFZhbDtcclxuICAgIHRyeSB7XHJcbiAgICAgIHByb3BWYWwgPSBvcmlnaW5ba2V5XTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy8gbm90aGluZyB0byBkb1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRPYmplY3QsIGtleSk7XHJcblxyXG4gICAgaWYgKGFjY2Vzc29yUHJvcGVydGllc09ubHkgJiYgIWRlc2NyaXB0b3IuZ2V0ICYmICFkZXNjcmlwdG9yLnNldCkgY29udGludWU7XHJcblxyXG4gICAgcHJvcGVydHkuY29uZmlndXJhYmxlID0gZGVzY3JpcHRvci5jb25maWd1cmFibGU7XHJcbiAgICBwcm9wZXJ0eS5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xyXG4gICAgcHJvcGVydHkud3JpdGFibGUgPSBkZXNjcmlwdG9yLndyaXRhYmxlO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xyXG4gICAgcHJvcGVydHkuaXNPd24gPSBvd25Qcm9wZXJ0aWVzID8gdHJ1ZSA6IHByb3RvLmhhc093blByb3BlcnR5KGtleSk7XHJcbiAgICBwcm9wZXJ0eS52YWx1ZSA9IG9iamVjdEZvcm1hdChwcm9wVmFsLCB7IHByZXZpZXc6IGdlbmVyYXRlUHJldmlldyB9KTtcclxuXHJcbiAgICByZXN1bHQucHVzaChwcm9wZXJ0eSk7XHJcbiAgfVxyXG5cclxuICAvLyBBcHBlbmQgX19wcm90b19fIHByb3RvdHlwZVxyXG4gIGlmIChwcm90bykge1xyXG4gICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICBuYW1lOiAnX19wcm90b19fJyxcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgaXNPd246IG93blByb3BlcnRpZXMsXHJcbiAgICAgIHZhbHVlOiBvYmplY3RGb3JtYXQocHJvdG8sIHsgb3JpZ2luIH0pLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vLyByZWxlYXNlIG9iamVjdFxyXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0UmVsZWFzZSh7IG9iamVjdElkIH0pIHtcclxuICBjb25zdCBvYmplY3QgPSBvYmplY3RzLmdldChvYmplY3RJZCk7XHJcbiAgb2JqZWN0cy5kZWxldGUob2JqZWN0SWQsIG9iamVjdCk7XHJcbiAgb2JqZWN0SWRzLmRlbGV0ZShvYmplY3QsIG9iamVjdElkKTtcclxuICBvcmlnaW5zLmRlbGV0ZShvYmplY3RJZCwgb3JpZ2luKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdEJ5SWQob2JqZWN0SWQpIHtcclxuICByZXR1cm4gb2JqZWN0cy5nZXQob2JqZWN0SWQpO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBnZXQgYWJzb2x1dGUgcGF0aFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWJzb2x1dGVQYXRoKHVybCkge1xyXG4gIGlmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gJyc7XHJcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICBhLmhyZWYgPSB1cmw7XHJcbiAgcmV0dXJuIGEuaHJlZjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGtleTJVcHBlckNhc2Uoa2V5KSB7XHJcbiAgcmV0dXJuIGtleS5yZXBsYWNlKC9eXFxTfC1bYS16XS9nLCBzID0+IHMudG9VcHBlckNhc2UoKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc01hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAvLyBXaGVuIHNvbWUgc2VsZWN0b3JzIGluIHRoZSBzYWZhaXIga2VybmVsIGNhbm5vdCBiZSBwYXJzZWQsIGNhbGxpbmcgdGhlIG1hdGNoZXMgbWV0aG9kIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaCBpcyBjYXB0dXJlZCBoZXJlXHJcbiAgdHJ5IHtcclxuICAgIGlmIChlbGVtZW50Lm1hdGNoZXMpIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgICAvLyBkZXByZWNhdGVkXHJcbiAgICBpZiAoZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIH1cclxuICAgIGlmIChlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3Rvcikge1xyXG4gICAgICByZXR1cm4gZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG4gIHJldHVybiAvaW9zfGlwaG9uZXxpcG9kfGFuZHJvaWQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTY3JpcHQodXJsKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LnNyYyA9IHVybDtcclxuICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgc2NyaXB0Lm9uZXJyb3IgPSByZWplY3Q7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IG5vZGVzIGZyb20gJy4uL2NvbW1vbi9ub2Rlcyc7XHJcbmltcG9ydCB7IGdldEFic29sdXRlUGF0aCwgaXNNYXRjaGVzIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcclxuaW1wb3J0IEJhc2VEb21haW4gZnJvbSAnLi9kb21haW4nO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vcHJvdG9jb2wnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ1NTIGV4dGVuZHMgQmFzZURvbWFpbiB7XHJcbiAgbmFtZXNwYWNlID0gJ0NTUyc7XHJcblxyXG4gIC8vIGNzcyBzdHlsZSBjb2xsZWN0aW9uXHJcbiAgc3R5bGVzID0gbmV3IE1hcCgpO1xyXG5cclxuICAvLyBUaGUgdW5pcXVlIGlkIG9mIHRoZSBjc3Mgc3R5bGUgc2hlZXRcclxuICBzdHlsZVNoZWV0SWQgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXR0aW5nIGNzcyBydWxlc1xyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcnVsZSBjc3Mgc2VsZWN0b3IgcnVsZXNcclxuICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgRE9NIG5vZGVcclxuICAgKi9cclxuICBzdGF0aWMgZm9ybWF0Q3NzUnVsZShydWxlLCBub2RlKSB7XHJcbiAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcnVsZS5zZWxlY3RvclRleHQuc3BsaXQoJywnKS5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgY29uc3QgdGV4dCA9IGl0ZW0udHJpbSgpO1xyXG4gICAgICBpZiAoaXNNYXRjaGVzKG5vZGUsIHRleHQpKSB7XHJcbiAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IHRleHQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNzc1RleHQgPSAvXFx7KC4qKVxcfS8uZXhlYyhydWxlLmNzc1RleHQpWzFdO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGluZGV4LFxyXG4gICAgICBjc3NSdWxlOiB7XHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgIGNzc1RleHQsXHJcbiAgICAgICAgICBjc3NQcm9wZXJ0aWVzOiBDU1MuZm9ybWF0Q3NzUHJvcGVydGllcyhjc3NUZXh0KSxcclxuICAgICAgICAgIHNob3J0aGFuZEVudHJpZXM6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3Rvckxpc3Q6IHtcclxuICAgICAgICAgIHNlbGVjdG9ycyxcclxuICAgICAgICAgIHRleHQ6IHJ1bGUuc2VsZWN0b3JUZXh0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXR0aW5nIGNzcyBwcm9wZXJ0aWVzXHJcbiAgICogQHN0YXRpY1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjc3NUZXh0IGNzcyB0ZXh077yMZWfvvJpoZWlnaHQ6MTAwcHg7d2lkdGg6MTAwcHggIWltcG9ydGFudDtcclxuICAgKi9cclxuICBzdGF0aWMgZm9ybWF0Q3NzUHJvcGVydGllcyhjc3NUZXh0ID0gJycpIHtcclxuICAgIHJldHVybiBjc3NUZXh0LnNwbGl0KCc7JykuZmlsdGVyKHZhbCA9PiB2YWwudHJpbSgpKVxyXG4gICAgICAubWFwKChzdHlsZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtuYW1lLCB2YWx1ZV0gPSBzdHlsZS5zcGxpdCgnOicpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBuYW1lLnRyaW0oKSxcclxuICAgICAgICAgIHZhbHVlOiB2YWx1ZS50cmltKCksXHJcbiAgICAgICAgICB0ZXh0OiBzdHlsZSxcclxuICAgICAgICAgIGltcG9ydGFudDogdmFsdWUuaW5jbHVkZXMoJ2ltcG9ydGFudCcpLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgc2hvcnRoYW5kRW50cmllczogW10sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgQ1NTIERvbWFpbnNcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgY29uc3Qgc3R5bGVTaGVldHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnN0eWxlU2hlZXRzKTtcclxuICAgIHN0eWxlU2hlZXRzLmZvckVhY2goKHN0eWxlKSA9PiB7XHJcbiAgICAgIGlmICghc3R5bGUuc3R5bGVTaGVldElkKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVTaGVldElkID0gdGhpcy5nZXRTdHlsZVNoZWV0SWQoKTtcclxuICAgICAgICBzdHlsZS5zdHlsZVNoZWV0SWQgPSBzdHlsZVNoZWV0SWQ7XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZVVSTCA9IGdldEFic29sdXRlUGF0aChzdHlsZS5ocmVmKTtcclxuICAgICAgICBpZiAoc291cmNlVVJMKSB7XHJcbiAgICAgICAgICB0aGlzLmZldGNoU3R5bGVTb3VyY2Uoc3R5bGVTaGVldElkLCBzb3VyY2VVUkwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZW5kKHtcclxuICAgICAgICAgIG1ldGhvZDogRXZlbnQuc3R5bGVTaGVldEFkZGVkLFxyXG4gICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgIHN0eWxlU2hlZXRJZCxcclxuICAgICAgICAgICAgICBzb3VyY2VVUkwsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1hdGNoaW5nIHN0eWxlIG9mIHRoZSBET00gbm9kZVxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ubm9kZUlkIERPTSBub2RlIGlkXHJcbiAgICovXHJcbiAgZ2V0TWF0Y2hlZFN0eWxlc0Zvck5vZGUoeyBub2RlSWQgfSkge1xyXG4gICAgY29uc3QgbWF0Y2hlZENTU1J1bGVzID0gW107XHJcbiAgICBjb25zdCBub2RlID0gbm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICAgIGNvbnN0IHN0eWxlU2hlZXRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5zdHlsZVNoZWV0cyk7XHJcbiAgICBzdHlsZVNoZWV0cy5mb3JFYWNoKChzdHlsZSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIENocm9tZSBkb2VzIG5vdCBhbGxvdyBhY2Nlc3MgdG8gY3NzIHJ1bGVzIHVuZGVyIGRpZmZlcmVudCBkb21haW4gbmFtZXMsIGhlcmUgYXJlIHRoZSBlcnJvcnMgY2FwdHVyZWRcclxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTk5MzYzMy91bmNhdWdodC1kb21leGNlcHRpb24tZmFpbGVkLXRvLXJlYWQtdGhlLWNzc3J1bGVzLXByb3BlcnR5XHJcbiAgICAgICAgQXJyYXkuZnJvbShzdHlsZS5jc3NSdWxlcykuZm9yRWFjaCgocnVsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGlzTWF0Y2hlcyhub2RlLCBydWxlLnNlbGVjdG9yVGV4dCkpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpbmRleCwgY3NzUnVsZSB9ID0gQ1NTLmZvcm1hdENzc1J1bGUocnVsZSwgbm9kZSk7XHJcbiAgICAgICAgICAgIG1hdGNoZWRDU1NSdWxlcy5wdXNoKHtcclxuICAgICAgICAgICAgICBtYXRjaGluZ1NlbGVjdG9yczogW2luZGV4XSxcclxuICAgICAgICAgICAgICBydWxlOiBjc3NSdWxlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLy8gbm90aGluZyB0byBkby5cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgeyBjc3NUZXh0IH0gPSBub2RlLnN0eWxlIHx8IHt9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWF0Y2hlZENTU1J1bGVzLFxyXG4gICAgICBpbmxpbmVTdHlsZToge1xyXG4gICAgICAgIGNzc1RleHQsXHJcbiAgICAgICAgY3NzUHJvcGVydGllczogQ1NTLmZvcm1hdENzc1Byb3BlcnRpZXMoY3NzVGV4dCksXHJcbiAgICAgICAgc2hvcnRoYW5kRW50cmllczogW10sXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGNvbXB1dGVkIHN0eWxlIG9mIGEgRE9NIG5vZGVcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLm5vZGVJZCBET00gbm9kZSBpZFxyXG4gICAqL1xyXG4gIGdldENvbXB1dGVkU3R5bGVGb3JOb2RlKHsgbm9kZUlkIH0pIHtcclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlcy5nZXROb2RlQnlJZChub2RlSWQpO1xyXG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XHJcbiAgICBsZXQgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgY29tcHV0ZWRTdHlsZSA9IEFycmF5LmZyb20oY29tcHV0ZWRTdHlsZSkubWFwKHN0eWxlID0+ICh7XHJcbiAgICAgIG5hbWU6IHN0eWxlLFxyXG4gICAgICB2YWx1ZTogY29tcHV0ZWRTdHlsZVtzdHlsZV1cclxuICAgIH0pKTtcclxuICAgIHJldHVybiB7IGNvbXB1dGVkU3R5bGUgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBzdHlsZSBjb250ZW50XHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbS5zdHlsZVNoZWV0SWQgc3R5bGUgaWRcclxuICAgKi9cclxuICBnZXRTdHlsZVNoZWV0VGV4dCh7IHN0eWxlU2hlZXRJZCB9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXh0OiB0aGlzLnN0eWxlcy5nZXQoc3R5bGVTaGVldElkKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBmZXRjaCB0aGUgc291cmNlIGNvbnRlbnQgb2YgdGhlIGR5bmFtaWMgY3NzIGZpbGVcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBzdHlsZSBmaWxlIHVybCBhZGRyZXNzXHJcbiAgICovXHJcbiAgZ2V0RHluYW1pY0xpbmsodXJsKSB7XHJcbiAgICBjb25zdCBzdHlsZVNoZWV0SWQgPSB0aGlzLmdldFN0eWxlU2hlZXRJZCgpO1xyXG4gICAgdGhpcy5mZXRjaFN0eWxlU291cmNlKHN0eWxlU2hlZXRJZCwgZ2V0QWJzb2x1dGVQYXRoKHVybCkpO1xyXG4gICAgdGhpcy5zZW5kKHtcclxuICAgICAgbWV0aG9kOiBFdmVudC5zdHlsZVNoZWV0QWRkZWQsXHJcbiAgICAgIHBhcmFtczoge1xyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgc3R5bGVTaGVldElkLFxyXG4gICAgICAgICAgc291cmNlVVJMOiB1cmwsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGZldGNoIHRoZSBzb3VyY2UgY29udGVudCBvZiB0aGUgY3NzIGZpbGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdHlsZVNoZWV0SWQgc3R5bGUgZmlsZSBpZFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgc3R5bGUgZmlsZSB1cmwgYWRkcmVzc1xyXG4gICAqL1xyXG4gIGZldGNoU3R5bGVTb3VyY2Uoc3R5bGVTaGVldElkLCB1cmwpIHtcclxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLiQkcmVxdWVzdFR5cGUgPSAnU3R5bGVzaGVldCc7XHJcbiAgICB4aHIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0eWxlcy5zZXQoc3R5bGVTaGVldElkLCB4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgIH07XHJcbiAgICB4aHIub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgdGhpcy5zdHlsZXMuc2V0KHN0eWxlU2hlZXRJZCwgJ0Nhbm5vdCBnZXQgc3R5bGUgc291cmNlIGNvZGUnKTtcclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB1bmlxdWUgaWQgb2YgdGhlIHN0eWxlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBnZXRTdHlsZVNoZWV0SWQoKSB7XHJcbiAgICB0aGlzLnN0eWxlU2hlZXRJZCArPSAxO1xyXG4gICAgcmV0dXJuIGAke3RoaXMuc3R5bGVTaGVldElkfWA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBCYXNlRG9tYWluIGZyb20gJy4vZG9tYWluJztcclxuaW1wb3J0IHsgZ2V0QWJzb2x1dGVQYXRoIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL3Byb3RvY29sJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlYnVnZ2VyIGV4dGVuZHMgQmFzZURvbWFpbiB7XHJcbiAgbmFtZXNwYWNlID0gJ0RlYnVnZ2VyJztcclxuXHJcbiAgLy8gY29sbGVjdGlvbiBvZiBqYXZhc2NyaXB0IHNjcmlwdHNcclxuICBzY3JpcHRzID0gbmV3IE1hcCgpO1xyXG5cclxuICAvLyBVbmlxdWUgaWQgZm9yIGphdmFzY3JpcHQgc2NyaXB0c1xyXG4gIHNjcmlwdElkID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGVuYWJsZSgpIHtcclxuICAgIGNvbnN0IHNjcmlwdHMgPSB0aGlzLmNvbGxlY3RTY3JpcHRzKCk7XHJcbiAgICBzY3JpcHRzLmZvckVhY2goKHsgc2NyaXB0SWQsIHVybCB9KSA9PiB7XHJcbiAgICAgIHRoaXMuc2VuZCh7XHJcbiAgICAgICAgbWV0aG9kOiBFdmVudC5zY3JpcHRQYXJzZWQsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBzY3JpcHRJZCxcclxuICAgICAgICAgIHN0YXJ0Q29sdW1uOiAwLFxyXG4gICAgICAgICAgc3RhcnRMaW5lOiAwLFxyXG4gICAgICAgICAgZW5kQ29sdW1uOiA5OTk5OTksXHJcbiAgICAgICAgICBlbmRMaW5lOiA5OTk5OTksXHJcbiAgICAgICAgICBzY3JpcHRMYW5ndWFnZTogJ0phdmFTY3JpcHQnLFxyXG4gICAgICAgICAgdXJsLFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY29udGVudCBvZiB0aGUganMgc2NyaXB0IGZpbGVcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtLnNjcmlwdElkXHJcbiAgICovXHJcbiAgZ2V0U2NyaXB0U291cmNlKHsgc2NyaXB0SWQgfSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2NyaXB0U291cmNlOiB0aGlzLmdldFNjcmlwdFNvdXJjZUJ5SWQoc2NyaXB0SWQpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZmV0Y2ggdGhlIHNvdXJjZSBjb250ZW50IG9mIHRoZSBkeW5hbWljIHNjcmlwdCBmaWxlXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgc2NyaXB0IGZpbGUgdXJsIGFkZHJlc3NcclxuICAgKi9cclxuICBnZXREeW5hbWljU2NyaXB0KHVybCkge1xyXG4gICAgY29uc3Qgc2NyaXB0SWQgPSB0aGlzLmdldFNjcmlwdElkKCk7XHJcbiAgICB0aGlzLmZldGNoU2NyaXB0U291cmNlKHNjcmlwdElkLCBnZXRBYnNvbHV0ZVBhdGgodXJsKSk7XHJcbiAgICB0aGlzLnNlbmQoe1xyXG4gICAgICBtZXRob2Q6IEV2ZW50LnNjcmlwdFBhcnNlZCxcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHNjcmlwdElkLFxyXG4gICAgICAgIHN0YXJ0Q29sdW1uOiAwLFxyXG4gICAgICAgIHN0YXJ0TGluZTogMCxcclxuICAgICAgICBlbmRDb2x1bW46IDk5OTk5OSxcclxuICAgICAgICBlbmRMaW5lOiA5OTk5OTksXHJcbiAgICAgICAgc2NyaXB0TGFuZ3VhZ2U6ICdKYXZhU2NyaXB0JyxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2xsZWN0IGFsbCBzY3JpcHRzIG9mIHRoZSBwYWdlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBjb2xsZWN0U2NyaXB0cygpIHtcclxuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XHJcbiAgICBjb25zdCByZXQgPSBbXTtcclxuICAgIHNjcmlwdEVsZW1lbnRzLmZvckVhY2goKHNjcmlwdCkgPT4ge1xyXG4gICAgICBjb25zdCBzY3JpcHRJZCA9IHRoaXMuZ2V0U2NyaXB0SWQoKTtcclxuICAgICAgY29uc3Qgc3JjID0gc2NyaXB0LmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgIGlmIChzcmMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBnZXRBYnNvbHV0ZVBhdGgoc3JjKTtcclxuICAgICAgICByZXQucHVzaCh7IHNjcmlwdElkLCB1cmwgfSk7XHJcbiAgICAgICAgdGhpcy5mZXRjaFNjcmlwdFNvdXJjZShzY3JpcHRJZCwgdXJsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggamF2YXNjcmlwdCBmaWxlIHNvdXJjZSBjb250ZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge051bWJlcn0gc2NyaXB0SWQgamF2YXNjcmlwdCBzY3JpcHQgdW5pcXVlIGlkXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBqYXZhc2NyaXB0IGZpbGUgdXJsXHJcbiAgICovXHJcbiAgZmV0Y2hTY3JpcHRTb3VyY2Uoc2NyaXB0SWQsIHVybCkge1xyXG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIuJCRyZXF1ZXN0VHlwZSA9ICdTY3JpcHQnO1xyXG4gICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5zY3JpcHRzLnNldChzY3JpcHRJZCwgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9O1xyXG4gICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2NyaXB0cy5zZXQoc2NyaXB0SWQsICdDYW5ub3QgZ2V0IHNjcmlwdCBzb3VyY2UgY29kZScpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgamF2YXNjcmlwdCBjb250ZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0uc2NyaXB0SWQgamF2YXNjcmlwdCBzY3JpcHQgdW5pcXVlIGlkXHJcbiAgICovXHJcbiAgZ2V0U2NyaXB0U291cmNlQnlJZChzY3JpcHRJZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2NyaXB0cy5nZXQoc2NyaXB0SWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHVuaXF1ZSBpZCBvZiBqYXZhc2NyaXB0IHNjcmlwdFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgZ2V0U2NyaXB0SWQoKSB7XHJcbiAgICB0aGlzLnNjcmlwdElkICs9IDE7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5zY3JpcHRJZH1gO1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0IEJhc2VEb21haW4gZnJvbSAnLi9kb21haW4nO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vcHJvdG9jb2wnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21TdG9yYWdlIGV4dGVuZHMgQmFzZURvbWFpbiB7XHJcbiAgbmFtZXNwYWNlID0gJ0RPTVN0b3JhZ2UnO1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBpc0xvY2FsU3RvcmFnZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRTdG9yYWdlKHsgaXNMb2NhbFN0b3JhZ2UgfSkge1xyXG4gICAgcmV0dXJuIGlzTG9jYWxTdG9yYWdlID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgdGhpcy5ob29rU3RvcmFnZShsb2NhbFN0b3JhZ2UpO1xyXG4gICAgdGhpcy5ob29rU3RvcmFnZShzZXNzaW9uU3RvcmFnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtLnN0b3JhZ2VJZFxyXG4gICAqL1xyXG4gIGdldERPTVN0b3JhZ2VJdGVtcyh7IHN0b3JhZ2VJZCB9KSB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gRG9tU3RvcmFnZS5nZXRTdG9yYWdlKHN0b3JhZ2VJZCk7XHJcbiAgICByZXR1cm4geyBlbnRyaWVzOiBPYmplY3QuZW50cmllcyhzdG9yYWdlKSB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbS5rZXlcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0uc3RvcmFnZUlkXHJcbiAgICovXHJcbiAgcmVtb3ZlRE9NU3RvcmFnZUl0ZW0oeyBrZXksIHN0b3JhZ2VJZCB9KSB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gRG9tU3RvcmFnZS5nZXRTdG9yYWdlKHN0b3JhZ2VJZCk7XHJcbiAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuXHJcbiAgICB0aGlzLnNlbmQoe1xyXG4gICAgICBtZXRob2Q6IEV2ZW50LmRvbVN0b3JhZ2VJdGVtUmVtb3ZlZCxcclxuICAgICAgcGFyYW1zOiB7IGtleSwgc3RvcmFnZUlkIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbS5zdG9yYWdlSWRcclxuICAgKi9cclxuICBjbGVhcih7IHN0b3JhZ2VJZCB9KSB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gRG9tU3RvcmFnZS5nZXRTdG9yYWdlKHN0b3JhZ2VJZCk7XHJcbiAgICBzdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5zZW5kKHtcclxuICAgICAgbWV0aG9kOiBFdmVudC5kb21TdG9yYWdlSXRlbXNDbGVhcmVkLFxyXG4gICAgICBwYXJhbXM6IHsgc3RvcmFnZUlkIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldERPTVN0b3JhZ2VJdGVtKHsgc3RvcmFnZUlkLCBrZXksIHZhbHVlIH0pIHtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBEb21TdG9yYWdlLmdldFN0b3JhZ2Uoc3RvcmFnZUlkKTtcclxuICAgIHN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGhvb2tTdG9yYWdlKHN0b3JhZ2UpIHtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBzdG9yYWdlSWQgPSB7XHJcbiAgICAgIGlzTG9jYWxTdG9yYWdlOiBzdG9yYWdlID09PSBsb2NhbFN0b3JhZ2UsXHJcbiAgICAgIHNlY3VyaXR5T3JpZ2luOiBsb2NhdGlvbi5vcmlnaW4sXHJcbiAgICAgIHN0b3JhZ2VLZXk6IGxvY2F0aW9uLm9yaWdpbixcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICBzZXRJdGVtOiBuYXRpdmVTZXRJdGVtLFxyXG4gICAgICByZW1vdmVJdGVtOiBuYXRpdmVSZW1vdmVJdGVtLFxyXG4gICAgICBjbGVhcjogbmF0aXZlQ2xlYXIsXHJcbiAgICB9ID0gU3RvcmFnZS5wcm90b3R5cGU7XHJcblxyXG4gICAgU3RvcmFnZS5wcm90b3R5cGUuc2V0SXRlbSA9IGZ1bmN0aW9uIChrZXksIG5ld1ZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGlzS2V5RXhpc3RlZCA9IE9iamVjdC5rZXlzKHN0b3JhZ2UpLmluY2x1ZGVzKGtleSk7XHJcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5nZXRJdGVtKGtleSk7XHJcbiAgICAgIG5hdGl2ZVNldEl0ZW0uY2FsbCh0aGlzLCBrZXksIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgIF90aGlzLnNlbmQoe1xyXG4gICAgICAgIG1ldGhvZDogaXNLZXlFeGlzdGVkID8gRXZlbnQuZG9tU3RvcmFnZUl0ZW1VcGRhdGVkIDogRXZlbnQuZG9tU3RvcmFnZUl0ZW1BZGRlZCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHN0b3JhZ2VJZCxcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIG5ld1ZhbHVlLFxyXG4gICAgICAgICAgb2xkVmFsdWUsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgU3RvcmFnZS5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgbmF0aXZlUmVtb3ZlSXRlbS5jYWxsKHRoaXMsIGtleSk7XHJcblxyXG4gICAgICBfdGhpcy5zZW5kKHtcclxuICAgICAgICBtZXRob2Q6IEV2ZW50LmRvbVN0b3JhZ2VJdGVtUmVtb3ZlZCxcclxuICAgICAgICBwYXJhbXM6IHsgc3RvcmFnZUlkLCBrZXkgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgU3RvcmFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIG5hdGl2ZUNsZWFyLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICBfdGhpcy5zZW5kKHtcclxuICAgICAgICBtZXRob2Q6IEV2ZW50LmRvbVN0b3JhZ2VJdGVtc0NsZWFyZWQsXHJcbiAgICAgICAgcGFyYW1zOiB7IHN0b3JhZ2VJZCB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcbiIsImltcG9ydCBub2RlcyBmcm9tICcuLi9jb21tb24vbm9kZXMnO1xyXG5pbXBvcnQgeyBnZXRPYmplY3RCeUlkIH0gZnJvbSAnLi4vY29tbW9uL3JlbW90ZU9iamVjdCc7XHJcbmltcG9ydCB7IERFVlRPT0xfT1ZFUkxBWSwgSUdOT1JFX05PREUgfSBmcm9tICcuLi9jb21tb24vY29uc3RhbnQnO1xyXG5pbXBvcnQgQmFzZURvbWFpbiBmcm9tICcuL2RvbWFpbic7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9wcm90b2NvbCc7XHJcbmltcG9ydCBPdmVybGF5IGZyb20gJy4vb3ZlcmxheSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb20gZXh0ZW5kcyBCYXNlRG9tYWluIHtcclxuICBuYW1lc3BhY2UgPSAnRE9NJztcclxuXHJcbiAgc2VhcmNoSWQgPSAwO1xyXG5cclxuICBzZWFyY2hSZXQgPSBuZXcgTWFwKCk7XHJcblxyXG4gIGN1cnJlbnRTZWFyY2hLZXkgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogc2V0ICQgYW5kICQkIG1ldGhvZHNcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHNldCRGdW5jdGlvbigpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93LiQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgd2luZG93LiQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuJCQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgd2luZG93LiQkID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIERvbSBkb21haW5cclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgbm9kZXMuaW5pdCgpO1xyXG4gICAgdGhpcy5ub2RlT2JzZXJ2ZXIoKTtcclxuICAgIHRoaXMuc2V0RG9tSW5zcGVjdCgpO1xyXG4gICAgRG9tLnNldCRGdW5jdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHJvb3QncyBkb2N1bWVudGF0aW9uXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGdldERvY3VtZW50KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcm9vdDogbm9kZXMuY29sbGVjdE5vZGVzKGRvY3VtZW50KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5vZGVJZCBET00gTm9kZSBJZFxyXG4gICAqL1xyXG4gIHJlcXVlc3RDaGlsZE5vZGVzKHsgbm9kZUlkIH0pIHtcclxuICAgIGlmIChub2Rlcy5oYXNSZXF1ZXN0ZWRDaGlsZE5vZGUuaGFzKG5vZGVJZCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbm9kZXMuaGFzUmVxdWVzdGVkQ2hpbGROb2RlLmFkZChub2RlSWQpO1xyXG4gICAgdGhpcy5zZW5kKHtcclxuICAgICAgbWV0aG9kOiBFdmVudC5zZXRDaGlsZE5vZGVzLFxyXG4gICAgICBwYXJhbXM6IHtcclxuICAgICAgICBwYXJlbnRJZDogbm9kZUlkLFxyXG4gICAgICAgIG5vZGVzOiBub2Rlcy5nZXRDaGlsZE5vZGVzKG5vZGVzLmdldE5vZGVCeUlkKG5vZGVJZCksIDIpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBub2RlSWQgRE9NIE5vZGUgSWRcclxuICAgKi9cclxuICBnZXRPdXRlckhUTUwoeyBub2RlSWQgfSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3V0ZXJIVE1MOiBub2Rlcy5nZXROb2RlQnlJZChub2RlSWQpLm91dGVySFRNTFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gbm9kZUlkIERPTSBOb2RlIElkXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG91dGVySFRNTFxyXG4gICAqL1xyXG4gIHNldE91dGVySFRNTCh7IG5vZGVJZCwgb3V0ZXJIVE1MIH0pIHtcclxuICAgIG5vZGVzLmdldE5vZGVCeUlkKG5vZGVJZCkub3V0ZXJIVE1MID0gb3V0ZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSB0ZXh0IHByb3BlcnR5IG9mIHRoZSBub2RlXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBub2RlSWQgRE9NIE5vZGUgSWRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBhdHRyaWJ1dGUgdGV4dO+8jGVnOiBjbGFzcz1cInRlc3RcIiBzdHlsZT1cImNvbG9yOnJlZDtcIiBkYXRhLWluZGV4PVwiMVwiXHJcbiAgICovXHJcbiAgc2V0QXR0cmlidXRlc0FzVGV4dCh7IG5vZGVJZCwgdGV4dCB9KSB7XHJcbiAgICBjb25zdCBub2RlID0gbm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICAgIGlmICh0ZXh0KSB7XHJcbiAgICAgIHRleHQuc3BsaXQoJyAnKS5maWx0ZXIoaXRlbSA9PiBpdGVtKVxyXG4gICAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBbbmFtZSwgdmFsdWVdID0gaXRlbS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUucmVwbGFjZSgvW1wiJ10vZywgJycpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEFycmF5LmZyb20obm9kZS5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4gbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9iamVjdElkIHJlbW90ZU9iamVjdCBpZFxyXG4gICAqL1xyXG4gIHJlcXVlc3ROb2RlKHsgb2JqZWN0SWQgfSkge1xyXG4gICAgY29uc3Qgbm9kZSA9IGdldE9iamVjdEJ5SWQob2JqZWN0SWQpO1xyXG4gICAgY29uc3Qgbm9kZUlkID0gbm9kZXMuZ2V0SWRCeU5vZGUobm9kZSk7XHJcbiAgICByZXR1cm4geyBub2RlSWQgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG5vZGVcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5vZGVJZCBET00gTm9kZSBJZFxyXG4gICAqL1xyXG4gIHNldEluc3BlY3RlZE5vZGUoeyBub2RlSWQgfSkge1xyXG4gICAgd2luZG93LiQwID0gbm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gbm9kZUlkIERPTSBOb2RlIElkXHJcbiAgICovXHJcbiAgcmVtb3ZlTm9kZSh7IG5vZGVJZCB9KSB7XHJcbiAgICBjb25zdCBub2RlID0gbm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICAgIG5vZGU/LnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHB1c2hOb2Rlc0J5QmFja2VuZElkc1RvRnJvbnRlbmQoeyBiYWNrZW5kTm9kZUlkcyB9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBub2RlSWRzOiBiYWNrZW5kTm9kZUlkc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgc2VhcmNoIGtleXdvcmRcclxuICAgKi9cclxuICBwZXJmb3JtU2VhcmNoKHsgcXVlcnkgfSkge1xyXG4gICAgbGV0IHJldCA9IHRoaXMuc2VhcmNoUmV0LmdldCh0aGlzLnNlYXJjaElkKTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50U2VhcmNoS2V5ICE9PSBxdWVyeSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRTZWFyY2hLZXkgPSBxdWVyeTtcclxuICAgICAgY29uc3QgYWxsTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XHJcbiAgICAgIHJldCA9IEFycmF5LmZyb20oYWxsTm9kZXMpLmZpbHRlcihub2RlID0+IHtcclxuICAgICAgICBpZiAoIW5vZGVzLmlzTm9kZShub2RlKSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBlbGVtZW50IG5vZGVcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1hdGNoIGF0dHJpYnV0ZXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgY3VyciA9IG5vZGUuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgIGlmIChjdXJyLm5hbWUuaW5jbHVkZXMocXVlcnkpIHx8IGN1cnIudmFsdWUuaW5jbHVkZXMocXVlcnkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuc2VhcmNoUmV0LmRlbGV0ZSh0aGlzLnNlYXJjaElkKTtcclxuICAgICAgdGhpcy5zZWFyY2hSZXQuc2V0KCsrdGhpcy5zZWFyY2hJZCwgcmV0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWFyY2hJZDogdGhpcy5zZWFyY2hJZCxcclxuICAgICAgcmVzdWx0Q291bnQ6IHJldC5sZW5ndGgsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBAcHVibGljXHJcbiAgKi9cclxuICBnZXRTZWFyY2hSZXN1bHRzKHsgZnJvbUluZGV4LCB0b0luZGV4LCBzZWFyY2hJZCB9KSB7XHJcbiAgICBjb25zdCByZXQgPSB0aGlzLnNlYXJjaFJldC5nZXQoc2VhcmNoSWQpLnNsaWNlKGZyb21JbmRleCwgdG9JbmRleCk7XHJcbiAgICBjb25zdCBub2RlSWRzID0gW107XHJcbiAgICByZXQuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgdGhpcy5leHBhbmROb2RlKG5vZGUpO1xyXG4gICAgICBub2RlSWRzLnB1c2gobm9kZXMuZ2V0SWRCeU5vZGUobm9kZSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHsgbm9kZUlkcyB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGRpc2NhcmRTZWFyY2hSZXN1bHRzKHsgc2VhcmNoSWQgfSkge1xyXG4gICAgdGhpcy5zZWFyY2hSZXQuZGVsZXRlKHNlYXJjaElkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXROb2RlRm9yTG9jYXRpb24oeyB4LCB5IH0pIHtcclxuICAgIGNvbnN0IGhvdmVyTm9kZSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XHJcbiAgICBpZiAoaG92ZXJOb2RlKSB7XHJcbiAgICAgIHRoaXMuZXhwYW5kTm9kZShob3Zlck5vZGUpO1xyXG4gICAgICBjb25zdCBub2RlSWQgPSBub2Rlcy5nZXRJZEJ5Tm9kZShob3Zlck5vZGUpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGZyYW1lSWQ6IDEsXHJcbiAgICAgICAgYmFja2VuZE5vZGVJZDogbm9kZUlkLFxyXG4gICAgICAgIG5vZGVJZCxcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBzZXROb2RlVmFsdWUoeyBub2RlSWQsIHZhbHVlIH0pIHtcclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlcy5nZXROb2RlQnlJZChub2RlSWQpO1xyXG4gICAgbm9kZS5ub2RlVmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXRCb3hNb2RlbCh7IG5vZGVJZCB9KSB7XHJcbiAgICBjb25zdCBub2RlID0gbm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICAgIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgY29uc3QgbWFyZ2luID0gT3ZlcmxheS5nZXRTdHlsZVByb3BlcnR5VmFsdWUoWydtYXJnaW4tdG9wJywgJ21hcmdpbi1yaWdodCcsICdtYXJnaW4tYm90dG9tJywgJ21hcmdpbi1sZWZ0J10sIHN0eWxlcyk7XHJcbiAgICBjb25zdCBwYWRkaW5nID0gT3ZlcmxheS5nZXRTdHlsZVByb3BlcnR5VmFsdWUoWydwYWRkaW5nLXRvcCcsICdwYWRkaW5nLXJpZ2h0JywgJ3BhZGRpbmctYm90dG9tJywgJ3BhZGRpbmctbGVmdCddLCBzdHlsZXMpO1xyXG4gICAgY29uc3QgYm9yZGVyID0gT3ZlcmxheS5nZXRTdHlsZVByb3BlcnR5VmFsdWUoWydib3JkZXItdG9wLXdpZHRoJywgJ2JvcmRlci1yaWdodC13aWR0aCcsICdib3JkZXItYm90dG9tLXdpZHRoJywgJ2JvcmRlci1sZWZ0LXdpZHRoJ10sIHN0eWxlcyk7XHJcblxyXG4gICAgY29uc3QgeyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbW9kZWw6IHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgbGVmdCArIGJvcmRlclszXSArIHBhZGRpbmdbM10sIHRvcCArIGJvcmRlclswXSArIHBhZGRpbmdbMF0sXHJcbiAgICAgICAgICByaWdodCAtIGJvcmRlclsxXSAtIHBhZGRpbmdbMV0sIHRvcCArIGJvcmRlclswXSArIHBhZGRpbmdbMF0sXHJcbiAgICAgICAgICByaWdodCAtIGJvcmRlclsxXSAtIHBhZGRpbmdbMV0sIGJvdHRvbSAtIGJvcmRlclsyXSAtIHBhZGRpbmdbMl0sXHJcbiAgICAgICAgICBsZWZ0ICsgYm9yZGVyWzNdICsgcGFkZGluZ1szXSwgYm90dG9tIC0gYm9yZGVyWzJdIC0gcGFkZGluZ1syXSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHBhZGRpbmc6IFtcclxuICAgICAgICAgIGxlZnQgKyBib3JkZXJbM10sIHRvcCArIGJvcmRlclswXSxcclxuICAgICAgICAgIHJpZ2h0IC0gYm9yZGVyWzFdLCB0b3AgKyBib3JkZXJbMF0sXHJcbiAgICAgICAgICByaWdodCAtIGJvcmRlclsxXSwgYm90dG9tIC0gYm9yZGVyWzJdLFxyXG4gICAgICAgICAgbGVmdCArIGJvcmRlclszXSwgYm90dG9tIC0gYm9yZGVyWzJdLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYm9yZGVyOiBbXHJcbiAgICAgICAgICBsZWZ0LCB0b3AsXHJcbiAgICAgICAgICByaWdodCwgdG9wLFxyXG4gICAgICAgICAgcmlnaHQsIGJvdHRvbSxcclxuICAgICAgICAgIGxlZnQsIGJvdHRvbSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIG1hcmdpbjogW1xyXG4gICAgICAgICAgbGVmdCAtIG1hcmdpblszXSwgdG9wIC0gbWFyZ2luWzBdLFxyXG4gICAgICAgICAgcmlnaHQgKyBtYXJnaW5bMV0sIHRvcCAtIG1hcmdpblswXSxcclxuICAgICAgICAgIHJpZ2h0ICsgbWFyZ2luWzFdLCBib3R0b20gKyBtYXJnaW5bMl0sXHJcbiAgICAgICAgICBsZWZ0IC0gbWFyZ2luWzNdLCBib3R0b20gKyBtYXJnaW5bMl0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgZXhwYW5kTm9kZShub2RlKSB7XHJcbiAgICBjb25zdCBub2RlSWRzID0gW107XHJcbiAgICB3aGlsZSAoIW5vZGVzLmhhc05vZGUobm9kZSkpIHtcclxuICAgICAgY29uc3Qgbm9kZUlkID0gbm9kZXMuZ2V0SWRCeU5vZGUobm9kZSk7XHJcbiAgICAgIG5vZGVJZHMudW5zaGlmdChub2RlSWQpO1xyXG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIG5vZGVJZHMudW5zaGlmdChub2Rlcy5nZXRJZEJ5Tm9kZShub2RlKSk7XHJcblxyXG4gICAgbm9kZUlkcy5mb3JFYWNoKChub2RlSWQpID0+IHtcclxuICAgICAgdGhpcy5yZXF1ZXN0Q2hpbGROb2Rlcyh7IG5vZGVJZCB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBzZXREb21JbnNwZWN0KCkge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBpZiAod2luZG93LiQkaW5zcGVjdE1vZGUgIT09ICdzZWFyY2hGb3JOb2RlJykgcmV0dXJuO1xyXG5cclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgcHJldmlvdXNOb2RlID0gZS50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgY29uc3QgY3VycmVudE5vZGVJZCA9IG5vZGVzLmdldElkQnlOb2RlKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgIHRoaXMuZXhwYW5kTm9kZShwcmV2aW91c05vZGUpO1xyXG5cclxuICAgICAgdGhpcy5zZW5kKHtcclxuICAgICAgICBtZXRob2Q6IEV2ZW50Lm5vZGVIaWdobGlnaHRSZXF1ZXN0ZWQsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBub2RlSWQ6IGN1cnJlbnROb2RlSWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5zZW5kKHtcclxuICAgICAgICBtZXRob2Q6IEV2ZW50Lmluc3BlY3ROb2RlUmVxdWVzdGVkLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgYmFja2VuZE5vZGVJZDogY3VycmVudE5vZGVJZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChERVZUT09MX09WRVJMQVkpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgbm9kZU9ic2VydmVyKCkge1xyXG4gICAgY29uc3QgaXNEZXZ0b29sTXV0YXRpb24gPSAoeyB0YXJnZXQsIGFkZGVkTm9kZXMsIHJlbW92ZWROb2RlcyB9KSA9PiB7XHJcbiAgICAgIGlmIChJR05PUkVfTk9ERS5pbmNsdWRlcyh0YXJnZXQuZ2V0QXR0cmlidXRlPy4oJ2NsYXNzJykpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgaWYgKElHTk9SRV9OT0RFLmluY2x1ZGVzKGFkZGVkTm9kZXNbMF0/LmdldEF0dHJpYnV0ZT8uKCdjbGFzcycpKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgIGlmIChJR05PUkVfTk9ERS5pbmNsdWRlcyhyZW1vdmVkTm9kZXNbMF0/LmdldEF0dHJpYnV0ZT8uKCdjbGFzcycpKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25MaXN0KSA9PiB7XHJcbiAgICAgIG11dGF0aW9uTGlzdC5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgYXR0cmlidXRlTmFtZSwgdGFyZ2V0LCB0eXBlLCBhZGRlZE5vZGVzLCByZW1vdmVkTm9kZXMgfSA9IG11dGF0aW9uO1xyXG5cclxuICAgICAgICAvLyBJZ25vcmUgZGV2dG9vbCBkb20gY2hhbmdlc1xyXG4gICAgICAgIGlmIChpc0RldnRvb2xNdXRhdGlvbihtdXRhdGlvbikpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZUlkID0gbm9kZXMuZ2V0SWRCeU5vZGUodGFyZ2V0KTtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlQ2hpbGROb2RlQ291bnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IEV2ZW50LmNoaWxkTm9kZUNvdW50VXBkYXRlZCxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgbm9kZUlkOiBwYXJlbnROb2RlSWQsXHJcbiAgICAgICAgICAgICAgY2hpbGROb2RlQ291bnQ6IG5vZGVzLmdldENoaWxkTm9kZXModGFyZ2V0KS5sZW5ndGgsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnY2hpbGRMaXN0JzpcclxuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgdXBkYXRlQ2hpbGROb2RlQ291bnQoKTtcclxuICAgICAgICAgICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBFdmVudC5jaGlsZE5vZGVJbnNlcnRlZCxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICBub2RlOiBub2Rlcy5jb2xsZWN0Tm9kZXMobm9kZSwgMCksXHJcbiAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVJZCxcclxuICAgICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlSWQ6IG5vZGVzLmdldElkQnlOb2RlKG5vZGVzLmdldFByZXZpb3VzTm9kZShub2RlKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZW1vdmVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHVwZGF0ZUNoaWxkTm9kZUNvdW50KCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgbm9kZUlkID0gbm9kZXMuZ2V0SWRCeU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZW5kKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogRXZlbnQuY2hpbGROb2RlUmVtb3ZlZCxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICBub2RlSWQsXHJcbiAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGVJZCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2F0dHJpYnV0ZXMnOlxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgICAgICAgIG1ldGhvZDogdmFsdWUgPyBFdmVudC5hdHRyaWJ1dGVNb2RpZmllZCA6IEV2ZW50LmF0dHJpYnV0ZVJlbW92ZWQsXHJcbiAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBub2RlSWQ6IHBhcmVudE5vZGVJZCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBhdHRyaWJ1dGVOYW1lLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgJ2NoYXJhY3RlckRhdGEnOlxyXG4gICAgICAgICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgICAgICAgIG1ldGhvZDogRXZlbnQuY2hhcmFjdGVyRGF0YU1vZGlmaWVkLFxyXG4gICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgbm9kZUlkOiBwYXJlbnROb2RlSWQsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0YXJnZXQubm9kZVZhbHVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmUgdGhlIGNoYW5nZXMgb2YgdGhlIGRvY3VtZW50XHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xyXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZURvbWFpbiB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5zb2NrZXQgPSBvcHRpb25zLnNvY2tldDtcclxuICB9XHJcblxyXG4gIGVuYWJsZSgpIHt9XHJcblxyXG4gIHNlbmQoZGF0YSkge1xyXG4gICAgdGhpcy5zb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBEb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgRG9tU3RvcmFnZSBmcm9tICcuL2RvbS1zdG9yYWdlJztcclxuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9vdmVybGF5JztcclxuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnLi9ydW50aW1lJztcclxuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlJztcclxuaW1wb3J0IE5ldHdvcmsgZnJvbSAnLi9uZXR3b3JrJztcclxuaW1wb3J0IENzcyBmcm9tICcuL2Nzcyc7XHJcbmltcG9ydCBTb3VyY2VEZWJ1Z2dlciBmcm9tICcuL2RlYnVnZ2VyJztcclxuaW1wb3J0IFNjcmVlblByZXZpZXcgZnJvbSAnLi9zY3JlZW4tcHJldmlldyc7XHJcbmltcG9ydCBwcm90b2NvbCBmcm9tICcuL3Byb3RvY29sJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENocm9tZURvbWFpbiB7XHJcbiAgcHJvdG9jb2wgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5yZWdpc3RlclByb3RvY29sKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5wcm94eUFwcGVuZENoaWxkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRpb24gQ0RQIG1ldGhvZFxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gbWVzc2FnZSBzb2NrZXQgZGF0YVxyXG4gICAqL1xyXG4gIGV4ZWN1dGUobWVzc2FnZSA9IHt9KSB7XHJcbiAgICBjb25zdCB7IGlkLCBtZXRob2QsIHBhcmFtcyB9ID0gbWVzc2FnZTtcclxuICAgIGNvbnN0IG1ldGhvZENhbGwgPSB0aGlzLnByb3RvY29sW21ldGhvZF07XHJcbiAgICBpZiAodHlwZW9mIG1ldGhvZENhbGwgIT09ICdmdW5jdGlvbicpIHJldHVybiB7IGlkIH07XHJcblxyXG4gICAgcmV0dXJuIHsgaWQsIHJlc3VsdDogbWV0aG9kQ2FsbChwYXJhbXMpIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyUHJvdG9jb2wob3B0aW9ucykge1xyXG4gICAgY29uc3QgZG9tYWlucyA9IFtcclxuICAgICAgbmV3IERvbShvcHRpb25zKSxcclxuICAgICAgbmV3IERvbVN0b3JhZ2Uob3B0aW9ucyksXHJcbiAgICAgIG5ldyBTdG9yYWdlKG9wdGlvbnMpLFxyXG4gICAgICBuZXcgT3ZlcmxheShvcHRpb25zKSxcclxuICAgICAgbmV3IFJ1bnRpbWUob3B0aW9ucyksXHJcbiAgICAgIG5ldyBQYWdlKG9wdGlvbnMpLFxyXG4gICAgICBuZXcgTmV0d29yayhvcHRpb25zKSxcclxuICAgICAgbmV3IENzcyhvcHRpb25zKSxcclxuICAgICAgbmV3IFNvdXJjZURlYnVnZ2VyKG9wdGlvbnMpLFxyXG4gICAgICBuZXcgU2NyZWVuUHJldmlldyhvcHRpb25zKSxcclxuICAgIF07XHJcblxyXG4gICAgZG9tYWlucy5mb3JFYWNoKChkb21haW4pID0+IHtcclxuICAgICAgY29uc3QgeyBuYW1lc3BhY2UgfSA9IGRvbWFpbjtcclxuICAgICAgY29uc3QgY21kcyA9IHByb3RvY29sW25hbWVzcGFjZV07XHJcbiAgICAgIGNtZHMuZm9yRWFjaCgoY21kKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm90b2NvbFtgJHtuYW1lc3BhY2V9LiR7Y21kfWBdID0gZG9tYWluW2NtZF0uYmluZChkb21haW4pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJveHlBcHBlbmRDaGlsZCgpIHtcclxuICAgIGNvbnN0IG9yaWdpbkhlYWRBcHBlbmRDaGlsZCA9IEhUTUxIZWFkRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQ7XHJcbiAgICBjb25zdCBvcmlnaW5Cb2R5QXBwZW5kQ2hpbGQgPSBIVE1MQm9keUVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkO1xyXG5cclxuICAgIGNvbnN0IGZldGNoU291cmNlID0gKG5vZGUpID0+IHtcclxuICAgICAgY29uc3QgdGFnID0gbm9kZT8udGFnTmFtZT8udG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKHRhZyA9PT0gJ2xpbmsnKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgICAgICBjb25zdCByZWwgPSBub2RlLmdldEF0dHJpYnV0ZSgncmVsJyk7XHJcbiAgICAgICAgaWYgKHVybCAmJiAoIXJlbCB8fCByZWwgPT09ICdzdHlsZXNoZWV0JykpIHtcclxuICAgICAgICAgIHRoaXMucHJvdG9jb2xbJ0NTUy5nZXREeW5hbWljTGluayddKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGFnID09PSAnc2NyaXB0Jykge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgICB0aGlzLnByb3RvY29sWydEZWJ1Z2dlci5nZXREeW5hbWljU2NyaXB0J10odXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgSFRNTEhlYWRFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbkhlYWRBcHBlbmRDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xyXG4gICAgICBmZXRjaFNvdXJjZShub2RlKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBIVE1MQm9keUVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luQm9keUFwcGVuZENoaWxkLmNhbGwodGhpcywgbm9kZSk7XHJcbiAgICAgIGZldGNoU291cmNlKG5vZGUpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcbiIsImltcG9ydCBqc0Nvb2tpZSBmcm9tICdqcy1jb29raWUnO1xyXG5pbXBvcnQgbWltZSBmcm9tICdtaW1lL2xpdGUnO1xyXG5pbXBvcnQgeyBnZXRBYnNvbHV0ZVBhdGgsIGtleTJVcHBlckNhc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xyXG5pbXBvcnQgQmFzZURvbWFpbiBmcm9tICcuL2RvbWFpbic7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9wcm90b2NvbCc7XHJcblxyXG5jb25zdCBnZXRUaW1lc3RhbXAgPSAoKSA9PiBEYXRlLm5vdygpIC8gMTAwMDtcclxuXHJcbmNvbnN0IG9yaWdpbkZldGNoID0gd2luZG93LmZldGNoO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29yayBleHRlbmRzIEJhc2VEb21haW4ge1xyXG4gIG5hbWVzcGFjZSA9ICdOZXR3b3JrJztcclxuXHJcbiAgLy8gdGhlIHVuaXF1ZSBpZCBvZiB0aGUgcmVxdWVzdFxyXG4gIHJlcXVlc3RJZCA9IDA7XHJcblxyXG4gIHJlc3BvbnNlRGF0YSA9IG5ldyBNYXAoKTtcclxuXHJcbiAgY2FjaGVSZXF1ZXN0ID0gW107XHJcblxyXG4gIGlzRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gIHNvY2tldFNlbmQgPSAoZGF0YSkgPT4ge1xyXG4gICAgdGhpcy5jYWNoZVJlcXVlc3QucHVzaChkYXRhKTtcclxuICAgIGlmICh0aGlzLmlzRW5hYmxlKSB7XHJcbiAgICAgIHRoaXMuc2VuZChkYXRhKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMuaG9va1hocigpO1xyXG4gICAgdGhpcy5ob29rRmV0Y2goKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdCBodHRwIHJlc3BvbnNlIGhlYWRlclxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIGh0dHAgcmVzcG9uc2UgaGVhZGVyIGVn77yaY29udGVudC10eXBlOiBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XFxuIGRhdGU6IFdlZCwgMTUgU2VwIDIwMjEgMDc6MjA6MjYgR01UXHJcbiAgICovXHJcbiAgc3RhdGljIGZvcm1hdFJlc3BvbnNlSGVhZGVyKGhlYWRlcikge1xyXG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xyXG4gICAgaGVhZGVyLnNwbGl0KCdcXG4nKS5maWx0ZXIodmFsID0+IHZhbClcclxuICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBba2V5LCB2YWxdID0gaXRlbS5zcGxpdCgnOicpO1xyXG4gICAgICAgIGhlYWRlcnNba2V5MlVwcGVyQ2FzZShrZXkpXSA9IHZhbDtcclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gaGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZGVmYXVsdCBodHRwIHJlcXVlc3QgaGVhZGVyLCBjdXJyZW50bHkgb25seSB1YSwgY29va2llXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXREZWZhdWx0SGVhZGVycygpIHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICdVc2VyLUFnZW50JzogbmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgIH07XHJcbiAgICBpZiAoZG9jdW1lbnQuY29va2llKSB7XHJcbiAgICAgIGhlYWRlcnMuQ29va2llID0gZG9jdW1lbnQuY29va2llO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGVuYWJsZSgpIHtcclxuICAgIHRoaXMuaXNFbmFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5jYWNoZVJlcXVlc3QuZm9yRWFjaChkYXRhID0+IHRoaXMuc2VuZChkYXRhKSk7XHJcbiAgICB0aGlzLnJlcG9ydEltYWdlTmV0d29yaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG5ldHdvcmsgcmVzcG9uc2UgY29udGVudFxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gcGFyYW0ucmVxdWVzdElkXHJcbiAgICovXHJcbiAgZ2V0UmVzcG9uc2VCb2R5KHsgcmVxdWVzdElkIH0pIHtcclxuICAgIGxldCBib2R5ID0gJyc7XHJcbiAgICBsZXQgYmFzZTY0RW5jb2RlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlRGF0YS5nZXQocmVxdWVzdElkKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xyXG4gICAgICBib2R5ID0gcmVzcG9uc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBib2R5ID0gcmVzcG9uc2U/LmRhdGE7XHJcbiAgICAgIGJhc2U2NEVuY29kZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGJvZHksIGJhc2U2NEVuY29kZWQgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXRDb29raWVzKCkge1xyXG4gICAgY29uc3QgY29va2llcyA9IGpzQ29va2llLmdldCgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29va2llczogT2JqZWN0LmtleXMoY29va2llcykubWFwKG5hbWUgPT4gKHsgbmFtZSwgdmFsdWU6IGNvb2tpZXNbbmFtZV0gfSkpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbS5uYW1lIGNvb2tpZSBuYW1lXHJcbiAgICovXHJcbiAgZGVsZXRlQ29va2llcyh7IG5hbWUgfSkge1xyXG4gICAganNDb29raWUucmVtb3ZlKG5hbWUsIHsgcGF0aDogJy8nIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbS5uYW1lIGNvb2tpZSBuYW1lXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtLnZhbHVlIGNvb2tpZSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbS5wYXRoIHBhdGhcclxuICAgKi9cclxuICBzZXRDb29raWUoeyBuYW1lLCB2YWx1ZSwgcGF0aCB9KSB7XHJcbiAgICBqc0Nvb2tpZS5zZXQobmFtZSwgdmFsdWUsIHsgcGF0aCB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgdW5pcXVlIGlkIG9mIHRoZSByZXF1ZXN0XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBnZXRSZXF1ZXN0SWQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RJZCArPSAxO1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdElkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJjZXB0IFhNTEh0dHBSZXF1ZXN0IHJlcXVlc3RcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGhvb2tYaHIoKSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXM7XHJcbiAgICBjb25zdCB4aHJTZW5kID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQ7XHJcbiAgICBjb25zdCB4aHJPcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcbiAgICBjb25zdCB4aHJTZXRSZXF1ZXN0SGVhZGVyID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICguLi5wYXJhbXMpIHtcclxuICAgICAgY29uc3QgW21ldGhvZCwgdXJsXSA9IHBhcmFtcztcclxuICAgICAgdGhpcy4kJHJlcXVlc3QgPSB7XHJcbiAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgIHVybDogZ2V0QWJzb2x1dGVQYXRoKHVybCksXHJcbiAgICAgICAgcmVxdWVzdElkOiBpbnN0YW5jZS5nZXRSZXF1ZXN0SWQoKSxcclxuICAgICAgICBoZWFkZXJzOiBOZXR3b3JrLmdldERlZmF1bHRIZWFkZXJzKCksXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB4aHJPcGVuLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgeGhyU2VuZC5jYWxsKHRoaXMsIGRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuJCRyZXF1ZXN0O1xyXG4gICAgICBjb25zdCB7IHJlcXVlc3RJZCwgdXJsLCBtZXRob2QgfSA9IHJlcXVlc3Q7XHJcbiAgICAgIGlmIChtZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ3Bvc3QnKSB7XHJcbiAgICAgICAgcmVxdWVzdC5wb3N0RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgcmVxdWVzdC5oYXNQb3N0RGF0YSA9ICEhZGF0YTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW5zdGFuY2Uuc29ja2V0U2VuZCh7XHJcbiAgICAgICAgbWV0aG9kOiBFdmVudC5yZXF1ZXN0V2lsbEJlU2VudCxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHJlcXVlc3RJZCxcclxuICAgICAgICAgIHJlcXVlc3QsXHJcbiAgICAgICAgICBkb2N1bWVudFVSTDogbG9jYXRpb24uaHJlZixcclxuICAgICAgICAgIHRpbWVzdGFtcDogZ2V0VGltZXN0YW1wKCksXHJcbiAgICAgICAgICB3YWxsVGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICAgIHR5cGU6IHRoaXMuJCRyZXF1ZXN0VHlwZSB8fCAnWEhSJyxcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIEFmdGVyIHRoZSByZXF1ZXN0IGlzIGNvbXBsZXRlZCwgZ2V0IHRoZSBodHRwIHJlc3BvbnNlIGhlYWRlclxyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gTmV0d29yay5mb3JtYXRSZXNwb25zZUhlYWRlcihoZWFkZXJzKTtcclxuICAgICAgICAgIGluc3RhbmNlLnNlbmROZXR3b3JrRXZlbnQoe1xyXG4gICAgICAgICAgICByZXF1ZXN0SWQsXHJcbiAgICAgICAgICAgIHVybDogZ2V0QWJzb2x1dGVQYXRoKHVybCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcclxuICAgICAgICAgICAgYmxvY2tlZENvb2tpZXM6IFtdLFxyXG4gICAgICAgICAgICBoZWFkZXJzVGV4dDogaGVhZGVycyxcclxuICAgICAgICAgICAgdHlwZTogdGhpcy4kJHJlcXVlc3RUeXBlIHx8ICdYSFInLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICAgIGVuY29kZWREYXRhTGVuZ3RoOiBOdW1iZXIodGhpcy5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1MZW5ndGgnKSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgLy8gQ2FjaGUgdGhlIHJlc3BvbnNlIHJlc3VsdCBhZnRlciB0aGUgcmVxdWVzdCBlbmRzLCB3aGljaCB3aWxsIGJlIHVzZWQgd2hlbiBnZXRSZXNwb25zZUJvZHlcclxuICAgICAgICAgIGluc3RhbmNlLnJlc3BvbnNlRGF0YS5zZXQodGhpcy4kJHJlcXVlc3QucmVxdWVzdElkLCB0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy4kJHJlcXVlc3QpIHtcclxuICAgICAgICB0aGlzLiQkcmVxdWVzdC5oZWFkZXJzW2tleV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHhoclNldFJlcXVlc3RIZWFkZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmNlcHQgRmV0Y2ggcmVxdWVzdHNcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGhvb2tGZXRjaCgpIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcztcclxuICAgIHdpbmRvdy5mZXRjaCA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBpbml0Q29uZmlnID0ge30pIHtcclxuICAgICAgbGV0IHVybDtcclxuICAgICAgbGV0IG1ldGhvZDtcclxuICAgICAgbGV0IGRhdGEgPSAnJztcclxuICAgICAgLy8gV2hlbiByZXF1ZXN0IGlzIGEgc3RyaW5nLCBpdCBpcyB0aGUgcmVxdWVzdGVkIHVybFxyXG4gICAgICBpZiAodHlwZW9mIHJlcXVlc3QgPT09ICdzdHJpbmcnIHx8IHJlcXVlc3QgaW5zdGFuY2VvZiBVUkwpIHtcclxuICAgICAgICB1cmwgPSByZXF1ZXN0O1xyXG4gICAgICAgIG1ldGhvZCA9IGluaXRDb25maWcubWV0aG9kIHx8ICdnZXQnO1xyXG4gICAgICAgIGRhdGEgPSBpbml0Q29uZmlnLmJvZHk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlIGl0IGlzIGEgUmVxdWVzdCBvYmplY3RcclxuICAgICAgICAoeyB1cmwsIG1ldGhvZCB9ID0gcmVxdWVzdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVybCA9IGdldEFic29sdXRlUGF0aCh1cmwpO1xyXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSBpbnN0YW5jZS5nZXRSZXF1ZXN0SWQoKTtcclxuICAgICAgY29uc3Qgc2VuZFJlcXVlc3QgPSB7XHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIG1ldGhvZCxcclxuICAgICAgICByZXF1ZXN0SWQsXHJcbiAgICAgICAgaGVhZGVyczogTmV0d29yay5nZXREZWZhdWx0SGVhZGVycygpLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAncG9zdCcpIHtcclxuICAgICAgICBzZW5kUmVxdWVzdC5wb3N0RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgc2VuZFJlcXVlc3QuaGFzUG9zdERhdGEgPSAhIWRhdGE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc3RhbmNlLnNvY2tldFNlbmQoe1xyXG4gICAgICAgIG1ldGhvZDogRXZlbnQucmVxdWVzdFdpbGxCZVNlbnQsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICByZXF1ZXN0SWQsXHJcbiAgICAgICAgICBkb2N1bWVudFVSTDogbG9jYXRpb24uaHJlZixcclxuICAgICAgICAgIHRpbWVzdGFtcDogZ2V0VGltZXN0YW1wKCksXHJcbiAgICAgICAgICB3YWxsVGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICAgIHR5cGU6ICdGZXRjaCcsXHJcbiAgICAgICAgICByZXF1ZXN0OiBzZW5kUmVxdWVzdCxcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IG9yaVJlc3BvbnNlO1xyXG4gICAgICByZXR1cm4gb3JpZ2luRmV0Y2gocmVxdWVzdCwgaW5pdENvbmZpZykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvLyBUZW1wb3JhcmlseSBzYXZlIHRoZSByYXcgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3RcclxuICAgICAgICBvcmlSZXNwb25zZSA9IHJlc3BvbnNlO1xyXG5cclxuICAgICAgICBjb25zdCB7IGhlYWRlcnMsIHN0YXR1cywgc3RhdHVzVGV4dCB9ID0gcmVzcG9uc2U7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0ge307XHJcbiAgICAgICAgbGV0IGhlYWRlcnNUZXh0ID0gJyc7XHJcbiAgICAgICAgaGVhZGVycy5mb3JFYWNoKCh2YWwsIGtleSkgPT4ge1xyXG4gICAgICAgICAga2V5ID0ga2V5MlVwcGVyQ2FzZShrZXkpO1xyXG4gICAgICAgICAgcmVzcG9uc2VIZWFkZXJzW2tleV0gPSB2YWw7XHJcbiAgICAgICAgICBoZWFkZXJzVGV4dCArPSBgJHtrZXl9OiAke3ZhbH1cXHJcXG5gO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbnN0YW5jZS5zZW5kTmV0d29ya0V2ZW50KHtcclxuICAgICAgICAgIHVybCxcclxuICAgICAgICAgIHJlcXVlc3RJZCxcclxuICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgIHN0YXR1c1RleHQsXHJcbiAgICAgICAgICBoZWFkZXJzVGV4dCxcclxuICAgICAgICAgIHR5cGU6ICdGZXRjaCcsXHJcbiAgICAgICAgICBibG9ja2VkQ29va2llczogW10sXHJcbiAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXHJcbiAgICAgICAgICBlbmNvZGVkRGF0YUxlbmd0aDogTnVtYmVyKGhlYWRlcnMuZ2V0KCdDb250ZW50LUxlbmd0aCcpKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XHJcbiAgICAgICAgaWYgKFsnYXBwbGljYXRpb24vanNvbicsICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JywgJ3RleHQvcGxhaW4nLCAndGV4dC9odG1sJywgJ3RleHQvY3NzJ10uc29tZSh0eXBlID0+IGNvbnRlbnRUeXBlLmluY2x1ZGVzKHR5cGUpKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmNsb25lKCkudGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlQm9keSkgPT4ge1xyXG4gICAgICAgICAgaW5zdGFuY2UucmVzcG9uc2VEYXRhLnNldChyZXF1ZXN0SWQsIHJlc3BvbnNlQm9keSk7XHJcbiAgICAgICAgICAvLyBSZXR1cm5zIHRoZSByYXcgcmVzcG9uc2UgdG8gdGhlIHJlcXVlc3RcclxuICAgICAgICAgIHJldHVybiBvcmlSZXNwb25zZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGluc3RhbmNlLnNlbmROZXR3b3JrRXZlbnQoe1xyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIHJlcXVlc3RJZCxcclxuICAgICAgICAgICAgYmxvY2tlZENvb2tpZXM6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiAnRmV0Y2gnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIHJlcG9ydCBpbWFnZSByZXF1ZXN0IGZvciBOZXR3b3JrIHBhbmVsXHJcbiAgICovXHJcbiAgcmVwb3J0SW1hZ2VOZXR3b3JrKCkge1xyXG4gICAgY29uc3QgaW1nVXJscyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBjb25zdCByZXBvcnROZXR3b3JrID0gKHVybHMpID0+IHtcclxuICAgICAgdXJscy5mb3JFYWNoKGFzeW5jICh1cmwpID0+IHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSB0aGlzLmdldFJlcXVlc3RJZCgpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgeyBiYXNlNjQgfSA9IGF3YWl0IG9yaWdpbkZldGNoKFxyXG4gICAgICAgICAgICBgJHtwcm9jZXNzLmVudi5ERUJVR19IT1NUfS9yZW1vdGUvZGVidWcvaW1hZ2VfYmFzZTY0P3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWBcclxuICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xyXG5cclxuICAgICAgICAgIHRoaXMucmVzcG9uc2VEYXRhLnNldChyZXF1ZXN0SWQsIHtcclxuICAgICAgICAgICAgZGF0YTogYmFzZTY0LFxyXG4gICAgICAgICAgICBiYXNlNjRFbmNvZGVkOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgICAgbWV0aG9kOiBFdmVudC5yZXF1ZXN0V2lsbEJlU2VudCxcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICByZXF1ZXN0SWQsXHJcbiAgICAgICAgICAgIGRvY3VtZW50VVJMOiBsb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IGdldFRpbWVzdGFtcCgpLFxyXG4gICAgICAgICAgICB3YWxsVGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgdHlwZTogJ0ltYWdlJyxcclxuICAgICAgICAgICAgcmVxdWVzdDogeyBtZXRob2Q6ICdHRVQnLCB1cmwgfSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kTmV0d29ya0V2ZW50KHtcclxuICAgICAgICAgIHVybCxcclxuICAgICAgICAgIHJlcXVlc3RJZCxcclxuICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgc3RhdHVzVGV4dDogJycsXHJcbiAgICAgICAgICBoZWFkZXJzVGV4dDogJycsXHJcbiAgICAgICAgICB0eXBlOiAnSW1hZ2UnLFxyXG4gICAgICAgICAgYmxvY2tlZENvb2tpZXM6IFtdLFxyXG4gICAgICAgICAgZW5jb2RlZERhdGFMZW5ndGg6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRJbWFnZVVybHMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHVybHMgPSBbXTtcclxuICAgICAgT2JqZWN0LnZhbHVlcyhkb2N1bWVudC5pbWFnZXMpLmZvckVhY2goaW1hZ2UgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgaWYgKCFpbWdVcmxzLmhhcyh1cmwpKSB7XHJcbiAgICAgICAgICBpbWdVcmxzLmFkZCh1cmwpO1xyXG4gICAgICAgICAgdXJscy5wdXNoKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHVybHM7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyQm9keU11dGF0aW9uID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICBjb25zdCB1cmxzID0gZ2V0SW1hZ2VVcmxzKCk7XHJcbiAgICAgICAgaWYgKHVybHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXBvcnROZXR3b3JrKHVybHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlcG9ydE5ldHdvcmsoZ2V0SW1hZ2VVcmxzKCkpO1xyXG4gICAgb2JzZXJ2ZXJCb2R5TXV0YXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc2VuZE5ldHdvcmtFdmVudChwYXJhbXMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgcmVxdWVzdElkLCBoZWFkZXJzLCBoZWFkZXJzVGV4dCwgdHlwZSwgdXJsLFxyXG4gICAgICBzdGF0dXMsIHN0YXR1c1RleHQsIGVuY29kZWREYXRhTGVuZ3RoLFxyXG4gICAgfSA9IHBhcmFtcztcclxuXHJcbiAgICB0aGlzLnNvY2tldFNlbmQoe1xyXG4gICAgICBtZXRob2Q6IEV2ZW50LnJlc3BvbnNlUmVjZWl2ZWRFeHRyYUluZm8sXHJcbiAgICAgIHBhcmFtczogeyByZXF1ZXN0SWQsIGhlYWRlcnMsIGJsb2NrZWRDb29raWVzOiBbXSwgaGVhZGVyc1RleHQgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc29ja2V0U2VuZCh7XHJcbiAgICAgIG1ldGhvZDogRXZlbnQucmVzcG9uc2VSZWNlaXZlZCxcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgdHlwZSxcclxuICAgICAgICByZXF1ZXN0SWQsXHJcbiAgICAgICAgdGltZXN0YW1wOiBnZXRUaW1lc3RhbXAoKSxcclxuICAgICAgICByZXNwb25zZTogeyB1cmwsIHN0YXR1cywgc3RhdHVzVGV4dCwgaGVhZGVycywgbWltZVR5cGU6IG1pbWUuZ2V0VHlwZSh1cmwpIH1cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAvLyBsb2FkaW5nRmluaXNoZWQgZXZlbnQgZGVsYXkgcmVwb3J0XHJcbiAgICAgIHRoaXMuc29ja2V0U2VuZCh7XHJcbiAgICAgICAgbWV0aG9kOiBFdmVudC5sb2FkaW5nRmluaXNoZWQsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICByZXF1ZXN0SWQsXHJcbiAgICAgICAgICBlbmNvZGVkRGF0YUxlbmd0aCxcclxuICAgICAgICAgIHRpbWVzdGFtcDogZ2V0VGltZXN0YW1wKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LCAxMCk7XHJcbiAgfVxyXG59O1xyXG4iLCJpbXBvcnQgbm9kZXMgZnJvbSAnLi4vY29tbW9uL25vZGVzJztcclxuaW1wb3J0IEJhc2VEb21haW4gZnJvbSAnLi9kb21haW4nO1xyXG5pbXBvcnQgeyBERVZUT09MX09WRVJMQVkgfSBmcm9tICcuLi9jb21tb24vY29uc3RhbnQnO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vcHJvdG9jb2wnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZlcmxheSBleHRlbmRzIEJhc2VEb21haW4ge1xyXG4gIG5hbWVzcGFjZSA9ICdPdmVybGF5JztcclxuXHJcbiAgaGlnaGxpZ2h0Q29uZmlnID0ge307XHJcblxyXG4gIGhpZ2hsaWdodEJveCA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIGZvcm1hdE51bWJlcihudW0pIHtcclxuICAgIGlmIChudW0gJSAxID09PSAwKSByZXR1cm4gbnVtO1xyXG5cclxuICAgIGNvbnN0IGZpeGVkID0gbnVtLnRvRml4ZWQoMik7XHJcbiAgICBjb25zdCBudW1BcnIgPSBmaXhlZC5zcGxpdCgnLicpO1xyXG4gICAgaWYgKG51bUFyclsxXSA9PT0gJzAwJykgcmV0dXJuIG51bUFyclswXTtcclxuICAgIHJldHVybiBmaXhlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dHJhY3QgYXR0cmlidXRlIHZhbHVlIGZyb20gc3R5bGVcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIGdldFN0eWxlUHJvcGVydHlWYWx1ZShwcm9wZXJ0aWVzLCBzdHlsZXMpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BlcnRpZXMpKSB7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzLm1hcCgoa2V5KSA9PiBOdW1iZXIoc3R5bGVzW2tleV0ucmVwbGFjZSgncHgnLCAnJykpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTnVtYmVyKHN0eWxlc1twcm9wZXJ0aWVzXS5yZXBsYWNlKCdweCcsICcnKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZ2JhIGNvbG9yXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZ2JhKHsgciwgZywgYiwgYSB9ID0ge30pIHtcclxuICAgIHJldHVybiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAke2F9KWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgdGhpcy5jcmVhdGVIaWdobGlnaHRCb3goKTtcclxuICAgIHRoaXMubm9kZUhpZ2hsaWdodFJlcXVlc3RlZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbS5ub2RlSWQgbm9kZSB1bmlxdWUgaWRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0ubm9kZUVsZW1lbnRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0uaGlnaGxpZ2h0Q29uZmlnXHJcbiAgICovXHJcbiAgaGlnaGxpZ2h0Tm9kZSh7IG5vZGVJZCwgbm9kZUVsZW1lbnQsIGhpZ2hsaWdodENvbmZpZyB9KSB7XHJcbiAgICBjb25zdCBub2RlID0gbm9kZUVsZW1lbnQgfHwgbm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICAgIGlmIChcclxuICAgICAgIW5vZGUgfHxcclxuICAgICAgW05vZGUuVEVYVF9OT0RFLCBOb2RlLkNPTU1FTlRfTk9ERSwgTm9kZS5ET0NVTUVOVF9UWVBFX05PREVdLmluY2x1ZGVzKG5vZGUubm9kZVR5cGUpIHx8XHJcbiAgICAgIFsnTElOSycsICdTQ1JJUFQnLCAnSEVBRCddLmluY2x1ZGVzKG5vZGUubm9kZU5hbWUpIHx8XHJcbiAgICAgICEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUhpZ2hsaWdodEJveChoaWdobGlnaHRDb25maWcsIG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGhpZGVIaWdobGlnaHQoKSB7XHJcbiAgICBpZiAodGhpcy5oaWdobGlnaHRCb3guY29udGFpbmVyQm94KSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Qm94LmNvbnRhaW5lckJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGRvbSBpbnNwZWN0aW9uIG1vZGVcclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtLm1vZGUgaW5zcGVjdCBtb2RlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtLmhpZ2hsaWdodENvbmZpZ1xyXG4gICAqL1xyXG4gIHNldEluc3BlY3RNb2RlKHsgbW9kZSwgaGlnaGxpZ2h0Q29uZmlnIH0pIHtcclxuICAgIHdpbmRvdy4kJGluc3BlY3RNb2RlID0gbW9kZTtcclxuICAgIHRoaXMuaGlnaGxpZ2h0Q29uZmlnID0gaGlnaGxpZ2h0Q29uZmlnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG4gIGV4cGFuZE5vZGUobm9kZSkge1xyXG4gICAgY29uc3Qgbm9kZUlkcyA9IFtdO1xyXG4gICAgd2hpbGUgKCFub2Rlcy5oYXNOb2RlKG5vZGUpKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVJZCA9IG5vZGVzLmdldElkQnlOb2RlKG5vZGUpO1xyXG4gICAgICBub2RlSWRzLnVuc2hpZnQobm9kZUlkKTtcclxuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBub2RlSWRzLnVuc2hpZnQobm9kZXMuZ2V0SWRCeU5vZGUobm9kZSkpO1xyXG5cclxuICAgIG5vZGVJZHMuZm9yRWFjaCgobm9kZUlkKSA9PiB7XHJcbiAgICAgIHRoaXMucmVxdWVzdENoaWxkTm9kZXMoeyBub2RlSWQgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcmVxdWVzdENoaWxkTm9kZXMoeyBub2RlSWQgfSkge1xyXG4gICAgaWYgKG5vZGVzLmhhc1JlcXVlc3RlZENoaWxkTm9kZS5oYXMobm9kZUlkKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBub2Rlcy5oYXNSZXF1ZXN0ZWRDaGlsZE5vZGUuYWRkKG5vZGVJZCk7XHJcbiAgICB0aGlzLnNlbmQoe1xyXG4gICAgICBtZXRob2Q6IEV2ZW50LnNldENoaWxkTm9kZXMsXHJcbiAgICAgIHBhcmFtczoge1xyXG4gICAgICAgIHBhcmVudElkOiBub2RlSWQsXHJcbiAgICAgICAgbm9kZXM6IG5vZGVzLmdldENoaWxkTm9kZXMobm9kZXMuZ2V0Tm9kZUJ5SWQobm9kZUlkKSwgMilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIG5vZGVIaWdobGlnaHRSZXF1ZXN0ZWQoKSB7XHJcbiAgICBjb25zdCBoaWdobGlnaHQgPSAoZSkgPT4ge1xyXG4gICAgICBpZiAod2luZG93LiQkaW5zcGVjdE1vZGUgIT09ICdzZWFyY2hGb3JOb2RlJykgcmV0dXJuO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBsZXQgeyB0YXJnZXQgfSA9IGU7XHJcblxyXG4gICAgICBpZiAoZS50b3VjaGVzKSB7XHJcbiAgICAgICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XHJcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5oaWdobGlnaHROb2RlKHtcclxuICAgICAgICBub2RlRWxlbWVudDogdGFyZ2V0LFxyXG4gICAgICAgIGhpZ2hsaWdodENvbmZpZzogdGhpcy5oaWdobGlnaHRDb25maWcsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5leHBhbmROb2RlKGUudGFyZ2V0LnBhcmVudE5vZGUpO1xyXG5cclxuICAgICAgdGhpcy5zZW5kKHtcclxuICAgICAgICBtZXRob2Q6IEV2ZW50Lm5vZGVIaWdobGlnaHRSZXF1ZXN0ZWQsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBub2RlSWQ6IG5vZGVzLmdldElkQnlOb2RlKHRhcmdldCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhpZ2hsaWdodCwgdHJ1ZSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoaWdobGlnaHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUhpZ2hsaWdodEJveCgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgY29udGVudEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgbWFyZ2luQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCB0b29sdGlwc0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIFttYXJnaW5Cb3gsIGNvbnRlbnRCb3gsIHRvb2x0aXBzQm94XS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oaXRlbS5zdHlsZSwge1xyXG4gICAgICAgIHBhZGRpbmc6IDAsXHJcbiAgICAgICAgbWFyZ2luOiAwLFxyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIGJvcmRlclNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgICB9KTtcclxuICAgICAgaXRlbS5jbGFzc05hbWUgPSBERVZUT09MX09WRVJMQVk7XHJcbiAgICAgIGNvbnRhaW5lckJveC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyQm94LnN0eWxlLCB7XHJcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgIHpJbmRleDogOTk5OTksXHJcbiAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRhaW5lckJveC5jbGFzc05hbWUgPSBERVZUT09MX09WRVJMQVk7XHJcbiAgICBjb250YWluZXJCb3guaWQgPSBERVZUT09MX09WRVJMQVk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckJveCk7XHJcblxyXG4gICAgdGhpcy5oaWdobGlnaHRCb3ggPSB7IGNvbnRhaW5lckJveCwgY29udGVudEJveCwgbWFyZ2luQm94LCB0b29sdGlwc0JveCB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICB1cGRhdGVIaWdobGlnaHRCb3goaGlnaGxpZ2h0Q29uZmlnLCBub2RlKSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuICAgIGNvbnN0IG1hcmdpbiA9IE92ZXJsYXkuZ2V0U3R5bGVQcm9wZXJ0eVZhbHVlKFtcclxuICAgICAgJ21hcmdpbi10b3AnLFxyXG4gICAgICAnbWFyZ2luLXJpZ2h0JyxcclxuICAgICAgJ21hcmdpbi1ib3R0b20nLFxyXG4gICAgICAnbWFyZ2luLWxlZnQnXHJcbiAgICBdLCBzdHlsZXMpO1xyXG4gICAgY29uc3QgcGFkZGluZyA9IE92ZXJsYXkuZ2V0U3R5bGVQcm9wZXJ0eVZhbHVlKFtcclxuICAgICAgJ3BhZGRpbmctdG9wJyxcclxuICAgICAgJ3BhZGRpbmctcmlnaHQnLFxyXG4gICAgICAncGFkZGluZy1ib3R0b20nLFxyXG4gICAgICAncGFkZGluZy1sZWZ0J1xyXG4gICAgXSwgc3R5bGVzKTtcclxuICAgIGNvbnN0IGJvcmRlciA9IE92ZXJsYXkuZ2V0U3R5bGVQcm9wZXJ0eVZhbHVlKFtcclxuICAgICAgJ2JvcmRlci10b3Atd2lkdGgnLFxyXG4gICAgICAnYm9yZGVyLXJpZ2h0LXdpZHRoJyxcclxuICAgICAgJ2JvcmRlci1ib3R0b20td2lkdGgnLFxyXG4gICAgICAnYm9yZGVyLWxlZnQtd2lkdGgnXHJcbiAgICBdLCBzdHlsZXMpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBPdmVybGF5LmdldFN0eWxlUHJvcGVydHlWYWx1ZSgnd2lkdGgnLCBzdHlsZXMpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gT3ZlcmxheS5nZXRTdHlsZVByb3BlcnR5VmFsdWUoJ2hlaWdodCcsIHN0eWxlcyk7XHJcbiAgICBjb25zdCBpc0JvcmRlckJveCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpWydib3gtc2l6aW5nJ10gPT09ICdib3JkZXItYm94JztcclxuICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9IGlzQm9yZGVyQm94ID8gd2lkdGggLSBwYWRkaW5nWzFdIC0gcGFkZGluZ1szXSA6IHdpZHRoICsgYm9yZGVyWzFdICsgYm9yZGVyWzNdO1xyXG4gICAgY29uc3QgY29udGVudEhlaWdodCA9IGlzQm9yZGVyQm94ID8gaGVpZ2h0IC0gcGFkZGluZ1swXSAtIHBhZGRpbmdbMl0gOiBoZWlnaHQgKyBib3JkZXJbMF0gKyBib3JkZXJbMl07XHJcbiAgICBjb25zdCBtYXJnaW5XaWR0aCA9IGlzQm9yZGVyQm94ID8gd2lkdGggOiB3aWR0aCArIHBhZGRpbmdbMV0gKyBwYWRkaW5nWzNdICsgYm9yZGVyWzFdICsgYm9yZGVyWzNdO1xyXG4gICAgY29uc3QgbWFyZ2luSGVpZ2h0ID0gaXNCb3JkZXJCb3ggPyBoZWlnaHQgOiBoZWlnaHQgKyBwYWRkaW5nWzBdICsgcGFkZGluZ1syXSArIGJvcmRlclswXSArIGJvcmRlclsyXTtcclxuXHJcbiAgICBjb25zdCB7IGNvbnRlbnRDb2xvciwgcGFkZGluZ0NvbG9yLCBtYXJnaW5Db2xvciB9ID0gaGlnaGxpZ2h0Q29uZmlnO1xyXG4gICAgY29uc3QgeyBjb250YWluZXJCb3gsIGNvbnRlbnRCb3gsIG1hcmdpbkJveCwgdG9vbHRpcHNCb3ggfSA9IHRoaXMuaGlnaGxpZ2h0Qm94O1xyXG5cclxuICAgIGNvbnRhaW5lckJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGNvbnRlbnRCb3guc3R5bGUsIHtcclxuICAgICAgbGVmdDogYCR7bGVmdH1weGAsXHJcbiAgICAgIHRvcDogYCR7dG9wfXB4YCxcclxuICAgICAgd2lkdGg6IGAke2NvbnRlbnRXaWR0aH1weGAsXHJcbiAgICAgIGhlaWdodDogYCR7Y29udGVudEhlaWdodH1weGAsXHJcbiAgICAgIGJhY2tncm91bmQ6IE92ZXJsYXkucmdiYShjb250ZW50Q29sb3IpLFxyXG4gICAgICBib3JkZXJDb2xvcjogT3ZlcmxheS5yZ2JhKHBhZGRpbmdDb2xvciksXHJcbiAgICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG4gICAgICBib3JkZXJXaWR0aDogYCR7cGFkZGluZ1swXX1weCAke3BhZGRpbmdbMV19cHggJHtwYWRkaW5nWzJdfXB4ICR7cGFkZGluZ1szXX1weGBcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24obWFyZ2luQm94LnN0eWxlLCB7XHJcbiAgICAgIGxlZnQ6IGAke2xlZnQgLSBtYXJnaW5bM119cHhgLFxyXG4gICAgICB0b3A6IGAke3RvcCAtIG1hcmdpblswXX1weGAsXHJcbiAgICAgIHdpZHRoOiBgJHttYXJnaW5XaWR0aH1weGAsXHJcbiAgICAgIGhlaWdodDogYCR7bWFyZ2luSGVpZ2h0fXB4YCxcclxuICAgICAgYm9yZGVyQ29sb3I6IE92ZXJsYXkucmdiYShtYXJnaW5Db2xvciksXHJcbiAgICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG4gICAgICBib3JkZXJXaWR0aDogYCR7bWFyZ2luWzBdfXB4ICR7bWFyZ2luWzFdfXB4ICR7bWFyZ2luWzJdfXB4ICR7bWFyZ2luWzNdfXB4YFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaXNUb3BQb3NpdGlvbiA9IHRvcCAtIG1hcmdpblswXSA+IDI1O1xyXG4gICAgY29uc3QgY2xzID0gREVWVE9PTF9PVkVSTEFZO1xyXG4gICAgY29uc3QgY3VycmVudENsYXNzTmFtZSA9IG5vZGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgdG9vbHRpcHNCb3guaW5uZXJIVE1MID0gYFxyXG4gICAgICA8c3BhbiBjbGFzcz1cIiR7Y2xzfVwiIHN0eWxlPVwiY29sb3I6Izk3MzA5MDtmb250LXdlaWdodDpib2xkXCI+JHtub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cIiR7Y2xzfVwiIHN0eWxlPVwiY29sb3I6IzM0MzRCMDtmb250LXdlaWdodDpib2xkXCI+JHtjdXJyZW50Q2xhc3NOYW1lID8gYC4ke2N1cnJlbnRDbGFzc05hbWV9YCA6ICcnfTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCIke2Nsc31cIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO3RvcDoke2lzVG9wUG9zaXRpb24gPyAnYXV0bycgOiAnLTRweCd9O2JvdHRvbToke2lzVG9wUG9zaXRpb24gPyAnLTRweCcgOiAnYXV0byd9O2xlZnQ6MTBweDt3aWR0aDo4cHg7aGVpZ2h0OjhweDtiYWNrZ3JvdW5kOiNmZmY7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7XCI+PC9zcGFuPlxyXG4gICAgICAke092ZXJsYXkuZm9ybWF0TnVtYmVyKGNvbnRlbnRXaWR0aCl9IHggJHtPdmVybGF5LmZvcm1hdE51bWJlcihjb250ZW50SGVpZ2h0KX1cclxuICAgIGA7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0b29sdGlwc0JveC5zdHlsZSwge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXHJcbiAgICAgIGxlZnQ6IGAke2xlZnQgLSBtYXJnaW5bM119cHhgLFxyXG4gICAgICB0b3A6IGlzVG9wUG9zaXRpb24gPyBgJHt0b3AgLSBtYXJnaW5bMF0gLSAzMH1weGAgOiBgJHt0b3AgKyBtYXJnaW5IZWlnaHQgKyAxMH1weGAsXHJcbiAgICAgIGZpbHRlcjogJ2Ryb3Atc2hhZG93KDAgMCAzcHggcmdiYSgwLDAsMCwwLjMpKScsXHJcbiAgICAgICdib3JkZXItcmFkaXVzJzogJzJweCcsXHJcbiAgICAgICdmb250LXNpemUnOiAnMTJweCcsXHJcbiAgICAgIHBhZGRpbmc6ICcycHggNHB4JyxcclxuICAgICAgY29sb3I6ICcjOGQ4ZDhkJyxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0IFNjcmVlblByZXZpZXcgZnJvbSAnLi9zY3JlZW4tcHJldmlldyc7XHJcbmltcG9ydCBCYXNlRG9tYWluIGZyb20gJy4vZG9tYWluJztcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL3Byb3RvY29sJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBCYXNlRG9tYWluIHtcclxuICBuYW1lc3BhY2UgPSAnUGFnZSc7XHJcblxyXG4gIGZyYW1lID0gbmV3IE1hcCgpO1xyXG5cclxuICAvKipcclxuXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGVuYWJsZSgpIHtcclxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLiQkcmVxdWVzdFR5cGUgPSAnRG9jdW1lbnQnO1xyXG4gICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5mcmFtZS5zZXQobG9jYXRpb24uaHJlZiwgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICB9O1xyXG4gICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZnJhbWUuc2V0KGxvY2F0aW9uLmhyZWYsICdDYW5ub3QgZ2V0IHNjcmlwdCBzb3VyY2UgY29kZScpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgbG9jYXRpb24uaHJlZik7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHJvb3QgZnJhbWVcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZ2V0UmVzb3VyY2VUcmVlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZnJhbWVUcmVlOiB7XHJcbiAgICAgICAgZnJhbWU6IHtcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgbWltZVR5cGU6ICd0ZXh0L2h0bWwnLFxyXG4gICAgICAgICAgc2VjdXJpdHlPcmlnaW46IGxvY2F0aW9uLm9yaWdpbixcclxuICAgICAgICAgIHVybDogbG9jYXRpb24uaHJlZixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc291cmNlczogW10sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGh0bWwgY29udGVudFxyXG4gICAqIEBwdWJsaWNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1cclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0udXJsIHBhZ2UgdXJsXHJcbiAgICovXHJcbiAgZ2V0UmVzb3VyY2VDb250ZW50KHsgdXJsIH0pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMuZnJhbWUuZ2V0KHVybCksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhcnRTY3JlZW5jYXN0KCkge1xyXG4gICAgY29uc3QgY2FwdHVyZVNjcmVlbiA9ICgpID0+IHtcclxuICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikgcmV0dXJuO1xyXG4gICAgICBTY3JlZW5QcmV2aWV3LmNhcHR1cmVTY3JlZW4oKS50aGVuKChiYXNlNjQpID0+IHtcclxuICAgICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgICAgbWV0aG9kOiBFdmVudC5zY3JlZW5jYXN0RnJhbWUsXHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgZGF0YTogYmFzZTY0LnJlcGxhY2UoL15kYXRhOmltYWdlXFwvanBlZztiYXNlNjQsLywgJycpLFxyXG4gICAgICAgICAgICBzZXNzaW9uSWQ6IDEsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgZGV2aWNlSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgICAgICAgZGV2aWNlV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICAgIHBhZ2VTY2FsZUZhY3RvcjogMSxcclxuICAgICAgICAgICAgICBvZmZzZXRUb3A6IDAsXHJcbiAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0WDogMCxcclxuICAgICAgICAgICAgICBzY3JvbGxPZmZzZXRZOiAwLFxyXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYXB0dXJlU2NyZWVuKCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoY2FwdHVyZVNjcmVlbiwgMjAwMCk7XHJcbiAgfVxyXG5cclxuICBzdG9wU2NyZWVuY2FzdCgpIHtcclxuICAgIGlmICh0aGlzLmludGVydmFsVGltZXIpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsVGltZXIpO1xyXG4gICAgICB0aGlzLmludGVydmFsVGltZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwiLy8gSW1wbGVtZW50ZWQgQ0RQXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBDU1M6IFsnZW5hYmxlJywgJ2dldFN0eWxlU2hlZXRUZXh0JywgJ2dldE1hdGNoZWRTdHlsZXNGb3JOb2RlJywgJ2dldENvbXB1dGVkU3R5bGVGb3JOb2RlJywgJ2dldER5bmFtaWNMaW5rJ10sXHJcbiAgRGVidWdnZXI6IFsnZW5hYmxlJywgJ2dldFNjcmlwdFNvdXJjZScsICdnZXREeW5hbWljU2NyaXB0J10sXHJcbiAgRE9NU3RvcmFnZTogWydlbmFibGUnLCAnZ2V0RE9NU3RvcmFnZUl0ZW1zJywgJ3JlbW92ZURPTVN0b3JhZ2VJdGVtJywgJ2NsZWFyJywgJ3NldERPTVN0b3JhZ2VJdGVtJ10sXHJcbiAgU3RvcmFnZTogWydnZXRTdG9yYWdlS2V5Rm9yRnJhbWUnXSxcclxuICBET006IFtcclxuICAgICdlbmFibGUnLCAnZ2V0RG9jdW1lbnQnLCAncmVtb3ZlTm9kZScsICdyZXF1ZXN0Q2hpbGROb2RlcycsICdyZXF1ZXN0Tm9kZScsICdnZXRPdXRlckhUTUwnLFxyXG4gICAgJ3NldE91dGVySFRNTCcsICdzZXRBdHRyaWJ1dGVzQXNUZXh0JywgJ3NldEluc3BlY3RlZE5vZGUnLCAncHVzaE5vZGVzQnlCYWNrZW5kSWRzVG9Gcm9udGVuZCcsXHJcbiAgICAncGVyZm9ybVNlYXJjaCcsICdnZXRTZWFyY2hSZXN1bHRzJywgJ2Rpc2NhcmRTZWFyY2hSZXN1bHRzJywgJ2dldE5vZGVGb3JMb2NhdGlvbicsICdzZXROb2RlVmFsdWUnLFxyXG4gICAgJ2dldEJveE1vZGVsJyxcclxuICBdLFxyXG4gIE5ldHdvcms6IFsnZW5hYmxlJywgJ2dldENvb2tpZXMnLCAnc2V0Q29va2llJywgJ2RlbGV0ZUNvb2tpZXMnLCAnZ2V0UmVzcG9uc2VCb2R5J10sXHJcbiAgT3ZlcmxheTogWydlbmFibGUnLCAnaGlnaGxpZ2h0Tm9kZScsICdoaWRlSGlnaGxpZ2h0JywgJ3NldEluc3BlY3RNb2RlJ10sXHJcbiAgUGFnZTogWydlbmFibGUnLCAnc3RhcnRTY3JlZW5jYXN0JywgJ3N0b3BTY3JlZW5jYXN0JywgJ2dldFJlc291cmNlVHJlZScsICdnZXRSZXNvdXJjZUNvbnRlbnQnXSxcclxuICBSdW50aW1lOiBbJ2VuYWJsZScsICdldmFsdWF0ZScsICdnZXRQcm9wZXJ0aWVzJywgJ3JlbGVhc2VPYmplY3QnXSxcclxuICBTY3JlZW5QcmV2aWV3OiBbJ3N0YXJ0UHJldmlldycsICdzdG9wUHJldmlldyddIC8vIFNjcmVlblByZXZpZXcgaXMgYSBjdXN0b20gcHJvdG9jb2xcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBFdmVudCA9IHtcclxuICBzdHlsZVNoZWV0QWRkZWQ6ICdDU1Muc3R5bGVTaGVldEFkZGVkJyxcclxuXHJcbiAgc2NyaXB0UGFyc2VkOiAnRGVidWdnZXIuc2NyaXB0UGFyc2VkJyxcclxuXHJcbiAgZG9tU3RvcmFnZUl0ZW1BZGRlZDogJ0RPTVN0b3JhZ2UuZG9tU3RvcmFnZUl0ZW1BZGRlZCcsXHJcbiAgZG9tU3RvcmFnZUl0ZW1SZW1vdmVkOiAnRE9NU3RvcmFnZS5kb21TdG9yYWdlSXRlbVJlbW92ZWQnLFxyXG4gIGRvbVN0b3JhZ2VJdGVtc0NsZWFyZWQ6ICdET01TdG9yYWdlLmRvbVN0b3JhZ2VJdGVtc0NsZWFyZWQnLFxyXG4gIGRvbVN0b3JhZ2VJdGVtVXBkYXRlZDogJ0RPTVN0b3JhZ2UuZG9tU3RvcmFnZUl0ZW1VcGRhdGVkJyxcclxuXHJcbiAgc2V0Q2hpbGROb2RlczogJ0RPTS5zZXRDaGlsZE5vZGVzJyxcclxuICBjaGlsZE5vZGVDb3VudFVwZGF0ZWQ6ICdET00uY2hpbGROb2RlQ291bnRVcGRhdGVkJyxcclxuICBjaGlsZE5vZGVJbnNlcnRlZDogJ0RPTS5jaGlsZE5vZGVJbnNlcnRlZCcsXHJcbiAgY2hpbGROb2RlUmVtb3ZlZDogJ0RPTS5jaGlsZE5vZGVSZW1vdmVkJyxcclxuICBhdHRyaWJ1dGVNb2RpZmllZDogJ0RPTS5hdHRyaWJ1dGVNb2RpZmllZCcsXHJcbiAgYXR0cmlidXRlUmVtb3ZlZDogJ0RPTS5hdHRyaWJ1dGVSZW1vdmVkJyxcclxuICBjaGFyYWN0ZXJEYXRhTW9kaWZpZWQ6ICdET00uY2hhcmFjdGVyRGF0YU1vZGlmaWVkJyxcclxuXHJcbiAgcmVxdWVzdFdpbGxCZVNlbnQ6ICdOZXR3b3JrLnJlcXVlc3RXaWxsQmVTZW50JyxcclxuICByZXNwb25zZVJlY2VpdmVkRXh0cmFJbmZvOiAnTmV0d29yay5yZXNwb25zZVJlY2VpdmVkRXh0cmFJbmZvJyxcclxuICByZXNwb25zZVJlY2VpdmVkOiAnTmV0d29yay5yZXNwb25zZVJlY2VpdmVkJyxcclxuICBsb2FkaW5nRmluaXNoZWQ6ICdOZXR3b3JrLmxvYWRpbmdGaW5pc2hlZCcsXHJcblxyXG4gIHNjcmVlbmNhc3RGcmFtZTogJ1BhZ2Uuc2NyZWVuY2FzdEZyYW1lJyxcclxuXHJcbiAgZXhlY3V0aW9uQ29udGV4dENyZWF0ZWQ6ICdSdW50aW1lLmV4ZWN1dGlvbkNvbnRleHRDcmVhdGVkJyxcclxuICBjb25zb2xlQVBJQ2FsbGVkOiAnUnVudGltZS5jb25zb2xlQVBJQ2FsbGVkJyxcclxuICBleGNlcHRpb25UaHJvd246ICdSdW50aW1lLmV4Y2VwdGlvblRocm93bicsXHJcblxyXG4gIG5vZGVIaWdobGlnaHRSZXF1ZXN0ZWQ6ICdPdmVybGF5Lm5vZGVIaWdobGlnaHRSZXF1ZXN0ZWQnLFxyXG4gIGluc3BlY3ROb2RlUmVxdWVzdGVkOiAnT3ZlcmxheS5pbnNwZWN0Tm9kZVJlcXVlc3RlZCcsXHJcblxyXG4gIGNhcHR1cmVkOiAnU2NyZWVuUHJldmlldy5jYXB0dXJlZCcsXHJcbiAgc3luY1Njcm9sbDogJ1NjcmVlblByZXZpZXcuc3luY1Njcm9sbCcsXHJcbiAgc3luY01vdXNlOiAnU2NyZWVuUHJldmlldy5zeW5jTW91c2UnLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBvYmplY3RGb3JtYXQsIG9iamVjdFJlbGVhc2UsIGdldE9iamVjdFByb3BlcnRpZXMgfSBmcm9tICcuLi9jb21tb24vcmVtb3RlT2JqZWN0JztcclxuaW1wb3J0IEJhc2VEb21haW4gZnJvbSAnLi9kb21haW4nO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vcHJvdG9jb2wnO1xyXG5cclxuY29uc3QgY2FsbHNpdGUgPSByZXF1aXJlKCdjYWxsc2l0ZScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVudGltZSBleHRlbmRzIEJhc2VEb21haW4ge1xyXG4gIG5hbWVzcGFjZSA9ICdSdW50aW1lJztcclxuXHJcbiAgY2FjaGVDb25zb2xlID0gW107XHJcblxyXG4gIGNhY2hlRXJyb3IgPSBbXTtcclxuXHJcbiAgaXNFbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgc29ja2V0U2VuZCA9ICh0eXBlLCBkYXRhKSA9PiB7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2NvbnNvbGUnKSB7XHJcbiAgICAgIHRoaXMuY2FjaGVDb25zb2xlLnB1c2goZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcclxuICAgICAgdGhpcy5jYWNoZUVycm9yLnB1c2goZGF0YSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc0VuYWJsZSkge1xyXG4gICAgICB0aGlzLnNlbmQoZGF0YSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLmhvb2tDb25zb2xlKCk7XHJcbiAgICB0aGlzLmxpc3RlbkVycm9yKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY2FsbCBzdGFja1xyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRDYWxsRnJhbWVzKGVycm9yKSB7XHJcbiAgICBsZXQgY2FsbEZyYW1lcyA9IFtdO1xyXG4gICAgbGV0IHN0YWNrO1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHN0YWNrID0gZXJyb3Iuc3RhY2s7XHJcbiAgICAgIGNhbGxGcmFtZXMgPSBzdGFjay5zcGxpdCgnXFxuJykubWFwKHZhbCA9PiAoe1xyXG4gICAgICAgIGZ1bmN0aW9uTmFtZTogdmFsLFxyXG4gICAgICAgIC4uLlJ1bnRpbWUuZ2V0UG9zaXRpb25BbmRVcmwodmFsKVxyXG4gICAgICB9KSk7XHJcbiAgICAgIC8vIFNhZmFyaSBkb2VzIG5vdCBzdXBwb3J0IGNhcHR1cmVTdGFja1RyYWNlXHJcbiAgICB9IGVsc2UgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XHJcbiAgICAgIGNhbGxGcmFtZXMgPSBjYWxsc2l0ZSgpLm1hcCh2YWwgPT4gKHtcclxuICAgICAgICBmdW5jdGlvbk5hbWU6IHZhbC5nZXRGdW5jdGlvbk5hbWUoKSxcclxuICAgICAgICBsaW5lTnVtYmVyOiB2YWwuZ2V0TGluZU51bWJlcigpLFxyXG4gICAgICAgIGNvbHVtbk51bWJlcjogdmFsLmdldENvbHVtbk51bWJlcigpLFxyXG4gICAgICAgIHVybDogdmFsLmdldEZpbGVOYW1lKCksXHJcbiAgICAgIH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XHJcbiAgICAgIGNhbGxGcmFtZXMgPSBzdGFjay5zcGxpdCgnXFxuJykubWFwKHZhbCA9PiAoe1xyXG4gICAgICAgIGZ1bmN0aW9uTmFtZTogdmFsLFxyXG4gICAgICAgIC4uLlJ1bnRpbWUuZ2V0UG9zaXRpb25BbmRVcmwodmFsKVxyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEZyYW1lcy5zaGlmdCgpO1xyXG4gICAgcmV0dXJuIGNhbGxGcmFtZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxpbmUgbnVtYmVyIGFuZCBjb2x1bW4gbnVtYmVyIG9mIGVhY2ggc3RhY2sgY29kZSBmcm9tIHRoZSBlcnJvciBzdGFja1xyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0UG9zaXRpb25BbmRVcmwoc3RyKSB7XHJcbiAgICBjb25zdCByZWcgPSAvYXRcXHMrKC4qKSg/OjooWzAtOV0rKTooWzAtOV0rKSkkLzsgLy8gZm9yIGFuZHJvaWRcclxuICAgIGNvbnN0IHJlZzEgPSAvQCsoLiopKD86OihbMC05XSspOihbMC05XSspKSQvOyAvLyBmb3IgaW9zXHJcblxyXG4gICAgbGV0IHJlcztcclxuICAgIGlmIChyZWcudGVzdChzdHIpKSB7XHJcbiAgICAgIHJlcyA9IHJlZy5leGVjKHN0cik7XHJcbiAgICB9IGVsc2UgaWYgKHJlZzEudGVzdChzdHIpKSB7XHJcbiAgICAgIHJlcyA9IHJlZzEuZXhlYyhzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXMpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1cmw6IHJlc1sxXSxcclxuICAgICAgICBsaW5lTnVtYmVyOiByZXNbMl0sXHJcbiAgICAgICAgY29sdW1uTnVtYmVyOiByZXNbM11cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgdGhpcy5pc0VuYWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLmNhY2hlQ29uc29sZS5mb3JFYWNoKGRhdGEgPT4gdGhpcy5zZW5kKGRhdGEpKTtcclxuICAgIHRoaXMuY2FjaGVFcnJvci5mb3JFYWNoKGRhdGEgPT4gdGhpcy5zZW5kKGRhdGEpKTtcclxuXHJcbiAgICB0aGlzLnNlbmQoe1xyXG4gICAgICBtZXRob2Q6IEV2ZW50LmV4ZWN1dGlvbkNvbnRleHRDcmVhdGVkLFxyXG4gICAgICBwYXJhbXM6IHtcclxuICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgIG5hbWU6ICd0b3AnLFxyXG4gICAgICAgICAgb3JpZ2luOiBsb2NhdGlvbi5vcmlnaW4sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNjcmlwdCBleGVjdXRpb25cclxuICAgKiBAcHVibGljXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtLmV4cHJlc3Npb24gZXhwcmVzc2lvbiBzdHJpbmdcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBhcmFtLmdlbmVyYXRlUHJldmlldyB3aGV0aGVyIHRvIGdlbmVyYXRlIGEgcHJldmlld1xyXG4gICAqL1xyXG4gIGV2YWx1YXRlKHsgZXhwcmVzc2lvbiwgZ2VuZXJhdGVQcmV2aWV3IH0pIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgY29uc3QgcmVzID0gZXZhbChleHByZXNzaW9uKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3VsdDogb2JqZWN0Rm9ybWF0KHJlcywgeyBwcmV2aWV3OiBnZW5lcmF0ZVByZXZpZXcgfSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG9iamVjdCBwcm9wZXJ0aWVzXHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIGdldFByb3BlcnRpZXMocGFyYW1zKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN1bHQ6IGdldE9iamVjdFByb3BlcnRpZXMocGFyYW1zKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZWxlYXNlIG9iamVjdFxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICByZWxlYXNlT2JqZWN0KHBhcmFtcykge1xyXG4gICAgb2JqZWN0UmVsZWFzZShwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJjZXB0IG1ldGhvZCBvZiBjb25zb2xlIG9iamVjdFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgaG9va0NvbnNvbGUoKSB7XHJcbiAgICBjb25zdCBtZXRob2RzID0ge1xyXG4gICAgICBsb2c6ICdsb2cnLFxyXG4gICAgICB3YXJuOiAnd2FybmluZycsXHJcbiAgICAgIGluZm86ICdpbmZvJyxcclxuICAgICAgZXJyb3I6ICdlcnJvcicsXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKG1ldGhvZHMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBjb25zdCBuYXRpdmVDb25zb2xlRnVuYyA9IHdpbmRvdy5jb25zb2xlW2tleV07XHJcbiAgICAgIHdpbmRvdy5jb25zb2xlW2tleV0gPSAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIG5hdGl2ZUNvbnNvbGVGdW5jKC4uLmFyZ3MpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICBtZXRob2Q6IEV2ZW50LmNvbnNvbGVBUElDYWxsZWQsXHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgdHlwZTogbWV0aG9kc1trZXldLFxyXG4gICAgICAgICAgICBhcmdzOiBhcmdzLm1hcChhcmcgPT4gb2JqZWN0Rm9ybWF0KGFyZywgeyBwcmV2aWV3OiB0cnVlIH0pKSxcclxuICAgICAgICAgICAgZXhlY3V0aW9uQ29udGV4dElkOiAxLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIHN0YWNrVHJhY2U6IHtcclxuICAgICAgICAgICAgICAvLyBlcnJvciwgd2FybiBwcm9jZXNzaW5nIGNhbGwgc3RhY2tcclxuICAgICAgICAgICAgICBjYWxsRnJhbWVzOiBbJ2Vycm9yJywgJ3dhcm4nXS5pbmNsdWRlcyhrZXkpID8gUnVudGltZS5nZXRDYWxsRnJhbWVzKCkgOiBbXSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zb2NrZXRTZW5kKCdjb25zb2xlJywgZGF0YSk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdsb2JhbCBlcnJvciBtb25pdG9yXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBsaXN0ZW5FcnJvcigpIHtcclxuICAgIGNvbnN0IGV4Y2VwdGlvblRocm93biA9IChlcnJvcikgPT4ge1xyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgIG1ldGhvZDogRXZlbnQuZXhjZXB0aW9uVGhyb3duLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgZXhjZXB0aW9uRGV0YWlsczoge1xyXG4gICAgICAgICAgICB0ZXh0OiAnVW5jYXVnaHQnLFxyXG4gICAgICAgICAgICBleGNlcHRpb246IHtcclxuICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcclxuICAgICAgICAgICAgICBzdWJ0eXBlOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZXJyb3IgPyBlcnJvci5uYW1lIDogJ0Vycm9yJyxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZXJyb3IgPyBlcnJvci5zdGFjayA6ICdTY3JpcHQgZXJyb3IuJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhY2tUcmFjZToge1xyXG4gICAgICAgICAgICAgIGNhbGxGcmFtZXM6IFJ1bnRpbWUuZ2V0Q2FsbEZyYW1lcyhlcnJvcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc29ja2V0U2VuZCgnZXJyb3InLCBkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZSA9PiBleGNlcHRpb25UaHJvd24oZS5lcnJvcikpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIGUgPT4gZXhjZXB0aW9uVGhyb3duKGUucmVhc29uKSk7XHJcbiAgfVxyXG59O1xyXG4iLCJpbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoLnRocm90dGxlJztcclxuaW1wb3J0IHsgaXNNYXRjaGVzLCBpc01vYmlsZSwgbG9hZFNjcmlwdCB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XHJcbmltcG9ydCB7IERFVlRPT0xfT1ZFUkxBWSB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudCc7XHJcbmltcG9ydCBCYXNlRG9tYWluIGZyb20gJy4vZG9tYWluJztcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL3Byb3RvY29sJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmVlblByZXZpZXcgZXh0ZW5kcyBCYXNlRG9tYWluIHtcclxuICBuYW1lc3BhY2UgPSAnU2NyZWVuUHJldmlldyc7XHJcblxyXG4gIHN0YXRpYyBjYXB0dXJlU2NyZWVuKCkge1xyXG4gICAgY29uc3QgcmVuZGVyU2NyZWVuID0gKCkgPT4gd2luZG93Lmh0bWwyY2FudmFzKGRvY3VtZW50LmJvZHksIHtcclxuICAgICAgYWxsb3dUYWludDogdHJ1ZSxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgICB1c2VDT1JTOiB0cnVlLFxyXG4gICAgICBpbWFnZVRpbWVvdXQ6IDEwMDAwLFxyXG4gICAgICBzY2FsZTogMSxcclxuICAgICAgaWdub3JlRWxlbWVudHM6IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50Py5zdHlsZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHsgZGlzcGxheSwgb3BhY2l0eSwgdmlzaWJpbGl0eSB9ID0gZWxlbWVudC5zdHlsZTtcclxuICAgICAgICByZXR1cm4gaXNNYXRjaGVzKGVsZW1lbnQsIGAuJHtERVZUT09MX09WRVJMQVl9YCkgfHxcclxuICAgICAgICAgIGRpc3BsYXkgPT09ICdub25lJyB8fFxyXG4gICAgICAgICAgb3BhY2l0eSA9PT0gMCB8fFxyXG4gICAgICAgICAgdmlzaWJpbGl0eSA9PT0gJ2hpZGRlbic7XHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4oY2FudmFzID0+IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKSk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5odG1sMmNhbnZhcykge1xyXG4gICAgICByZXR1cm4gcmVuZGVyU2NyZWVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxvYWRTY3JpcHQoJ2h0dHBzOi8vdW5wa2cuY29tL2h0bWwyY2FudmFzQDEuNC4xL2Rpc3QvaHRtbDJjYW52YXMubWluLmpzJykudGhlbihyZW5kZXJTY3JlZW4pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgbGl2ZSBwcmV2aWV3XHJcbiAgICogQHB1YmxpY1xyXG4gICAqL1xyXG4gIHN0YXJ0UHJldmlldygpIHtcclxuICAgIGNvbnN0IHNlbGVjdG9yID0gJ2xpbmtbcmVsPVwic3R5bGVzaGVldFwiXSxzdHlsZSc7XHJcbiAgICBjb25zdCBzdHlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIGxldCBjb3VudHMgPSBzdHlsZXMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGpvaW5TdHlsZVRhZ3MgPSAoc3R5bGVzKSA9PiB7XHJcbiAgICAgIGxldCB0YWdzID0gJyc7XHJcbiAgICAgIEFycmF5LmZyb20oc3R5bGVzKS5mb3JFYWNoKHN0eWxlID0+IHtcclxuICAgICAgICBjb25zdCB0YWcgPSBzdHlsZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0YWcgPT09ICdsaW5rJykge1xyXG4gICAgICAgICAgdGFncyArPSBgPGxpbmsgaHJlZj1cIiR7c3R5bGUuaHJlZn1cIiByZWw9XCJzdHlsZXNoZWV0XCI+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YWcgPT09ICdzdHlsZScpIHtcclxuICAgICAgICAgIHRhZ3MgKz0gYDxzdHlsZT4ke3N0eWxlLmlubmVySFRNTH08L3N0eWxlPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGA8aGVhZD4ke3RhZ3N9PC9oZWFkPmA7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2VuZCh7XHJcbiAgICAgIG1ldGhvZDogRXZlbnQuY2FwdHVyZWQsXHJcbiAgICAgIHBhcmFtczoge1xyXG4gICAgICAgIGlzTW9iaWxlOiBpc01vYmlsZSgpLFxyXG4gICAgICAgIGhlYWQ6IGpvaW5TdHlsZVRhZ3Moc3R5bGVzKSxcclxuICAgICAgICBib2R5OiBkb2N1bWVudC5ib2R5LmlubmVySFRNTCxcclxuICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmUgdGhlIGNoYW5nZXMgb2YgdGhlIGRvY3VtZW50XHJcbiAgICB0aGlzLm9ic2VydmVySW5zdCA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRocm90dGxlKCgpID0+IHtcclxuICAgICAgY29uc3QgY3VyU3R5bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgIGxldCBoZWFkO1xyXG4gICAgICBpZiAoY3VyU3R5bGVzLmxlbmd0aCAhPT0gY291bnRzKSB7XHJcbiAgICAgICAgY291bnRzID0gY3VyU3R5bGVzLmxlbmd0aDtcclxuICAgICAgICBoZWFkID0gam9pblN0eWxlVGFncyhjdXJTdHlsZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNlbmQoe1xyXG4gICAgICAgIG1ldGhvZDogRXZlbnQuY2FwdHVyZWQsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBoZWFkLFxyXG4gICAgICAgICAgYm9keTogZG9jdW1lbnQuYm9keS5pbm5lckhUTUwsXHJcbiAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgICAgIGlzTW9iaWxlOiBpc01vYmlsZSgpLFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LCAxMDAwKSk7XHJcblxyXG4gICAgdGhpcy5vYnNlcnZlckluc3Qub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc3luY1Njcm9sbCk7XHJcblxyXG4gICAgWydtb3VzZW1vdmUnLCAnbW91c2Vkb3duJywgJ21vdXNldXAnLCAndG91Y2htb3ZlJywgJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnXS5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuc3luY01vdXNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcCBsaXZlIHByZXZpZXdcclxuICAgKiBAcHVibGljXHJcbiAgICovXHJcbiAgc3RvcFByZXZpZXcoKSB7XHJcbiAgICB0aGlzLm9ic2VydmVySW5zdCAmJiB0aGlzLm9ic2VydmVySW5zdC5kaXNjb25uZWN0KCk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zeW5jU2Nyb2xsKTtcclxuICAgIFsnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ3RvdWNobW92ZScsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJ10uZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLnN5bmNNb3VzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN5bmNTY3JvbGwgPSB0aHJvdHRsZSgoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuICAgIHRoaXMuc2VuZCh7XHJcbiAgICAgIG1ldGhvZDogRXZlbnQuc3luY1Njcm9sbCxcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgc2Nyb2xsVG9wLFxyXG4gICAgICAgIHNjcm9sbExlZnQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCAxMDApO1xyXG5cclxuICBzeW5jTW91c2UgPSB0aHJvdHRsZSgoZSkgPT4ge1xyXG4gICAgY29uc3QgdHlwZSA9IGUudHlwZSB8fCAnbW91c2Vtb3ZlJztcclxuICAgIGxldCBsZWZ0ID0gZS5jbGllbnRYO1xyXG4gICAgbGV0IHRvcCA9IGUuY2xpZW50WTtcclxuXHJcbiAgICBpZiAodHlwZS5pbmNsdWRlcygndG91Y2gnKSkge1xyXG4gICAgICBsZWZ0ID0gKGUudG91Y2hlc1swXSB8fCBlLmNoYW5nZWRUb3VjaGVzWzBdKS5jbGllbnRYO1xyXG4gICAgICB0b3AgPSAoZS50b3VjaGVzWzBdIHx8IGUuY2hhbmdlZFRvdWNoZXNbMF0pLmNsaWVudFk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZW5kKHtcclxuICAgICAgbWV0aG9kOiBFdmVudC5zeW5jTW91c2UsXHJcbiAgICAgIHBhcmFtczogeyB0eXBlLCBsZWZ0LCB0b3AgfSxcclxuICAgIH0pO1xyXG4gIH0sIDUwKTtcclxufVxyXG4iLCJpbXBvcnQgQmFzZURvbWFpbiBmcm9tICcuL2RvbWFpbic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2UgZXh0ZW5kcyBCYXNlRG9tYWluIHtcclxuICBuYW1lc3BhY2UgPSAnU3RvcmFnZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwdWJsaWNcclxuICAgKi9cclxuICBnZXRTdG9yYWdlS2V5Rm9yRnJhbWUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdG9yYWdlS2V5OiBsb2NhdGlvbi5vcmlnaW5cclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG4iLG51bGwsbnVsbCxudWxsLCIvKiEganMtY29va2llIHYzLjAuNSB8IE1JVCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cclxuZnVuY3Rpb24gYXNzaWduICh0YXJnZXQpIHtcclxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRhcmdldFxyXG59XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cclxudmFyIGRlZmF1bHRDb252ZXJ0ZXIgPSB7XHJcbiAgcmVhZDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWVbMF0gPT09ICdcIicpIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxLCAtMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKCVbXFxkQS1GXXsyfSkrL2dpLCBkZWNvZGVVUklDb21wb25lbnQpXHJcbiAgfSxcclxuICB3cml0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKFxyXG4gICAgICAvJSgyWzM0NkJGXXwzW0FDLUZdfDQwfDVbQkRFXXw2MHw3W0JDRF0pL2csXHJcbiAgICAgIGRlY29kZVVSSUNvbXBvbmVudFxyXG4gICAgKVxyXG4gIH1cclxufTtcclxuLyogZXNsaW50LWVuYWJsZSBuby12YXIgKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xyXG5cclxuZnVuY3Rpb24gaW5pdCAoY29udmVydGVyLCBkZWZhdWx0QXR0cmlidXRlcykge1xyXG4gIGZ1bmN0aW9uIHNldCAobmFtZSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcclxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGF0dHJpYnV0ZXMgPSBhc3NpZ24oe30sIGRlZmF1bHRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgYXR0cmlidXRlcy5leHBpcmVzID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIGF0dHJpYnV0ZXMuZXhwaXJlcyAqIDg2NGU1KTtcclxuICAgIH1cclxuICAgIGlmIChhdHRyaWJ1dGVzLmV4cGlyZXMpIHtcclxuICAgICAgYXR0cmlidXRlcy5leHBpcmVzID0gYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKVxyXG4gICAgICAucmVwbGFjZSgvJSgyWzM0NkJdfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXHJcbiAgICAgIC5yZXBsYWNlKC9bKCldL2csIGVzY2FwZSk7XHJcblxyXG4gICAgdmFyIHN0cmluZ2lmaWVkQXR0cmlidXRlcyA9ICcnO1xyXG4gICAgZm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnOyAnICsgYXR0cmlidXRlTmFtZTtcclxuXHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29uc2lkZXJzIFJGQyA2MjY1IHNlY3Rpb24gNS4yOlxyXG4gICAgICAvLyAuLi5cclxuICAgICAgLy8gMy4gIElmIHRoZSByZW1haW5pbmcgdW5wYXJzZWQtYXR0cmlidXRlcyBjb250YWlucyBhICV4M0IgKFwiO1wiKVxyXG4gICAgICAvLyAgICAgY2hhcmFjdGVyOlxyXG4gICAgICAvLyBDb25zdW1lIHRoZSBjaGFyYWN0ZXJzIG9mIHRoZSB1bnBhcnNlZC1hdHRyaWJ1dGVzIHVwIHRvLFxyXG4gICAgICAvLyBub3QgaW5jbHVkaW5nLCB0aGUgZmlyc3QgJXgzQiAoXCI7XCIpIGNoYXJhY3Rlci5cclxuICAgICAgLy8gLi4uXHJcbiAgICAgIHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdLnNwbGl0KCc7JylbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChkb2N1bWVudC5jb29raWUgPVxyXG4gICAgICBuYW1lICsgJz0nICsgY29udmVydGVyLndyaXRlKHZhbHVlLCBuYW1lKSArIHN0cmluZ2lmaWVkQXR0cmlidXRlcylcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldCAobmFtZSkge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgKGFyZ3VtZW50cy5sZW5ndGggJiYgIW5hbWUpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcclxuICAgIC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLlxyXG4gICAgdmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcclxuICAgIHZhciBqYXIgPSB7fTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIGZvdW5kID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKTtcclxuICAgICAgICBqYXJbZm91bmRdID0gY29udmVydGVyLnJlYWQodmFsdWUsIGZvdW5kKTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgPT09IGZvdW5kKSB7XHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmFtZSA/IGphcltuYW1lXSA6IGphclxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUoXHJcbiAgICB7XHJcbiAgICAgIHNldCxcclxuICAgICAgZ2V0LFxyXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIChuYW1lLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgc2V0KFxyXG4gICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICcnLFxyXG4gICAgICAgICAgYXNzaWduKHt9LCBhdHRyaWJ1dGVzLCB7XHJcbiAgICAgICAgICAgIGV4cGlyZXM6IC0xXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHdpdGhBdHRyaWJ1dGVzOiBmdW5jdGlvbiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgIHJldHVybiBpbml0KHRoaXMuY29udmVydGVyLCBhc3NpZ24oe30sIHRoaXMuYXR0cmlidXRlcywgYXR0cmlidXRlcykpXHJcbiAgICAgIH0sXHJcbiAgICAgIHdpdGhDb252ZXJ0ZXI6IGZ1bmN0aW9uIChjb252ZXJ0ZXIpIHtcclxuICAgICAgICByZXR1cm4gaW5pdChhc3NpZ24oe30sIHRoaXMuY29udmVydGVyLCBjb252ZXJ0ZXIpLCB0aGlzLmF0dHJpYnV0ZXMpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGF0dHJpYnV0ZXM6IHsgdmFsdWU6IE9iamVjdC5mcmVlemUoZGVmYXVsdEF0dHJpYnV0ZXMpIH0sXHJcbiAgICAgIGNvbnZlcnRlcjogeyB2YWx1ZTogT2JqZWN0LmZyZWV6ZShjb252ZXJ0ZXIpIH1cclxuICAgIH1cclxuICApXHJcbn1cclxuXHJcbnZhciBhcGkgPSBpbml0KGRlZmF1bHRDb252ZXJ0ZXIsIHsgcGF0aDogJy8nIH0pO1xyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLXZhciAqL1xyXG5cclxuZXhwb3J0IHsgYXBpIGFzIGRlZmF1bHQgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHV1aWQgZnJvbSAnc3RyaW5nLXJhbmRvbSc7XHJcbmltcG9ydCBSZWNvbm5lY3RpbmdXZWJTb2NrZXQgZnJvbSAncmVjb25uZWN0aW5nLXdlYnNvY2tldCc7XHJcbmltcG9ydCB7IGdldEFic29sdXRlUGF0aCB9IGZyb20gJy4vY29tbW9uL3V0aWxzJztcclxuaW1wb3J0IENocm9tZURvbWFpbiBmcm9tICcuL2RvbWFpbi9pbmRleCc7XHJcblxyXG5mdW5jdGlvbiBnZXREb2N1bWVudEZhdmljb24oKSB7XHJcbiAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmsnKTtcclxuICBjb25zdCBpY29uID0gQXJyYXkuZnJvbShsaW5rcykuZmluZCgobGluaykgPT4ge1xyXG4gICAgY29uc3QgcmVsID0gbGluay5nZXRBdHRyaWJ1dGUoJ3JlbCcpO1xyXG4gICAgcmV0dXJuIHJlbC5pbmNsdWRlcygnaWNvbicpIHx8IHJlbC5pbmNsdWRlcygnc2hvcnRjdXQnKTtcclxuICB9KTtcclxuXHJcbiAgbGV0IGljb25VcmwgPSAnJztcclxuICBpZiAoaWNvbikge1xyXG4gICAgaWNvblVybCA9IGdldEFic29sdXRlUGF0aChpY29uLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpY29uVXJsO1xyXG59XHJcblxyXG4vLyBkZWJ1ZyBpZFxyXG5mdW5jdGlvbiBnZXRJZCgpIHtcclxuICBsZXQgaWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdkZWJ1Z19pZCcpO1xyXG4gIGlmICghaWQpIHtcclxuICAgIGlkID0gdXVpZCgpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZGVidWdfaWQnLCBpZCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5KCkge1xyXG4gIGNvbnN0IHNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICBzZWFyY2guYXBwZW5kKCd1cmwnLCBsb2NhdGlvbi5ocmVmKTtcclxuICBzZWFyY2guYXBwZW5kKCd0aXRsZScsIGRvY3VtZW50LnRpdGxlKTtcclxuICBzZWFyY2guYXBwZW5kKCdmYXZpY29uJywgZ2V0RG9jdW1lbnRGYXZpY29uKCkpO1xyXG4gIHNlYXJjaC5hcHBlbmQoJ3RpbWUnLCBEYXRlLm5vdygpKTtcclxuICBzZWFyY2guYXBwZW5kKCd1YScsIG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gIHJldHVybiBzZWFyY2gudG9TdHJpbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNvY2tldCgpIHtcclxuICBjb25zdCBwcm90b2NvbCA9IGxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyA/ICd3c3M6JyA6ICd3czonO1xyXG4gIGNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5ERUJVR19IT1NULnJlcGxhY2UoL14oaHR0cHxodHRwcyk6XFwvXFwvL2lnLCAnJyk7XHJcbiAgY29uc3Qgc29ja2V0ID0gbmV3IFJlY29ubmVjdGluZ1dlYlNvY2tldChgJHtwcm90b2NvbH0vLyR7aG9zdH0vcmVtb3RlL2RlYnVnL2NsaWVudC8ke2dldElkKCl9PyR7Z2V0UXVlcnkoKX1gKTtcclxuICBjb25zdCBkb21haW4gPSBuZXcgQ2hyb21lRG9tYWluKHsgc29ja2V0IH0pO1xyXG5cclxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgIGNvbnN0IHJldCA9IGRvbWFpbi5leGVjdXRlKG1lc3NhZ2UpO1xyXG4gICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShyZXQpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGxldCBoZWFydGJlYXQ7XHJcbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB7XHJcbiAgICAvLyBIZWFydGJlYXQga2VlcCBhbGl2ZVxyXG4gICAgaGVhcnRiZWF0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBzb2NrZXQuc2VuZCgne30nKTtcclxuICAgIH0sIDEwMDAwKTtcclxuICB9KTtcclxuXHJcbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXQpO1xyXG4gIH0pO1xyXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaGVhcnRiZWF0KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24ga2VlcFNjcmVlbkRpc3BsYXkoKSB7XHJcbiAgaWYgKCFuYXZpZ2F0b3Iud2FrZUxvY2spIHJldHVybjtcclxuXHJcbiAgbmF2aWdhdG9yLndha2VMb2NrLnJlcXVlc3QoJ3NjcmVlbicpO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4ge1xyXG4gICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgIG5hdmlnYXRvci53YWtlTG9jay5yZXF1ZXN0KCdzY3JlZW4nKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuaW5pdFNvY2tldCgpO1xyXG5rZWVwU2NyZWVuRGlzcGxheSgpO1xyXG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm9yaWciLCJFcnJvciIsInByZXBhcmVTdGFja1RyYWNlIiwiXyIsInN0YWNrIiwiZXJyIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJGVU5DX0VSUk9SX1RFWFQiLCJOQU4iLCJzeW1ib2xUYWciLCJyZVRyaW0iLCJyZUlzQmFkSGV4IiwicmVJc0JpbmFyeSIsInJlSXNPY3RhbCIsImZyZWVQYXJzZUludCIsInBhcnNlSW50IiwiZnJlZUdsb2JhbCIsImdsb2JhbCIsIk9iamVjdCIsImZyZWVTZWxmIiwic2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsIm9iamVjdFByb3RvIiwicHJvdG90eXBlIiwib2JqZWN0VG9TdHJpbmciLCJ0b1N0cmluZyIsIm5hdGl2ZU1heCIsIk1hdGgiLCJtYXgiLCJuYXRpdmVNaW4iLCJtaW4iLCJub3ciLCJEYXRlIiwiZGVib3VuY2UiLCJmdW5jIiwid2FpdCIsIm9wdGlvbnMiLCJsYXN0QXJncyIsImxhc3RUaGlzIiwibWF4V2FpdCIsInJlc3VsdCIsInRpbWVySWQiLCJsYXN0Q2FsbFRpbWUiLCJsYXN0SW52b2tlVGltZSIsImxlYWRpbmciLCJtYXhpbmciLCJ0cmFpbGluZyIsIlR5cGVFcnJvciIsInRvTnVtYmVyIiwiaXNPYmplY3QiLCJpbnZva2VGdW5jIiwidGltZSIsImFyZ3MiLCJ0aGlzQXJnIiwidW5kZWZpbmVkIiwiYXBwbHkiLCJsZWFkaW5nRWRnZSIsInNldFRpbWVvdXQiLCJ0aW1lckV4cGlyZWQiLCJyZW1haW5pbmdXYWl0IiwidGltZVNpbmNlTGFzdENhbGwiLCJ0aW1lU2luY2VMYXN0SW52b2tlIiwic2hvdWxkSW52b2tlIiwidHJhaWxpbmdFZGdlIiwiY2FuY2VsIiwiY2xlYXJUaW1lb3V0IiwiZmx1c2giLCJkZWJvdW5jZWQiLCJpc0ludm9raW5nIiwidGhyb3R0bGUiLCJ2YWx1ZSIsInR5cGUiLCJpc09iamVjdExpa2UiLCJpc1N5bWJvbCIsImNhbGwiLCJvdGhlciIsInZhbHVlT2YiLCJyZXBsYWNlIiwiaXNCaW5hcnkiLCJ0ZXN0Iiwic2xpY2UiLCJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsImhhc093blByb3BlcnR5IiwiX19leHRlbmRzIiwiX18iLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIl9fdmFsdWVzIiwibyIsIm0iLCJTeW1ib2wiLCJpdGVyYXRvciIsImkiLCJuZXh0IiwibGVuZ3RoIiwiZG9uZSIsIl9fcmVhZCIsIm4iLCJyIiwiYXIiLCJlIiwicHVzaCIsImVycm9yIiwiX19zcHJlYWQiLCJjb25jYXQiLCJFdmVudCIsInRhcmdldCIsIkVycm9yRXZlbnQiLCJfc3VwZXIiLCJfdGhpcyIsIm1lc3NhZ2UiLCJDbG9zZUV2ZW50IiwiY29kZSIsInJlYXNvbiIsIndhc0NsZWFuIiwiZ2V0R2xvYmFsV2ViU29ja2V0IiwiV2ViU29ja2V0IiwiaXNXZWJTb2NrZXQiLCJ3IiwiQ0xPU0lORyIsIkRFRkFVTFQiLCJtYXhSZWNvbm5lY3Rpb25EZWxheSIsIm1pblJlY29ubmVjdGlvbkRlbGF5IiwicmFuZG9tIiwibWluVXB0aW1lIiwicmVjb25uZWN0aW9uRGVsYXlHcm93RmFjdG9yIiwiY29ubmVjdGlvblRpbWVvdXQiLCJtYXhSZXRyaWVzIiwiSW5maW5pdHkiLCJtYXhFbnF1ZXVlZE1lc3NhZ2VzIiwic3RhcnRDbG9zZWQiLCJkZWJ1ZyIsIlJlY29ubmVjdGluZ1dlYlNvY2tldCIsInVybCIsInByb3RvY29scyIsIl9saXN0ZW5lcnMiLCJvcGVuIiwiY2xvc2UiLCJfcmV0cnlDb3VudCIsIl9zaG91bGRSZWNvbm5lY3QiLCJfY29ubmVjdExvY2siLCJfYmluYXJ5VHlwZSIsIl9jbG9zZUNhbGxlZCIsIl9tZXNzYWdlUXVldWUiLCJvbmNsb3NlIiwib25lcnJvciIsIm9ubWVzc2FnZSIsIm9ub3BlbiIsIl9oYW5kbGVPcGVuIiwiZXZlbnQiLCJfZGVidWciLCJfYSIsIl9vcHRpb25zIiwiX2Nvbm5lY3RUaW1lb3V0IiwiX3VwdGltZVRpbWVvdXQiLCJfYWNjZXB0T3BlbiIsIl93cyIsImJpbmFyeVR5cGUiLCJmb3JFYWNoIiwic2VuZCIsImxpc3RlbmVyIiwiX2NhbGxFdmVudExpc3RlbmVyIiwiX2hhbmRsZU1lc3NhZ2UiLCJfaGFuZGxlRXJyb3IiLCJfZGlzY29ubmVjdCIsIl9jb25uZWN0IiwiX2hhbmRsZUNsb3NlIiwiX2NsZWFyVGltZW91dHMiLCJfdXJsIiwiX3Byb3RvY29scyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIkNPTk5FQ1RJTkciLCJPUEVOIiwiQ0xPU0VEIiwic2V0IiwiYnl0ZXMiLCJyZWR1Y2UiLCJhY2MiLCJCbG9iIiwic2l6ZSIsImJ5dGVMZW5ndGgiLCJidWZmZXJlZEFtb3VudCIsImV4dGVuc2lvbnMiLCJwcm90b2NvbCIsInJlYWR5U3RhdGUiLCJyZWNvbm5lY3QiLCJkYXRhIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoRXZlbnQiLCJlXzEiLCJsaXN0ZW5lcnMiLCJsaXN0ZW5lcnNfMSIsImxpc3RlbmVyc18xXzEiLCJlXzFfMSIsInJldHVybiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmaWx0ZXIiLCJsIiwiX2kiLCJjb25zb2xlIiwibG9nIiwiX2dldE5leHREZWxheSIsIl9iIiwiX2MiLCJfZCIsImRlbGF5IiwicG93IiwiX3dhaXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsIl9nZXROZXh0VXJsIiwidXJsUHJvdmlkZXIiLCJ0aGVuIiwiX3JlbW92ZUxpc3RlbmVycyIsIl9hZGRMaXN0ZW5lcnMiLCJfaGFuZGxlVGltZW91dCIsImhhbmRsZUV2ZW50IiwibnVtYmVycyIsImxldHRlcnMiLCJzcGVjaWFscyIsImNoYXJzIiwiZmxvb3IiLCJkZWZhdWx0IiwiREVWVE9PTF9PVkVSTEFZIiwiSFRNTF9UT19DQU5WQVMiLCJJR05PUkVfTk9ERSIsIk5vZGVzIiwibm9kZUlkcyIsIk1hcCIsIm5vZGVzIiwiaGFzUmVxdWVzdGVkQ2hpbGROb2RlIiwiU2V0IiwiY3VycmVudElkIiwiX3Byb3RvIiwiaXNOb2RlIiwibm9kZSIsImdldEF0dHJpYnV0ZSIsImluY2x1ZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiVEVYVF9OT0RFIiwibm9kZVZhbHVlIiwidHJpbSIsIm5vZGVJZCIsImluaXQiLCJjbGVhciIsImhhc05vZGUiLCJoYXMiLCJnZXROb2RlQnlJZCIsImdldElkQnlOb2RlIiwiY29sbGVjdE5vZGVzIiwiZGVwdGgiLCJub2RlTmFtZSIsImxvY2FsTmFtZSIsInBhcmVudE5vZGUiLCJhdHRyaWJ1dGVzIiwiY2hpbGROb2RlcyIsInJlcyIsImJhY2tlbmROb2RlSWQiLCJjaGlsZE5vZGVDb3VudCIsImZyb20iLCJwcmUiLCJjdXJyIiwibmFtZSIsInBhcmVudElkIiwiY2hpbGRyZW4iLCJnZXRDaGlsZE5vZGVzIiwibWFwIiwiY2hpbGROb2RlIiwiZ2V0UHJldmlvdXNOb2RlIiwicHJldmlvdXNOb2RlIiwicHJldmlvdXNTaWJsaW5nIiwib2JqZWN0SWRzIiwib2JqZWN0cyIsIm9yaWdpbnMiLCJnZXRJZEJ5T2JqZWN0Iiwib2JqZWN0Iiwib3JpZ2luIiwiaWQiLCJnZXRSZWFsVHlwZSIsInZhbCIsInJlZyIsImV4ZWMiLCJnZXRTdWJUeXBlIiwiX3VudXNlZCIsInJlYWxUeXBlIiwidG9Mb3dlckNhc2UiLCJnZXRUeXBlIiwic3VidHlwZSIsImdldFByZXZpZXciLCJvdGhlcnMiLCJfb3RoZXJzIiwiX290aGVycyRsZW5ndGgiLCJfb3RoZXJzJG9yaWdpbiIsImtleXMiLCJwcm9wZXJ0aWVzIiwia2V5Iiwic3ViVmFsIiwiX2dldFR5cGUiLCJvdmVyZmxvdyIsIm9iamVjdEZvcm1hdCIsIl9vdGhlcnMyIiwiX290aGVyczIkb3JpZ2luIiwiX290aGVyczIkcHJldmlldyIsInByZXZpZXciLCJfZ2V0VHlwZTIiLCJkZXNjcmlwdGlvbiIsIm9iamVjdElkIiwiY2xhc3NOYW1lIiwiX2V4dGVuZHMiLCJfdW51c2VkMiIsImdldE9iamVjdFByb3BlcnRpZXMiLCJwYXJhbXMiLCJhY2Nlc3NvclByb3BlcnRpZXNPbmx5IiwiZ2VuZXJhdGVQcmV2aWV3Iiwib3duUHJvcGVydGllcyIsImN1ck9iamVjdCIsInByb3RvIiwibmV4dE9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlIiwiX3N0ZXAiLCJwcm9wZXJ0eSIsInByb3BWYWwiLCJkZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwid3JpdGFibGUiLCJpc093biIsIm9iamVjdFJlbGVhc2UiLCJfcmVmIiwiZGVsZXRlIiwiZ2V0T2JqZWN0QnlJZCIsImdldEFic29sdXRlUGF0aCIsImEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwia2V5MlVwcGVyQ2FzZSIsInMiLCJ0b1VwcGVyQ2FzZSIsImlzTWF0Y2hlcyIsImVsZW1lbnQiLCJzZWxlY3RvciIsIm1hdGNoZXMiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJpc01vYmlsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImxvYWRTY3JpcHQiLCJyZWplY3QiLCJzY3JpcHQiLCJzcmMiLCJvbmxvYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJCYXNlRG9tYWluIiwiQ1NTIiwiX0Jhc2VEb21haW4iLCJfaW5oZXJpdHNMb29zZSIsIl9sZW4iLCJfa2V5IiwibmFtZXNwYWNlIiwic3R5bGVzIiwic3R5bGVTaGVldElkIiwiZm9ybWF0Q3NzUnVsZSIsInJ1bGUiLCJpbmRleCIsInNlbGVjdG9ycyIsInNlbGVjdG9yVGV4dCIsInNwbGl0IiwiaXRlbSIsInRleHQiLCJjc3NUZXh0IiwiY3NzUnVsZSIsInN0eWxlIiwiY3NzUHJvcGVydGllcyIsImZvcm1hdENzc1Byb3BlcnRpZXMiLCJzaG9ydGhhbmRFbnRyaWVzIiwic2VsZWN0b3JMaXN0IiwiX3N0eWxlJHNwbGl0IiwiaW1wb3J0YW50IiwiZGlzYWJsZWQiLCJlbmFibGUiLCJfdGhpczIiLCJzdHlsZVNoZWV0cyIsImdldFN0eWxlU2hlZXRJZCIsInNvdXJjZVVSTCIsImZldGNoU3R5bGVTb3VyY2UiLCJtZXRob2QiLCJzdHlsZVNoZWV0QWRkZWQiLCJoZWFkZXIiLCJnZXRNYXRjaGVkU3R5bGVzRm9yTm9kZSIsIm1hdGNoZWRDU1NSdWxlcyIsImNzc1J1bGVzIiwiX0NTUyRmb3JtYXRDc3NSdWxlIiwibWF0Y2hpbmdTZWxlY3RvcnMiLCJfcmVmMiIsImlubGluZVN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZUZvck5vZGUiLCJfcmVmMyIsIkVsZW1lbnQiLCJjb21wdXRlZFN0eWxlIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFN0eWxlU2hlZXRUZXh0IiwiX3JlZjQiLCJnZXREeW5hbWljTGluayIsIl90aGlzMyIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiJCRyZXF1ZXN0VHlwZSIsInJlc3BvbnNlVGV4dCIsIkRlYnVnZ2VyIiwic2NyaXB0cyIsInNjcmlwdElkIiwiY29sbGVjdFNjcmlwdHMiLCJzY3JpcHRQYXJzZWQiLCJzdGFydENvbHVtbiIsInN0YXJ0TGluZSIsImVuZENvbHVtbiIsImVuZExpbmUiLCJzY3JpcHRMYW5ndWFnZSIsImdldFNjcmlwdFNvdXJjZSIsInNjcmlwdFNvdXJjZSIsImdldFNjcmlwdFNvdXJjZUJ5SWQiLCJnZXREeW5hbWljU2NyaXB0IiwiZ2V0U2NyaXB0SWQiLCJmZXRjaFNjcmlwdFNvdXJjZSIsInNjcmlwdEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInJldCIsIl90aGlzNCIsIkRvbVN0b3JhZ2UiLCJnZXRTdG9yYWdlIiwiaXNMb2NhbFN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImhvb2tTdG9yYWdlIiwiZ2V0RE9NU3RvcmFnZUl0ZW1zIiwic3RvcmFnZUlkIiwic3RvcmFnZSIsImVudHJpZXMiLCJyZW1vdmVET01TdG9yYWdlSXRlbSIsInJlbW92ZUl0ZW0iLCJkb21TdG9yYWdlSXRlbVJlbW92ZWQiLCJkb21TdG9yYWdlSXRlbXNDbGVhcmVkIiwic2V0RE9NU3RvcmFnZUl0ZW0iLCJfcmVmNSIsInNldEl0ZW0iLCJzZWN1cml0eU9yaWdpbiIsImxvY2F0aW9uIiwic3RvcmFnZUtleSIsIl9TdG9yYWdlJHByb3RvdHlwZSIsIlN0b3JhZ2UiLCJuYXRpdmVTZXRJdGVtIiwibmF0aXZlUmVtb3ZlSXRlbSIsIm5hdGl2ZUNsZWFyIiwibmV3VmFsdWUiLCJpc0tleUV4aXN0ZWQiLCJvbGRWYWx1ZSIsImdldEl0ZW0iLCJkb21TdG9yYWdlSXRlbVVwZGF0ZWQiLCJkb21TdG9yYWdlSXRlbUFkZGVkIiwiT3ZlcmxheSIsIkRvbSIsInNlYXJjaElkIiwic2VhcmNoUmV0IiwiY3VycmVudFNlYXJjaEtleSIsInNldCRGdW5jdGlvbiIsIiQiLCJxdWVyeVNlbGVjdG9yIiwiJCQiLCJub2RlT2JzZXJ2ZXIiLCJzZXREb21JbnNwZWN0IiwiZ2V0RG9jdW1lbnQiLCJyZXF1ZXN0Q2hpbGROb2RlcyIsImFkZCIsInNldENoaWxkTm9kZXMiLCJnZXRPdXRlckhUTUwiLCJvdXRlckhUTUwiLCJzZXRPdXRlckhUTUwiLCJzZXRBdHRyaWJ1dGVzQXNUZXh0IiwiX2l0ZW0kc3BsaXQiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyIiwicmVtb3ZlQXR0cmlidXRlIiwicmVxdWVzdE5vZGUiLCJzZXRJbnNwZWN0ZWROb2RlIiwiX3JlZjYiLCIkMCIsInJlbW92ZU5vZGUiLCJfcmVmNyIsIl9ub2RlJHBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInB1c2hOb2Rlc0J5QmFja2VuZElkc1RvRnJvbnRlbmQiLCJfcmVmOCIsImJhY2tlbmROb2RlSWRzIiwicGVyZm9ybVNlYXJjaCIsIl9yZWY5IiwicXVlcnkiLCJhbGxOb2RlcyIsIkVMRU1FTlRfTk9ERSIsInRhZ05hbWUiLCJyZXN1bHRDb3VudCIsImdldFNlYXJjaFJlc3VsdHMiLCJfcmVmMTAiLCJmcm9tSW5kZXgiLCJ0b0luZGV4IiwiZXhwYW5kTm9kZSIsImRpc2NhcmRTZWFyY2hSZXN1bHRzIiwiX3JlZjExIiwiZ2V0Tm9kZUZvckxvY2F0aW9uIiwiX3JlZjEyIiwieCIsInkiLCJob3Zlck5vZGUiLCJlbGVtZW50RnJvbVBvaW50IiwiZnJhbWVJZCIsInNldE5vZGVWYWx1ZSIsIl9yZWYxMyIsImdldEJveE1vZGVsIiwiX3JlZjE0IiwibWFyZ2luIiwiZ2V0U3R5bGVQcm9wZXJ0eVZhbHVlIiwicGFkZGluZyIsImJvcmRlciIsIl9ub2RlJGdldEJvdW5kaW5nQ2xpZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwibW9kZWwiLCJjb250ZW50IiwidW5zaGlmdCIsIiQkaW5zcGVjdE1vZGUiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnROb2RlSWQiLCJub2RlSGlnaGxpZ2h0UmVxdWVzdGVkIiwiaW5zcGVjdE5vZGVSZXF1ZXN0ZWQiLCJnZXRFbGVtZW50QnlJZCIsImRpc3BsYXkiLCJfdGhpczUiLCJpc0RldnRvb2xNdXRhdGlvbiIsIl9yZWYxNSIsIl90YXJnZXQkZ2V0QXR0cmlidXRlIiwiX2FkZGVkTm9kZXMkIiwiX2FkZGVkTm9kZXMkJGdldEF0dHJpIiwiX3JlbW92ZWROb2RlcyQiLCJfcmVtb3ZlZE5vZGVzJCRnZXRBdHQiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25MaXN0IiwibXV0YXRpb24iLCJhdHRyaWJ1dGVOYW1lIiwicGFyZW50Tm9kZUlkIiwidXBkYXRlQ2hpbGROb2RlQ291bnQiLCJjaGlsZE5vZGVDb3VudFVwZGF0ZWQiLCJjaGlsZE5vZGVJbnNlcnRlZCIsInByZXZpb3VzTm9kZUlkIiwiY2hpbGROb2RlUmVtb3ZlZCIsImF0dHJpYnV0ZU1vZGlmaWVkIiwiYXR0cmlidXRlUmVtb3ZlZCIsImNoYXJhY3RlckRhdGFNb2RpZmllZCIsImNoYXJhY3RlckRhdGEiLCJvYnNlcnZlIiwiZG9jdW1lbnRFbGVtZW50IiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsInNvY2tldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJSdW50aW1lIiwiUGFnZSIsIk5ldHdvcmsiLCJDc3MiLCJTb3VyY2VEZWJ1Z2dlciIsIlNjcmVlblByZXZpZXciLCJDaHJvbWVEb21haW4iLCJyZWdpc3RlclByb3RvY29sIiwicHJveHlBcHBlbmRDaGlsZCIsImV4ZWN1dGUiLCJfbWVzc2FnZSIsIm1ldGhvZENhbGwiLCJkb21haW5zIiwiZG9tYWluIiwiY21kcyIsImNtZCIsImJpbmQiLCJvcmlnaW5IZWFkQXBwZW5kQ2hpbGQiLCJIVE1MSGVhZEVsZW1lbnQiLCJvcmlnaW5Cb2R5QXBwZW5kQ2hpbGQiLCJIVE1MQm9keUVsZW1lbnQiLCJmZXRjaFNvdXJjZSIsIl9ub2RlJHRhZ05hbWUiLCJ0YWciLCJyZWwiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwidCIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwid3JhcCIsIkdlbmVyYXRvciIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJhcmciLCJoIiwiZiIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfX2F3YWl0IiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJkZWxlZ2F0ZSIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsInJlc3VsdE5hbWUiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwibWFyayIsImF3cmFwIiwiYXN5bmMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJjYXRjaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsImluZm8iLCJfYXN5bmNUb0dlbmVyYXRvciIsImZuIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiX3NldFByb3RvdHlwZU9mIiwianNDb29raWUiLCJtaW1lIiwiZ2V0VGltZXN0YW1wIiwib3JpZ2luRmV0Y2giLCJmZXRjaCIsInJlcXVlc3RJZCIsInJlc3BvbnNlRGF0YSIsImNhY2hlUmVxdWVzdCIsImlzRW5hYmxlIiwic29ja2V0U2VuZCIsImhvb2tYaHIiLCJob29rRmV0Y2giLCJmb3JtYXRSZXNwb25zZUhlYWRlciIsImhlYWRlcnMiLCJnZXREZWZhdWx0SGVhZGVycyIsImNvb2tpZSIsIkNvb2tpZSIsInJlcG9ydEltYWdlTmV0d29yayIsImdldFJlc3BvbnNlQm9keSIsImJhc2U2NEVuY29kZWQiLCJyZXNwb25zZSIsImdldENvb2tpZXMiLCJjb29raWVzIiwiZGVsZXRlQ29va2llcyIsInJlbW92ZSIsInBhdGgiLCJzZXRDb29raWUiLCJnZXRSZXF1ZXN0SWQiLCJpbnN0YW5jZSIsInhoclNlbmQiLCJ4aHJPcGVuIiwieGhyU2V0UmVxdWVzdEhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCIkJHJlcXVlc3QiLCJyZXF1ZXN0IiwicG9zdERhdGEiLCJoYXNQb3N0RGF0YSIsInJlcXVlc3RXaWxsQmVTZW50IiwiZG9jdW1lbnRVUkwiLCJ0aW1lc3RhbXAiLCJ3YWxsVGltZSIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlSGVhZGVycyIsInNlbmROZXR3b3JrRXZlbnQiLCJibG9ja2VkQ29va2llcyIsImhlYWRlcnNUZXh0Iiwic3RhdHVzIiwic3RhdHVzVGV4dCIsImVuY29kZWREYXRhTGVuZ3RoIiwiTnVtYmVyIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJyZXNwb25zZVR5cGUiLCJTdHJpbmciLCJpbml0Q29uZmlnIiwiVVJMIiwic2VuZFJlcXVlc3QiLCJvcmlSZXNwb25zZSIsImNvbnRlbnRUeXBlIiwic29tZSIsImNsb25lIiwicmVzcG9uc2VCb2R5IiwiaW1nVXJscyIsInJlcG9ydE5ldHdvcmsiLCJ1cmxzIiwiX2NhbGxlZSIsIl95aWVsZCRvcmlnaW5GZXRjaCR0aCIsImJhc2U2NCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcm9jZXNzIiwiZW52IiwiREVCVUdfSE9TVCIsImVuY29kZVVSSUNvbXBvbmVudCIsImpzb24iLCJ0MCIsIl94IiwiZ2V0SW1hZ2VVcmxzIiwiaW1hZ2VzIiwiaW1hZ2UiLCJvYnNlcnZlckJvZHlNdXRhdGlvbiIsInJlc3BvbnNlUmVjZWl2ZWRFeHRyYUluZm8iLCJyZXNwb25zZVJlY2VpdmVkIiwibWltZVR5cGUiLCJsb2FkaW5nRmluaXNoZWQiLCJoaWdobGlnaHRDb25maWciLCJoaWdobGlnaHRCb3giLCJmb3JtYXROdW1iZXIiLCJudW0iLCJmaXhlZCIsInRvRml4ZWQiLCJudW1BcnIiLCJpc0FycmF5IiwicmdiYSIsIl90ZW1wIiwiY3JlYXRlSGlnaGxpZ2h0Qm94IiwiaGlnaGxpZ2h0Tm9kZSIsIm5vZGVFbGVtZW50IiwiQ09NTUVOVF9OT0RFIiwiRE9DVU1FTlRfVFlQRV9OT0RFIiwiSFRNTEVsZW1lbnQiLCJ1cGRhdGVIaWdobGlnaHRCb3giLCJoaWRlSGlnaGxpZ2h0IiwiY29udGFpbmVyQm94Iiwic2V0SW5zcGVjdE1vZGUiLCJtb2RlIiwiaGlnaGxpZ2h0IiwidG91Y2hlcyIsInRvdWNoIiwiY2xpZW50WCIsImNsaWVudFkiLCJwYXNzaXZlIiwiY29udGVudEJveCIsIm1hcmdpbkJveCIsInRvb2x0aXBzQm94IiwiYXNzaWduIiwicG9zaXRpb24iLCJib3JkZXJTaXppbmciLCJ6SW5kZXgiLCJwb2ludGVyRXZlbnRzIiwiaXNCb3JkZXJCb3giLCJjb250ZW50V2lkdGgiLCJjb250ZW50SGVpZ2h0IiwibWFyZ2luV2lkdGgiLCJtYXJnaW5IZWlnaHQiLCJjb250ZW50Q29sb3IiLCJwYWRkaW5nQ29sb3IiLCJtYXJnaW5Db2xvciIsIl90aGlzJGhpZ2hsaWdodEJveCIsImJhY2tncm91bmQiLCJib3JkZXJDb2xvciIsImJvcmRlclN0eWxlIiwiYm9yZGVyV2lkdGgiLCJpc1RvcFBvc2l0aW9uIiwiY2xzIiwiY3VycmVudENsYXNzTmFtZSIsImlubmVySFRNTCIsImNvbG9yIiwiZnJhbWUiLCJnZXRSZXNvdXJjZVRyZWUiLCJmcmFtZVRyZWUiLCJyZXNvdXJjZXMiLCJnZXRSZXNvdXJjZUNvbnRlbnQiLCJzdGFydFNjcmVlbmNhc3QiLCJjYXB0dXJlU2NyZWVuIiwiaGlkZGVuIiwic2NyZWVuY2FzdEZyYW1lIiwic2Vzc2lvbklkIiwibWV0YWRhdGEiLCJkZXZpY2VIZWlnaHQiLCJpbm5lckhlaWdodCIsImRldmljZVdpZHRoIiwiaW5uZXJXaWR0aCIsInBhZ2VTY2FsZUZhY3RvciIsIm9mZnNldFRvcCIsInNjcm9sbE9mZnNldFgiLCJzY3JvbGxPZmZzZXRZIiwiaW50ZXJ2YWxUaW1lciIsInNldEludGVydmFsIiwic3RvcFNjcmVlbmNhc3QiLCJjbGVhckludGVydmFsIiwiRE9NU3RvcmFnZSIsIkRPTSIsImV4ZWN1dGlvbkNvbnRleHRDcmVhdGVkIiwiY29uc29sZUFQSUNhbGxlZCIsImV4Y2VwdGlvblRocm93biIsImNhcHR1cmVkIiwic3luY1Njcm9sbCIsInN5bmNNb3VzZSIsImNhbGxzaXRlIiwicmVxdWlyZSIsImNhY2hlQ29uc29sZSIsImNhY2hlRXJyb3IiLCJob29rQ29uc29sZSIsImxpc3RlbkVycm9yIiwiZ2V0Q2FsbEZyYW1lcyIsImNhbGxGcmFtZXMiLCJmdW5jdGlvbk5hbWUiLCJnZXRQb3NpdGlvbkFuZFVybCIsImdldEZ1bmN0aW9uTmFtZSIsImxpbmVOdW1iZXIiLCJnZXRMaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiZ2V0Q29sdW1uTnVtYmVyIiwiZ2V0RmlsZU5hbWUiLCJzaGlmdCIsInN0ciIsInJlZzEiLCJjb250ZXh0IiwiZXZhbHVhdGUiLCJleHByZXNzaW9uIiwiZXZhbCIsImdldFByb3BlcnRpZXMiLCJyZWxlYXNlT2JqZWN0IiwibWV0aG9kcyIsIndhcm4iLCJuYXRpdmVDb25zb2xlRnVuYyIsImV4ZWN1dGlvbkNvbnRleHRJZCIsInN0YWNrVHJhY2UiLCJleGNlcHRpb25EZXRhaWxzIiwiZXhjZXB0aW9uIiwic2Nyb2xsVG9wIiwic2Nyb2xsTGVmdCIsImNoYW5nZWRUb3VjaGVzIiwicmVuZGVyU2NyZWVuIiwiaHRtbDJjYW52YXMiLCJhbGxvd1RhaW50IiwiYmFja2dyb3VuZENvbG9yIiwidXNlQ09SUyIsImltYWdlVGltZW91dCIsInNjYWxlIiwiaWdub3JlRWxlbWVudHMiLCJfZWxlbWVudCRzdHlsZSIsIm9wYWNpdHkiLCJ2aXNpYmlsaXR5IiwiY2FudmFzIiwidG9EYXRhVVJMIiwic3RhcnRQcmV2aWV3IiwiY291bnRzIiwiam9pblN0eWxlVGFncyIsInRhZ3MiLCJoZWFkIiwib2JzZXJ2ZXJJbnN0IiwiY3VyU3R5bGVzIiwic3RvcFByZXZpZXciLCJkaXNjb25uZWN0IiwiZ2V0U3RvcmFnZUtleUZvckZyYW1lIiwiTWltZSIsIl9NaW1lX2V4dGVuc2lvblRvVHlwZSIsIl9NaW1lX3R5cGVUb0V4dGVuc2lvbiIsIl9NaW1lX3R5cGVUb0V4dGVuc2lvbnMiLCJfYXJncyIsInR5cGVNYXAiLCJmb3JjZSIsIl9pMiIsIl9PYmplY3QkZW50cmllcyIsIl9PYmplY3QkZW50cmllcyRfaSIsImV4dCIsIl9fY2xhc3NQcml2YXRlRmllbGRHZXQiLCJhbGxFeHRlbnNpb25zIiwiZmlyc3QiLCJleHRlbnNpb24iLCJzdGFycmVkIiwic3RhcnRzV2l0aCIsImN1cnJlbnRUeXBlIiwiX2NsYXNzUHJpdmF0ZUZpZWxkR2UiLCJsYXN0IiwiaGFzUGF0aCIsImhhc0RvdCIsImdldEV4dGVuc2lvbiIsIl90eXBlIiwiX3R5cGUkc3BsaXQiLCJnZXRBbGxFeHRlbnNpb25zIiwiX2NsYXNzUHJpdmF0ZUZpZWxkR2UyIiwiX2ZyZWV6ZSIsImZyZWV6ZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfZ2V0VGVzdFN0YXRlIiwidHlwZXMiLCJzdGFuZGFyZFR5cGVzIiwidXVpZCIsImdldERvY3VtZW50RmF2aWNvbiIsImxpbmtzIiwiaWNvbiIsImZpbmQiLCJsaW5rIiwiaWNvblVybCIsImdldElkIiwiZ2V0UXVlcnkiLCJzZWFyY2giLCJVUkxTZWFyY2hQYXJhbXMiLCJhcHBlbmQiLCJ0aXRsZSIsImluaXRTb2NrZXQiLCJob3N0IiwicGFyc2UiLCJoZWFydGJlYXQiLCJrZWVwU2NyZWVuRGlzcGxheSIsIndha2VMb2NrIiwidmlzaWJpbGl0eVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==