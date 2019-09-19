"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Author: Quan Vo
 * Date: 2019-08-21
 *
 * README
 * this file was implemented according to https://mycliplister.com/static/clplayer/cllib.inc.js
 */

var shopId = void 0;
var CLDOMAIN = "mycliplister.com/cliplister/";
var k = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

var encode = function encode(input) {
  input = escape(input);
  var output = "";
  var chr1 = void 0,
      chr2 = void 0,
      chr3 = "";
  var enc1 = void 0,
      enc2 = void 0,
      enc3 = void 0,
      enc4 = "";
  var i = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + k.charAt(enc1) + k.charAt(enc2) + k.charAt(enc3) + k.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
};

var Clip = function Clip(requestKey) {
  return {
    elementID: undefined,
    fsk: 18,
    requestkey: requestKey,
    keytype: 500,
    lang: "de,en,##,de",
    size: "640x360",
    slot: 13,
    autoplay: "true",
    urlPattern: "clsplay",
    mode: undefined,
    SEO: false,
    shopId: shopId,
    timer: new Date().getTime()
  };
};

// should use fetch instead of axios
var buildRequest = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(requestKey) {
    var clip, k63, url, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            clip = Clip(requestKey);
            k63 = k.charAt(63);
            url = "https://" + CLDOMAIN + "lc" + k63 + shopId + k63 + "?" + encode(JSON.stringify([clip]));
            _context.next = 5;
            return fetch(url, {
              headers: {
                Referer: "whatever.com"
              }
            });

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            response = _context.sent;

            response = response[0];
            _context.next = 12;
            return fetch("https://mycliplister.com/vm/" + shopId + "/" + response.request);

          case 12:
            response = _context.sent;
            return _context.abrupt("return", response.url);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function buildRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

var config = function config(id /*shopId*/) {
  return shopId = id;
};

var Cliplister = {
  config: config,
  buildRequest: buildRequest
};

exports.default = Cliplister;