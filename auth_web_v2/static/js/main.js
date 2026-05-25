// ===== STATE =====
let mode = "";
let selectedImage = null;
let patternDots = [];
let isDrawing = false;
let lastDot = null;

// ===== STEP MANAGER =====
function showStep(id) {
  document.querySelectorAll('.step').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  el.style.display = 'flex';
  // tiny delay for animation
  requestAnimationFrame(() => el.classList.add('active'));
}

function goHome() {
  selectedImage = null;
  patternDots = [];
  clearPattern();
  clearPinBoxes();
  showStep('step-home');
}

// ===== FLOW START =====
function startFlow(m) {
  mode = m;
  document.getElementById('name-mode-label').textContent =
    m === 'register' ? 'Create Account' : 'Sign In';
  document.getElementById('submit-label').textContent =
    m === 'register' ? 'Register' : 'Login';
  document.getElementById('name-input').value = '';

  fetch('/api/set_mode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: m })
  });

  showStep('step-name');
}

// ===== NAME =====
async function submitName() {
  const name = document.getElementById('name-input').value.trim();
  if (!name) { showToast('Enter a username ✦', 'error'); return; }

  const res = await post('/api/set_name', { name });
  if (res.ok) {
    buildImageGrid();
    showStep('step-image');
  } else {
    showToast(res.msg, 'error');
  }
}

document.getElementById('name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitName();
});

// ===== IMAGE GRID =====
function buildImageGrid() {
  const grid = document.getElementById('image-grid');
  grid.innerHTML = '';
  selectedImage = null;

  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'img-btn';
    btn.dataset.index = i - 1;

    const img = document.createElement('img');
    img.src = `/static/images/img${i}.png`;
    img.alt = `Image ${i}`;
    img.onerror = () => {
      // fallback placeholder
      btn.style.background = `hsl(${i * 37}, 45%, 75%)`;
      btn.innerHTML = `<span style="font-size:32px; color:white; display:flex; align-items:center; justify-content:center; height:100%">
        ${'🛍🎀👑💎🌸🌿🪷✨🦋'.split('')[i-1]}
      </span>`;
    };

    btn.appendChild(img);
    btn.addEventListener('click', () => selectImage(i - 1, btn));
    grid.appendChild(btn);
  }
}

function selectImage(idx, btn) {
  document.querySelectorAll('.img-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedImage = idx;
}

async function submitImage() {
  if (selectedImage === null) { showToast('Select an image first ✦', 'error'); return; }
  const res = await post('/api/set_image', { image: selectedImage });
  if (res.ok) {
    initPatternCanvas();
    clearPattern();
    showStep('step-pattern');
  } else {
    showToast(res.msg, 'error');
  }
}

// ===== PATTERN CANVAS =====
const DOT_POSITIONS = [
  [40,40],[135,40],[230,40],
  [40,135],[135,135],[230,135],
  [40,230],[135,230],[230,230]
];
const RADIUS = 14;
let lines = [];
let canvas, ctx;

function initPatternCanvas() {
  canvas = document.getElementById('pattern-canvas');
  ctx = canvas.getContext('2d');
  clearPattern();

  // Mouse events
  canvas.onmousedown = startDraw;
  canvas.onmousemove = moveDraw;
  canvas.onmouseup = endDraw;
  canvas.onmouseleave = endDraw;

  // Touch events
  canvas.ontouchstart = e => { e.preventDefault(); startDraw(e.touches[0]); };
  canvas.ontouchmove = e => { e.preventDefault(); moveDraw(e.touches[0]); };
  canvas.ontouchend = endDraw;
}

function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw lines first
  lines.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(DOT_POSITIONS[a][0], DOT_POSITIONS[a][1]);
    ctx.lineTo(DOT_POSITIONS[b][0], DOT_POSITIONS[b][1]);
    ctx.strokeStyle = '#c9a84c';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  });

  // Draw dots
  DOT_POSITIONS.forEach(([x, y], i) => {
    const isSelected = patternDots.includes(i);

    // Outer ring
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = isSelected ? '#c9a84c' : '#d4cfc8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner fill
    ctx.beginPath();
    ctx.arc(x, y, RADIUS - 5, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? '#c9a84c' : '#1a1612';
    ctx.fill();
  });
}

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}

function getDotAt(x, y) {
  return DOT_POSITIONS.findIndex(([dx, dy]) =>
    Math.hypot(x - dx, y - dy) < RADIUS + 8
  );
}

function startDraw(e) {
  isDrawing = true;
  patternDots = [];
  lines = [];
  lastDot = null;
  drawDots();
}

function moveDraw(e) {
  if (!isDrawing) return;
  const { x, y } = getCanvasPos(e);
  const d = getDotAt(x, y);

  if (d !== -1 && !patternDots.includes(d)) {
    if (lastDot !== null) lines.push([lastDot, d]);
    patternDots.push(d);
    lastDot = d;
    drawDots();
  }
}

function endDraw() { isDrawing = false; }

function clearPattern() {
  patternDots = [];
  lines = [];
  lastDot = null;
  if (ctx) drawDots();
}

async function submitPattern() {
  if (patternDots.length < 2) {
    showToast('Connect at least 2 dots ✦', 'error');
    return;
  }
  const res = await post('/api/set_pattern', { pattern: patternDots });
  if (res.ok) {
    clearPinBoxes();
    showStep('step-pin');
  } else {
    showToast(res.msg, 'error');
  }
}

// ===== PIN =====
function pinMove(el, idx) {
  el.value = el.value.replace(/\D/g, '').slice(0, 1);
  const boxes = document.querySelectorAll('.pin-box');
  if (el.value && idx < 3) boxes[idx + 1].focus();
}

function clearPinBoxes() {
  document.querySelectorAll('.pin-box').forEach(b => b.value = '');
}

async function submitPin() {
  const boxes = [...document.querySelectorAll('.pin-box')];
  const pin = boxes.map(b => b.value).join('');

  if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    showToast('Enter a valid 4-digit PIN ✦', 'error');
    return;
  }

  const res = await post('/api/submit_pin', { pin });
  if (res.ok) {
    if (res.redirect) {
      // Login success → go to dashboard
      window.location.href = res.redirect;
    } else {
      // Register success → back to home
      showStep('step-home');
      showToast('Account created! You can now sign in ✦', 'ok');
    }
  } else {
    showToast(res.msg, 'error');
    clearPinBoxes();
    document.querySelectorAll('.pin-box')[0].focus();
  }
}


// PIN keyboard nav
document.addEventListener('keydown', e => {
  const boxes = [...document.querySelectorAll('.pin-box')];
  const focused = document.activeElement;
  const idx = boxes.indexOf(focused);
  if (idx !== -1 && e.key === 'Backspace' && !focused.value && idx > 0) {
    boxes[idx - 1].focus();
  }
  if (e.key === 'Enter') {
    const pinStep = document.getElementById('step-pin');
    if (pinStep.classList.contains('active')) submitPin();
  }
});

// ===== HELPERS =====
async function post(url, data) {
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await r.json();
  } catch {
    return { ok: false, msg: 'Network error' };
  }
}

let toastTimer;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  showStep('step-home');
});
