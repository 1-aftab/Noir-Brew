(function () {
  'use strict';

  // Sticky nav background
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.getElementById('burger');
  var links = document.getElementById('links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Menu category filter
  var tabs = document.querySelectorAll('.tab');
  var dishes = document.querySelectorAll('.items li');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var cat = tab.getAttribute('data-cat');
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('on', on);
        t.setAttribute('aria-selected', String(on));
      });
      dishes.forEach(function (li) {
        li.classList.toggle('hide', cat !== 'all' && li.getAttribute('data-cat') !== cat);
      });
    });
  });

  // Highlight today's opening hours
  var rows = document.querySelectorAll('#hoursTable tr');
  var now = new Date();
  var day = now.getDay();
  rows.forEach(function (r) {
    if (Number(r.getAttribute('data-d')) === day) {
      r.classList.add('today');
      var label = document.getElementById('now');
      if (label) label.textContent = 'Today: ' + r.querySelector('td').textContent;
    }
  });
})();
