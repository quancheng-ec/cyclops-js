(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('parse-headers')) :
	typeof define === 'function' && define.amd ? define(['parse-headers'], factory) :
	(global.Cyclops = factory(global.parseHeaders));
}(this, (function (parseHeaders) { 'use strict';

parseHeaders = parseHeaders && parseHeaders.hasOwnProperty('default') ? parseHeaders['default'] : parseHeaders;

var watchGlobalError = function watchGlobalError() {
  var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  window.addEventListener('error', handleError(conf), true);
  window.addEventListener('unhandledrejection', function (event) {
    console.warn('WARNING: Unhandled promise rejection. Shame on you! Reason: ' + event.reason);
  }, true);
  window.addEventListener('rejectionhandled', function (event) {
    console.log('REJECTIONHANDLED');
  });
};

function handleError(conf) {
  return function (e) {
    console.log('catch error: ', formatError(e));
    conf.callback && conf.callback();
    if (conf.prevent) {
      e.preventDefault();
    }
  };
}

function formatError(errorEvent) {
  if (errorEvent.filename) {
    return {
      type: 'script',
      source: errorEvent.filename,
      message: errorEvent.message,
      lineNo: errorEvent.lineno,
      colNo: errorEvent.colno
    };
  }
  return {
    type: 'assets',
    source: errorEvent.srcElement.src
  };
}

var calculateLoadTimes = function calculateLoadTimes(conf) {
  if (performance === undefined) {
    console.log('= Calculate Load Times: performance NOT supported');
    return;
  }

  var resources = performance.getEntriesByType('resource');

  if (resources === undefined || resources.length <= 0) {
    console.log('= Calculate Load Times: there are NO `resource` performance records');
    return;
  }

  console.log('resources: ', resources.map(serializeResourceTime));
};

function serializeResourceTime(res) {
  return {
    name: res.name,
    redirectTime: res.redirectEnd - res.redirectStart,
    dnsTime: res.domainLookupEnd - res.domainLookupStart,
    tcpHandshakeTime: res.connectEnd - res.connectStart,
    secureTime: res.secureConnectionStart > 0 ? res.connectEnd - res.secureConnectionStart : '0',
    responseTime: res.responseEnd - res.responseStart,
    duration: res.startTime > 0 ? res.responseEnd - res.startTime : '0'
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof undefined === 'function' && undefined.amd) {
		undefined(factory);
		registeredInModuleLoader = true;
	}
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

var getUserFromCookie = function getUserFromCookie() {
  var user = {};['userId', 'companyId', 'pToken'].forEach(function (item) {
    user[item] = js_cookie.get(item);
  });
  return user;
};

/*
 * author: wendu
 * email: 824783146@qq.com
 * source code: https://github.com/wendux/Ajax-hook
 **/
var ajaxhook=function (ob) {
    ob.hookAjax = function (funs) {
        window._ahrealxhr = window._ahrealxhr || XMLHttpRequest;
        XMLHttpRequest = function () {
            this.xhr = new window._ahrealxhr;
            for (var attr in this.xhr) {
                var type = "";
                try {
                    type = typeof this.xhr[attr];
                } catch (e) {}
                if (type === "function") {
                    this[attr] = hookfun(attr);
                } else {
                    Object.defineProperty(this, attr, {
                        get: getFactory(attr),
                        set: setFactory(attr)
                    });
                }
            }
        };

        function getFactory(attr) {
            return function () {
                return this.hasOwnProperty(attr + "_")?this[attr + "_"]:this.xhr[attr];
            }
        }

        function setFactory(attr) {
            return function (f) {
                var xhr = this.xhr;
                var that = this;
                if (attr.indexOf("on") != 0) {
                    this[attr + "_"] = f;
                    return;
                }
                if (funs[attr]) {
                    xhr[attr] = function () {
                        funs[attr](that) || f.apply(xhr, arguments);
                    };
                } else {
                    xhr[attr] = f;
                }
            }
        }

        function hookfun(fun) {
            return function () {
                var args = [].slice.call(arguments);
                if (funs[fun] && funs[fun].call(this, args, this.xhr)) {
                    return;
                }
                return this.xhr[fun].apply(this.xhr, args);
            }
        }
        return window._ahrealxhr;
    };
    ob.unHookAjax = function () {
        if (window._ahrealxhr)  XMLHttpRequest = window._ahrealxhr;
        window._ahrealxhr = undefined;
    };
    //for typescript
    ob.default=ob;
};

var ajaxHook = createCommonjsModule(function (module) {
ajaxhook(module.exports);
});

var watchAsyncCalls = function watchAsyncCalls(conf) {
  return ajaxHook.hookAjax({
    setRequestHeader: getRequestHeaders,
    send: beforeSend,
    onreadystatechange: handleStateChange
  });
};

function getRequestHeaders(kvPair) {
  if (!this._requestHeaders) this._requestHeaders = '';
  this._requestHeaders += kvPair[0] + ': ' + kvPair[1] + '\n';
}

function beforeSend(body) {
  this._requestBody = body;
  this._cookies = document.cookie;
}

function handleStateChange(ctx) {
  if (ctx.readyState === 4 && ctx.status >= 400) {
    console.log(serialize(ctx));
  }
}

function serialize(ctx) {
  return {
    status: ctx.status,
    url: ctx.responseURL,
    response: {
      headers: ctx.getAllResponseHeaders()
    },
    request: {
      headers: ctx._requestHeaders,
      body: ctx._requestBody[0],
      cookies: ctx._cookies
    }
  };
}

var generateTraceId = function generateTraceId() {
  return Math.random().toString(36).slice(2) + new Date().getTime();
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Cyclops = function () {
  function Cyclops(conf) {
    classCallCheck(this, Cyclops);

    this.conf = conf;
    this._baseInfo = {
      user: getUserFromCookie(),
      traceId: generateTraceId()
    };
  }

  createClass(Cyclops, [{
    key: 'send',
    value: function send(level) {}
  }, {
    key: 'start',
    value: function start() {
      watchAsyncCalls(this.conf);
      watchGlobalError(this.conf.errorHandler);
      window.onload = calculateLoadTimes;
    }
  }]);
  return Cyclops;
}();

return Cyclops;

})));
//# sourceMappingURL=index.js.map
