# InkTime（字迹时光）

InkTime 是一个英文手写动画生成器，用来解决制作简单签名式标题、卡片短句或视频片头字迹动画需要专业动效软件的问题。输入短句后即可预览书写过程，并导出 SVG 文件。

## 主要功能

- 将英文短句渲染为逐笔书写的 SVG 动画。
- 调整墨水颜色、字号、书写时长和对齐方式。
- 提供三条常用英文短句预设，点击即可生成。
- 一键重新播放动画。
- 将当前结果导出为 SVG。
- 输入校验会提示当前内置笔迹不支持的字符。
- 响应式工作台，支持桌面和移动浏览器。

当前使用的 Shadows Into Light 笔迹数据只覆盖英文字母、数字和部分英文标点，因此本版本不生成中文笔迹。

## 安装方法

```bash
git clone https://github.com/rongtaocheng32-ctrl/inktime.git
cd inktime
python3 -m http.server 8000
```

打开 <http://localhost:8000>。首次打开需要联网从 jsDelivr 加载 Vara.js 和笔迹 JSON。

## 使用方法

1. 输入不超过 70 个字符的英文短句。
   也可以点击输入框下方的短句预设快速体验。
2. 设置颜色、字号、时长和对齐方式。
3. 点击“生成动画”。
4. 点击“重新播放”查看效果，或点击“导出 SVG”下载结果。

## 输入输出示例

输入：

```text
Text: Make today visible.
Color: #ef5b3f
Font size: 54
Duration: 3.2 seconds
Alignment: center
```

输出：页面逐笔绘制 `Make today visible.`，点击导出后生成：

```text
inktime-lettering.svg
```

## 开源与致谢

InkTime 自有代码使用 MIT License。动画引擎使用 [Vara.js](https://github.com/akzhy/Vara)（MIT），笔迹数据 Shadows Into Light 使用 SIL Open Font License。依赖通过 jsDelivr 加载，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
