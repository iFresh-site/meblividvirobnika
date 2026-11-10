/* =====================================================================
   Меблі від виробника — логіка сторінки
   Дані (контакти, каталог, графік, відгуки) лежать у config.js.
   ===================================================================== */
(function () {
  'use strict';
  const S = window.SITE || {};
  const $ = id => document.getElementById(id);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const use = id => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const fmt = n => n.toLocaleString('uk-UA').replace(/ /g, ' ');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };

  /* ---------- контакти з config.js ---------- */
  const IG = S.instagram || '';
  const igProfile = `https://www.instagram.com/${IG}/`;
  const igDm = `https://ig.me/m/${IG}`;
  const prettyPhone = p => p.replace(/^\+380(\d{2})(\d{3})(\d{2})(\d{2})$/, '+380 $1 $2 $3 $4');
  $$('[data-ig-profile]').forEach(a => { a.href = igProfile; if (a.textContent.startsWith('@')) a.textContent = '@' + IG; });
  $$('[data-ig-dm]').forEach(a => { a.href = igDm; });
  $$('[data-address]').forEach(el => { el.textContent = S.address; });
  $$('[data-route]').forEach(a => { a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.address); });

  const channels = [{ href: igDm, icon: 'ig', text: 'Написати в Instagram', ext: true }];
  if (S.telegram) channels.push({ href: 'https://t.me/' + S.telegram, icon: 'tg', text: 'Telegram', ext: true });
  if (S.viber) channels.push({ href: 'viber://chat?number=' + encodeURIComponent(S.viber), icon: 'chat', text: 'Viber' });
  if (S.phone) channels.push({ href: 'tel:' + S.phone, icon: 'phone', text: prettyPhone(S.phone) });
  const chLink = c => `<a href="${esc(c.href)}"${c.ext ? ' target="_blank" rel="noopener"' : ''}>${use(c.icon)}${esc(c.text)}</a>`;
  $('alt').innerHTML = channels.map(chLink).join('');
  $('f-extra').innerHTML = channels.slice(1).map(c => `<a href="${esc(c.href)}"${c.ext ? ' target="_blank" rel="noopener"' : ''}>${esc(c.text)}</a>`).join('');
  if (S.phone) { const c = $('c-phone'); c.hidden = false; c.querySelector('dd').innerHTML = `<a href="tel:${esc(S.phone)}">${esc(prettyPhone(S.phone))}</a>`; }
  $('year').textContent = new Date().getFullYear();

  /* ---------- фото на першому екрані ---------- */
  if (S.heroPhoto) {
    const probe = new Image();
    probe.onload = () => { $('hero-img').src = S.heroPhoto; };
    probe.src = S.heroPhoto;
  }

  /* ---------- ілюстрації каталогу ---------- */
  const ART = {
    dyvan: '<path class="f" d="M14 46h92v22H14z"/><path class="s" d="M22 46V28a6 6 0 0 1 6-6h64a6 6 0 0 1 6 6v18"/><rect class="s" x="6" y="40" width="16" height="34" rx="5"/><rect class="s" x="98" y="40" width="16" height="34" rx="5"/><path class="s" d="M22 54h76M14 74v8M106 74v8"/>',
    lizhko: '<rect class="f" x="6" y="48" width="108" height="20" rx="3"/><path class="s" d="M6 84V24h14v24M114 84V40h-10v8"/><rect class="s" x="6" y="48" width="108" height="20" rx="3"/><rect class="s" x="24" y="38" width="30" height="10" rx="4"/>',
    shafa: '<rect class="f" x="22" y="2" width="76" height="80" rx="3"/><rect class="s" x="22" y="2" width="76" height="80" rx="3"/><path class="s" d="M60 2v80M54 36v12M66 36v12M26 82v4M94 82v4"/>',
    komod: '<rect class="f" x="10" y="14" width="100" height="62" rx="3"/><rect class="s" x="10" y="14" width="100" height="62" rx="3"/><path class="s" d="M10 35h100M10 56h100M52 25h16M52 46h16M52 66h16M16 76v8M104 76v8"/>',
    stil: '<rect class="f" x="6" y="30" width="108" height="8" rx="1"/><rect class="s" x="6" y="30" width="108" height="8" rx="1"/><path class="s" d="M16 38v46M104 38v46M16 70h88"/>',
    stilets: '<rect class="f" x="40" y="50" width="40" height="8" rx="1"/><path class="s" d="M76 50V8M80 58l4 26M40 58l-4 26M74 58v26M76 22H62"/><rect class="s" x="40" y="50" width="40" height="8" rx="1"/>',
    matrac: '<rect class="f" x="6" y="40" width="108" height="26" rx="8"/><rect class="s" x="6" y="40" width="108" height="26" rx="8"/><path class="s" d="M20 53h80" stroke-dasharray="4 6"/>',
    kuhnia: '<rect class="f" x="4" y="44" width="112" height="38" rx="2"/><rect class="s" x="4" y="44" width="112" height="38" rx="2"/><path class="s" d="M4 50h112M42 50v32M80 50v32"/><rect class="s" x="4" y="4" width="70" height="26" rx="2"/><path class="s" d="M39 4v26"/>',
    vital: '<rect class="f" x="4" y="58" width="112" height="22" rx="2"/><rect class="s" x="4" y="58" width="112" height="22" rx="2"/><rect class="s" x="38" y="22" width="44" height="28" rx="2"/><path class="s" d="M60 50v8"/><rect class="s" x="4" y="10" width="22" height="48"/><rect class="s" x="94" y="10" width="22" height="48"/>',
    spal: '<rect class="f" x="30" y="50" width="62" height="18" rx="3"/><path class="s" d="M30 84V28h62v56"/><rect class="s" x="30" y="50" width="62" height="18" rx="3"/><rect class="s" x="4" y="58" width="20" height="24" rx="2"/><rect class="s" x="98" y="58" width="20" height="24" rx="2"/>',
    peredp: '<rect class="f" x="54" y="14" width="56" height="70" rx="2"/><rect class="s" x="54" y="14" width="56" height="70" rx="2"/><path class="s" d="M82 14v70"/><rect class="s" x="8" y="10" width="38" height="44" rx="2"/><path class="s" d="M14 20h26M20 20v8M34 20v8"/><rect class="s" x="8" y="64" width="38" height="14" rx="2"/>'
  };
  const FALLBACK_ART = ART.komod;

  /* ---------- каталог і список обраного ---------- */
  const items = S.catalog || [];
  const groups = S.groups || {};
  const names = items.map(i => i.t);
  let picked = new Set(store.get('picked', []).filter(n => names.includes(n) || n === 'Інше'));

  const cat = $('cat');
  cat.innerHTML = items.map(x => `<article class="pc rv" data-g="${esc(x.g)}" data-t="${esc(x.t)}">
    <div class="ph"><svg class="il" viewBox="0 0 120 88" aria-hidden="true">${ART[x.k] || FALLBACK_ART}</svg>${x.photo ? `<img src="${esc(x.photo)}" alt="${esc(x.t)} від виробника" loading="lazy" decoding="async">` : ''}<span class="grp">${esc(groups[x.g] || '')}</span></div>
    <div class="bd"><h3>${esc(x.t)}</h3><p class="ds">${esc(x.d)}</p>
      ${x.tags && x.tags.length ? `<ul class="tags">${x.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="ft"><div class="pr"><small>Ціна</small><b>${x.price ? 'від ' + fmt(x.price) + ' грн' : 'уточнюйте'}</b></div>
      <button class="pick" type="button" data-pick="${esc(x.t)}" aria-pressed="false"><svg class="i-off" aria-hidden="true"><use href="#i-plus"/></svg><svg class="i-on" aria-hidden="true"><use href="#i-check"/></svg><span>До заявки</span></button></div>
    </div></article>`).join('') +
    `<div class="pc-more rv" data-g="all"><div><h3>Не знайшли потрібне?</h3><p>Напишіть нам, що шукаєте: підберемо модель, розмір і тканину.</p></div><a class="btn btn-light btn-sm" href="${igDm}" target="_blank" rel="noopener">Написати<span class="ar">${use('arrow')}</span></a></div>`;
  $$('.ph img', cat).forEach(im => im.addEventListener('error', () => im.remove()));

  const tabs = $('tabs');
  const tabDefs = [['all', 'Усе', items.length]].concat(Object.keys(groups).map(g => [g, groups[g], items.filter(i => i.g === g).length]));
  tabs.innerHTML = tabDefs.map(([f, t, n], i) => `<button class="tab" type="button" data-f="${esc(f)}" aria-pressed="${i === 0}">${esc(t)}<span class="c">${n}</span></button>`).join('');
  tabs.addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    $$('.tab', tabs).forEach(x => x.setAttribute('aria-pressed', x === b));
    const f = b.dataset.f;
    [...cat.children].forEach(c => { c.hidden = !(f === 'all' || c.dataset.g === f || c.dataset.g === 'all'); c.classList.remove('pre'); });
  });

  $('ticker').innerHTML = [0, 1].map(() => names.map(n => `<span>${esc(n)}</span>`).join('')).join('');

  const chipNames = names.concat('Інше');
  const chip = (n, name) => `<label class="${name === 'pick' ? 'chip' : 'opt'}"><input type="checkbox" name="${name}" value="${esc(n)}">${name === 'pick' ? esc(n) : `<span><b>${esc(n)}</b></span>`}</label>`;
  $('chips').innerHTML = chipNames.map(n => chip(n, 'pick')).join('');
  $('q-items').innerHTML = chipNames.map(n => chip(n, 'q-item')).join('');

  function syncPicked() {
    $$('.pick', cat).forEach(b => {
      const on = picked.has(b.dataset.pick);
      b.setAttribute('aria-pressed', on);
      b.querySelector('span').textContent = on ? 'У заявці' : 'До заявки';
      b.closest('.pc').classList.toggle('picked', on);
    });
    $$('input[name="pick"], input[name="q-item"]').forEach(i => { i.checked = picked.has(i.value); });
    $('f-items').value = [...picked].join(', ');
    const badge = $('pick-count');
    badge.textContent = picked.size; badge.hidden = !picked.size;
    store.set('picked', [...picked]);
  }
  function toggle(name, on) { on ? picked.add(name) : picked.delete(name); syncPicked(); }
  cat.addEventListener('click', e => {
    const b = e.target.closest('.pick'); if (!b) return;
    const on = !picked.has(b.dataset.pick);
    toggle(b.dataset.pick, on);
    toast(on ? `«${b.dataset.pick}» додано до заявки` : `«${b.dataset.pick}» прибрано із заявки`);
  });
  document.addEventListener('change', e => {
    if (e.target.matches('input[name="pick"], input[name="q-item"]')) toggle(e.target.value, e.target.checked);
  });
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-type]'); if (t) $('type').value = t.dataset.type;
  });
  syncPicked();

  /* ---------- сповіщення ---------- */
  let toastTimer;
  function toast(text) {
    const t = $('toast'); t.textContent = text; t.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 2200);
  }

  /* ---------- статус шоуруму (час Києва) ---------- */
  (function () {
    const H = S.hours; if (!H) return;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const g = t => parts.find(p => p.type === t).value;
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
      const now = +g('hour') % 24 * 60 + +g('minute');
      const min = s => +s.slice(0, 2) * 60 + +s.slice(3);
      const today = H[day];
      const isOpen = today && now >= min(today[0]) && now < min(today[1]);
      let text, label = 'Сьогодні працюємо', shown = today;
      if (isOpen) text = 'Шоурум відкритий до ' + today[1];
      else if (today && now < min(today[0])) text = 'Шоурум відкриється о ' + today[0];
      else {
        let d = day, n = 0;
        do { d = (d + 1) % 7; n++; } while (!H[d] && n < 7);
        shown = H[d];
        label = n === 1 ? 'Завтра працюємо' : 'Найближчий робочий день';
        text = shown ? (n === 1 ? 'Відкриємось завтра о ' : 'Зараз зачинено, відкриємось о ') + shown[0] : 'Шоурум зараз зачинено';
      }
      $$('[data-open-dot]').forEach(el => el.classList.toggle('open', !!isOpen));
      $$('[data-open-text]').forEach(el => { el.textContent = text; });
      $$('[data-hours-label]').forEach(el => { el.textContent = label; });
      if (shown) $$('[data-hours]').forEach(el => { el.textContent = shown[0] + '–' + shown[1]; });
    } catch (_) { /* лишаємо статичний текст */ }
  })();

  /* ---------- тема ---------- */
  $('theme').addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
  });

  /* ---------- меню, шапка, прогрес ---------- */
  const burger = $('burger'), mm = $('mmenu'), bar = $('top-bar');
  const closeMenu = () => { burger.setAttribute('aria-expanded', 'false'); mm.hidden = true; };
  burger.addEventListener('click', () => { const o = burger.getAttribute('aria-expanded') !== 'true'; burger.setAttribute('aria-expanded', o); mm.hidden = !o; });
  mm.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const prog = $('progress'), toTop = $('to-top');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    bar.classList.toggle('scrolled', scrollY > 8);
    toTop.classList.toggle('on', scrollY > innerHeight);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    /* мобільна кнопка: після першого екрана й до форми */
    const mcta = $('mcta'); let pastHero = false, nearOrder = false;
    const upd = () => mcta.classList.toggle('on', pastHero && !nearOrder);
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; upd(); }).observe(document.querySelector('.hero-copy'));
    new IntersectionObserver(([e]) => { nearOrder = e.isIntersecting; upd(); }).observe($('order'));

    /* активний пункт меню */
    const links = $$('.nav-links a');
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

    /* поява блоків: лише для тих, що нижче першого екрана */
    if (!reduced) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
      }), { rootMargin: '0px 0px -6% 0px' });
      $$('.rv').forEach((el, i) => {
        if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el); }
      });
    }

    /* лічильники */
    const cio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, to = +el.dataset.count, dec = +el.dataset.dec || 0, suf = el.dataset.suffix || '';
      const show = v => { el.textContent = v.toFixed(dec).replace('.', ',') + suf; };
      if (reduced) return show(to);
      const t0 = performance.now(), dur = 1200;
      (function step(t) { const p = Math.min(1, (t - t0) / dur); show(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
    }), { threshold: .6 });
    $$('[data-count]').forEach(el => cio.observe(el));
  }

  /* ---------- карта: завантажуємо лише на вимогу ---------- */
  $('map-load').addEventListener('click', () => {
    $('map').innerHTML = `<iframe title="Шоурум на карті" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(S.address)}&output=embed"></iframe>`;
  });

  /* ---------- відгуки ---------- */
  const revHtml = (S.reviews || []).map(r => `<article class="rev"><div class="stars" role="img" aria-label="${r.stars || 5} з 5">${'★'.repeat(r.stars || 5)}</div><q>${esc(r.text)}</q><div class="who"><span class="av">${esc(r.name).charAt(0)}</span><span><b>${esc(r.name)}${r.city ? ', ' + esc(r.city) : ''}</b><small>${esc(r.item || '')}</small></span></div></article>`).join('') +
    (S.reviewShots || []).map((src, i) => `<figure class="shot-rev"><img src="${esc(src)}" alt="Скриншот відгуку клієнта ${i + 1}" loading="lazy"></figure>`).join('');
  $('rev').innerHTML = revHtml
    ? `<div class="rev-grid">${revHtml}</div>`
    : `<div class="rev-empty rv"><span class="hl"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg></span></span><div><h3>Відгуки покупців</h3><p>Фото меблів у квартирах клієнтів і їхні відгуки зібрані в хайлайті «Відгуки» нашого Instagram.</p></div><a class="btn btn-ghost btn-sm" href="${igProfile}" target="_blank" rel="noopener">Дивитись відгуки<span class="ar">${use('arrow')}</span></a></div>`;

  /* ---------- надсилання заявки ---------- */
  const phoneOk = v => v.replace(/\D/g, '').length >= 9;
  function message(d) {
    return `Вітаю! Хочу замовити: ${d.items || 'потрібна консультація'} (${d.type}).\n${d.note ? d.note + '\n' : ''}Ім'я: ${d.name}\nТелефон: ${d.phone}`;
  }
  async function deliver(d) {
    if (S.formMode !== 'netlify' || !/^https?:$/.test(location.protocol)) return false;
    try {
      const body = new URLSearchParams({ 'form-name': 'order', 'bot-field': '', ...d }).toString();
      const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      return r.ok;
    } catch (_) { return false; }
  }
  function showDone(box, d, sent) {
    box.innerHTML = (sent
      ? `<div class="ok">${use('check')}Дякуємо, заявку надіслано</div><p>Консультант зв'яжеться з вами в робочий час. Хочете швидше? Продублюйте заявку в Direct:</p>`
      : `<div class="ok">${use('check')}Заявку сформовано</div><p>Залишився один крок: надішліть цей текст нам у Direct, і консультант відповість у робочий час.</p>`) +
      `<pre></pre><div class="acts"><button class="btn btn-dark btn-sm" type="button" data-copy>Скопіювати</button><a class="btn btn-ghost btn-sm" href="${igDm}" target="_blank" rel="noopener">Відкрити Direct</a></div>`;
    const pre = box.querySelector('pre'); pre.textContent = message(d);
    box.querySelector('[data-copy]').addEventListener('click', async function () {
      try { await navigator.clipboard.writeText(pre.textContent); this.textContent = 'Скопійовано ✓'; }
      catch (_) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); this.textContent = 'Виділено, скопіюйте'; }
    });
    box.hidden = false;
    box.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }
  async function submit(btn, box, d) {
    btn.disabled = true;
    const sent = await deliver(d);
    btn.disabled = false;
    showDone(box, d, sent);
    return sent;
  }
  function check(fields, errEl) {
    let bad = null;
    fields.forEach(([el, ok, msg]) => {
      const valid = ok(el.value.trim());
      el.setAttribute('aria-invalid', !valid);
      if (!valid && !bad) bad = [el, msg];
    });
    if (bad) { errEl.textContent = bad[1]; errEl.hidden = false; bad[0].focus(); return false; }
    errEl.hidden = true; return true;
  }
  document.addEventListener('input', e => { if (e.target.getAttribute('aria-invalid') === 'true' && e.target.value.trim()) e.target.removeAttribute('aria-invalid'); });

  /* ---------- форма ---------- */
  const form = $('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.elements['bot-field'].value) return;
    if (!check([[$('name'), v => !!v, "Вкажіть ім'я, щоб ми знали, як до вас звертатися."], [$('phone'), phoneOk, 'Вкажіть номер телефону, щоб ми могли з вами зв’язатися.']], $('err'))) return;
    submit($('submit'), $('done'), {
      source: 'Форма', name: $('name').value.trim(), phone: $('phone').value.trim(),
      items: [...picked].join(', '), type: $('type').value, note: $('note').value.trim()
    });
  });

  /* ---------- квіз ---------- */
  (function () {
    const steps = $$('#quiz-box .q'), total = steps.length;
    const next = $('q-next'), back = $('q-back'), err = $('q-err');
    let cur = 1;
    const val = n => (document.querySelector(`input[name="${n}"]:checked`) || {}).value || '';
    function show(n) {
      cur = n;
      steps.forEach(s => { s.hidden = +s.dataset.step !== n; });
      $('q-n').textContent = n;
      $('q-bar').style.width = n / total * 100 + '%';
      $('q-bar').parentNode.setAttribute('aria-valuenow', n);
      back.hidden = n === 1;
      next.firstChild.textContent = n === total ? 'Отримати розрахунок' : 'Далі';
      err.hidden = true;
    }
    $$('input[name="q-get"]').forEach(r => r.addEventListener('change', () => { $('q-city-wrap').hidden = val('q-get') !== 'Доставка'; }));
    back.addEventListener('click', () => show(cur - 1));
    next.addEventListener('click', async () => {
      if (cur === 1 && !picked.size) { err.textContent = 'Оберіть хоча б один варіант.'; err.hidden = false; return; }
      if (cur < total) { show(cur + 1); const f = steps[cur - 1].querySelector('input'); if (f && cur === total) f.focus(); return; }
      if (!check([[$('q-name'), v => !!v, "Вкажіть ім'я, щоб ми знали, як до вас звертатися."], [$('q-phone'), phoneOk, 'Вкажіть номер телефону, щоб ми могли з вами зв’язатися.']], err)) return;
      const get = val('q-get'), city = $('q-city').value.trim();
      const note = [get === 'Доставка' ? 'Доставка' + (city ? ': ' + city : ' по Україні') : get, $('q-note').value.trim()].filter(Boolean).join('. ');
      await submit(next, $('q-done'), {
        source: 'Підбір', name: $('q-name').value.trim(), phone: $('q-phone').value.trim(),
        items: [...picked].join(', '), type: val('q-type'), note
      });
    });
    show(1);
  })();
})();
