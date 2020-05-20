!(function (e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = (t[r] = {i: r, l: !1, exports: {}});
        return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = e),
        (n.c = t),
        (n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r});
        }),
        (n.r = function (e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
                Object.defineProperty(e, '__esModule', {value: !0});
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (
                (n.r(r), Object.defineProperty(r, 'default', {enumerable: !0, value: e}), 2 & t && 'string' != typeof e)
            )
                for (var o in e)
                    n.d(
                        r,
                        o,
                        function (t) {
                            return e[t];
                        }.bind(null, o)
                    );
            return r;
        }),
        (n.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return n.d(t, 'a', t), t;
        }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ''),
        n((n.s = 0));
})([
    function (e, t) {
        var n = document.getElementById('form'),
            r = document.getElementById('keyword'),
            o = document.querySelector('#keyword-template'),
            u = document.getElementById('keywords');
        (r.onkeypress = function (e) {
            return d(e);
        }),
            (n.onsubmit = d);
        var c = [];
        (c.__proto__.add = function (e) {
            c.push(e), l(e);
        }),
            (c.__proto__.del = function (e) {
                var t = c.indexOf(e);
                -1 !== t &&
                    (c.splice(t, 1),
                    Array.from(document.querySelectorAll('.keyword'))
                        .slice(t)
                        .forEach(function (e) {
                            return e.remove();
                        }),
                    c.slice(t).forEach(function (e) {
                        return l(e);
                    }));
            });
        var l = function (e) {
                var t = o.content.cloneNode(!0);
                (t.querySelector('.word').textContent = e),
                    (t.querySelector('.close').onclick = function (t) {
                        return c.del(e);
                    }),
                    u.appendChild(t),
                    (r.value = '');
            },
            d = function (e) {
                13 === e.keyCode && c.add(r.value);
            };
        c.add('example');
    },
]);
