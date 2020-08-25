const colorInput = document.getElementById('color');
const codeInput = document.getElementById('code');

const nameRes = document.getElementById('name');
const rgbRes = document.getElementById('rgb');
const rgbaRes = document.getElementById('rgba');
const hexRes = document.getElementById('hex');
const hslRes = document.getElementById('hsl');
const cmykRes = document.getElementById('cmyk');

// colorInput.addEventListener('change', colorChanged, false);
colorInput.addEventListener('input', colorChanged, false);

// codeInput.addEventListener('change', codeChanged, false);
codeInput.addEventListener('input', codeChanged, false);

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
}

// init data first load
codeChanged('#000');
