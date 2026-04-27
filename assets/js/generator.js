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
  const BASE = [
    {n:'गोटू',       f:'Gotu',                    t:'sans'},
    {n:'मोदक',       f:'Modak',                   t:'display'},
    {n:'श्रीखंड',    f:'Srikhand',                t:'display'},
    {n:'टेको',       f:'Teko',                    t:'display'},
    {n:'कलम',        f:'Kalam',                   t:'calli'},
    {n:'नोटो सैन्स', f:'Noto Sans Devanagari',    t:'sans'},
    {n:'तिल्लाना',   f:'Tillana',                 t:'calli'},
    {n:'ग्लेगू',     f:'Glegoo',                  t:'serif'},
    {n:'बालू 2',     f:'Baloo 2',                 t:'display'},
    {n:'इंक नट',     f:'Inknut Antiqua',          t:'serif'},
    {n:'पॉपिन्स',    f:'Poppins',                 t:'sans'},
    {n:'आर्य',       f:'Arya',                    t:'sans'},
    {n:'हिन्द',      f:'Hind',                    t:'sans'},
    {n:'जैनी पूर्वा',f:'Jaini Purva',             t:'display'},
    {n:'पालकी डार्क',f:'Palanquin Dark',          t:'sans'},
    {n:'मुक्ता',     f:'Mukta',                   t:'sans'},
    {n:'तिरो',       f:'Tiro Devanagari Hindi',   t:'serif'},
    {n:'बालू भाई',   f:'Baloo Bhai 2',            t:'display'},
    {n:'कर्मा',      f:'Karma',                   t:'serif'},
    {n:'बालू तम्बी', f:'Baloo Thambi 2',          t:'display'},
    {n:'रोझा वन',    f:'Rozha One',               t:'display'},
    {n:'बालू पाजी',  f:'Baloo Paaji 2',           t:'display'},
    {n:'बालू चेट्टन',f:'Baloo Chettan 2',         t:'display'},
    {n:'अनेक',       f:'Anek Devanagari',          t:'sans'},
    {n:'बालू भैना',  f:'Baloo Bhaina 2',          t:'display'},
    {n:'यंत्रमानव',  f:'Yantramanav',             t:'sans'},
    {n:'कम्बे',      f:'Cambay',                  t:'sans'},
    {n:'खुला',       f:'Khula',                   t:'sans'},
    {n:'मार्टेल',    f:'Martel',                  t:'serif'},
    {n:'सरला',       f:'Sarala',                  t:'sans'},
    {n:'यात्रा वन',  f:'Yatra One',               t:'display'},
    {n:'बिरयानी',    f:'Biryani',                 t:'display'},
    {n:'साहित्य',    f:'Sahitya',                 t:'serif'},
    {n:'अमिता',      f:'Amita',                   t:'calli'},
    {n:'एक्ज़ार',    f:'Eczar',                   t:'serif'},
    {n:'हलन्त',      f:'Halant',                  t:'sans'},
    {n:'लैला',       f:'Laila',                   t:'calli'},
    {n:'राजधानी',    f:'Rajdhani',                t:'sans'},
    {n:'रंगा',       f:'Ranga',                   t:'calli'},
    {n:'डेको',       f:'Dekko',                   t:'calli'},
    {n:'सूर्य',      f:'Sura',                    t:'serif'},
    {n:'असर',        f:'Asar',                    t:'serif'},
    {n:'खंड',        f:'Khand',                   t:'sans'},
    {n:'पटुआ',       f:'Patua One',               t:'display'},
    {n:'प्रगति',     f:'Pragati Narrow',          t:'sans'},
    {n:'जल्दी',      f:'Jaldi',                   t:'sans'},
    {n:'कुराले',     f:'Kurale',                  t:'serif'},
    {n:'सुमन',       f:'Sumana',                  t:'serif'},
    {n:'वेस्पर',     f:'Vesper Libre',            t:'serif'},
    {n:'कड़वा',      f:'Kadwa',                   t:'serif'},
    {n:'रोडियम',     f:'Rhodium Libre',           t:'serif'},
    {n:'जैनी',       f:'Jaini',                   t:'display'},
    {n:'पालकी',      f:'Palanquin',               t:'sans'},
    {n:'नोटो सेरिफ', f:'Noto Serif Devanagari',   t:'serif'},
    {n:'तिरो संस्कृत',f:'Tiro Devanagari Sanskrit',t:'serif'},
    {n:'तिरो मराठी', f:'Tiro Devanagari Marathi', t:'serif'},
    {n:'अक्षर',      f:'Akshar',                  t:'sans'},
    {n:'अमीको',      f:'Amiko',                   t:'sans'},
  ];

  const EFFECTS = [
    {k:'3d',      cls:'style-3d',        suffix:' 3D',      on:['Modak','Baloo 2','Teko','Rozha One','Srikhand']},
    {k:'shadow',  cls:'style-shadow',    suffix:' Shadow',  on:['Poppins','Kalam','Ranga','Gotu']},
    {k:'outline', cls:'style-outline',   suffix:' Outline', on:['Baloo 2','Teko','Modak','Srikhand']},
    {k:'hearts',  cls:'style-hearts',    suffix:' ♥',       on:['Kalam','Amita','Laila','Tillana','Dekko']},
    {k:'stars',   cls:'style-stars',     suffix:' ★',       on:['Kalam','Amita','Laila','Tillana','Dekko']},
    {k:'brackets',cls:'style-brackets',  suffix:' 【】',    on:['Noto Sans Devanagari','Hind','Rajdhani']},
    {k:'under',   cls:'style-underline', suffix:' Line',    on:['Poppins','Hind','Mukta','Tiro Devanagari Hindi']},
    {k:'bold',    cls:'style-bold',      suffix:' Bold',    on:['Noto Sans Devanagari','Hind','Mukta','Poppins']},
    {k:'italic',  cls:'style-italic',    suffix:' Italic',  on:['Tiro Devanagari Hindi','Karma','Martel','Sahitya']},
  ];

  /* Build full styles list */
  const STYLES = [];
  BASE.forEach(b => STYLES.push({lbl:b.n, fam:b.f, cls:'', tag:b.t}));
  EFFECTS.forEach(e => {
    BASE.filter(b => e.on.includes(b.f)).forEach(b => {
      STYLES.push({lbl:b.n+e.suffix, fam:b.f, cls:e.cls, tag:'effect'});
    });
  });

  const PER = 12;
  let page = 1;
  const tot = () => Math.ceil(STYLES.length / PER);
  const loaded = new Set();

  if (cntEl) cntEl.textContent = STYLES.length + ' styles';

  function loadFont(fam) {
    if (loaded.has(fam)) return;
    loaded.add(fam);
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(fam) + '&display=swap';
    document.head.appendChild(l);
  }

  function getText() { return inp.value.trim() || 'नमस्ते भारत'; }

  const TAG_LABELS = {display:'Display', serif:'Serif', sans:'Sans', calli:'Calligraphy', effect:'Effect'};

  function render() {
    grid.classList.remove('loading');
    grid.innerHTML = '';
    const t = getText();
    const slice = STYLES.slice((page-1)*PER, page*PER);

    slice.forEach(s => {
      loadFont(s.fam);
      const card = document.createElement('div');
      card.className = 'font-card';

      const meta = document.createElement('div'); meta.className = 'fc-meta';
      const nm = document.createElement('span'); nm.className = 'fc-name'; nm.textContent = s.lbl;
      const tg = document.createElement('span'); tg.className = `fc-tag ${s.tag}`; tg.textContent = TAG_LABELS[s.tag] || s.tag;
      meta.append(nm, tg);

      const prev = document.createElement('div');
      prev.className = 'fc-preview' + (s.cls ? ' '+s.cls : '');
      prev.style.fontFamily = `'${s.fam}', sans-serif`;
      prev.textContent = t;

      const btns = document.createElement('div'); btns.className = 'fc-btns';

      /* Copy */
      const cpBtn = mkBtn('<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy');
      cpBtn.onclick = async () => {
        try { await navigator.clipboard.writeText(t); }
        catch { const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta); }
        cpBtn.classList.add('copied'); cpBtn.textContent = '✓ Copied';
        setTimeout(() => { cpBtn.classList.remove('copied'); cpBtn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'; }, 2000);
      };

      /* Font DL — opens Google Fonts specimen page (CORS-safe, always works) */
      const ftBtn = mkBtn('↓ Font');
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
        if (typeof html2canvas === 'undefined') { alert('Please wait a moment and try again.'); return; }
        const wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed;left:-9999px;top:0;padding:28px 36px;background:#FDFCFA';
        const p = document.createElement('p');
        p.style.cssText = `font-family:'${s.fam}',sans-serif;font-size:2.5rem;color:#1C1917;margin:0;line-height:1.3`;
        if (s.cls) p.classList.add(s.cls);
        p.textContent = t; wrap.appendChild(p); document.body.appendChild(wrap);
        await document.fonts.load(`1rem "${s.fam}"`);
        const cv = await html2canvas(wrap, {backgroundColor:'#FDFCFA',scale:3,logging:false});
        document.body.removeChild(wrap);
        const a = document.createElement('a');
        a.href = cv.toDataURL('image/png');
        a.download = 'hindi-font-'+s.lbl.replace(/[^\w]/g,'-').replace(/-+/g,'-')+'.png';
        a.click();
      };

      btns.append(cpBtn, ftBtn, imgBtn);
      card.append(meta, prev, btns);
      grid.appendChild(card);
    });

    if (curEl) curEl.textContent = page;
    if (totEl) totEl.textContent = tot();
    if (prevBtn) prevBtn.disabled = page === 1;
    if (nextBtn) nextBtn.disabled = page === tot();
  }

  function mkBtn(html) {
    const b = document.createElement('button');
    b.className = 'fc-btn'; b.innerHTML = html; return b;
  }

  /* Live text update */
  inp.addEventListener('input', () => {
    const t = getText();
    document.querySelectorAll('.fc-preview').forEach(el => { el.textContent = t; });
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

  /* Init */
  render();
});
