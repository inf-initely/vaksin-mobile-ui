import { r as react } from '../common/index-c5947f9c.js';
import { _ as _extends$d } from '../common/extends-7477639a.js';
import { c as createCommonjsModule, a as commonjsGlobal } from '../common/_commonjsHelpers-4f56b6ba.js';
import { r as reactDom } from '../common/index-d90483df.js';
import { r as reactFastCompare } from '../common/index-f500590d.js';

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

var e = "-ms-";
var r = "-moz-";
var a = "-webkit-";
var c = "comm";
var n = "rule";
var t = "decl";
var i = "@import";
var p = "@keyframes";
var k = Math.abs;
var d = String.fromCharCode;
function m(e2, r2) {
  return (((r2 << 2 ^ z(e2, 0)) << 2 ^ z(e2, 1)) << 2 ^ z(e2, 2)) << 2 ^ z(e2, 3);
}
function g(e2) {
  return e2.trim();
}
function x(e2, r2) {
  return (e2 = r2.exec(e2)) ? e2[0] : e2;
}
function y(e2, r2, a2) {
  return e2.replace(r2, a2);
}
function j(e2, r2) {
  return e2.indexOf(r2);
}
function z(e2, r2) {
  return e2.charCodeAt(r2) | 0;
}
function C(e2, r2, a2) {
  return e2.slice(r2, a2);
}
function A(e2) {
  return e2.length;
}
function M(e2) {
  return e2.length;
}
function O(e2, r2) {
  return r2.push(e2), e2;
}
function S(e2, r2) {
  return e2.map(r2).join("");
}
var q = 1;
var B = 1;
var D = 0;
var E = 0;
var F = 0;
var G = "";
function H(e2, r2, a2, c2, n2, t2, s2) {
  return {value: e2, root: r2, parent: a2, type: c2, props: n2, children: t2, line: q, column: B, length: s2, return: ""};
}
function I(e2, r2, a2) {
  return H(e2, r2.root, r2.parent, a2, r2.props, r2.children, 0);
}
function J() {
  return F;
}
function K() {
  F = E > 0 ? z(G, --E) : 0;
  if (B--, F === 10)
    B = 1, q--;
  return F;
}
function L() {
  F = E < D ? z(G, E++) : 0;
  if (B++, F === 10)
    B = 1, q++;
  return F;
}
function N() {
  return z(G, E);
}
function P() {
  return E;
}
function Q(e2, r2) {
  return C(G, e2, r2);
}
function R(e2) {
  switch (e2) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function T(e2) {
  return q = B = 1, D = A(G = e2), E = 0, [];
}
function U(e2) {
  return G = "", e2;
}
function V(e2) {
  return g(Q(E - 1, _(e2 === 91 ? e2 + 2 : e2 === 40 ? e2 + 1 : e2)));
}
function X(e2) {
  while (F = N())
    if (F < 33)
      L();
    else
      break;
  return R(e2) > 2 || R(F) > 3 ? "" : " ";
}
function Z(e2, r2) {
  while (--r2 && L())
    if (F < 48 || F > 102 || F > 57 && F < 65 || F > 70 && F < 97)
      break;
  return Q(e2, P() + (r2 < 6 && N() == 32 && L() == 32));
}
function _(e2) {
  while (L())
    switch (F) {
      case e2:
        return E;
      case 34:
      case 39:
        return _(e2 === 34 || e2 === 39 ? e2 : F);
      case 40:
        if (e2 === 41)
          _(e2);
        break;
      case 92:
        L();
        break;
    }
  return E;
}
function ee(e2, r2) {
  while (L())
    if (e2 + F === 47 + 10)
      break;
    else if (e2 + F === 42 + 42 && N() === 47)
      break;
  return "/*" + Q(r2, E - 1) + "*" + d(e2 === 47 ? e2 : L());
}
function re(e2) {
  while (!R(N()))
    L();
  return Q(e2, E);
}
function ae(e2) {
  return U(ce("", null, null, null, [""], e2 = T(e2), 0, [0], e2));
}
function ce(e2, r2, a2, c2, n2, t2, s2, u2, i2) {
  var f2 = 0;
  var o2 = 0;
  var l2 = s2;
  var v2 = 0;
  var h2 = 0;
  var p2 = 0;
  var b2 = 1;
  var w2 = 1;
  var $2 = 1;
  var k2 = 0;
  var m2 = "";
  var g2 = n2;
  var x2 = t2;
  var j2 = c2;
  var z2 = m2;
  while (w2)
    switch (p2 = k2, k2 = L()) {
      case 34:
      case 39:
      case 91:
      case 40:
        z2 += V(k2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        z2 += X(p2);
        break;
      case 92:
        z2 += Z(P() - 1, 7);
        continue;
      case 47:
        switch (N()) {
          case 42:
          case 47:
            O(te(ee(L(), P()), r2, a2), i2);
            break;
          default:
            z2 += "/";
        }
        break;
      case 123 * b2:
        u2[f2++] = A(z2) * $2;
      case 125 * b2:
      case 59:
      case 0:
        switch (k2) {
          case 0:
          case 125:
            w2 = 0;
          case 59 + o2:
            if (h2 > 0 && A(z2) - l2)
              O(h2 > 32 ? se(z2 + ";", c2, a2, l2 - 1) : se(y(z2, " ", "") + ";", c2, a2, l2 - 2), i2);
            break;
          case 59:
            z2 += ";";
          default:
            O(j2 = ne(z2, r2, a2, f2, o2, n2, u2, m2, g2 = [], x2 = [], l2), t2);
            if (k2 === 123)
              if (o2 === 0)
                ce(z2, r2, j2, j2, g2, t2, l2, u2, x2);
              else
                switch (v2) {
                  case 100:
                  case 109:
                  case 115:
                    ce(e2, j2, j2, c2 && O(ne(e2, j2, j2, 0, 0, n2, u2, m2, n2, g2 = [], l2), x2), n2, x2, l2, u2, c2 ? g2 : x2);
                    break;
                  default:
                    ce(z2, j2, j2, j2, [""], x2, l2, u2, x2);
                }
        }
        f2 = o2 = h2 = 0, b2 = $2 = 1, m2 = z2 = "", l2 = s2;
        break;
      case 58:
        l2 = 1 + A(z2), h2 = p2;
      default:
        if (b2 < 1) {
          if (k2 == 123)
            --b2;
          else if (k2 == 125 && b2++ == 0 && K() == 125)
            continue;
        }
        switch (z2 += d(k2), k2 * b2) {
          case 38:
            $2 = o2 > 0 ? 1 : (z2 += "\f", -1);
            break;
          case 44:
            u2[f2++] = (A(z2) - 1) * $2, $2 = 1;
            break;
          case 64:
            if (N() === 45)
              z2 += V(L());
            v2 = N(), o2 = A(m2 = z2 += re(P())), k2++;
            break;
          case 45:
            if (p2 === 45 && A(z2) == 2)
              b2 = 0;
        }
    }
  return t2;
}
function ne(e2, r2, a2, c2, t2, s2, u2, i2, f2, o2, l2) {
  var v2 = t2 - 1;
  var h2 = t2 === 0 ? s2 : [""];
  var p2 = M(h2);
  for (var b2 = 0, w2 = 0, $2 = 0; b2 < c2; ++b2)
    for (var d2 = 0, m2 = C(e2, v2 + 1, v2 = k(w2 = u2[b2])), x2 = e2; d2 < p2; ++d2)
      if (x2 = g(w2 > 0 ? h2[d2] + " " + m2 : y(m2, /&\f/g, h2[d2])))
        f2[$2++] = x2;
  return H(e2, r2, a2, t2 === 0 ? n : i2, f2, o2, l2);
}
function te(e2, r2, a2) {
  return H(e2, r2, a2, c, d(J()), C(e2, 2, -2), 0);
}
function se(e2, r2, a2, c2) {
  return H(e2, r2, a2, t, C(e2, 0, c2), C(e2, c2 + 1, -1), c2);
}
function ue(c2, n2) {
  switch (m(c2, n2)) {
    case 5103:
      return a + "print-" + c2 + c2;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a + c2 + c2;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a + c2 + r + c2 + e + c2 + c2;
    case 6828:
    case 4268:
      return a + c2 + e + c2 + c2;
    case 6165:
      return a + c2 + e + "flex-" + c2 + c2;
    case 5187:
      return a + c2 + y(c2, /(\w+).+(:[^]+)/, a + "box-$1$2" + e + "flex-$1$2") + c2;
    case 5443:
      return a + c2 + e + "flex-item-" + y(c2, /flex-|-self/, "") + c2;
    case 4675:
      return a + c2 + e + "flex-line-pack" + y(c2, /align-content|flex-|-self/, "") + c2;
    case 5548:
      return a + c2 + e + y(c2, "shrink", "negative") + c2;
    case 5292:
      return a + c2 + e + y(c2, "basis", "preferred-size") + c2;
    case 6060:
      return a + "box-" + y(c2, "-grow", "") + a + c2 + e + y(c2, "grow", "positive") + c2;
    case 4554:
      return a + y(c2, /([^-])(transform)/g, "$1" + a + "$2") + c2;
    case 6187:
      return y(y(y(c2, /(zoom-|grab)/, a + "$1"), /(image-set)/, a + "$1"), c2, "") + c2;
    case 5495:
    case 3959:
      return y(c2, /(image-set\([^]*)/, a + "$1$`$1");
    case 4968:
      return y(y(c2, /(.+:)(flex-)?(.*)/, a + "box-pack:$3" + e + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a + c2 + c2;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return y(c2, /(.+)-inline(.+)/, a + "$1$2") + c2;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (A(c2) - 1 - n2 > 6)
        switch (z(c2, n2 + 1)) {
          case 109:
            if (z(c2, n2 + 4) !== 45)
              break;
          case 102:
            return y(c2, /(.+:)(.+)-([^]+)/, "$1" + a + "$2-$3$1" + r + (z(c2, n2 + 3) == 108 ? "$3" : "$2-$3")) + c2;
          case 115:
            return ~j(c2, "stretch") ? ue(y(c2, "stretch", "fill-available"), n2) + c2 : c2;
        }
      break;
    case 4949:
      if (z(c2, n2 + 1) !== 115)
        break;
    case 6444:
      switch (z(c2, A(c2) - 3 - (~j(c2, "!important") && 10))) {
        case 107:
          return y(c2, ":", ":" + a) + c2;
        case 101:
          return y(c2, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a + (z(c2, 14) === 45 ? "inline-" : "") + "box$3$1" + a + "$2$3$1" + e + "$2box$3") + c2;
      }
      break;
    case 5936:
      switch (z(c2, n2 + 11)) {
        case 114:
          return a + c2 + e + y(c2, /[svh]\w+-[tblr]{2}/, "tb") + c2;
        case 108:
          return a + c2 + e + y(c2, /[svh]\w+-[tblr]{2}/, "tb-rl") + c2;
        case 45:
          return a + c2 + e + y(c2, /[svh]\w+-[tblr]{2}/, "lr") + c2;
      }
      return a + c2 + e + c2 + c2;
  }
  return c2;
}
function ie(e2, r2) {
  var a2 = "";
  var c2 = M(e2);
  for (var n2 = 0; n2 < c2; n2++)
    a2 += r2(e2[n2], n2, e2, r2) || "";
  return a2;
}
function fe(e2, r2, a2, s2) {
  switch (e2.type) {
    case i:
    case t:
      return e2.return = e2.return || e2.value;
    case c:
      return "";
    case n:
      e2.value = e2.props.join(",");
  }
  return A(a2 = ie(e2.children, s2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
}
function oe(e2) {
  var r2 = M(e2);
  return function(a2, c2, n2, t2) {
    var s2 = "";
    for (var u2 = 0; u2 < r2; u2++)
      s2 += e2[u2](a2, c2, n2, t2) || "";
    return s2;
  };
}
function le(e2) {
  return function(r2) {
    if (!r2.root) {
      if (r2 = r2.return)
        e2(r2);
    }
  };
}
function ve(c2, s2, u2, i2) {
  if (!c2.return)
    switch (c2.type) {
      case t:
        c2.return = ue(c2.value, c2.length);
        break;
      case p:
        return ie([I(y(c2.value, "@", "@" + a), c2, "")], i2);
      case n:
        if (c2.length)
          return S(c2.props, function(n2) {
            switch (x(n2, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return ie([I(y(n2, /:(read-\w+)/, ":" + r + "$1"), c2, "")], i2);
              case "::placeholder":
                return ie([I(y(n2, /:(plac\w+)/, ":" + a + "input-$1"), c2, ""), I(y(n2, /:(plac\w+)/, ":" + r + "$1"), c2, ""), I(y(n2, /:(plac\w+)/, e + "input-$1"), c2, "")], i2);
            }
            return "";
          });
    }
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = N(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (R(character)) {
      break;
    }

    L();
  }

  return Q(begin, E);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (R(character)) {
      case 0:
        // &\f
        if (character === 38 && N() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(E - 1, points, index);
        break;

      case 2:
        parsed[index] += V(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = N() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += d(character);
    }
  } while (character = L());

  return parsed;
};

var getRules = function getRules(value, points) {
  return U(toRules(T(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

var defaultStylisPlugins = [ve];

var createCache = function createCache(options) {
  var key = options.key;

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  {
    var currentSheet;
    var finalizingPlugins = [fe,  le(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = oe(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return ie(ae(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c$1=b?Symbol.for("react.element"):60103,d$1=b?Symbol.for("react.portal"):60106,e$1=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g$1=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k$1=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m$1=b?Symbol.for("react.concurrent_mode"):60111,n$1=b?Symbol.for("react.forward_ref"):60112,p$1=b?Symbol.for("react.suspense"):60113,q$1=b?
Symbol.for("react.suspense_list"):60120,r$1=b?Symbol.for("react.memo"):60115,t$1=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x$1=b?Symbol.for("react.responder"):60118,y$1=b?Symbol.for("react.scope"):60119;
function z$1(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c$1:switch(a=a.type,a){case l:case m$1:case e$1:case g$1:case f:case p$1:return a;default:switch(a=a&&a.$$typeof,a){case k$1:case n$1:case t$1:case r$1:case h:return a;default:return u}}case d$1:return u}}}function A$1(a){return z$1(a)===m$1}var AsyncMode=l;var ConcurrentMode=m$1;var ContextConsumer=k$1;var ContextProvider=h;var Element=c$1;var ForwardRef=n$1;var Fragment=e$1;var Lazy=t$1;var Memo=r$1;var Portal=d$1;
var Profiler=g$1;var StrictMode=f;var Suspense=p$1;var isAsyncMode=function(a){return A$1(a)||z$1(a)===l};var isConcurrentMode=A$1;var isContextConsumer=function(a){return z$1(a)===k$1};var isContextProvider=function(a){return z$1(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c$1};var isForwardRef=function(a){return z$1(a)===n$1};var isFragment=function(a){return z$1(a)===e$1};var isLazy=function(a){return z$1(a)===t$1};
var isMemo=function(a){return z$1(a)===r$1};var isPortal=function(a){return z$1(a)===d$1};var isProfiler=function(a){return z$1(a)===g$1};var isStrictMode=function(a){return z$1(a)===f};var isSuspense=function(a){return z$1(a)===p$1};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e$1||a===m$1||a===g$1||a===f||a===p$1||a===q$1||"object"===typeof a&&null!==a&&(a.$$typeof===t$1||a.$$typeof===r$1||a.$$typeof===h||a.$$typeof===k$1||a.$$typeof===n$1||a.$$typeof===w||a.$$typeof===x$1||a.$$typeof===y$1||a.$$typeof===v)};var typeOf=z$1;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs = createCommonjsModule(function (module) {

{
  module.exports = reactIs_production_min;
}
});

var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {

      styles += strings[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var EmotionCacheContext = /* #__PURE__ */react.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/react.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = react.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */react.createContext({});

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends$d({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = react.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/react.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
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

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, react.useContext(ThemeContext));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = react.useRef();
  react.useLayoutEffect(function () {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  react.useLayoutEffect(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var CSSReset = function CSSReset() {
  return /*#__PURE__*/react.createElement(Global, {
    styles: "\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;\n        -moz-osx-font-smoothing: grayscale;\n        touch-action: manipulation;\n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: 'kern';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type=\"button\"]::-moz-focus-inner,\n      [type=\"reset\"]::-moz-focus-inner,\n      [type=\"submit\"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type=\"checkbox\"],\n      [type=\"radio\"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type=\"number\"]::-webkit-inner-spin-button,\n      [type=\"number\"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n\n      [type=\"search\"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type=\"search\"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role=\"button\"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    "
  });
};
var CSSReset$1 = CSSReset;

var lodash_mergewith = createCommonjsModule(function (module, exports) {
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeMax = Math.max,
    nativeNow = Date.now;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
  return value != null && (type == 'object' || type == 'function');
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
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = mergeWith;
});

function getLastItem(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

// Number assertions
function isNumber(value) {
  return typeof value === "number";
}

function isArray(value) {
  return Array.isArray(value);
}

function isFunction(value) {
  return typeof value === "function";
} // Generic assertions

function isObject(value) {
  var type = typeof value;
  return value != null && (type === "object" || type === "function") && !isArray(value);
}
function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}

function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isCssVar(value) {
  return /^var\(--.+\)$/.test(value);
} // Empty assertions
var __DEV__ = "production" !== "production";

function omit(object, keys) {
  var result = {};
  Object.keys(object).forEach(function (key) {
    if (keys.includes(key)) return;
    result[key] = object[key];
  });
  return result;
}
function pick(object, keys) {
  var result = {};
  keys.forEach(function (key) {
    if (key in object) {
      result[key] = object[key];
    }
  });
  return result;
}
/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */

function get(obj, path, fallback, index) {
  var key = typeof path === "string" ? path.split(".") : [path];

  for (index = 0; index < key.length; index += 1) {
    if (!obj) break;
    obj = obj[key[index]];
  }

  return obj === undefined ? fallback : obj;
}
var memoize$1 = function memoize(fn) {
  var cache = new WeakMap();

  var memoizedFn = function memoizedFn(obj, path, fallback, index) {
    if (typeof obj === "undefined") {
      return fn(obj, path, fallback);
    }

    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    var map = cache.get(obj);

    if (map.has(path)) {
      return map.get(path);
    }

    var value = fn(obj, path, fallback, index);
    map.set(path, value);
    return value;
  };

  return memoizedFn;
};
var memoizedGet = memoize$1(get);

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param fn The filter function
 */
function objectFilter(object, fn) {
  var result = {};
  Object.keys(object).forEach(function (key) {
    var value = object[key];
    var shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined = function filterUndefined(object) {
  return objectFilter(object, function (val) {
    return val !== null && val !== undefined;
  });
};
var objectKeys = function objectKeys(obj) {
  return Object.keys(obj);
};
/**
 * Object.entries polyfill for Nodev10 compatibility
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (carry, _ref) {
    var key = _ref[0],
        value = _ref[1];
    carry[key] = value;
    return carry;
  }, {});
};

function analyzeCSSValue(value) {
  var num = parseFloat(value.toString());
  var unit = value.toString().replace(String(num), "");
  return {
    unitless: !unit,
    value: num,
    unit: unit
  };
}

function px(value) {
  if (value == null) return value;

  var _analyzeCSSValue = analyzeCSSValue(value),
      unitless = _analyzeCSSValue.unitless;

  return unitless || isNumber(value) ? value + "px" : value;
}

var sortByBreakpointValue = function sortByBreakpointValue(a, b) {
  return parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1;
};

var sortBps = function sortBps(breakpoints) {
  return fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue));
};

function normalize(breakpoints) {
  var sorted = sortBps(breakpoints);
  return Object.assign(Object.values(sorted), sorted);
}

function keys(breakpoints) {
  var value = Object.keys(sortBps(breakpoints));
  return new Set(value);
}

function subtract(value) {
  var _px;

  if (!value) return value;
  value = (_px = px(value)) != null ? _px : value;
  var factor = value.endsWith("px") ? -1 : // the equivalent of 1px in em using a 16px base
  -0.0635;
  return isNumber(value) ? "" + (value + factor) : value.replace(/([0-9]+\.?[0-9]*)/, function (m) {
    return "" + (parseFloat(m) + factor);
  });
}

function queryString(min, max) {
  var query = [];
  if (min) query.push("@media screen and (min-width: " + px(min) + ")");
  if (query.length > 0 && max) query.push("and");
  if (max) query.push("@media screen and (max-width: " + px(max) + ")");
  return query.join(" ");
}

function analyzeBreakpoints(breakpoints) {
  var _breakpoints$base;

  if (!breakpoints) return null;
  breakpoints.base = (_breakpoints$base = breakpoints.base) != null ? _breakpoints$base : "0px";
  var normalized = normalize(breakpoints);
  var queries = Object.entries(breakpoints).sort(sortByBreakpointValue).map(function (_ref, index, entry) {
    var _entry;

    var breakpoint = _ref[0],
        minW = _ref[1];

    var _ref2 = (_entry = entry[index + 1]) != null ? _entry : [],
        maxW = _ref2[1];

    maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined;
    return {
      breakpoint: breakpoint,
      minW: minW,
      maxW: maxW,
      maxWQuery: queryString(null, maxW),
      minWQuery: queryString(minW),
      minMaxQuery: queryString(minW, maxW)
    };
  });

  var _keys = keys(breakpoints);

  var _keysArr = Array.from(_keys.values());

  return {
    keys: _keys,
    normalized: normalized,
    isResponsive: function isResponsive(test) {
      var keys = Object.keys(test);
      return keys.length > 0 && keys.every(function (key) {
        return _keys.has(key);
      });
    },
    asObject: sortBps(breakpoints),
    asArray: normalize(breakpoints),
    details: queries,
    media: [null].concat(normalized.map(function (minW) {
      return queryString(minW);
    }).slice(1)),
    toArrayValue: function toArrayValue(test) {
      if (!isObject(test)) {
        throw new Error("toArrayValue: value must be an object");
      }

      var result = _keysArr.map(function (bp) {
        var _test$bp;

        return (_test$bp = test[bp]) != null ? _test$bp : null;
      });

      while (getLastItem(result) === null) {
        result.pop();
      }

      return result;
    },
    toObjectValue: function toObjectValue(test) {
      if (!Array.isArray(test)) {
        throw new Error("toObjectValue: value must be an array");
      }

      return test.reduce(function (acc, value, index) {
        var key = _keysArr[index];
        if (key != null && value != null) acc[key] = value;
        return acc;
      }, {});
    }
  };
}
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var isBrowser$1 = canUseDOM();
var dataAttr = function dataAttr(condition) {
  return condition ? "" : undefined;
};
var ariaAttr = function ariaAttr(condition) {
  return condition ? true : undefined;
};
var cx = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};

/* eslint-disable no-nested-ternary */
function runIfFn(valueOrFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction(valueOrFn) ? valueOrFn.apply(void 0, args) : valueOrFn;
}
function callAllHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function func(event) {
    fns.some(function (fn) {
      fn == null ? void 0 : fn(event);
      return event == null ? void 0 : event.defaultPrevented;
    });
  };
}
function once(fn) {
  var result;
  return function func() {
    if (fn) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      result = fn.apply(this, args);
      fn = null;
    }

    return result;
  };
}
var noop = function noop() {};
var warn = once(function (options) {
  return function () {
    var condition = options.condition,
        message = options.message;

    if (condition && __DEV__) {
      console.warn(message);
    }
  };
});
var pipe = function pipe() {
  for (var _len6 = arguments.length, fns = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    fns[_key6] = arguments[_key6];
  }

  return function (v) {
    return fns.reduce(function (a, b) {
      return b(a);
    }, v);
  };
};

var breakpoints = Object.freeze(["base", "sm", "md", "lg", "xl", "2xl"]);
function mapResponsive(prop, mapper) {
  if (isArray(prop)) {
    return prop.map(function (item) {
      if (item === null) {
        return null;
      }

      return mapper(item);
    });
  }

  if (isObject(prop)) {
    return objectKeys(prop).reduce(function (result, key) {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop != null) {
    return mapper(prop);
  }

  return null;
}

function walkObject(target, predicate) {
  function inner(value, path) {
    if (path === void 0) {
      path = [];
    }

    if (isArray(value)) {
      return value.map(function (item, index) {
        return inner(item, [].concat(path, [String(index)]));
      });
    }

    if (isObject(value)) {
      return fromEntries(Object.entries(value).map(function (_ref) {
        var key = _ref[0],
            child = _ref[1];
        return [key, inner(child, [].concat(path, [key]))];
      }));
    }

    return predicate(value, path);
  }

  return inner(target);
}

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
function createContext(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? true : _options$strict,
      _options$errorMessage = _options.errorMessage,
      errorMessage = _options$errorMessage === void 0 ? "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider" : _options$errorMessage,
      name = _options.name;
  var Context = /*#__PURE__*/react.createContext(undefined);
  Context.displayName = name;

  function useContext() {
    var context = react.useContext(Context);

    if (!context && strict) {
      var error = new Error(errorMessage);
      error.name = "ContextError";
      Error.captureStackTrace == null ? void 0 : Error.captureStackTrace(error, useContext);
      throw error;
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */

function getValidChildren(children) {
  return react.Children.toArray(children).filter(function (child) {
    return /*#__PURE__*/react.isValidElement(child);
  });
}

/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
 * (for SSR reasons)
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */

var useSafeLayoutEffect = isBrowser$1 ? react.useLayoutEffect : react.useEffect;

// This implementation is heavily inspired by react-aria's implementation
var defaultIdContext = {
  prefix: Math.round(Math.random() * 10000000000),
  current: 0
};
var IdContext = /*#__PURE__*/react.createContext(defaultIdContext);
var IdProvider = /*#__PURE__*/react.memo(function (_ref) {
  var children = _ref.children;
  var currentContext = react.useContext(IdContext);
  var isRoot = currentContext === defaultIdContext;
  var context = react.useMemo(function () {
    return {
      prefix: isRoot ? 0 : ++currentContext.prefix,
      current: 0
    };
  }, [isRoot, currentContext]);
  return /*#__PURE__*/react.createElement(IdContext.Provider, {
    value: context
  }, children);
});

function useUnmountEffect(fn, deps) {
  if (deps === void 0) {
    deps = [];
  }

  return react.useEffect(function () {
    return function () {
      return fn();
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  deps);
}

function useForceUpdate() {
  var unloadingRef = react.useRef(false);

  var _React$useState = react.useState(0),
      count = _React$useState[0],
      setCount = _React$useState[1];

  useUnmountEffect(function () {
    unloadingRef.current = true;
  });
  return react.useCallback(function () {
    if (!unloadingRef.current) {
      setCount(count + 1);
    }
  }, [count]);
}

/* eslint-disable react-hooks/exhaustive-deps */
function assignRef(ref, value) {
  if (ref == null) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  try {
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error("Cannot assign value '" + value + "' to ref '" + ref + "'");
  }
}
/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */

function useMergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return react.useMemo(function () {
    if (refs.every(function (ref) {
      return ref == null;
    })) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        if (ref) assignRef(ref, node);
      });
    };
  }, refs);
}

var _createContext$1 = createContext({
  strict: false,
  name: "PortalManagerContext"
}),
    PortalManagerContextProvider = _createContext$1[0],
    usePortalManager = _createContext$1[1];
function PortalManager(props) {
  var children = props.children,
      zIndex = props.zIndex;
  return /*#__PURE__*/react.createElement(PortalManagerContextProvider, {
    value: {
      zIndex: zIndex
    }
  }, children);
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

var _excluded = ["containerRef"];

var _createContext = createContext({
  strict: false,
  name: "PortalContext"
}),
    PortalContextProvider = _createContext[0],
    usePortalContext = _createContext[1];

var PORTAL_CLASSNAME = "chakra-portal";
var PORTAL_SELECTOR = ".chakra-portal";

var Container = function Container(props) {
  return /*#__PURE__*/react.createElement("div", {
    className: "chakra-portal-zIndex",
    style: {
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0 // NB: Don't add `bottom: 0`, it makes the entire app unusable
      // @see https://github.com/chakra-ui/chakra-ui/issues/3201

    }
  }, props.children);
};
/**
 * Portal that uses `document.body` as container
 */


var DefaultPortal = function DefaultPortal(props) {
  var appendToParentPortal = props.appendToParentPortal,
      children = props.children;
  var tempNode = react.useRef(null);
  var portal = react.useRef(null);
  var forceUpdate = useForceUpdate();
  var parentPortal = usePortalContext();
  var manager = usePortalManager();
  useSafeLayoutEffect(function () {
    if (!tempNode.current) return;
    var doc = tempNode.current.ownerDocument;
    var host = appendToParentPortal ? parentPortal != null ? parentPortal : doc.body : doc.body;
    if (!host) return;
    portal.current = doc.createElement("div");
    portal.current.className = PORTAL_CLASSNAME;
    host.appendChild(portal.current);
    forceUpdate();
    var portalNode = portal.current;
    return function () {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, []);

  var _children = manager != null && manager.zIndex ? /*#__PURE__*/react.createElement(Container, {
    zIndex: manager == null ? void 0 : manager.zIndex
  }, children) : children;

  return portal.current ? /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/react.createElement(PortalContextProvider, {
    value: portal.current
  }, _children), portal.current) : /*#__PURE__*/react.createElement("span", {
    ref: tempNode
  });
};

/**
 * Portal that uses a custom container
 */
var ContainerPortal = function ContainerPortal(props) {
  var children = props.children,
      containerRef = props.containerRef,
      appendToParentPortal = props.appendToParentPortal;
  var containerEl = containerRef.current;
  var host = containerEl != null ? containerEl : isBrowser$1 ? document.body : undefined;
  var portal = react.useMemo(function () {
    var node = containerEl == null ? void 0 : containerEl.ownerDocument.createElement("div");
    if (node) node.className = PORTAL_CLASSNAME;
    return node;
  }, [containerEl]);
  var forceUpdate = useForceUpdate();
  useSafeLayoutEffect(function () {
    forceUpdate();
  }, []);
  useSafeLayoutEffect(function () {
    if (!portal || !host) return;
    host.appendChild(portal);
    return function () {
      host.removeChild(portal);
    };
  }, [portal, host]);

  if (host && portal) {
    return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/react.createElement(PortalContextProvider, {
      value: appendToParentPortal ? portal : null
    }, children), portal);
  }

  return null;
};

/**
 * Portal
 *
 * Declarative component used to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * @see Docs https://chakra-ui.com/portal
 */
function Portal$1(props) {
  var containerRef = props.containerRef,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  return containerRef ? /*#__PURE__*/react.createElement(ContainerPortal, _extends({
    containerRef: containerRef
  }, rest)) : /*#__PURE__*/react.createElement(DefaultPortal, rest);
}
Portal$1.defaultProps = {
  appendToParentPortal: true
};
Portal$1.className = PORTAL_CLASSNAME;
Portal$1.selector = PORTAL_SELECTOR;

var doc = {
  body: {
    classList: {
      add: function add() {},
      remove: function remove() {}
    }
  },
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  activeElement: {
    blur: function blur() {},
    nodeName: ""
  },
  querySelector: function querySelector() {
    return null;
  },
  querySelectorAll: function querySelectorAll() {
    return [];
  },
  getElementById: function getElementById() {
    return null;
  },
  createEvent: function createEvent() {
    return {
      initEvent: function initEvent() {}
    };
  },
  createElement: function createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute: function setAttribute() {},
      getElementsByTagName: function getElementsByTagName() {
        return [];
      }
    };
  }
};
var ssrDocument = doc;

var noop$1 = function noop() {};

var win = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener: noop$1,
  removeEventListener: noop$1,
  getComputedStyle: function getComputedStyle() {
    return {
      getPropertyValue: function getPropertyValue() {
        return "";
      }
    };
  },
  matchMedia: function matchMedia() {
    return {
      matches: false,
      addListener: noop$1,
      removeListener: noop$1
    };
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }

    return setTimeout(callback, 0);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") return;
    clearTimeout(id);
  },
  setTimeout: function setTimeout() {
    return 0;
  },
  clearTimeout: noop$1,
  setInterval: function setInterval() {
    return 0;
  },
  clearInterval: noop$1
};
var ssrWindow = win;

var mockEnv = {
  window: ssrWindow,
  document: ssrDocument
};
var defaultEnv = isBrowser$1 ? {
  window: window,
  document: document
} : mockEnv;
var EnvironmentContext = /*#__PURE__*/react.createContext(defaultEnv);

function useEnvironment() {
  return react.useContext(EnvironmentContext);
}
function EnvironmentProvider(props) {
  var children = props.children,
      environmentProp = props.environment;

  var _useState = react.useState(null),
      node = _useState[0],
      setNode = _useState[1];

  var context = react.useMemo(function () {
    var _ref;

    var doc = node == null ? void 0 : node.ownerDocument;
    var win = node == null ? void 0 : node.ownerDocument.defaultView;
    var nodeEnv = doc ? {
      document: doc,
      window: win
    } : undefined;
    var env = (_ref = environmentProp != null ? environmentProp : nodeEnv) != null ? _ref : defaultEnv;
    return env;
  }, [node, environmentProp]);
  var showEnvGetter = !node && !environmentProp;
  return /*#__PURE__*/react.createElement(EnvironmentContext.Provider, {
    value: context
  }, children, showEnvGetter && /*#__PURE__*/react.createElement("span", {
    ref: function ref(el) {
      if (el) setNode(el);
    }
  }));
}

var classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark"
};

/**
 * SSR: Graceful fallback for the `body` element
 */
var mockBody = {
  classList: {
    add: noop,
    remove: noop
  }
};

var getBody = function getBody(document) {
  return isBrowser$1 ? document.body : mockBody;
};
/**
 * Function to add/remove class from `body` based on color mode
 */


function syncBodyClassName(isDark, document) {
  var body = getBody(document);
  body.classList.add(isDark ? classNames.dark : classNames.light);
  body.classList.remove(isDark ? classNames.light : classNames.dark);
}
/**
 * Check if JS media query matches the query string passed
 */

function getMediaQuery(query) {
  var mediaQueryList = window.matchMedia == null ? void 0 : window.matchMedia(query);

  if (!mediaQueryList) {
    return undefined;
  }

  return !!mediaQueryList.media === mediaQueryList.matches;
}

var queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)"
};

function getColorScheme(fallback) {
  var _getMediaQuery;

  var isDark = (_getMediaQuery = getMediaQuery(queries.dark)) != null ? _getMediaQuery : fallback === "dark";
  return isDark ? "dark" : "light";
}
/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */

function addListener(fn) {
  if (!("matchMedia" in window)) {
    return noop;
  }

  var mediaQueryList = window.matchMedia(queries.dark);

  var listener = function listener() {
    fn(mediaQueryList.matches ? "dark" : "light", true);
  };

  mediaQueryList.addEventListener("change", listener);
  return function () {
    mediaQueryList.removeEventListener("change", listener);
  };
}
var root = {
  get: function get() {
    return document.documentElement.style.getPropertyValue("--chakra-ui-color-mode");
  },
  set: function set(mode) {
    if (isBrowser$1) {
      document.documentElement.style.setProperty("--chakra-ui-color-mode", mode);
    }
  }
};

var hasSupport = function hasSupport() {
  return typeof Storage !== "undefined";
};

var storageKey = "chakra-ui-color-mode";

/**
 * Simple object to handle read-write to localStorage
 */
var localStorageManager = {
  get: function get(init) {
    if (!hasSupport()) return init;

    try {
      var _value = localStorage.getItem(storageKey);

      return _value != null ? _value : init;
    } catch (error) {

      return init;
    }
  },
  set: function set(value) {
    if (!hasSupport()) return;

    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
    }
  },
  type: "localStorage"
};

var ColorModeContext = /*#__PURE__*/react.createContext({});
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode = function useColorMode() {
  var context = react.useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
function ColorModeProvider(props) {
  var value = props.value,
      children = props.children,
      _props$options = props.options,
      useSystemColorMode = _props$options.useSystemColorMode,
      initialColorMode = _props$options.initialColorMode,
      _props$colorModeManag = props.colorModeManager,
      colorModeManager = _props$colorModeManag === void 0 ? localStorageManager : _props$colorModeManag;
  var defaultColorMode = initialColorMode === "dark" ? "dark" : "light";
  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */

  var _React$useState = react.useState(colorModeManager.type === "cookie" ? colorModeManager.get(defaultColorMode) : defaultColorMode),
      colorMode = _React$useState[0],
      rawSetColorMode = _React$useState[1];

  var _useEnvironment = useEnvironment(),
      document = _useEnvironment.document;

  react.useEffect(function () {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - if `useSystemColorMode` is true system-color will be used as default - initial
     * colormode is the fallback if system color mode isn't resolved
     *
     * - if `--chakra-ui-color-mode` is defined through e.g. `ColorModeScript` this
     * will be used
     *
     * - if `colorModeManager` = `localStorage` and a value is defined for
     * `chakra-ui-color-mode` this will be used
     *
     * - if `initialColorMode` = `system` system-color will be used as default -
     * initial colormode is the fallback if system color mode isn't resolved
     *
     * - if `initialColorMode` = `'light'|'dark'` the corresponding value will be used
     */
    if (isBrowser$1 && colorModeManager.type === "localStorage") {
      var systemColorWithFallback = getColorScheme(defaultColorMode);

      if (useSystemColorMode) {
        return rawSetColorMode(systemColorWithFallback);
      }

      var rootGet = root.get();
      var colorManagerGet = colorModeManager.get();

      if (rootGet) {
        return rawSetColorMode(rootGet);
      }

      if (colorManagerGet) {
        return rawSetColorMode(colorManagerGet);
      }

      if (initialColorMode === "system") {
        return rawSetColorMode(systemColorWithFallback);
      }

      return rawSetColorMode(defaultColorMode);
    }
  }, [colorModeManager, useSystemColorMode, defaultColorMode, initialColorMode]);
  react.useEffect(function () {
    var isDark = colorMode === "dark";
    syncBodyClassName(isDark, document);
    root.set(isDark ? "dark" : "light");
  }, [colorMode, document]);
  var setColorMode = react.useCallback(function (value, isListenerEvent) {
    if (isListenerEvent === void 0) {
      isListenerEvent = false;
    }

    if (!isListenerEvent) {
      colorModeManager.set(value);
    } else if (colorModeManager.get() && !useSystemColorMode) return;

    rawSetColorMode(value);
  }, [colorModeManager, useSystemColorMode]);
  var toggleColorMode = react.useCallback(function () {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode, setColorMode]);
  react.useEffect(function () {
    var shouldUseSystemListener = useSystemColorMode || initialColorMode === "system";
    var removeListener;

    if (shouldUseSystemListener) {
      removeListener = addListener(setColorMode);
    }

    return function () {
      if (removeListener && shouldUseSystemListener) {
        removeListener();
      }
    };
  }, [setColorMode, useSystemColorMode, initialColorMode]); // presence of `value` indicates a controlled context

  var context = react.useMemo(function () {
    return {
      colorMode: value != null ? value : colorMode,
      toggleColorMode: value ? noop : toggleColorMode,
      setColorMode: value ? noop : setColorMode
    };
  }, [colorMode, setColorMode, toggleColorMode, value]);
  return /*#__PURE__*/react.createElement(ColorModeContext.Provider, {
    value: context
  }, children);
}

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
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

  return _extends$1.apply(this, arguments);
}

var tokenToCSSVar = function tokenToCSSVar(scale, value) {
  return function (theme) {
    var valueStr = String(value);
    var key = scale ? scale + "." + valueStr : valueStr;
    return isObject(theme.__cssMap) && key in theme.__cssMap ? theme.__cssMap[key].varRef : value;
  };
};
function createTransform(options) {
  var scale = options.scale,
      transform = options.transform,
      compose = options.compose;

  var fn = function fn(value, theme) {
    var _transform;

    var _value = tokenToCSSVar(scale, value)(theme);

    var result = (_transform = transform == null ? void 0 : transform(_value, theme)) != null ? _transform : _value;

    if (compose) {
      result = compose(result, theme);
    }

    return result;
  };

  return fn;
}

function toConfig(scale, transform) {
  return function (property) {
    var result = {
      property: property,
      scale: scale
    };
    result.transform = createTransform({
      scale: scale,
      transform: transform
    });
    return result;
  };
}

var getRtl = function getRtl(_ref) {
  var rtl = _ref.rtl,
      ltr = _ref.ltr;
  return function (theme) {
    return theme.direction === "rtl" ? rtl : ltr;
  };
};

function logical(options) {
  var property = options.property,
      scale = options.scale,
      transform = options.transform;
  return {
    scale: scale,
    property: getRtl(property),
    transform: scale ? createTransform({
      scale: scale,
      compose: transform
    }) : transform
  };
}

var _spaceXTemplate, _spaceYTemplate;

/**
 * The CSS transform order following the upcoming spec from CSSWG
 * translate => rotate => scale => skew
 * @see https://drafts.csswg.org/css-transforms-2/#ctm
 * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
 */
var transformTemplate = ["rotate(var(--chakra-rotate, 0))", "scaleX(var(--chakra-scale-x, 1))", "scaleY(var(--chakra-scale-y, 1))", "skewX(var(--chakra-skew-x, 0))", "skewY(var(--chakra-skew-y, 0))"];
function getTransformTemplate() {
  return ["translateX(var(--chakra-translate-x, 0))", "translateY(var(--chakra-translate-y, 0))"].concat(transformTemplate).join(" ");
}
function getTransformGpuTemplate() {
  return ["translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)"].concat(transformTemplate).join(" ");
}
var filterTemplate = {
  "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
  filter: ["var(--chakra-blur)", "var(--chakra-brightness)", "var(--chakra-contrast)", "var(--chakra-grayscale)", "var(--chakra-hue-rotate)", "var(--chakra-invert)", "var(--chakra-saturate)", "var(--chakra-sepia)", "var(--chakra-drop-shadow)"].join(" ")
};
var backdropFilterTemplate = {
  backdropFilter: ["var(--chakra-backdrop-blur)", "var(--chakra-backdrop-brightness)", "var(--chakra-backdrop-contrast)", "var(--chakra-backdrop-grayscale)", "var(--chakra-backdrop-hue-rotate)", "var(--chakra-backdrop-invert)", "var(--chakra-backdrop-opacity)", "var(--chakra-backdrop-saturate)", "var(--chakra-backdrop-sepia)"].join(" "),
  "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)"
};
function getRingTemplate(value) {
  return {
    "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)",
    "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)",
    "--chakra-ring-width": value,
    boxShadow: ["var(--chakra-ring-offset-shadow)", "var(--chakra-ring-shadow)", "var(--chakra-shadow, 0 0 #0000)"].join(", ")
  };
}
var flexDirectionTemplate = {
  "row-reverse": {
    space: "--chakra-space-x-reverse",
    divide: "--chakra-divide-x-reverse"
  },
  "column-reverse": {
    space: "--chakra-space-y-reverse",
    divide: "--chakra-divide-y-reverse"
  }
};
var owlSelector = "& > :not(style) ~ :not(style)";
var spaceXTemplate = (_spaceXTemplate = {}, _spaceXTemplate[owlSelector] = {
  marginInlineStart: "calc(var(--chakra-space-x) * calc(1 - var(--chakra-space-x-reverse)))",
  marginInlineEnd: "calc(var(--chakra-space-x) * var(--chakra-space-x-reverse))"
}, _spaceXTemplate);
var spaceYTemplate = (_spaceYTemplate = {}, _spaceYTemplate[owlSelector] = {
  marginTop: "calc(var(--chakra-space-y) * calc(1 - var(--chakra-space-y-reverse)))",
  marginBottom: "calc(var(--chakra-space-y) * var(--chakra-space-y-reverse))"
}, _spaceYTemplate);

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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

function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, undefined, groups);
  };

  var _super = RegExp.prototype;

  var _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);

    _groups.set(_this, groups || _groups.get(re));

    return _setPrototypeOf(_this, BabelRegExp.prototype);
  }

  _inherits(BabelRegExp, RegExp);

  BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    if (result) result.groups = buildGroups(result, this);
    return result;
  };

  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === "string") {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    } else if (typeof substitution === "function") {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;

        if (typeof args[args.length - 1] !== "object") {
          args = [].slice.call(args);
          args.push(buildGroups(args, _this));
        }

        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      groups[name] = result[g[name]];
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments);
}

var directionMap = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left"
};
var valueSet = new Set(Object.values(directionMap));
var globalSet = new Set(["none", "-moz-initial", "inherit", "initial", "revert", "unset"]);

var trimSpace = function trimSpace(str) {
  return str.trim();
};

function parseGradient(value, theme) {
  var _regex$exec$groups, _regex$exec;

  if (value == null || globalSet.has(value)) return value;

  var regex = /*#__PURE__*/_wrapRegExp(/(^[\x2DA-Za-z]+)\(((.*))\)/g, {
    type: 1,
    values: 2
  });

  var _ref = (_regex$exec$groups = (_regex$exec = regex.exec(value)) == null ? void 0 : _regex$exec.groups) != null ? _regex$exec$groups : {},
      type = _ref.type,
      values = _ref.values;

  if (!type || !values) return value;

  var _type = type.includes("-gradient") ? type : type + "-gradient";

  var _values$split$map$fil = values.split(",").map(trimSpace).filter(Boolean),
      maybeDirection = _values$split$map$fil[0],
      stops = _values$split$map$fil.slice(1);

  if ((stops == null ? void 0 : stops.length) === 0) return value;
  var direction = maybeDirection in directionMap ? directionMap[maybeDirection] : maybeDirection;
  stops.unshift(direction);

  var _values = stops.map(function (stop) {
    // if stop is valid shorthand direction, return it
    if (valueSet.has(stop)) return stop;
    var firstStop = stop.indexOf(" "); // color stop could be `red.200 20%` based on css gradient spec

    var _ref2 = firstStop !== -1 ? [stop.substr(0, firstStop), stop.substr(firstStop + 1)] : [stop],
        _color = _ref2[0],
        _stop = _ref2[1];

    var _stopOrFunc = isCSSFunction(_stop) ? _stop : _stop && _stop.split(" "); // else, get and transform the color token or css value


    var key = "colors." + _color;
    var color = key in theme.__cssMap ? theme.__cssMap[key].varRef : _color;
    return _stopOrFunc ? [color, _stopOrFunc].join(" ") : color;
  });

  return _type + "(" + _values.join(", ") + ")";
}
var isCSSFunction = function isCSSFunction(value) {
  return isString(value) && value.includes("(") && value.includes(")");
};
var gradientTransform = function gradientTransform(value, theme) {
  return parseGradient(value, theme != null ? theme : {});
};

var analyzeCSSValue$1 = function analyzeCSSValue(value) {
  var num = parseFloat(value.toString());
  var unit = value.toString().replace(String(num), "");
  return {
    unitless: !unit,
    value: num,
    unit: unit
  };
};

var wrap = function wrap(str) {
  return function (value) {
    return str + "(" + value + ")";
  };
};

var transformFunctions = {
  filter: function filter(value) {
    return value !== "auto" ? value : filterTemplate;
  },
  backdropFilter: function backdropFilter(value) {
    return value !== "auto" ? value : backdropFilterTemplate;
  },
  ring: function ring(value) {
    return getRingTemplate(transformFunctions.px(value));
  },
  bgClip: function bgClip(value) {
    return value === "text" ? {
      color: "transparent",
      backgroundClip: "text"
    } : {
      backgroundClip: value
    };
  },
  transform: function transform(value) {
    if (value === "auto") return getTransformTemplate();
    if (value === "auto-gpu") return getTransformGpuTemplate();
    return value;
  },
  px: function px(value) {
    if (value == null) return value;

    var _analyzeCSSValue = analyzeCSSValue$1(value),
        unitless = _analyzeCSSValue.unitless;

    return unitless || isNumber(value) ? value + "px" : value;
  },
  fraction: function fraction(value) {
    return !isNumber(value) || value > 1 ? value : value * 100 + "%";
  },
  "float": function float(value, theme) {
    var map = {
      left: "right",
      right: "left"
    };
    return theme.direction === "rtl" ? map[value] : value;
  },
  degree: function degree(value) {
    if (isCssVar(value) || value == null) return value;
    var unitless = isString(value) && !value.endsWith("deg");
    return isNumber(value) || unitless ? value + "deg" : value;
  },
  gradient: gradientTransform,
  blur: wrap("blur"),
  opacity: wrap("opacity"),
  brightness: wrap("brightness"),
  contrast: wrap("contrast"),
  dropShadow: wrap("drop-shadow"),
  grayscale: wrap("grayscale"),
  hueRotate: wrap("hue-rotate"),
  invert: wrap("invert"),
  saturate: wrap("saturate"),
  sepia: wrap("sepia"),
  bgImage: function bgImage(value) {
    if (value == null) return value;
    var prevent = isCSSFunction(value) || globalSet.has(value);
    return !prevent ? "url(" + value + ")" : value;
  },
  outline: function outline(value) {
    var isNoneOrZero = String(value) === "0" || String(value) === "none";
    return value !== null && isNoneOrZero ? {
      outline: "2px solid transparent",
      outlineOffset: "2px"
    } : {
      outline: value
    };
  },
  flexDirection: function flexDirection(value) {
    var _flexDirectionTemplat;

    var _ref = (_flexDirectionTemplat = flexDirectionTemplate[value]) != null ? _flexDirectionTemplat : {},
        space = _ref.space,
        divide = _ref.divide;

    var result = {
      flexDirection: value
    };
    if (space) result[space] = 1;
    if (divide) result[divide] = 1;
    return result;
  }
};

var t$2 = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  radii: toConfig("radii", transformFunctions.px),
  space: toConfig("space", transformFunctions.px),
  spaceT: toConfig("space", transformFunctions.px),
  degreeT: function degreeT(property) {
    return {
      property: property,
      transform: transformFunctions.degree
    };
  },
  prop: function prop(property, scale, transform) {
    return _extends$1({
      property: property,
      scale: scale
    }, scale && {
      transform: createTransform({
        scale: scale,
        transform: transform
      })
    });
  },
  propT: function propT(property, transform) {
    return {
      property: property,
      transform: transform
    };
  },
  sizes: toConfig("sizes", transformFunctions.px),
  sizesT: toConfig("sizes", transformFunctions.fraction),
  shadows: toConfig("shadows"),
  logical: logical,
  blur: toConfig("blur", transformFunctions.blur)
};

var background = {
  background: t$2.colors("background"),
  backgroundColor: t$2.colors("backgroundColor"),
  backgroundImage: t$2.propT("backgroundImage", transformFunctions.bgImage),
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundClip: {
    transform: transformFunctions.bgClip
  },
  bgSize: t$2.prop("backgroundSize"),
  bgPosition: t$2.prop("backgroundPosition"),
  bg: t$2.colors("background"),
  bgColor: t$2.colors("backgroundColor"),
  bgPos: t$2.prop("backgroundPosition"),
  bgRepeat: t$2.prop("backgroundRepeat"),
  bgAttachment: t$2.prop("backgroundAttachment"),
  bgGradient: t$2.propT("backgroundImage", transformFunctions.gradient),
  bgClip: {
    transform: transformFunctions.bgClip
  }
};
Object.assign(background, {
  bgImage: background.backgroundImage,
  bgImg: background.backgroundImage
});

var border = {
  border: t$2.borders("border"),
  borderWidth: t$2.borderWidths("borderWidth"),
  borderStyle: t$2.borderStyles("borderStyle"),
  borderColor: t$2.colors("borderColor"),
  borderRadius: t$2.radii("borderRadius"),
  borderTop: t$2.borders("borderTop"),
  borderBlockStart: t$2.borders("borderBlockStart"),
  borderTopLeftRadius: t$2.radii("borderTopLeftRadius"),
  borderStartStartRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius"
    }
  }),
  borderEndStartRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius"
    }
  }),
  borderTopRightRadius: t$2.radii("borderTopRightRadius"),
  borderStartEndRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius"
    }
  }),
  borderEndEndRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius"
    }
  }),
  borderRight: t$2.borders("borderRight"),
  borderInlineEnd: t$2.borders("borderInlineEnd"),
  borderBottom: t$2.borders("borderBottom"),
  borderBlockEnd: t$2.borders("borderBlockEnd"),
  borderBottomLeftRadius: t$2.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: t$2.radii("borderBottomRightRadius"),
  borderLeft: t$2.borders("borderLeft"),
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders"
  },
  borderInlineStartRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"]
    }
  }),
  borderInlineEndRadius: t$2.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"]
    }
  }),
  borderX: t$2.borders(["borderLeft", "borderRight"]),
  borderInline: t$2.borders("borderInline"),
  borderY: t$2.borders(["borderTop", "borderBottom"]),
  borderBlock: t$2.borders("borderBlock"),
  borderTopWidth: t$2.borderWidths("borderTopWidth"),
  borderBlockStartWidth: t$2.borderWidths("borderBlockStartWidth"),
  borderTopColor: t$2.colors("borderTopColor"),
  borderBlockStartColor: t$2.colors("borderBlockStartColor"),
  borderTopStyle: t$2.borderStyles("borderTopStyle"),
  borderBlockStartStyle: t$2.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: t$2.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: t$2.borderWidths("borderBlockEndWidth"),
  borderBottomColor: t$2.colors("borderBottomColor"),
  borderBlockEndColor: t$2.colors("borderBlockEndColor"),
  borderBottomStyle: t$2.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: t$2.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: t$2.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: t$2.borderWidths("borderInlineStartWidth"),
  borderLeftColor: t$2.colors("borderLeftColor"),
  borderInlineStartColor: t$2.colors("borderInlineStartColor"),
  borderLeftStyle: t$2.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: t$2.borderStyles("borderInlineStartStyle"),
  borderRightWidth: t$2.borderWidths("borderRightWidth"),
  borderInlineEndWidth: t$2.borderWidths("borderInlineEndWidth"),
  borderRightColor: t$2.colors("borderRightColor"),
  borderInlineEndColor: t$2.colors("borderInlineEndColor"),
  borderRightStyle: t$2.borderStyles("borderRightStyle"),
  borderInlineEndStyle: t$2.borderStyles("borderInlineEndStyle"),
  borderTopRadius: t$2.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: t$2.radii(["borderBottomLeftRadius", "borderBottomRightRadius"]),
  borderLeftRadius: t$2.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
  borderRightRadius: t$2.radii(["borderTopRightRadius", "borderBottomRightRadius"])
};
Object.assign(border, {
  rounded: border.borderRadius,
  roundedTop: border.borderTopRadius,
  roundedTopLeft: border.borderTopLeftRadius,
  roundedTopRight: border.borderTopRightRadius,
  roundedTopStart: border.borderStartStartRadius,
  roundedTopEnd: border.borderStartEndRadius,
  roundedBottom: border.borderBottomRadius,
  roundedBottomLeft: border.borderBottomLeftRadius,
  roundedBottomRight: border.borderBottomRightRadius,
  roundedBottomStart: border.borderEndStartRadius,
  roundedBottomEnd: border.borderEndEndRadius,
  roundedLeft: border.borderLeftRadius,
  roundedRight: border.borderRightRadius,
  roundedStart: border.borderInlineStartRadius,
  roundedEnd: border.borderInlineEndRadius,
  borderStart: border.borderInlineStart,
  borderEnd: border.borderInlineEnd,
  borderTopStartRadius: border.borderStartStartRadius,
  borderTopEndRadius: border.borderStartEndRadius,
  borderBottomStartRadius: border.borderEndStartRadius,
  borderBottomEndRadius: border.borderEndEndRadius,
  borderStartRadius: border.borderInlineStartRadius,
  borderEndRadius: border.borderInlineEndRadius,
  borderStartWidth: border.borderInlineStartWidth,
  borderEndWidth: border.borderInlineEndWidth,
  borderStartColor: border.borderInlineStartColor,
  borderEndColor: border.borderInlineEndColor,
  borderStartStyle: border.borderInlineStartStyle,
  borderEndStyle: border.borderInlineEndStyle
});
/**
 * The prop types for border properties listed above
 */

