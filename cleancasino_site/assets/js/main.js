// assets/js/main.js
// Общие скрипты сайта: бургер-меню, якоря, контактная форма, тост.
const burgerButton = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burgerButton && navLinks) {
  burgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burgerButton.classList.toggle('open');
  });
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href') || '';
    const id = href.substring(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
      navLinks?.classList.remove('open');
      burgerButton?.classList.remove('open');
    }
  });
});

// Функция отправки данных на сервер
async function submitToServer(formData) {
  try {
    // Поддержка внешнего API (для GitHub Pages)
    const apiBase = (window.CC_API_BASE || localStorage.getItem('CC_API_BASE') || '').replace(/\/$/, '');
    const endpoint = (apiBase ? apiBase + '/api/email/subscribe' : '/api/email/subscribe');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка отправки данных:', error);
    throw error;
  }
}

// Обработка контактной формы
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = /** @type {HTMLInputElement} */(document.getElementById('email'))?.value || '';
    const tg = /** @type {HTMLInputElement} */(document.getElementById('tg'))?.value || '';
    const consent = true;

    // Показываем индикатор загрузки
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправляем...';
    submitButton.disabled = true;

    try {
      // Отправляем на сервер
      // Валидация: достаточно одного контакта (email или tg)
      if (!email && !tg) {
        showToast('Оставьте Email или Telegram — одно из двух');
        return;
      }

      const result = await submitToServer({ email, telegram: tg, consent });
      
      if (result.success) {
        // Сохраняем в localStorage как резервную копию
        const leadsRaw = localStorage.getItem('cc_leads') || '[]';
        /** @type {{email: string, tg?: string, consent?: boolean, ts: number}[]} */
        const leads = JSON.parse(leadsRaw);
        leads.push({ email, tg, consent, ts: Date.now() });
        localStorage.setItem('cc_leads', JSON.stringify(leads));

        // Отслеживаем конверсию
        if (window.trackConversion) {
          window.trackConversion(email, tg);
        }

        showToast('Спасибо! Мы на связи.');
        contactForm.reset();
      } else {
        showToast('Ошибка отправки. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      showToast('Ошибка отправки. Попробуйте еще раз.');
    } finally {
      // Восстанавливаем кнопку
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}
function showToast(message) {
  const t = document.createElement('div');
  t.textContent = message;
  t.style.position = 'fixed';
  t.style.bottom = '24px';
  t.style.left = '50%';
  t.style.transform = 'translateX(-50%)';
  t.style.padding = '12px 18px';
  t.style.background = 'rgba(0,0,0,.8)';
  t.style.color = '#fff';
  t.style.border = '1px solid rgba(255,255,255,.15)';
  t.style.borderRadius = '12px';
  t.style.zIndex = '9999';
  t.style.boxShadow = '0 10px 18px rgba(0,0,0,.4)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

// Лёгкое офлайн‑демо проверяемой честности: seed + сумма -> детерминированный результат (0..99)
// Мини‑рулетка: детерминированный исход 0..36 по seed
(function initMiniRoulette(){
  const canvas = document.getElementById('rl-canvas');
  const spinBtn = document.getElementById('rl-spin');
  const resultEl = document.getElementById('rl-result');
  const seedEl = document.getElementById('rl-seed');
  if (!canvas || !spinBtn || !resultEl || !seedEl) return;

  const ctx = canvas.getContext('2d');
  const numbers = Array.from({length: 37}, (_, i) => i); // 0..36
  const colors = numbers.map(n => n === 0 ? '#2ecc71' : (n % 2 === 0 ? '#e74c3c' : '#2c3e50'));

  function drawWheel(highlightIndex = -1, angleOffset = 0){
    const r = canvas.width/2;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(r, r);
    ctx.rotate(angleOffset);
    const step = (Math.PI*2)/numbers.length;
    for(let i=0;i<numbers.length;i++){
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.arc(0,0,r, i*step, (i+1)*step);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      if (i === highlightIndex) {
        ctx.fillStyle = 'rgba(255,255,255,.15)';
        ctx.fill();
      }
      // числа
      ctx.save();
      ctx.rotate(i*step + step/2);
      ctx.translate(r*0.7,0);
      ctx.rotate(Math.PI/2);
      ctx.fillStyle = '#fff';
      ctx.font = '12px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(numbers[i]),0,4);
      ctx.restore();
    }
    ctx.restore();
  }

  function deterministicNumberFromSeed(seed){
    if (!seed) return 0;
    let h = 0;
    for (let i=0;i<seed.length;i++) h = ((h<<5)-h) + seed.charCodeAt(i) | 0;
    const n = Math.abs(h) % 37;
    return n;
  }

  function getBetChoice(){
    const el = document.querySelector('input[name="rl-bet"]:checked');
    return el ? el.value : 'red';
  }

  function isWin(n, bet){
    if (bet === 'red') return n !== 0 && (n % 2 === 0);
    if (bet === 'black') return n !== 0 && (n % 2 !== 0);
    if (bet === 'even') return n !== 0 && (n % 2 === 0);
    if (bet === 'odd') return n !== 0 && (n % 2 !== 0);
    return false;
  }

  // первичная отрисовка
  drawWheel();

  spinBtn.addEventListener('click', () => {
    const seed = (seedEl.value || '').trim();
    if (!seed) { showToast('Введите seed'); return; }
    const target = deterministicNumberFromSeed(seed);
    const bet = getBetChoice();

    // Анимация вращения до нужного сектора
    const totalSpins = 5; // оборотов
    const step = (Math.PI*2)/numbers.length;
    const targetAngle = (numbers.length - target) * step; // чтобы указатель сверху показывал target
    const start = performance.now();
    const duration = 2000;

    function tick(t){
      const p = Math.min(1, (t - start)/duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const angle = ease * (Math.PI*2*totalSpins + targetAngle);
      drawWheel(-1, angle);
      if (p < 1) requestAnimationFrame(tick); else finish();
    }
    function finish(){
      drawWheel();
      const win = isWin(target, bet);
      resultEl.innerHTML = `
        <div class="card" style="padding:14px;">
          <div><strong>Seed:</strong> ${seed}</div>
          <div><strong>Число (детерминир.):</strong> ${target}</div>
          <div><strong>Ставка:</strong> ${bet}</div>
          <div><strong>Результат:</strong> ${win ? 'Победа 🎉' : 'Проигрыш'}</div>
          <div style="margin-top:8px; font-size:12px; color:#999;">Сохраните seed и повторите офлайн — выпадет то же число. Бэкенд не влияет на расчёт.</div>
        </div>
      `;
    }
    requestAnimationFrame(tick);
  });
})();