/**
 * Author: Quan Vo
 * Date: 2019-08-21
 *
 * README
 * this file was implemented according to https://mycliplister.com/static/clplayer/cllib.inc.js
 */

let shopId;
const CLDOMAIN = "mycliplister.com/cliplister/";
const k = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

const encode = input => {
  input = escape(input);
  let output = "";
  let chr1, chr2, chr3 = "";
  let enc1, enc2, enc3, enc4 = "";
  let i = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    }
    else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + k.charAt(enc1) + k.charAt(enc2) + k.charAt(enc3) + k.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
};

const Clip = requestKey => ({
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
  shopId,
  timer: new Date().getTime()
});

// should use fetch instead of axios
const buildRequest = async (requestKey) => {
  const clip = Clip(requestKey);
  const k63 = k.charAt(63);
  const url = "https://" + CLDOMAIN + "lc" + k63 + shopId + k63 + "?" + encode(JSON.stringify([clip]));
  let response = await fetch(url, {
    headers: {
      Referer: "whatever.com"
    }
  });
  response = await response.json();
  response = response[0];
  response = await fetch(`https://mycliplister.com/vm/${shopId}/${response.request}`);
  return response.url;
};

const config = (id/*shopId*/) => shopId = id;

const Cliplister = {
  config,
  buildRequest
};

export default Cliplister;
