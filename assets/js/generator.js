/* generator.js — Hindi font style engine */
document.addEventListener('DOMContentLoaded', () => {
  const inp    = document.getElementById('inputText');
  const grid   = document.getElementById('fontGrid');
  const prevBtn= document.getElementById('prevPage');
  const nextBtn= document.getElementById('nextPage');
  const curEl  = document.getElementById('curPage');
  const totEl  = document.getElementById('totPages');
  const cntEl  = document.getElementById('styleCount');
  if (!inp || !grid) return;

  /* ── BASE FONTS ── */
  /* Every Google Fonts family with Devanagari support (61; Noto Sans skipped as it
     duplicates Noto Sans Devanagari). w = weights shown as separate fonts. */
  const BASE = [
    {n:'गोटू', f:'Gotu', t:'sans', w:[400]},
    {n:'मोदक', f:'Modak', t:'display', w:[400]},
    {n:'टेको', f:'Teko', t:'display', w:[300,400,700]},
    {n:'कलम', f:'Kalam', t:'calli', w:[300,400,700]},
    {n:'नोटो सैन्स', f:'Noto Sans Devanagari', t:'sans', w:[100,400,700,900]},
    {n:'तिल्लाना', f:'Tillana', t:'calli', w:[400,700,800]},
    {n:'ग्लेगू', f:'Glegoo', t:'serif', w:[400,700]},
    {n:'बालू 2', f:'Baloo 2', t:'display', w:[400,700,800]},
    {n:'इंक नट', f:'Inknut Antiqua', t:'serif', w:[300,400,700,900]},
    {n:'पॉपिन्स', f:'Poppins', t:'sans', w:[100,400,700,900]},
    {n:'आर्य', f:'Arya', t:'sans', w:[400,700]},
    {n:'हिन्द', f:'Hind', t:'sans', w:[300,400,700]},
    {n:'जैनी पूर्वा', f:'Jaini Purva', t:'display', w:[400]},
    {n:'पालकी डार्क', f:'Palanquin Dark', t:'sans', w:[400,700]},
    {n:'मुक्ता', f:'Mukta', t:'sans', w:[200,400,700,800]},
    {n:'तिरो', f:'Tiro Devanagari Hindi', t:'serif', w:[400]},
    {n:'कर्मा', f:'Karma', t:'serif', w:[300,400,700]},
    {n:'रोझा वन', f:'Rozha One', t:'display', w:[400]},
    {n:'अनेक', f:'Anek Devanagari', t:'sans', w:[100,400,700,800]},
    {n:'यंत्रमानव', f:'Yantramanav', t:'sans', w:[100,400,700,900]},
    {n:'कम्बे', f:'Cambay', t:'sans', w:[400,700]},
    {n:'खुला', f:'Khula', t:'sans', w:[300,400,700,800]},
    {n:'मार्टेल', f:'Martel', t:'serif', w:[200,400,700,900]},
    {n:'सरला', f:'Sarala', t:'sans', w:[400,700]},
    {n:'यात्रा वन', f:'Yatra One', t:'display', w:[400]},
    {n:'बिरयानी', f:'Biryani', t:'display', w:[200,400,700,900]},
    {n:'साहित्य', f:'Sahitya', t:'serif', w:[400,700]},
    {n:'अमिता', f:'Amita', t:'calli', w:[400,700]},
    {n:'एक्ज़ार', f:'Eczar', t:'serif', w:[400,700,800]},
    {n:'हलन्त', f:'Halant', t:'sans', w:[300,400,700]},
    {n:'लैला', f:'Laila', t:'calli', w:[300,400,700]},
    {n:'राजधानी', f:'Rajdhani', t:'sans', w:[300,400,700]},
    {n:'रंगा', f:'Ranga', t:'calli', w:[400,700]},
    {n:'डेको', f:'Dekko', t:'calli', w:[400]},
    {n:'सूर्य', f:'Sura', t:'serif', w:[400,700]},
    {n:'असर', f:'Asar', t:'serif', w:[400]},
    {n:'खंड', f:'Khand', t:'sans', w:[300,400,700]},
    {n:'प्रगति', f:'Pragati Narrow', t:'sans', w:[400,700]},
    {n:'जल्दी', f:'Jaldi', t:'sans', w:[400,700]},
    {n:'कुराले', f:'Kurale', t:'serif', w:[400]},
    {n:'सुमन', f:'Sumana', t:'serif', w:[400,700]},
    {n:'वेस्पर', f:'Vesper Libre', t:'serif', w:[400,700,900]},
    {n:'कड़वा', f:'Kadwa', t:'serif', w:[400,700]},
    {n:'रोडियम', f:'Rhodium Libre', t:'serif', w:[400]},
    {n:'जैनी', f:'Jaini', t:'display', w:[400]},
    {n:'पालकी', f:'Palanquin', t:'sans', w:[100,400,700]},
    {n:'नोटो सेरिफ', f:'Noto Serif Devanagari', t:'serif', w:[100,400,700,900]},
    {n:'तिरो संस्कृत', f:'Tiro Devanagari Sanskrit', t:'serif', w:[400]},
    {n:'तिरो मराठी', f:'Tiro Devanagari Marathi', t:'serif', w:[400]},
    {n:'अक्षर', f:'Akshar', t:'sans', w:[300,400,700]},
    {n:'अमीको', f:'Amiko', t:'sans', w:[400,700]},
    {n:'अलकत्रा', f:'Alkatra', t:'display', w:[400,700]},
    {n:'अन्नपूर्णा', f:'Annapurna SIL', t:'serif', w:[400,700]},
    {n:'बकबक', f:'Bakbak One', t:'display', w:[400]},
    {n:'गजराज', f:'Gajraj One', t:'display', w:[400]},
    {n:'गूगल सैन्स', f:'Google Sans', t:'sans', w:[400,700]},
    {n:'आईबीएम प्लेक्स', f:'IBM Plex Sans Devanagari', t:'sans', w:[100,400,700]},
    {n:'मार्टेल सैन्स', f:'Martel Sans', t:'sans', w:[200,400,700,900]},
    {n:'मातंगी', f:'Matangi', t:'sans', w:[300,400,700,900]},
    {n:'प्लेपेन', f:'Playpen Sans Deva', t:'calli', w:[100,400,700,800]},
    {n:'सरपंच', f:'Sarpanch', t:'sans', w:[400,700,900]},
  ];

  const EFFECTS = [
    {k:'3d',      cls:'style-3d',        suffix:' 3D',      on:['Modak','Baloo 2','Teko','Rozha One','Gajraj One']},
    {k:'shadow',  cls:'style-shadow',    suffix:' Shadow',  on:['Poppins','Kalam','Ranga','Gotu']},
    {k:'outline', cls:'style-outline',   suffix:' Outline', on:['Baloo 2','Teko','Modak','Gajraj One']},
    {k:'hearts',  cls:'', pre:'♥ ', post:' ♥',  suffix:' ♥',     on:['Kalam','Amita','Laila','Tillana','Dekko']},
    {k:'stars',   cls:'', pre:'★ ', post:' ★',  suffix:' ★',     on:['Kalam','Amita','Laila','Tillana','Dekko']},
    {k:'brackets',cls:'', pre:'【', post:'】',  suffix:' 【】',   on:['Noto Sans Devanagari','Hind','Rajdhani']},
    /* Unicode decorations: real characters, so they survive copy-paste */
    {k:'royal',   cls:'', pre:'꧁ ', post:' ꧂', suffix:' ꧁꧂',   on:['Noto Sans Devanagari','Kalam']},
    {k:'wave',    cls:'', pre:'★彡 ', post:' 彡★', suffix:' 彡',  on:['Noto Sans Devanagari','Kalam']},
    {k:'ribbon',  cls:'', pre:'•°¯`•• ', post:' ••´¯°•', suffix:' •°•', on:['Noto Sans Devanagari','Kalam']},
    {k:'flower',  cls:'', pre:'✿ ', post:' ✿',  suffix:' ✿',     on:['Noto Sans Devanagari','Kalam']},
    {k:'sparkle', cls:'', pre:'✨ ', post:' ✨', suffix:' ✨',     on:['Noto Sans Devanagari','Kalam']},
    {k:'frame',   cls:'', pre:'『', post:'』',  suffix:' 『』',   on:['Noto Sans Devanagari','Kalam']},
    {k:'under',   cls:'style-underline', suffix:' Line',    on:['Poppins','Hind','Mukta','Tiro Devanagari Hindi']},
    {k:'italic',  cls:'style-italic',    suffix:' Italic',  on:['Tiro Devanagari Hindi','Karma','Martel','Sahitya']},
  ];

  /* Build full styles list */
  const STYLES = [];
  const WNAME = {100:'Thin',200:'ExtraLight',300:'Light',400:'',500:'Medium',600:'SemiBold',700:'Bold',800:'ExtraBold',900:'Black'};
  const REG = b => b.w.includes(400) ? 400 : b.w[0];
  BASE.forEach(b => b.w.forEach(w => STYLES.push({
    lbl: b.n + (w === REG(b) ? '' : ' ' + WNAME[w]), fam: b.f, w: w, cls: '', tag: b.t })));
  EFFECTS.forEach(e => {
    BASE.filter(b => e.on.includes(b.f)).forEach(b => {
      STYLES.push({lbl:b.n+e.suffix, fam:b.f, w:REG(b), cls:e.cls, tag:'effect', pre:e.pre||'', post:e.post||''});
    });
  });

  const deco = (s, t) => (s.pre || '') + t + (s.post || '');
  const PER = 12;
  let page = 1;
  let filter = 'all';
  const view = () => filter === 'all' ? STYLES : STYLES.filter(s => s.tag === filter);
  const tot = () => Math.max(1, Math.ceil(view().length / PER));
  const loaded = new Set();

  if (cntEl) cntEl.textContent = STYLES.length;
  const famCount = document.getElementById('fontFamCount');
  if (famCount) famCount.textContent = BASE.length;
  const fontCount = document.getElementById('fontFileCount');
  if (fontCount) fontCount.textContent = BASE.reduce((n, b) => n + b.w.length, 0);
  document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
    filter = btn.getAttribute('data-filter'); page = 1;
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    render();
  }));

  var _pending = {};      // family -> Set of weights waiting to load
  var _fontTimer = null;
  function loadFont(fam, w) {
    var key = fam + ':' + w;
    if (loaded.has(key)) return;
    loaded.add(key);
    (_pending[fam] = _pending[fam] || new Set()).add(w);
    clearTimeout(_fontTimer);
    _fontTimer = setTimeout(_flushFonts, 50);
  }
  function _flushFonts() {
    var fams = Object.keys(_pending);
    while (fams.length) {
      var batch = fams.splice(0, 8);
      var url = 'https://fonts.googleapis.com/css2?' + batch.map(function (f) {
        var ws = Array.from(_pending[f]).sort(function (a, b) { return a - b; });
        return 'family=' + encodeURIComponent(f).replace(/%20/g, '+') + ':wght@' + ws.join(';');
      }).join('&') + '&display=swap';
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = url;
      document.head.appendChild(l);
    }
    _pending = {};
  }

  // Simple English-to-Hindi transliteration map