var color = {
  color: t$2.colors("color"),
  textColor: t$2.colors("color"),
  fill: t$2.colors("fill"),
  stroke: t$2.colors("stroke")
};

var effect = {
  boxShadow: t$2.shadows("boxShadow"),
  mixBlendMode: true,
  blendMode: t$2.prop("mixBlendMode"),
  backgroundBlendMode: true,
  bgBlendMode: t$2.prop("backgroundBlendMode"),
  opacity: true
};
Object.assign(effect, {
  shadow: effect.boxShadow
});
/**
 * Types for box and text shadow properties
 */

var filter = {
  filter: {
    transform: transformFunctions.filter
  },
  blur: t$2.blur("--chakra-blur"),
  brightness: t$2.propT("--chakra-brightness", transformFunctions.brightness),
  contrast: t$2.propT("--chakra-contrast", transformFunctions.contrast),
  hueRotate: t$2.degreeT("--chakra-hue-rotate"),
  invert: t$2.propT("--chakra-invert", transformFunctions.invert),
  saturate: t$2.propT("--chakra-saturate", transformFunctions.saturate),
  dropShadow: t$2.propT("--chakra-drop-shadow", transformFunctions.dropShadow),
  backdropFilter: {
    transform: transformFunctions.backdropFilter
  },
  backdropBlur: t$2.blur("--chakra-backdrop-blur"),
  backdropBrightness: t$2.propT("--chakra-backdrop-brightness", transformFunctions.brightness),
  backdropContrast: t$2.propT("--chakra-backdrop-contrast", transformFunctions.contrast),
  backdropHueRotate: t$2.degreeT("--chakra-backdrop-hue-rotate"),
  backdropInvert: t$2.propT("--chakra-backdrop-invert", transformFunctions.invert),
  backdropSaturate: t$2.propT("--chakra-backdrop-saturate", transformFunctions.saturate)
};

var flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: {
    transform: transformFunctions.flexDirection
  },
  experimental_spaceX: {
    "static": spaceXTemplate,
    transform: createTransform({
      scale: "space",
      transform: function transform(value) {
        return value !== null ? {
          "--chakra-space-x": value
        } : null;
      }
    })
  },
  experimental_spaceY: {
    "static": spaceYTemplate,
    transform: createTransform({
      scale: "space",
      transform: function transform(value) {
        return value != null ? {
          "--chakra-space-y": value
        } : null;
      }
    })
  },
  flex: true,
  flexFlow: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: t$2.sizes("flexBasis"),
  justifySelf: true,
  alignSelf: true,
  order: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true
};
Object.assign(flexbox, {
  flexDir: flexbox.flexDirection
});

var grid = {
  gridGap: t$2.space("gridGap"),
  gridColumnGap: t$2.space("gridColumnGap"),
  gridRowGap: t$2.space("gridRowGap"),
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridAutoRows: true,
  gridTemplate: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};

var interactivity = {
  appearance: true,
  cursor: true,
  resize: true,
  userSelect: true,
  pointerEvents: true,
  outline: {
    transform: transformFunctions.outline
  },
  outlineOffset: true,
  outlineColor: t$2.colors("outlineColor")
};

var layout = {
  width: t$2.sizesT("width"),
  inlineSize: t$2.sizesT("inlineSize"),
  height: t$2.sizes("height"),
  blockSize: t$2.sizes("blockSize"),
  boxSize: t$2.sizes(["width", "height"]),
  minWidth: t$2.sizes("minWidth"),
  minInlineSize: t$2.sizes("minInlineSize"),
  minHeight: t$2.sizes("minHeight"),
  minBlockSize: t$2.sizes("minBlockSize"),
  maxWidth: t$2.sizes("maxWidth"),
  maxInlineSize: t$2.sizes("maxInlineSize"),
  maxHeight: t$2.sizes("maxHeight"),
  maxBlockSize: t$2.sizes("maxBlockSize"),
  d: t$2.prop("display"),
  overflow: true,
  overflowX: true,
  overflowY: true,
  overscrollBehavior: true,
  overscrollBehaviorX: true,
  overscrollBehaviorY: true,
  display: true,
  verticalAlign: true,
  boxSizing: true,
  boxDecorationBreak: true,
  "float": t$2.propT("float", transformFunctions["float"]),
  objectFit: true,
  objectPosition: true,
  visibility: true,
  isolation: true
};
Object.assign(layout, {
  w: layout.width,
  h: layout.height,
  minW: layout.minWidth,
  maxW: layout.maxWidth,
  minH: layout.minHeight,
  maxH: layout.maxHeight,
  overscroll: layout.overscrollBehavior,
  overscrollX: layout.overscrollBehaviorX,
  overscrollY: layout.overscrollBehaviorY
});
/**
 * Types for layout related CSS properties
 */

var list = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: t$2.prop("listStylePosition"),
  listStyleImage: true,
  listStyleImg: t$2.prop("listStyleImage")
};

var srOnly = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
var srFocusable = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal"
};

var getWithPriority = function getWithPriority(theme, key, styles) {
  var result = {};
  var obj = memoizedGet(theme, key, {});

  for (var prop in obj) {
    var isInStyles = prop in styles && styles[prop] != null;
    if (!isInStyles) result[prop] = obj[prop];
  }

  return result;
};

var others = {
  srOnly: {
    transform: function transform(value) {
      if (value === true) return srOnly;
      if (value === "focusable") return srFocusable;
      return {};
    }
  },
  layerStyle: {
    processResult: true,
    transform: function transform(value, theme, styles) {
      return getWithPriority(theme, "layerStyles." + value, styles);
    }
  },
  textStyle: {
    processResult: true,
    transform: function transform(value, theme, styles) {
      return getWithPriority(theme, "textStyles." + value, styles);
    }
  },
  apply: {
    processResult: true,
    transform: function transform(value, theme, styles) {
      return getWithPriority(theme, value, styles);
    }
  }
};

var position = {
  position: true,
  pos: t$2.prop("position"),
  zIndex: t$2.prop("zIndex", "zIndices"),
  inset: t$2.spaceT(["top", "right", "bottom", "left"]),
  insetX: t$2.spaceT(["left", "right"]),
  insetInline: t$2.spaceT("insetInline"),
  insetY: t$2.spaceT(["top", "bottom"]),
  insetBlock: t$2.spaceT("insetBlock"),
  top: t$2.spaceT("top"),
  insetBlockStart: t$2.spaceT("insetBlockStart"),
  bottom: t$2.spaceT("bottom"),
  insetBlockEnd: t$2.spaceT("insetBlockEnd"),
  left: t$2.spaceT("left"),
  insetInlineStart: t$2.logical({
    scale: "space",
    property: {
      ltr: "left",
      rtl: "right"
    }
  }),
  right: t$2.spaceT("right"),
  insetInlineEnd: t$2.logical({
    scale: "space",
    property: {
      ltr: "right",
      rtl: "left"
    }
  })
};
Object.assign(position, {
  insetStart: position.insetInlineStart,
  insetEnd: position.insetInlineEnd
});
/**
 * Types for position CSS properties
 */

/**
 * The parser configuration for common outline properties
 */
var ring = {
  ring: {
    transform: transformFunctions.ring
  },
  ringColor: t$2.colors("--chakra-ring-color"),
  ringOffset: t$2.prop("--chakra-ring-offset-width"),
  ringOffsetColor: t$2.colors("--chakra-ring-offset-color"),
  ringInset: t$2.prop("--chakra-ring-inset")
};

var space = {
  margin: t$2.spaceT("margin"),
  marginTop: t$2.spaceT("marginTop"),
  marginBlockStart: t$2.spaceT("marginBlockStart"),
  marginRight: t$2.spaceT("marginRight"),
  marginInlineEnd: t$2.spaceT("marginInlineEnd"),
  marginBottom: t$2.spaceT("marginBottom"),
  marginBlockEnd: t$2.spaceT("marginBlockEnd"),
  marginLeft: t$2.spaceT("marginLeft"),
  marginInlineStart: t$2.spaceT("marginInlineStart"),
  marginX: t$2.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginInline: t$2.spaceT("marginInline"),
  marginY: t$2.spaceT(["marginTop", "marginBottom"]),
  marginBlock: t$2.spaceT("marginBlock"),
  padding: t$2.space("padding"),
  paddingTop: t$2.space("paddingTop"),
  paddingBlockStart: t$2.space("paddingBlockStart"),
  paddingRight: t$2.space("paddingRight"),
  paddingBottom: t$2.space("paddingBottom"),
  paddingBlockEnd: t$2.space("paddingBlockEnd"),
  paddingLeft: t$2.space("paddingLeft"),
  paddingInlineStart: t$2.space("paddingInlineStart"),
  paddingInlineEnd: t$2.space("paddingInlineEnd"),
  paddingX: t$2.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingInline: t$2.space("paddingInline"),
  paddingY: t$2.space(["paddingTop", "paddingBottom"]),
  paddingBlock: t$2.space("paddingBlock")
};
Object.assign(space, {
  m: space.margin,
  mt: space.marginTop,
  mr: space.marginRight,
  me: space.marginInlineEnd,
  marginEnd: space.marginInlineEnd,
  mb: space.marginBottom,
  ml: space.marginLeft,
  ms: space.marginInlineStart,
  marginStart: space.marginInlineStart,
  mx: space.marginX,
  my: space.marginY,
  p: space.padding,
  pt: space.paddingTop,
  py: space.paddingY,
  px: space.paddingX,
  pb: space.paddingBottom,
  pl: space.paddingLeft,
  ps: space.paddingInlineStart,
  paddingStart: space.paddingInlineStart,
  pr: space.paddingRight,
  pe: space.paddingInlineEnd,
  paddingEnd: space.paddingInlineEnd
});
/**
 * Types for space related CSS properties
 */

var textDecoration = {
  textDecorationColor: t$2.colors("textDecorationColor"),
  textDecoration: true,
  textDecor: {
    property: "textDecoration"
  },
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: true,
  textUnderlineOffset: true,
  textShadow: t$2.shadows("textShadow")
};

var transform = {
  clipPath: true,
  transform: t$2.propT("transform", transformFunctions.transform),
  transformOrigin: true,
  translateX: t$2.spaceT("--chakra-translate-x"),
  translateY: t$2.spaceT("--chakra-translate-y"),
  skewX: t$2.degreeT("--chakra-skew-x"),
  skewY: t$2.degreeT("--chakra-skew-y"),
  scaleX: t$2.prop("--chakra-scale-x"),
  scaleY: t$2.prop("--chakra-scale-y"),
  scale: t$2.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: t$2.degreeT("--chakra-rotate")
};

var transition = {
  transition: true,
  transitionDelay: true,
  animation: true,
  willChange: true,
  transitionDuration: t$2.prop("transitionDuration", "transition.duration"),
  transitionProperty: t$2.prop("transitionProperty", "transition.property"),
  transitionTimingFunction: t$2.prop("transitionTimingFunction", "transition.easing")
};

var typography = {
  fontFamily: t$2.prop("fontFamily", "fonts"),
  fontSize: t$2.prop("fontSize", "fontSizes", transformFunctions.px),
  fontWeight: t$2.prop("fontWeight", "fontWeights"),
  lineHeight: t$2.prop("lineHeight", "lineHeights"),
  letterSpacing: t$2.prop("letterSpacing", "letterSpacings"),
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  noOfLines: {
    "static": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      //@ts-ignore
      WebkitLineClamp: "var(--chakra-line-clamp)"
    },
    property: "--chakra-line-clamp"
  },
  isTruncated: {
    transform: function transform(value) {
      if (value === true) {
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        };
      }
    }
  }
};
/**
 * Types for typography related CSS properties
 */

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var group = {
  hover: function hover(selector) {
    return selector + ":hover &, " + selector + "[data-hover] &";
  },
  focus: function focus(selector) {
    return selector + ":focus &, " + selector + "[data-focus] &";
  },
  focusVisible: function focusVisible(selector) {
    return selector + ":focus-visible &";
  },
  active: function active(selector) {
    return selector + ":active &, " + selector + "[data-active] &";
  },
  disabled: function disabled(selector) {
    return selector + ":disabled &, " + selector + "[data-disabled] &";
  },
  invalid: function invalid(selector) {
    return selector + ":invalid &, " + selector + "[data-invalid] &";
  },
  checked: function checked(selector) {
    return selector + ":checked &, " + selector + "[data-checked] &";
  },
  indeterminate: function indeterminate(selector) {
    return selector + ":indeterminate &, " + selector + "[aria-checked=mixed] &, " + selector + "[data-indeterminate] &";
  },
  readOnly: function readOnly(selector) {
    return selector + ":read-only &, " + selector + "[readonly] &, " + selector + "[data-read-only] &";
  },
  expanded: function expanded(selector) {
    return selector + ":read-only &, " + selector + "[aria-expanded=true] &, " + selector + "[data-expanded] &";
  }
};

var toGroup = function toGroup(fn) {
  return merge(fn, "[role=group]", "[data-group]", ".group");
};

var merge = function merge(fn) {
  for (var _len = arguments.length, selectors = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    selectors[_key - 1] = arguments[_key];
  }

  return selectors.map(fn).join(", ");
};

