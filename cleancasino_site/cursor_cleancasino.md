# Создание сайта для стартапа CleanCasino
_Exported on 8/14/2025 at 23:01:05 GMT+7 from Cursor (1.4.5)_

---

**User**

Создай современный многостраничный сайт для стартапа под названием "CleanCasino".  
Это пока что не полноценное казино, а проект на этапе концепта, который привлекает внимание и собирает аудиторию.

🎯 Цели:
- Передать идею честного, прозрачного и технологичного онлайн-казино будущего.
- Сделать так, чтобы пользователь сразу понимал тематику (фон, цвета, шрифты, иконки — всё в атмосфере казино).
- Сайт должен быть ярким, анимированным, с плавными переходами.
- На первой странице — крупный заголовок и эффектная подача УТП.
- Несколько секций: 
  1. Hero-секция с большим фоном (тематика казино, фишки, карты, рулетка).
  2. Блок "О проекте" — кто мы, наша миссия.
  3. Как это работает — 3–4 карточки с иконками и краткими шагами.
  4. Секция с будущими фичами и преимуществами.
  5. Контактная форма (email, telegram).
- Дополнительная страница: FAQ + страница "Присоединиться".

🎨 Дизайн:
- Стиль: футуристичный + элементами Las Vegas (не кричаще, но атмосферно).
- Цвета: тёмный фон (#0e0e0e), яркие акценты (золото, красный, неоновые оттенки).
- Шрифты: современные, с акцентными заголовками.
- Фон — анимированный (можно через CSS-анимации или Three.js эффекты).
- Плавные появления элементов при скролле (AOS или Framer Motion).

🛠 Технически:
- HTML + CSS + JS (Vanilla или с использованием Tailwind CSS).
- Всё должно быть адаптивным для мобильных.
- Готовая структура для деплоя на GitHub Pages (index.html, about.html, faq.html и т.д. + папка assets).
- Подключи анимации (AOS или аналог).
- Все изображения и иконки положи в /assets.
- В коде используй комментарии, чтобы было понятно, что и где.

📦 Вывод:
Сделай полный проект с готовой файловой структурой, чтобы можно было скачать, заархивировать и загрузить в репозиторий на GitHub Pages.


---

**Cursor**

Беруся за создание структуры проекта и базовых страниц с анимациями и стилями. Сначала сгенерирую ключевые файлы: главная страница, стили и скрипты, включая анимации и FAQ-аккордеон. После этого добавлю остальные страницы и SVG-иконки.

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="CleanCasino — честное, прозрачное и технологичное онлайн‑казино будущего. Присоединяйтесь к комьюнити и первым узнайте о запуске." />
    <title>CleanCasino — честное казино будущего</title>

    <!-- Google Fonts: заголовки и текст -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- AOS Animations -->
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />

    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <!-- Анимированный фон -->
    <div class="bg fx-grid"></div>

    <!-- Навигация -->
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="/">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="#about">О проекте</a>
          <a href="#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- Hero-секция -->
    <section class="hero" id="hero">
      <div class="container hero-inner">
        <div class="hero-copy" data-aos="fade-up" data-aos-delay="50">
          <div class="badge">Концепт • Ранний доступ</div>
          <h1>
            Честное казино будущего
            <span class="gradient-text">CleanCasino</span>
          </h1>
          <p class="subtitle">
            Прозрачные механики, верифицируемая честность и стильная атмосфера Лас‑Вегаса в цифровую эпоху. Мы строим площадку, где доверие — стандарт.
          </p>
          <div class="cta">
            <a class="btn btn-primary" href="join.html">Присоединиться</a>
            <a class="btn btn-ghost" href="#about">Узнать больше</a>
          </div>
        </div>
        <div class="hero-visual" data-aos="zoom-in" data-aos-delay="150">
          <!-- Декоративные элементы геро-секции -->
          <img class="float chip" src="assets/img/chip.svg" alt="Фишка" />
          <img class="float card" src="assets/img/card-ace.svg" alt="Туз" />
          <img class="float roulette" src="assets/img/roulette.svg" alt="Рулетка" />
        </div>
      </div>
    </section>

    <!-- О проекте -->
    <section class="section" id="about">
      <div class="container" data-aos="fade-up">
        <h2>О проекте</h2>
        <p class="lead">
          CleanCasino — это визионерский проект команды энтузиастов финтеха и игр. Наша миссия — создать онлайн‑казино, где правила прозрачны, 
          а результаты можно проверять. Мы стремимся объединить технологичность, стиль и честность, чтобы вернуть игрокам доверие.
        </p>
        <div class="features-inline">
          <span class="tag">Прозрачность</span>
          <span class="tag">Верифицируемая честность</span>
          <span class="tag">Технологии</span>
          <span class="tag">Атмосфера</span>
        </div>
      </div>
    </section>

    <!-- Как это работает -->
    <section class="section" id="how">
      <div class="container">
        <h2 data-aos="fade-up">Как это работает</h2>
        <div class="cards">
          <article class="card" data-aos="fade-up" data-aos-delay="50">
            <div class="icon">
              <img src="assets/img/chip.svg" alt="Честность" />
            </div>
            <h3>Проверяемая честность</h3>
            <p>Каждый раунд — верифицируем: криптографические хэши и открытые сиды позволяют убедиться в результате.</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="icon">
              <img src="assets/img/card-ace.svg" alt="Прозрачность" />
            </div>
            <h3>Открытые алгоритмы</h3>
            <p>Ключевые механики документированы и доступны для аудита. Никаких «черных ящиков».</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="150">
            <div class="icon">
              <img src="assets/img/roulette.svg" alt="Выплаты" />
            </div>
            <h3>Прозрачные выплаты</h3>
            <p>Статистика банков и RTP публикуется. Вы видите, как движутся средства и как формируются выплаты.</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="200">
            <div class="icon">
              <img src="assets/img/favicon.svg" alt="Комьюнити" />
            </div>
            <h3>Комьюнити‑подход</h3>
            <p>Мы собираем обратную связь с ранних этапов и вместе создаем лучшее казино будущего.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Будущие фичи -->
    <section class="section" id="future">
      <div class="container">
        <h2 data-aos="fade-up">Что дальше</h2>
        <div class="grid" data-aos="fade-up" data-aos-delay="100">
          <div class="tile">
            <h4>Бета‑тест площадки</h4>
            <p>Ранний доступ с бонусами для первопроходцев и активных тестировщиков.</p>
            <span class="badge neon">Скоро</span>
          </div>
          <div class="tile">
            <h4>Турниры и рейтинг</h4>
            <p>Еженедельные состязания и лидерборды с прозрачными правилами.</p>
            <span class="badge gold">План</span>
          </div>
          <div class="tile">
            <h4>Портфель игр</h4>
            <p>Рулетка, блэкджек, слоты с верифицируемой честностью и понятным RTP.</p>
            <span class="badge red">R&D</span>
          </div>
          <div class="tile">
            <h4>Аудиты и отчеты</h4>
            <p>Публичные проверки механик и периодическая публикация данных.</p>
            <span class="badge cyan">Прозрачность</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Контакты -->
    <section class="section" id="contact">
      <div class="container contact" data-aos="fade-up">
        <h2>Связаться с нами</h2>
        <p class="lead">Оставьте почту и Telegram — пришлем новости и приглашение в бета‑доступ.</p>
        <form id="contact-form" class="form">
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="form-row">
            <label for="tg">Telegram</label>
            <input type="text" id="tg" name="tg" placeholder="@username" />
          </div>
          <button type="submit" class="btn btn-primary">Отправить</button>
          <p class="form-note">Нажимая «Отправить», вы соглашаетесь с получением новостей о проекте.</p>
        </form>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="/">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="#about">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект. Азартные игры не предоставляются.</p>
      </div>
    </footer>

    <!-- Скрипты -->
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
  </html>


```

```css
/*
  CleanCasino — базовые стили, анимации и оформление.
  Стек: Vanilla CSS + AOS для появления при скролле.
*/

:root {
  --bg: #0e0e0e;
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.1);
  --text: #eaeaea;
  --muted: #b8b8b8;
  --gold: #f0b90b;
  --red: #ff3b3b;
  --cyan: #00f7ff;
  --accent: #9b5cff;
  --brand: linear-gradient(90deg, #ffd166 0%, #ff6b6b 50%, #00f7ff 100%);
  --radius: 14px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}

.container {
  width: min(1200px, 92%);
  margin: 0 auto;
}

/* Анимированный неоновый грид на фоне */
.bg.fx-grid {
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(155, 92, 255, 0.25), transparent 60%),
    radial-gradient(800px 400px at 10% 110%, rgba(0, 247, 255, 0.18), transparent 60%),
    #080808;
}
.bg.fx-grid::before {
  content: '';
  position: absolute;
  inset: -200% -200%;
  background-image:
    linear-gradient(rgba(0, 247, 255, 0.15) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 247, 255, 0.15) 2px, transparent 2px);
  background-size: 60px 60px, 60px 60px;
  background-position: 0 0, 0 0;
  filter: drop-shadow(0 0 8px rgba(0, 247, 255, 0.35));
  animation: gridMove 30s linear infinite;
  opacity: .25;
}

