const colorInput = document.getElementById('color');
const codeInput = document.getElementById('code');

const nameRes = document.getElementById('name');
const rgbRes = document.getElementById('rgb');
const rgbaRes = document.getElementById('rgba');
const hexRes = document.getElementById('hex');
const hslRes = document.getElementById('hsl');
const cmykRes = document.getElementById('cmyk');

const rgbaRange = document.getElementById('rgba-range');
rgbaRange.addEventListener('input', alphaChanged, false);

// colorInput.addEventListener('change', colorChanged, false);
colorInput.addEventListener('input', colorChanged, false);

// codeInput.addEventListener('change', codeChanged, false);
codeInput.addEventListener('input', codeChanged, false);

function alphaChanged(ev) {
  const alpha = typeof(ev) === 'number' ? ev : Number(ev.target.value);
  const color = w3color(colorInput.value);

  if (color.valid) {
    color.opacity = alpha / 10;
    const rgba = color.toRgbaString();
    rgbaRes.style.backgroundColor = rgba;
    rgbaRes.innerText = rgba;
  }
}

function colorChanged(event) {
  codeInput.value = event.target.value;
  codeChanged(event.target.value);
}

function codeChanged(event) {
  const eventValue = typeof(event) === 'string' ? event : event.target.value;
  const value = (eventValue || '').toLowerCase().trim();

  const color = w3color(value);
  if (!color.valid) {
    return;
  }

  colorInput.value = color.toHexString();
  rgbRes.innerText = color.toRgbString();
  nameRes.innerText = color.toName();
  rgbaRes.innerText = color.toRgbaString();
  hexRes.innerText = color.toHexString();
  hslRes.innerText = color.toHslString();
  cmykRes.innerText = color.toCmykString();

  rgbaRange.value = 10;
  alphaChanged(10);

  // if color is black, set rgba color is white
  if (color.toHexString() === '#000000') {
    rgbaRes.style.color = '#fff';
  } else {
    rgbaRes.style.color = '#000';
  }
}

// init data first load
codeChanged('#000');

// copy to clipboard
new ClipboardJS('button', {
  text: function(trigger) {
    return trigger.innerText;
  }
});