var pseudoSelectors = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",

  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",

  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",

  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",

  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible",

  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&[data-disabled]`
   */
  _disabled: "&[disabled], &[aria-disabled=true], &[data-disabled]",

  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",

  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",

  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  _empty: "&:empty",

  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",

  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",

  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",

  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",

  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",

  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",

  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",

  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",

  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",

  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",

  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",

  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",

  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",

  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",

  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",

  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",

  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",

  /**
   * Used to style the current step within a process
   * Styles for CSS Selector `&[aria-current=step]`
   */
  _activeStep: "&[aria-current=step]",

  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",

  /**
   * Styles to apply when parent is hovered
   */
  _groupHover: toGroup(group.hover),

  /**
   * Styles to apply when parent is focused
   */
  _groupFocus: toGroup(group.focus),
  _groupFocusVisible: toGroup(group.focusVisible),

  /**
   * Styles to apply when parent is active
   */
  _groupActive: toGroup(group.active),

  /**
   * Styles to apply when parent is disabled
   */
  _groupDisabled: toGroup(group.disabled),

  /**
   * Styles to apply when parent is invalid
   */
  _groupInvalid: toGroup(group.invalid),

  /**
   * Styles to apply when parent is checked
   */
  _groupChecked: toGroup(group.checked),

  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",

  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",

  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection",

  /**
   * Styles for CSS Selector `[dir=rtl] &`
   * It is applied when any parent element has `dir="rtl"`
   */
  _rtl: "[dir=rtl] &",

  /**
   * Styles for CSS Selector `@media (prefers-color-scheme: dark)`
   * used when the user has requested the system
   * use a light or dark color theme.
   */
  _mediaDark: "@media (prefers-color-scheme: dark)",

  /**
   * Styles for when `data-theme` is applied to any parent of
   * this component or element.
   */
  _dark: ".chakra-ui-dark &, [data-theme=dark] &, &[data-theme=dark]",

  /**
   * Styles for when `data-theme` is applied to any parent of
   * this component or element.
   */
  _light: ".chakra-ui-light &, [data-theme=light] &, &[data-theme=light]"
};
var pseudoPropNames = objectKeys(pseudoSelectors);

var systemProps = lodash_mergewith({}, background, border, color, flexbox, layout, filter, ring, interactivity, grid, others, position, effect, space, typography, textDecoration, transform, list, transition);
var layoutSystem = Object.assign({}, space, layout, flexbox, grid, position);
var propNames = [].concat(objectKeys(systemProps), pseudoPropNames);

var styleProps = _extends$1({}, systemProps, pseudoSelectors);

var isStyleProp = function isStyleProp(prop) {
  return prop in styleProps;
};

/**
 * Expands an array or object syntax responsive style.
 *
 * @example
 * expandResponsive({ mx: [1, 2] })
 * // or
 * expandResponsive({ mx: { base: 1, sm: 2 } })
 *
 * // => { mx: 1, "@media(min-width:<sm>)": { mx: 2 } }
 */

var expandResponsive = function expandResponsive(styles) {
  return function (theme) {
    /**
     * Before any style can be processed, the user needs to call `toCSSVar`
     * which analyzes the theme's breakpoint and appends a `__breakpoints` property
     * to the theme with more details of the breakpoints.
     *
     * To learn more, go here: packages/utils/src/responsive.ts #analyzeBreakpoints
     */
    if (!theme.__breakpoints) return styles;
    var _theme$__breakpoints = theme.__breakpoints,
        isResponsive = _theme$__breakpoints.isResponsive,
        toArrayValue = _theme$__breakpoints.toArrayValue,
        medias = _theme$__breakpoints.media;
    var computedStyles = {};

    for (var key in styles) {
      var value = runIfFn(styles[key], theme);
      if (value == null) continue; // converts the object responsive syntax to array syntax

      value = isObject(value) && isResponsive(value) ? toArrayValue(value) : value;

      if (!Array.isArray(value)) {
        computedStyles[key] = value;
        continue;
      }

      var queries = value.slice(0, medias.length).length;

      for (var index = 0; index < queries; index += 1) {
        var media = medias == null ? void 0 : medias[index];

        if (!media) {
          computedStyles[key] = value[index];
          continue;
        }

        computedStyles[media] = computedStyles[media] || {};

        if (value[index] == null) {
          continue;
        }

        computedStyles[media][key] = value[index];
      }
    }

    return computedStyles;
  };
};

var isCSSVariableTokenValue = function isCSSVariableTokenValue(key, value) {
  return key.startsWith("--") && isString(value) && !isCssVar(value);
};

var resolveTokenValue = function resolveTokenValue(theme, value) {
  var _ref, _getVar2;

  if (value == null) return value;

  var getVar = function getVar(val) {
    var _theme$__cssMap, _theme$__cssMap$val;

    return (_theme$__cssMap = theme.__cssMap) == null ? void 0 : (_theme$__cssMap$val = _theme$__cssMap[val]) == null ? void 0 : _theme$__cssMap$val.varRef;
  };

  var getValue = function getValue(val) {
    var _getVar;

    return (_getVar = getVar(val)) != null ? _getVar : val;
  };

  var valueSplit = value.split(",").map(function (v) {
    return v.trim();
  });
  var tokenValue = valueSplit[0],
      fallbackValue = valueSplit[1];
  value = (_ref = (_getVar2 = getVar(tokenValue)) != null ? _getVar2 : getValue(fallbackValue)) != null ? _ref : getValue(value);
  return value;
};

function getCss(options) {
  var _options$configs = options.configs,
      configs = _options$configs === void 0 ? {} : _options$configs,
      _options$pseudos = options.pseudos,
      pseudos = _options$pseudos === void 0 ? {} : _options$pseudos,
      theme = options.theme;

  var css = function css(stylesOrFn, nested) {
    if (nested === void 0) {
      nested = false;
    }

    var _styles = runIfFn(stylesOrFn, theme);

    var styles = expandResponsive(_styles)(theme);
    var computedStyles = {};

    for (var key in styles) {
      var _config$transform, _config, _config2, _config3, _config4;

      var valueOrFn = styles[key];
      /**
       * allows the user to pass functional values
       * boxShadow: theme => `0 2px 2px ${theme.colors.red}`
       */

      var value = runIfFn(valueOrFn, theme);
      /**
       * converts pseudo shorthands to valid selector
       * "_hover" => "&:hover"
       */

      if (key in pseudos) {
        key = pseudos[key];
      }
      /**
       * allows the user to use theme tokens in css vars
       * { --banner-height: "sizes.md" } => { --banner-height: "var(--chakra-sizes-md)" }
       *
       * You can also provide fallback values
       * { --banner-height: "sizes.no-exist, 40px" } => { --banner-height: "40px" }
       */


      if (isCSSVariableTokenValue(key, value)) {
        value = resolveTokenValue(theme, value);
      }

      var config = configs[key];

      if (config === true) {
        config = {
          property: key
        };
      }

      if (isObject(value)) {
        var _computedStyles$key;

        computedStyles[key] = (_computedStyles$key = computedStyles[key]) != null ? _computedStyles$key : {};
        computedStyles[key] = lodash_mergewith({}, computedStyles[key], css(value, true));
        continue;
      }

      var rawValue = (_config$transform = (_config = config) == null ? void 0 : _config.transform == null ? void 0 : _config.transform(value, theme, _styles)) != null ? _config$transform : value;
      /**
       * Used for `layerStyle`, `textStyle` and `apply`. After getting the
       * styles in the theme, we need to process them since they might
       * contain theme tokens.
       *
       * `processResult` is the config property we pass to `layerStyle`, `textStyle` and `apply`
       */

      rawValue = (_config2 = config) != null && _config2.processResult ? css(rawValue, true) : rawValue;
      /**
       * allows us define css properties for RTL and LTR.
       *
       * const marginStart = {
       *   property: theme => theme.direction === "rtl" ? "marginRight": "marginLeft",
       * }
       */

      var configProperty = runIfFn((_config3 = config) == null ? void 0 : _config3.property, theme);

      if (!nested && (_config4 = config) != null && _config4["static"]) {
        var staticStyles = runIfFn(config["static"], theme);
        computedStyles = lodash_mergewith({}, computedStyles, staticStyles);
      }

      if (configProperty && Array.isArray(configProperty)) {
        for (var _iterator = _createForOfIteratorHelperLoose(configProperty), _step; !(_step = _iterator()).done;) {
          var property = _step.value;
          computedStyles[property] = rawValue;
        }

        continue;
      }

      if (configProperty) {
        if (configProperty === "&" && isObject(rawValue)) {
          computedStyles = lodash_mergewith({}, computedStyles, rawValue);
        } else {
          computedStyles[configProperty] = rawValue;
        }

        continue;
      }

      if (isObject(rawValue)) {
        computedStyles = lodash_mergewith({}, computedStyles, rawValue);
        continue;
      }

      computedStyles[key] = rawValue;
    }

    return computedStyles;
  };

  return css;
}
var css$1 = function css(styles) {
  return function (theme) {
    var cssFn = getCss({
      theme: theme,
      pseudos: pseudoSelectors,
      configs: systemProps
    });
    return cssFn(styles);
  };
};

/**
 * Thank you @markdalgleish for this piece of art!
 */

function resolveReference(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }

  return String(operand);
}

var toExpression = function toExpression(operator) {
  for (var _len = arguments.length, operands = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    operands[_key - 1] = arguments[_key];
  }

  return operands.map(resolveReference).join(" " + operator + " ").replace(/calc/g, "");
};

var _add = function add() {
  for (var _len2 = arguments.length, operands = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    operands[_key2] = arguments[_key2];
  }

  return "calc(" + toExpression.apply(void 0, ["+"].concat(operands)) + ")";
};

var _subtract = function subtract() {
  for (var _len3 = arguments.length, operands = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    operands[_key3] = arguments[_key3];
  }

  return "calc(" + toExpression.apply(void 0, ["-"].concat(operands)) + ")";
};

var _multiply = function multiply() {
  for (var _len4 = arguments.length, operands = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    operands[_key4] = arguments[_key4];
  }

  return "calc(" + toExpression.apply(void 0, ["*"].concat(operands)) + ")";
};

var _divide = function divide() {
  for (var _len5 = arguments.length, operands = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    operands[_key5] = arguments[_key5];
  }

  return "calc(" + toExpression.apply(void 0, ["/"].concat(operands)) + ")";
};

var _negate = function negate(x) {
  var value = resolveReference(x);

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : "-" + value;
  }

  return _multiply(value, -1);
};

var calc = Object.assign(function (x) {
  return {
    add: function add() {
      for (var _len6 = arguments.length, operands = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        operands[_key6] = arguments[_key6];
      }

      return calc(_add.apply(void 0, [x].concat(operands)));
    },
    subtract: function subtract() {
      for (var _len7 = arguments.length, operands = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        operands[_key7] = arguments[_key7];
      }

      return calc(_subtract.apply(void 0, [x].concat(operands)));
    },
    multiply: function multiply() {
      for (var _len8 = arguments.length, operands = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        operands[_key8] = arguments[_key8];
      }

      return calc(_multiply.apply(void 0, [x].concat(operands)));
    },
    divide: function divide() {
      for (var _len9 = arguments.length, operands = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        operands[_key9] = arguments[_key9];
      }

      return calc(_divide.apply(void 0, [x].concat(operands)));
    },
    negate: function negate() {
      return calc(_negate(x));
    },
    toString: function toString() {
      return x.toString();
    }
  };
}, {
  add: _add,
  subtract: _subtract,
  multiply: _multiply,
  divide: _divide,
  negate: _negate
});

function replaceWhiteSpace(value, replaceValue) {
  if (replaceValue === void 0) {
    replaceValue = "-";
  }

  return value.replace(/\s+/g, replaceValue);
}

function escape(value) {
  var valueStr = replaceWhiteSpace(value.toString());
  if (valueStr.includes("\\.")) return value;
  var isDecimal = !Number.isInteger(parseFloat(value.toString()));
  return isDecimal ? valueStr.replace(".", "\\.") : value;
}

function addPrefix(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return [prefix, escape(value)].filter(Boolean).join("-");
}
function toVarReference(name, fallback) {
  return "var(" + escape(name) + (fallback ? ", " + fallback : "") + ")";
}
function toVarDefinition(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return "--" + addPrefix(value, prefix);
}
function cssVar(name, fallback, cssVarPrefix) {
  var cssVariable = toVarDefinition(name, cssVarPrefix);
  return {
    variable: cssVariable,
    reference: toVarReference(cssVariable, fallback)
  };
}

function createThemeVars(target, options) {
  var context = {
    cssMap: {},
    cssVars: {}
  };
  walkObject(target, function (value, path) {
    var _tokenHandlerMap$firs;

    // firstKey will be e.g. "space"
    var firstKey = path[0];
    var handler = (_tokenHandlerMap$firs = tokenHandlerMap[firstKey]) != null ? _tokenHandlerMap$firs : tokenHandlerMap.defaultHandler;

    var _handler = handler(path, value, options),
        cssVars = _handler.cssVars,
        cssMap = _handler.cssMap;

    Object.assign(context.cssVars, cssVars);
    Object.assign(context.cssMap, cssMap);
  });
  return context;
}

/**
 * Define transformation handlers for ThemeScale
 */
var tokenHandlerMap = {
  space: function space(keys, value, options) {
    var _extends2;

    var properties = tokenHandlerMap.defaultHandler(keys, value, options);
    var firstKey = keys[0],
        referenceKeys = keys.slice(1);
    var negativeLookupKey = firstKey + ".-" + referenceKeys.join(".");
    var negativeVarKey = keys.join("-");

    var _cssVar = cssVar(negativeVarKey, undefined, options.cssVarPrefix),
        variable = _cssVar.variable,
        reference = _cssVar.reference;

    var negativeValue = calc.negate(value);
    var varRef = calc.negate(reference);
    return {
      cssVars: properties.cssVars,
      cssMap: _extends$1({}, properties.cssMap, (_extends2 = {}, _extends2[negativeLookupKey] = {
        value: "" + negativeValue,
        "var": "" + variable,
        varRef: varRef
      }, _extends2))
    };
  },
  defaultHandler: function defaultHandler(keys, value, options) {
    var _cssVars, _cssMap;

    var lookupKey = keys.join(".");
    var varKey = keys.join("-");

    var _cssVar2 = cssVar(varKey, undefined, options.cssVarPrefix),
        variable = _cssVar2.variable,
        reference = _cssVar2.reference;

    return {
      cssVars: (_cssVars = {}, _cssVars[variable] = value, _cssVars),
      cssMap: (_cssMap = {}, _cssMap[lookupKey] = {
        value: value,
        "var": variable,
        varRef: reference
      }, _cssMap)
    };
  }
};

function _objectWithoutPropertiesLoose$1(source, excluded) {
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

var _excluded$1 = ["__cssMap", "__cssVars", "__breakpoints"];
var tokens = ["colors", "borders", "borderWidths", "borderStyles", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "space", "shadows", "sizes", "zIndices", "transition", "blur"];
function extractTokens(theme) {
  var _tokens = tokens;
  return pick(theme, _tokens);
}
function omitVars(rawTheme) {
  rawTheme.__cssMap;
      rawTheme.__cssVars;
      rawTheme.__breakpoints;
      var cleanTheme = _objectWithoutPropertiesLoose$1(rawTheme, _excluded$1);

  return cleanTheme;
}

function toCSSVar(rawTheme) {
  var _theme$config;

  /**
   * In the case the theme has already been converted to css-var (e.g extending the theme),
   * we can omit the computed css vars and recompute it for the extended theme.
   */
  var theme = omitVars(rawTheme); // omit components and breakpoints from css variable map

  var tokens = extractTokens(theme);
  var cssVarPrefix = (_theme$config = theme.config) == null ? void 0 : _theme$config.cssVarPrefix;

  var _createThemeVars = createThemeVars(tokens, {
    cssVarPrefix: cssVarPrefix
  }),
      cssMap = _createThemeVars.cssMap,
      cssVars = _createThemeVars.cssVars;

  var defaultCssVars = {
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0"
  };
  Object.assign(theme, {
    __cssVars: _extends$1({}, defaultCssVars, cssVars),
    __cssMap: cssMap,
    __breakpoints: analyzeBreakpoints(theme.breakpoints)
  });
  return theme;
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var testOmitPropsOnStringTag = isPropValid;

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var Noop = function Noop() {
  return null;
};

var createStyled = function createStyled(tag, options) {

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = withEmotionCache(function (props, cache, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = react.useContext(ThemeContext);
      }

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      var rules = insertStyles(cache, serialized, typeof finalTag === 'string');
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if ( // $FlowFixMe
        finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;
      newProps.ref = ref;
      var ele = /*#__PURE__*/react.createElement(finalTag, newProps);
      var possiblyStyleElement = /*#__PURE__*/react.createElement(Noop, null);


      return /*#__PURE__*/react.createElement(react.Fragment, null, possiblyStyleElement, ele);
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "production" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, _extends$d({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };

    return Styled;
  };
};

var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled = createStyled.bind();
tags.forEach(function (tagName) {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
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

  return _extends$2.apply(this, arguments);
}

var ThemeProvider$1 = function ThemeProvider$1(props) {
  var _props$cssVarsRoot = props.cssVarsRoot,
      cssVarsRoot = _props$cssVarsRoot === void 0 ? ":host, :root" : _props$cssVarsRoot,
      theme = props.theme,
      children = props.children;
  var computedTheme = react.useMemo(function () {
    return toCSSVar(theme);
  }, [theme]);
  return /*#__PURE__*/react.createElement(ThemeProvider, {
    theme: computedTheme
  }, /*#__PURE__*/react.createElement(Global, {
    styles: function styles(theme) {
      var _ref;

      return _ref = {}, _ref[cssVarsRoot] = theme.__cssVars, _ref;
    }
  }), children);
};
function useTheme() {
  var theme = react.useContext(ThemeContext);

  if (!theme) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`");
  }

  return theme;
}

var _createContext$2 = createContext({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
}),
    StylesProvider = _createContext$2[0],
    useStyles = _createContext$2[1];
/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */

