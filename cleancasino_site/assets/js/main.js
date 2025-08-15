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
    const consent = /** @type {HTMLInputElement} */(document.getElementById('consent'))?.checked ?? true;

    // Показываем индикатор загрузки
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправляем...';
    submitButton.disabled = true;

    try {
      // Отправляем на сервер
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
const betBtn = document.getElementById('btn-bet');
if (betBtn) {
  betBtn.addEventListener('click', () => {
    const amountEl = document.getElementById('bet-amount');
    const seedEl = document.getElementById('bet-seed');
    const resultEl = document.getElementById('bet-result');

    const amount = parseFloat(amountEl?.value || '0');
    const seed = (seedEl?.value || '').trim();

    if (!amount || amount <= 0 || !seed) {
      showToast('Введите сумму и seed');
      return;
    }

    // Простейший детерминированный генератор на основе seed
    // В реальном продукте будет криптографический HMAC(seed, serverSeed)
    const hash = Array.from(seed).reduce((acc, ch) => ((acc << 5) - acc) + ch.charCodeAt(0) | 0, 0);
    const normalized = Math.abs(hash) % 100; // 0..99

    const win = normalized >= 55; // условный шанс 45%
    const payout = win ? amount * 2 : 0;

    resultEl.innerHTML = `
      <div class="card" style="padding:16px;">
        <div><strong>Seed:</strong> ${seed}</div>
        <div><strong>Детерминированное число:</strong> ${normalized}</div>
        <div><strong>Результат:</strong> ${win ? 'Победа 🎉' : 'Проигрыш'}; Выплата: ${payout}</div>
        <div style="margin-top:8px; font-size:12px; color:#666;">
          Этот результат можно пересчитать локально: правило известно, сервер не участвует в генерации.
        </div>
      </div>
    `;
  });
}