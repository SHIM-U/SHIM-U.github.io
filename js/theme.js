/* =====================================================================
   theme.js — 五主题切换（持久化 + View Transitions 圆形浮现过渡）
   ===================================================================== */
(function () {
  'use strict';

  var THEMES = ['minimal-dark', 'minimal-gray', 'cyberpunk', 'light-blue', 'warm-sunset'];
  var STORE_KEY = 'blog-theme';
  var root = document.documentElement;
  var dots = Array.prototype.slice.call(document.querySelectorAll('.theme-dot'));

  function currentTheme() {
    return root.getAttribute('data-theme') || 'minimal-dark';
  }

  function updateDots(theme) {
    dots.forEach(function (d) {
      d.setAttribute('aria-pressed', d.dataset.theme === theme ? 'true' : 'false');
    });
  }

  // 应用主题：仅在切换瞬间启用颜色过渡 class，避免干扰日常 hover 动画
  function applyTheme(theme, x, y) {
    if (x != null && y != null) {
      root.style.setProperty('--vt-x', x + 'px');
      root.style.setProperty('--vt-y', y + 'px');
    }
    root.classList.add('theme-anim');
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORE_KEY, theme); } catch (e) {}
    updateDots(theme);
    window.setTimeout(function () {
      root.classList.remove('theme-anim');
    }, 560);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function (e) {
      var theme = dot.dataset.theme;
      if (theme === currentTheme()) return;
      // 以点击位置为圆形过渡圆心
      var x = e.clientX;
      var y = e.clientY;
      if (typeof document.startViewTransition === 'function') {
        document.startViewTransition(function () {
          applyTheme(theme, x, y);
        });
      } else {
        applyTheme(theme, x, y);
      }
    });
  });

  // 初始化（极早的 head 内联脚本已设好 data-theme，这里仅同步按钮状态）
  updateDots(currentTheme());
})();