var GlobalStyle = function GlobalStyle() {
  var _useColorMode = useColorMode(),
      colorMode = _useColorMode.colorMode;

  return /*#__PURE__*/react.createElement(Global, {
    styles: function styles(theme) {
      var styleObjectOrFn = memoizedGet(theme, "styles.global");
      var globalStyles = runIfFn(styleObjectOrFn, {
        theme: theme,
        colorMode: colorMode
      });
      if (!globalStyles) return undefined;
      var styles = css$1(globalStyles)(theme);
      return styles;
    }
  });
};

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "main", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
function omitThemingProps(props) {
  return omit(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

function useChakra() {
  var colorModeResult = useColorMode();
  var theme = useTheme();
  return _extends$2({}, colorModeResult, {
    theme: theme
  });
} // inspired from ./css.ts : resolveTokenValue

function _objectWithoutPropertiesLoose$2(source, excluded) {
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

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames = new Set([].concat(propNames, ["textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]));
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp = function shouldForwardProp(prop) {
  return validHTMLProps.has(prop) || !allPropNames.has(prop);
};

var _excluded$1$1 = ["theme", "css", "__css", "sx"],
    _excluded2 = ["baseStyle"];

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var toCSSObject = function toCSSObject(_ref) {
  var baseStyle = _ref.baseStyle;
  return function (props) {
    props.theme;
        var cssProp = props.css,
        __css = props.__css,
        sx = props.sx,
        rest = _objectWithoutPropertiesLoose$2(props, _excluded$1$1);

    var styleProps = objectFilter(rest, function (_, prop) {
      return isStyleProp(prop);
    });
    var finalBaseStyle = runIfFn(baseStyle, props);
    var finalStyles = Object.assign({}, __css, finalBaseStyle, filterUndefined(styleProps), sx);
    var computedCSS = css$1(finalStyles)(props.theme);
    return cssProp ? [computedCSS, cssProp] : computedCSS;
  };
};
function styled(component, options) {
  var _ref2 = options != null ? options : {},
      baseStyle = _ref2.baseStyle,
      styledOptions = _objectWithoutPropertiesLoose$2(_ref2, _excluded2);

  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp;
  }

  var styleObject = toCSSObject({
    baseStyle: baseStyle
  });
  return newStyled(component, styledOptions)(styleObject);
}
var chakra = styled;
domElements.forEach(function (tag) {
  chakra[tag] = chakra(tag);
});

/**
 * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
 * for creating the base type definitions upon which we improved on
 */
function forwardRef(component) {
  return /*#__PURE__*/react.forwardRef(component);
}

var _excluded$2 = ["styleConfig"];
function useStyleConfig(themeKey, props, opts) {
  var _styleConfig$defaultP;

  if (props === void 0) {
    props = {};
  }

  if (opts === void 0) {
    opts = {};
  }

  var _props = props,
      styleConfigProp = _props.styleConfig,
      rest = _objectWithoutPropertiesLoose$2(_props, _excluded$2);

  var _useChakra = useChakra(),
      theme = _useChakra.theme,
      colorMode = _useChakra.colorMode;

  var themeStyleConfig = memoizedGet(theme, "components." + themeKey);
  var styleConfig = styleConfigProp || themeStyleConfig;
  var mergedProps = lodash_mergewith({
    theme: theme,
    colorMode: colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, filterUndefined(omit(rest, ["children"])));
  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */

  var stylesRef = react.useRef({});

  if (styleConfig) {
    var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes, _opts;

    var baseStyles = runIfFn((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
    var variants = runIfFn((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
    var sizes = runIfFn((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
    var styles = lodash_mergewith({}, baseStyles, sizes, variants);

    if ((_opts = opts) != null && _opts.isMultiPart && styleConfig.parts) {
      styleConfig.parts.forEach(function (part) {
        var _styles$part;

        styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
      });
    }

    var isStyleEqual = reactFastCompare(stylesRef.current, styles);

    if (!isStyleEqual) {
      stylesRef.current = styles;
    }
  }

  return stylesRef.current;
}
function useMultiStyleConfig(themeKey, props) {
  return useStyleConfig(themeKey, props, {
    isMultiPart: true
  });
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
var ChakraProvider = function ChakraProvider(props) {
  var children = props.children,
      colorModeManager = props.colorModeManager,
      portalZIndex = props.portalZIndex,
      _props$resetCSS = props.resetCSS,
      resetCSS = _props$resetCSS === void 0 ? true : _props$resetCSS,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme,
      environment = props.environment,
      cssVarsRoot = props.cssVarsRoot;

  var _children = /*#__PURE__*/react.createElement(EnvironmentProvider, {
    environment: environment
  }, children);

  return /*#__PURE__*/react.createElement(IdProvider, null, /*#__PURE__*/react.createElement(ThemeProvider$1, {
    theme: theme,
    cssVarsRoot: cssVarsRoot
  }, /*#__PURE__*/react.createElement(ColorModeProvider, {
    colorModeManager: colorModeManager,
    options: theme.config
  }, resetCSS && /*#__PURE__*/react.createElement(CSSReset$1, null), /*#__PURE__*/react.createElement(GlobalStyle, null), portalZIndex ? /*#__PURE__*/react.createElement(PortalManager, {
    zIndex: portalZIndex
  }, _children) : _children)));
};

/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return Number(n) * 100 + "%";
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}

// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # appened.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # appened.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(" + r + ", " + g + ", " + b + ")" : "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")";
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return Math.round(bound01(x, 255) * 100) + "%"; };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
        return this.a === 1
            ? "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
            : "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")";
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
        ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());

// randomColor by David Merfield under the CC0 license
function random(options) {
    if (options === void 0) { options = {}; }
    // Check if we need to generate multiple colors
    if (options.count !== undefined &&
        options.count !== null) {
        var totalColors = options.count;
        var colors = [];
        options.count = undefined;
        while (totalColors > colors.length) {
            // Since we're generating multiple colors,
            // incremement the seed. Otherwise we'd just
            // generate the same color each time...
            options.count = null;
            if (options.seed) {
                options.seed += 1;
            }
            colors.push(random(options));
        }
        options.count = totalColors;
        return colors;
    }
    // First we pick a hue (H)
    var h = pickHue(options.hue, options.seed);
    // Then use H to determine saturation (S)
    var s = pickSaturation(h, options);
    // Then use S and H to determine brightness (B).
    var v = pickBrightness(h, s, options);
    var res = { h: h, s: s, v: v };
    if (options.alpha !== undefined) {
        res.a = options.alpha;
    }
    // Then we return the HSB color in the desired format
    return new TinyColor(res);
}
function pickHue(hue, seed) {
    var hueRange = getHueRange(hue);
    var res = randomWithin(hueRange, seed);
    // Instead of storing red as two seperate ranges,
    // we group them, using negative numbers
    if (res < 0) {
        res = 360 + res;
    }
    return res;
}
function pickSaturation(hue, options) {
    if (options.hue === 'monochrome') {
        return 0;
    }
    if (options.luminosity === 'random') {
        return randomWithin([0, 100], options.seed);
    }
    var saturationRange = getColorInfo(hue).saturationRange;
    var sMin = saturationRange[0];
    var sMax = saturationRange[1];
    switch (options.luminosity) {
        case 'bright':
            sMin = 55;
            break;
        case 'dark':
            sMin = sMax - 10;
            break;
        case 'light':
            sMax = 55;
            break;
    }
    return randomWithin([sMin, sMax], options.seed);
}
function pickBrightness(H, S, options) {
    var bMin = getMinimumBrightness(H, S);
    var bMax = 100;
    switch (options.luminosity) {
        case 'dark':
            bMax = bMin + 20;
            break;
        case 'light':
            bMin = (bMax + bMin) / 2;
            break;
        case 'random':
            bMin = 0;
            bMax = 100;
            break;
    }
    return randomWithin([bMin, bMax], options.seed);
}
function getMinimumBrightness(H, S) {
    var lowerBounds = getColorInfo(H).lowerBounds;
    for (var i = 0; i < lowerBounds.length - 1; i++) {
        var s1 = lowerBounds[i][0];
        var v1 = lowerBounds[i][1];
        var s2 = lowerBounds[i + 1][0];
        var v2 = lowerBounds[i + 1][1];
        if (S >= s1 && S <= s2) {
            var m = (v2 - v1) / (s2 - s1);
            var b = v1 - m * s1;
            return m * S + b;
        }
    }
    return 0;
}
function getHueRange(colorInput) {
    var num = parseInt(colorInput, 10);
    if (!Number.isNaN(num) && num < 360 && num > 0) {
        return [num, num];
    }
    if (typeof colorInput === 'string') {
        var namedColor = bounds.find(function (n) { return n.name === colorInput; });
        if (namedColor) {
            var color = defineColor(namedColor);
            if (color.hueRange) {
                return color.hueRange;
            }
        }
        var parsed = new TinyColor(colorInput);
        if (parsed.isValid) {
            var hue = parsed.toHsv().h;
            return [hue, hue];
        }
    }
    return [0, 360];
}
function getColorInfo(hue) {
    // Maps red colors to make picking hue easier
    if (hue >= 334 && hue <= 360) {
        hue -= 360;
    }
    for (var _i = 0, bounds_1 = bounds; _i < bounds_1.length; _i++) {
        var bound = bounds_1[_i];
        var color = defineColor(bound);
        if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
            return color;
        }
    }
    throw Error('Color not found');
}
function randomWithin(range, seed) {
    if (seed === undefined) {
        return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]));
    }
    // Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    var max = range[1] || 1;
    var min = range[0] || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280.0;
    return Math.floor(min + rnd * (max - min));
}
function defineColor(bound) {
    var sMin = bound.lowerBounds[0][0];
    var sMax = bound.lowerBounds[bound.lowerBounds.length - 1][0];
    var bMin = bound.lowerBounds[bound.lowerBounds.length - 1][1];
    var bMax = bound.lowerBounds[0][1];
    return {
        name: bound.name,
        hueRange: bound.hueRange,
        lowerBounds: bound.lowerBounds,
        saturationRange: [sMin, sMax],
        brightnessRange: [bMin, bMax],
    };
}
/**
 * @hidden
 */
var bounds = [
    {
        name: 'monochrome',
        hueRange: null,
        lowerBounds: [
            [0, 0],
            [100, 0],
        ],
    },
    {
        name: 'red',
        hueRange: [-26, 18],
        lowerBounds: [
            [20, 100],
            [30, 92],
            [40, 89],
            [50, 85],
            [60, 78],
            [70, 70],
            [80, 60],
            [90, 55],
            [100, 50],
        ],
    },
    {
        name: 'orange',
        hueRange: [19, 46],
        lowerBounds: [
            [20, 100],
            [30, 93],
            [40, 88],
            [50, 86],
            [60, 85],
            [70, 70],
            [100, 70],
        ],
    },
    {
        name: 'yellow',
        hueRange: [47, 62],
        lowerBounds: [
            [25, 100],
            [40, 94],
            [50, 89],
            [60, 86],
            [70, 84],
            [80, 82],
            [90, 80],
            [100, 75],
        ],
    },
    {
        name: 'green',
        hueRange: [63, 178],
        lowerBounds: [
            [30, 100],
            [40, 90],
            [50, 85],
            [60, 81],
            [70, 74],
            [80, 64],
            [90, 50],
            [100, 40],
        ],
    },
    {
        name: 'blue',
        hueRange: [179, 257],
        lowerBounds: [
            [20, 100],
            [30, 86],
            [40, 80],
            [50, 74],
            [60, 60],
            [70, 52],
            [80, 44],
            [90, 39],
            [100, 35],
        ],
    },
    {
        name: 'purple',
        hueRange: [258, 282],
        lowerBounds: [
            [20, 100],
            [30, 87],
            [40, 79],
            [50, 70],
            [60, 65],
            [70, 59],
            [80, 52],
            [90, 45],
            [100, 42],
        ],
    },
    {
        name: 'pink',
        hueRange: [283, 334],
        lowerBounds: [
            [20, 100],
            [30, 90],
            [40, 86],
            [60, 84],
            [80, 80],
            [90, 75],
            [100, 73],
        ],
    },
];

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */

var getColor = function getColor(theme, color, fallback) {
  var hex = memoizedGet(theme, "colors." + color, color);

  var _TinyColor = new TinyColor(hex),
      isValid = _TinyColor.isValid;

  return isValid ? hex : fallback;
};
/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var tone = function tone(color) {
  return function (theme) {
    var hex = getColor(theme, color);
    var isDark = new TinyColor(hex).isDark();
    return isDark ? "dark" : "light";
  };
};
/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var isDark = function isDark(color) {
  return function (theme) {
    return tone(color)(theme) === "dark";
  };
};
/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 */

var transparentize = function transparentize(color, opacity) {
  return function (theme) {
    var raw = getColor(theme, color);
    return new TinyColor(raw).setAlpha(opacity).toRgbString();
  };
};
function generateStripe(size, color) {
  if (size === void 0) {
    size = "1rem";
  }

  if (color === void 0) {
    color = "rgba(255, 255, 255, 0.15)";
  }

  return {
    backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
    backgroundSize: size + " " + size
  };
}
function randomColor(opts) {
  var fallback = random().toHexString();

  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
}

function randomColorFromString(str) {
  var hash = 0;
  if (str.length === 0) return hash.toString();

  for (var i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  var color = "#";

  for (var j = 0; j < 3; j += 1) {
    var value = hash >> j * 8 & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

function randomColorFromList(str, list) {
  var index = 0;
  if (str.length === 0) return list[0];

  for (var i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }

  index = (index % list.length + list.length) % list.length;
  return list[index];
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function mode(light, dark) {
  return function (props) {
    return props.colorMode === "dark" ? dark : light;
  };
}
function orient(options) {
  var orientation = options.orientation,
      vertical = options.vertical,
      horizontal = options.horizontal;
  if (!orientation) return {};
  return orientation === "vertical" ? vertical : horizontal;
}

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
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

  return _extends$3.apply(this, arguments);
}

var createBreakpoints = function createBreakpoints(config) {
  warn({
    condition: true,
    message: ["[chakra-ui]: createBreakpoints(...) will be deprecated pretty soon", "simply pass the breakpoints as an object. Remove the createBreakpoint(..) call"].join("")
  });
  return _extends$3({
    base: "0em"
  }, config);
};

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

/**
 * Used to define the anatomy/parts of a component in a way that provides
 * a consistent API for `className`, css selector and `theming`.
 */

var Anatomy = /*#__PURE__*/function () {
  function Anatomy(name) {
    var _this = this;

    this.map = {};
    this.called = false;

    this.assert = function () {
      if (!_this.called) {
        _this.called = true;
        return;
      }

      throw new Error("[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?");
    };

    this.parts = function () {
      _this.assert();

      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      for (var _i = 0, _values = values; _i < _values.length; _i++) {
        var part = _values[_i];
        _this.map[part] = _this.toPart(part);
      }

      return _this;
    };

    this.extend = function () {
      for (var _len2 = arguments.length, parts = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        parts[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _parts = parts; _i2 < _parts.length; _i2++) {
        var part = _parts[_i2];
        if (part in _this.map) continue;
        _this.map[part] = _this.toPart(part);
      }

      return _this;
    };

    this.toPart = function (part) {
      var el = ["container", "root"].includes(part != null ? part : "") ? [_this.name] : [_this.name, part];
      var attr = el.filter(Boolean).join("__");
      var className = "chakra-" + attr;
      var partObj = {
        className: className,
        selector: "." + className,
        toString: function toString() {
          return part;
        }
      };
      return partObj;
    };

    this.__type = {};
  }
  /**
   * Prevents user from calling `.parts` multiple times.
   * It should only be called once.
   */


  _createClass(Anatomy, [{
    key: "selectors",
    get:
    /**
     * Get all selectors for the component anatomy
     */
    function get() {
      var value = fromEntries(Object.entries(this.map).map(function (_ref) {
        var key = _ref[0],
            part = _ref[1];
        return [key, part.selector];
      }));
      return value;
    }
    /**
     * Get all classNames for the component anatomy
     */

  }, {
    key: "classNames",
    get: function get() {
      var value = fromEntries(Object.entries(this.map).map(function (_ref2) {
        var key = _ref2[0],
            part = _ref2[1];
        return [key, part.className];
      }));
      return value;
    }
    /**
     * Get all parts as array of string
     */

  }, {
    key: "keys",
    get: function get() {
      return Object.keys(this.map);
    }
    /**
     * Creates the part object for the given part
     */

  }]);

  return Anatomy;
}();
function anatomy(name) {
  return new Anatomy(name);
}

function toRef(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }

  return String(operand);
}

var toExpr = function toExpr(operator) {
  for (var _len = arguments.length, operands = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    operands[_key - 1] = arguments[_key];
  }

  return operands.map(toRef).join(" " + operator + " ").replace(/calc/g, "");
};

var _add$1 = function add() {
  for (var _len2 = arguments.length, operands = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    operands[_key2] = arguments[_key2];
  }

  return "calc(" + toExpr.apply(void 0, ["+"].concat(operands)) + ")";
};

var _subtract$1 = function subtract() {
  for (var _len3 = arguments.length, operands = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    operands[_key3] = arguments[_key3];
  }

  return "calc(" + toExpr.apply(void 0, ["-"].concat(operands)) + ")";
};

var _multiply$1 = function multiply() {
  for (var _len4 = arguments.length, operands = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    operands[_key4] = arguments[_key4];
  }

  return "calc(" + toExpr.apply(void 0, ["*"].concat(operands)) + ")";
};

var _divide$1 = function divide() {
  for (var _len5 = arguments.length, operands = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    operands[_key5] = arguments[_key5];
  }

  return "calc(" + toExpr.apply(void 0, ["/"].concat(operands)) + ")";
};

var _negate$1 = function negate(x) {
  var value = toRef(x);

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : "-" + value;
  }

  return _multiply$1(value, -1);
};

var calc$1 = Object.assign(function (x) {
  return {
    add: function add() {
      for (var _len6 = arguments.length, operands = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        operands[_key6] = arguments[_key6];
      }

      return calc$1(_add$1.apply(void 0, [x].concat(operands)));
    },
    subtract: function subtract() {
      for (var _len7 = arguments.length, operands = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        operands[_key7] = arguments[_key7];
      }

      return calc$1(_subtract$1.apply(void 0, [x].concat(operands)));
    },
    multiply: function multiply() {
      for (var _len8 = arguments.length, operands = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        operands[_key8] = arguments[_key8];
      }

      return calc$1(_multiply$1.apply(void 0, [x].concat(operands)));
    },
    divide: function divide() {
      for (var _len9 = arguments.length, operands = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        operands[_key9] = arguments[_key9];
      }

      return calc$1(_divide$1.apply(void 0, [x].concat(operands)));
    },
    negate: function negate() {
      return calc$1(_negate$1(x));
    },
    toString: function toString() {
      return x.toString();
    }
  };
}, {
  add: _add$1,
  subtract: _subtract$1,
  multiply: _multiply$1,
  divide: _divide$1,
  negate: _negate$1
});

function isDecimal(value) {
  return !Number.isInteger(parseFloat(value.toString()));
}

function replaceWhiteSpace$1(value, replaceValue) {
  if (replaceValue === void 0) {
    replaceValue = "-";
  }

  return value.replace(/\s+/g, replaceValue);
}

function escape$1(value) {
  var valueStr = replaceWhiteSpace$1(value.toString());
  if (valueStr.includes("\\.")) return value;
  return isDecimal(value) ? valueStr.replace(".", "\\.") : value;
}

function addPrefix$1(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return [prefix, escape$1(value)].filter(Boolean).join("-");
}
function toVarRef(name, fallback) {
  return "var(" + escape$1(name) + (fallback ? ", " + fallback : "") + ")";
}
function toVar(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return "--" + addPrefix$1(value, prefix);
}
function cssVar$1(name, options) {
  var cssVariable = toVar(name, options == null ? void 0 : options.prefix);
  return {
    variable: cssVariable,
    reference: toVarRef(cssVariable, getFallback(options == null ? void 0 : options.fallback))
  };
}

function getFallback(fallback) {
  if (typeof fallback === "string") return fallback;
  return fallback == null ? void 0 : fallback.reference;
}

/**
 * **Accordion anatomy**
 * - Item: the accordion item contains the button and panel
 * - Button: the button is the trigger for the panel
 * - Panel: the panel is the content of the accordion item
 * - Icon: the expanded/collapsed icon
 */

var accordionAnatomy = anatomy("accordion").parts("container", "item", "button", "panel").extend("icon");
/**
 * **Alert anatomy**
 * - Title: the alert's title
 * - Description: the alert's description
 * - Icon: the alert's icon
 */

var alertAnatomy = anatomy("alert").parts("title", "description", "container").extend("icon");
/**
 * **Avatar anatomy**
 * - Container: the container for the avatar
 * - Label: the avatar initials text
 * - Excess Label: the label or text that represents excess avatar count.
 * Typically used in avatar groups.
 * - Group: the container for the avatar group
 */

var avatarAnatomy = anatomy("avatar").parts("label", "badge", "container").extend("excessLabel", "group");
/**
 * **Breadcrumb anatomy**
 * - Item: the container for a breadcrumb item
 * - Link: the element that represents the breadcrumb link
 * - Container: the container for the breadcrumb items
 * - Separator: the separator between breadcrumb items
 */

var breadcrumbAnatomy = anatomy("breadcrumb").parts("link", "item", "container").extend("separator");
var buttonAnatomy = anatomy("button").parts();
var checkboxAnatomy = anatomy("checkbox").parts("control", "icon", "container").extend("label");
var circularProgressAnatomy = anatomy("progress").parts("track", "filledTrack").extend("label");
var drawerAnatomy = anatomy("drawer").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var editableAnatomy = anatomy("editable").parts("preview", "input");
var formAnatomy = anatomy("form").parts("container", "requiredIndicator", "helperText");
var formErrorAnatomy = anatomy("formError").parts("text", "icon");
var inputAnatomy = anatomy("input").parts("addon", "field", "element");
var listAnatomy = anatomy("list").parts("container", "item", "icon");
var menuAnatomy = anatomy("menu").parts("button", "list", "item").extend("groupTitle", "command", "divider");
var modalAnatomy = anatomy("modal").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var numberInputAnatomy = anatomy("numberinput").parts("root", "field", "stepperGroup", "stepper");
var pinInputAnatomy = anatomy("pininput").parts("field");
var popoverAnatomy = anatomy("popover").parts("content", "header", "body", "footer").extend("popper", "arrow", "closeButton");
var progressAnatomy = anatomy("progress").parts("label", "filledTrack", "track");
var radioAnatomy = anatomy("radio").parts("container", "control", "label");
var selectAnatomy = anatomy("select").parts("field", "icon");
var sliderAnatomy = anatomy("slider").parts("container", "track", "thumb", "filledTrack");
var statAnatomy = anatomy("stat").parts("container", "label", "helpText", "number", "icon");
var switchAnatomy = anatomy("switch").parts("container", "track", "thumb");
var tableAnatomy = anatomy("table").parts("table", "thead", "tbody", "tr", "th", "td", "tfoot", "caption");
var tabsAnatomy = anatomy("tabs").parts("root", "tab", "tablist", "tabpanel", "tabpanels", "indicator");
/**
 * **Tag anatomy**
 * - Container: the container for the tag
 * - Label: the text content of the tag
 * - closeButton: the close button for the tag
 */

var tagAnatomy = anatomy("tag").parts("container", "label", "closeButton");

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
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

  return _extends$4.apply(this, arguments);
}

var baseStyleContainer$3 = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
};
var baseStyleButton$1 = {
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: 4,
  py: 2
};
var baseStylePanel = {
  pt: 2,
  px: 4,
  pb: 5
};
var baseStyleIcon$5 = {
  fontSize: "1.25em"
};
var baseStyle$D = {
  container: baseStyleContainer$3,
  button: baseStyleButton$1,
  panel: baseStylePanel,
  icon: baseStyleIcon$5
};
var Accordion = {
  parts: accordionAnatomy.keys,
  baseStyle: baseStyle$D
};

var baseStyle$C = {
  container: {
    px: 4,
    py: 3
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    marginEnd: 2
  },
  description: {
    lineHeight: 6
  },
  icon: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6
  }
};

function getBg(props) {
  var theme = props.theme,
      c = props.colorScheme;
  var lightBg = getColor(theme, c + ".100", c);
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return mode(lightBg, darkBg)(props);
}

var variantSubtle$1 = function variantSubtle(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
};

var variantLeftAccent = function variantLeftAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: "4px",
      borderStartColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
};

var variantTopAccent = function variantTopAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      pt: 2,
      borderTopWidth: "4px",
      borderTopColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
};

var variantSolid$3 = function variantSolid(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    }
  };
};

var variants$b = {
  subtle: variantSubtle$1,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid$3
};
var defaultProps$n = {
  variant: "subtle",
  colorScheme: "blue"
};
var Alert = {
  parts: alertAnatomy.keys,
  baseStyle: baseStyle$C,
  variants: variants$b,
  defaultProps: defaultProps$n
};

var spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};
/**
 * @deprecated
 * Spacing tokens are a part of DefaultChakraTheme['sizes']
 */

var largeSizes = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

var sizes$l = _extends$4({}, spacing, largeSizes, {
  container: container
});
/**
 * @deprecated
 * You can derive the Sizes type from the DefaultChakraTheme
 *
 * type Sizes = DefaultChakraTheme['sizes']
 */


var sizes$m = sizes$l;

var baseStyleBadge = function baseStyleBadge(props) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props)
  };
};

var baseStyleExcessLabel = function baseStyleExcessLabel(props) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props)
  };
};

var baseStyleContainer$2 = function baseStyleContainer(props) {
  var name = props.name,
      theme = props.theme;
  var bg = name ? randomColor({
    string: name
  }) : "gray.400";
  var isBgDark = isDark(bg)(theme);
  var color = "white";
  if (!isBgDark) color = "gray.800";
  var borderColor = mode("white", "gray.800")(props);
  return {
    bg: bg,
    color: color,
    borderColor: borderColor,
    verticalAlign: "top"
  };
};

var baseStyle$B = function baseStyle(props) {
  return {
    badge: baseStyleBadge(props),
    excessLabel: baseStyleExcessLabel(props),
    container: baseStyleContainer$2(props)
  };
};

function getSize$3(size) {
  var themeSize = sizes$m[size];
  return {
    container: {
      width: size,
      height: size,
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)"
    },
    excessLabel: {
      width: size,
      height: size
    },
    label: {
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)",
      lineHeight: size !== "100%" ? themeSize != null ? themeSize : size : undefined
    }
  };
}

var sizes$k = {
  "2xs": getSize$3("4"),
  xs: getSize$3("6"),
  sm: getSize$3("8"),
  md: getSize$3("12"),
  lg: getSize$3("16"),
  xl: getSize$3("24"),
  "2xl": getSize$3("32"),
  full: getSize$3("100%")
};
var defaultProps$m = {
  size: "md"
};
var Avatar = {
  parts: avatarAnatomy.keys,
  baseStyle: baseStyle$B,
  sizes: sizes$k,
  defaultProps: defaultProps$m
};

var baseStyle$A = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
};

var variantSolid$2 = function variantSolid(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var dark = transparentize(c + ".500", 0.6)(theme);
  return {
    bg: mode(c + ".500", dark)(props),
    color: mode("white", "whiteAlpha.800")(props)
  };
};

var variantSubtle = function variantSubtle(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return {
    bg: mode(c + ".100", darkBg)(props),
    color: mode(c + ".800", c + ".200")(props)
  };
};

var variantOutline$2 = function variantOutline(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkColor = transparentize(c + ".200", 0.8)(theme);
  var lightColor = getColor(theme, c + ".500");
  var color = mode(lightColor, darkColor)(props);
  return {
    color: color,
    boxShadow: "inset 0 0 0px 1px " + color
  };
};

var variants$a = {
  solid: variantSolid$2,
  subtle: variantSubtle,
  outline: variantOutline$2
};
var defaultProps$l = {
  variant: "subtle",
  colorScheme: "gray"
};
var Badge = {
  baseStyle: baseStyle$A,
  variants: variants$a,
  defaultProps: defaultProps$l
};

var baseStyleLink = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyle$z = {
  link: baseStyleLink
};
var Breadcrumb = {
  parts: breadcrumbAnatomy.keys,
  baseStyle: baseStyle$z
};

var baseStyle$y = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focus: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
};

var variantGhost = function variantGhost(props) {
  var c = props.colorScheme,
      theme = props.theme;

  if (c === "gray") {
    return {
      color: mode("inherit", "whiteAlpha.900")(props),
      _hover: {
        bg: mode("gray.100", "whiteAlpha.200")(props)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      }
    };
  }

  var darkHoverBg = transparentize(c + ".200", 0.12)(theme);
  var darkActiveBg = transparentize(c + ".200", 0.24)(theme);
  return {
    color: mode(c + ".600", c + ".200")(props),
    bg: "transparent",
    _hover: {
      bg: mode(c + ".50", darkHoverBg)(props)
    },
    _active: {
      bg: mode(c + ".100", darkActiveBg)(props)
    }
  };
};

var variantOutline$1 = function variantOutline(props) {
  var c = props.colorScheme;
  var borderColor = mode("gray.200", "whiteAlpha.300")(props);
  return _extends$4({
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor"
  }, variantGhost(props));
};

/** Accessible color overrides for less accessible colors. */
var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};

var variantSolid$1 = function variantSolid(props) {
  var _accessibleColorMap$c;

  var c = props.colorScheme;

  if (c === "gray") {
    var _bg = mode("gray.100", "whiteAlpha.200")(props);

    return {
      bg: _bg,
      _hover: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
        _disabled: {
          bg: _bg
        }
      },
      _active: {
        bg: mode("gray.300", "whiteAlpha.400")(props)
      }
    };
  }

  var _ref = (_accessibleColorMap$c = accessibleColorMap[c]) != null ? _accessibleColorMap$c : {},
      _ref$bg = _ref.bg,
      bg = _ref$bg === void 0 ? c + ".500" : _ref$bg,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "white" : _ref$color,
      _ref$hoverBg = _ref.hoverBg,
      hoverBg = _ref$hoverBg === void 0 ? c + ".600" : _ref$hoverBg,
      _ref$activeBg = _ref.activeBg,
      activeBg = _ref$activeBg === void 0 ? c + ".700" : _ref$activeBg;

  var background = mode(bg, c + ".200")(props);
  return {
    bg: background,
    color: mode(color, "gray.800")(props),
    _hover: {
      bg: mode(hoverBg, c + ".300")(props),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: mode(activeBg, c + ".400")(props)
    }
  };
};

var variantLink = function variantLink(props) {
  var c = props.colorScheme;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(c + ".500", c + ".200")(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(c + ".700", c + ".500")(props)
    }
  };
};

var variantUnstyled$2 = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0
};
var variants$9 = {
  ghost: variantGhost,
  outline: variantOutline$1,
  solid: variantSolid$1,
  link: variantLink,
  unstyled: variantUnstyled$2
};
var sizes$j = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2
  }
};
var defaultProps$k = {
  variant: "solid",
  size: "md",
  colorScheme: "gray"
};
var Button = {
  baseStyle: baseStyle$y,
  variants: variants$9,
  sizes: sizes$j,
  defaultProps: defaultProps$k
};