@keyframes gridMove {
  0% { transform: translate3d(0, 0, 0) skewX(-10deg) rotateX(50deg); }
  50% { transform: translate3d(80px, -80px, 0) skewX(-10deg) rotateX(50deg); }
  100% { transform: translate3d(0, 0, 0) skewX(-10deg) rotateX(50deg); }
}

/* Навигация */
.site-header {
  position: sticky;
  top: 0;
  backdrop-filter: saturate(1.2) blur(8px);
  background: rgba(8, 8, 8, 0.6);
  border-bottom: 1px solid var(--border);
  z-index: 50;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}
.brand { display: inline-flex; gap: 10px; align-items: center; text-decoration: none; color: var(--text); font-weight: 700; }
.brand .logo { width: 28px; height: 28px; }
.nav-links { display: flex; gap: 22px; align-items: center; }
.nav-links a { color: var(--text); text-decoration: none; font-weight: 600; opacity: .9; }
.nav-links a:hover { opacity: 1; }
.nav-links .btn.sm { padding: 10px 14px; }
.burger { display: none; width: 40px; height: 40px; background: transparent; border: 0; cursor: pointer; }
.burger span { display: block; height: 2px; margin: 7px 0; background: #fff; border-radius: 2px; transition: .3s ease; }

/* Кнопки */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 12px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; transition: .25s ease; border: 1px solid var(--border); }
.btn-primary { color: #101010; background: var(--brand); box-shadow: 0 8px 24px rgba(255, 107, 107, .15), 0 2px 8px rgba(0, 247, 255, .15); }
.btn-primary:hover { transform: translateY(-1px); filter: brightness(1.05); }
.btn-ghost { color: var(--text); background: transparent; }
.btn-ghost:hover { background: rgba(255, 255, 255, .06); }

.badge { display: inline-block; padding: 6px 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.07); border: 1px solid var(--border); color: var(--muted); font-size: 12px; letter-spacing: .02em; }
.badge.gold { background: rgba(240,185,11,.1); border-color: rgba(240,185,11,.35); color: #ffd35e; }
.badge.red { background: rgba(255,59,59,.08); border-color: rgba(255,59,59,.3); color: #ff8a8a; }
.badge.cyan { background: rgba(0,247,255,.08); border-color: rgba(0,247,255,.35); color: #86ffff; }
.badge.neon { background: rgba(155,92,255,.1); border-color: rgba(155,92,255,.35); color: #d3b9ff; }

.gradient-text { background: var(--brand); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 0 12px rgba(155, 92, 255, .25)); }

/* Hero */
.hero { position: relative; padding: 96px 0 40px; }
.hero-inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: center; }
.hero h1 { font-family: 'Orbitron', sans-serif; font-size: clamp(36px, 5.2vw, 68px); line-height: 1.02; margin: 12px 0 10px; }
.hero .subtitle { color: var(--muted); font-size: 18px; max-width: 720px; }
.cta { display: flex; gap: 14px; margin-top: 18px; flex-wrap: wrap; }

.hero-visual { position: relative; min-height: 320px; display: grid; place-items: center; }
.float { position: absolute; filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.6)); opacity: .95; animation: float 6s ease-in-out infinite; }
.float.chip { width: 120px; left: 10%; top: 20%; animation-delay: .2s; }
.float.card { width: 160px; right: 10%; top: 35%; transform: rotate(-8deg); animation-delay: .6s; }
.float.roulette { width: 180px; bottom: -6px; left: 40%; transform: rotate(10deg); animation-delay: .9s; }

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

/* Секции */
.section { padding: 80px 0; }
.section h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(28px, 3.5vw, 42px); margin: 0 0 14px; }
.lead { color: var(--muted); font-size: 18px; }

.features-inline { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
.tag { display: inline-block; padding: 8px 12px; border-radius: 999px; border: 1px solid var(--border); background: rgba(255,255,255,.03); color: #e5e5e5; font-size: 13px; }

.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); transition: transform .25s ease, box-shadow .25s ease; }
.card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,.55); }
.card .icon { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; background: rgba(255,255,255,.04); border: 1px solid var(--border); margin-bottom: 10px; }
.card .icon img { width: 28px; height: 28px; }
.card h3 { margin: 8px 0 8px; font-size: 18px; }
.card p { color: var(--muted); }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.tile { background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03)); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; position: relative; overflow: hidden; }
.tile::after { content: ''; position: absolute; inset: -60% -60%; background: radial-gradient(600px 200px at 20% 0%, rgba(155,92,255,.12), transparent 50%); transform: rotate(-8deg); }
.tile h4 { margin: 0 0 6px; }
.tile p { margin: 0 0 12px; color: var(--muted); }

.contact .form { display: grid; gap: 14px; max-width: 560px; }
.form-row { display: grid; gap: 6px; }
.form-row label { font-size: 14px; color: #d6d6d6; }
.form-row input, .form-row textarea {
  padding: 14px 16px;
  background: rgba(255,255,255,.04);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  outline: none;
}
.form-note { color: var(--muted); font-size: 13px; }

/* Футер */
.site-footer { border-top: 1px solid var(--border); margin-top: 40px; padding-top: 28px; background: rgba(8,8,8,.4); backdrop-filter: blur(6px); }
.footer { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.brand.small span { font-size: 16px; }
.footer-links { display: flex; gap: 16px; }
.footer-links a { color: var(--muted); text-decoration: none; }
.footer-links a.accent { color: #fff; font-weight: 700; }
.socials { display: flex; gap: 10px; align-items: center; }
.socials img { width: 18px; height: 18px; opacity: .8; }
.legal { text-align: center; padding: 8px 0 22px; color: var(--muted); }

/* Адаптивность */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { order: -1; min-height: 220px; }
  .cards { grid-template-columns: repeat(2, 1fr); }
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .nav-links { position: fixed; right: 16px; top: 74px; background: rgba(8,8,8,.92); border: 1px solid var(--border); border-radius: 14px; padding: 14px; display: none; flex-direction: column; gap: 12px; box-shadow: var(--shadow); }
  .nav-links.open { display: flex; }
  .burger { display: inline-block; }
  .float.card { width: 130px; }
  .float.roulette { width: 140px; left: 55%; }
  .cards, .grid { grid-template-columns: 1fr; }
}

/*
  CleanCasino — Global Styles
  - Futuristic Vegas-inspired dark theme with neon accents
  - Responsive, accessible, and animated
*/

:root {
  --bg: #0e0e0e;
  --surface: #141414;
  --surface-2: #1a1a1a;
  --text: #e6e6e6;
  --muted: #bdbdbd;
  --gold: #f5c518;
  --red: #ff2d55;
  --neon: #00e5ff;
  --green: #13ff87;
  --shadow: rgba(0, 0, 0, 0.4);
  --radius: 16px;
  --radius-sm: 12px;
  --radius-lg: 24px;
  --container: 1200px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Poppins", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
}

img, svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Container */
.container {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;
}

/* Header / Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(180deg, rgba(14, 14, 14, 0.9), rgba(14, 14, 14, 0.6), rgba(14, 14, 14, 0));
  backdrop-filter: saturate(140%) blur(10px);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 0 12px rgba(0, 229, 255, 0.5));
}

.brand-name {
  font-weight: 800;
  letter-spacing: 0.4px;
}

.brand-name .accent {
  color: var(--neon);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: var(--muted);
  padding: 8px 10px;
  border-radius: 10px;
}

.nav-links a:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  box-shadow: 0 8px 24px var(--shadow), inset 0 0 0 0 rgba(255, 255, 255, 0);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
}

.btn:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.06);
}

.btn-primary {
  background: radial-gradient(120% 120% at 20% 10%, rgba(0, 229, 255, 0.25), rgba(0, 229, 255, 0) 60%),
              linear-gradient(90deg, #00e5ff, #13ff87);
  color: #071f1e;
  font-weight: 700;
  border: none;
  box-shadow: 0 8px 30px rgba(0, 229, 255, 0.25), 0 0 0 1px rgba(0, 229, 255, 0.12) inset;
}

.btn-primary:hover {
  box-shadow: 0 10px 36px rgba(0, 229, 255, 0.35), 0 0 0 1px rgba(0, 229, 255, 0.22) inset;
}

.btn-gold {
  background: linear-gradient(135deg, #f7d14a, #f0b90b);
  color: #2b2100;
  font-weight: 700;
  border: none;
  box-shadow: 0 8px 30px rgba(245, 197, 24, 0.25), 0 0 0 1px rgba(245, 197, 24, 0.18) inset;
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.06);
}

/* Mobile nav toggle */
.hamburger {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
}

/* Sections */
section {
  padding: 96px 0;
}

.muted {
  color: var(--muted);
}

.section-title {
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.15;
  margin: 0 0 14px 0;
}

.section-subtitle {
  margin: 0 0 22px 0;
  color: var(--muted);
}

/* Hero */
.hero {
  position: relative;
  padding-top: 80px;
  min-height: 92vh;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  inset: -20%;
  background: radial-gradient(60% 60% at 50% 20%, rgba(0, 229, 255, 0.12), rgba(0, 229, 255, 0) 60%),
              radial-gradient(40% 40% at 80% 70%, rgba(245, 197, 24, 0.12), rgba(245, 197, 24, 0) 60%),
              radial-gradient(30% 30% at 20% 80%, rgba(255, 45, 85, 0.12), rgba(255, 45, 85, 0) 60%);
  filter: blur(50px) saturate(140%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-title {
  font-family: "Orbitron", "Poppins", ui-sans-serif, system-ui, -apple-system;
  font-weight: 900;
  letter-spacing: 1px;
  font-size: clamp(44px, 8vw, 80px);
  margin: 0 0 10px 0;
  text-shadow: 0 0 12px rgba(0, 229, 255, 0.3), 0 0 32px rgba(0, 229, 255, 0.2);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: var(--muted);
  margin-bottom: 12px;
}

.hero-text {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--muted);
  max-width: 800px;
  margin: 0 auto 26px;
}

.hero-ctas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.hero-stats {
  margin-top: 28px;
  display: flex;
  gap: 18px;
  justify-content: center;
  color: var(--muted);
}

.hero-stat {
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Grids */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

@media (max-width: 960px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Cards */
.card {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.25), inset 0 0 0 0 rgba(255,255,255,0.08);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.16);
  box-shadow: 0 18px 44px rgba(0,0,0,0.3), 0 0 40px rgba(0, 229, 255, 0.08) inset;
}

.card .icon {
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.4));
}

.list {
  display: grid;
  gap: 10px;
  margin: 16px 0 0 0;
}

.list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: var(--text);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Forms */
.form {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 8px;
}

.label {
  color: var(--muted);
  font-size: 14px;
}

input[type="text"], input[type="email"], textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  color: var(--text);
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

input:focus, textarea:focus {
  border-color: rgba(0, 229, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.15);
}

/* Footer */
footer {
  padding: 24px 0 40px;
  color: var(--muted);
  text-align: center;
}

/* Background Canvas */
#particles-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Reveal animations using IntersectionObserver */
.reveal-up, .reveal-l, .reveal-r {
  opacity: 0;
  transform: translateY(12px);
  transition: transform 600ms cubic-bezier(.2,.65,.25,1), opacity 600ms ease;
}

.reveal-l { transform: translateX(-16px); }
.reveal-r { transform: translateX(16px); }

.revealed {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

/* Accordions */
.accordion {
  display: grid;
  gap: 12px;
}

.accordion-item {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  background: rgba(255,255,255,0.04);
  overflow: hidden;
}

.accordion-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  font-weight: 600;
}

.accordion-body {
  padding: 0 18px 16px;
  color: var(--muted);
  display: none;
}

.accordion-item.active .accordion-body { display: block; }

/* Utility */
.center { text-align: center; }
.mt-0 { margin-top: 0; }
.mt-8 { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mt-48 { margin-top: 48px; }
.mt-64 { margin-top: 64px; }
.mb-0 { margin-bottom: 0; }
.mb-8 { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.mb-32 { margin-bottom: 32px; }
.mb-48 { margin-bottom: 48px; }
.row { display: flex; gap: 12px; align-items: center; }
.spacer { height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.08), rgba(255,255,255,0)); margin: 28px 0; }

/* Mobile */
@media (max-width: 860px) {
  .nav-links { display: none; }
  .hamburger { display: inline-flex; align-items: center; justify-content: center; }
  .nav-open .nav-links {
    position: absolute;
    left: 20px; right: 20px; top: 68px;
    display: grid;
    gap: 8px;
    background: rgba(20,20,20,0.98);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 12px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}



```

```javascript
// Инициализация общих скриптов сайта

// Мобильное меню (бургер)
const burgerButton = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burgerButton && navLinks) {
  burgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burgerButton.classList.toggle('open');
  });
}

