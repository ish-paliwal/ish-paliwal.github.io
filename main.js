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
  function extLink(cls, label, href) {
    var external = /^https?:/.test(href);
    var a = h('a', { class: cls, href: href });
    if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }

  /* ── content ── */
  $('tagline').textContent = '// ' + S.tagline;

  $('projects-list').appendChild(frag(S.projects, function (p) {
    return h('article', { class: 'card reveal' }, [
      h('div', { class: 'card-top' }, [h('span', { text: p.id }), h('span', { text: p.year })]),
      h('h3', { text: p.title }),
      h('p', { text: p.desc }),
      h('ul', { class: 'chips', 'aria-label': 'Tech stack' }, p.stack.map(function (s) { return h('li', { text: s }); })),
      h('div', { class: 'links' }, p.links.map(function (l) {
        if (!l.href) return h('span', { class: 'off', title: 'Link coming soon', text: l.label + ' (SOON)' });
        var a = extLink('', l.label, l.href); a.textContent = l.label + ' ↗'; return a;
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

  $('bio').appendChild(frag(S.about.bio, function (t) { return h('p', { text: t }); }));
  $('spec').appendChild(frag(S.about.spec, function (r) {
    return h('div', {}, [h('dt', { text: r[0] }), h('dd', { text: r[1] })]);
  }));
  $('contact-list').appendChild(frag(S.contact, function (c) {
    if (!c.href) return h('div', { class: 'contact-row off' }, [h('span', { text: c.text }), h('small', { text: c.label + ' · SOON' })]);
    var a = extLink('contact-row', c.text, c.href);
    a.appendChild(h('span', { text: c.text }));
    a.appendChild(h('small', { text: c.label + ' ↗' }));
    return a;
  }));

  function frag(list, fn) {
    var f = document.createDocumentFragment();
    list.forEach(function (x) { f.appendChild(fn(x)); });
    return f;
  }

  /* ── legend under the board ── */
  var legend = $('legend');
  ['projects', 'experience', 'skills', 'contact'].forEach(function (k) {
    var m = S.modules[k];
    legend.appendChild(h('li', {}, [
      h('a', { href: '#' + k, 'data-net': k }, [m.label, h('small', { text: m.ref })])
    ]));
  });

  /* ── chip pins ── */
  var NS = 'http://www.w3.org/2000/svg';
  function range(a, b, s) { var o = []; for (var v = a; v <= b; v += s) o.push(v); return o; }
  var CHIPS = {
    u1: { x: 340, y: 220, w: 120, h: 120, l: range(235, 325, 15), r: range(235, 325, 15), t: range(355, 445, 15), b: range(355, 445, 15) },
    u2: { x: 105, y: 75,  w: 110, h: 110, l: range(90, 170, 20),  r: range(90, 170, 20),  t: range(130, 190, 15), b: range(130, 190, 15) },
    u3: { x: 575, y: 95,  w: 130, h: 70,  l: [110, 130, 150],     r: [110, 130, 150],     t: range(600, 680, 20), b: range(600, 680, 20) }
  };
  function pin(g, x, y, w, hgt) {
    var r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', hgt);
    r.setAttribute('fill', '#d6d6d6');
    g.appendChild(r);
  }
  document.querySelectorAll('.pins').forEach(function (g) {
    var c = CHIPS[g.getAttribute('data-chip')];
    if (!c) return;
    c.l.forEach(function (py) { pin(g, c.x - 14, py - 3.5, 14, 7); });
    c.r.forEach(function (py) { pin(g, c.x + c.w, py - 3.5, 14, 7); });
    c.t.forEach(function (px) { pin(g, px - 3.5, c.y - 14, 7, 14); });
    c.b.forEach(function (px) { pin(g, px - 3.5, c.y + c.h, 7, 14); });
  });

  /* ── hover/focus: light up chip + trace + legend and update status line ── */
  var status = $('status');
  var base = '> ' + S.statusDefault;
  function hot(net, on) {
    document.querySelectorAll('[data-net="' + net + '"]').forEach(function (el) {
      el.classList.toggle('is-hot', on);
      // SVG <use> clones: classList works on SVG elements in modern browsers
    });
    var m = S.modules[net];
    status.textContent = on && m ? '> ' + m.ref + ' → ' + m.label + ' :: ' + m.hint : base;
  }
  document.querySelectorAll('a[data-net]').forEach(function (a) {
    var net = a.getAttribute('data-net');
    a.addEventListener('mouseenter', function () { hot(net, true); });
    a.addEventListener('mouseleave', function () { hot(net, false); });
    a.addEventListener('focus', function () { hot(net, true); });
    a.addEventListener('blur', function () { hot(net, false); });
  });
  status.textContent = base;

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
