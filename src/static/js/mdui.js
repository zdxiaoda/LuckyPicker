/*!
 * mdui 1.0.2 (https://mdui.org)
 * Copyright 2016-2021 zdhxiong
 * Licensed under MIT
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).mdui =
        e());
})(this, function () {
  "use strict";
  function t(t, e) {
    e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
  }
  function e(e) {
    var n = this.constructor;
    return this.then(
      function (t) {
        return n.resolve(e()).then(function () {
          return t;
        });
      },
      function (t) {
        return n.resolve(e()).then(function () {
          return n.reject(t);
        });
      }
    );
  }
  function n(n) {
    return new this(function (i, t) {
      if (!n || void 0 === n.length)
        return t(
          new TypeError(
            typeof n +
              " " +
              n +
              " is not iterable(cannot read property Symbol(Symbol.iterator))"
          )
        );
      var o = Array.prototype.slice.call(n);
      if (0 === o.length) return i([]);
      var s = o.length;
      function r(e, t) {
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var n = t.then;
          if ("function" == typeof n)
            return void n.call(
              t,
              function (t) {
                r(e, t);
              },
              function (t) {
                (o[e] = { status: "rejected", reason: t }), 0 == --s && i(o);
              }
            );
        }
        (o[e] = { status: "fulfilled", value: t }), 0 == --s && i(o);
      }
      for (var e = 0; e < o.length; e++) r(e, o[e]);
    });
  }
  !(function () {
    try {
      return new MouseEvent("test");
    } catch (t) {}
    function t(t, e) {
      e = e || { bubbles: !1, cancelable: !1 };
      var n = document.createEvent("MouseEvent");
      return (
        n.initMouseEvent(
          t,
          e.bubbles,
          e.cancelable,
          window,
          0,
          e.screenX || 0,
          e.screenY || 0,
          e.clientX || 0,
          e.clientY || 0,
          e.ctrlKey || !1,
          e.altKey || !1,
          e.shiftKey || !1,
          e.metaKey || !1,
          e.button || 0,
          e.relatedTarget || null
        ),
        n
      );
    }
    (t.prototype = Event.prototype), (window.MouseEvent = t);
  })(),
    "function" != typeof window.CustomEvent &&
      ((t.prototype = window.Event.prototype), (window.CustomEvent = t));
  var i = setTimeout;
  function u(t) {
    return Boolean(t && void 0 !== t.length);
  }
  function o() {}
  function s(t) {
    if (!(this instanceof s))
      throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof t) throw new TypeError("not a function");
    (this._state = 0),
      (this._handled = !1),
      (this._value = void 0),
      (this._deferreds = []),
      h(t, this);
  }
  function r(n, i) {
    for (; 3 === n._state; ) n = n._value;
    0 !== n._state
      ? ((n._handled = !0),
        s._immediateFn(function () {
          var t = 1 === n._state ? i.onFulfilled : i.onRejected;
          if (null !== t) {
            var e;
            try {
              e = t(n._value);
            } catch (t) {
              return void c(i.promise, t);
            }
            a(i.promise, e);
          } else (1 === n._state ? a : c)(i.promise, n._value);
        }))
      : n._deferreds.push(i);
  }
  function a(e, t) {
    try {
      if (t === e)
        throw new TypeError("A promise cannot be resolved with itself.");
      if (t && ("object" == typeof t || "function" == typeof t)) {
        var n = t.then;
        if (t instanceof s) return (e._state = 3), (e._value = t), void l(e);
        if ("function" == typeof n)
          return void h(
            ((i = n),
            (o = t),
            function () {
              i.apply(o, arguments);
            }),
            e
          );
      }
      (e._state = 1), (e._value = t), l(e);
    } catch (t) {
      c(e, t);
    }
    var i, o;
  }
  function c(t, e) {
    (t._state = 2), (t._value = e), l(t);
  }
  function l(t) {
    2 === t._state &&
      0 === t._deferreds.length &&
      s._immediateFn(function () {
        t._handled || s._unhandledRejectionFn(t._value);
      });
    for (var e = 0, n = t._deferreds.length; e < n; e++) r(t, t._deferreds[e]);
    t._deferreds = null;
  }
  function d(t, e, n) {
    (this.onFulfilled = "function" == typeof t ? t : null),
      (this.onRejected = "function" == typeof e ? e : null),
      (this.promise = n);
  }
  function h(t, e) {
    var n = !1;
    try {
      t(
        function (t) {
          n || ((n = !0), a(e, t));
        },
        function (t) {
          n || ((n = !0), c(e, t));
        }
      );
    } catch (t) {
      if (n) return;
      (n = !0), c(e, t);
    }
  }
  (s.prototype.catch = function (t) {
    return this.then(null, t);
  }),
    (s.prototype.then = function (t, e) {
      var n = new this.constructor(o);
      return r(this, new d(t, e, n)), n;
    }),
    (s.prototype.finally = e),
    (s.all = function (e) {
      return new s(function (i, o) {
        if (!u(e)) return o(new TypeError("Promise.all accepts an array"));
        var s = Array.prototype.slice.call(e);
        if (0 === s.length) return i([]);
        var r = s.length;
        function a(e, t) {
          try {
            if (t && ("object" == typeof t || "function" == typeof t)) {
              var n = t.then;
              if ("function" == typeof n)
                return void n.call(
                  t,
                  function (t) {
                    a(e, t);
                  },
                  o
                );
            }
            (s[e] = t), 0 == --r && i(s);
          } catch (t) {
            o(t);
          }
        }
        for (var t = 0; t < s.length; t++) a(t, s[t]);
      });
    }),
    (s.allSettled = n),
    (s.resolve = function (e) {
      return e && "object" == typeof e && e.constructor === s
        ? e
        : new s(function (t) {
            t(e);
          });
    }),
    (s.reject = function (n) {
      return new s(function (t, e) {
        e(n);
      });
    }),
    (s.race = function (o) {
      return new s(function (t, e) {
        if (!u(o)) return e(new TypeError("Promise.race accepts an array"));
        for (var n = 0, i = o.length; n < i; n++) s.resolve(o[n]).then(t, e);
      });
    }),
    (s._immediateFn =
      "function" == typeof setImmediate
        ? function (t) {
            setImmediate(t);
          }
        : function (t) {
            i(t, 0);
          }),
    (s._unhandledRejectionFn = function (t) {
      "undefined" != typeof console &&
        console &&
        console.warn("Possible Unhandled Promise Rejection:", t);
    });
  var f = (function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw new Error("unable to locate global object");
  })();
  function p(t) {
    return "function" == typeof t;
  }
  function E(t) {
    return "string" == typeof t;
  }
  function m(t) {
    return "number" == typeof t;
  }
  function O(t) {
    return void 0 === t;
  }
  function v(t) {
    return null === t;
  }
  function g(t) {
    return t instanceof Window;
  }
  function y(t) {
    return t instanceof Document;
  }
  function b(t) {
    return t instanceof Element;
  }
  function x(t) {
    return !p(t) && !g(t) && m(t.length);
  }
  function C(t) {
    return "object" == typeof t && null !== t;
  }
  function w(t) {
    return y(t) ? t.documentElement : t;
  }
  function $(t) {
    return t.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, function (t, e) {
      return e.toUpperCase();
    });
  }
  function k(t) {
    return t.replace(/[A-Z]/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }
  function _(t, e) {
    return window.getComputedStyle(t).getPropertyValue(k(e));
  }
  function T(t) {
    return "border-box" === _(t, "box-sizing");
  }
  function I(o, t, s) {
    var r = "width" === t ? ["Left", "Right"] : ["Top", "Bottom"];
    return [0, 1].reduce(function (t, e, n) {
      var i = s + r[n];
      return "border" === s && (i += "Width"), t + parseFloat(_(o, i) || "0");
    }, 0);
  }
  function S(t, e) {
    if ("width" !== e && "height" !== e) return _(t, e);
    var n = t.getBoundingClientRect()[e];
    return T(t) ? n + "px" : n - I(t, e, "border") - I(t, e, "padding") + "px";
  }
  function j(t, e) {
    var n = document.createElement(e);
    return (n.innerHTML = t), [].slice.call(n.childNodes);
  }
  function M() {
    return !1;
  }
  "function" != typeof f.Promise
    ? (f.Promise = s)
    : f.Promise.prototype.finally
    ? f.Promise.allSettled || (f.Promise.allSettled = n)
    : (f.Promise.prototype.finally = e);
  var A = [
    "animationIterationCount",
    "columnCount",
    "fillOpacity",
    "flexGrow",
    "flexShrink",
    "fontWeight",
    "gridArea",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnStart",
    "gridRow",
    "gridRowEnd",
    "gridRowStart",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "widows",
    "zIndex",
    "zoom",
  ];
  function D(t, e) {
    if (x(t)) {
      for (var n = 0; n < t.length; n += 1)
        if (!1 === e.call(t[n], n, t[n])) return t;
    } else for (var i = Object.keys(t), o = 0; o < i.length; o += 1) if (!1 === e.call(t[i[o]], i[o], t[i[o]])) return t;
    return t;
  }
  function R(t) {
    var n = this;
    return (
      (this.length = 0),
      t &&
        (D(t, function (t, e) {
          n[t] = e;
        }),
        (this.length = t.length)),
      this
    );
  }
  var H,
    L =
      (((H = function (t) {
        if (!t) return new R();
        if (t instanceof R) return t;
        if (p(t))
          return (
            /complete|loaded|interactive/.test(document.readyState) &&
            document.body
              ? t.call(document, H)
              : document.addEventListener(
                  "DOMContentLoaded",
                  function () {
                    return t.call(document, H);
                  },
                  !1
                ),
            new R([document])
          );
        if (E(t)) {
          var n = t.trim();
          if ("<" === n[0] && ">" === n[n.length - 1]) {
            var i = "div";
            return (
              D(
                {
                  li: "ul",
                  tr: "tbody",
                  td: "tr",
                  th: "tr",
                  tbody: "table",
                  option: "select",
                },
                function (t, e) {
                  if (0 === n.indexOf("<" + t)) return (i = e), !1;
                }
              ),
              new R(j(n, i))
            );
          }
          if (!("#" === t[0] && !t.match(/[ .<>:~]/)))
            return new R(document.querySelectorAll(t));
          var e = document.getElementById(t.slice(1));
          return e ? new R([e]) : new R();
        }
        return !x(t) || t instanceof Node ? new R([t]) : new R(t);
      }).fn = R.prototype),
      H);
  setTimeout(function () {
    return L("body").addClass("mdui-loaded");
  });
  var B = { $: L };
  function P(t, e) {
    return t !== e && w(t).contains(e);
  }
  function N(n, t) {
    return (
      D(t, function (t, e) {
        n.push(e);
      }),
      n
    );
  }
  (L.fn.each = function (t) {
    return D(this, t);
  }),
    (L.fn.get = function (t) {
      return void 0 === t
        ? [].slice.call(this)
        : this[0 <= t ? t : t + this.length];
    }),
    (L.fn.find = function (n) {
      var i = [];
      return (
        this.each(function (t, e) {
          N(i, L(e.querySelectorAll(n)).get());
        }),
        new R(i)
      );
    });
  var z = {},
    F = 1;
  function q(t) {
    var e = "_mduiEventId";
    return t[e] || (t[e] = ++F), t[e];
  }
  function W(t) {
    var e = t.split(".");
    return { type: e[0], ns: e.slice(1).sort().join(" ") };
  }
  function Y(t) {
    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)");
  }
  function U(s, t, r, a) {
    function u(t) {
      delete e[t.id], s.removeEventListener(t.type, t.proxy, !1);
    }
    var e = z[q(s)] || [];
    t
      ? t.split(" ").forEach(function (t) {
          var e, n, i, o;
          t &&
            ((e = s),
            (n = r),
            (i = a),
            (o = W(t)),
            (z[q(e)] || []).filter(function (t) {
              return (
                t &&
                (!o.type || t.type === o.type) &&
                (!o.ns || Y(o.ns).test(t.ns)) &&
                (!n || q(t.func) === q(n)) &&
                (!i || t.selector === i)
              );
            })).forEach(function (t) {
              return u(t);
            });
        })
      : e.forEach(function (t) {
          return u(t);
        });
  }
  function X(n, t) {
    for (var e = [], i = arguments.length - 2; 0 < i--; )
      e[i] = arguments[i + 2];
    return (
      e.unshift(t),
      D(e, function (t, e) {
        D(e, function (t, e) {
          O(e) || (n[t] = e);
        });
      }),
      n
    );
  }
  function V(t) {
    if (!C(t) && !Array.isArray(t)) return "";
    var e = [];
    function s(n, i) {
      var o;
      C(i)
        ? D(i, function (t, e) {
            (o = Array.isArray(i) && !C(e) ? "" : t), s(n + "[" + o + "]", e);
          })
        : ((o = null == i || "" === i ? "=" : "=" + encodeURIComponent(i)),
          e.push(encodeURIComponent(n) + o));
    }
    return (
      Array.isArray(t)
        ? D(t, function () {
            s(this.name, this.value);
          })
        : D(t, s),
      e.join("&")
    );
  }
  L.fn.trigger = function (t, e) {
    var n,
      i = W(t),
      o = { bubbles: !0, cancelable: !0 },
      s = -1 < ["click", "mousedown", "mouseup", "mousemove"].indexOf(i.type);
    return (
      ((n = s
        ? new MouseEvent(i.type, o)
        : ((o.detail = e), new CustomEvent(i.type, o)))._detail = e),
      (n._ns = i.ns),
      this.each(function () {
        this.dispatchEvent(n);
      })
    );
  };
  var J = {},
    K = {
      ajaxStart: "start.mdui.ajax",
      ajaxSuccess: "success.mdui.ajax",
      ajaxError: "error.mdui.ajax",
      ajaxComplete: "complete.mdui.ajax",
    };
  function G(t) {
    return 0 <= ["GET", "HEAD"].indexOf(t);
  }
  function Q(t, e) {
    return (t + "&" + e).replace(/[&?]{1,2}/, "?");
  }
  (L.ajax = function (t) {
    var e,
      n,
      r,
      a = !1,
      u = {},
      c =
        ((e = t),
        (n = {
          url: "",
          method: "GET",
          data: "",
          processData: !0,
          async: !0,
          cache: !0,
          username: "",
          password: "",
          headers: {},
          xhrFields: {},
          statusCode: {},
          dataType: "text",
          contentType: "application/x-www-form-urlencoded",
          timeout: 0,
          global: !0,
        }),
        D(J, function (t, e) {
          ["beforeSend", "success", "error", "complete", "statusCode"].indexOf(
            t
          ) < 0 &&
            !O(e) &&
            (n[t] = e);
        }),
        X({}, n, e)),
      i = c.url || window.location.toString(),
      l = c.method.toUpperCase(),
      d = c.data,
      o = c.processData,
      h = c.async,
      f = c.cache,
      p = c.username,
      m = c.password,
      v = c.headers,
      g = c.xhrFields,
      y = c.statusCode,
      b = c.dataType,
      x = c.contentType,
      C = c.timeout,
      w = c.global;
    function $(t, e, n) {
      for (var i, o, s = [], r = arguments.length - 3; 0 < r--; )
        s[r] = arguments[r + 3];
      w && L(document).trigger(t, e),
        n &&
          (n in J && (i = J[n].apply(J, s)),
          c[n] && (o = c[n].apply(c, s)),
          "beforeSend" !== n || (!1 !== i && !1 !== o) || (a = !0));
    }
    return (
      !d ||
        (!G(l) && !o) ||
        E(d) ||
        d instanceof ArrayBuffer ||
        d instanceof Blob ||
        d instanceof Document ||
        d instanceof FormData ||
        (d = V(d)),
      d && G(l) && ((i = Q(i, d)), (d = null)),
      new Promise(function (t, e) {
        G(l) && !f && (i = Q(i, "_=" + Date.now()));
        var o,
          s = new XMLHttpRequest();
        s.open(l, i, h, p, m),
          (x || (d && !G(l) && !1 !== x)) &&
            s.setRequestHeader("Content-Type", x),
          "json" === b &&
            s.setRequestHeader("Accept", "application/json, text/javascript"),
          v &&
            D(v, function (t, e) {
              O(e) || s.setRequestHeader(t, e + "");
            }),
          (/^([\w-]+:)?\/\/([^/]+)/.test(i) &&
            RegExp.$2 !== window.location.host) ||
            s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
          g &&
            D(g, function (t, e) {
              s[t] = e;
            }),
          (u.xhr = s),
          (u.options = c),
          (s.onload = function () {
            o && clearTimeout(o);
            var n,
              i =
                (200 <= s.status && s.status < 300) ||
                304 === s.status ||
                0 === s.status;
            if (i)
              if (
                ((r =
                  204 === s.status || "HEAD" === l
                    ? "nocontent"
                    : 304 === s.status
                    ? "notmodified"
                    : "success"),
                "json" === b)
              ) {
                try {
                  (n = "HEAD" === l ? void 0 : JSON.parse(s.responseText)),
                    (u.data = n);
                } catch (t) {
                  $(K.ajaxError, u, "error", s, (r = "parsererror")),
                    e(new Error(r));
                }
                "parsererror" !== r &&
                  ($(K.ajaxSuccess, u, "success", n, r, s), t(n));
              } else
                (n =
                  "HEAD" === l
                    ? void 0
                    : "text" === s.responseType || "" === s.responseType
                    ? s.responseText
                    : s.response),
                  (u.data = n),
                  $(K.ajaxSuccess, u, "success", n, r, s),
                  t(n);
            else $(K.ajaxError, u, (r = "error"), s, r), e(new Error(r));
            D([J.statusCode, y], function (t, e) {
              e &&
                e[s.status] &&
                (i ? e[s.status](n, r, s) : e[s.status](s, r));
            }),
              $(K.ajaxComplete, u, "complete", s, r);
          }),
          (s.onerror = function () {
            o && clearTimeout(o),
              $(K.ajaxError, u, "error", s, s.statusText),
              $(K.ajaxComplete, u, "complete", s, "error"),
              e(new Error(s.statusText));
          }),
          (s.onabort = function () {
            var t = "abort";
            o && ((t = "timeout"), clearTimeout(o)),
              $(K.ajaxError, u, "error", s, t),
              $(K.ajaxComplete, u, "complete", s, t),
              e(new Error(t));
          }),
          $(K.ajaxStart, u, "beforeSend", s),
          a
            ? e(new Error("cancel"))
            : (0 < C &&
                (o = setTimeout(function () {
                  s.abort();
                }, C)),
              s.send(d));
      })
    );
  }),
    (L.ajaxSetup = function (t) {
      return X(J, t);
    }),
    (L.contains = P);
  var Z = "_mduiElementDataStorage";
  function tt(n, t) {
    n[Z] || (n[Z] = {}),
      D(t, function (t, e) {
        n[Z][$(t)] = e;
      });
  }
  function et(t, e, n) {
    var i;
    return C(e)
      ? (tt(t, e), e)
      : O(n)
      ? O(e)
        ? t[Z]
          ? t[Z]
          : {}
        : ((e = $(e)), t[Z] && e in t[Z] ? t[Z][e] : void 0)
      : (tt(t, (((i = {})[e] = n), i)), n);
  }
  function nt(t, n) {
    var e,
      i,
      o = [];
    return (
      D(t, function (t, e) {
        null != (i = n.call(window, e, t)) && o.push(i);
      }),
      (e = []).concat.apply(e, o)
    );
  }
  function it(e, t) {
    if (e[Z]) {
      var n = function (t) {
        (t = $(t)), e[Z][t] && ((e[Z][t] = null), delete e[Z][t]);
      };
      O(t)
        ? ((e[Z] = null), delete e[Z])
        : E(t)
        ? t
            .split(" ")
            .filter(function (t) {
              return t;
            })
            .forEach(function (t) {
              return n(t);
            })
        : D(t, function (t, e) {
            return n(e);
          });
    }
  }
  function ot(t) {
    var n = [];
    return (
      D(t, function (t, e) {
        -1 === n.indexOf(e) && n.push(e);
      }),
      n
    );
  }
  function st(t, n, i, o, s) {
    var r,
      a = [];
    return (
      t.each(function (t, e) {
        for (r = e[i]; r && b(r); ) {
          if (2 === n) {
            if (o && L(r).is(o)) break;
            (s && !L(r).is(s)) || a.push(r);
          } else {
            if (0 === n) {
              (o && !L(r).is(o)) || a.push(r);
              break;
            }
            (o && !L(r).is(o)) || a.push(r);
          }
          r = r[i];
        }
      }),
      new R(ot(a))
    );
  }
  (L.data = et),
    (L.each = D),
    (L.extend = function () {
      for (var n = this, t = [], e = arguments.length; e--; )
        t[e] = arguments[e];
      return 1 === t.length
        ? (D(t[0], function (t, e) {
            n[t] = e;
          }),
          this)
        : X.apply(void 0, [t.shift(), t.shift()].concat(t));
    }),
    (L.map = nt),
    (L.merge = N),
    (L.param = V),
    (L.removeData = it),
    (L.unique = ot),
    (L.fn.add = function (t) {
      return new R(ot(N(this.get(), L(t).get())));
    }),
    D(["add", "remove", "toggle"], function (t, i) {
      L.fn[i + "Class"] = function (e) {
        return "remove" !== i || arguments.length
          ? this.each(function (t, n) {
              b(n) &&
                D(
                  (p(e) ? e.call(n, t, n.getAttribute("class") || "") : e)
                    .split(" ")
                    .filter(function (t) {
                      return t;
                    }),
                  function (t, e) {
                    n.classList[i](e);
                  }
                );
            })
          : this.each(function (t, e) {
              e.setAttribute("class", "");
            });
      };
    }),
    D(["insertBefore", "insertAfter"], function (a, t) {
      L.fn[t] = function (t) {
        var e = a ? L(this.get().reverse()) : this,
          n = L(t),
          r = [];
        return (
          n.each(function (o, s) {
            s.parentNode &&
              e.each(function (t, e) {
                var n = o ? e.cloneNode(!0) : e,
                  i = a ? s.nextSibling : s;
                r.push(n), s.parentNode.insertBefore(n, i);
              });
          }),
          L(a ? r.reverse() : r)
        );
      };
    }),
    D(["before", "after"], function (s, t) {
      L.fn[t] = function () {
        for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
        return (
          1 === s && (t = t.reverse()),
          this.each(function (i, o) {
            D(p(t[0]) ? [t[0].call(o, i, o.innerHTML)] : t, function (t, e) {
              var n;
              (!E((n = e)) || ("<" === n[0] && ">" === n[n.length - 1])
                ? i && b(e)
                  ? L(e.cloneNode(!0))
                  : L(e)
                : L(j(e, "div")))[s ? "insertAfter" : "insertBefore"](o);
            });
          })
        );
      };
    }),
    (L.fn.off = function (t, n, e) {
      var i = this;
      return C(t)
        ? (D(t, function (t, e) {
            i.off(t, n, e);
          }),
          this)
        : ((!1 !== n && !p(n)) || ((e = n), (n = void 0)),
          !1 === e && (e = M),
          this.each(function () {
            U(this, t, e, n);
          }));
    }),
    (L.fn.on = function (t, n, i, e, o) {
      var s = this;
      if (C(t))
        return (
          E(n) || ((i = i || n), (n = void 0)),
          D(t, function (t, e) {
            s.on(t, n, i, e, o);
          }),
          this
        );
      if (
        (null == i && null == e
          ? ((e = n), (i = n = void 0))
          : null == e &&
            (E(n) ? ((e = i), (i = void 0)) : ((e = i), (i = n), (n = void 0))),
        !1 === e)
      )
        e = M;
      else if (!e) return this;
      if (o) {
        var r = this,
          a = e;
        e = function (t) {
          return r.off(t.type, n, e), a.apply(this, arguments);
        };
      }
      return this.each(function () {
        !(function (s, t, r, a, u) {
          var c = q(s);
          z[c] || (z[c] = []);
          var l = !1;
          C(a) && a.useCapture && (l = !0),
            t.split(" ").forEach(function (t) {
              if (t) {
                var n = W(t),
                  e = {
                    type: n.type,
                    ns: n.ns,
                    func: r,
                    selector: u,
                    id: z[c].length,
                    proxy: o,
                  };
                z[c].push(e), s.addEventListener(e.type, o, l);
              }
              function i(t, e) {
                !1 ===
                  r.apply(
                    e,
                    void 0 === t._detail ? [t] : [t].concat(t._detail)
                  ) && (t.preventDefault(), t.stopPropagation());
              }
              function o(e) {
                (e._ns && !Y(e._ns).test(n.ns)) ||
                  ((e._data = a),
                  u
                    ? L(s)
                        .find(u)
                        .get()
                        .reverse()
                        .forEach(function (t) {
                          (t !== e.target && !P(t, e.target)) || i(e, t);
                        })
                    : i(e, s));
              }
            });
        })(this, t, e, i, n);
      });
    }),
    D(K, function (t, e) {
      L.fn[t] = function (n) {
        return this.on(e, function (t, e) {
          n(t, e.xhr, e.options, e.data);
        });
      };
    }),
    (L.fn.map = function (n) {
      return new R(
        nt(this, function (t, e) {
          return n.call(t, e, t);
        })
      );
    }),
    (L.fn.clone = function () {
      return this.map(function () {
        return this.cloneNode(!0);
      });
    }),
    (L.fn.is = function (n) {
      var i = !1;
      if (p(n))
        return (
          this.each(function (t, e) {
            n.call(e, t, e) && (i = !0);
          }),
          i
        );
      if (E(n))
        return (
          this.each(function (t, e) {
            y(e) ||
              g(e) ||
              ((e.matches || e.msMatchesSelector).call(e, n) && (i = !0));
          }),
          i
        );
      var e = L(n);
      return (
        this.each(function (t, n) {
          e.each(function (t, e) {
            n === e && (i = !0);
          });
        }),
        i
      );
    }),
    (L.fn.remove = function (n) {
      return this.each(function (t, e) {
        !e.parentNode || (n && !L(e).is(n)) || e.parentNode.removeChild(e);
      });
    }),
    D(["prepend", "append"], function (u, t) {
      L.fn[t] = function () {
        for (var a = [], t = arguments.length; t--; ) a[t] = arguments[t];
        return this.each(function (t, e) {
          var n,
            i = e.childNodes,
            o = i.length,
            s = o ? i[u ? o - 1 : 0] : document.createElement("div");
          o || e.appendChild(s);
          var r = p(a[0]) ? [a[0].call(e, t, e.innerHTML)] : a;
          t &&
            (r = r.map(function (t) {
              return E(t) ? t : L(t).clone();
            })),
            (n = L(s))[u ? "after" : "before"].apply(n, r),
            o || e.removeChild(s);
        });
      };
    }),
    D(["appendTo", "prependTo"], function (r, t) {
      L.fn[t] = function (t) {
        var s = [],
          e = L(t).map(function (t, e) {
            var n = e.childNodes,
              i = n.length;
            if (i) return n[r ? 0 : i - 1];
            var o = document.createElement("div");
            return e.appendChild(o), s.push(o), o;
          }),
          n = this[r ? "insertBefore" : "insertAfter"](e);
        return L(s).remove(), n;
      };
    }),
    D(["attr", "prop", "css"], function (s, r) {
      function a(t, e) {
        switch (s) {
          case 0:
            var n = t.getAttribute(e);
            return v(n) ? void 0 : n;
          case 1:
            return t[e];
          default:
            return S(t, e);
        }
      }
      L.fn[r] = function (n, i) {
        var o = this;
        if (C(n))
          return (
            D(n, function (t, e) {
              o[r](t, e);
            }),
            this
          );
        if (1 !== arguments.length)
          return this.each(function (t, e) {
            !(function (t, e, n) {
              if (!O(n))
                switch (s) {
                  case 0:
                    v(n) ? t.removeAttribute(e) : t.setAttribute(e, n);
                    break;
                  case 1:
                    t[e] = n;
                    break;
                  default:
                    (e = $(e)),
                      (t.style[e] = m(n)
                        ? n + (-1 < A.indexOf(e) ? "" : "px")
                        : n);
                }
            })(e, n, p(i) ? i.call(e, t, a(e, n)) : i);
          });
        var t = this[0];
        return b(t) ? a(t, n) : void 0;
      };
    }),
    (L.fn.children = function (n) {
      var i = [];
      return (
        this.each(function (t, e) {
          D(e.childNodes, function (t, e) {
            b(e) && ((n && !L(e).is(n)) || i.push(e));
          });
        }),
        new R(ot(i))
      );
    }),
    (L.fn.slice = function () {
      for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
      return new R([].slice.apply(this, t));
    }),
    (L.fn.eq = function (t) {
      var e = -1 === t ? this.slice(t) : this.slice(t, +t + 1);
      return new R(e);
    }),
    D(["", "s", "sUntil"], function (n, t) {
      L.fn["parent" + t] = function (t, e) {
        return st(n ? L(this.get().reverse()) : this, n, "parentNode", t, e);
      };
    }),
    (L.fn.closest = function (n) {
      if (this.is(n)) return this;
      var i = [];
      return (
        this.parents().each(function (t, e) {
          if (L(e).is(n)) return i.push(e), !1;
        }),
        new R(i)
      );
    });
  var rt = /^(?:{[\w\W]*\}|\[[\w\W]*\])$/;
  function at(t, e, n) {
    if (O(n) && 1 === t.nodeType) {
      var i = "data-" + k(e);
      if (E((n = t.getAttribute(i))))
        try {
          n =
            "true" === (o = n) ||
            ("false" !== o &&
              ("null" === o
                ? null
                : o === +o + ""
                ? +o
                : rt.test(o)
                ? JSON.parse(o)
                : o));
        } catch (t) {}
      else n = void 0;
    }
    var o;
    return n;
  }
  function ut(e, n, t, i, o, s) {
    function r(t) {
      return I(e, n.toLowerCase(), t) * s;
    }
    return (
      2 === i && o && (t += r("margin")),
      T(e)
        ? (window.document.documentMode &&
            1 === s &&
            ((t += r("border")), (t += r("padding"))),
          0 === i && (t -= r("border")),
          1 === i && ((t -= r("border")), (t -= r("padding"))))
        : (0 === i && (t += r("padding")),
          2 === i && ((t += r("border")), (t += r("padding")))),
      t
    );
  }
  function ct(t, e, n, i) {
    var o = "client" + e,
      s = "scroll" + e,
      r = "offset" + e,
      a = "inner" + e;
    if (g(t)) return 2 === n ? t[a] : w(document)[o];
    if (y(t)) {
      var u = w(t);
      return Math.max(t.body[s], u[s], t.body[r], u[r], u[o]);
    }
    var c = parseFloat(_(t, e.toLowerCase()) || "0");
    return ut(t, e, c, n, i, 1);
  }
  function lt(t, e) {
    return parseFloat(t.css(e));
  }
  function dt(t) {
    if (!t.getClientRects().length) return { top: 0, left: 0 };
    var e = t.getBoundingClientRect(),
      n = t.ownerDocument.defaultView;
    return { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset };
  }
  (L.fn.data = function (t, e) {
    if (O(t)) {
      if (!this.length) return;
      var n = this[0],
        i = et(n);
      if (1 !== n.nodeType) return i;
      for (var o = n.attributes, s = o.length; s--; )
        if (o[s]) {
          var r = o[s].name;
          0 === r.indexOf("data-") && (i[(r = $(r.slice(5)))] = at(n, r, i[r]));
        }
      return i;
    }
    return C(t)
      ? this.each(function () {
          et(this, t);
        })
      : 2 === arguments.length && O(e)
      ? this
      : O(e)
      ? this.length
        ? at(this[0], t, et(this[0], t))
        : void 0
      : this.each(function () {
          et(this, t, e);
        });
  }),
    (L.fn.empty = function () {
      return this.each(function () {
        this.innerHTML = "";
      });
    }),
    (L.fn.extend = function (t) {
      return (
        D(t, function (t, e) {
          L.fn[t] = e;
        }),
        this
      );
    }),
    (L.fn.filter = function (n) {
      if (p(n))
        return this.map(function (t, e) {
          return n.call(e, t, e) ? e : void 0;
        });
      if (E(n))
        return this.map(function (t, e) {
          return L(e).is(n) ? e : void 0;
        });
      var i = L(n);
      return this.map(function (t, e) {
        return -1 < i.get().indexOf(e) ? e : void 0;
      });
    }),
    (L.fn.first = function () {
      return this.eq(0);
    }),
    (L.fn.has = function (t) {
      var e = E(t) ? this.find(t) : L(t),
        n = e.length;
      return this.map(function () {
        for (var t = 0; t < n; t += 1) if (P(this, e[t])) return this;
      });
    }),
    (L.fn.hasClass = function (t) {
      return this[0].classList.contains(t);
    }),
    D(["Width", "Height"], function (t, s) {
      D(["inner" + s, s.toLowerCase(), "outer" + s], function (o, t) {
        L.fn[t] = function (n, t) {
          var e = arguments.length && (o < 2 || !("boolean" == typeof n)),
            i = !0 === n || !0 === t;
          return e
            ? this.each(function (t, e) {
                return (function (t, e, n, i, o, s) {
                  var r = p(s) ? s.call(t, e, ct(t, n, i, o)) : s;
                  if (null != r) {
                    var a = L(t),
                      u = n.toLowerCase();
                    if (-1 < ["auto", "inherit", ""].indexOf(r)) a.css(u, r);
                    else {
                      var c = r.toString().replace(/\b[0-9.]*/, "");
                      (r = ut(t, n, parseFloat(r), i, o, -1) + (c || "px")),
                        a.css(u, r);
                    }
                  }
                })(e, t, s, o, i, n);
              })
            : this.length
            ? ct(this[0], s, o, i)
            : void 0;
        };
      });
    }),
    (L.fn.hide = function () {
      return this.each(function () {
        this.style.display = "none";
      });
    }),
    D(["val", "html", "text"], function (o, t) {
      var s = { 0: "value", 1: "innerHTML", 2: "textContent" }[o];
      function r(t) {
        if (2 === o)
          return nt(t, function (t) {
            return w(t)[s];
          }).join("");
        if (t.length) {
          var e = t[0];
          return 0 === o && L(e).is("select[multiple]")
            ? nt(L(e).find("option:checked"), function (t) {
                return t.value;
              })
            : e[s];
        }
      }
      L.fn[t] = function (i) {
        return arguments.length
          ? this.each(function (t, e) {
              var n = p(i) ? i.call(e, t, r(L(e))) : i;
              0 === o && Array.isArray(n)
                ? L(e).is("select[multiple]")
                  ? nt(L(e).find("option"), function (t) {
                      return (t.selected = -1 < n.indexOf(t.value));
                    })
                  : (e.checked = -1 < n.indexOf(e.value))
                : (function (t, e) {
                    if (O(e)) {
                      if (0 !== o) return;
                      e = "";
                    }
                    1 === o && b(e) && (e = e.outerHTML), (t[s] = e);
                  })(e, n);
            })
          : r(this);
      };
    }),
    (L.fn.index = function (t) {
      return arguments.length
        ? E(t)
          ? L(t).get().indexOf(this[0])
          : this.get().indexOf(L(t)[0])
        : this.eq(0).parent().children().get().indexOf(this[0]);
    }),
    (L.fn.last = function () {
      return this.eq(-1);
    }),
    D(["", "All", "Until"], function (n, t) {
      L.fn["next" + t] = function (t, e) {
        return st(this, n, "nextElementSibling", t, e);
      };
    }),
    (L.fn.not = function (t) {
      var n = this.filter(t);
      return this.map(function (t, e) {
        return -1 < n.index(e) ? void 0 : e;
      });
    }),
    (L.fn.offsetParent = function () {
      return this.map(function () {
        for (
          var t = this.offsetParent;
          t && "static" === L(t).css("position");

        )
          t = t.offsetParent;
        return t || document.documentElement;
      });
    }),
    (L.fn.position = function () {
      if (this.length) {
        var t,
          e = this.eq(0),
          n = { left: 0, top: 0 };
        if ("fixed" === e.css("position")) t = e[0].getBoundingClientRect();
        else {
          t = e.offset();
          var i = e.offsetParent();
          ((n = i.offset()).top += lt(i, "border-top-width")),
            (n.left += lt(i, "border-left-width"));
        }
        return {
          top: t.top - n.top - lt(e, "margin-top"),
          left: t.left - n.left - lt(e, "margin-left"),
        };
      }
    }),
    (L.fn.offset = function (e) {
      return arguments.length
        ? this.each(function (t) {
            !(function (t, e, n) {
              var i = L(t),
                o = i.css("position");
              "static" === o && i.css("position", "relative");
              var s,
                r,
                a = dt(t),
                u = i.css("top"),
                c = i.css("left");
              if (
                ("absolute" === o || "fixed" === o) &&
                -1 < (u + c).indexOf("auto")
              ) {
                var l = i.position();
                (s = l.top), (r = l.left);
              } else (s = parseFloat(u)), (r = parseFloat(c));
              var d = p(e) ? e.call(t, n, X({}, a)) : e;
              i.css({
                top: null != d.top ? d.top - a.top + s : void 0,
                left: null != d.left ? d.left - a.left + r : void 0,
              });
            })(this, e, t);
          })
        : this.length
        ? dt(this[0])
        : void 0;
    }),
    (L.fn.one = function (t, e, n, i) {
      return this.on(t, e, n, i, !0);
    }),
    D(["", "All", "Until"], function (n, t) {
      L.fn["prev" + t] = function (t, e) {
        return st(
          n ? L(this.get().reverse()) : this,
          n,
          "previousElementSibling",
          t,
          e
        );
      };
    }),
    (L.fn.removeAttr = function (t) {
      var e = t.split(" ").filter(function (t) {
        return t;
      });
      return this.each(function () {
        var n = this;
        D(e, function (t, e) {
          n.removeAttribute(e);
        });
      });
    }),
    (L.fn.removeData = function (t) {
      return this.each(function () {
        it(this, t);
      });
    }),
    (L.fn.removeProp = function (t) {
      return this.each(function () {
        try {
          delete this[t];
        } catch (t) {}
      });
    }),
    (L.fn.replaceWith = function (i) {
      return (
        this.each(function (t, e) {
          var n = i;
          p(n)
            ? (n = n.call(e, t, e.innerHTML))
            : t && !E(n) && (n = L(n).clone()),
            L(e).before(n);
        }),
        this.remove()
      );
    }),
    (L.fn.replaceAll = function (t) {
      var n = this;
      return L(t).map(function (t, e) {
        return L(e).replaceWith(t ? n.clone() : n), n.get();
      });
    }),
    (L.fn.serializeArray = function () {
      var r = [];
      return (
        this.each(function (t, e) {
          var n = e instanceof HTMLFormElement ? e.elements : [e];
          L(n).each(function (t, e) {
            var n = L(e),
              i = e.type,
              o = e.nodeName.toLowerCase();
            if (
              "fieldset" !== o &&
              e.name &&
              !e.disabled &&
              -1 < ["input", "select", "textarea", "keygen"].indexOf(o) &&
              -1 ===
                ["submit", "button", "image", "reset", "file"].indexOf(i) &&
              (-1 === ["radio", "checkbox"].indexOf(i) || e.checked)
            ) {
              var s = n.val();
              (Array.isArray(s) ? s : [s]).forEach(function (t) {
                r.push({ name: e.name, value: t });
              });
            }
          });
        }),
        r
      );
    }),
    (L.fn.serialize = function () {
      return V(this.serializeArray());
    });
  var ht = {};
  (L.fn.show = function () {
    return this.each(function () {
      var t, e, n;
      "none" === this.style.display && (this.style.display = ""),
        "none" === S(this, "display") &&
          (this.style.display =
            ((t = this.nodeName),
            ht[t] ||
              ((e = document.createElement(t)),
              document.body.appendChild(e),
              (n = S(e, "display")),
              e.parentNode.removeChild(e),
              "none" === n && (n = "block"),
              (ht[t] = n)),
            ht[t]));
    });
  }),
    (L.fn.siblings = function (t) {
      return this.prevAll(t).add(this.nextAll(t));
    }),
    (L.fn.toggle = function () {
      return this.each(function () {
        "none" === S(this, "display") ? L(this).show() : L(this).hide();
      });
    }),
    (L.fn.reflow = function () {
      return this.each(function () {
        return this.clientLeft;
      });
    }),
    (L.fn.transition = function (t) {
      return (
        m(t) && (t += "ms"),
        this.each(function () {
          (this.style.webkitTransitionDuration = t),
            (this.style.transitionDuration = t);
        })
      );
    }),
    (L.fn.transitionEnd = function (e) {
      var n = this,
        i = ["webkitTransitionEnd", "transitionend"];
      function o(t) {
        t.target === this &&
          (e.call(this, t),
          D(i, function (t, e) {
            n.off(e, o);
          }));
      }
      return (
        D(i, function (t, e) {
          n.on(e, o);
        }),
        this
      );
    }),
    (L.fn.transformOrigin = function (t) {
      return this.each(function () {
        (this.style.webkitTransformOrigin = t),
          (this.style.transformOrigin = t);
      });
    }),
    (L.fn.transform = function (t) {
      return this.each(function () {
        (this.style.webkitTransform = t), (this.style.transform = t);
      });
    });
  var ft = {};
  function pt(t, e, n, i) {
    var o = et(i, "_mdui_mutation");
    o || et(i, "_mdui_mutation", (o = [])),
      -1 === o.indexOf(t) && (o.push(t), e.call(i, n, i));
  }
  (L.fn.mutation = function () {
    return this.each(function (t, e) {
      var o = L(e);
      D(ft, function (n, i) {
        o.is(n) && pt(n, i, t, e),
          o.find(n).each(function (t, e) {
            pt(n, i, t, e);
          });
      });
    });
  }),
    (L.showOverlay = function (t) {
      var e = L(".mdui-overlay");
      e.length
        ? (e.data("_overlay_is_deleted", !1), O(t) || e.css("z-index", t))
        : (O(t) && (t = 2e3),
          (e = L('<div class="mdui-overlay">')
            .appendTo(document.body)
            .reflow()
            .css("z-index", t)));
      var n = e.data("_overlay_level") || 0;
      return e.data("_overlay_level", ++n).addClass("mdui-overlay-show");
    }),
    (L.hideOverlay = function (t) {
      void 0 === t && (t = !1);
      var e = L(".mdui-overlay");
      if (e.length) {
        var n = t ? 1 : e.data("_overlay_level");
        1 < n
          ? e.data("_overlay_level", --n)
          : e
              .data("_overlay_level", 0)
              .removeClass("mdui-overlay-show")
              .data("_overlay_is_deleted", !0)
              .transitionEnd(function () {
                e.data("_overlay_is_deleted") && e.remove();
              });
      }
    }),
    (L.lockScreen = function () {
      var t = L("body"),
        e = t.width(),
        n = t.data("_lockscreen_level") || 0;
      t.addClass("mdui-locked").width(e).data("_lockscreen_level", ++n);
    }),
    (L.unlockScreen = function (t) {
      void 0 === t && (t = !1);
      var e = L("body"),
        n = t ? 1 : e.data("_lockscreen_level");
      1 < n
        ? e.data("_lockscreen_level", --n)
        : e.data("_lockscreen_level", 0).removeClass("mdui-locked").width("");
    }),
    (L.throttle = function (i, o) {
      void 0 === o && (o = 16);
      var s = null;
      return function () {
        for (var t = this, e = [], n = arguments.length; n--; )
          e[n] = arguments[n];
        v(s) &&
          (s = setTimeout(function () {
            i.apply(t, e), (s = null);
          }, o));
      };
    });
  var mt = {};
  function vt(t, e, n, i, o) {
    (o = o || {}).inst = i;
    var s = t + ".mdui." + e;
    "undefined" != typeof jQuery && jQuery(n).trigger(s, o);
    var r = L(n);
    r.trigger(s, o);
    var a = new CustomEvent(s, { bubbles: !0, cancelable: !0, detail: o });
    (a._detail = o), r[0].dispatchEvent(a);
  }
  (L.guid = function (t) {
    if (!O(t) && !O(mt[t])) return mt[t];
    function e() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    var n =
      "_" +
      e() +
      e() +
      "-" +
      e() +
      "-" +
      e() +
      "-" +
      e() +
      "-" +
      e() +
      e() +
      e();
    return O(t) || (mt[t] = n), n;
  }),
    (B.mutation = function (n, i) {
      O(n) || O(i)
        ? L(document).mutation()
        : ((ft[n] = i),
          L(n).each(function (t, e) {
            return pt(n, i, t, e);
          }));
    });
  var gt = L(document),
    yt = L(window);
  L("body");
  function bt(t, e) {
    void 0 === e && (e = {}),
      (this.options = X({}, xt)),
      (this.state = "pinned"),
      (this.isEnable = !1),
      (this.lastScrollY = 0),
      (this.rafId = 0),
      (this.$element = L(t).first()),
      X(this.options, e);
    var n = this.options.tolerance;
    m(n) && (this.options.tolerance = { down: n, up: n }), this.enable();
  }
  var xt = {
    tolerance: 5,
    offset: 0,
    initialClass: "mdui-headroom",
    pinnedClass: "mdui-headroom-pinned-top",
    unpinnedClass: "mdui-headroom-unpinned-top",
  };
  function Ct(t, e) {
    var n = L(t).attr(e);
    return n
      ? new Function(
          "",
          "var json = " + n + "; return JSON.parse(JSON.stringify(json));"
        )()
      : {};
  }
  (bt.prototype.onScroll = function () {
    var i = this;
    this.rafId = window.requestAnimationFrame(function () {
      var t = window.pageYOffset,
        e = t > i.lastScrollY ? "down" : "up",
        n = i.options.tolerance[e] <= Math.abs(t - i.lastScrollY);
      t > i.lastScrollY && t >= i.options.offset && n
        ? i.unpin()
        : ((t < i.lastScrollY && n) || t <= i.options.offset) && i.pin(),
        (i.lastScrollY = t);
    });
  }),
    (bt.prototype.triggerEvent = function (t) {
      vt(t, "headroom", this.$element, this);
    }),
    (bt.prototype.transitionEnd = function () {
      "pinning" === this.state &&
        ((this.state = "pinned"), this.triggerEvent("pinned")),
        "unpinning" === this.state &&
          ((this.state = "unpinned"), this.triggerEvent("unpinned"));
    }),
    (bt.prototype.pin = function () {
      var t = this;
      "pinning" !== this.state &&
        "pinned" !== this.state &&
        this.$element.hasClass(this.options.initialClass) &&
        (this.triggerEvent("pin"),
        (this.state = "pinning"),
        this.$element
          .removeClass(this.options.unpinnedClass)
          .addClass(this.options.pinnedClass)
          .transitionEnd(function () {
            return t.transitionEnd();
          }));
    }),
    (bt.prototype.unpin = function () {
      var t = this;
      "unpinning" !== this.state &&
        "unpinned" !== this.state &&
        this.$element.hasClass(this.options.initialClass) &&
        (this.triggerEvent("unpin"),
        (this.state = "unpinning"),
        this.$element
          .removeClass(this.options.pinnedClass)
          .addClass(this.options.unpinnedClass)
          .transitionEnd(function () {
            return t.transitionEnd();
          }));
    }),
    (bt.prototype.enable = function () {
      var t = this;
      this.isEnable ||
        ((this.isEnable = !0),
        (this.state = "pinned"),
        this.$element
          .addClass(this.options.initialClass)
          .removeClass(this.options.pinnedClass)
          .removeClass(this.options.unpinnedClass),
        (this.lastScrollY = window.pageYOffset),
        yt.on("scroll", function () {
          return t.onScroll();
        }));
    }),
    (bt.prototype.disable = function () {
      var t = this;
      this.isEnable &&
        ((this.isEnable = !1),
        this.$element
          .removeClass(this.options.initialClass)
          .removeClass(this.options.pinnedClass)
          .removeClass(this.options.unpinnedClass),
        yt.off("scroll", function () {
          return t.onScroll();
        }),
        window.cancelAnimationFrame(this.rafId));
    }),
    (bt.prototype.getState = function () {
      return this.state;
    }),
    (B.Headroom = bt);
  var wt = "mdui-headroom";
  L(function () {
    B.mutation("[" + wt + "]", function () {
      new B.Headroom(this, Ct(this, wt));
    });
  });
  function $t(t, e) {
    void 0 === e && (e = {}), (this.options = X({}, Et));
    var n = "mdui-" + this.getNamespace() + "-item";
    (this.classItem = n),
      (this.classItemOpen = n + "-open"),
      (this.classHeader = n + "-header"),
      (this.classBody = n + "-body"),
      (this.$element = L(t).first()),
      X(this.options, e),
      this.bindEvent();
  }
  var Et = { accordion: !1 };
  ($t.prototype.bindEvent = function () {
    var i = this;
    this.$element.on("click", "." + this.classHeader, function () {
      var n = L(this).parent();
      i.getItems().each(function (t, e) {
        n.is(e) && i.toggle(e);
      });
    }),
      this.$element.on(
        "click",
        "[mdui-" + this.getNamespace() + "-item-close]",
        function () {
          var t = L(this)
            .parents("." + i.classItem)
            .first();
          i.close(t);
        }
      );
  }),
    ($t.prototype.isOpen = function (t) {
      return t.hasClass(this.classItemOpen);
    }),
    ($t.prototype.getItems = function () {
      return this.$element.children("." + this.classItem);
    }),
    ($t.prototype.getItem = function (t) {
      return m(t) ? this.getItems().eq(t) : L(t).first();
    }),
    ($t.prototype.triggerEvent = function (t, e) {
      vt(t, this.getNamespace(), e, this);
    }),
    ($t.prototype.transitionEnd = function (t, e) {
      this.isOpen(e)
        ? (t.transition(0).height("auto").reflow().transition(""),
          this.triggerEvent("opened", e))
        : (t.height(""), this.triggerEvent("closed", e));
    }),
    ($t.prototype.open = function (t) {
      var i = this,
        o = this.getItem(t);
      if (!this.isOpen(o)) {
        this.options.accordion &&
          this.$element
            .children("." + this.classItemOpen)
            .each(function (t, e) {
              var n = L(e);
              n.is(o) || i.close(n);
            });
        var e = o.children("." + this.classBody);
        e.height(e[0].scrollHeight).transitionEnd(function () {
          return i.transitionEnd(e, o);
        }),
          this.triggerEvent("open", o),
          o.addClass(this.classItemOpen);
      }
    }),
    ($t.prototype.close = function (t) {
      var e = this,
        n = this.getItem(t);
      if (this.isOpen(n)) {
        var i = n.children("." + this.classBody);
        this.triggerEvent("close", n),
          n.removeClass(this.classItemOpen),
          i
            .transition(0)
            .height(i[0].scrollHeight)
            .reflow()
            .transition("")
            .height("")
            .transitionEnd(function () {
              return e.transitionEnd(i, n);
            });
      }
    }),
    ($t.prototype.toggle = function (t) {
      var e = this.getItem(t);
      this.isOpen(e) ? this.close(e) : this.open(e);
    }),
    ($t.prototype.openAll = function () {
      var n = this;
      this.getItems().each(function (t, e) {
        return n.open(e);
      });
    }),
    ($t.prototype.closeAll = function () {
      var n = this;
      this.getItems().each(function (t, e) {
        return n.close(e);
      });
    });
  var Ot = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (((e.prototype = Object.create(t && t.prototype)).constructor =
        e).prototype.getNamespace = function () {
        return "collapse";
      }),
      e
    );
  })($t);
  B.Collapse = Ot;
  var kt = "mdui-collapse";
  L(function () {
    B.mutation("[" + kt + "]", function () {
      new B.Collapse(this, Ct(this, kt));
    });
  });
  var _t = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (((e.prototype = Object.create(t && t.prototype)).constructor =
        e).prototype.getNamespace = function () {
        return "panel";
      }),
      e
    );
  })($t);
  B.Panel = _t;
  var Tt = "mdui-panel";
  L(function () {
    B.mutation("[" + Tt + "]", function () {
      new B.Panel(this, Ct(this, Tt));
    });
  });
  function It(t) {
    (this.$thRow = L()),
      (this.$tdRows = L()),
      (this.$thCheckbox = L()),
      (this.$tdCheckboxs = L()),
      (this.selectable = !1),
      (this.selectedRow = 0),
      (this.$element = L(t).first()),
      this.init();
  }
  (It.prototype.init = function () {
    (this.$thRow = this.$element.find("thead tr")),
      (this.$tdRows = this.$element.find("tbody tr")),
      (this.selectable = this.$element.hasClass("mdui-table-selectable")),
      this.updateThCheckbox(),
      this.updateTdCheckbox(),
      this.updateNumericCol();
  }),
    (It.prototype.createCheckboxHTML = function (t) {
      return (
        "<" +
        t +
        ' class="mdui-table-cell-checkbox"><label class="mdui-checkbox"><input type="checkbox"/><i class="mdui-checkbox-icon"></i></label></' +
        t +
        ">"
      );
    }),
    (It.prototype.updateThCheckboxStatus = function () {
      var t = this.$thCheckbox[0],
        e = this.selectedRow,
        n = this.$tdRows.length;
      (t.checked = e === n), (t.indeterminate = !!e && e !== n);
    }),
    (It.prototype.updateTdCheckbox = function () {
      var o = this,
        s = "mdui-table-row-selected";
      this.$tdRows.each(function (t, e) {
        var n = L(e);
        if ((n.find(".mdui-table-cell-checkbox").remove(), o.selectable)) {
          var i = L(o.createCheckboxHTML("td"))
            .prependTo(n)
            .find('input[type="checkbox"]');
          n.hasClass(s) && ((i[0].checked = !0), o.selectedRow++),
            o.updateThCheckboxStatus(),
            i.on("change", function () {
              i[0].checked
                ? (n.addClass(s), o.selectedRow++)
                : (n.removeClass(s), o.selectedRow--),
                o.updateThCheckboxStatus();
            }),
            (o.$tdCheckboxs = o.$tdCheckboxs.add(i));
        }
      });
    }),
    (It.prototype.updateThCheckbox = function () {
      var t = this;
      this.$thRow.find(".mdui-table-cell-checkbox").remove(),
        this.selectable &&
          (this.$thCheckbox = L(this.createCheckboxHTML("th"))
            .prependTo(this.$thRow)
            .find('input[type="checkbox"]')
            .on("change", function () {
              var n = t.$thCheckbox[0].checked;
              (t.selectedRow = n ? t.$tdRows.length : 0),
                t.$tdCheckboxs.each(function (t, e) {
                  e.checked = n;
                }),
                t.$tdRows.each(function (t, e) {
                  n
                    ? L(e).addClass("mdui-table-row-selected")
                    : L(e).removeClass("mdui-table-row-selected");
                });
            }));
    }),
    (It.prototype.updateNumericCol = function () {
      var e = this,
        s = "mdui-table-col-numeric";
      this.$thRow.find("th").each(function (i, t) {
        var o = L(t).hasClass(s);
        e.$tdRows.each(function (t, e) {
          var n = L(e).find("td").eq(i);
          o ? n.addClass(s) : n.removeClass(s);
        });
      });
    });
  var St = "_mdui_table";
  L(function () {
    B.mutation(".mdui-table", function () {
      var t = L(this);
      t.data(St) || t.data(St, new It(t));
    });
  }),
    (B.updateTables = function (t) {
      (O(t) ? L(".mdui-table") : L(t)).each(function (t, e) {
        var n = L(e),
          i = n.data(St);
        i ? i.init() : n.data(St, new It(n));
      });
    });
  var jt = "touchstart mousedown",
    Mt = "touchmove mousemove",
    At = "touchend mouseup",
    Dt = "touchcancel mouseleave",
    Rt = "touchend touchmove touchcancel",
    Ht = 0;
  function Lt(t) {
    return !(
      Ht &&
      -1 <
        [
          "mousedown",
          "mouseup",
          "mousemove",
          "click",
          "mouseover",
          "mouseout",
          "mouseenter",
          "mouseleave",
        ].indexOf(t.type)
    );
  }
  function Bt(t) {
    "touchstart" === t.type
      ? (Ht += 1)
      : -1 < ["touchmove", "touchend", "touchcancel"].indexOf(t.type) &&
        setTimeout(function () {
          Ht && --Ht;
        }, 500);
  }
  function Pt(t, e) {
    if (!(t instanceof MouseEvent && 2 === t.button)) {
      var n =
          "undefined" != typeof TouchEvent &&
          t instanceof TouchEvent &&
          t.touches.length
            ? t.touches[0]
            : t,
        i = n.pageX,
        o = n.pageY,
        s = e.offset(),
        r = e.innerHeight(),
        a = e.innerWidth(),
        u = i - s.left,
        c = o - s.top,
        l = Math.max(Math.pow(Math.pow(r, 2) + Math.pow(a, 2), 0.5), 48),
        d =
          "translate3d(" +
          (a / 2 - u) +
          "px," +
          (r / 2 - c) +
          "px, 0) scale(1)";
      L(
        '<div class="mdui-ripple-wave" style="width:' +
          l +
          "px;height:" +
          l +
          "px;margin-top:-" +
          l / 2 +
          "px;margin-left:-" +
          l / 2 +
          "px;left:" +
          u +
          "px;top:" +
          c +
          'px;"></div>'
      )
        .data("_ripple_wave_translate", d)
        .prependTo(e)
        .reflow()
        .transform(d);
    }
  }
  function Nt() {
    var t = L(this);
    t.children(".mdui-ripple-wave").each(function (t, e) {
      !(function (t) {
        if (t.length && !t.data("_ripple_wave_removed")) {
          t.data("_ripple_wave_removed", !0);
          var e = setTimeout(function () {
              return t.remove();
            }, 400),
            n = t.data("_ripple_wave_translate");
          t.addClass("mdui-ripple-wave-fill")
            .transform(n.replace("scale(1)", "scale(1.01)"))
            .transitionEnd(function () {
              clearTimeout(e),
                t
                  .addClass("mdui-ripple-wave-out")
                  .transform(n.replace("scale(1)", "scale(1.01)")),
                (e = setTimeout(function () {
                  return t.remove();
                }, 700)),
                setTimeout(function () {
                  t.transitionEnd(function () {
                    clearTimeout(e), t.remove();
                  });
                }, 0);
            });
        }
      })(L(e));
    }),
      t.off(Mt + " " + At + " " + Dt, Nt);
  }
  function zt(t) {
    if (Lt(t) && (Bt(t), t.target !== document)) {
      var e = L(t.target),
        n = e.hasClass("mdui-ripple") ? e : e.parents(".mdui-ripple").first();
      if (n.length && !n.prop("disabled") && O(n.attr("disabled")))
        if ("touchstart" === t.type) {
          var i = !1,
            o = setTimeout(function () {
              (o = 0), Pt(t, n);
            }, 200),
            s = function () {
              o && (clearTimeout(o), (o = 0), Pt(t, n)),
                i || ((i = !0), Nt.call(n));
            };
          n.on("touchmove", function () {
            o && (clearTimeout(o), (o = 0)), s();
          }).on("touchend touchcancel", s);
        } else Pt(t, n), n.on(Mt + " " + At + " " + Dt, Nt);
    }
  }
  L(function () {
    gt.on(jt, zt).on(Rt, Bt);
  });
  var Ft = { reInit: !1, domLoadedEvent: !1 };
  function qt(t, e) {
    void 0 === e && (e = {}), (e = X({}, Ft, e));
    var n = t.target,
      i = L(n),
      o = t.type,
      s = i.val(),
      r = i.attr("type") || "";
    if (
      !(
        -1 <
        ["checkbox", "button", "submit", "range", "radio", "image"].indexOf(r)
      )
    ) {
      var a = i.parent(".mdui-textfield");
      if (
        ("focus" === o && a.addClass("mdui-textfield-focus"),
        "blur" === o && a.removeClass("mdui-textfield-focus"),
        ("blur" !== o && "input" !== o) ||
          (s
            ? a.addClass("mdui-textfield-not-empty")
            : a.removeClass("mdui-textfield-not-empty")),
        n.disabled
          ? a.addClass("mdui-textfield-disabled")
          : a.removeClass("mdui-textfield-disabled"),
        ("input" !== o && "blur" !== o) ||
          e.domLoadedEvent ||
          !n.validity ||
          (n.validity.valid
            ? a.removeClass("mdui-textfield-invalid-html5")
            : a.addClass("mdui-textfield-invalid-html5")),
        i.is("textarea"))
      ) {
        var u = s,
          c = !1;
        "" === u.replace(/[\r\n]/g, "") && (i.val(" " + u), (c = !0)),
          i.outerHeight("");
        var l = i.outerHeight(),
          d = n.scrollHeight;
        l < d && i.outerHeight(d), c && i.val(u);
      }
      e.reInit && a.find(".mdui-textfield-counter").remove();
      var h = i.attr("maxlength");
      h &&
        ((e.reInit || e.domLoadedEvent) &&
          L(
            '<div class="mdui-textfield-counter"><span class="mdui-textfield-counter-inputed"></span> / ' +
              h +
              "</div>"
          ).appendTo(a),
        a.find(".mdui-textfield-counter-inputed").text(s.length.toString())),
        (a.find(".mdui-textfield-helper").length ||
          a.find(".mdui-textfield-error").length ||
          h) &&
          a.addClass("mdui-textfield-has-bottom");
    }
  }
  function Wt(t) {
    var e = t.data(),
      n = e._slider_$track,
      i = e._slider_$fill,
      o = e._slider_$thumb,
      s = e._slider_$input,
      r = e._slider_min,
      a = e._slider_max,
      u = e._slider_disabled,
      c = e._slider_discrete,
      l = e._slider_$thumbText,
      d = s.val(),
      h = ((d - r) / (a - r)) * 100;
    i.width(h + "%"),
      n.width(100 - h + "%"),
      u && (i.css("padding-right", "6px"), n.css("padding-left", "6px")),
      o.css("left", h + "%"),
      c && l.text(d),
      0 == h
        ? t.addClass("mdui-slider-zero")
        : t.removeClass("mdui-slider-zero");
  }
  function Yt(t) {
    var e = L('<div class="mdui-slider-track"></div>'),
      n = L('<div class="mdui-slider-fill"></div>'),
      i = L('<div class="mdui-slider-thumb"></div>'),
      o = t.find('input[type="range"]'),
      s = o[0].disabled,
      r = t.hasClass("mdui-slider-discrete");
    s
      ? t.addClass("mdui-slider-disabled")
      : t.removeClass("mdui-slider-disabled"),
      t.find(".mdui-slider-track").remove(),
      t.find(".mdui-slider-fill").remove(),
      t.find(".mdui-slider-thumb").remove(),
      t.append(e).append(n).append(i);
    var a = L();
    r && ((a = L("<span></span>")), i.empty().append(a)),
      t.data("_slider_$track", e),
      t.data("_slider_$fill", n),
      t.data("_slider_$thumb", i),
      t.data("_slider_$input", o),
      t.data("_slider_min", o.attr("min")),
      t.data("_slider_max", o.attr("max")),
      t.data("_slider_disabled", s),
      t.data("_slider_discrete", r),
      t.data("_slider_$thumbText", a),
      Wt(t);
  }
  L(function () {
    gt.on("input focus blur", ".mdui-textfield-input", { useCapture: !0 }, qt),
      gt.on(
        "click",
        ".mdui-textfield-expandable .mdui-textfield-icon",
        function () {
          L(this)
            .parents(".mdui-textfield")
            .addClass("mdui-textfield-expanded")
            .find(".mdui-textfield-input")[0]
            .focus();
        }
      ),
      gt.on(
        "click",
        ".mdui-textfield-expanded .mdui-textfield-close",
        function () {
          L(this)
            .parents(".mdui-textfield")
            .removeClass("mdui-textfield-expanded")
            .find(".mdui-textfield-input")
            .val("");
        }
      ),
      B.mutation(".mdui-textfield", function () {
        L(this)
          .find(".mdui-textfield-input")
          .trigger("input", { domLoadedEvent: !0 });
      });
  }),
    (B.updateTextFields = function (t) {
      (O(t) ? L(".mdui-textfield") : L(t)).each(function (t, e) {
        L(e).find(".mdui-textfield-input").trigger("input", { reInit: !0 });
      });
    });
  var Ut = '.mdui-slider input[type="range"]';
  L(function () {
    gt.on("input change", Ut, function () {
      Wt(L(this).parent());
    }),
      gt.on(jt, Ut, function (t) {
        Lt(t) &&
          (Bt(t),
          this.disabled || L(this).parent().addClass("mdui-slider-focus"));
      }),
      gt.on(At, Ut, function (t) {
        Lt(t) &&
          (this.disabled || L(this).parent().removeClass("mdui-slider-focus"));
      }),
      gt.on(Rt, Ut, Bt),
      B.mutation(".mdui-slider", function () {
        Yt(L(this));
      });
  }),
    (B.updateSliders = function (t) {
      (O(t) ? L(".mdui-slider") : L(t)).each(function (t, e) {
        Yt(L(e));
      });
    });
  function Xt(t, e) {
    var n = this;
    void 0 === e && (e = {}),
      (this.options = X({}, Vt)),
      (this.state = "closed"),
      (this.$element = L(t).first()),
      X(this.options, e),
      (this.$btn = this.$element.find(".mdui-fab")),
      (this.$dial = this.$element.find(".mdui-fab-dial")),
      (this.$dialBtns = this.$dial.find(".mdui-fab")),
      "hover" === this.options.trigger &&
        (this.$btn.on("touchstart mouseenter", function () {
          return n.open();
        }),
        this.$element.on("mouseleave", function () {
          return n.close();
        })),
      "click" === this.options.trigger &&
        this.$btn.on(jt, function () {
          return n.open();
        }),
      gt.on(jt, function (t) {
        L(t.target).parents(".mdui-fab-wrapper").length || n.close();
      });
  }
  var Vt = { trigger: "hover" };
  (Xt.prototype.triggerEvent = function (t) {
    vt(t, "fab", this.$element, this);
  }),
    (Xt.prototype.isOpen = function () {
      return "opening" === this.state || "opened" === this.state;
    }),
    (Xt.prototype.open = function () {
      var i = this;
      this.isOpen() ||
        (this.$dialBtns.each(function (t, e) {
          var n = 15 * (i.$dialBtns.length - t) + "ms";
          (e.style.transitionDelay = n), (e.style.webkitTransitionDelay = n);
        }),
        this.$dial.css("height", "auto").addClass("mdui-fab-dial-show"),
        this.$btn.find(".mdui-fab-opened").length &&
          this.$btn.addClass("mdui-fab-opened"),
        (this.state = "opening"),
        this.triggerEvent("open"),
        this.$dialBtns.first().transitionEnd(function () {
          i.$btn.hasClass("mdui-fab-opened") &&
            ((i.state = "opened"), i.triggerEvent("opened"));
        }));
    }),
    (Xt.prototype.close = function () {
      var t = this;
      this.isOpen() &&
        (this.$dialBtns.each(function (t, e) {
          var n = 15 * t + "ms";
          (e.style.transitionDelay = n), (e.style.webkitTransitionDelay = n);
        }),
        this.$dial.removeClass("mdui-fab-dial-show"),
        this.$btn.removeClass("mdui-fab-opened"),
        (this.state = "closing"),
        this.triggerEvent("close"),
        this.$dialBtns.last().transitionEnd(function () {
          t.$btn.hasClass("mdui-fab-opened") ||
            ((t.state = "closed"),
            t.triggerEvent("closed"),
            t.$dial.css("height", 0));
        }));
    }),
    (Xt.prototype.toggle = function () {
      this.isOpen() ? this.close() : this.open();
    }),
    (Xt.prototype.show = function () {
      this.$element.removeClass("mdui-fab-hide");
    }),
    (Xt.prototype.hide = function () {
      this.$element.addClass("mdui-fab-hide");
    }),
    (Xt.prototype.getState = function () {
      return this.state;
    }),
    (B.Fab = Xt);
  var Jt = "mdui-fab";
  L(function () {
    gt.on("touchstart mousedown mouseover", "[" + Jt + "]", function () {
      new B.Fab(this, Ct(this, Jt));
    });
  });
  function Kt(t, e) {
    var n = this;
    void 0 === e && (e = {}),
      (this.$element = L()),
      (this.options = X({}, Gt)),
      (this.size = 0),
      (this.$selected = L()),
      (this.$menu = L()),
      (this.$items = L()),
      (this.selectedIndex = 0),
      (this.selectedText = ""),
      (this.selectedValue = ""),
      (this.state = "closed"),
      (this.$native = L(t).first()),
      this.$native.hide(),
      X(this.options, e),
      (this.uniqueID = L.guid()),
      this.handleUpdate(),
      gt.on("click touchstart", function (t) {
        var e = L(t.target);
        !n.isOpen() || e.is(n.$element) || P(n.$element[0], e[0]) || n.close();
      });
  }
  var Gt = { position: "auto", gutter: 16 };
  (Kt.prototype.readjustMenu = function () {
    var t,
      e,
      n = yt.height(),
      i = this.$element.height(),
      o = this.$items.first(),
      s = o.height(),
      r = parseInt(o.css("margin-top")),
      a = this.$element.innerWidth() + 0.01,
      u = s * this.size + 2 * r,
      c = this.$element[0].getBoundingClientRect().top;
    if ("bottom" === this.options.position) (e = i), (t = "0px");
    else if ("top" === this.options.position) (e = -u - 1), (t = "100%");
    else {
      var l = n - 2 * this.options.gutter;
      l < u && (u = l), (e = -(r + this.selectedIndex * s + (s - i) / 2));
      var d = -(r + (this.size - 1) * s + (s - i) / 2);
      e < d && (e = d);
      var h = c + e;
      h < this.options.gutter
        ? (e = -(c - this.options.gutter))
        : h + u + this.options.gutter > n &&
          (e = -(c + u + this.options.gutter - n)),
        (t = this.selectedIndex * s + s / 2 + r + "px");
    }
    this.$element.innerWidth(a),
      this.$menu
        .innerWidth(a)
        .height(u)
        .css({
          "margin-top": e + "px",
          "transform-origin": "center " + t + " 0",
        });
  }),
    (Kt.prototype.isOpen = function () {
      return "opening" === this.state || "opened" === this.state;
    }),
    (Kt.prototype.handleUpdate = function () {
      var r = this;
      this.isOpen() && this.close(), (this.selectedValue = this.$native.val());
      var a = [];
      (this.$items = L()),
        this.$native.find("option").each(function (t, e) {
          var n = e.textContent || "",
            i = e.value,
            o = e.disabled,
            s = r.selectedValue === i;
          a.push({ value: i, text: n, disabled: o, selected: s, index: t }),
            s && ((r.selectedText = n), (r.selectedIndex = t)),
            (r.$items = r.$items.add(
              '<div class="mdui-select-menu-item mdui-ripple"' +
                (o ? " disabled" : "") +
                (s ? " selected" : "") +
                ">" +
                n +
                "</div>"
            ));
        }),
        (this.$selected = L(
          '<span class="mdui-select-selected">' + this.selectedText + "</span>"
        )),
        (this.$element = L(
          '<div class="mdui-select mdui-select-position-' +
            this.options.position +
            '" style="' +
            this.$native.attr("style") +
            '" id="' +
            this.uniqueID +
            '"></div>'
        )
          .show()
          .append(this.$selected)),
        (this.$menu = L('<div class="mdui-select-menu"></div>')
          .appendTo(this.$element)
          .append(this.$items)),
        L("#" + this.uniqueID).remove(),
        this.$native.after(this.$element),
        (this.size = parseInt(this.$native.attr("size") || "0")),
        this.size <= 0 &&
          ((this.size = this.$items.length), 8 < this.size && (this.size = 8));
      var i = this;
      this.$items.on("click", function () {
        if ("closing" !== i.state) {
          var t = L(this),
            e = t.index(),
            n = a[e];
          n.disabled ||
            (i.$selected.text(n.text),
            i.$native.val(n.value),
            i.$items.removeAttr("selected"),
            t.attr("selected", ""),
            (i.selectedIndex = n.index),
            (i.selectedValue = n.value),
            (i.selectedText = n.text),
            i.$native.trigger("change"),
            i.close());
        }
      }),
        this.$element.on("click", function (t) {
          var e = L(t.target);
          e.is(".mdui-select-menu") ||
            e.is(".mdui-select-menu-item") ||
            r.toggle();
        });
    }),
    (Kt.prototype.transitionEnd = function () {
      this.$element.removeClass("mdui-select-closing"),
        "opening" === this.state &&
          ((this.state = "opened"),
          this.triggerEvent("opened"),
          this.$menu.css("overflow-y", "auto")),
        "closing" === this.state &&
          ((this.state = "closed"),
          this.triggerEvent("closed"),
          this.$element.innerWidth(""),
          this.$menu.css({ "margin-top": "", height: "", width: "" }));
    }),
    (Kt.prototype.triggerEvent = function (t) {
      vt(t, "select", this.$native, this);
    }),
    (Kt.prototype.toggle = function () {
      this.isOpen() ? this.close() : this.open();
    }),
    (Kt.prototype.open = function () {
      var t = this;
      this.isOpen() ||
        ((this.state = "opening"),
        this.triggerEvent("open"),
        this.readjustMenu(),
        this.$element.addClass("mdui-select-open"),
        this.$menu.transitionEnd(function () {
          return t.transitionEnd();
        }));
    }),
    (Kt.prototype.close = function () {
      var t = this;
      this.isOpen() &&
        ((this.state = "closing"),
        this.triggerEvent("close"),
        this.$menu.css("overflow-y", ""),
        this.$element
          .removeClass("mdui-select-open")
          .addClass("mdui-select-closing"),
        this.$menu.transitionEnd(function () {
          return t.transitionEnd();
        }));
    }),
    (Kt.prototype.getState = function () {
      return this.state;
    }),
    (B.Select = Kt);
  var Qt = "mdui-select";
  L(function () {
    B.mutation("[" + Qt + "]", function () {
      new B.Select(this, Ct(this, Qt));
    });
  }),
    L(function () {
      B.mutation(".mdui-appbar-scroll-hide", function () {
        new B.Headroom(this);
      }),
        B.mutation(".mdui-appbar-scroll-toolbar-hide", function () {
          new B.Headroom(this, {
            pinnedClass: "mdui-headroom-pinned-toolbar",
            unpinnedClass: "mdui-headroom-unpinned-toolbar",
          });
        });
    });
  function Zt(t, e) {
    var n = this;
    void 0 === e && (e = {}),
      (this.options = X({}, te)),
      (this.activeIndex = -1),
      (this.$element = L(t).first()),
      X(this.options, e),
      (this.$tabs = this.$element.children("a")),
      (this.$indicator = L('<div class="mdui-tab-indicator"></div>').appendTo(
        this.$element
      ));
    var i = window.location.hash;
    i &&
      this.$tabs.each(function (t, e) {
        return L(e).attr("href") !== i || ((n.activeIndex = t), !1);
      }),
      -1 === this.activeIndex &&
        this.$tabs.each(function (t, e) {
          return !L(e).hasClass("mdui-tab-active") || ((n.activeIndex = t), !1);
        }),
      this.$tabs.length && -1 === this.activeIndex && (this.activeIndex = 0),
      this.setActive(),
      yt.on(
        "resize",
        L.throttle(function () {
          return n.setIndicatorPosition();
        }, 100)
      ),
      this.$tabs.each(function (t, e) {
        n.bindTabEvent(e);
      });
  }
  var te = { trigger: "click", loop: !1 };
  (Zt.prototype.isDisabled = function (t) {
    return void 0 !== t.attr("disabled");
  }),
    (Zt.prototype.bindTabEvent = function (t) {
      function e() {
        if (n.isDisabled(i)) return !1;
        (n.activeIndex = n.$tabs.index(t)), n.setActive();
      }
      var n = this,
        i = L(t);
      i.on("click", e),
        "hover" === this.options.trigger && i.on("mouseenter", e),
        i.on("click", function () {
          if (0 === (i.attr("href") || "").indexOf("#")) return !1;
        });
    }),
    (Zt.prototype.triggerEvent = function (t, e, n) {
      void 0 === n && (n = {}), vt(t, "tab", e, this, n);
    }),
    (Zt.prototype.setActive = function () {
      var o = this;
      this.$tabs.each(function (t, e) {
        var n = L(e),
          i = n.attr("href") || "";
        t !== o.activeIndex || o.isDisabled(n)
          ? (n.removeClass("mdui-tab-active"), L(i).hide())
          : (n.hasClass("mdui-tab-active") ||
              (o.triggerEvent("change", o.$element, {
                index: o.activeIndex,
                id: i.substr(1),
              }),
              o.triggerEvent("show", n),
              n.addClass("mdui-tab-active")),
            L(i).show(),
            o.setIndicatorPosition());
      });
    }),
    (Zt.prototype.setIndicatorPosition = function () {
      if (-1 !== this.activeIndex) {
        var t = this.$tabs.eq(this.activeIndex);
        if (!this.isDisabled(t)) {
          var e = t.offset();
          this.$indicator.css({
            left:
              e.left +
              this.$element[0].scrollLeft -
              this.$element[0].getBoundingClientRect().left +
              "px",
            width: t.innerWidth() + "px",
          });
        }
      } else this.$indicator.css({ left: 0, width: 0 });
    }),
    (Zt.prototype.next = function () {
      -1 !== this.activeIndex &&
        (this.$tabs.length > this.activeIndex + 1
          ? this.activeIndex++
          : this.options.loop && (this.activeIndex = 0),
        this.setActive());
    }),
    (Zt.prototype.prev = function () {
      -1 !== this.activeIndex &&
        (0 < this.activeIndex
          ? this.activeIndex--
          : this.options.loop && (this.activeIndex = this.$tabs.length - 1),
        this.setActive());
    }),
    (Zt.prototype.show = function (n) {
      var i = this;
      -1 !== this.activeIndex &&
        (m(n)
          ? (this.activeIndex = n)
          : this.$tabs.each(function (t, e) {
              if (e.id === n) return (i.activeIndex = t), !1;
            }),
        this.setActive());
    }),
    (Zt.prototype.handleUpdate = function () {
      var n = this,
        t = this.$tabs,
        e = this.$element.children("a"),
        i = t.get(),
        o = e.get();
      if (!e.length)
        return (
          (this.activeIndex = -1),
          (this.$tabs = e),
          void this.setIndicatorPosition()
        );
      e.each(function (t, e) {
        i.indexOf(e) < 0 &&
          (n.bindTabEvent(e),
          -1 === n.activeIndex
            ? (n.activeIndex = 0)
            : t <= n.activeIndex && n.activeIndex++);
      }),
        t.each(function (t, e) {
          o.indexOf(e) < 0 &&
            (t < n.activeIndex
              ? n.activeIndex--
              : t === n.activeIndex && (n.activeIndex = 0));
        }),
        (this.$tabs = e),
        this.setActive();
    }),
    (B.Tab = Zt);
  var ee = "mdui-tab";
  L(function () {
    B.mutation("[" + ee + "]", function () {
      new B.Tab(this, Ct(this, ee));
    });
  });
  function ne(t, e) {
    var n = this;
    void 0 === e && (e = {}),
      (this.options = X({}, ie)),
      (this.overlay = !1),
      (this.$element = L(t).first()),
      X(this.options, e),
      (this.position = this.$element.hasClass("mdui-drawer-right")
        ? "right"
        : "left"),
      this.$element.hasClass("mdui-drawer-close")
        ? (this.state = "closed")
        : this.$element.hasClass("mdui-drawer-open") || this.isDesktop()
        ? (this.state = "opened")
        : (this.state = "closed"),
      yt.on(
        "resize",
        L.throttle(function () {
          n.isDesktop()
            ? (n.overlay &&
                !n.options.overlay &&
                (L.hideOverlay(), (n.overlay = !1), L.unlockScreen()),
              n.$element.hasClass("mdui-drawer-close") || (n.state = "opened"))
            : n.overlay ||
              "opened" !== n.state ||
              (n.$element.hasClass("mdui-drawer-open")
                ? (L.showOverlay(),
                  (n.overlay = !0),
                  L.lockScreen(),
                  L(".mdui-overlay").one("click", function () {
                    return n.close();
                  }))
                : (n.state = "closed"));
        }, 100)
      ),
      this.$element.find("[mdui-drawer-close]").each(function (t, e) {
        L(e).on("click", function () {
          return n.close();
        });
      }),
      this.swipeSupport();
  }
  var ie = { overlay: !1, swipe: !1 };
  (ne.prototype.isDesktop = function () {
    return 1024 <= yt.width();
  }),
    (ne.prototype.swipeSupport = function () {
      var e,
        s,
        r,
        a,
        u = this,
        c = null,
        l = !1,
        d = L("body"),
        n = 24;
      function h(t) {
        var e =
          "translate(" +
          -1 * ("right" === u.position ? -1 : 1) * t +
          "px, 0) !important;";
        u.$element.css(
          "cssText",
          "transform: " + e + "; transition: initial !important;;"
        );
      }
      function o() {
        (u.$element[0].style.transform = ""),
          (u.$element[0].style.webkitTransform = ""),
          (u.$element[0].style.transition = ""),
          (u.$element[0].style.webkitTransition = "");
      }
      function f() {
        return u.$element.width() + 10;
      }
      function p(t) {
        return Math.min(
          Math.max("closing" === c ? a - t : f() + a - t, 0),
          f()
        );
      }
      function m(t) {
        if (c) {
          var e = t.changedTouches[0].pageX;
          "right" === u.position && (e = d.width() - e);
          var n = p(e) / f();
          l = !1;
          var i = c;
          (c = null),
            "opening" === i
              ? n < 0.92
                ? (o(), u.open())
                : o()
              : 0.08 < n
              ? (o(), u.close())
              : o(),
            L.unlockScreen();
        } else l = !1;
        d.off({ touchmove: v, touchend: m, touchcancel: v });
      }
      function v(t) {
        var e = t.touches[0].pageX;
        "right" === u.position && (e = d.width() - e);
        var n = t.touches[0].pageY;
        if (c) h(p(e));
        else if (l) {
          var i = Math.abs(e - s),
            o = Math.abs(n - r);
          8 < i && o <= 8
            ? ((a = e),
              (c = "opened" === u.state ? "closing" : "opening"),
              L.lockScreen(),
              h(p(e)))
            : i <= 8 && 8 < o && m();
        }
      }
      function i(t) {
        (s = t.touches[0].pageX),
          "right" === u.position && (s = d.width() - s),
          (r = t.touches[0].pageY),
          ("opened" !== u.state && (n < s || e !== i)) ||
            ((l = !0), d.on({ touchmove: v, touchend: m, touchcancel: v }));
      }
      this.options.swipe && (e || (d.on("touchstart", i), (e = i)));
    }),
    (ne.prototype.triggerEvent = function (t) {
      vt(t, "drawer", this.$element, this);
    }),
    (ne.prototype.transitionEnd = function () {
      this.$element.hasClass("mdui-drawer-open")
        ? ((this.state = "opened"), this.triggerEvent("opened"))
        : ((this.state = "closed"), this.triggerEvent("closed"));
    }),
    (ne.prototype.isOpen = function () {
      return "opening" === this.state || "opened" === this.state;
    }),
    (ne.prototype.open = function () {
      var t = this;
      this.isOpen() ||
        ((this.state = "opening"),
        this.triggerEvent("open"),
        this.options.overlay ||
          L("body").addClass("mdui-drawer-body-" + this.position),
        this.$element
          .removeClass("mdui-drawer-close")
          .addClass("mdui-drawer-open")
          .transitionEnd(function () {
            return t.transitionEnd();
          }),
        (this.isDesktop() && !this.options.overlay) ||
          ((this.overlay = !0),
          L.showOverlay().one("click", function () {
            return t.close();
          }),
          L.lockScreen()));
    }),
    (ne.prototype.close = function () {
      var t = this;
      this.isOpen() &&
        ((this.state = "closing"),
        this.triggerEvent("close"),
        this.options.overlay ||
          L("body").removeClass("mdui-drawer-body-" + this.position),
        this.$element
          .addClass("mdui-drawer-close")
          .removeClass("mdui-drawer-open")
          .transitionEnd(function () {
            return t.transitionEnd();
          }),
        this.overlay &&
          (L.hideOverlay(), (this.overlay = !1), L.unlockScreen()));
    }),
    (ne.prototype.toggle = function () {
      this.isOpen() ? this.close() : this.open();
    }),
    (ne.prototype.getState = function () {
      return this.state;
    }),
    (B.Drawer = ne);
  var oe = "mdui-drawer";
  L(function () {
    B.mutation("[" + oe + "]", function () {
      var t = L(this),
        e = Ct(this, oe),
        n = e.target;
      delete e.target;
      var i = L(n).first(),
        o = new B.Drawer(i, e);
      t.on("click", function () {
        return o.toggle();
      });
    });
  });
  var se = {};
  function re(t, e) {
    if ((O(se[t]) && (se[t] = []), O(e))) return se[t];
    se[t].push(e);
  }
  function ae(t) {
    O(se[t]) || (se[t].length && se[t].shift()());
  }
  function ue(t, e) {
    var n = this;
    void 0 === e && (e = {}),
      (this.options = X({}, le)),
      (this.state = "closed"),
      (this.append = !1),
      (this.$element = L(t).first()),
      P(document.body, this.$element[0]) ||
        ((this.append = !0), L("body").append(this.$element)),
      X(this.options, e),
      this.$element.find("[mdui-dialog-cancel]").each(function (t, e) {
        L(e).on("click", function () {
          n.triggerEvent("cancel"), n.options.closeOnCancel && n.close();
        });
      }),
      this.$element.find("[mdui-dialog-confirm]").each(function (t, e) {
        L(e).on("click", function () {
          n.triggerEvent("confirm"), n.options.closeOnConfirm && n.close();
        });
      }),
      this.$element.find("[mdui-dialog-close]").each(function (t, e) {
        L(e).on("click", function () {
          return n.close();
        });
      });
  }
  var ce,
    le = {
      history: !0,
      overlay: !0,
      modal: !1,
      closeOnEsc: !0,
      closeOnCancel: !0,
      closeOnConfirm: !0,
      destroyOnClosed: !1,
    },
    de = null,
    he = "_mdui_dialog",
    fe = !1;
  (ue.prototype.triggerEvent = function (t) {
    vt(t, "dialog", this.$element, this);
  }),
    (ue.prototype.readjust = function () {
      if (de) {
        var t = de.$element,
          e = t.children(".mdui-dialog-title"),
          n = t.children(".mdui-dialog-content"),
          i = t.children(".mdui-dialog-actions");
        t.height(""), n.height("");
        var o = t.height();
        t.css({ top: (yt.height() - o) / 2 + "px", height: o + "px" }),
          n.innerHeight(o - (e.innerHeight() || 0) - (i.innerHeight() || 0));
      }
    }),
    (ue.prototype.hashchangeEvent = function () {
      window.location.hash.substring(1).indexOf("mdui-dialog") < 0 &&
        de.close(!0);
    }),
    (ue.prototype.overlayClick = function (t) {
      L(t.target).hasClass("mdui-overlay") && de && de.close();
    }),
    (ue.prototype.transitionEnd = function () {
      this.$element.hasClass("mdui-dialog-open")
        ? ((this.state = "opened"), this.triggerEvent("opened"))
        : ((this.state = "closed"),
          this.triggerEvent("closed"),
          this.$element.hide(),
          re(he).length || de || !fe || (L.unlockScreen(), (fe = !1)),
          yt.off("resize", L.throttle(this.readjust, 100)),
          this.options.destroyOnClosed && this.destroy());
    }),
    (ue.prototype.doOpen = function () {
      var t = this;
      if (
        ((de = this),
        fe || (L.lockScreen(), (fe = !0)),
        this.$element.show(),
        this.readjust(),
        yt.on("resize", L.throttle(this.readjust, 100)),
        (this.state = "opening"),
        this.triggerEvent("open"),
        this.$element.addClass("mdui-dialog-open").transitionEnd(function () {
          return t.transitionEnd();
        }),
        (ce = ce || L.showOverlay(5100)),
        this.options.modal
          ? ce.off("click", this.overlayClick)
          : ce.on("click", this.overlayClick),
        ce.css("opacity", this.options.overlay ? "" : 0),
        this.options.history)
      ) {
        var e = window.location.hash.substring(1);
        -1 < e.indexOf("mdui-dialog") &&
          (e = e.replace(/[&?]?mdui-dialog/g, "")),
          (window.location.hash = e
            ? e + (-1 < e.indexOf("?") ? "&" : "?") + "mdui-dialog"
            : "mdui-dialog"),
          yt.on("hashchange", this.hashchangeEvent);
      }
    }),
    (ue.prototype.isOpen = function () {
      return "opening" === this.state || "opened" === this.state;
    }),
    (ue.prototype.open = function () {
      var t = this;
      this.isOpen() ||
        ((de && ("opening" === de.state || "opened" === de.state)) ||
        re(he).length
          ? re(he, function () {
              return t.doOpen();
            })
          : this.doOpen());
    }),
    (ue.prototype.close = function (t) {
      var e = this;
      void 0 === t && (t = !1),
        setTimeout(function () {
          e.isOpen() &&
            ((de = null),
            (e.state = "closing"),
            e.triggerEvent("close"),
            !re(he).length &&
              ce &&
              (L.hideOverlay(),
              (ce = null),
              L(".mdui-overlay").css("z-index", 2e3)),
            e.$element
              .removeClass("mdui-dialog-open")
              .transitionEnd(function () {
                return e.transitionEnd();
              }),
            e.options.history &&
              !re(he).length &&
              (t || window.history.back(),
              yt.off("hashchange", e.hashchangeEvent)),
            setTimeout(function () {
              ae(he);
            }, 100));
        });
    }),
    (ue.prototype.toggle = function () {
      this.isOpen() ? this.close() : this.open();
    }),
    (ue.prototype.getState = function () {
      return this.state;
    }),
    (ue.prototype.destroy = function () {
      this.append && this.$element.remove(),
        re(he).length ||
          de ||
          (ce && (L.hideOverlay(), (ce = null)),
          fe && (L.unlockScreen(), (fe = !1)));
    }),
    (ue.prototype.handleUpdate = function () {
      this.readjust();
    }),
    gt.on("keydown", function (t) {
      de &&
        de.options.closeOnEsc &&
        "opened" === de.state &&
        27 === t.keyCode &&
        de.close();
    }),
    (B.Dialog = ue);
  var pe = "mdui-dialog",
    me = "_mdui_dialog";
  L(function () {
    gt.on("click", "[" + pe + "]", function () {
      var t = Ct(this, pe),
        e = t.target;
      delete t.target;
      var n = L(e).first(),
        i = n.data(me);
      i || ((i = new B.Dialog(n, t)), n.data(me, i)), i.open();
    });
  });
  var ve = { text: "", bold: !1, close: !0, onClick: function () {} },
    ge = {
      title: "",
      content: "",
      buttons: [],
      stackedButtons: !1,
      cssClass: "",
      history: !0,
      overlay: !0,
      modal: !1,
      closeOnEsc: !0,
      destroyOnClosed: !0,
      onOpen: function () {},
      onOpened: function () {},
      onClose: function () {},
      onClosed: function () {},
    },
    ye = {
      confirmText: "ok",
      history: !0,
      modal: !(B.dialog = function (n) {
        var t, e;
        D((n = X({}, ge, n)).buttons, function (t, e) {
          n.buttons[t] = X({}, ve, e);
        });
        var i = "";
        null !== (t = n.buttons) &&
          void 0 !== t &&
          t.length &&
          ((i =
            '<div class="mdui-dialog-actions' +
            (n.stackedButtons ? " mdui-dialog-actions-stacked" : "") +
            '">'),
          D(n.buttons, function (t, e) {
            i +=
              '<a href="javascript:void(0)" class="mdui-btn mdui-ripple mdui-text-color-primary ' +
              (e.bold ? "mdui-btn-bold" : "") +
              '">' +
              e.text +
              "</a>";
          }),
          (i += "</div>"));
        var o =
            '<div class="mdui-dialog ' +
            n.cssClass +
            '">' +
            (n.title
              ? '<div class="mdui-dialog-title">' + n.title + "</div>"
              : "") +
            (n.content
              ? '<div class="mdui-dialog-content">' + n.content + "</div>"
              : "") +
            i +
            "</div>",
          s = new B.Dialog(o, {
            history: n.history,
            overlay: n.overlay,
            modal: n.modal,
            closeOnEsc: n.closeOnEsc,
            destroyOnClosed: n.destroyOnClosed,
          });
        return (
          null !== (e = n.buttons) &&
            void 0 !== e &&
            e.length &&
            s.$element
              .find(".mdui-dialog-actions .mdui-btn")
              .each(function (t, e) {
                L(e).on("click", function () {
                  n.buttons[t].onClick(s), n.buttons[t].close && s.close();
                });
              }),
          s.$element
            .on("open.mdui.dialog", function () {
              n.onOpen(s);
            })
            .on("opened.mdui.dialog", function () {
              n.onOpened(s);
            })
            .on("close.mdui.dialog", function () {
              n.onClose(s);
            })
            .on("closed.mdui.dialog", function () {
              n.onClosed(s);
            }),
          s.open(),
          s
        );
      }),
      closeOnEsc: !0,
      closeOnConfirm: !0,
    },
    be = {
      confirmText: "ok",
      cancelText: "cancel",
      history: !0,
      modal: !(B.alert = function (t, e, n, i) {
        return (
          p(e) && ((i = n), (n = e), (e = "")),
          O(n) && (n = function () {}),
          O(i) && (i = {}),
          (i = X({}, ye, i)),
          B.dialog({
            title: e,
            content: t,
            buttons: [
              {
                text: i.confirmText,
                bold: !1,
                close: i.closeOnConfirm,
                onClick: n,
              },
            ],
            cssClass: "mdui-dialog-alert",
            history: i.history,
            modal: i.modal,
            closeOnEsc: i.closeOnEsc,
          })
        );
      }),
      closeOnEsc: !0,
      closeOnCancel: !0,
      closeOnConfirm: !0,
    },
    xe = {
      confirmText: "ok",
      cancelText: "cancel",
      history: !0,
      modal: !(B.confirm = function (t, e, n, i, o) {
        return (
          p(e) && ((o = i), (i = n), (n = e), (e = "")),
          O(n) && (n = function () {}),
          O(i) && (i = function () {}),
          O(o) && (o = {}),
          (o = X({}, be, o)),
          B.dialog({
            title: e,
            content: t,
            buttons: [
              {
                text: o.cancelText,
                bold: !1,
                close: o.closeOnCancel,
                onClick: i,
              },
              {
                text: o.confirmText,
                bold: !1,
                close: o.closeOnConfirm,
                onClick: n,
              },
            ],
            cssClass: "mdui-dialog-confirm",
            history: o.history,
            modal: o.modal,
            closeOnEsc: o.closeOnEsc,
          })
        );
      }),
      closeOnEsc: !0,
      closeOnCancel: !0,
      closeOnConfirm: !0,
      type: "text",
      maxlength: 0,
      defaultValue: "",
      confirmOnEnter: !1,
    };
  B.prompt = function (t, e, i, n, o) {
    p(e) && ((o = n), (n = i), (i = e), (e = "")),
      O(i) && (i = function () {}),
      O(n) && (n = function () {}),
      O(o) && (o = {});
    var s =
      '<div class="mdui-textfield">' +
      (t ? '<label class="mdui-textfield-label">' + t + "</label>" : "") +
      ("text" === (o = X({}, xe, o)).type
        ? '<input class="mdui-textfield-input" type="text" value="' +
          o.defaultValue +
          '" ' +
          (o.maxlength ? 'maxlength="' + o.maxlength + '"' : "") +
          "/>"
        : "") +
      ("textarea" === o.type
        ? '<textarea class="mdui-textfield-input" ' +
          (o.maxlength ? 'maxlength="' + o.maxlength + '"' : "") +
          ">" +
          o.defaultValue +
          "</textarea>"
        : "") +
      "</div>";
    return B.dialog({
      title: e,
      content: s,
      buttons: [
        {
          text: o.cancelText,
          bold: !1,
          close: o.closeOnCancel,
          onClick: function (t) {
            var e = t.$element.find(".mdui-textfield-input").val();
            n(e, t);
          },
        },
        {
          text: o.confirmText,
          bold: !1,
          close: o.closeOnConfirm,
          onClick: function (t) {
            var e = t.$element.find(".mdui-textfield-input").val();
            i(e, t);
          },
        },
      ],
      cssClass: "mdui-dialog-prompt",
      history: o.history,
      modal: o.modal,
      closeOnEsc: o.closeOnEsc,
      onOpen: function (n) {
        var t = n.$element.find(".mdui-textfield-input");
        B.updateTextFields(t),
          t[0].focus(),
          "textarea" !== o.type &&
            !0 === o.confirmOnEnter &&
            t.on("keydown", function (t) {
              if (13 === t.keyCode) {
                var e = n.$element.find(".mdui-textfield-input").val();
                return i(e, n), o.closeOnConfirm && n.close(), !1;
              }
            }),
          "textarea" === o.type &&
            t.on("input", function () {
              return n.handleUpdate();
            }),
          o.maxlength && n.handleUpdate();
      },
    });
  };
  function Ce(t, e) {
    void 0 === e && (e = {}),
      (this.options = X({}, we)),
      (this.state = "closed"),
      (this.timeoutId = null),
      (this.$target = L(t).first()),
      X(this.options, e),
      (this.$element = L(
        '<div class="mdui-tooltip" id="' +
          L.guid() +
          '">' +
          this.options.content +
          "</div>"
      ).appendTo(document.body));
    var n = this;
    this.$target
      .on("touchstart mouseenter", function (t) {
        n.isDisabled(this) || (Lt(t) && (Bt(t), n.open()));
      })
      .on("touchend mouseleave", function (t) {
        n.isDisabled(this) || (Lt(t) && n.close());
      })
      .on(Rt, function (t) {
        n.isDisabled(this) || Bt(t);
      });
  }
  var we = { position: "auto", delay: 0, content: "" };
  (Ce.prototype.isDisabled = function (t) {
    return t.disabled || void 0 !== L(t).attr("disabled");
  }),
    (Ce.prototype.isDesktop = function () {
      return 1024 < yt.width();
    }),
    (Ce.prototype.setPosition = function () {
      var t,
        e,
        n = this.$target[0].getBoundingClientRect(),
        i = this.isDesktop() ? 14 : 24,
        o = this.$element[0].offsetWidth,
        s = this.$element[0].offsetHeight,
        r = this.options.position;
      switch (
        ("auto" === r &&
          (r =
            n.top + n.height + i + s + 2 < yt.height()
              ? "bottom"
              : i + s + 2 < n.top
              ? "top"
              : i + o + 2 < n.left
              ? "left"
              : n.width + i + o + 2 < yt.width() - n.left
              ? "right"
              : "bottom"),
        r)
      ) {
        case "bottom":
          (t = (o / 2) * -1),
            (e = n.height / 2 + i),
            this.$element.transformOrigin("top center");
          break;
        case "top":
          (t = (o / 2) * -1),
            (e = -1 * (s + n.height / 2 + i)),
            this.$element.transformOrigin("bottom center");
          break;
        case "left":
          (t = -1 * (o + n.width / 2 + i)),
            (e = (s / 2) * -1),
            this.$element.transformOrigin("center right");
          break;
        case "right":
          (t = n.width / 2 + i),
            (e = (s / 2) * -1),
            this.$element.transformOrigin("center left");
      }
      var a = this.$target.offset();
      this.$element.css({
        top: a.top + n.height / 2 + "px",
        left: a.left + n.width / 2 + "px",
        "margin-left": t + "px",
        "margin-top": e + "px",
      });
    }),
    (Ce.prototype.triggerEvent = function (t) {
      vt(t, "tooltip", this.$target, this);
    }),
    (Ce.prototype.transitionEnd = function () {
      this.$element.hasClass("mdui-tooltip-open")
        ? ((this.state = "opened"), this.triggerEvent("opened"))
        : ((this.state = "closed"), this.triggerEvent("closed"));
    }),
    (Ce.prototype.isOpen = function () {
      return "opening" === this.state || "opened" === this.state;
    }),
    (Ce.prototype.doOpen = function () {
      var t = this;
      (this.state = "opening"),
        this.triggerEvent("open"),
        this.$element.addClass("mdui-tooltip-open").transitionEnd(function () {
          return t.transitionEnd();
        });
    }),
    (Ce.prototype.open = function (t) {
      var e = this;
      if (!this.isOpen()) {
        var n = X({}, this.options);
        t && X(this.options, t),
          n.content !== this.options.content &&
            this.$element.html(this.options.content),
          this.setPosition(),
          this.options.delay
            ? (this.timeoutId = setTimeout(function () {
                return e.doOpen();
              }, this.options.delay))
            : ((this.timeoutId = null), this.doOpen());
      }
    }),
    (Ce.prototype.close = function () {
      var t = this;
      this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = null)),
        this.isOpen() &&
          ((this.state = "closing"),
          this.triggerEvent("close"),
          this.$element
            .removeClass("mdui-tooltip-open")
            .transitionEnd(function () {
              return t.transitionEnd();
            }));
    }),
    (Ce.prototype.toggle = function () {
      this.isOpen() ? this.close() : this.open();
    }),
    (Ce.prototype.getState = function () {
      return this.state;
    }),
    (B.Tooltip = Ce);
  var $e = "mdui-tooltip",
    Ee = "_mdui_tooltip";
  L(function () {
    gt.on("touchstart mouseover", "[" + $e + "]", function () {
      var t = L(this),
        e = t.data(Ee);
      e || ((e = new B.Tooltip(this, Ct(this, $e))), t.data(Ee, e));
    });
  });
  function Oe(t) {
    (this.options = X({}, ke)),
      (this.state = "closed"),
      (this.timeoutId = null),
      X(this.options, t);
    var e = "",
      n = "";
    0 === this.options.buttonColor.indexOf("#") ||
    0 === this.options.buttonColor.indexOf("rgb")
      ? (e = 'style="color:' + this.options.buttonColor + '"')
      : "" !== this.options.buttonColor &&
        (n = "mdui-text-color-" + this.options.buttonColor),
      (this.$element = L(
        '<div class="mdui-snackbar"><div class="mdui-snackbar-text">' +
          this.options.message +
          "</div>" +
          (this.options.buttonText
            ? '<a href="javascript:void(0)" class="mdui-snackbar-action mdui-btn mdui-ripple mdui-ripple-white ' +
              n +
              '" ' +
              e +
              ">" +
              this.options.buttonText +
              "</a>"
            : "") +
          "</div>"
      ).appendTo(document.body)),
      this.setPosition("close"),
      this.$element.reflow().addClass("mdui-snackbar-" + this.options.position);
  }
  var ke = {
      message: "",
      timeout: 4e3,
      position: "bottom",
      buttonText: "",
      buttonColor: "",
      closeOnButtonClick: !0,
      closeOnOutsideClick: !0,
      onClick: function () {},
      onButtonClick: function () {},
      onOpen: function () {},
      onOpened: function () {},
      onClose: function () {},
      onClosed: function () {},
    },
    _e = null,
    Te = "_mdui_snackbar";
  function Ie(t) {
    return (
      void 0 === t && (t = !1),
      '<div class="mdui-spinner-layer ' +
        (t ? "mdui-spinner-layer-" + t : "") +
        '"><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div>'
    );
  }
  function Se(t) {
    var e = L(t),
      n = e.hasClass("mdui-spinner-colorful")
        ? Ie(1) + Ie(2) + Ie(3) + Ie(4)
        : Ie();
    e.html(n);
  }
  (Oe.prototype.closeOnOutsideClick = function (t) {
    var e = L(t.target);
    e.hasClass("mdui-snackbar") ||
      e.parents(".mdui-snackbar").length ||
      _e.close();
  }),
    (Oe.prototype.setPosition = function (t) {
      var e,
        n,
        i = this.$element[0].clientHeight,
        o = this.options.position;
      (e = "bottom" === o || "top" === o ? "-50%" : "0"),
        "open" === t
          ? (n = "0")
          : ("bottom" === o && (n = i),
            "top" === o && (n = -i),
            ("left-top" !== o && "right-top" !== o) || (n = -i - 24),
            ("left-bottom" !== o && "right-bottom" !== o) || (n = i + 24)),
        this.$element.transform("translate(" + e + "," + n + "px");
    }),
    (Oe.prototype.open = function () {
      var e = this;
      "opening" !== this.state &&
        "opened" !== this.state &&
        (_e
          ? re(Te, function () {
              return e.open();
            })
          : (((_e = this).state = "opening"),
            this.options.onOpen(this),
            this.setPosition("open"),
            this.$element.transitionEnd(function () {
              "opening" === e.state &&
                ((e.state = "opened"),
                e.options.onOpened(e),
                e.options.buttonText &&
                  e.$element
                    .find(".mdui-snackbar-action")
                    .on("click", function () {
                      e.options.onButtonClick(e),
                        e.options.closeOnButtonClick && e.close();
                    }),
                e.$element.on("click", function (t) {
                  L(t.target).hasClass("mdui-snackbar-action") ||
                    e.options.onClick(e);
                }),
                e.options.closeOnOutsideClick &&
                  gt.on(jt, e.closeOnOutsideClick),
                e.options.timeout &&
                  (e.timeoutId = setTimeout(function () {
                    return e.close();
                  }, e.options.timeout)));
            })));
    }),
    (Oe.prototype.close = function () {
      var t = this;
      "closing" !== this.state &&
        "closed" !== this.state &&
        (this.timeoutId && clearTimeout(this.timeoutId),
        this.options.closeOnOutsideClick &&
          gt.off(jt, this.closeOnOutsideClick),
        (this.state = "closing"),
        this.options.onClose(this),
        this.setPosition("close"),
        this.$element.transitionEnd(function () {
          "closing" === t.state &&
            ((_e = null),
            (t.state = "closed"),
            t.options.onClosed(t),
            t.$element.remove(),
            ae(Te));
        }));
    }),
    (B.snackbar = function (t, e) {
      void 0 === e && (e = {}), E(t) ? (e.message = t) : (e = t);
      var n = new Oe(e);
      return n.open(), n;
    }),
    L(function () {
      gt.on("click", ".mdui-bottom-nav>a", function () {
        var i = L(this),
          o = i.parent();
        o.children("a").each(function (t, e) {
          var n = i.is(e);
          n && vt("change", "bottomNav", o[0], void 0, { index: t }),
            n
              ? L(e).addClass("mdui-bottom-nav-active")
              : L(e).removeClass("mdui-bottom-nav-active");
        });
      }),
        B.mutation(".mdui-bottom-nav-scroll-hide", function () {
          new B.Headroom(this, {
            pinnedClass: "mdui-headroom-pinned-down",
            unpinnedClass: "mdui-headroom-unpinned-down",
          });
        });
    }),
    L(function () {
      B.mutation(".mdui-spinner", function () {
        Se(this);
      });
    });
  function je(t, e, n) {
    var i = this;
    if (
      (void 0 === n && (n = {}),
      (this.options = X({}, Me)),
      (this.state = "closed"),
      (this.$anchor = L(t).first()),
      (this.$element = L(e).first()),
      !this.$anchor.parent().is(this.$element.parent()))
    )
      throw new Error("anchorSelector and menuSelector must be siblings");
    X(this.options, n),
      (this.isCascade = this.$element.hasClass("mdui-menu-cascade")),
      (this.isCovered =
        "auto" === this.options.covered
          ? !this.isCascade
          : this.options.covered),
      this.$anchor.on("click", function () {
        return i.toggle();
      }),
      gt.on("click touchstart", function (t) {
        var e = L(t.target);
        !i.isOpen() ||
          e.is(i.$element) ||
          P(i.$element[0], e[0]) ||
          e.is(i.$anchor) ||
          P(i.$anchor[0], e[0]) ||
          i.close();
      });
    var o = this;
    gt.on("click", ".mdui-menu-item", function () {
      var t = L(this);
      t.find(".mdui-menu").length || void 0 !== t.attr("disabled") || o.close();
    }),
      this.bindSubMenuEvent(),
      yt.on(
        "resize",
        L.throttle(function () {
          return i.readjust();
        }, 100)
      );
  }
  var Me = {
    position: "auto",
    align: "auto",
    gutter: 16,
    fixed: !(B.updateSpinners = function (t) {
      (O(t) ? L(".mdui-spinner") : L(t)).each(function () {
        Se(this);
      });
    }),
    covered: "auto",
    subMenuTrigger: "hover",
    subMenuDelay: 200,
  };
  (je.prototype.isOpen = function () {
    return "opening" === this.state || "opened" === this.state;
  }),
    (je.prototype.triggerEvent = function (t) {
      vt(t, "menu", this.$element, this);
    }),
    (je.prototype.readjust = function () {
      var t,
        e,
        n,
        i,
        o,
        s,
        r = yt.height(),
        a = yt.width(),
        u = this.options.gutter,
        c = this.isCovered,
        l = this.options.fixed,
        d = this.$element.width(),
        h = this.$element.height(),
        f = this.$anchor[0].getBoundingClientRect(),
        p = f.top,
        m = f.left,
        v = f.height,
        g = f.width,
        y = r - p - v,
        b = a - m - g,
        x = this.$anchor[0].offsetTop,
        C = this.$anchor[0].offsetLeft;
      if (
        ((n =
          "auto" === this.options.position
            ? h + u < y + (c ? v : 0)
              ? "bottom"
              : h + u < p + (c ? v : 0)
              ? "top"
              : "center"
            : this.options.position),
        (i =
          "auto" === this.options.align
            ? d + u < b + g
              ? "left"
              : d + u < m + g
              ? "right"
              : "center"
            : this.options.align),
        "bottom" === n)
      )
        (s = "0"), (e = (c ? 0 : v) + (l ? p : x));
      else if ("top" === n)
        (s = "100%"), (e = (c ? v : 0) + (l ? p - h : x - h));
      else {
        s = "50%";
        var w = h;
        this.isCascade ||
          (r < h + 2 * u && ((w = r - 2 * u), this.$element.height(w))),
          (e = (r - w) / 2 + (l ? 0 : x - p));
      }
      if ((this.$element.css("top", e + "px"), "left" === i))
        (o = "0"), (t = l ? m : C);
      else if ("right" === i) (o = "100%"), (t = l ? m + g - d : C + g - d);
      else {
        o = "50%";
        var $ = d;
        a < d + 2 * u && (($ = a - 2 * u), this.$element.width($)),
          (t = (a - $) / 2 + (l ? 0 : C - m));
      }
      this.$element.css("left", t + "px"),
        this.$element.transformOrigin(o + " " + s);
    }),
    (je.prototype.readjustSubmenu = function (t) {
      var e,
        n,
        i,
        o,
        s,
        r,
        a = t.parent(".mdui-menu-item"),
        u = yt.height(),
        c = yt.width(),
        l = t.width(),
        d = t.height(),
        h = a[0].getBoundingClientRect(),
        f = h.width,
        p = h.height,
        m = h.left,
        v = h.top;
      (o = l < c - m - f ? "left" : l < m ? "right" : "left"),
        "bottom" === (i = d < u - v ? "bottom" : d < v + p ? "top" : "bottom")
          ? (e = r = "0")
          : "top" === i && ((r = "100%"), (e = -d + p)),
        t.css("top", e + "px"),
        "left" === o
          ? ((s = "0"), (n = f))
          : "right" === o && ((s = "100%"), (n = -l)),
        t.css("left", n + "px"),
        t.transformOrigin(s + " " + r);
    }),
    (je.prototype.openSubMenu = function (t) {
      this.readjustSubmenu(t),
        t
          .addClass("mdui-menu-open")
          .parent(".mdui-menu-item")
          .addClass("mdui-menu-item-active");
    }),
    (je.prototype.closeSubMenu = function (t) {
      t
        .removeClass("mdui-menu-open")
        .addClass("mdui-menu-closing")
        .transitionEnd(function () {
          return t.removeClass("mdui-menu-closing");
        })
        .parent(".mdui-menu-item")
        .removeClass("mdui-menu-item-active"),
        t.find(".mdui-menu").each(function (t, e) {
          var n = L(e);
          n.removeClass("mdui-menu-open")
            .addClass("mdui-menu-closing")
            .transitionEnd(function () {
              return n.removeClass("mdui-menu-closing");
            })
            .parent(".mdui-menu-item")
            .removeClass("mdui-menu-item-active");
        });
    }),
    (je.prototype.toggleSubMenu = function (t) {
      t.hasClass("mdui-menu-open") ? this.closeSubMenu(t) : this.openSubMenu(t);
    }),
    (je.prototype.bindSubMenuEvent = function () {
      var a = this;
      if (
        (this.$element.on("click", ".mdui-menu-item", function (t) {
          var e = L(this),
            n = L(t.target);
          if (
            void 0 === e.attr("disabled") &&
            !n.is(".mdui-menu") &&
            !n.is(".mdui-divider") &&
            n.parents(".mdui-menu-item").first().is(e)
          ) {
            var i = e.children(".mdui-menu");
            e
              .parent(".mdui-menu")
              .children(".mdui-menu-item")
              .each(function (t, e) {
                var n = L(e).children(".mdui-menu");
                !n.length || (i.length && n.is(i)) || a.closeSubMenu(n);
              }),
              i.length && a.toggleSubMenu(i);
          }
        }),
        "hover" === this.options.subMenuTrigger)
      ) {
        var u = null,
          c = null;
        this.$element.on("mouseover mouseout", ".mdui-menu-item", function (t) {
          var e = L(this),
            n = t.type,
            i = L(t.relatedTarget);
          if (void 0 === e.attr("disabled")) {
            if ("mouseover" === n) {
              if (!e.is(i) && P(e[0], i[0])) return;
            } else if ("mouseout" === n && (e.is(i) || P(e[0], i[0]))) return;
            var o = e.children(".mdui-menu");
            if ("mouseover" === n) {
              if (o.length) {
                var s = o.data("timeoutClose.mdui.menu");
                if ((s && clearTimeout(s), o.hasClass("mdui-menu-open")))
                  return;
                clearTimeout(c),
                  (u = c =
                    setTimeout(function () {
                      return a.openSubMenu(o);
                    }, a.options.subMenuDelay)),
                  o.data("timeoutOpen.mdui.menu", u);
              }
            } else if ("mouseout" === n && o.length) {
              var r = o.data("timeoutOpen.mdui.menu");
              r && clearTimeout(r),
                (u = setTimeout(function () {
                  return a.closeSubMenu(o);
                }, a.options.subMenuDelay)),
                o.data("timeoutClose.mdui.menu", u);
            }
          }
        });
      }
    }),
    (je.prototype.transitionEnd = function () {
      this.$element.removeClass("mdui-menu-closing"),
        "opening" === this.state &&
          ((this.state = "opened"), this.triggerEvent("opened")),
        "closing" === this.state &&
          ((this.state = "closed"),
          this.triggerEvent("closed"),
          this.$element.css({
            top: "",
            left: "",
            width: "",
            position: "fixed",
          }));
    }),
    (je.prototype.toggle = function () {
      this.isOpen() ? this.close() : this.open();
    }),
    (je.prototype.open = function () {
      var t = this;
      this.isOpen() ||
        ((this.state = "opening"),
        this.triggerEvent("open"),
        this.readjust(),
        this.$element
          .css("position", this.options.fixed ? "fixed" : "absolute")
          .addClass("mdui-menu-open")
          .transitionEnd(function () {
            return t.transitionEnd();
          }));
    }),
    (je.prototype.close = function () {
      var n = this;
      this.isOpen() &&
        ((this.state = "closing"),
        this.triggerEvent("close"),
        this.$element.find(".mdui-menu").each(function (t, e) {
          n.closeSubMenu(L(e));
        }),
        this.$element
          .removeClass("mdui-menu-open")
          .addClass("mdui-menu-closing")
          .transitionEnd(function () {
            return n.transitionEnd();
          }));
    }),
    (B.Menu = je);
  var Ae = "mdui-menu",
    De = "_mdui_menu";
  return (
    L(function () {
      gt.on("click", "[" + Ae + "]", function () {
        var t = L(this),
          e = t.data(De);
        if (!e) {
          var n = Ct(this, Ae),
            i = n.target;
          delete n.target, (e = new B.Menu(t, i, n)), t.data(De, e), e.toggle();
        }
      });
    }),
    B
  );
});