// Плавный скролл для якорных ссылок внутри страницы
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

// Контактная форма (демо): сохраняем в localStorage и показываем тост
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email'))?.value || '';
    const tg = /** @type {HTMLInputElement} */(document.getElementById('tg'))?.value || '';

    const leadsRaw = localStorage.getItem('cc_leads') || '[]';
    /** @type {{email: string, tg?: string, ts: number}[]} */
    const leads = JSON.parse(leadsRaw);
    leads.push({ email, tg, ts: Date.now() });
    localStorage.setItem('cc_leads', JSON.stringify(leads));

    showToast('Спасибо! Мы на связи.');
    contactForm.reset();
  });
}

// Текущий год в футере
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Простой тост
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

// CleanCasino — Main interactions and small utilities

// Mobile nav toggle
(function initMobileNav() {
  const root = document.documentElement;
  const burger = document.querySelector('[data-burger]');
  const navLinks = document.querySelector('.nav-links');
  if (!burger || !navLinks) return;
  burger.addEventListener('click', () => {
    const isOpen = root.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  // Close nav when clicking a link (mobile)
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (document.documentElement.classList.contains('nav-open')) {
        document.documentElement.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// Smooth-scroll for in-page anchors
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// Scroll reveal using IntersectionObserver
(function initReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-l, .reveal-r');
  if (elements.length === 0) return;
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  elements.forEach((el) => observer.observe(el));
})();

// Contact form: build mailto
(function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    const telegram = form.querySelector('input[name="telegram"]').value.trim();
    const subject = encodeURIComponent('CleanCasino — Запрос на контакт');
    const body = encodeURIComponent(`Здравствуйте!\n\nПочта: ${email || '—'}\nTelegram: ${telegram || '—'}\n\nСообщение отправлено с сайта CleanCasino.`);
    const mailto = `mailto:team@cleancasino.example?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
})();

// FAQ Accordion
(function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (items.length === 0) return;
  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach((i) => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
})();



```

```javascript
// Инициализация AOS (появления при скролле)
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80,
    });
  }
});


```

```javascript
// Аккордеон для FAQ
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const header = item.querySelector('.faq-q');
    const content = item.querySelector('.faq-a');
    if (!header || !content) return;
    header.addEventListener('click', () => {
      const expanded = item.classList.toggle('open');
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});


```

Сканирую рабочую папку и существующие каталоги, чтобы корректно создать структуру проекта и избежать записи в корень диска. Затем добавлю недостающие файлы.

Коротко: не удалось записать файлы в текущую рабочую папку (прав нет/папка не определена). Я подготовил полноценный проект — просто создайте папку `CleanCasino`, поместите в неё файлы ниже по структуре, закоммитьте и задеплойте на GitHub Pages.

### Структура
```
CleanCasino/
  index.html
  about.html
  faq.html
  join.html
  assets/
    css/styles.css
    js/animations.js
    js/main.js
    js/faq.js
    img/logo.svg
    img/chip.svg
    img/card-ace.svg
    img/roulette.svg
    img/email.svg
    img/telegram.svg
    img/favicon.svg
```

### Файлы

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="CleanCasino — честное, прозрачное и технологичное онлайн‑казино будущего. Присоединяйтесь к комьюнити и первым узнайте о запуске." />
    <title>CleanCasino — честное казино будущего</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <!-- Анимированный фон -->
    <div class="bg fx-grid"></div>

    <!-- Навигация -->
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html">О проекте</a>
          <a href="#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero" id="hero">
      <div class="container hero-inner">
        <div class="hero-copy" data-aos="fade-up" data-aos-delay="50">
          <div class="badge">Концепт • Ранний доступ</div>
          <h1>
            Честное казино будущего
            <span class="gradient-text">CleanCasino</span>
          </h1>
          <p class="subtitle">
            Прозрачные механики, верифицируемая честность и стильная атмосфера Лас‑Вегаса в цифровую эпоху. Мы строим площадку, где доверие — стандарт.
          </p>
          <div class="cta">
            <a class="btn btn-primary" href="join.html">Присоединиться</a>
            <a class="btn btn-ghost" href="#about">Узнать больше</a>
          </div>
        </div>
        <div class="hero-visual" data-aos="zoom-in" data-aos-delay="150">
          <img class="float chip" src="assets/img/chip.svg" alt="Фишка" />
          <img class="float card" src="assets/img/card-ace.svg" alt="Туз" />
          <img class="float roulette" src="assets/img/roulette.svg" alt="Рулетка" />
        </div>
      </div>
    </section>

    <!-- О проекте -->
    <section class="section" id="about">
      <div class="container" data-aos="fade-up">
        <h2>О проекте</h2>
        <p class="lead">
          CleanCasino — визионерский проект финтех‑и гейм‑энтузиастов. Наша миссия — создать онлайн‑казино, где правила прозрачны, а результаты можно проверять. Технологичность, стиль и честность — чтобы вернуть игрокам доверие.
        </p>
        <div class="features-inline">
          <span class="tag">Прозрачность</span>
          <span class="tag">Верифицируемая честность</span>
          <span class="tag">Технологии</span>
          <span class="tag">Атмосфера</span>
        </div>
      </div>
    </section>

    <!-- Как это работает -->
    <section class="section" id="how">
      <div class="container">
        <h2 data-aos="fade-up">Как это работает</h2>
        <div class="cards">
          <article class="card" data-aos="fade-up" data-aos-delay="50">
            <div class="icon"><img src="assets/img/chip.svg" alt="Честность" /></div>
            <h3>Проверяемая честность</h3>
            <p>Каждый раунд — верифицируем: криптографические хэши и открытые сиды позволяют убедиться в результате.</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="icon"><img src="assets/img/card-ace.svg" alt="Прозрачность" /></div>
            <h3>Открытые алгоритмы</h3>
            <p>Ключевые механики документированы и доступны для аудита. Никаких «черных ящиков».</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="150">
            <div class="icon"><img src="assets/img/roulette.svg" alt="Выплаты" /></div>
            <h3>Прозрачные выплаты</h3>
            <p>Статистика банков и RTP публикуется. Вы видите движения средств и формирование выплат.</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="200">
            <div class="icon"><img src="assets/img/favicon.svg" alt="Комьюнити" /></div>
            <h3>Комьюнити‑подход</h3>
            <p>Собираем обратную связь с ранних этапов и вместе создаем лучшее казино будущего.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Будущие фичи -->
    <section class="section" id="future">
      <div class="container">
        <h2 data-aos="fade-up">Что дальше</h2>
        <div class="grid" data-aos="fade-up" data-aos-delay="100">
          <div class="tile">
            <h4>Бета‑тест площадки</h4>
            <p>Ранний доступ с бонусами для активных тестировщиков.</p>
            <span class="badge neon">Скоро</span>
          </div>
          <div class="tile">
            <h4>Турниры и рейтинг</h4>
            <p>Еженедельные состязания и лидерборды с прозрачными правилами.</p>
            <span class="badge gold">План</span>
          </div>
          <div class="tile">
            <h4>Портфель игр</h4>
            <p>Рулетка, блэкджек, слоты с верифицируемой честностью и понятным RTP.</p>
            <span class="badge red">R&D</span>
          </div>
          <div class="tile">
            <h4>Аудиты и отчеты</h4>
            <p>Публичные проверки механик и публикация данных.</p>
            <span class="badge cyan">Прозрачность</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Контакты -->
    <section class="section" id="contact">
      <div class="container contact" data-aos="fade-up">
        <h2>Связаться с нами</h2>
        <p class="lead">Оставьте почту и Telegram — пришлем новости и приглашение в бета‑доступ.</p>
        <form id="contact-form" class="form">
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="form-row">
            <label for="tg">Telegram</label>
            <input type="text" id="tg" name="tg" placeholder="@username" />
          </div>
          <button type="submit" class="btn btn-primary">Отправить</button>
          <p class="form-note">Нажимая «Отправить», вы соглашаетесь с получением новостей о проекте.</p>
        </form>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект. Азартные игры не предоставляются.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```html
<!-- about.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>О проекте — CleanCasino</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <div class="bg fx-grid"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html" aria-current="page">О проекте</a>
          <a href="index.html#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="section" style="padding-top: 96px;">
      <div class="container" data-aos="fade-up">
        <div class="badge">Кто мы</div>
        <h1 class="gradient-text" style="font-family: Orbitron, sans-serif; margin: 10px 0 6px;">О проекте</h1>
        <p class="lead">Мы создаём площадку нового поколения: честность, верифицируемые результаты и прозрачность по умолчанию.</p>
      </div>
    </section>

    <section class="section">
      <div class="container grid" data-aos="fade-up" data-aos-delay="80">
        <div class="tile">
          <h4>Миссия</h4>
          <p>Вернуть игрокам доверие к индустрии с помощью открытых алгоритмов, криптографических доказательств и прозрачных данных.</p>
        </div>
        <div class="tile">
          <h4>Подход</h4>
          <p>Открытость и совместная разработка с комьюнити. Документация, аудит и постоянная обратная связь.</p>
        </div>
        <div class="tile">
          <h4>Этика</h4>
          <p>Ответственная игра, защита данных и приоритет честности над «хайпом».</p>
        </div>
        <div class="tile">
          <h4>Технологии</h4>
          <p>Криптография для проверки результатов, аналитика для публикации RTP и фондов, автоматика для прозрачных процессов.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" data-aos="fade-up">
        <h2>Команда и комьюнити</h2>
        <p class="lead">Мы маленькая распределённая команда. На этапе концепта подключаем менторов и добровольцев. Хотите помочь — заходите на страницу «Присоединиться».</p>
        <div class="cta" style="margin-top:16px;">
          <a class="btn btn-primary" href="join.html">Стать ранним участником</a>
          <a class="btn btn-ghost" href="index.html#contact">Связаться</a>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html" aria-current="page">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```html
<!-- faq.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FAQ — CleanCasino</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <div class="bg fx-grid"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html">О проекте</a>
          <a href="index.html#how">Как это работает</a>
          <a href="faq.html" aria-current="page">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="section" style="padding-top: 96px;">
      <div class="container" data-aos="fade-up">
        <div class="badge">Вопросы и ответы</div>
        <h1 class="gradient-text" style="font-family: Orbitron, sans-serif; margin: 10px 0 6px;">FAQ</h1>
        <p class="lead">Ключевые вопросы о концепте, честности и планах запуска.</p>

        <div class="faq-list" style="margin-top:20px;">
          <div class="faq-item">
            <button class="faq-q">Это настоящее казино?</button>
            <div class="faq-a"><p>Пока нет. Это концепт‑проект и прототип. Мы собираем аудиторию и обратную связь, готовим технологии и документацию.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q">Как доказывается честность?</button>
            <div class="faq-a"><p>Планируем использовать криптографические хэши (commit‑reveal), открытые сиды и публичные логи, доступные для проверки каждым игроком.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q">Когда запуск беты?</button>
            <div class="faq-a"><p>Ведём подготовку. Подпишитесь на рассылку на главной или на странице «Присоединиться», чтобы получить ранний доступ.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q">Будут ли игровые ограничения?</button>
            <div class="faq-a"><p>Мы за ответственную игру. Планируются лимиты, паузы и инструменты самоконтроля.</p></div>
          </div>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html">О проекте</a>
          <a href="faq.html" aria-current="page">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/faq.js"></script>
  </body>
</html>
```

```html
<!-- join.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Присоединиться — CleanCasino</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <div class="bg fx-grid"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html">О проекте</a>
          <a href="index.html#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html" aria-current="page">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="section" style="padding-top: 96px;">
      <div class="container" data-aos="fade-up">
        <div class="badge">Ранний доступ</div>
        <h1 class="gradient-text" style="font-family: Orbitron, sans-serif; margin: 10px 0 6px;">Присоединиться</h1>
        <p class="lead">Подпишитесь и получите приглашение в бета‑тест, новости и бонусы раннего участника.</p>
        <form id="contact-form" class="form" style="margin-top:16px;">
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="form-row">
            <label for="tg">Telegram</label>
            <input type="text" id="tg" name="tg" placeholder="@username" />
          </div>
          <div class="form-row">
            <label><input type="checkbox" id="consent" required /> Согласен получать новости проекта</label>
          </div>
          <button type="submit" class="btn btn-primary">Отправить</button>
          <p class="form-note">Ваши данные остаются у нас. Используем только для оповещений о проекте.</p>
        </form>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent" aria-current="page">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```css
/* assets/css/styles.css */
/*
  CleanCasino — базовые стили, анимации и оформление.
  Стек: Vanilla CSS + AOS для появления при скролле.
*/
:root {
  --bg: #0e0e0e;
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.1);
  --text: #eaeaea;
  --muted: #b8b8b8;
  --gold: #f0b90b;
  --red: #ff3b3b;
  --cyan: #00f7ff;
  --accent: #9b5cff;
  --brand: linear-gradient(90deg, #ffd166 0%, #ff6b6b 50%, #00f7ff 100%);
  --radius: 14px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}
* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}
.container { width: min(1200px, 92%); margin: 0 auto; }

/* Анимированный неоновый фон */
.bg.fx-grid {
  position: fixed; inset: 0; z-index: -2;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(155, 92, 255, 0.25), transparent 60%),
    radial-gradient(800px 400px at 10% 110%, rgba(0, 247, 255, 0.18), transparent 60%),
    #080808;
}
.bg.fx-grid::before {
  content: ''; position: absolute; inset: -200% -200%;
  background-image:
    linear-gradient(rgba(0, 247, 255, 0.15) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 247, 255, 0.15) 2px, transparent 2px);
  background-size: 60px 60px, 60px 60px;
  background-position: 0 0, 0 0;
  filter: drop-shadow(0 0 8px rgba(0, 247, 255, 0.35));
  animation: gridMove 30s linear infinite;
  opacity: .25;
}
@keyframes gridMove {
  0% { transform: translate3d(0, 0, 0) skewX(-10deg) rotateX(50deg); }
  50% { transform: translate3d(80px, -80px, 0) skewX(-10deg) rotateX(50deg); }
  100% { transform: translate3d(0, 0, 0) skewX(-10deg) rotateX(50deg); }
}

/* Навигация */
.site-header {
  position: sticky; top: 0;
  backdrop-filter: saturate(1.2) blur(8px);
  background: rgba(8, 8, 8, 0.6);
  border-bottom: 1px solid var(--border);
  z-index: 50;
}
.nav { display: flex; align-items: center; justify-content: space-between; height: 68px; }
.brand { display: inline-flex; gap: 10px; align-items: center; text-decoration: none; color: var(--text); font-weight: 700; }
.brand .logo { width: 28px; height: 28px; }
.nav-links { display: flex; gap: 22px; align-items: center; }
.nav-links a { color: var(--text); text-decoration: none; font-weight: 600; opacity: .9; }
.nav-links a:hover { opacity: 1; }
.nav-links .btn.sm { padding: 10px 14px; }
.burger { display: none; width: 40px; height: 40px; background: transparent; border: 0; cursor: pointer; }
.burger span { display: block; height: 2px; margin: 7px 0; background: #fff; border-radius: 2px; transition: .3s ease; }

/* Кнопки */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 12px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; transition: .25s ease; border: 1px solid var(--border); }
.btn-primary { color: #101010; background: var(--brand); box-shadow: 0 8px 24px rgba(255, 107, 107, .15), 0 2px 8px rgba(0, 247, 255, .15); }
.btn-primary:hover { transform: translateY(-1px); filter: brightness(1.05); }
.btn-ghost { color: var(--text); background: transparent; }
.btn-ghost:hover { background: rgba(255, 255, 255, .06); }

.badge { display: inline-block; padding: 6px 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.07); border: 1px solid var(--border); color: var(--muted); font-size: 12px; letter-spacing: .02em; }
.badge.gold { background: rgba(240,185,11,.1); border-color: rgba(240,185,11,.35); color: #ffd35e; }
.badge.red { background: rgba(255,59,59,.08); border-color: rgba(255,59,59,.3); color: #ff8a8a; }
.badge.cyan { background: rgba(0,247,255,.08); border-color: rgba(0,247,255,.35); color: #86ffff; }
.badge.neon { background: rgba(155,92,255,.1); border-color: rgba(155,92,255,.35); color: #d3b9ff; }

.gradient-text { background: var(--brand); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 0 12px rgba(155, 92, 255, .25)); }

/* Hero */
.hero { position: relative; padding: 96px 0 40px; }
.hero-inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: center; }
.hero h1 { font-family: 'Orbitron', sans-serif; font-size: clamp(36px, 5.2vw, 68px); line-height: 1.02; margin: 12px 0 10px; }
.hero .subtitle { color: var(--muted); font-size: 18px; max-width: 720px; }
.cta { display: flex; gap: 14px; margin-top: 18px; flex-wrap: wrap; }

.hero-visual { position: relative; min-height: 320px; display: grid; place-items: center; }
.float { position: absolute; filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.6)); opacity: .95; animation: float 6s ease-in-out infinite; }
.float.chip { width: 120px; left: 10%; top: 20%; animation-delay: .2s; }
.float.card { width: 160px; right: 10%; top: 35%; transform: rotate(-8deg); animation-delay: .6s; }
.float.roulette { width: 180px; bottom: -6px; left: 40%; transform: rotate(10deg); animation-delay: .9s; }
@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

/* Секции */
.section { padding: 80px 0; }
.section h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(28px, 3.5vw, 42px); margin: 0 0 14px; }
.lead { color: var(--muted); font-size: 18px; }

.features-inline { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
.tag { display: inline-block; padding: 8px 12px; border-radius: 999px; border: 1px solid var(--border); background: rgba(255,255,255,.03); color: #e5e5e5; font-size: 13px; }

.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); transition: transform .25s ease, box-shadow .25s ease; }
.card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,.55); }
.card .icon { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; background: rgba(255,255,255,.04); border: 1px solid var(--border); margin-bottom: 10px; }
.card .icon img { width: 28px; height: 28px; }
.card h3 { margin: 8px 0 8px; font-size: 18px; }
.card p { color: var(--muted); }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.tile { background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03)); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; position: relative; overflow: hidden; }
.tile::after { content: ''; position: absolute; inset: -60% -60%; background: radial-gradient(600px 200px at 20% 0%, rgba(155,92,255,.12), transparent 50%); transform: rotate(-8deg); }
.tile h4 { margin: 0 0 6px; }
.tile p { margin: 0 0 12px; color: var(--muted); }

