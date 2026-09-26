/* generator.js — Hindi font style engine */

/* ── TRANSLITERATION (single unified system) ── */
const EN_HI = {
  'namaste':'नमस्ते','namaskar':'नमस्कार','bharat':'भारत','india':'भारत',
  'hindi':'हिंदी','diwali':'दीपावली','holi':'होली','dussehra':'दशहरा',
  'shubh':'शुभ','jai':'जय','ram':'राम','sita':'सीता','krishna':'कृष्ण',
  'radhe':'राधे','ganesh':'गणेश','durga':'दुर्गा','lakshmi':'लक्ष्मी',
  'pyaar':'प्यार','pyar':'प्यार','mohabbat':'मोहब्बत','dil':'दिल',
  'zindagi':'ज़िंदगी','yaar':'यार','bhai':'भाई','dost':'दोस्त',
  'ghar':'घर','parivar':'परिवार','mata':'माता','pita':'पिता',
  'mera':'मेरा','naam':'नाम','khushi':'खुशी','anand':'आनंद',
  'ganga':'गंगा','yamuna':'यमुना','himalaya':'हिमालय','desh':'देश',
  'shakti':'शक्ति','bhakti':'भक्ति','sevaa':'सेवा','dharma':'धर्म',
  'karma':'कर्म','gyan':'ज्ञान','satya':'सत्य','ahimsa':'अहिंसा',
  'sundar':'सुंदर','sunder':'सुंदर','beautiful':'सुंदर',
  'happy':'खुश','birthday':'जन्मदिन','welcome':'स्वागत',
  'thanks':'धन्यवाद','dhanyavaad':'धन्यवाद','dhanyavad':'धन्यवाद',
  'sorry':'माफ़','please':'कृपया','good morning':'सुप्रभात',
  'good night':'शुभ रात्रि','good evening':'शुभ संध्या',
  'jai hind':'जय हिंद','vande mataram':'वन्दे मातरम्',
  'bharat mata ki jai':'भारत माता की जय',
  'shubhkamnaayen':'शुभकामनाएं','shubhkamnaen':'शुभकामनाएं',
  'abhinandan':'अभिनंदन','swagat':'स्वागत','pranam':'प्रणाम',
  'love':'प्यार','king':'राजा','queen':'रानी','hero':'नायक',
  'legend':'किंवदंती','warrior':'योद्धा','lion':'शेर',
  'tiger':'बाघ','fire':'आग','thunder':'बिजली','storm':'तूफान',
  'khana':'खाना','paani':'पानी','duniya':'दुनिया','sapna':'सपना',
};

function isDevanagari(t) { return /[\u0900-\u097F]/.test(t); }

function autoTranslate(raw) {
  if (!raw || isDevanagari(raw)) return raw;
  var lower = raw.toLowerCase().trim();
  if (EN_HI[lower]) return EN_HI[lower];
  var words = lower.split(/\s+/);
  var out   = words.map(function(w) { return EN_HI[w] || w; });
  return out.some(function(w, i) { return w !== words[i]; }) ? out.join(' ') : raw;
}

