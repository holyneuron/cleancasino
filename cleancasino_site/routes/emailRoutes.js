const express = require('express');
const router = express.Router();
// Email отправка отключена по требованиям: сохраняем только в БД и показываем в админке
// const emailService = require('../services/emailService');
const dbService = require('../services/dbProvider');

// Middleware для валидации email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Middleware для получения IP адреса
const getClientIP = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         'unknown';
};

// POST /api/email/subscribe - Подписка на рассылку
router.post('/subscribe', async (req, res) => {
  try {
    const { email, telegram, consent = true } = req.body;

    // Валидация входных данных
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный email адрес'
      });
    }

    // Email отключен: не проверяем конфигурацию и не отправляем письма

    const ipAddress = getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Сохраняем подписчика в базу данных
    const subscriber = await dbService.addSubscriber(
      email, 
      telegram, 
      consent, 
      ipAddress, 
      userAgent
    );

    // Email отправка отключена

    res.json({
      success: true,
      message: 'Успешно подписались на рассылку!',
      data: {
        email: subscriber.email,
        telegram: subscriber.telegram,
        consent: subscriber.consent
      }
    });

  } catch (error) {
    console.error('Ошибка подписки:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// GET /api/email/subscribers - Получение списка подписчиков (для админа)
router.get('/subscribers', async (req, res) => {
  try {
    // Здесь можно добавить проверку авторизации
    const subscribers = await dbService.getSubscribers();
    
    res.json({
      success: true,
      data: subscribers,
      count: subscribers.length
    });
  } catch (error) {
    console.error('Ошибка получения подписчиков:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/email/unsubscribe - Отписка от рассылки
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный email адрес'
      });
    }

    // Здесь можно добавить логику отписки
    // Например, обновить поле consent в базе данных

    res.json({
      success: true,
      message: 'Успешно отписались от рассылки'
    });

  } catch (error) {
    console.error('Ошибка отписки:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/email/send-report - Отправка отчета по статистике
router.post('/send-report', async (req, res) => {
  try {
    // Получаем статистику
    const analytics = await dbService.getAnalytics();
    
    // Email отключен: просто возвращаем данные, не отправляя письмо
    res.json({
      success: true,
      message: 'Email отчеты отключены. Данные отчета возвращены в ответе.',
      data: analytics
    });

  } catch (error) {
    console.error('Ошибка отправки отчета:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// GET /api/email/status - Проверка статуса email сервиса
router.get('/status', (req, res) => {
  const isConfigured = emailService.checkConfig();
  
  res.json({
    success: true,
    data: {
      configured: isConfigured,
      host: process.env.EMAIL_HOST,
      user: process.env.EMAIL_USER ? '***' + process.env.EMAIL_USER.slice(-4) : null
    }
  });
});

module.exports = router;