/* Формы */
.contact .form { display: grid; gap: 14px; max-width: 560px; }
.form-row { display: grid; gap: 6px; }
.form-row label { font-size: 14px; color: #d6d6d6; }
.form-row input, .form-row textarea {
  padding: 14px 16px;
  background: rgba(255,255,255,.04);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  outline: none;
}
.form-note { color: var(--muted); font-size: 13px; }

/* Футер */
.site-footer { border-top: 1px solid var(--border); margin-top: 40px; padding-top: 28px; background: rgba(8,8,8,.4); backdrop-filter: blur(6px); }
.footer { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.brand.small span { font-size: 16px; }
.footer-links { display: flex; gap: 16px; }
.footer-links a { color: var(--muted); text-decoration: none; }
.footer-links a.accent { color: #fff; font-weight: 700; }
.socials { display: flex; gap: 10px; align-items: center; }
.socials img { width: 18px; height: 18px; opacity: .8; }
.legal { text-align: center; padding: 8px 0 22px; color: var(--muted); }

/* FAQ */
.faq-list { display: grid; gap: 10px; max-width: 760px; }
.faq-item { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.faq-q { width: 100%; text-align: left; padding: 16px 18px; background: transparent; color: #fff; border: none; font-weight: 700; cursor: pointer; }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; padding: 0 18px; color: var(--muted); }
.faq-item.open .faq-a { padding: 0 18px 16px; }

/* Адаптивность */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { order: -1; min-height: 220px; }
  .cards { grid-template-columns: repeat(2, 1fr); }
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .nav-links {
    position: fixed; right: 16px; top: 74px;
    background: rgba(8,8,8,.92); border: 1px solid var(--border);
    border-radius: 14px; padding: 14px; display: none; flex-direction: column;
    gap: 12px; box-shadow: var(--shadow);
  }
  .nav-links.open { display: flex; }
  .burger { display: inline-block; }
  .float.card { width: 130px; }
  .float.roulette { width: 140px; left: 55%; }
  .cards, .grid { grid-template-columns: 1fr; }
}
```

```javascript
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
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email'))?.value || '';
    const tg = /** @type {HTMLInputElement} */(document.getElementById('tg'))?.value || '';
    const consent = /** @type {HTMLInputElement} */(document.getElementById('consent'))?.checked ?? true;

    const leadsRaw = localStorage.getItem('cc_leads') || '[]';
    /** @type {{email: string, tg?: string, consent?: boolean, ts: number}[]} */
    const leads = JSON.parse(leadsRaw);
    leads.push({ email, tg, consent, ts: Date.now() });
    localStorage.setItem('cc_leads', JSON.stringify(leads));

    showToast('Спасибо! Мы на связи.');
    contactForm.reset();
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
```

```javascript
// assets/js/animations.js
// Инициализация AOS (появления при скролле)
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80,
    });
  }
});
```

```javascript
// assets/js/faq.js
// Аккордеон для FAQ
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const header = item.querySelector('.faq-q');
    const content = item.querySelector('.faq-a');
    if (!header || !content) return;
    header.addEventListener('click', () => {
      const expanded = item.classList.toggle('open');
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});
```

```svg
<!-- assets/img/logo.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#FFD166"/>
      <stop offset="0.5" stop-color="#FF6B6B"/>
      <stop offset="1" stop-color="#00F7FF"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="58" fill="#0e0e0e" stroke="url(#g)" stroke-width="6"/>
  <circle cx="64" cy="64" r="44" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="6 8"/>
  <text x="50%" y="54%" text-anchor="middle" fill="#ffffff" font-family="Orbitron,Arial" font-size="28" font-weight="700">CC</text>