const TRANSLIT = {
  'a':'अ','aa':'आ','i':'इ','ii':'ई','u':'उ','uu':'ऊ',
  'e':'ए','ai':'ऐ','o':'ओ','au':'औ','ka':'क','kha':'ख',
  'ga':'ग','gha':'घ','cha':'च','chha':'छ','ja':'ज','jha':'झ',
  'ta':'त','tha':'थ','da':'द','dha':'ध','na':'न','pa':'प',
  'pha':'फ','ba':'ब','bha':'भ','ma':'म','ya':'य','ra':'र',
  'la':'ल','va':'व','sha':'श','sa':'स','ha':'ह','kka':'क्क',
  'namaste':'नमस्ते','bharat':'भारत','hindi':'हिंदी',
  'diwali':'दीपावली','shubh':'शुभ','jai':'जय',
  'radhe':'राधे','krishna':'कृष्ण','ram':'राम','sita':'सीता',
  'love':'प्यार','india':'भारत','mera':'मेरा','naam':'नाम',
  'pyar':'प्यार','dil':'दिल','zindagi':'ज़िंदगी','yaar':'यार',
  'bhai':'भाई','dost':'दोस्त','ghar':'घर','khana':'खाना'
};

function isHindi(text) {
  return /[\u0900-\u097F]/.test(text);
}

