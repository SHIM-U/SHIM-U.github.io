/* =====================================================================
   main.js — 移动端菜单 + 复制邮箱
   （按钮悬浮效果改由 CSS .btn:hover 处理，不再跟随光标）
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

  /* ---------- 复制邮箱 ---------- */
  var copyBtn = document.getElementById('copyMail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var mail = copyBtn.getAttribute('data-mail') || '';
      var done = function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = '已复制 ✓';
        window.setTimeout(function () {
          copyBtn.textContent = old;
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = mail;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