</svg>
```

```svg
<!-- assets/img/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="gf" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#FFD166"/>
      <stop offset="1" stop-color="#00F7FF"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="58" fill="#0e0e0e" stroke="url(#gf)" stroke-width="6"/>
  <text x="50%" y="57%" text-anchor="middle" fill="#ffffff" font-family="Orbitron,Arial" font-size="36" font-weight="700">C</text>
</svg>
```

```svg
<!-- assets/img/chip.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <circle cx="80" cy="80" r="74" fill="#111" stroke="#00F7FF" stroke-width="4"/>
  <circle cx="80" cy="80" r="58" fill="none" stroke="#FFD166" stroke-width="4" stroke-dasharray="10 10"/>
  <circle cx="80" cy="80" r="30" fill="#FF6B6B"/>
</svg>
```

```svg
<!-- assets/img/card-ace.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="180" viewBox="0 0 140 180">
  <rect x="8" y="8" width="124" height="164" rx="12" fill="#fafafa"/>
  <rect x="8" y="8" width="124" height="164" rx="12" fill="none" stroke="#111" stroke-width="2"/>
  <text x="20" y="30" font-family="Arial" font-size="20" fill="#e63946">A</text>
  <path d="M70 70 l20 35 h-40z" fill="#111"/>
  <text x="120" y="160" font-family="Arial" font-size="20" fill="#e63946" transform="rotate(180 120,160)">A</text>
