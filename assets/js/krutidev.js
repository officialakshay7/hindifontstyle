/* krutidev.js — Kruti Dev 010 (legacy ASCII-encoded Hindi) → Unicode Devanagari
 * Algorithm: 1) longest-match glyph table, 2) move ि (typed BEFORE the consonant
 * in Kruti Dev as "f") after its consonant cluster, 3) move reph र् (typed AFTER
 * the syllable as "Z") before its consonant cluster.
 * Exposes window.krutiToUnicode(text).
 */
(function () {
  'use strict';
  var REPH = '';
  var T = {
    // vowels
    'v‚': 'ऑ', 'vks': 'ओ', 'vkS': 'औ', 'vk': 'आ', 'v': 'अ', 'bZ': 'ई', 'b': 'इ',
    'm': 'उ', 'Å': 'ऊ', ',s': 'ऐ', ',': 'ए', '_': 'ऋ',
    // conjunct / special glyphs
    'Ø': 'क्र', 'Ñ': 'कृ', 'ä': 'क्त', '{k': 'क्ष', '{': 'क्ष्', '=': 'त्र', '«': 'त्र्',
    'K': 'ज्ञ', 'J': 'श्र', 'Ùk': 'त्त', 'Ù': 'त्त्', 'é': 'न्न', '™': 'न्न्', 'í': 'द्द',
    '|': 'द्य', '}': 'द्व', 'æ': 'द्र', 'ç': 'प्र', 'xz': 'ग्र', '#': 'रु', ':': 'रू',
    'Vª': 'ट्र', 'Mª': 'ड्र', 'à': 'ह्न', 'á': 'ह्य', 'â': 'हृ', 'ã': 'ह्म', 'ºz': 'ह्र', 'º': 'ह्',
    'Ük': 'श', 'Ü': 'श्',
    // nukta forms
    'Q+': 'फ़', 'd+': 'क़', '[+k': 'ख़', 'x+': 'ग़', 't+': 'ज़', 'M+': 'ड़', '<+': 'ढ़',
    // consonants (full / half)
    'd': 'क', 'Dk': 'क', 'D': 'क्', '[k': 'ख', '[': 'ख्', 'x': 'ग', 'Xk': 'ग', 'X': 'ग्',
    '?k': 'घ', '?': 'घ्', '³': 'ङ', 'p': 'च', 'Pk': 'च', 'P': 'च्', 'N': 'छ',
    't': 'ज', 'Tk': 'ज', 'T': 'ज्', '>': 'झ', '÷': 'झ्', '¥': 'ञ',
    'V': 'ट', 'B': 'ठ', 'M': 'ड', '<': 'ढ', '.k': 'ण', '.': 'ण्',
    'r': 'त', 'Rk': 'त', 'R': 'त्', 'Fk': 'थ', 'F': 'थ्', 'n': 'द', '/k': 'ध', '/': 'ध्',
    'u': 'न', 'Uk': 'न', 'U': 'न्', 'i': 'प', 'Ik': 'प', 'I': 'प्', 'Q': 'फ', '¶': 'फ्',
    'c': 'ब', 'Ck': 'ब', 'C': 'ब्', 'Hk': 'भ', 'H': 'भ्', 'e': 'म', 'Ek': 'म', 'E': 'म्',
    ';': 'य', '¸': 'य्', 'j': 'र', 'y': 'ल', 'Yk': 'ल', 'Y': 'ल्', 'G': 'ळ',
    'o': 'व', 'Ok': 'व', 'O': 'व्', "'k": 'श', "'": 'श्', '"k': 'ष', '"': 'ष्',
    'l': 'स', 'Lk': 'स', 'L': 'स्', 'g': 'ह',
    // matras & signs
    'ks': 'ो', 'kS': 'ौ', 'k': 'ा', 'h': 'ी', 'q': 'ु', 'w': 'ू', '`': 'ृ', 's': 'े', 'S': 'ै',
    'kW': 'ॉ', 'W': 'ॅ', '‚': 'ॉ', 'a': 'ं', '¡': 'ँ', '%': 'ः', '~': '्', 'z': '्र', '+': '़',
    'È': 'ीं', '±': REPH + 'ं', 'Z': REPH, 'f': 'ि',
    // punctuation
    'A': '।', '¼': '(', '½': ')', ']': ',', '@': '/', '&': '-', '-': '.', '^': '‘', '*': '’',
    'Þ': '“', 'ß': '”', '¿': '{', 'À': '}', '¾': '=', 'Œ': '॰'
  };
  var KEYS = Object.keys(T).sort(function (a, b) { return b.length - a.length; });

  var C = '[क-हक़-य़]़?';           // consonant (+ nukta)
  var CLUSTER = C + '(?:्' + C + ')*';                  // conjunct cluster
  var I_MATRA = new RegExp('ि(' + CLUSTER + ')', 'g');  // ि + cluster → cluster + ि
  var REPH_RX = new RegExp('(' + CLUSTER + '[ा-ौँं]*)' + REPH, 'g');

  function krutiToUnicode(src) {
    var out = '', i = 0;
    while (i < src.length) {
      var hit = null;
      for (var k = 0; k < KEYS.length; k++) {
        if (src.substr(i, KEYS[k].length) === KEYS[k]) { hit = KEYS[k]; break; }
      }
      if (hit) { out += T[hit]; i += hit.length; } else { out += src[i]; i++; }
    }
    out = out.replace(I_MATRA, '$1ि');
    out = out.replace(REPH_RX, 'र्$1');
    out = out.split(REPH).join('र्'); // any stray reph
    out = out.replace(/्ा/g, '');    // half-form + ा typed separately = full form
    return out;
  }

  window.krutiToUnicode = krutiToUnicode;
})();

