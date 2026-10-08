/* hinglish.js — phonetic English (Hinglish) → Unicode Devanagari
 * Shared by: homepage generator, /tools/hindi-typing, /fonts/unicode-converter.
 * Rules: consonant + vowel → consonant + matra; consonant + consonant → conjunct
 * (halant); word-final "a" after a consonant → ा (mera → मेरा); a capitalised
 * first letter from phone auto-caps is ignored (Namaste ≠ णमस्ते).
 * Exposes window.HFSTranslit.word(w) and window.HFSTranslit.text(str).
 */
(function () {
  'use strict';

  // Common words whose spelling a rule engine cannot guess.
  var WORDS = {
    namaste: 'नमस्ते', namaskar: 'नमस्कार', bharat: 'भारत', india: 'भारत',
    hindi: 'हिंदी', diwali: 'दीपावली', shubh: 'शुभ', jai: 'जय', ram: 'राम',
    sita: 'सीता', krishna: 'कृष्ण', radhe: 'राधे', pyar: 'प्यार', pyaar: 'प्यार',
    mera: 'मेरा', naam: 'नाम', dil: 'दिल', zindagi: 'ज़िंदगी', yaar: 'यार',
    bhai: 'भाई', dost: 'दोस्त', ghar: 'घर', khana: 'खाना', paani: 'पानी',
    duniya: 'दुनिया', sapna: 'सपना', khushi: 'ख़ुशी', din: 'दिन', raat: 'रात',
    subah: 'सुबह', shaam: 'शाम', aaj: 'आज', kal: 'कल', hum: 'हम', tum: 'तुम',
    main: 'मैं', mein: 'में', hai: 'है', hain: 'हैं', nahi: 'नहीं', nahin: 'नहीं',
    haan: 'हाँ', accha: 'अच्छा', achha: 'अच्छा', theek: 'ठीक', thik: 'ठीक',
    sundar: 'सुंदर', happy: 'हैप्पी', birthday: 'बर्थडे', welcome: 'स्वागत',
    thanks: 'धन्यवाद', dhanyavaad: 'धन्यवाद', dhanyavad: 'धन्यवाद', sorry: 'सॉरी',
    please: 'कृपया', kripya: 'कृपया', shubhkamnaayen: 'शुभकामनाएं',
    shubhkamnayen: 'शुभकामनाएं', prasann: 'प्रसन्न', anand: 'आनंद',
    parivar: 'परिवार', mata: 'माता', pita: 'पिता', bahan: 'बहन', behen: 'बहन',
    ganga: 'गंगा', yamuna: 'यमुना', himalaya: 'हिमालय', desh: 'देश',
    rashtra: 'राष्ट्र', shakti: 'शक्ति', bhakti: 'भक्ति', seva: 'सेवा',
    kya: 'क्या', kyun: 'क्यों', kyon: 'क्यों', aap: 'आप', aapka: 'आपका',
    hindustan: 'हिंदुस्तान', janmdin: 'जन्मदिन', badhai: 'बधाई', ho: 'हो'
  };

  // Consonants, longest keys first when matched.
  var CONS = {
    'ksh': 'क्ष', 'chh': 'छ', 'gy': 'ज्ञ', 'kh': 'ख', 'gh': 'घ', 'ch': 'च', 'jh': 'झ',
    'Th': 'ठ', 'Dh': 'ढ', 'th': 'थ', 'dh': 'ध', 'ph': 'फ', 'bh': 'भ', 'sh': 'श',
    'Sh': 'ष', 'Rh': 'ढ़',
    'k': 'क', 'g': 'ग', 'c': 'च', 'j': 'ज', 'T': 'ट', 'D': 'ड', 'N': 'ण',
    't': 'त', 'd': 'द', 'n': 'न', 'p': 'प', 'f': 'फ़', 'b': 'ब', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व', 's': 'स', 'h': 'ह',
    'q': 'क़', 'z': 'ज़', 'x': 'क्स', 'R': 'ड़'
  };
  // [independent vowel, matra]
  var VOW = {
    'aa': ['आ', 'ा'], 'A': ['आ', 'ा'], 'ai': ['ऐ', 'ै'], 'au': ['औ', 'ौ'],
    'ee': ['ई', 'ी'], 'ii': ['ई', 'ी'], 'I': ['ई', 'ी'], 'oo': ['ऊ', 'ू'],
    'uu': ['ऊ', 'ू'], 'U': ['ऊ', 'ू'], 'ri': ['ऋ', 'ृ'], 'E': ['ऐ', 'ै'],
    'a': ['अ', ''], 'i': ['इ', 'ि'], 'u': ['उ', 'ु'], 'e': ['ए', 'े'], 'o': ['ओ', 'ो'],
    'O': ['औ', 'ौ']
  };
  var MARKS = { 'M': 'ं', '.n': 'ँ', 'H': 'ः', '|': '।', '||': '॥' };
  var HAL = '्';

  function keys(o) { return Object.keys(o).sort(function (a, b) { return b.length - a.length; }); }
  var CK = keys(CONS), VK = keys(VOW), MK = keys(MARKS);

  function match(list, w, i) {
    for (var k = 0; k < list.length; k++) {
      if (w.substr(i, list[k].length) === list[k]) return list[k];
    }
    return null;
  }

  function word(w) {
    if (!w) return w;
    var lower = w.toLowerCase();
    if (WORDS[lower]) return WORDS[lower];
    // phone auto-capitalisation: "Namaste" → "namaste"
    if (/^[A-Z][a-z]+$/.test(w)) w = lower;

    var out = '', i = 0, prev = null; // prev = key of the previous consonant (null after a vowel)
    while (i < w.length) {
      var m = match(MK, w, i);
      if (m && i > 0) {
        out += MARKS[m]; i += m.length; prev = null; continue;
      }
      var c = match(CK, w, i);
      var v = match(VK, w, i);
      if (v === 'ri' && prev) v = null; // after a consonant "ri" = र + ि
      if (v && (!c || v.length >= c.length)) {
        var end = i + v.length === w.length;
        if (prev) {
          // Hinglish: final "a" = ा (mera, accha), final "i" = ी (hindi, ki, bhi)
          if (end && v === 'a' && w.length > 2 && !/्र$/.test(out)) out += 'ा'; // but mitra → मित्र
          else if (end && v === 'i') out += 'ी';
          else out += VOW[v][1];
        } else {
          out += VOW[v][0];
        }
        i += v.length; prev = null; continue;
      }
      if (c) {
        if (prev) {
          var nextIsVowel = !!match(VK, w, i + c.length);
          var finalCluster = !nextIsVowel && i + c.length >= w.length;
          if ((prev === 'n' || prev === 'm') && STOPS[c] && w.length > 2) {
            out = out.slice(0, -1) + 'ं';           // sundar → सुंदर, ganga → गंगा
          } else if (SEMI[c] || (SIBIL[prev] && STOPS[c]) || gem(prev, c) || finalCluster ||
                     (c === 'h' && NASL[prev]) || out.length === CONS[prev].length) {
            out += HAL;                              // प्र, प्य, स्त, क्क, च्छ, वक्त
          }                                          // else keep inherent a: likhna → लिखना
        }
        out += CONS[c]; i += c.length; prev = c; continue;
      }
      out += w[i]; i++; prev = null;
    }
    return out;
  }

  var SEMI = { y: 1, r: 1, v: 1, w: 1 };
  var SIBIL = { s: 1, sh: 1, Sh: 1 };
  var NASL = { m: 1, n: 1, l: 1 };      // tumhara → तुम्हारा, unhe → उन्हे
  var STOPS = {};
  'k kh g gh c ch chh j jh T Th D Dh t th d dh p ph b bh'.split(' ').forEach(function (k) { STOPS[k] = 1; });
  var ASP = { 'क': 'ख', 'ग': 'घ', 'च': 'छ', 'ज': 'झ', 'ट': 'ठ', 'ड': 'ढ', 'त': 'थ', 'द': 'ध', 'प': 'फ', 'ब': 'भ' };
  function gem(a, b) {
    var x = CONS[a], y = CONS[b];
    return x === y || ASP[x] === y;
  }

  function text(str) {
    if (!str) return str;
    // Keep anything already in Devanagari untouched; convert Latin runs only.
    return str.replace(/[A-Za-z.|]+/g, function (run) {
      if (run === '.') return run;
      return word(run);
    });
  }

  window.HFSTranslit = { word: word, text: text };
})();