var baseStyleControl$1 = function baseStyleControl(props) {
  var c = props.colorScheme;
  return {
    w: "100%",
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(c + ".600", c + ".300")(props),
        borderColor: mode(c + ".600", c + ".300")(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
};

var baseStyleLabel$3 = {
  userSelect: "none",
  _disabled: {
    opacity: 0.4
  }
};
var baseStyleIcon$4 = {
  transitionProperty: "transform",
  transitionDuration: "normal"
};

var baseStyle$x = function baseStyle(props) {
  return {
    icon: baseStyleIcon$4,
    control: baseStyleControl$1(props),
    label: baseStyleLabel$3
  };
};

var sizes$i = {
  sm: {
    control: {
      h: 3,
      w: 3
    },
    label: {
      fontSize: "sm"
    },
    icon: {
      fontSize: "0.45rem"
    }
  },
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    },
    icon: {
      fontSize: "0.625rem"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    },
    icon: {
      fontSize: "0.625rem"
    }
  }
};
var defaultProps$j = {
  size: "md",
  colorScheme: "blue"
};
var Checkbox = {
  parts: checkboxAnatomy.keys,
  baseStyle: baseStyle$x,
  sizes: sizes$i,
  defaultProps: defaultProps$j
};

var _lg$1, _md$1, _sm$1;
var $size$1 = cssVar$1("close-button-size");

var baseStyle$w = function baseStyle(props) {
  var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props);
  var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props);
  return {
    w: [$size$1.reference],
    h: [$size$1.reference],
    borderRadius: "md",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none"
    },
    _hover: {
      bg: hoverBg
    },
    _active: {
      bg: activeBg
    },
    _focus: {
      boxShadow: "outline"
    }
  };
};

var sizes$h = {
  lg: (_lg$1 = {}, _lg$1[$size$1.variable] = "40px", _lg$1.fontSize = "16px", _lg$1),
  md: (_md$1 = {}, _md$1[$size$1.variable] = "32px", _md$1.fontSize = "12px", _md$1),
  sm: (_sm$1 = {}, _sm$1[$size$1.variable] = "24px", _sm$1.fontSize = "10px", _sm$1)
};
var defaultProps$i = {
  size: "md"
};
var CloseButton = {
  baseStyle: baseStyle$w,
  sizes: sizes$h,
  defaultProps: defaultProps$i
};

var variants$8 = Badge.variants,
    defaultProps$h = Badge.defaultProps;
var baseStyle$v = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
};
var Code = {
  baseStyle: baseStyle$v,
  variants: variants$8,
  defaultProps: defaultProps$h
};

var baseStyle$u = {
  w: "100%",
  mx: "auto",
  maxW: "60ch",
  px: "1rem"
};
var Container$1 = {
  baseStyle: baseStyle$u
};

var baseStyle$t = {
  opacity: 0.6,
  borderColor: "inherit"
};
var variantSolid = {
  borderStyle: "solid"
};
var variantDashed = {
  borderStyle: "dashed"
};
var variants$7 = {
  solid: variantSolid,
  dashed: variantDashed
};
var defaultProps$g = {
  variant: "solid"
};
var Divider = {
  baseStyle: baseStyle$t,
  variants: variants$7,
  defaultProps: defaultProps$g
};

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */

function getSize$2(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        h: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var baseStyleOverlay$1 = {
  bg: "blackAlpha.600",
  zIndex: "overlay"
};
var baseStyleDialogContainer$1 = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
};

var baseStyleDialog$1 = function baseStyleDialog(props) {
  var isFullHeight = props.isFullHeight;
  return _extends$4({}, isFullHeight && {
    height: "100vh"
  }, {
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props)
  });
};

var baseStyleHeader$2 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton$3 = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};
var baseStyleBody$2 = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto"
};
var baseStyleFooter$2 = {
  px: 6,
  py: 4
};

var baseStyle$s = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay$1,
    dialogContainer: baseStyleDialogContainer$1,
    dialog: baseStyleDialog$1(props),
    header: baseStyleHeader$2,
    closeButton: baseStyleCloseButton$3,
    body: baseStyleBody$2,
    footer: baseStyleFooter$2
  };
};

var sizes$g = {
  xs: getSize$2("xs"),
  sm: getSize$2("md"),
  md: getSize$2("lg"),
  lg: getSize$2("2xl"),
  xl: getSize$2("4xl"),
  full: getSize$2("full")
};
var defaultProps$f = {
  size: "xs"
};
var Drawer = {
  parts: drawerAnatomy.keys,
  baseStyle: baseStyle$s,
  sizes: sizes$g,
  defaultProps: defaultProps$f
};

var baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transitionProperty: "common",
  transitionDuration: "normal"
};
var baseStyleInput = {
  borderRadius: "md",
  py: "3px",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focus: {
    boxShadow: "outline"
  },
  _placeholder: {
    opacity: 0.6
  }
};
var baseStyle$r = {
  preview: baseStylePreview,
  input: baseStyleInput
};
var Editable = {
  parts: editableAnatomy.keys,
  baseStyle: baseStyle$r
};

var baseStyleRequiredIndicator = function baseStyleRequiredIndicator(props) {
  return {
    marginStart: 1,
    color: mode("red.500", "red.300")(props)
  };
};

var baseStyleHelperText = function baseStyleHelperText(props) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm"
  };
};

var baseStyle$q = function baseStyle(props) {
  return {
    container: {
      width: "100%",
      position: "relative"
    },
    requiredIndicator: baseStyleRequiredIndicator(props),
    helperText: baseStyleHelperText(props)
  };
};

var Form = {
  parts: formAnatomy.keys,
  baseStyle: baseStyle$q
};

var baseStyle$p = {
  fontSize: "md",
  marginEnd: 3,
  mb: 2,
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
};
var FormLabel = {
  baseStyle: baseStyle$p
};

var baseStyle$o = {
  fontFamily: "heading",
  fontWeight: "bold"
};
var sizes$f = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1]
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2]
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2]
  },
  md: {
    fontSize: "xl",
    lineHeight: 1.2
  },
  sm: {
    fontSize: "md",
    lineHeight: 1.2
  },
  xs: {
    fontSize: "sm",
    lineHeight: 1.2
  }
};
var defaultProps$e = {
  size: "xl"
};
var Heading = {
  baseStyle: baseStyle$o,
  sizes: sizes$f,
  defaultProps: defaultProps$e
};

var baseStyle$n = {
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal"
  }
};
var size = {
  lg: {
    fontSize: "lg",
    px: 4,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    px: 4,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    px: 3,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "sm"
  }
};
var sizes$e = {
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  },
  xs: {
    field: size.xs,
    addon: size.xs
  }
};

function getDefaults(props) {
  var fc = props.focusBorderColor,
      ec = props.errorBorderColor;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}

var variantOutline = function variantOutline(props) {
  var theme = props.theme;

  var _getDefaults = getDefaults(props),
      fc = _getDefaults.focusBorderColor,
      ec = _getDefaults.errorBorderColor;

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0 0 0 1px " + getColor(theme, ec)
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: "0 0 0 1px " + getColor(theme, fc)
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
};

var variantFilled = function variantFilled(props) {
  var theme = props.theme;

  var _getDefaults2 = getDefaults(props),
      fc = _getDefaults2.focusBorderColor,
      ec = _getDefaults2.errorBorderColor;

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
};

var variantFlushed = function variantFlushed(props) {
  var theme = props.theme;

  var _getDefaults3 = getDefaults(props),
      fc = _getDefaults3.focusBorderColor,
      ec = _getDefaults3.errorBorderColor;

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, ec)
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, fc)
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent"
    }
  };
};

var variantUnstyled$1 = {
  field: {
    bg: "transparent",
    px: 0,
    height: "auto"
  },
  addon: {
    bg: "transparent",
    px: 0,
    height: "auto"
  }
};
var variants$6 = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var defaultProps$d = {
  size: "md",
  variant: "outline"
};
var Input = {
  parts: inputAnatomy.keys,
  baseStyle: baseStyle$n,
  sizes: sizes$e,
  variants: variants$6,
  defaultProps: defaultProps$d
};

var baseStyle$m = function baseStyle(props) {
  return {
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap"
  };
};

var Kbd = {
  baseStyle: baseStyle$m
};

var baseStyle$l = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var Link = {
  baseStyle: baseStyle$l
};

var baseStyleIcon$3 = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom"
};
var baseStyle$k = {
  container: {},
  item: {},
  icon: baseStyleIcon$3
};
var List = {
  parts: listAnatomy.keys,
  baseStyle: baseStyle$k
};

var baseStyleList = function baseStyleList(props) {
  return {
    bg: mode("#fff", "gray.700")(props),
    boxShadow: mode("sm", "dark-lg")(props),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px"
  };
};

var baseStyleItem = function baseStyleItem(props) {
  return {
    py: "0.4rem",
    px: "0.8rem",
    transitionProperty: "background",
    transitionDuration: "ultra-fast",
    transitionTimingFunction: "ease-in",
    _focus: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _active: {
      bg: mode("gray.200", "whiteAlpha.200")(props)
    },
    _expanded: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
};

var baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
};
var baseStyleCommand = {
  opacity: 0.6
};
var baseStyleDivider = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "0.5rem",
  opacity: 0.6
};
var baseStyleButton = {
  transitionProperty: "common",
  transitionDuration: "normal"
};

var baseStyle$j = function baseStyle(props) {
  return {
    button: baseStyleButton,
    list: baseStyleList(props),
    item: baseStyleItem(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  };
};

var Menu = {
  parts: menuAnatomy.keys,
  baseStyle: baseStyle$j
};

var baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "modal"
};

var baseStyleDialogContainer = function baseStyleDialogContainer(props) {
  var isCentered = props.isCentered,
      scrollBehavior = props.scrollBehavior;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto"
  };
};

var baseStyleDialog = function baseStyleDialog(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
    boxShadow: mode("lg", "dark-lg")(props)
  };
};

var baseStyleHeader$1 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton$2 = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};

var baseStyleBody$1 = function baseStyleBody(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined
  };
};

var baseStyleFooter$1 = {
  px: 6,
  py: 4
};

var baseStyle$i = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer(props),
    dialog: baseStyleDialog(props),
    header: baseStyleHeader$1,
    closeButton: baseStyleCloseButton$2,
    body: baseStyleBody$1(props),
    footer: baseStyleFooter$1
  };
};
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */


function getSize$1(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        minH: "100vh",
        my: 0
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var sizes$d = {
  xs: getSize$1("xs"),
  sm: getSize$1("sm"),
  md: getSize$1("md"),
  lg: getSize$1("lg"),
  xl: getSize$1("xl"),
  "2xl": getSize$1("2xl"),
  "3xl": getSize$1("3xl"),
  "4xl": getSize$1("4xl"),
  "5xl": getSize$1("5xl"),
  "6xl": getSize$1("6xl"),
  full: getSize$1("full")
};
var defaultProps$c = {
  size: "md"
};
var Modal = {
  parts: modalAnatomy.keys,
  baseStyle: baseStyle$i,
  sizes: sizes$d,
  defaultProps: defaultProps$c
};

var typography$1 = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    "short": 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    body: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    mono: "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};
/**
 * @deprecated
 * You can derive the Typography type from the DefaultChakraTheme
 *
 * type Typography = Pick<
 *   DefaultChakraTheme,
 *   | "letterSpacings"
 *   | "lineHeights"
 *   | "fontWeights"
 *   | "fonts"
 *   | "fontSizes"
 *  >
 */

var typography$1$1 = typography$1;

var _baseStyleRoot, _Input$baseStyle$fiel, _Input$baseStyle;
var variants$5 = Input.variants,
    defaultProps$b = Input.defaultProps;
var $stepperWidth = cssVar$1("number-input-stepper-width");
var $inputPadding = cssVar$1("number-input-input-padding");
var inputPaddingValue = calc$1($stepperWidth).add("0.5rem").toString();
var baseStyleRoot$1 = (_baseStyleRoot = {}, _baseStyleRoot[$stepperWidth.variable] = "24px", _baseStyleRoot[$inputPadding.variable] = inputPaddingValue, _baseStyleRoot);
var baseStyleField$1 = (_Input$baseStyle$fiel = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field) != null ? _Input$baseStyle$fiel : {};
var baseStyleStepperGroup = {
  width: [$stepperWidth.reference]
};

var baseStyleStepper = function baseStyleStepper(props) {
  return {
    borderStart: "1px solid",
    borderStartColor: mode("inherit", "whiteAlpha.300")(props),
    color: mode("inherit", "whiteAlpha.800")(props),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
};

var baseStyle$h = function baseStyle(props) {
  return {
    root: baseStyleRoot$1,
    field: baseStyleField$1,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props)
  };
};

function getSize(size) {
  var _sizeStyle$field$font, _sizeStyle$field;

  var sizeStyle = Input.sizes[size];
  var radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm"
  };

  var _fontSize = (_sizeStyle$field$font = (_sizeStyle$field = sizeStyle.field) == null ? void 0 : _sizeStyle$field.fontSize) != null ? _sizeStyle$field$font : "md";

  var fontSize = typography$1$1.fontSizes[_fontSize.toString()];

  return {
    field: _extends$4({}, sizeStyle.field, {
      paddingInlineEnd: $inputPadding.reference,
      verticalAlign: "top"
    }),
    stepper: {
      fontSize: calc$1(fontSize).multiply(0.75).toString(),
      _first: {
        borderTopEndRadius: radius[size]
      },
      _last: {
        borderBottomEndRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  };
}

var sizes$c = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg")
};
var NumberInput = {
  parts: numberInputAnatomy.keys,
  baseStyle: baseStyle$h,
  sizes: sizes$c,
  variants: variants$5,
  defaultProps: defaultProps$b
};

var _Input$variants$unsty$1;

var baseStyle$g = _extends$4({}, Input.baseStyle.field, {
  textAlign: "center"
});

var sizes$b = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm"
  }
};
var variants$4 = {
  outline: function outline(props) {
    var _Input$variants$outli;

    return (_Input$variants$outli = Input.variants.outline(props).field) != null ? _Input$variants$outli : {};
  },
  flushed: function flushed(props) {
    var _Input$variants$flush;

    return (_Input$variants$flush = Input.variants.flushed(props).field) != null ? _Input$variants$flush : {};
  },
  filled: function filled(props) {
    var _Input$variants$fille;

    return (_Input$variants$fille = Input.variants.filled(props).field) != null ? _Input$variants$fille : {};
  },
  unstyled: (_Input$variants$unsty$1 = Input.variants.unstyled.field) != null ? _Input$variants$unsty$1 : {}
};
var defaultProps$a = Input.defaultProps;
var PinInput = {
  baseStyle: baseStyle$g,
  sizes: sizes$b,
  variants: variants$4,
  defaultProps: defaultProps$a
};

var $popperBg = cssVar$1("popper-bg");
var $arrowBg$1 = cssVar$1("popper-arrow-bg");
var $arrowShadowColor = cssVar$1("popper-arrow-shadow-color");
var baseStylePopper = {
  zIndex: 10
};

var baseStyleContent = function baseStyleContent(props) {
  var _ref;

  var bg = mode("white", "gray.700")(props);
  var shadowColor = mode("gray.200", "whiteAlpha.300")(props);
  return _ref = {}, _ref[$popperBg.variable] = "colors." + bg, _ref.bg = $popperBg.reference, _ref[$arrowBg$1.variable] = $popperBg.reference, _ref[$arrowShadowColor.variable] = "colors." + shadowColor, _ref.width = "xs", _ref.border = "1px solid", _ref.borderColor = "inherit", _ref.borderRadius = "md", _ref.boxShadow = "sm", _ref.zIndex = "inherit", _ref._focus = {
    outline: 0,
    boxShadow: "outline"
  }, _ref;
};

var baseStyleHeader = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
};
var baseStyleBody = {
  px: 3,
  py: 2
};
var baseStyleFooter = {
  px: 3,
  py: 2,
  borderTopWidth: "1px"
};
var baseStyleCloseButton$1 = {
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2
};

var baseStyle$f = function baseStyle(props) {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: {},
    closeButton: baseStyleCloseButton$1
  };
};

var Popover = {
  parts: popoverAnatomy.keys,
  baseStyle: baseStyle$f
};

function filledStyle(props) {
  var c = props.colorScheme,
      t = props.theme,
      isIndeterminate = props.isIndeterminate,
      hasStripe = props.hasStripe;
  var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props);
  var bgColor = mode(c + ".500", c + ".200")(props);
  var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
  var addStripe = !isIndeterminate && hasStripe;
  return _extends$4({}, addStripe && stripeStyle, isIndeterminate ? {
    bgImage: gradient
  } : {
    bgColor: bgColor
  });
}

var baseStyleLabel$2 = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
};

var baseStyleTrack$2 = function baseStyleTrack(props) {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
};

var baseStyleFilledTrack$1 = function baseStyleFilledTrack(props) {
  return _extends$4({
    transitionProperty: "common",
    transitionDuration: "slow"
  }, filledStyle(props));
};

var baseStyle$e = function baseStyle(props) {
  return {
    label: baseStyleLabel$2,
    filledTrack: baseStyleFilledTrack$1(props),
    track: baseStyleTrack$2(props)
  };
};

var sizes$a = {
  xs: {
    track: {
      h: "0.25rem"
    }
  },
  sm: {
    track: {
      h: "0.5rem"
    }
  },
  md: {
    track: {
      h: "0.75rem"
    }
  },
  lg: {
    track: {
      h: "1rem"
    }
  }
};
var defaultProps$9 = {
  size: "md",
  colorScheme: "blue"
};
var Progress = {
  parts: progressAnatomy.keys,
  sizes: sizes$a,
  baseStyle: baseStyle$e,
  defaultProps: defaultProps$9
};

var baseStyleControl = function baseStyleControl(props) {
  var _Checkbox$baseStyle = Checkbox.baseStyle(props),
      _Checkbox$baseStyle$c = _Checkbox$baseStyle.control,
      control = _Checkbox$baseStyle$c === void 0 ? {} : _Checkbox$baseStyle$c;

  return _extends$4({}, control, {
    borderRadius: "full",
    _checked: _extends$4({}, control["_checked"], {
      _before: {
        content: "\"\"",
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    })
  });
};

var baseStyle$d = function baseStyle(props) {
  return {
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl(props)
  };
};

var sizes$9 = {
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    }
  },
  sm: {
    control: {
      width: 3,
      height: 3
    },
    label: {
      fontSize: "sm"
    }
  }
};
var defaultProps$8 = {
  size: "md",
  colorScheme: "blue"
};
var Radio = {
  parts: radioAnatomy.keys,
  baseStyle: baseStyle$d,
  sizes: sizes$9,
  defaultProps: defaultProps$8
};

var baseStyleField = function baseStyleField(props) {
  return _extends$4({}, Input.baseStyle.field, {
    bg: mode("white", "gray.700")(props),
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option, > optgroup": {
      bg: mode("white", "gray.700")(props)
    }
  });
};

var baseStyleIcon$2 = {
  width: "1.5rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5
  }
};

var baseStyle$c = function baseStyle(props) {
  return {
    field: baseStyleField(props),
    icon: baseStyleIcon$2
  };
};

var iconSpacing = {
  paddingInlineEnd: "2rem"
};
var sizes$8 = lodash_mergewith({}, Input.sizes, {
  lg: {
    field: iconSpacing
  },
  md: {
    field: iconSpacing
  },
  sm: {
    field: iconSpacing
  },
  xs: {
    field: iconSpacing,
    icon: {
      insetEnd: "0.25rem"
    }
  }
});
var Select = {
  parts: selectAnatomy.keys,
  baseStyle: baseStyle$c,
  sizes: sizes$8,
  variants: Input.variants,
  defaultProps: Input.defaultProps
};

var fade = function fade(startColor, endColor) {
  return keyframes({
    from: {
      borderColor: startColor,
      background: startColor
    },
    to: {
      borderColor: endColor,
      background: endColor
    }
  });
};

var baseStyle$b = function baseStyle(props) {
  var defaultStartColor = mode("gray.100", "gray.800")(props);
  var defaultEndColor = mode("gray.400", "gray.600")(props);
  var _props$startColor = props.startColor,
      startColor = _props$startColor === void 0 ? defaultStartColor : _props$startColor,
      _props$endColor = props.endColor,
      endColor = _props$endColor === void 0 ? defaultEndColor : _props$endColor,
      speed = props.speed,
      theme = props.theme;
  var start = getColor(theme, startColor);
  var end = getColor(theme, endColor);
  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: speed + "s linear infinite alternate " + fade(start, end)
  };
};

var Skeleton = {
  baseStyle: baseStyle$b
};

var baseStyle$a = function baseStyle(props) {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      insetStart: "1.5rem",
      bg: mode("white", "gray.700")(props)
    }
  };
};

var SkipLink = {
  baseStyle: baseStyle$a
};

function thumbOrientation(props) {
  return orient({
    orientation: props.orientation,
    vertical: {
      left: "50%",
      transform: "translateX(-50%)",
      _active: {
        transform: "translateX(-50%) scale(1.15)"
      }
    },
    horizontal: {
      top: "50%",
      transform: "translateY(-50%)",
      _active: {
        transform: "translateY(-50%) scale(1.15)"
      }
    }
  });
}

var baseStyleContainer$1 = function baseStyleContainer(props) {
  var orientation = props.orientation;
  return _extends$4({
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    }
  }, orient({
    orientation: orientation,
    vertical: {
      h: "100%"
    },
    horizontal: {
      w: "100%"
    }
  }));
};

var baseStyleTrack$1 = function baseStyleTrack(props) {
  return {
    overflow: "hidden",
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props)
    }
  };
};

var baseStyleThumb$1 = function baseStyleThumb(props) {
  return _extends$4({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  }, thumbOrientation(props));
};

var baseStyleFilledTrack = function baseStyleFilledTrack(props) {
  var c = props.colorScheme;
  return {
    width: "inherit",
    height: "inherit",
    bg: mode(c + ".500", c + ".200")(props)
  };
};

var baseStyle$9 = function baseStyle(props) {
  return {
    container: baseStyleContainer$1(props),
    track: baseStyleTrack$1(props),
    thumb: baseStyleThumb$1(props),
    filledTrack: baseStyleFilledTrack(props)
  };
};

var sizeLg = function sizeLg(props) {
  return {
    thumb: {
      w: "16px",
      h: "16px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
};

var sizeMd = function sizeMd(props) {
  return {
    thumb: {
      w: "14px",
      h: "14px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
};

var sizeSm = function sizeSm(props) {
  return {
    thumb: {
      w: "10px",
      h: "10px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "2px"
      },
      vertical: {
        w: "2px"
      }
    })
  };
};

var sizes$7 = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var defaultProps$7 = {
  size: "md",
  colorScheme: "blue"
};
var Slider = {
  parts: sliderAnatomy.keys,
  sizes: sizes$7,
  baseStyle: baseStyle$9,
  defaultProps: defaultProps$7
};

var _xs, _sm, _md, _lg, _xl;
var $size = cssVar$1("spinner-size");
var baseStyle$8 = {
  width: [$size.reference],
  height: [$size.reference]
};
var sizes$6 = {
  xs: (_xs = {}, _xs[$size.variable] = "0.75rem", _xs),
  sm: (_sm = {}, _sm[$size.variable] = "1rem", _sm),
  md: (_md = {}, _md[$size.variable] = "1.5rem", _md),
  lg: (_lg = {}, _lg[$size.variable] = "2rem", _lg),
  xl: (_xl = {}, _xl[$size.variable] = "3rem", _xl)
};
var defaultProps$6 = {
  size: "md"
};
var Spinner = {
  baseStyle: baseStyle$8,
  sizes: sizes$6,
  defaultProps: defaultProps$6
};

var baseStyleLabel$1 = {
  fontWeight: "medium"
};
var baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2
};
var baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold"
};
var baseStyleIcon$1 = {
  marginEnd: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle"
};
var baseStyle$7 = {
  container: {},
  label: baseStyleLabel$1,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon$1
};
var sizes$5 = {
  md: {
    label: {
      fontSize: "sm"
    },
    helpText: {
      fontSize: "sm"
    },
    number: {
      fontSize: "2xl"
    }
  }
};
var defaultProps$5 = {
  size: "md"
};
var Stat = {
  parts: statAnatomy.keys,
  baseStyle: baseStyle$7,
  sizes: sizes$5,
  defaultProps: defaultProps$5
};

