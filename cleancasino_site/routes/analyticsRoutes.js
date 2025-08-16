const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');

// POST /api/analytics/pageview - Отслеживание просмотра страницы
router.post('/pageview', async (req, res) => {
  try {
    const { page } = req.body;
    
    if (!page) {
      return res.status(400).json({
        success: false,
        error: 'Не указана страница'
      });
    }

    const result = await analyticsService.trackPageView(req, page);
    
    if (result.success) {
      // Устанавливаем cookie с sessionId
      res.cookie('sessionId', result.sessionId, {
        maxAge: 30 * 60 * 1000, // 30 минут
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Ошибка отслеживания просмотра страницы:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/analytics/event - Отслеживание события
router.post('/event', async (req, res) => {
  try {
    const { eventType, eventData } = req.body;
    
    if (!eventType) {
      return res.status(400).json({
        success: false,
        error: 'Не указан тип события'
      });
    }

    const result = await analyticsService.trackEvent(req, eventType, eventData);
    res.json(result);
  } catch (error) {
    console.error('Ошибка отслеживания события:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/analytics/button-click - Отслеживание клика по кнопке
router.post('/button-click', async (req, res) => {
  try {
    const { buttonId, buttonText, page } = req.body;
    
    if (!buttonId) {
      return res.status(400).json({
        success: false,
        error: 'Не указан ID кнопки'
      });
    }

    const result = await analyticsService.trackButtonClick(req, buttonId, buttonText, page);
    res.json(result);
  } catch (error) {
    console.error('Ошибка отслеживания клика по кнопке:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/analytics/form-submission - Отслеживание отправки формы
router.post('/form-submission', async (req, res) => {
  try {
    const { formId, formData } = req.body;
    
    if (!formId) {
      return res.status(400).json({
        success: false,
        error: 'Не указан ID формы'
      });
    }

    const result = await analyticsService.trackFormSubmission(req, formId, formData);
    res.json(result);
  } catch (error) {
    console.error('Ошибка отслеживания отправки формы:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/analytics/scroll - Отслеживание скролла
router.post('/scroll', async (req, res) => {
  try {
    const { scrollDepth, page } = req.body;
    
    if (scrollDepth === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Не указана глубина скролла'
      });
    }

    const result = await analyticsService.trackScroll(req, scrollDepth, page);
    res.json(result);
  } catch (error) {
    console.error('Ошибка отслеживания скролла:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/analytics/time-on-page - Отслеживание времени на странице
router.post('/time-on-page', async (req, res) => {
  try {
    const { timeSpent, page } = req.body;
    
    if (!timeSpent) {
      return res.status(400).json({
        success: false,
        error: 'Не указано время на странице'
      });
    }

    const result = await analyticsService.trackTimeOnPage(req, timeSpent, page);
    res.json(result);
  } catch (error) {
    console.error('Ошибка отслеживания времени на странице:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// GET /api/analytics/stats - Получение общей статистики
router.get('/stats', async (req, res) => {
  try {
    const result = await analyticsService.getAnalytics(req.query);
    res.json(result);
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// GET /api/analytics/page-stats - Получение статистики по страницам
router.get('/page-stats', async (req, res) => {
  try {
    const result = await analyticsService.getPageAnalytics();
    res.json(result);
  } catch (error) {
    console.error('Ошибка получения статистики страниц:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// GET /api/analytics/conversion-stats - Получение статистики конверсий
router.get('/conversion-stats', async (req, res) => {
  try {
    const result = await analyticsService.getConversionAnalytics();
    res.json(result);
  } catch (error) {
    console.error('Ошибка получения статистики конверсий:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// POST /api/analytics/cleanup - Очистка старых данных
router.post('/cleanup', async (req, res) => {
  try {
    const { daysToKeep = 90 } = req.body;
    const result = await analyticsService.cleanupOldData(daysToKeep);
    res.json(result);
  } catch (error) {
    console.error('Ошибка очистки данных:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

// GET /api/analytics/export - Экспорт данных
router.get('/export', async (req, res) => {
  try {
    const { format = 'json' } = req.query;
    const result = await analyticsService.exportData(format);
    
    if (result.success) {
      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
      } else if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=analytics.csv');
      }
    }
    
    res.json(result);
  } catch (error) {
    console.error('Ошибка экспорта данных:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
});

module.exports = router;