function transliterate(text) {
  if (window.HFSTranslit) return window.HFSTranslit.text(text);
  if (!text || isHindi(text)) return text;
  var lower = text.toLowerCase().trim();
  // 1. Check full phrase match first
  if (TRANSLIT[lower]) return TRANSLIT[lower];
  // 2. Try word-by-word
  var words = lower.split(/\s+/);
  var out = words.map(function(w) { return TRANSLIT[w] || w; });
  if (out.some(function(w, i) { return w !== words[i]; })) {
    return out.join(' ');
  }
  return text; // No match — return as typed
}

function getText() {
  var raw = inp.value.trim();
  if (!raw) return 'नमस्ते भारत';
  return transliterate(raw) || raw;
}

  /* html2canvas is loaded on demand the first time an image is exported */
  function ensureH2C() {
    return new Promise(function (resolve, reject) {
      if (window.html2canvas) return resolve();
      var s = document.querySelector('script[data-h2c]');
      if (!s) {
        s = document.createElement('script');
        s.src = '/assets/js/vendor/html2canvas.min.js';
        s.async = true; s.setAttribute('data-h2c', '1');
        document.head.appendChild(s);
      }
      s.addEventListener('load', function () { resolve(); });
      s.addEventListener('error', function () { reject(new Error('html2canvas failed to load')); });
    });
  }

  const TAG_LABELS = {display:'Display', serif:'Serif', sans:'Sans', calli:'Calligraphy', effect:'Effect'};

  function render() {
    grid.classList.remove('loading');
    grid.innerHTML = '';
    const t = getText();
    const slice = view().slice((page-1)*PER, page*PER);

    slice.forEach(s => {
      loadFont(s.fam, s.w);
      const card = document.createElement('div');
      card.className = 'font-card';

      const meta = document.createElement('div'); meta.className = 'fc-meta';
      const nm = document.createElement('span'); nm.className = 'fc-name'; nm.textContent = s.lbl;
      const tg = document.createElement('span'); tg.className = `fc-tag ${s.tag}`; tg.textContent = TAG_LABELS[s.tag] || s.tag;
      meta.append(nm, tg);

      const prev = document.createElement('div');
      prev.className = 'fc-preview' + (s.cls ? ' '+s.cls : '');
      prev.style.fontFamily = `'${s.fam}', sans-serif`;
      prev.style.fontWeight = s.w;
      prev.textContent = deco(s, t);
      prev.dataset.pre = s.pre || ''; prev.dataset.post = s.post || '';

      const btns = document.createElement('div'); btns.className = 'fc-btns';

      /* Copy */
      const cpBtn = mkBtn('<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy');
      cpBtn.onclick = async () => {
        const out = deco(s, getText());
        try { await navigator.clipboard.writeText(out); }
        catch { const ta=document.createElement('textarea');ta.value=out;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta); }
        cpBtn.classList.add('copied'); cpBtn.textContent = '✓ Copied';
        setTimeout(() => { cpBtn.classList.remove('copied'); cpBtn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'; }, 2000);
      };

      /* Font DL */
      const ftBtn = mkBtn('↗ Get font');
      ftBtn.title = 'Open this font on Google Fonts to download it free';
      ftBtn.onclick = () => {
        const specUrl = 'https://fonts.google.com/specimen/' + s.fam.replace(/ /g, '+');
        window.open(specUrl, '_blank', 'noopener,noreferrer');
        const orig = ftBtn.textContent;
        ftBtn.textContent = '↗ Opened';
        setTimeout(() => { ftBtn.textContent = orig; }, 2000);
      };

      /* Image DL */
      const imgBtn = mkBtn('⬡ Image');
      imgBtn.onclick = async () => {
        try { await ensureH2C(); } catch (e) { alert('Image export could not load. Please check your connection and try again.'); return; }
        const wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed;left:-9999px;top:0;padding:28px 36px;background:#FDFCFA';
        const p = document.createElement('p');
        p.style.cssText = `font-family:'${s.fam}',sans-serif;font-weight:${s.w};font-size:2.5rem;color:#1C1917;margin:0;line-height:1.3`;
        if (s.cls) p.classList.add(s.cls);
        p.textContent = deco(s, getText()); wrap.appendChild(p); document.body.appendChild(wrap);
        await document.fonts.load(`${s.w} 1rem "${s.fam}"`);
        const cv = await html2canvas(wrap, {backgroundColor:'#FDFCFA',scale:3,logging:false});
        document.body.removeChild(wrap);
        const a = document.createElement('a');
        a.href = cv.toDataURL('image/png');
        a.download = 'hindi-font-'+(s.fam+' '+(s.w===400?'':s.w)+' '+(s.cls||'')).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.png';
        a.click();
      };

      /* Transparent PNG */
      const tpngBtn = mkBtn('⬡ Transparent');
      tpngBtn.title = 'Download with transparent background';
      tpngBtn.onclick = async () => {
        try { await ensureH2C(); } catch (e) { alert('Image export could not load. Please check your connection and try again.'); return; }
        const wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed;left:-9999px;top:0;padding:28px 36px;background:transparent';
        const p2 = document.createElement('p');
        const tc = document.getElementById('textColorPicker');
        p2.style.cssText = `font-family:'${s.fam}',sans-serif;font-weight:${s.w};font-size:2.5rem;color:${tc?tc.value:'#1C1917'};margin:0;line-height:1.3`;
        if (s.cls) p2.classList.add(s.cls);
        p2.textContent = deco(s, getText()); wrap.appendChild(p2); document.body.appendChild(wrap);
        await document.fonts.load(`${s.w} 1rem "${s.fam}"`);
        const cv = await html2canvas(wrap, {backgroundColor:null, scale:3, logging:false});
        document.body.removeChild(wrap);
        const a = document.createElement('a');
        a.href = cv.toDataURL('image/png');
        a.download = 'hindi-font-transparent-'+(s.fam+' '+(s.w===400?'':s.w)+' '+(s.cls||'')).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.png';
        a.click();
        tpngBtn.textContent = '✓ Done';
        setTimeout(() => { tpngBtn.textContent = '⬡ Transparent'; }, 2000);
      };

      btns.append(cpBtn, ftBtn, imgBtn, tpngBtn);
      card.append(meta, prev, btns);
      grid.appendChild(card);
    });

    if (curEl) curEl.textContent = page;
    var rs = document.getElementById('rangeStart'), re_ = document.getElementById('rangeEnd');
    if (rs) rs.textContent = view().length ? (page - 1) * PER + 1 : 0;
    if (re_) re_.textContent = Math.min(page * PER, view().length);
    if (totEl) totEl.textContent = tot();
    if (prevBtn) prevBtn.disabled = page === 1;
    if (nextBtn) nextBtn.disabled = page === tot();

    // Re-apply size and colour after render
    _reapplyControls();
  }

  function mkBtn(html) {
    const b = document.createElement('button');
    b.className = 'fc-btn'; b.innerHTML = html; return b;
  }

  /* Live text update */
  inp.addEventListener('input', () => {
    const t = getText();
    document.querySelectorAll('.fc-preview').forEach(el => { el.textContent = (el.dataset.pre || '') + t + (el.dataset.post || ''); });
  });

  /* Pagination */
  if (prevBtn) prevBtn.onclick = () => {
    if (page > 1) { page--; render(); document.getElementById('generator')?.scrollIntoView({behavior:'smooth', block:'start'}); }
  };
  if (nextBtn) nextBtn.onclick = () => {
    if (page < tot()) { page++; render(); document.getElementById('generator')?.scrollIntoView({behavior:'smooth', block:'start'}); }
  };

  /* Input helpers */
  document.getElementById('pasteBtn')?.addEventListener('click', async () => {
    try { inp.value = await navigator.clipboard.readText(); inp.dispatchEvent(new Event('input')); } catch {}
  });
  document.getElementById('clearBtn')?.addEventListener('click', () => {
    inp.value = ''; inp.dispatchEvent(new Event('input'));
  });

  /* ── SIZE + COLOUR CONTROLS ─────────────────────────────── */
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

  /* Init */
  render();
});