var _container2, _container3, _container4;
var $width = cssVar$1("switch-track-width");
var $height = cssVar$1("switch-track-height");
var $diff = cssVar$1("switch-track-diff");
var diffValue = calc$1.subtract($width, $height);
var $translateX = cssVar$1("switch-thumb-x");

var baseStyleTrack = function baseStyleTrack(props) {
  var c = props.colorScheme;
  return {
    borderRadius: "full",
    p: "2px",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: mode(c + ".500", c + ".200")(props)
    }
  };
};

var baseStyleThumb = {
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: "translateX(" + $translateX.reference + ")"
  }
};

var baseStyle$6 = function baseStyle(props) {
  var _rtl, _container;

  return {
    container: (_container = {}, _container[$diff.variable] = diffValue, _container[$translateX.variable] = $diff.reference, _container._rtl = (_rtl = {}, _rtl[$translateX.variable] = calc$1($diff).negate().toString(), _rtl), _container),
    track: baseStyleTrack(props),
    thumb: baseStyleThumb
  };
};

var sizes$4 = {
  sm: {
    container: (_container2 = {}, _container2[$width.variable] = "1.375rem", _container2[$height.variable] = "0.75rem", _container2)
  },
  md: {
    container: (_container3 = {}, _container3[$width.variable] = "1.875rem", _container3[$height.variable] = "1rem", _container3)
  },
  lg: {
    container: (_container4 = {}, _container4[$width.variable] = "2.875rem", _container4[$height.variable] = "1.5rem", _container4)
  }
};
var defaultProps$4 = {
  size: "md",
  colorScheme: "blue"
};
var Switch = {
  parts: switchAnatomy.keys,
  baseStyle: baseStyle$6,
  sizes: sizes$4,
  defaultProps: defaultProps$4
};

var baseStyle$5 = {
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start"
  },
  td: {
    textAlign: "start"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
};
var numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "end"
  }
};

var variantSimple = function variantSimple(props) {
  var c = props.colorScheme;
  return {
    th: _extends$4({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends$4({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var variantStripe = function variantStripe(props) {
  var c = props.colorScheme;
  return {
    th: _extends$4({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends$4({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(c + ".100", c + ".700")(props)
          },
          td: {
            background: mode(c + ".100", c + ".700")(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var variants$3 = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: {}
};
var sizes$3 = {
  sm: {
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  },
  md: {
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  },
  lg: {
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  }
};
var defaultProps$3 = {
  variant: "simple",
  size: "md",
  colorScheme: "gray"
};
var Table = {
  parts: tableAnatomy.keys,
  baseStyle: baseStyle$5,
  variants: variants$3,
  sizes: sizes$3,
  defaultProps: defaultProps$3
};

var baseStyleRoot = function baseStyleRoot(props) {
  var orientation = props.orientation;
  return {
    display: orientation === "vertical" ? "flex" : "block"
  };
};

var baseStyleTab = function baseStyleTab(props) {
  var isFitted = props.isFitted;
  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focus: {
      zIndex: 1,
      boxShadow: "outline"
    }
  };
};

var baseStyleTablist = function baseStyleTablist(props) {
  var _props$align = props.align,
      align = _props$align === void 0 ? "start" : _props$align,
      orientation = props.orientation;
  var alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
};

var baseStyleTabpanel = {
  p: 4
};

var baseStyle$4 = function baseStyle(props) {
  return {
    root: baseStyleRoot(props),
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel
  };
};

var sizes$2 = {
  sm: {
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm"
    }
  },
  md: {
    tab: {
      fontSize: "md",
      py: 2,
      px: 4
    }
  },
  lg: {
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4
    }
  }
};

var variantLine = function variantLine(props) {
  var _tablist, _tab;

  var c = props.colorScheme,
      orientation = props.orientation;
  var isVertical = orientation === "vertical";
  var borderProp = orientation === "vertical" ? "borderStart" : "borderBottom";
  var marginProp = isVertical ? "marginStart" : "marginBottom";
  return {
    tablist: (_tablist = {}, _tablist[borderProp] = "2px solid", _tablist.borderColor = "inherit", _tablist),
    tab: (_tab = {}, _tab[borderProp] = "2px solid", _tab.borderColor = "transparent", _tab[marginProp] = "-2px", _tab._selected = {
      color: mode(c + ".600", c + ".300")(props),
      borderColor: "currentColor"
    }, _tab._active = {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    }, _tab._disabled = {
      opacity: 0.4,
      cursor: "not-allowed"
    }, _tab)
  };
};

var variantEnclosed = function variantEnclosed(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderBottomColor: mode("white", "gray.800")(props)
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
};

var variantEnclosedColored = function variantEnclosedColored(props) {
  var c = props.colorScheme;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode("gray.50", "whiteAlpha.50")(props),
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px"
      },
      _selected: {
        bg: mode("#fff", "gray.800")(props),
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
};

var variantSoftRounded = function variantSoftRounded(props) {
  var c = props.colorScheme,
      theme = props.theme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, c + ".700"),
        bg: getColor(theme, c + ".100")
      }
    }
  };
};

var variantSolidRounded = function variantSolidRounded(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props),
      _selected: {
        color: mode("#fff", "gray.800")(props),
        bg: mode(c + ".600", c + ".300")(props)
      }
    }
  };
};

var variantUnstyled = {};
var variants$2 = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled
};
var defaultProps$2 = {
  size: "md",
  variant: "line",
  colorScheme: "blue"
};
var Tabs = {
  parts: tabsAnatomy.keys,
  baseStyle: baseStyle$4,
  sizes: sizes$2,
  variants: variants$2,
  defaultProps: defaultProps$2
};

var baseStyleContainer = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyleLabel = {
  lineHeight: 1.2,
  overflow: "visible"
};
var baseStyleCloseButton = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "0.375rem",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
};
var baseStyle$3 = {
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton
};
var sizes$1 = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 2,
      borderRadius: "md"
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem"
    }
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2
    }
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3
    }
  }
};
var variants$1 = {
  subtle: function subtle(props) {
    return {
      container: Badge.variants.subtle(props)
    };
  },
  solid: function solid(props) {
    return {
      container: Badge.variants.solid(props)
    };
  },
  outline: function outline(props) {
    return {
      container: Badge.variants.outline(props)
    };
  }
};
var defaultProps$1 = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray"
};
var Tag = {
  parts: tagAnatomy.keys,
  variants: variants$1,
  baseStyle: baseStyle$3,
  sizes: sizes$1,
  defaultProps: defaultProps$1
};

var _Input$variants$unsty, _Input$sizes$xs$field, _Input$sizes$sm$field, _Input$sizes$md$field, _Input$sizes$lg$field;

var baseStyle$2 = _extends$4({}, Input.baseStyle.field, {
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
  verticalAlign: "top"
});

var variants = {
  outline: function outline(props) {
    var _Input$variants$outli;

    return (_Input$variants$outli = Input.variants.outline(props).field) != null ? _Input$variants$outli : {};
  },
  flushed: function flushed(props) {
    var _Input$variants$flush;

    return (_Input$variants$flush = Input.variants.flushed(props).field) != null ? _Input$variants$flush : {};
  },
  filled: function filled(props) {
    var _Input$variants$fille;

    return (_Input$variants$fille = Input.variants.filled(props).field) != null ? _Input$variants$fille : {};
  },
  unstyled: (_Input$variants$unsty = Input.variants.unstyled.field) != null ? _Input$variants$unsty : {}
};
var sizes = {
  xs: (_Input$sizes$xs$field = Input.sizes.xs.field) != null ? _Input$sizes$xs$field : {},
  sm: (_Input$sizes$sm$field = Input.sizes.sm.field) != null ? _Input$sizes$sm$field : {},
  md: (_Input$sizes$md$field = Input.sizes.md.field) != null ? _Input$sizes$md$field : {},
  lg: (_Input$sizes$lg$field = Input.sizes.lg.field) != null ? _Input$sizes$lg$field : {}
};
var defaultProps = {
  size: "md",
  variant: "outline"
};
var Textarea = {
  baseStyle: baseStyle$2,
  sizes: sizes,
  variants: variants,
  defaultProps: defaultProps
};

var $bg = cssVar$1("tooltip-bg");
var $arrowBg = cssVar$1("popper-arrow-bg");

var baseStyle$1 = function baseStyle(props) {
  var _ref;

  var bg = mode("gray.700", "gray.300")(props);
  return _ref = {}, _ref[$bg.variable] = "colors." + bg, _ref.px = "8px", _ref.py = "2px", _ref.bg = [$bg.reference], _ref[$arrowBg.variable] = [$bg.reference], _ref.color = mode("whiteAlpha.900", "gray.900")(props), _ref.borderRadius = "sm", _ref.fontWeight = "medium", _ref.fontSize = "sm", _ref.boxShadow = "md", _ref.maxW = "320px", _ref.zIndex = "tooltip", _ref;
};

var Tooltip = {
  baseStyle: baseStyle$1
};

var baseStyleText = function baseStyleText(props) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm"
  };
};

var baseStyleIcon = function baseStyleIcon(props) {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props)
  };
};

var baseStyle = function baseStyle(props) {
  return {
    text: baseStyleText(props),
    icon: baseStyleIcon(props)
  };
};

var FormError = {
  parts: formErrorAnatomy.keys,
  baseStyle: baseStyle
};

var components = {
  Accordion: Accordion,
  Alert: Alert,
  Avatar: Avatar,
  Badge: Badge,
  Breadcrumb: Breadcrumb,
  Button: Button,
  Checkbox: Checkbox,
  CloseButton: CloseButton,
  Code: Code,
  Container: Container$1,
  Divider: Divider,
  Drawer: Drawer,
  Editable: Editable,
  Form: Form,
  FormLabel: FormLabel,
  Heading: Heading,
  Input: Input,
  Kbd: Kbd,
  Link: Link,
  List: List,
  Menu: Menu,
  Modal: Modal,
  NumberInput: NumberInput,
  PinInput: PinInput,
  Popover: Popover,
  Progress: Progress,
  Radio: Radio,
  Select: Select,
  Skeleton: Skeleton,
  SkipLink: SkipLink,
  Slider: Slider,
  Spinner: Spinner,
  Stat: Stat,
  Switch: Switch,
  Table: Table,
  Tabs: Tabs,
  Tag: Tag,
  Textarea: Textarea,
  Tooltip: Tooltip,
  FormError: FormError
};

var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};
var borders$1 = borders;

/**
 * Breakpoints for responsive design
 */

var breakpoints$1 = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
});
var breakpoints$1$1 = breakpoints$1;

/**
 * @deprecated
 * You can derive the Colors type from the DefaultChakraTheme:
 *
 * type Colors = DefaultChakraTheme["colors"]
 */
var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};
var colors$1 = colors;

var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
/**
 * @deprecated
 * You can derive the Radii type from the DefaultChakraTheme
 *
 * type Radii = DefaultChakraTheme['radii']
 */

var radii$1 = radii;

var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};
/**
 * @deprecated
 * You can derive the Shadows type from the DefaultChakraTheme
 *
 * type Shadows = DefaultChakraTheme['shadows']
 */

var shadows$1 = shadows;

var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition$1 = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};
var transition$1$1 = transition$1;

var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
/**
 * @deprecated
 * You can derive the ZIndices type from the DefaultChakraTheme
 *
 * type ZIndices = DefaultChakraTheme['zIndices']
 */

var zIndices$1 = zIndices;

var blur = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
};
var blur$1 = blur;

var foundations = _extends$4({
  breakpoints: breakpoints$1$1,
  zIndices: zIndices$1,
  radii: radii$1,
  blur: blur$1,
  colors: colors$1
}, typography$1$1, {
  sizes: sizes$m,
  shadows: shadows$1,
  space: spacing,
  borders: borders$1,
  transition: transition$1$1
});

var foundations$1 = foundations;

var styles = {
  global: function global(props) {
    return {
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        transitionProperty: "background-color",
        transitionDuration: "normal",
        lineHeight: "base"
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props)
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word"
      }
    };
  }
};
var styles$1 = styles;

var requiredChakraThemeKeys = ["borders", "breakpoints", "colors", "components", "config", "direction", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "shadows", "sizes", "space", "styles", "transition", "zIndices"];
function isChakraTheme(unit) {
  if (!isObject(unit)) {
    return false;
  }

  return requiredChakraThemeKeys.every(function (propertyName) {
    return Object.prototype.hasOwnProperty.call(unit, propertyName);
  });
}

var direction = "ltr";
var config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra"
};
var theme = _extends$4({
  direction: direction
}, foundations$1, {
  components: components,
  styles: styles$1,
  config: config
});

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
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

  return _extends$5.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$3(source, excluded) {
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

var _excluded$3 = ["as", "viewBox", "color", "focusable", "children", "className", "__css"];
var fallbackIcon = {
  path: /*#__PURE__*/react.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/react.createElement("path", {
    strokeLinecap: "round",
    fill: "none",
    d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
  }), /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    strokeLinecap: "round",
    d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
  }), /*#__PURE__*/react.createElement("circle", {
    fill: "none",
    strokeMiterlimit: "10",
    cx: "12",
    cy: "12",
    r: "11.25"
  })),
  viewBox: "0 0 24 24"
};
var Icon = /*#__PURE__*/forwardRef(function (props, ref) {
  var element = props.as,
      viewBox = props.viewBox,
      _props$color = props.color,
      color = _props$color === void 0 ? "currentColor" : _props$color,
      _props$focusable = props.focusable,
      focusable = _props$focusable === void 0 ? false : _props$focusable,
      children = props.children,
      className = props.className,
      __css = props.__css,
      rest = _objectWithoutPropertiesLoose$3(props, _excluded$3);

  var _className = cx("chakra-icon", className);

  var styles = _extends$5({
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: color
  }, __css);

  var shared = {
    ref: ref,
    focusable: focusable,
    className: _className,
    __css: styles
  };

  var _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  /**
   * If you're using an icon library like `react-icons`.
   * Note: anyone passing the `as` prop, should manage the `viewBox` from the external component
   */


  if (element && typeof element !== "string") {
    return /*#__PURE__*/react.createElement(chakra.svg, _extends$5({
      as: element
    }, shared, rest));
  }

  var _path = children != null ? children : fallbackIcon.path;

  return /*#__PURE__*/react.createElement(chakra.svg, _extends$5({
    verticalAlign: "middle",
    viewBox: _viewBox
  }, shared, rest), _path);
});

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
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

  return _extends$6.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$4(source, excluded) {
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

/**
 * React hook that loads an image in the browser,
 * and let's us know the `status` so we can show image
 * fallback if it is still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */
function useImage(props) {
  var loading = props.loading,
      src = props.src,
      srcSet = props.srcSet,
      onLoad = props.onLoad,
      onError = props.onError,
      crossOrigin = props.crossOrigin,
      sizes = props.sizes,
      ignoreFallback = props.ignoreFallback;

  var _useState = react.useState("pending"),
      status = _useState[0],
      setStatus = _useState[1];

  react.useEffect(function () {
    setStatus(src ? "loading" : "pending");
  }, [src]);
  var imageRef = react.useRef();
  var load = react.useCallback(function () {
    if (!src) return;
    flush();
    var img = new Image();
    img.src = src;
    if (crossOrigin) img.crossOrigin = crossOrigin;
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (loading) img.loading = loading;

    img.onload = function (event) {
      flush();
      setStatus("loaded");
      onLoad == null ? void 0 : onLoad(event);
    };

    img.onerror = function (error) {
      flush();
      setStatus("failed");
      onError == null ? void 0 : onError(error);
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);

  var flush = function flush() {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  useSafeLayoutEffect(function () {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (ignoreFallback) return undefined;

    if (status === "loading") {
      load();
    }

    return function () {
      flush();
    };
  }, [status, load, ignoreFallback]);
  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */

  return ignoreFallback ? "loaded" : status;
}

var _excluded$4 = ["htmlWidth", "htmlHeight", "alt"],
    _excluded2$1 = ["fallbackSrc", "fallback", "src", "srcSet", "align", "fit", "loading", "ignoreFallback", "crossOrigin"];
var NativeImage = /*#__PURE__*/react.forwardRef(function (props, ref) {
  var htmlWidth = props.htmlWidth,
      htmlHeight = props.htmlHeight,
      alt = props.alt,
      rest = _objectWithoutPropertiesLoose$4(props, _excluded$4);

  return /*#__PURE__*/react.createElement("img", _extends$6({
    width: htmlWidth,
    height: htmlHeight,
    ref: ref,
    alt: alt
  }, rest));
});

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/image
 */
var Image$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var fallbackSrc = props.fallbackSrc,
      fallback = props.fallback,
      src = props.src,
      srcSet = props.srcSet,
      align = props.align,
      fit = props.fit,
      loading = props.loading,
      ignoreFallback = props.ignoreFallback,
      crossOrigin = props.crossOrigin,
      rest = _objectWithoutPropertiesLoose$4(props, _excluded2$1);
  /**
   * Defer to native `img` tag if `loading` prop is passed
   * @see https://github.com/chakra-ui/chakra-ui/issues/1027
   */


  var shouldIgnore = loading != null || ignoreFallback || fallbackSrc === undefined && fallback === undefined; // if the user doesn't provide any kind of fallback we should ignore it

  var status = useImage(_extends$6({}, props, {
    ignoreFallback: shouldIgnore
  }));

  var shared = _extends$6({
    ref: ref,
    objectFit: fit,
    objectPosition: align
  }, shouldIgnore ? rest : omit(rest, ["onError", "onLoad"]));

  if (status !== "loaded") {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback;
    return /*#__PURE__*/react.createElement(chakra.img, _extends$6({
      as: NativeImage,
      className: "chakra-image__placeholder",
      src: fallbackSrc
    }, shared));
  }

  return /*#__PURE__*/react.createElement(chakra.img, _extends$6({
    as: NativeImage,
    src: src,
    srcSet: srcSet,
    crossOrigin: crossOrigin,
    loading: loading,
    className: "chakra-image"
  }, shared));
});

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */
var visuallyHiddenStyle = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
/**
 * Visually hidden component used to hide
 * elements on screen
 */

var VisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle
});
/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */


var VisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle
});

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
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

  return _extends$7.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$5(source, excluded) {
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

var _excluded$5 = ["label", "thickness", "speed", "emptyColor", "className"];
var spin = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/spinner
 */
var Spinner$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Spinner", props);

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$lab = _omitThemingProps.label,
      label = _omitThemingProps$lab === void 0 ? "Loading..." : _omitThemingProps$lab,
      _omitThemingProps$thi = _omitThemingProps.thickness,
      thickness = _omitThemingProps$thi === void 0 ? "2px" : _omitThemingProps$thi,
      _omitThemingProps$spe = _omitThemingProps.speed,
      speed = _omitThemingProps$spe === void 0 ? "0.45s" : _omitThemingProps$spe,
      _omitThemingProps$emp = _omitThemingProps.emptyColor,
      emptyColor = _omitThemingProps$emp === void 0 ? "transparent" : _omitThemingProps$emp,
      className = _omitThemingProps.className,
      rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, _excluded$5);

  var _className = cx("chakra-spinner", className);

  var spinnerStyles = _extends$7({
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animation: spin + " " + speed + " linear infinite"
  }, styles);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$7({
    ref: ref,
    __css: spinnerStyles,
    className: _className
  }, rest), label && /*#__PURE__*/react.createElement(VisuallyHidden, null, label));
});

function _objectWithoutPropertiesLoose$6(source, excluded) {
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

function _extends$8() {
  _extends$8 = Object.assign || function (target) {
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

  return _extends$8.apply(this, arguments);
}

var _createContext$3 = createContext({
  strict: false,
  name: "ButtonGroupContext"
}),
    useButtonGroup = _createContext$3[1];

var _excluded$3$1 = ["label", "placement", "spacing", "children", "className", "__css"];
var ButtonSpinner = function ButtonSpinner(props) {
  var label = props.label,
      placement = props.placement;
      props.spacing;
      var _props$children = props.children,
      children = _props$children === void 0 ? /*#__PURE__*/react.createElement(Spinner$1, {
    color: "currentColor",
    width: "1em",
    height: "1em"
  }) : _props$children,
      className = props.className,
      __css = props.__css,
      rest = _objectWithoutPropertiesLoose$6(props, _excluded$3$1);

  var _className = cx("chakra-button__spinner", className);

  var marginProp = placement === "start" ? "marginEnd" : "marginStart";
  var spinnerStyles = react.useMemo(function () {
    var _extends2;

    return _extends$8((_extends2 = {
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute"
    }, _extends2[marginProp] = label ? "0.5rem" : 0, _extends2.fontSize = "1em", _extends2.lineHeight = "normal", _extends2), __css);
  }, [__css, label, marginProp]);
  return /*#__PURE__*/react.createElement(chakra.div, _extends$8({
    className: _className
  }, rest, {
    __css: spinnerStyles
  }), children);
};

var _excluded$2$1 = ["children", "className"];
var ButtonIcon = function ButtonIcon(props) {
  var children = props.children,
      className = props.className,
      rest = _objectWithoutPropertiesLoose$6(props, _excluded$2$1);

  var _children = /*#__PURE__*/react.isValidElement(children) ? /*#__PURE__*/react.cloneElement(children, {
    "aria-hidden": true,
    focusable: false
  }) : children;

  var _className = cx("chakra-button__icon", className);

  return /*#__PURE__*/react.createElement(chakra.span, _extends$8({
    display: "inline-flex",
    alignSelf: "center",
    flexShrink: 0
  }, rest, {
    className: _className
  }), _children);
};

function useButtonType(value) {
  var _React$useState = react.useState(!value),
      isButton = _React$useState[0],
      setIsButton = _React$useState[1];

  var refCallback = react.useCallback(function (node) {
    if (!node) return;
    setIsButton(node.tagName === "BUTTON");
  }, []);
  var type = isButton ? "button" : undefined;
  return {
    ref: refCallback,
    type: type
  };
}

var _excluded$1$2 = ["isDisabled", "isLoading", "isActive", "isFullWidth", "children", "leftIcon", "rightIcon", "loadingText", "iconSpacing", "type", "spinner", "spinnerPlacement", "className", "as"];
var Button$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var group = useButtonGroup();
  var styles = useStyleConfig("Button", _extends$8({}, group, props));

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$isD = _omitThemingProps.isDisabled,
      isDisabled = _omitThemingProps$isD === void 0 ? group == null ? void 0 : group.isDisabled : _omitThemingProps$isD,
      isLoading = _omitThemingProps.isLoading,
      isActive = _omitThemingProps.isActive,
      isFullWidth = _omitThemingProps.isFullWidth,
      children = _omitThemingProps.children,
      leftIcon = _omitThemingProps.leftIcon,
      rightIcon = _omitThemingProps.rightIcon,
      loadingText = _omitThemingProps.loadingText,
      _omitThemingProps$ico = _omitThemingProps.iconSpacing,
      iconSpacing = _omitThemingProps$ico === void 0 ? "0.5rem" : _omitThemingProps$ico,
      type = _omitThemingProps.type,
      spinner = _omitThemingProps.spinner,
      _omitThemingProps$spi = _omitThemingProps.spinnerPlacement,
      spinnerPlacement = _omitThemingProps$spi === void 0 ? "start" : _omitThemingProps$spi,
      className = _omitThemingProps.className,
      as = _omitThemingProps.as,
      rest = _objectWithoutPropertiesLoose$6(_omitThemingProps, _excluded$1$2);
  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it is important to add a `zIndex` on focus.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */


  var buttonStyles = react.useMemo(function () {
    var _styles$_focus;

    var _focus = lodash_mergewith({}, (_styles$_focus = styles == null ? void 0 : styles["_focus"]) != null ? _styles$_focus : {}, {
      zIndex: 1
    });

    return _extends$8({
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      width: isFullWidth ? "100%" : "auto"
    }, styles, !!group && {
      _focus: _focus
    });
  }, [styles, group, isFullWidth]);

  var _useButtonType = useButtonType(as),
      _ref = _useButtonType.ref,
      defaultType = _useButtonType.type;

  var contentProps = {
    rightIcon: rightIcon,
    leftIcon: leftIcon,
    iconSpacing: iconSpacing,
    children: children
  };
  return /*#__PURE__*/react.createElement(chakra.button, _extends$8({
    disabled: isDisabled || isLoading,
    ref: useMergeRefs(ref, _ref),
    as: as,
    type: type != null ? type : defaultType,
    "data-active": dataAttr(isActive),
    "data-loading": dataAttr(isLoading),
    __css: buttonStyles,
    className: cx("chakra-button", className)
  }, rest), isLoading && spinnerPlacement === "start" && /*#__PURE__*/react.createElement(ButtonSpinner, {
    className: "chakra-button__spinner--start",
    label: loadingText,
    placement: "start"
  }, spinner), isLoading ? loadingText || /*#__PURE__*/react.createElement(chakra.span, {
    opacity: 0
  }, /*#__PURE__*/react.createElement(ButtonContent, contentProps)) : /*#__PURE__*/react.createElement(ButtonContent, contentProps), isLoading && spinnerPlacement === "end" && /*#__PURE__*/react.createElement(ButtonSpinner, {
    className: "chakra-button__spinner--end",
    label: loadingText,
    placement: "end"
  }, spinner));
});

