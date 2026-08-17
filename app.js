const VARA_FONT = 'https://cdn.jsdelivr.net/npm/vara@1.4.1/fonts/Shadows-Into-Light/shadows-into-light.json';
const preview = document.querySelector('#preview');
const status = document.querySelector('#status');
let currentVara = null;

function settings() {
  return {
    text: document.querySelector('#text-input').value.trim(),
    color: document.querySelector('#color-input').value,
    fontSize: Number(document.querySelector('#size-input').value),
    duration: Number(document.querySelector('#duration-input').value),
    textAlign: document.querySelector('#align-input').value
  };
}

function validate(text) {
  if (!text) return '请输入一句英文短句。';
  if (/[^a-zA-Z0-9 .,!?;:'"()&+\-]/.test(text)) return '当前笔迹不支持该字符，请使用英文字母、数字或常用英文标点。';
  return '';
}

function generate() {
  const options = settings();
  const error = validate(options.text);
  if (error) {
    status.textContent = error;
    return;
  }
  preview.replaceChildren();
  status.textContent = '正在生成…';
  currentVara = new Vara('#preview', VARA_FONT, [{
    text: options.text,
    id: 'message',
    duration: options.duration,
    fontSize: options.fontSize,
    color: options.color,
    textAlign: options.textAlign,
    autoAnimation: true
  }], {
    strokeWidth: 1.8
  });
  currentVara.ready(() => {
    const svg = preview.querySelector('svg');
    if (svg) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', options.text);
      svg.style.width = '100%';
    }
    status.textContent = '动画已生成';
  });
  currentVara.animationEnd(() => { status.textContent = '书写完成，可重新播放或导出 SVG'; });
}

document.querySelector('#controls').addEventListener('submit', event => {
  event.preventDefault();
  generate();
});

document.querySelector('#replay-button').addEventListener('click', () => {
  if (!currentVara) return generate();
  currentVara.draw('message');
  status.textContent = '正在重新书写…';
});

document.querySelector('#export-button').addEventListener('click', () => {
  const svg = preview.querySelector('svg');
  if (!svg) {
    status.textContent = '请先生成动画。';
    return;
  }
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const payload = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  const url = URL.createObjectURL(new Blob([payload], { type: 'image/svg+xml' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'inktime-lettering.svg';
  link.click();
  URL.revokeObjectURL(url);
  status.textContent = 'SVG 已导出';
});

document.querySelector('#size-input').addEventListener('input', event => {
  document.querySelector('#size-output').textContent = event.target.value;
});

document.querySelector('#duration-input').addEventListener('input', event => {
  document.querySelector('#duration-output').textContent = `${(event.target.value / 1000).toFixed(1)} 秒`;
});

window.addEventListener('load', generate);
