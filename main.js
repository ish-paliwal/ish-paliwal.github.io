(function () {
  'use strict';
  var S = window.SITE;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── tiny DOM helper ── */
  function h(tag, props, kids) {
    var el = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === 'class') el.className = props[k];
      else if (k === 'text') el.textContent = props[k];
      else el.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function $(id) { return document.getElementById(id); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function isExternal(href) { return /^https?:/.test(href); }
  function extLink(cls, href) {
    var a = h('a', { class: cls, href: href });
    if (isExternal(href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }
  function frag(list, fn) {
    var f = document.createDocumentFragment();
    list.forEach(function (x) { f.appendChild(fn(x)); });
    return f;
  }

  /* ── hero ── */
  $('tagline').textContent = '// ' + S.tagline;
  $('quote').textContent = '“' + S.quote + '”';
  $('bio').appendChild(frag(S.about.bio, function (t) { return h('p', { text: t }); }));

  // "View resume" button reuses the RESUME link from the contact list
  var resume = S.contact.filter(function (c) { return c.label === 'RESUME'; })[0];
  if (resume && resume.href) {
    var rb = $('resume-btn');
    rb.href = resume.href;
    if (isExternal(resume.href)) { rb.target = '_blank'; rb.rel = 'noopener noreferrer'; }
  }

  /* ── content sections ── */
  $('projects-list').appendChild(frag(S.projects, function (p) {
    return h('article', { class: 'card reveal' }, [
      h('div', { class: 'card-top' }, [h('span', { text: p.id }), h('span', { text: p.year })]),
      h('h3', { text: p.title }),
      h('p', { text: p.desc }),
      h('ul', { class: 'chips', 'aria-label': 'Tech stack' }, p.stack.map(function (s) { return h('li', { text: s }); })),
      h('div', { class: 'links' }, p.links.map(function (l) {
        if (!l.href) return h('span', { class: 'off', title: 'Link coming soon', text: l.label + ' (SOON)' });
        var a = extLink('', l.href); a.textContent = l.label + ' ↗'; return a;
      }))
    ]);
  }));
  $('count-projects').textContent = pad(S.projects.length) + ' ITEMS';

  $('experience-list').appendChild(frag(S.experience, function (e) {
    return h('article', { class: 'job reveal' }, [
      h('p', { class: 'job-dates', text: e.dates }),
      h('div', {}, [
        h('h3', {}, [e.role, h('span', { text: ' @ ' + e.org })]),
        h('ul', {}, e.bullets.map(function (b) { return h('li', { text: b }); }))
      ])
    ]);
  }));
  $('count-experience').textContent = pad(S.experience.length) + ' ENTRIES';

  $('skills-list').appendChild(frag(S.skills, function (g) {
    return h('section', { class: 'bom reveal' }, [
      h('h3', { text: g.group }),
      h('ul', {}, g.items.map(function (it, i) {
        return h('li', {}, [h('span', { class: 'ref', text: g.prefix + pad(i + 1) }), h('span', { text: it })]);
      }))
    ]);
  }));

  $('spec').appendChild(frag(S.about.spec, function (r) {
    return h('div', {}, [h('dt', { text: r[0] }), h('dd', { text: r[1] })]);
  }));
  $('contact-list').appendChild(frag(S.contact, function (c) {
    if (!c.href) return h('div', { class: 'contact-row off' }, [h('span', { text: c.text }), h('small', { text: c.label + ' · SOON' })]);
    var a = extLink('contact-row', c.href);
    a.appendChild(h('span', { text: c.text }));
    a.appendChild(h('small', { text: c.label + ' ↗' }));
    return a;
  }));

  /* ── clock (Austin) ── */
  function tick() {
    $('clock').textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit' });
  }
  tick(); setInterval(tick, 30000);
  $('year').textContent = new Date().getFullYear();

  /* ── theme ── */
  $('theme').addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = next === 'dark' ? '#0b0d0c' : '#f3f2ee';
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ── scroll meter ── */
  var sy = $('scrollY'), queued = false;
  function updateScroll() { queued = false; sy.textContent = String(Math.round(window.scrollY)).padStart(3, '0'); }
  addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  updateScroll();

  /* ── reveal on scroll ── */
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        // also reveal anything we've already scrolled past (anchor jumps, fast scrolls)
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