/* Unicode Devanagari → Kruti Dev 010 (reverse of krutiToUnicode).
 * 1) mark reph (र् starting a cluster), 2) move ि before its consonant
 * cluster (Kruti Dev types it first), 3) move reph after the syllable as Z,
 * 4) longest-match glyph table; consonant + ्र → full form + z.
 * Exposes window.unicodeToKruti(text).
 */
(function () {
  'use strict';
  var U = {
    // conjuncts with their own glyphs
    'क्ष्': '{', 'क्ष': '{k', 'त्र्': '«', 'त्र': '=', 'ज्ञ': 'K', 'श्र': 'J', 'द्य': '|', 'द्व': '}',
    'द्र': 'æ', 'प्र': 'iz', 'क्र': 'Ø', 'कृ': 'Ñ', 'त्त्': 'Ù', 'त्त': 'Ùk', 'द्द': 'í', 'न्न': 'é',
    'ह्न': 'à', 'ह्य': 'á', 'हृ': 'â', 'ह्म': 'ã', 'ह्र': 'ºz', 'रु': '#', 'रू': ':', 'ट्र': 'Vª', 'ड्र': 'Mª',
    'ग्र': 'xz',
    // nukta forms
    'ड़': 'M+', 'ढ़': '<+', 'क़': 'd+', 'ख़': '[+k', 'ग़': 'x+', 'ज़': 't+', 'फ़': 'Q+',
    // half forms
    'क्': 'D', 'ख्': '[', 'ग्': 'X', 'घ्': '?', 'च्': 'P', 'ज्': 'T', 'झ्': '÷', 'ण्': '.', 'त्': 'R',
    'थ्': 'F', 'ध्': '/', 'न्': 'U', 'प्': 'I', 'फ्': '¶', 'ब्': 'C', 'भ्': 'H', 'म्': 'E', 'य्': '¸',
    'ल्': 'Y', 'व्': 'O', 'श्': "'", 'ष्': '"', 'स्': 'L',
    // full consonants
    'क': 'd', 'ख': '[k', 'ग': 'x', 'घ': '?k', 'ङ': '³', 'च': 'p', 'छ': 'N', 'ज': 't', 'झ': '>', 'ञ': '¥',
    'ट': 'V', 'ठ': 'B', 'ड': 'M', 'ढ': '<', 'ण': '.k', 'त': 'r', 'थ': 'Fk', 'द': 'n', 'ध': '/k', 'न': 'u',
    'प': 'i', 'फ': 'Q', 'ब': 'c', 'भ': 'Hk', 'म': 'e', 'य': ';', 'र': 'j', 'ल': 'y', 'ळ': 'G', 'व': 'o',
    'श': "'k", 'ष': '"k', 'स': 'l', 'ह': 'g',
    // vowels
    'ऑ': 'vkW', 'ओ': 'vks', 'औ': 'vkS', 'आ': 'vk', 'अ': 'v', 'ई': 'bZ', 'इ': 'b', 'उ': 'm', 'ऊ': 'Å',
    'ऐ': ',s', 'ए': ',', 'ऋ': '_',
    // matras and signs
    'ॉ': 'kW', 'ो': 'ks', 'ौ': 'kS', 'ा': 'k', 'ि': 'f', 'ी': 'h', 'ु': 'q', 'ू': 'w', 'ृ': '`',
    'े': 's', 'ै': 'S', 'ॅ': 'W', 'ं': 'a', 'ँ': '¡', 'ः': '%', '्': '~', '़': '+',
    '।': 'A', '॰': 'Œ'
  };
  var KEYS = Object.keys(U).sort(function (a, b) { return b.length - a.length; });
  var NUKTA = { 'क़': 'क़', 'ख़': 'ख़', 'ग़': 'ग़', 'ज़': 'ज़', 'ड़': 'ड़', 'ढ़': 'ढ़', 'फ़': 'फ़', 'य़': 'य़' };
  var C = '[क-ह]़?';
  var CL = C + '(?:्' + C + ')*';
  var REPH = '';

  function unicodeToKruti(src) {
    var s = src.replace(/[क़-य़]/g, function (ch) { return NUKTA[ch] || ch; });
    // 1) reph: र् at the start of a cluster (not after another halant)
    s = s.replace(new RegExp('(^|[^्])र्(?=' + C + ')', 'g'), '$1' + REPH);
    // 2) ि goes before its cluster
    s = s.replace(new RegExp('(' + CL + ')ि', 'g'), 'ि$1');
    // 3) reph after the cluster and its vowel signs
    s = s.replace(new RegExp(REPH + '(ि?' + CL + '[ा-ौँं]*)', 'g'), '$1Z');
    s = s.split(REPH).join('j~');
    // 4) glyph table
    var out = '', i = 0;
    while (i < s.length) {
      var hit = null;
      for (var k = 0; k < KEYS.length; k++) {
        if (s.substr(i, KEYS[k].length) === KEYS[k]) { hit = KEYS[k]; break; }
      }
      if (hit) {
        // consonant + ्र with no dedicated glyph → full consonant + z
        if (hit.length === 2 && hit.charAt(1) === '्' && s.charAt(i + 2) === 'र') {
          out += U[hit.charAt(0)] + 'z'; i += 3; continue;
        }
        out += U[hit]; i += hit.length;
      } else { out += s[i]; i++; }
    }
    return out;
  }

  window.unicodeToKruti = unicodeToKruti;
})();