</svg>
```

```svg
<!-- assets/img/roulette.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <circle cx="90" cy="90" r="80" fill="#111" stroke="#FFD166" stroke-width="4"/>
  <g transform="translate(90,90)">
    <g fill="#FF6B6B">
      <path d="M0 0 L0 -70 A70 70 0 0 1 24.1 -65.8 Z"/>
      <path d="M0 0 L65.8 -24.1 A70 70 0 0 1 70 0 Z"/>
      <path d="M0 0 L24.1 65.8 A70 70 0 0 1 0 70 Z"/>
      <path d="M0 0 L-65.8 24.1 A70 70 0 0 1 -70 0 Z"/>
      <path d="M0 0 L-24.1 -65.8 A70 70 0 0 1 0 -70 Z"/>
    </g>
    <circle r="10" fill="#00F7FF"/>
  </g>
</svg>
```

```svg
<!-- assets/img/email.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#ffffff" stroke-width="2"/>
  <path d="M3 6l9 7 9-7" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>
```

```svg
<!-- assets/img/telegram.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
  <path d="M21.5 3.5L2.7 11.1c-.9.4-.9 1.6.1 1.9l4.8 1.5 1.9 4.7c.4.9 1.6.9 2 0l2.1-4.6 5.1 3.7c.8.6 1.9.1 2.1-.9l2.4-12.2c.2-1-0.7-1.8-1.7-1.4z" fill="#26A4E3"/>
</svg>
```

```javascript
// assets/js/faq.js (дублируется здесь для удобства)
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const header = item.querySelector('.faq-q');
    const content = item.querySelector('.faq-a');
    if (!header || !content) return;
    header.addEventListener('click', () => {
      const expanded = item.classList.toggle('open');
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});
```

Развёртывание на GitHub Pages:
- Создайте репозиторий и добавьте все файлы из папки `CleanCasino`.
- В настройках репозитория включите Pages: ветка `main`, папка `/root`.
- Откройте `https://<ваш-аккаунт>.github.io/<repo>/index.html`.

Если хотите, могу автоматически сгенерировать папку и файлы через PowerShell в выбранном каталоге — укажите абсолютный путь, например: `C:\Users\<вы>\Desktop\CleanCasino`.

```plaintext
CleanCasino/
  index.html
  about.html
  faq.html
  join.html
  assets/
    css/styles.css
    js/animations.js
    js/main.js
    js/faq.js
    img/logo.svg
    img/chip.svg
    img/card-ace.svg
    img/roulette.svg
    img/email.svg
    img/telegram.svg
    img/favicon.svg
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="CleanCasino — честное, прозрачное и технологичное онлайн‑казино будущего. Присоединяйтесь к комьюнити и первым узнайте о запуске." />
    <title>CleanCasino — честное казино будущего</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <!-- Анимированный фон -->
    <div class="bg fx-grid"></div>

    <!-- Навигация -->
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html">О проекте</a>
          <a href="#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero" id="hero">
      <div class="container hero-inner">
        <div class="hero-copy" data-aos="fade-up" data-aos-delay="50">
          <div class="badge">Концепт • Ранний доступ</div>
          <h1>
            Честное казино будущего
            <span class="gradient-text">CleanCasino</span>
          </h1>
          <p class="subtitle">
            Прозрачные механики, верифицируемая честность и стильная атмосфера Лас‑Вегаса в цифровую эпоху. Мы строим площадку, где доверие — стандарт.
          </p>
          <div class="cta">
            <a class="btn btn-primary" href="join.html">Присоединиться</a>
            <a class="btn btn-ghost" href="#about">Узнать больше</a>
          </div>
        </div>
        <div class="hero-visual" data-aos="zoom-in" data-aos-delay="150">
          <img class="float chip" src="assets/img/chip.svg" alt="Фишка" />
          <img class="float card" src="assets/img/card-ace.svg" alt="Туз" />
          <img class="float roulette" src="assets/img/roulette.svg" alt="Рулетка" />
        </div>
      </div>
    </section>

    <!-- О проекте -->
    <section class="section" id="about">
      <div class="container" data-aos="fade-up">
        <h2>О проекте</h2>
        <p class="lead">
          CleanCasino — визионерский проект финтех‑и гейм‑энтузиастов. Наша миссия — создать онлайн‑казино, где правила прозрачны, а результаты можно проверять. Технологичность, стиль и честность — чтобы вернуть игрокам доверие.
        </p>
        <div class="features-inline">
          <span class="tag">Прозрачность</span>
          <span class="tag">Верифицируемая честность</span>
          <span class="tag">Технологии</span>
          <span class="tag">Атмосфера</span>
        </div>
      </div>
    </section>

    <!-- Как это работает -->
    <section class="section" id="how">
      <div class="container">
        <h2 data-aos="fade-up">Как это работает</h2>
        <div class="cards">
          <article class="card" data-aos="fade-up" data-aos-delay="50">
            <div class="icon"><img src="assets/img/chip.svg" alt="Честность" /></div>
            <h3>Проверяемая честность</h3>
            <p>Каждый раунд — верифицируем: криптографические хэши и открытые сиды позволяют убедиться в результате.</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="icon"><img src="assets/img/card-ace.svg" alt="Прозрачность" /></div>
            <h3>Открытые алгоритмы</h3>
            <p>Ключевые механики документированы и доступны для аудита. Никаких «черных ящиков».</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="150">
            <div class="icon"><img src="assets/img/roulette.svg" alt="Выплаты" /></div>
            <h3>Прозрачные выплаты</h3>
            <p>Статистика банков и RTP публикуется. Вы видите движения средств и формирование выплат.</p>
          </article>
          <article class="card" data-aos="fade-up" data-aos-delay="200">
            <div class="icon"><img src="assets/img/favicon.svg" alt="Комьюнити" /></div>
            <h3>Комьюнити‑подход</h3>
            <p>Собираем обратную связь с ранних этапов и вместе создаем лучшее казино будущего.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Будущие фичи -->
    <section class="section" id="future">
      <div class="container">
        <h2 data-aos="fade-up">Что дальше</h2>
        <div class="grid" data-aos="fade-up" data-aos-delay="100">
          <div class="tile">
            <h4>Бета‑тест площадки</h4>
            <p>Ранний доступ с бонусами для активных тестировщиков.</p>
            <span class="badge neon">Скоро</span>
          </div>
          <div class="tile">
            <h4>Турниры и рейтинг</h4>
            <p>Еженедельные состязания и лидерборды с прозрачными правилами.</p>
            <span class="badge gold">План</span>
          </div>
          <div class="tile">
            <h4>Портфель игр</h4>
            <p>Рулетка, блэкджек, слоты с верифицируемой честностью и понятным RTP.</p>
            <span class="badge red">R&D</span>
          </div>
          <div class="tile">
            <h4>Аудиты и отчеты</h4>
            <p>Публичные проверки механик и публикация данных.</p>
            <span class="badge cyan">Прозрачность</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Контакты -->
    <section class="section" id="contact">
      <div class="container contact" data-aos="fade-up">
        <h2>Связаться с нами</h2>
        <p class="lead">Оставьте почту и Telegram — пришлем новости и приглашение в бета‑доступ.</p>
        <form id="contact-form" class="form">
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="form-row">
            <label for="tg">Telegram</label>
            <input type="text" id="tg" name="tg" placeholder="@username" />
          </div>
          <button type="submit" class="btn btn-primary">Отправить</button>
          <p class="form-note">Нажимая «Отправить», вы соглашаетесь с получением новостей о проекте.</p>
        </form>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект. Азартные игры не предоставляются.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```html
