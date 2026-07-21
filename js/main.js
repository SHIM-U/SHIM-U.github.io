/* =====================================================================
   main.js — 移动端菜单 + 磁吸按钮
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 移动端导航 ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // 点击菜单项后收起
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 磁吸按钮 ---------- */
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  var magnets = Array.prototype.slice.call(document.querySelectorAll('.magnetic'));

  magnets.forEach(function (el) {
    var strength = 0.3;
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var mx = e.clientX - rect.left - rect.width / 2;
      var my = e.clientY - rect.top - rect.height / 2;
      el.style.transform =
        'translate(' + (mx * strength) + 'px,' + (my * strength) + 'px) scale(1.04)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = '';
    });
  });
})();