function ButtonContent(props) {
  var leftIcon = props.leftIcon,
      rightIcon = props.rightIcon,
      children = props.children,
      iconSpacing = props.iconSpacing;
  return /*#__PURE__*/react.createElement(react.Fragment, null, leftIcon && /*#__PURE__*/react.createElement(ButtonIcon, {
    marginEnd: iconSpacing
  }, leftIcon), children, rightIcon && /*#__PURE__*/react.createElement(ButtonIcon, {
    marginStart: iconSpacing
  }, rightIcon));
}

function _extends$9() {
  _extends$9 = Object.assign || function (target) {
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

  return _extends$9.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$7(source, excluded) {
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

var _createContext$4 = createContext({
  strict: false,
  name: "FormControlContext"
}),
    useFormControlContext = _createContext$4[1];

var _excluded$1$3 = ["isDisabled", "isInvalid", "isReadOnly", "isRequired"],
    _excluded2$2 = ["id", "disabled", "readOnly", "required", "isRequired", "isInvalid", "isReadOnly", "isDisabled", "onFocus", "onBlur"];

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 *
 * @internal
 */
function useFormControl(props) {
  var _useFormControlProps = useFormControlProps(props),
      isDisabled = _useFormControlProps.isDisabled,
      isInvalid = _useFormControlProps.isInvalid,
      isReadOnly = _useFormControlProps.isReadOnly,
      isRequired = _useFormControlProps.isRequired,
      rest = _objectWithoutPropertiesLoose$7(_useFormControlProps, _excluded$1$3);

  return _extends$9({}, rest, {
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly)
  });
}
/**
 * @internal
 */

function useFormControlProps(props) {
  var _ref, _ref2, _ref3;

  var field = useFormControlContext();

  var id = props.id,
      disabled = props.disabled,
      readOnly = props.readOnly,
      required = props.required,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isReadOnly = props.isReadOnly,
      isDisabled = props.isDisabled,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      rest = _objectWithoutPropertiesLoose$7(props, _excluded2$2);

  var labelIds = props["aria-describedby"] ? [props["aria-describedby"]] : []; // Error message must be described first in all scenarios.

  if (field != null && field.hasFeedbackText && field != null && field.isInvalid) {
    labelIds.push(field.feedbackId);
  }

  if (field != null && field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }

  return _extends$9({}, rest, {
    "aria-describedby": labelIds.join(" ") || undefined,
    id: id != null ? id : field == null ? void 0 : field.id,
    isDisabled: (_ref = disabled != null ? disabled : isDisabled) != null ? _ref : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_ref2 = readOnly != null ? readOnly : isReadOnly) != null ? _ref2 : field == null ? void 0 : field.isReadOnly,
    isRequired: (_ref3 = required != null ? required : isRequired) != null ? _ref3 : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  });
}

function _extends$a() {
  _extends$a = Object.assign || function (target) {
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

  return _extends$a.apply(this, arguments);
}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
var Input$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Input", props);
  var ownProps = omitThemingProps(props);
  var input = useFormControl(ownProps);

  var _className = cx("chakra-input", props.className);

  return /*#__PURE__*/react.createElement(chakra.input, _extends$a({}, input, {
    __css: styles.field,
    ref: ref,
    className: _className
  }));
});


Input$1.id = "Input";

function _objectWithoutPropertiesLoose$8(source, excluded) {
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

var _excluded$2$2 = ["placement"];
var placements = {
  left: {
    marginEnd: "-1px",
    borderEndRadius: 0,
    borderEndColor: "transparent"
  },
  right: {
    marginStart: "-1px",
    borderStartRadius: 0,
    borderStartColor: "transparent"
  }
};
var StyledAddon = chakra("div", {
  baseStyle: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap"
  }
});

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
var InputAddon = /*#__PURE__*/forwardRef(function (props, ref) {
  var _placements$placement;

  var _props$placement = props.placement,
      placement = _props$placement === void 0 ? "left" : _props$placement,
      rest = _objectWithoutPropertiesLoose$8(props, _excluded$2$2);

  var placementStyles = (_placements$placement = placements[placement]) != null ? _placements$placement : {};
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(StyledAddon, _extends$a({
    ref: ref
  }, rest, {
    __css: _extends$a({}, styles.addon, placementStyles)
  }));
});
/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */


var InputLeftAddon = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(InputAddon, _extends$a({
    ref: ref,
    placement: "left"
  }, props, {
    className: cx("chakra-input__left-addon", props.className)
  }));
});


InputLeftAddon.id = "InputLeftAddon";
/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */

var InputRightAddon = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(InputAddon, _extends$a({
    ref: ref,
    placement: "right"
  }, props, {
    className: cx("chakra-input__right-addon", props.className)
  }));
});


InputRightAddon.id = "InputRightAddon";

var _excluded$1$4 = ["children", "className"];
var InputGroup = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Input", props);

  var _omitThemingProps = omitThemingProps(props),
      children = _omitThemingProps.children,
      className = _omitThemingProps.className,
      rest = _objectWithoutPropertiesLoose$8(_omitThemingProps, _excluded$1$4);

  var _className = cx("chakra-input__group", className);

  var groupStyles = {};
  var validChildren = getValidChildren(children);
  var input = styles.field;
  validChildren.forEach(function (child) {
    if (!styles) return;

    if (input && child.type.id === "InputLeftElement") {
      var _input$height;

      groupStyles.paddingStart = (_input$height = input.height) != null ? _input$height : input.h;
    }

    if (input && child.type.id === "InputRightElement") {
      var _input$height2;

      groupStyles.paddingEnd = (_input$height2 = input.height) != null ? _input$height2 : input.h;
    }

    if (child.type.id === "InputRightAddon") {
      groupStyles.borderEndRadius = 0;
    }

    if (child.type.id === "InputLeftAddon") {
      groupStyles.borderStartRadius = 0;
    }
  });
  var clones = validChildren.map(function (child) {
    var _child$props, _child$props2;

    /**
     * Make it possible to override the size and variant from `Input`
     */
    var theming = {
      size: ((_child$props = child.props) == null ? void 0 : _child$props.size) || props.size,
      variant: ((_child$props2 = child.props) == null ? void 0 : _child$props2.variant) || props.variant
    };
    return child.type.id !== "Input" ? /*#__PURE__*/react.cloneElement(child, theming) : /*#__PURE__*/react.cloneElement(child, Object.assign(theming, groupStyles, child.props));
  });
  return /*#__PURE__*/react.createElement(chakra.div, _extends$a({
    className: _className,
    ref: ref,
    __css: {
      width: "100%",
      display: "flex",
      position: "relative"
    }
  }, rest), /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, clones));
});

var _excluded$6 = ["placement"],
    _excluded2$3 = ["className"],
    _excluded3 = ["className"];
var StyledElement = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2
  }
});
var InputElement = /*#__PURE__*/forwardRef(function (props, ref) {
  var _input$height, _input$height2, _elementStyles;

  var _props$placement = props.placement,
      placement = _props$placement === void 0 ? "left" : _props$placement,
      rest = _objectWithoutPropertiesLoose$8(props, _excluded$6);

  var styles = useStyles();
  var input = styles.field;
  var attr = placement === "left" ? "insetStart" : "insetEnd";
  var elementStyles = (_elementStyles = {}, _elementStyles[attr] = "0", _elementStyles.width = (_input$height = input == null ? void 0 : input.height) != null ? _input$height : input == null ? void 0 : input.h, _elementStyles.height = (_input$height2 = input == null ? void 0 : input.height) != null ? _input$height2 : input == null ? void 0 : input.h, _elementStyles.fontSize = input == null ? void 0 : input.fontSize, _elementStyles);
  return /*#__PURE__*/react.createElement(StyledElement, _extends$a({
    ref: ref,
    __css: elementStyles
  }, rest));
}); // This is used in `input-group.tsx`

InputElement.id = "InputElement";

var InputLeftElement = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose$8(props, _excluded2$3);

  var _className = cx("chakra-input__left-element", className);

  return /*#__PURE__*/react.createElement(InputElement, _extends$a({
    ref: ref,
    placement: "left",
    className: _className
  }, rest));
}); // This is used in `input-group.tsx`

InputLeftElement.id = "InputLeftElement";

var InputRightElement = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose$8(props, _excluded3);

  var _className = cx("chakra-input__right-element", className);

  return /*#__PURE__*/react.createElement(InputElement, _extends$a({
    ref: ref,
    placement: "right",
    className: _className
  }, rest));
}); // This is used in `input-group.tsx`

InputRightElement.id = "InputRightElement";

function _extends$b() {
  _extends$b = Object.assign || function (target) {
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

  return _extends$b.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$9(source, excluded) {
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

var _excluded$g = ["className"];

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
 */
var Badge$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Badge", props);

  var _omitThemingProps = omitThemingProps(props);
      var rest = _objectWithoutPropertiesLoose$9(_omitThemingProps, _excluded$g);

  return /*#__PURE__*/react.createElement(chakra.span, _extends$b({
    ref: ref,
    className: cx("chakra-badge", props.className)
  }, rest, {
    __css: _extends$b({
      display: "inline-block",
      whiteSpace: "nowrap",
      verticalAlign: "middle"
    }, styles)
  }));
});

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/box
 */
var Box = chakra("div");

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
 */
var Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

var _excluded$c = ["className", "centerContent"];

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
var Container$2 = /*#__PURE__*/forwardRef(function (props, ref) {
  var _omitThemingProps = omitThemingProps(props),
      className = _omitThemingProps.className,
      centerContent = _omitThemingProps.centerContent,
      rest = _objectWithoutPropertiesLoose$9(_omitThemingProps, _excluded$c);

  var styles = useStyleConfig("Container", props);
  return /*#__PURE__*/react.createElement(chakra.div, _extends$b({
    ref: ref,
    className: cx("chakra-container", className)
  }, rest, {
    __css: _extends$b({}, styles, centerContent && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    })
  }));
});

var _excluded$9 = ["area", "templateAreas", "gap", "rowGap", "columnGap", "column", "row", "autoFlow", "autoRows", "templateRows", "autoColumns", "templateColumns"];

/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/grid
 */
var Grid = /*#__PURE__*/forwardRef(function (props, ref) {
  var area = props.area,
      templateAreas = props.templateAreas,
      gap = props.gap,
      rowGap = props.rowGap,
      columnGap = props.columnGap,
      column = props.column,
      row = props.row,
      autoFlow = props.autoFlow,
      autoRows = props.autoRows,
      templateRows = props.templateRows,
      autoColumns = props.autoColumns,
      templateColumns = props.templateColumns,
      rest = _objectWithoutPropertiesLoose$9(props, _excluded$9);

  var styles = {
    display: "grid",
    gridArea: area,
    gridTemplateAreas: templateAreas,
    gridGap: gap,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns
  };
  return /*#__PURE__*/react.createElement(chakra.div, _extends$b({
    ref: ref,
    __css: styles
  }, rest));
});

var _excluded$8 = ["className"];
var Heading$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Heading", props);

  var _omitThemingProps = omitThemingProps(props);
      var rest = _objectWithoutPropertiesLoose$9(_omitThemingProps, _excluded$8);

  return /*#__PURE__*/react.createElement(chakra.h2, _extends$b({
    ref: ref,
    className: cx("chakra-heading", props.className)
  }, rest, {
    __css: styles
  }));
});

var _excluded$6$1 = ["className", "isExternal"];

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 *
 * @example
 *
 * ```jsx
 * <Link as={ReactRouterLink} to="/home">Home</Link>
 * ```
 *
 * @see Docs https://chakra-ui.com/link
 */
var Link$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Link", props);

  var _omitThemingProps = omitThemingProps(props),
      className = _omitThemingProps.className,
      isExternal = _omitThemingProps.isExternal,
      rest = _objectWithoutPropertiesLoose$9(_omitThemingProps, _excluded$6$1);

  return /*#__PURE__*/react.createElement(chakra.a, _extends$b({
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
    ref: ref,
    className: cx("chakra-link", className)
  }, rest, {
    __css: styles
  }));
});

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/flex#using-the-spacer
 */
var Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch"
  }
});

/**
 * If we ever run into SSR issues with this, check this post to find a fix for it:
 * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
 */
var selector = "& > *:not(style) ~ *:not(style)";
function getStackStyles(options) {
  var _ref;

  var spacing = options.spacing,
      direction = options.direction;
  var directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: spacing
    },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return _ref = {
    flexDirection: direction
  }, _ref[selector] = mapResponsive(direction, function (value) {
    return directionStyles[value];
  }), _ref;
}
function getDividerStyles(options) {
  var spacing = options.spacing,
      direction = options.direction;
  var dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(direction, function (value) {
      return dividerStyles[value];
    })
  };
}

var _excluded$3$2 = ["isInline", "direction", "align", "justify", "spacing", "wrap", "children", "divider", "className", "shouldWrapChildren"];
var StackItem = function StackItem(props) {
  return /*#__PURE__*/react.createElement(chakra.div, _extends$b({
    className: "chakra-stack__item"
  }, props, {
    __css: _extends$b({
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0
    }, props["__css"])
  }));
};

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/stack
 *
 */
var Stack = /*#__PURE__*/forwardRef(function (props, ref) {
  var _ref;

  var isInline = props.isInline,
      directionProp = props.direction,
      align = props.align,
      justify = props.justify,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? "0.5rem" : _props$spacing,
      wrap = props.wrap,
      children = props.children,
      divider = props.divider,
      className = props.className,
      shouldWrapChildren = props.shouldWrapChildren,
      rest = _objectWithoutPropertiesLoose$9(props, _excluded$3$2);

  var direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  var styles = react.useMemo(function () {
    return getStackStyles({
      direction: direction,
      spacing: spacing
    });
  }, [direction, spacing]);
  var dividerStyle = react.useMemo(function () {
    return getDividerStyles({
      spacing: spacing,
      direction: direction
    });
  }, [spacing, direction]);
  var hasDivider = !!divider;
  var shouldUseChildren = !shouldWrapChildren && !hasDivider;
  var validChildren = getValidChildren(children);
  var clones = shouldUseChildren ? validChildren : validChildren.map(function (child, index) {
    // Prefer provided child key, fallback to index
    var key = typeof child.key !== "undefined" ? child.key : index;
    var isLast = index + 1 === validChildren.length;
    var wrappedChild = /*#__PURE__*/react.createElement(StackItem, {
      key: key
    }, child);

    var _child = shouldWrapChildren ? wrappedChild : child;

    if (!hasDivider) return _child;
    var clonedDivider = /*#__PURE__*/react.cloneElement(divider, {
      __css: dividerStyle
    });

    var _divider = isLast ? null : clonedDivider;

    return /*#__PURE__*/react.createElement(react.Fragment, {
      key: key
    }, _child, _divider);
  });

  var _className = cx("chakra-stack", className);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$b({
    ref: ref,
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: styles.flexDirection,
    flexWrap: wrap,
    className: _className,
    __css: hasDivider ? {} : (_ref = {}, _ref[selector] = styles[selector], _ref)
  }, rest), clones);
});
/**
 * A view that arranges its children in a horizontal line.
 */


var HStack = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(Stack, _extends$b({
    align: "center"
  }, props, {
    direction: "row",
    ref: ref
  }));
});
/**
 * A view that arranges its children in a vertical line.
 */


var VStack = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(Stack, _extends$b({
    align: "center"
  }, props, {
    direction: "column",
    ref: ref
  }));
});

var _excluded$2$3 = ["className", "align", "decoration", "casing"];

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/text
 */
var Text = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Text", props);

  var _omitThemingProps = omitThemingProps(props);
      var rest = _objectWithoutPropertiesLoose$9(_omitThemingProps, _excluded$2$3);

  var aliasedProps = filterUndefined({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing
  });
  return /*#__PURE__*/react.createElement(chakra.p, _extends$b({
    ref: ref,
    className: cx("chakra-text", props.className)
  }, aliasedProps, rest, {
    __css: styles
  }));
});

var _excluded$7 = ["isExternal", "target", "rel", "className"],
    _excluded2$4 = ["className"];
var LinkOverlay = /*#__PURE__*/forwardRef(function (props, ref) {
  var isExternal = props.isExternal,
      target = props.target,
      rel = props.rel,
      className = props.className,
      rest = _objectWithoutPropertiesLoose$9(props, _excluded$7);

  return /*#__PURE__*/react.createElement(chakra.a, _extends$b({}, rest, {
    ref: ref,
    className: cx("chakra-linkbox__overlay", className),
    rel: isExternal ? "noopener noreferrer" : rel,
    target: isExternal ? "_blank" : target,
    __css: {
      position: "static",
      "&::before": {
        content: "''",
        cursor: "inherit",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%"
      }
    }
  }));
});

/**
 * `LinkBox` is used to wrap content areas within a link while ensuring semantic html
 *
 * @see Docs https://chakra-ui.com/docs/navigation/link-overlay
 * @see Resources https://www.sarasoueidan.com/blog/nested-links
 */
var LinkBox = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose$9(props, _excluded2$4);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$b({
    ref: ref,
    position: "relative"
  }, rest, {
    className: cx("chakra-linkbox", className),
    __css: {
      /* Elevate the links and abbreviations up */
      "a[href]:not(.chakra-linkbox__overlay), abbr[title]": {
        position: "relative",
        zIndex: 1
      }
    }
  }));
});

function _extends$c() {
  _extends$c = Object.assign || function (target) {
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

  return _extends$c.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$a(source, excluded) {
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

var _excluded2$5 = ["className"],
    _excluded5 = ["isNumeric"];
var Table$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Table", props);

  var _omitThemingProps = omitThemingProps(props),
      className = _omitThemingProps.className,
      tableProps = _objectWithoutPropertiesLoose$a(_omitThemingProps, _excluded2$5);

  return /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/react.createElement(chakra.table, _extends$c({
    role: "table",
    ref: ref,
    __css: styles.table,
    className: cx("chakra-table", className)
  }, tableProps)));
});
var Tbody = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.tbody, _extends$c({}, props, {
    ref: ref,
    __css: styles.tbody
  }));
});
var Tr = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.tr, _extends$c({
    role: "row"
  }, props, {
    ref: ref,
    __css: styles.tr
  }));
});
var Td = /*#__PURE__*/forwardRef(function (_ref3, ref) {
  var isNumeric = _ref3.isNumeric,
      rest = _objectWithoutPropertiesLoose$a(_ref3, _excluded5);

  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.td, _extends$c({
    role: "gridcell"
  }, rest, {
    ref: ref,
    __css: styles.td,
    "data-is-numeric": isNumeric
  }));
});

var ChakraProvider$1 = ChakraProvider;
ChakraProvider$1.defaultProps = {
  theme: theme
};

/**
 * NOTE: This got too complex to manage and it's not worth the extra complexity.
 * We'll re-evaluate this API in the future releases.
 *
 * Function to override or customize the Chakra UI theme conveniently.
 * First extension overrides the baseTheme and following extensions override the preceding extensions.
 *
 * @example:
 * import { theme as baseTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
 *
 * const customTheme = extendTheme(
 *   {
 *     colors: {
 *       brand: {
 *         500: "#b4d455",
 *       },
 *     },
 *   },
 *   withDefaultColorScheme({ colorScheme: "red" }),
 *   baseTheme // optional
 * )
 */
function extendTheme() {
  for (var _len = arguments.length, extensions = new Array(_len), _key = 0; _key < _len; _key++) {
    extensions[_key] = arguments[_key];
  }

  var overrides = [].concat(extensions);
  var baseTheme = extensions[extensions.length - 1];

  if (isChakraTheme(baseTheme) && // this ensures backward compatibility
  // previously only `extendTheme(override, baseTheme?)` was allowed
  overrides.length > 1) {
    overrides = overrides.slice(0, overrides.length - 1);
  } else {
    baseTheme = theme;
  }

  return pipe.apply(void 0, overrides.map(function (extension) {
    return function (prevTheme) {
      return isFunction(extension) ? extension(prevTheme) : mergeThemeOverride(prevTheme, extension);
    };
  }))(baseTheme);
}
function mergeThemeOverride() {
  for (var _len2 = arguments.length, overrides = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    overrides[_key2] = arguments[_key2];
  }

  return lodash_mergewith.apply(void 0, [{}].concat(overrides, [mergeThemeCustomizer]));
}

function mergeThemeCustomizer(source, override, key, object) {
  if ((isFunction(source) || isFunction(override)) && Object.prototype.hasOwnProperty.call(object, key)) {
    return function () {
      var sourceValue = isFunction(source) ? source.apply(void 0, arguments) : source;
      var overrideValue = isFunction(override) ? override.apply(void 0, arguments) : override;
      return lodash_mergewith({}, sourceValue, overrideValue, mergeThemeCustomizer);
    };
  } // fallback to default behaviour


  return undefined;
}

export { Badge$1 as Badge, Box, Button$1 as Button, ChakraProvider$1 as ChakraProvider, Container$2 as Container, Grid, HStack, Heading$1 as Heading, Icon, Image$1 as Image, Input$1 as Input, InputGroup, InputLeftElement, Link$1 as Link, LinkBox, LinkOverlay, Portal$1 as Portal, Spinner$1 as Spinner, Table$1 as Table, Tbody, Td, Text, Tr, VStack, extendTheme };