document.addEventListener('DOMContentLoaded', function() {
  var inp    = document.getElementById('inputText');
  var grid   = document.getElementById('fontGrid');
  var prevBtn= document.getElementById('prevPage');
  var nextBtn= document.getElementById('nextPage');
  var curEl  = document.getElementById('curPage');
  var totEl  = document.getElementById('totPages');
  var cntEl  = document.getElementById('styleCount');
  if (!inp || !grid) return;

  /* ── BASE FONTS ── */
  var BASE = [
    {n:'गोटू',        f:'Gotu',                     t:'sans'},
    {n:'मोदक',        f:'Modak',                    t:'display'},
    {n:'श्रीखंड',     f:'Srikhand',                 t:'display'},
    {n:'टेको',        f:'Teko',                     t:'display'},
    {n:'कलम',         f:'Kalam',                    t:'calli'},
    {n:'नोटो सैन्स',  f:'Noto Sans Devanagari',     t:'sans'},
    {n:'तिल्लाना',    f:'Tillana',                  t:'calli'},
    {n:'ग्लेगू',      f:'Glegoo',                   t:'serif'},
    {n:'बालू 2',      f:'Baloo 2',                  t:'display'},
    {n:'इंक नट',      f:'Inknut Antiqua',           t:'serif'},
    {n:'पॉपिन्स',     f:'Poppins',                  t:'sans'},
    {n:'आर्य',        f:'Arya',                     t:'sans'},
    {n:'हिन्द',       f:'Hind',                     t:'sans'},
    {n:'जैनी पूर्वा', f:'Jaini Purva',              t:'display'},
    {n:'पालकी डार्क', f:'Palanquin Dark',           t:'sans'},
    {n:'मुक्ता',      f:'Mukta',                    t:'sans'},
    {n:'तिरो',        f:'Tiro Devanagari Hindi',    t:'serif'},
    {n:'बालू भाई',    f:'Baloo Bhai 2',             t:'display'},
    {n:'कर्मा',       f:'Karma',                    t:'serif'},
    {n:'बालू तम्बी',  f:'Baloo Thambi 2',           t:'display'},
    {n:'रोझा वन',     f:'Rozha One',                t:'display'},
    {n:'बालू पाजी',   f:'Baloo Paaji 2',            t:'display'},
    {n:'बालू चेट्टन', f:'Baloo Chettan 2',          t:'display'},
    {n:'अनेक',        f:'Anek Devanagari',           t:'sans'},
    {n:'बालू भैना',   f:'Baloo Bhaina 2',           t:'display'},
    {n:'यंत्रमानव',   f:'Yantramanav',              t:'sans'},
    {n:'कम्बे',       f:'Cambay',                   t:'sans'},
    {n:'खुला',        f:'Khula',                    t:'sans'},
    {n:'मार्टेल',     f:'Martel',                   t:'serif'},
    {n:'सरला',        f:'Sarala',                   t:'sans'},
    {n:'यात्रा वन',   f:'Yatra One',                t:'display'},
    {n:'बिरयानी',     f:'Biryani',                  t:'display'},
    {n:'साहित्य',     f:'Sahitya',                  t:'serif'},
    {n:'अमिता',       f:'Amita',                    t:'calli'},
    {n:'एक्ज़ार',     f:'Eczar',                    t:'serif'},
    {n:'हलन्त',       f:'Halant',                   t:'sans'},
    {n:'लैला',        f:'Laila',                    t:'calli'},
    {n:'राजधानी',     f:'Rajdhani',                 t:'sans'},
    {n:'रंगा',        f:'Ranga',                    t:'calli'},
    {n:'डेको',        f:'Dekko',                    t:'calli'},
    {n:'सूर्य',       f:'Sura',                     t:'serif'},
    {n:'असर',         f:'Asar',                     t:'serif'},
    {n:'खंड',         f:'Khand',                    t:'sans'},
    {n:'पटुआ',        f:'Patua One',                t:'display'},
    {n:'प्रगति',      f:'Pragati Narrow',           t:'sans'},
    {n:'जल्दी',       f:'Jaldi',                    t:'sans'},
    {n:'कुराले',      f:'Kurale',                   t:'serif'},
    {n:'सुमन',        f:'Sumana',                   t:'serif'},
    {n:'वेस्पर',      f:'Vesper Libre',             t:'serif'},
    {n:'कड़वा',       f:'Kadwa',                    t:'serif'},
    {n:'रोडियम',      f:'Rhodium Libre',            t:'serif'},
    {n:'जैनी',        f:'Jaini',                    t:'display'},
    {n:'पालकी',       f:'Palanquin',                t:'sans'},
    {n:'नोटो सेरिफ',  f:'Noto Serif Devanagari',    t:'serif'},
    {n:'तिरो संस्कृत', f:'Tiro Devanagari Sanskrit', t:'serif'},
    {n:'तिरो मराठी',  f:'Tiro Devanagari Marathi',  t:'serif'},
    {n:'अक्षर',       f:'Akshar',                   t:'sans'},
    {n:'अमीको',       f:'Amiko',                    t:'sans'},
  ];

  var EFFECTS = [
    {k:'3d',      cls:'style-3d',       suffix:' 3D',     on:['Modak','Baloo 2','Teko','Rozha One','Srikhand']},
    {k:'shadow',  cls:'style-shadow',   suffix:' Shadow', on:['Poppins','Kalam','Ranga','Gotu']},
    {k:'outline', cls:'style-outline',  suffix:' Outline',on:['Baloo 2','Teko','Modak','Srikhand']},
    {k:'hearts',  cls:'style-hearts',   suffix:' ♥',      on:['Kalam','Amita','Laila','Tillana','Dekko']},
    {k:'stars',   cls:'style-stars',    suffix:' ★',      on:['Kalam','Amita','Laila','Tillana','Dekko']},
    {k:'brackets',cls:'style-brackets', suffix:' 【】',   on:['Noto Sans Devanagari','Hind','Rajdhani']},
    {k:'under',   cls:'style-underline',suffix:' Line',   on:['Poppins','Hind','Mukta','Tiro Devanagari Hindi']},
    {k:'bold',    cls:'style-bold',     suffix:' Bold',   on:['Noto Sans Devanagari','Hind','Mukta','Poppins']},
    {k:'italic',  cls:'style-italic',   suffix:' Italic', on:['Tiro Devanagari Hindi','Karma','Martel','Sahitya']},
  ];

  /* Build full styles list */
  var STYLES = [];
  BASE.forEach(function(b) { STYLES.push({lbl:b.n, fam:b.f, cls:'', tag:b.t}); });
  EFFECTS.forEach(function(e) {
    BASE.filter(function(b) { return e.on.includes(b.f); }).forEach(function(b) {
      STYLES.push({lbl:b.n+e.suffix, fam:b.f, cls:e.cls, tag:'effect'});
    });
  });

  var PER  = 12;
  var page = 1;
  var loaded = new Set();
  var pendingFonts  = [];
  var fontBatchTimer = null;

  function tot() { return Math.ceil(STYLES.length / PER); }

  if (cntEl) cntEl.textContent = STYLES.length + ' styles';

  /* ── FONT LOADING — batched, non-blocking ── */
  function loadFont(fam) {
    if (loaded.has(fam)) return;
    loaded.add(fam);
    pendingFonts.push(fam);
    clearTimeout(fontBatchTimer);
    fontBatchTimer = setTimeout(flushFontBatch, 50);
  }

  function flushFontBatch() {
    if (!pendingFonts.length) return;
    var batch = pendingFonts.splice(0, 8);
    var url = 'https://fonts.googleapis.com/css2?' +
      batch.map(function(f) { return 'family=' + encodeURIComponent(f); }).join('&') +
      '&display=swap';
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = url;
    document.head.appendChild(l);
    if (pendingFonts.length) setTimeout(flushFontBatch, 100);
  }

  /* ── GET TEXT — single unified function ── */
  function getText() {
    var raw = inp.value.trim();
    if (!raw) return 'नमस्ते भारत';
    return autoTranslate(raw) || raw;
  }

  var TAG_LABELS = {display:'Display', serif:'Serif', sans:'Sans', calli:'Calligraphy', effect:'Effect'};

  /* ── RENDER ── */
  function render() {
    grid.classList.remove('loading');
    grid.innerHTML = '';
    var t     = getText();
    var slice = STYLES.slice((page - 1) * PER, page * PER);

    slice.forEach(function(s) {
      loadFont(s.fam);
      var card = document.createElement('div');
      card.className = 'font-card';

      var meta = document.createElement('div'); meta.className = 'fc-meta';
      var nm   = document.createElement('span'); nm.className = 'fc-name'; nm.textContent = s.lbl;
      var tg   = document.createElement('span'); tg.className = 'fc-tag ' + s.tag;
      tg.textContent = TAG_LABELS[s.tag] || s.tag;
      meta.append(nm, tg);

      var prev = document.createElement('div');
      prev.className = 'fc-preview' + (s.cls ? ' ' + s.cls : '');
      prev.style.fontFamily = "'" + s.fam + "', 'Noto Sans Devanagari', sans-serif";
      prev.textContent = t;

      var btns = document.createElement('div'); btns.className = 'fc-btns';

      /* Copy button */
      var cpBtn = mkBtn('<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy');
      cpBtn.onclick = async function() {
        var txt = prev.textContent;
        try { await navigator.clipboard.writeText(txt); }
        catch(e) { var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta); }
        cpBtn.classList.add('copied'); cpBtn.textContent = '✓ Copied';
        setTimeout(function() {
          cpBtn.classList.remove('copied');
          cpBtn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
        }, 2000);
      };

      /* Font download button */
      var ftBtn = mkBtn('↓ Font');
      ftBtn.onclick = function() {
        window.open('https://fonts.google.com/specimen/' + s.fam.replace(/ /g, '+'), '_blank', 'noopener,noreferrer');
        ftBtn.textContent = '↗ Opened';
        setTimeout(function() { ftBtn.textContent = '↓ Font'; }, 2000);
      };

      /* Image download button */
      var imgBtn = mkBtn('⬡ Image');
      imgBtn.onclick = async function() {
        if (typeof html2canvas === 'undefined') {
          loadHtml2Canvas(function() { imgBtn.click(); });
          imgBtn.textContent = 'Loading...'; return;
        }
        var wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed;left:-9999px;top:0;padding:28px 36px;background:#FDFCFA';
        var p = document.createElement('p');
        p.style.cssText = "font-family:'" + s.fam + "',sans-serif;font-size:2.5rem;color:#1C1917;margin:0;line-height:1.3";
        if (s.cls) p.classList.add(s.cls);
        p.textContent = t; wrap.appendChild(p); document.body.appendChild(wrap);
        await document.fonts.load('1rem "' + s.fam + '"');
        var cv = await html2canvas(wrap, {backgroundColor:'#FDFCFA', scale:3, logging:false});
        document.body.removeChild(wrap);
        var a = document.createElement('a');
        a.href = cv.toDataURL('image/png');
        a.download = 'hindi-font-' + s.lbl.replace(/[^\w]/g,'-').replace(/-+/g,'-') + '.png';
        a.click();
      };

      /* Transparent PNG button */
      var tpngBtn = mkBtn('⬡ Transparent');
      tpngBtn.title = 'Download with transparent background';
      tpngBtn.onclick = async function() {
        if (typeof html2canvas === 'undefined') {
          loadHtml2Canvas(function() { tpngBtn.click(); });
          tpngBtn.textContent = 'Loading...'; return;
        }
        var wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed;left:-9999px;top:0;padding:28px 36px;background:transparent';
        var p2 = document.createElement('p');
        var tc = document.getElementById('textColorPicker');
        p2.style.cssText = "font-family:'" + s.fam + "',sans-serif;font-size:2.5rem;color:" + (tc ? tc.value : '#1C1917') + ";margin:0;line-height:1.3";
        if (s.cls) p2.classList.add(s.cls);
        p2.textContent = t; wrap.appendChild(p2); document.body.appendChild(wrap);
        await document.fonts.load('1rem "' + s.fam + '"');
        var cv = await html2canvas(wrap, {backgroundColor:null, scale:3, logging:false});
        document.body.removeChild(wrap);
        var a = document.createElement('a');
        a.href = cv.toDataURL('image/png');
        a.download = 'hindi-font-transparent-' + s.lbl.replace(/[^\w]/g,'-') + '.png';
        a.click();
        tpngBtn.textContent = '✓ Done';
        setTimeout(function() { tpngBtn.textContent = '⬡ Transparent'; }, 2000);
      };

      btns.append(cpBtn, ftBtn, imgBtn, tpngBtn);
      card.append(meta, prev, btns);
      grid.appendChild(card);
    });

    if (curEl) curEl.textContent = page;
    if (totEl) totEl.textContent = tot();
    if (prevBtn) prevBtn.disabled = (page === 1);
    if (nextBtn) nextBtn.disabled = (page === tot());

    _reapplyControls();
  }

  function mkBtn(html) {
    var b = document.createElement('button');
    b.className = 'fc-btn'; b.innerHTML = html; return b;
  }

  /* ── LIVE TEXT UPDATE ── */
  inp.addEventListener('input', function() {
    var t = getText();
    document.querySelectorAll('.fc-preview').forEach(function(el) { el.textContent = t; });
  });

  /* ── PAGINATION ── */
  if (prevBtn) prevBtn.onclick = function() {
    if (page > 1) {
      page--; render();
      var gen = document.getElementById('generator');
      if (gen) gen.scrollIntoView({behavior:'smooth', block:'start'});
    }
  };
  if (nextBtn) nextBtn.onclick = function() {
    if (page < tot()) {
      page++; render();
      var gen = document.getElementById('generator');
      if (gen) gen.scrollIntoView({behavior:'smooth', block:'start'});
    }
  };

  /* ── INPUT HELPERS ── */
  var pasteBtn = document.getElementById('pasteBtn');
  var clearBtn = document.getElementById('clearBtn');
  if (pasteBtn) pasteBtn.addEventListener('click', async function() {
    try { inp.value = await navigator.clipboard.readText(); inp.dispatchEvent(new Event('input')); } catch(e) {}
  });
  if (clearBtn) clearBtn.addEventListener('click', function() {
    inp.value = ''; inp.dispatchEvent(new Event('input'));
  });

  /* ── SIZE + COLOUR CONTROLS ── */
  function _reapplyControls() {
    var slider   = document.getElementById('fontSizeSlider');
    var textPick = document.getElementById('textColorPicker');
    var bgPick   = document.getElementById('bgColorPicker');
    if (slider && slider.value !== '32') {
      document.querySelectorAll('.fc-preview').forEach(function(el) {
        el.style.fontSize = slider.value + 'px';
      });
    }
    if (textPick && textPick.value !== '#1c1917' && textPick.value !== '#1C1917') {
      document.querySelectorAll('.fc-preview').forEach(function(el) {
        el.style.color = textPick.value;
      });
    }
    if (bgPick && bgPick.value !== '#fdfcfa' && bgPick.value !== '#FDFCFA') {
      document.querySelectorAll('.font-card').forEach(function(el) {
        el.style.background = bgPick.value;
      });
    }
  }

  (function initControls() {
    var slider   = document.getElementById('fontSizeSlider');
    var sLabel   = document.getElementById('fontSizeVal');
    var textPick = document.getElementById('textColorPicker');
    var bgPick   = document.getElementById('bgColorPicker');
    if (slider) {
      slider.addEventListener('input', function() {
        if (sLabel) sLabel.textContent = this.value + 'px';
        document.querySelectorAll('.fc-preview').forEach(function(el) {
          el.style.fontSize = slider.value + 'px';
        });
      });
    }
    if (textPick) {
      textPick.addEventListener('input', function() {
        document.querySelectorAll('.fc-preview').forEach(function(el) {
          el.style.color = textPick.value;
        });
      });
    }
    if (bgPick) {
      bgPick.addEventListener('input', function() {
        document.querySelectorAll('.font-card').forEach(function(el) {
          el.style.background = bgPick.value;
        });
      });
    }
  })();

  /* ── INIT ── */
  render();
});
