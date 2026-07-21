# 小崔的个人博客网站 · 产品展示站

一个纯静态（HTML / CSS / JS，零构建、零依赖）的个人站点，用于展示产品并提供外部访问。
支持 **五套主题** 平滑切换，并已在 GitHub Pages 部署流程中预设，推送即上线。

## ✨ 核心功能

| 模块 | 说明 |
| --- | --- |
| 🐍 贪吃蛇小游戏 App | 产品介绍 + 真实游戏截图 + **APK 下载** |
| 💬 AI Chat Hub | 产品介绍 + **直接访问入口**（https://aichathub-428.netlify.app/） |
| 🎨 五主题切换 | 极简暗黑 / 极简灰白 / 赛博朋克 / 清晰浅蓝 / 暖色日落，圆形"浮现"过渡 |
| 📝 博客随笔 | 轻量文章占位，呼应"博客"定位 |
| 📱 响应式 | 桌面 / 移动端自适应，含移动端菜单 |
| 🌫️ 浮现动画 | 首屏载入 + 滚动进入视口的渐显/缩放/侧滑/模糊浮现动画 |

## 🗂 项目结构

```
personal-blog/
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── index.html                     # 站点主页面（语义化结构）
├── css/
│   ├── themes.css                 # 五套主题变量 + 切换过渡（View Transitions）
│   ├── base.css                   # 重置 / 玻璃导航 / 卡片 / 按钮
│   ├── animations.css             # 载入与滚动浮现动画（含缩放、侧滑、模糊变体）
│   └── layout.css                 # 首屏 / 产品 / 博客布局
├── js/
│   ├── theme.js                   # 主题切换 + localStorage 持久化
│   ├── animations.js              # IntersectionObserver 滚动浮现
│   └── main.js                    # 移动端菜单 + 磁吸按钮
├── assets/
│   ├── images/                    # 真实产品截图
│   │   ├── snake-menu.png         # 贪吃蛇皮肤/模式选择界面
│   │   ├── snake-game.png         # 贪吃蛇游戏实战画面
│   │   └── aichat-hub.png         # AI Chat Hub 对话界面
│   └── downloads/
│       └── snake.apk              # 可下载的安装包
└── README.md
```

## 🚀 部署到 GitHub（外部可访问）

> 前提：拥有一个 GitHub 账号。以下命令在 `personal-blog/` 目录下执行。

1. 在 GitHub 新建一个仓库（如 `personal-blog`），**不要**勾选自动生成 README。
2. 本地提交并关联远程：
   ```bash
   git init
   git add .
   git commit -m "feat: 小崔的个人博客网站（四主题 + Pages 部署）"
   git branch -M main
   git remote add origin git@github.com:<你的用户名>/personal-blog.git
   git push -u origin main
   ```
3. 仓库 **Settings → Pages → Build and deployment**：
   - Source 选择 **GitHub Actions**。
4. 等待 Actions 跑完（约 1 分钟），访问
   `https://<你的用户名>.github.io/personal-blog/` 即可。

> 也可使用 GitHub CLI：`gh repo create personal-blog --public --source=. --push --remote=upstream`
> 若未安装 `gh`，按上面 1–4 步手动操作即可。

## 🎨 主题说明

- 主题状态保存在 `localStorage['blog-theme']`，刷新后保持。默认主题为**极简暗黑**。
- 切换时优先使用浏览器 **View Transitions API** 做圆形"浮现"过渡；
  不支持的浏览器自动降级为颜色过渡（同样平滑）。
- 想新增主题：在 `css/themes.css` 增加 `[data-theme='xxx']` 变量块，
  并在 `index.html` 的主题切换器里加一个 `.theme-dot` 按钮即可。

## 🔁 替换素材

- **更新 APK**：把新包放到 `assets/downloads/snake.apk`（保持同名）。
- **更换截图**：替换 `assets/images/` 下的 PNG，或在 `index.html` 中改 `<img src>`。
- **修改 AI Chat Hub 链接**：编辑 `index.html` 中 `https://aichathub-428.netlify.app/` 两处。