<!-- about.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>О проекте — CleanCasino</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <div class="bg fx-grid"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html" aria-current="page">О проекте</a>
          <a href="index.html#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="section" style="padding-top: 96px;">
      <div class="container" data-aos="fade-up">
        <div class="badge">Кто мы</div>
        <h1 class="gradient-text" style="font-family: Orbitron, sans-serif; margin: 10px 0 6px;">О проекте</h1>
        <p class="lead">Мы создаём площадку нового поколения: честность, верифицируемые результаты и прозрачность по умолчанию.</p>
      </div>
    </section>

    <section class="section">
      <div class="container grid" data-aos="fade-up" data-aos-delay="80">
        <div class="tile">
          <h4>Миссия</h4>
          <p>Вернуть игрокам доверие к индустрии с помощью открытых алгоритмов, криптографических доказательств и прозрачных данных.</p>
        </div>
        <div class="tile">
          <h4>Подход</h4>
          <p>Открытость и совместная разработка с комьюнити. Документация, аудит и постоянная обратная связь.</p>
        </div>
        <div class="tile">
          <h4>Этика</h4>
          <p>Ответственная игра, защита данных и приоритет честности над «хайпом».</p>
        </div>
        <div class="tile">
          <h4>Технологии</h4>
          <p>Криптография для проверки результатов, аналитика для публикации RTP и фондов, автоматика для прозрачных процессов.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" data-aos="fade-up">
        <h2>Команда и комьюнити</h2>
        <p class="lead">Мы маленькая распределённая команда. На этапе концепта подключаем менторов и добровольцев. Хотите помочь — заходите на страницу «Присоединиться».</p>
        <div class="cta" style="margin-top:16px;">
          <a class="btn btn-primary" href="join.html">Стать ранним участником</a>
          <a class="btn btn-ghost" href="index.html#contact">Связаться</a>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html" aria-current="page">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```html
<!-- faq.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FAQ — CleanCasino</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <div class="bg fx-grid"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html">О проекте</a>
          <a href="index.html#how">Как это работает</a>
          <a href="faq.html" aria-current="page">FAQ</a>
          <a class="btn btn-primary sm" href="join.html">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="section" style="padding-top: 96px;">
      <div class="container" data-aos="fade-up">
        <div class="badge">Вопросы и ответы</div>
        <h1 class="gradient-text" style="font-family: Orbitron, sans-serif; margin: 10px 0 6px;">FAQ</h1>
        <p class="lead">Ключевые вопросы о концепте, честности и планах запуска.</p>

        <div class="faq-list" style="margin-top:20px;">
          <div class="faq-item">
            <button class="faq-q">Это настоящее казино?</button>
            <div class="faq-a"><p>Пока нет. Это концепт‑проект и прототип. Мы собираем аудиторию и обратную связь, готовим технологии и документацию.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q">Как доказывается честность?</button>
            <div class="faq-a"><p>Планируем использовать криптографические хэши (commit‑reveal), открытые сиды и публичные логи, доступные для проверки каждым игроком.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q">Когда запуск беты?</button>
            <div class="faq-a"><p>Ведём подготовку. Подпишитесь на рассылку на главной или на странице «Присоединиться», чтобы получить ранний доступ.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-q">Будут ли игровые ограничения?</button>
            <div class="faq-a"><p>Мы за ответственную игру. Планируются лимиты, паузы и инструменты самоконтроля.</p></div>
          </div>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html">О проекте</a>
          <a href="faq.html" aria-current="page">FAQ</a>
          <a href="join.html" class="accent">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/faq.js"></script>
  </body>
</html>
```

```html
<!-- join.html -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Присоединиться — CleanCasino</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
    <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/css/styles.css" />
  </head>
  <body>
    <div class="bg fx-grid"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="nav-links" id="nav-links">
          <a href="about.html">О проекте</a>
          <a href="index.html#how">Как это работает</a>
          <a href="faq.html">FAQ</a>
          <a class="btn btn-primary sm" href="join.html" aria-current="page">Присоединиться</a>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <section class="section" style="padding-top: 96px;">
      <div class="container" data-aos="fade-up">
        <div class="badge">Ранний доступ</div>
        <h1 class="gradient-text" style="font-family: Orbitron, sans-serif; margin: 10px 0 6px;">Присоединиться</h1>
        <p class="lead">Подпишитесь и получите приглашение в бета‑тест, новости и бонусы раннего участника.</p>
        <form id="contact-form" class="form" style="margin-top:16px;">
          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="form-row">
            <label for="tg">Telegram</label>
            <input type="text" id="tg" name="tg" placeholder="@username" />
          </div>
          <div class="form-row">
            <label><input type="checkbox" id="consent" required /> Согласен получать новости проекта</label>
          </div>
          <button type="submit" class="btn btn-primary">Отправить</button>
          <p class="form-note">Ваши данные остаются у нас. Используем только для оповещений о проекте.</p>
        </form>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer">
        <a class="brand small" href="index.html">
          <img src="assets/img/logo.svg" alt="CleanCasino" class="logo" />
          <span>CleanCasino</span>
        </a>
        <nav class="footer-links">
          <a href="about.html">О проекте</a>
          <a href="faq.html">FAQ</a>
          <a href="join.html" class="accent" aria-current="page">Присоединиться</a>
        </nav>
        <div class="socials">
          <img src="assets/img/email.svg" alt="Email" />
          <img src="assets/img/telegram.svg" alt="Telegram" />
        </div>
      </div>
      <div class="container legal">
        <p>© <span id="year"></span> CleanCasino. Концепт‑проект.</p>
      </div>
    </footer>

    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script src="assets/js/animations.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
```

```css
/* assets/css/styles.css */
/*
  CleanCasino — базовые стили, анимации и оформление.
  Стек: Vanilla CSS + AOS для появления при скролле.
*/
:root {
  --bg: #0e0e0e;
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.1);
  --text: #eaeaea;
  --muted: #b8b8b8;
  --gold: #f0b90b;
  --red: #ff3b3b;
  --cyan: #00f7ff;
  --accent: #9b5cff;
  --brand: linear-gradient(90deg, #ffd166 0%, #ff6b6b 50%, #00f7ff 100%);
  --radius: 14px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}
* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}
.container { width: min(1200px, 92%); margin: 0 auto; }

/* Анимированный неоновый фон */
.bg.fx-grid {
  position: fixed; inset: 0; z-index: -2;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(155, 92, 255, 0.25), transparent 60%),
    radial-gradient(800px 400px at 10% 110%, rgba(0, 247, 255, 0.18), transparent 60%),
    #080808;
}
.bg.fx-grid::before {
  content: ''; position: absolute; inset: -200% -200%;
  background-image:
    linear-gradient(rgba(0, 247, 255, 0.15) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 247, 255, 0.15) 2px, transparent 2px);
  background-size: 60px 60px, 60px 60px;
  background-position: 0 0, 0 0;
  filter: drop-shadow(0 0 8px rgba(0, 247, 255, 0.35));
  animation: gridMove 30s linear infinite;
  opacity: .25;
}
@keyframes gridMove {
  0% { transform: translate3d(0, 0, 0) skewX(-10deg) rotateX(50deg); }
  50% { transform: translate3d(80px, -80px, 0) skewX(-10deg) rotateX(50deg); }
  100% { transform: translate3d(0, 0, 0) skewX(-10deg) rotateX(50deg); }
}

/* Навигация */
.site-header {
  position: sticky; top: 0;
  backdrop-filter: saturate(1.2) blur(8px);
  background: rgba(8, 8, 8, 0.6);
  border-bottom: 1px solid var(--border);
  z-index: 50;
}
.nav { display: flex; align-items: center; justify-content: space-between; height: 68px; }
.brand { display: inline-flex; gap: 10px; align-items: center; text-decoration: none; color: var(--text); font-weight: 700; }
.brand .logo { width: 28px; height: 28px; }
.nav-links { display: flex; gap: 22px; align-items: center; }
.nav-links a { color: var(--text); text-decoration: none; font-weight: 600; opacity: .9; }
.nav-links a:hover { opacity: 1; }
.nav-links .btn.sm { padding: 10px 14px; }
.burger { display: none; width: 40px; height: 40px; background: transparent; border: 0; cursor: pointer; }
.burger span { display: block; height: 2px; margin: 7px 0; background: #fff; border-radius: 2px; transition: .3s ease; }

/* Кнопки */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 12px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; transition: .25s ease; border: 1px solid var(--border); }
.btn-primary { color: #101010; background: var(--brand); box-shadow: 0 8px 24px rgba(255, 107, 107, .15), 0 2px 8px rgba(0, 247, 255, .15); }
.btn-primary:hover { transform: translateY(-1px); filter: brightness(1.05); }
.btn-ghost { color: var(--text); background: transparent; }
.btn-ghost:hover { background: rgba(255, 255, 255, .06); }

.badge { display: inline-block; padding: 6px 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.07); border: 1px solid var(--border); color: var(--muted); font-size: 12px; letter-spacing: .02em; }
.badge.gold { background: rgba(240,185,11,.1); border-color: rgba(240,185,11,.35); color: #ffd35e; }
.badge.red { background: rgba(255,59,59,.08); border-color: rgba(255,59,59,.3); color: #ff8a8a; }
.badge.cyan { background: rgba(0,247,255,.08); border-color: rgba(0,247,255,.35); color: #86ffff; }
.badge.neon { background: rgba(155,92,255,.1); border-color: rgba(155,92,255,.35); color: #d3b9ff; }

.gradient-text { background: var(--brand); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 0 12px rgba(155, 92, 255, .25)); }

/* Hero */
.hero { position: relative; padding: 96px 0 40px; }
.hero-inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: center; }
.hero h1 { font-family: 'Orbitron', sans-serif; font-size: clamp(36px, 5.2vw, 68px); line-height: 1.02; margin: 12px 0 10px; }
.hero .subtitle { color: var(--muted); font-size: 18px; max-width: 720px; }
.cta { display: flex; gap: 14px; margin-top: 18px; flex-wrap: wrap; }

.hero-visual { position: relative; min-height: 320px; display: grid; place-items: center; }
.float { position: absolute; filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.6)); opacity: .95; animation: float 6s ease-in-out infinite; }
.float.chip { width: 120px; left: 10%; top: 20%; animation-delay: .2s; }
.float.card { width: 160px; right: 10%; top: 35%; transform: rotate(-8deg); animation-delay: .6s; }
.float.roulette { width: 180px; bottom: -6px; left: 40%; transform: rotate(10deg); animation-delay: .9s; }
@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

