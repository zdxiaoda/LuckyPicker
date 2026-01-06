# MDUI 2.0 迁移文档

## 概述

本项目已成功从 MDUI 1.0.2 升级到 MDUI 2.0，采用了 Material Design 3 设计规范。

## 主要变更

### 1. 库引用更新

**旧版本 (MDUI 1.0.2):**
```html
<link rel="stylesheet" href="./static/css/mdui.css" />
<script src="./static/js/mdui.js"></script>
```

**新版本 (MDUI 2.0):**
```html
<link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css" />
<script src="https://unpkg.com/mdui@2/mdui.global.js"></script>
```

### 2. 组件迁移

#### 顶部应用栏 (Top App Bar)

**旧语法:**
```html
<div class="mdui-appbar">
  <div class="mdui-toolbar mdui-color-light-green-800">
    <a class="mdui-typo-headline">LuckyPicker</a>
    <a class="mdui-typo-title">主页</a>
    <div class="mdui-toolbar-spacer"></div>
    <a class="mdui-btn mdui-btn-icon">
      <i class="mdui-icon material-icons">close</i>
    </a>
  </div>
</div>
```

**新语法:**
```html
<mdui-top-app-bar>
  <mdui-top-app-bar-title>LuckyPicker - 主页</mdui-top-app-bar-title>
  <div style="flex-grow: 1"></div>
  <mdui-button-icon icon="close" onclick="window.close();"></mdui-button-icon>
</mdui-top-app-bar>
```

#### 浮动操作按钮 (FAB)

**旧语法:**
```html
<button class="mdui-color-red-800 mdui-fab mdui-fab-fixed mdui-ripple">
  <i class="mdui-icon material-icons">pause</i>
</button>
```

**新语法:**
```html
<mdui-fab icon="pause" style="position: fixed; right: 24px; bottom: 80px;"></mdui-fab>
```

#### 按钮

**旧语法:**
```html
<button class="mdui-btn mdui-btn-raised">按钮文字</button>
```

**新语法:**
```html
<mdui-button variant="filled">按钮文字</mdui-button>
<mdui-button variant="outlined">按钮文字</mdui-button>
<mdui-button variant="text">按钮文字</mdui-button>
```

#### 工具提示 (Tooltip)

**旧语法:**
```html
<a mdui-tooltip="{content: '提示内容'}" class="mdui-btn mdui-btn-icon">
  <i class="mdui-icon material-icons">close</i>
</a>
```

**新语法:**
```html
<mdui-tooltip content="提示内容">
  <mdui-button-icon icon="close"></mdui-button-icon>
</mdui-tooltip>
```

#### 底部导航栏

**旧语法:**
```html
<div class="mdui-bottom-nav mdui-color-white">
  <a href="javascript:;" class="mdui-ripple">
    <i class="mdui-icon material-icons">home</i>
    <label>主页</label>
  </a>
</div>
```

**新语法:**
```html
<mdui-navigation-bar style="position: fixed; bottom: 0; left: 0; right: 0;">
  <mdui-navigation-bar-item icon="home" active>主页</mdui-navigation-bar-item>
</mdui-navigation-bar>
```

#### 折叠面板

**旧语法:**
```html
<div class="mdui-panel" mdui-panel>
  <div class="mdui-panel-item">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">标题</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
    </div>
    <div class="mdui-panel-item-body">
      <p>内容</p>
    </div>
  </div>
</div>
```

**新语法:**
```html
<mdui-collapse accordion>
  <mdui-collapse-item>
    <mdui-list-item slot="header" icon="code">标题</mdui-list-item>
    <div style="padding: 16px;">
      <p>内容</p>
    </div>
  </mdui-collapse-item>
</mdui-collapse>
```

#### 图标

**旧语法:**
```html
<i class="mdui-icon material-icons">close</i>
```

**新语法:**
```html
<mdui-icon name="close"></mdui-icon>
```

### 3. JavaScript API 变更

#### 动态更新 FAB 按钮图标

**旧代码:**
```javascript
const fabButton = document.getElementById("Fab_Button");
fabButton.innerHTML = '<i class="mdui-icon material-icons">play_arrow</i>';
fabButton.classList.remove("mdui-color-red-800");
fabButton.classList.add("mdui-color-blue-800");
```

**新代码:**
```javascript
const fabButton = document.getElementById("Fab_Button");
fabButton.icon = "play_arrow";
fabButton.variant = "primary";
```

#### 动态更新按钮样式

**旧代码:**
```javascript
const button = document.getElementById("button");
button.classList.add("mdui-color-red-800");
```

**新代码:**
```javascript
const button = document.getElementById("button");
button.variant = "filled";
```

### 4. CSS 调整

为适配新的组件布局，添加了以下 CSS 规则：

```css
/* 为顶部应用栏和底部导航栏添加内边距 */
main {
  padding-top: 64px;
  padding-bottom: 80px;
}
```

### 5. 主题系统

**旧版本:**
```html
<body class="mdui-bottom-nav-fixed">
```

**新版本:**
```html
<body class="mdui-theme-auto">
```

MDUI 2.0 使用 `mdui-theme-auto` 自动适配系统主题（亮色/暗色模式）。

## 需要注意的事项

1. **CDN 依赖**: 项目现在依赖 unpkg CDN 加载 MDUI 2.0。如果需要离线使用，建议下载 MDUI 2.0 的本地副本。

2. **Web Components**: MDUI 2.0 基于 Web Components 技术，需要现代浏览器支持。Electron 的 Chromium 内核完全支持。

3. **Material Design 3**: 新版本采用 Material Design 3 规范，界面风格更现代、圆润。

4. **动态交互**: 使用 Web Components 的属性来动态更新组件状态，而不是操作 class 或 innerHTML。

5. **旧版本文件**: 旧的 mdui 1.0.2 文件（`src/static/js/mdui.js` 和 `src/static/css/mdui.css`）仍保留在仓库中作为备份，但已不再使用。可以选择删除以减小仓库大小。

## 离线使用

如果需要离线使用 MDUI 2.0 而不依赖 CDN：

1. 从 [MDUI 官网](https://www.mdui.org/zh-cn/docs/2/getting-started/installation) 下载 MDUI 2.0 文件
2. 将下载的文件放入 `src/static/` 目录
3. 修改所有 HTML 文件中的 CDN 链接为本地路径：
   ```html
   <link rel="stylesheet" href="./static/css/mdui.css" />
   <script src="./static/js/mdui.global.js"></script>
   ```

## 受影响的文件

- `src/index.html` - 主页面
- `src/subpage/about.html` - 关于页面
- `src/subpage/help.html` - 帮助页面
- `src/subpage/orc.html` - ORC 识别页面
- `src/static/js/homepage.js` - 主页面 JavaScript 逻辑
- `src/static/css/global.css` - 全局样式
- `src/static/css/homepage.css` - 主页面样式

## 参考资源

- [MDUI 2.0 官方文档](https://www.mdui.org/zh-cn/docs/2/)
- [Material Design 3 设计规范](https://m3.material.io/)
