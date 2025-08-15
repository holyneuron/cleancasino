const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config.env' });

// Импорт модулей
// Email сервис отключен (не отправляем письма)
const analyticsService = require('./services/analyticsService');
const dbService = require('./services/dbService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware безопасности
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://unpkg.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 минут
  max: process.env.RATE_LIMIT_MAX || 100, // максимум 100 запросов
  message: {
    error: 'Слишком много запросов. Попробуйте позже.',
    retryAfter: Math.ceil((process.env.RATE_LIMIT_WINDOW || 15) * 60 / 60)
  }
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Парсинг JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Инициализация базы данных
dbService.initDatabase();

// Маршруты API
app.use('/api/email', require('./routes/emailRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Админ панель
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Что-то пошло не так'
  });
});

// 404 обработчик
app.use((req, res) => {
  res.status(404).json({ error: 'Страница не найдена' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер CleanCasino запущен на порту ${PORT}`);
  console.log(`📊 Аналитика: http://localhost:${PORT}/api/analytics`);
});

module.exports = app;