/* Секции */
.section { padding: 80px 0; }
.section h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(28px, 3.5vw, 42px); margin: 0 0 14px; }
.lead { color: var(--muted); font-size: 18px; }

.features-inline { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
.tag { display: inline-block; padding: 8px 12px; border-radius: 999px; border: 1px solid var(--border); background: rgba(255,255,255,.03); color: #e5e5e5; font-size: 13px; }

.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); transition: transform .25s ease, box-shadow .25s ease; }
.card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,.55); }
.card .icon { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; background: rgba(255,255,255,.04); border: 1px solid var(--border); margin-bottom: 10px; }
.card .icon img { width: 28px; height: 28px; }
.card h3 { margin: 8px 0 8px; font-size: 18px; }
.card p { color: var(--muted); }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 22px; }
.tile { background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03)); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; position: relative; overflow: hidden; }
.tile::after { content: ''; position: absolute; inset: -60% -60%; background: radial-gradient(600px 200px at 20% 0%, rgba(155,92,255,.12), transparent 50%); transform: rotate(-8deg); }
.tile h4 { margin: 0 0 6px; }
.tile p { margin: 0 0 12px; color: var(--muted); }

/* Формы */
.contact .form { display: grid; gap: 14px; max-width: 560px; }
.form-row { display: grid; gap: 6px; }
.form-row label { font-size: 14px; color: #d6d6d6; }
.form-row input, .form-row textarea {
  padding: 14px 16px;
  background: rgba(255,255,255,.04);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  outline: none;
}
.form-note { color: var(--muted); font-size: 13px; }

/* Футер */
.site-footer { border-top: 1px solid var(--border); margin-top: 40px; padding-top: 28px; background: rgba(8,8,8,.4); backdrop-filter: blur(6px); }
.footer { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.brand.small span { font-size: 16px; }
.footer-links { display: flex; gap: 16px; }
.footer-links a { color: var(--muted); text-decoration: none; }
.footer-links a.accent { color: #fff; font-weight: 700; }
.socials { display: flex; gap: 10px; align-items: center; }
.socials img { width: 18px; height: 18px; opacity: .8; }
.legal { text-align: center; padding: 8px 0 22px; color: var(--muted); }

/* FAQ */
.faq-list { display: grid; gap: 10px; max-width: 760px; }
.faq-item { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.faq-q { width: 100%; text-align: left; padding: 16px 18px; background: transparent; color: #fff; border: none; font-weight: 700; cursor: pointer; }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; padding: 0 18px; color: var(--muted); }
.faq-item.open .faq-a { padding: 0 18px 16px; }

/* Адаптивность */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { order: -1; min-height: 220px; }
  .cards { grid-template-columns: repeat(2, 1fr); }
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .nav-links {
    position: fixed; right: 16px; top: 74px;
    background: rgba(8,8,8,.92); border: 1px solid var(--border);
    border-radius: 14px; padding: 14px; display: none; flex-direction: column;
    gap: 12px; box-shadow: var(--shadow);
  }
  .nav-links.open { display: flex; }
  .burger { display: inline-block; }
  .float.card { width: 130px; }
  .float.roulette { width: 140px; left: 55%; }
  .cards, .grid { grid-template-columns: 1fr; }
}
```

```javascript
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
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(document.getElementById('email'))?.value || '';
    const tg = /** @type {HTMLInputElement} */(document.getElementById('tg'))?.value || '';
    const consent = /** @type {HTMLInputElement} */(document.getElementById('consent'))?.checked ?? true;

    const leadsRaw = localStorage.getItem('cc_leads') || '[]';
    /** @type {{email: string, tg?: string, consent?: boolean, ts: number}[]} */
    const leads = JSON.parse(leadsRaw);
    leads.push({ email, tg, consent, ts: Date.now() });
    localStorage.setItem('cc_leads', JSON.stringify(leads));

    showToast('Спасибо! Мы на связи.');
    contactForm.reset();
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
```

```javascript
// assets/js/animations.js
// Инициализация AOS (появления при скролле)
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80,
    });
  }
});
```

```javascript
// assets/js/faq.js
// Аккордеон для FAQ
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const header = item.querySelector('.faq-q');
    const content = item.querySelector('.faq-a');
    if (!header || !content) return;
    header.addEventListener('click', () => {
      const expanded = item.classList.toggle('open');
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});
```

```plaintext
<!-- assets/img/logo.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#FFD166"/>
      <stop offset="0.5" stop-color="#FF6B6B"/>
      <stop offset="1" stop-color="#00F7FF"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="58" fill="#0e0e0e" stroke="url(#g)" stroke-width="6"/>
  <circle cx="64" cy="64" r="44" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="6 8"/>
  <text x="50%" y="54%" text-anchor="middle" fill="#ffffff" font-family="Orbitron,Arial" font-size="28" font-weight="700">CC</text>
</svg>
```

```plaintext
<!-- assets/img/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="gf" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#FFD166"/>
      <stop offset="1" stop-color="#00F7FF"/>
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="58" fill="#0e0e0e" stroke="url(#gf)" stroke-width="6"/>
  <text x="50%" y="57%" text-anchor="middle" fill="#ffffff" font-family="Orbitron,Arial" font-size="36" font-weight="700">C</text>
</svg>
```

```plaintext
<!-- assets/img/chip.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <circle cx="80" cy="80" r="74" fill="#111" stroke="#00F7FF" stroke-width="4"/>
  <circle cx="80" cy="80" r="58" fill="none" stroke="#FFD166" stroke-width="4" stroke-dasharray="10 10"/>
  <circle cx="80" cy="80" r="30" fill="#FF6B6B"/>
</svg>
```

```plaintext
<!-- assets/img/card-ace.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="180" viewBox="0 0 140 180">
  <rect x="8" y="8" width="124" height="164" rx="12" fill="#fafafa"/>
  <rect x="8" y="8" width="124" height="164" rx="12" fill="none" stroke="#111" stroke-width="2"/>
  <text x="20" y="30" font-family="Arial" font-size="20" fill="#e63946">A</text>
  <path d="M70 70 l20 35 h-40z" fill="#111"/>
  <text x="120" y="160" font-family="Arial" font-size="20" fill="#e63946" transform="rotate(180 120,160)">A</text>
</svg>
```

```plaintext
<!-- assets/img/roulette.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <circle cx="90" cy="90" r="80" fill="#111" stroke="#FFD166" stroke-width="4"/>
  <g transform="translate(90,90)">
    <g fill="#FF6B6B">
      <path d="M0 0 L0 -70 A70 70 0 0 1 24.1 -65.8 Z"/>
      <path d="M0 0 L65.8 -24.1 A70 70 0 0 1 70 0 Z"/>
      <path d="M0 0 L24.1 65.8 A70 70 0 0 1 0 70 Z"/>
      <path d="M0 0 L-65.8 24.1 A70 70 0 0 1 -70 0 Z"/>
      <path d="M0 0 L-24.1 -65.8 A70 70 0 0 1 0 -70 Z"/>
    </g>
    <circle r="10" fill="#00F7FF"/>
  </g>
</svg>
```

```plaintext
<!-- assets/img/email.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#ffffff" stroke-width="2"/>
  <path d="M3 6l9 7 9-7" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>
```

```plaintext
<!-- assets/img/telegram.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
  <path d="M21.5 3.5L2.7 11.1c-.9.4-.9 1.6.1 1.9l4.8 1.5 1.9 4.7c.4.9 1.6.9 2 0l2.1-4.6 5.1 3.7c.8.6 1.9.1 2.1-.9l2.4-12.2c.2-1-0.7-1.8-1.7-1.4z" fill="#26A4E3"/>
</svg>
```

```javascript
// assets/js/faq.js (дублируется здесь для удобства)
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const header = item.querySelector('.faq-q');
    const content = item.querySelector('.faq-a');
    if (!header || !content) return;
    header.addEventListener('click', () => {
      const expanded = item.classList.toggle('open');
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
});
```

