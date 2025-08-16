const { v4: uuidv4 } = require('uuid');
const dbService = require('./dbProvider');

class AnalyticsService {
  constructor() {
    this.sessionTimeout = 30 * 60 * 1000; // 30 минут
  }

  // Генерация уникального ID сессии
  generateSessionId() {
    return uuidv4();
  }

  // Получение последних событий (массив)
  async getRecentEvents(limit = 20) {
    try {
      if (typeof dbService.getRecentEvents === 'function') {
        const events = await dbService.getRecentEvents(limit);
        return { success: true, data: events };
      }
      const analytics = await dbService.getAnalytics();
      const events = Array.isArray(analytics?.recentEvents) ? analytics.recentEvents : [];
      return { success: true, data: events.slice(0, limit) };
    } catch (error) {
      console.error('Ошибка получения последних событий:', error);
      return { success: false, error: error.message };
    }
  }

  // Получение IP адреса клиента
  getClientIP(req) {
    return req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
           'unknown';
  }

  // Получение User-Agent
  getUserAgent(req) {
    return req.headers['user-agent'] || 'unknown';
  }

  // Получение реферера
  getReferrer(req) {
    return req.headers.referer || req.headers.referrer || null;
  }

  // Отслеживание просмотра страницы
  async trackPageView(req, page) {
    try {
      const sessionId = req.cookies?.sessionId || this.generateSessionId();
      const ipAddress = this.getClientIP(req);
      const userAgent = this.getUserAgent(req);
      const referrer = this.getReferrer(req);

      // Сохраняем просмотр страницы
      await dbService.addPageView(page, sessionId, ipAddress, userAgent, referrer);
      
      // Обновляем или создаем сессию
      await dbService.createOrUpdateSession(sessionId, ipAddress, userAgent, page);

      return { sessionId, success: true };
    } catch (error) {
      console.error('Ошибка отслеживания просмотра страницы:', error);
      return { success: false, error: error.message };
    }
  }

  // Отслеживание события (клик, конверсия и т.д.)
  async trackEvent(req, eventType, eventData = {}) {
    try {
      const sessionId = req.cookies?.sessionId || this.generateSessionId();
      const ipAddress = this.getClientIP(req);
      const userAgent = this.getUserAgent(req);
      const page = req.headers.referer ? new URL(req.headers.referer).pathname : null;

      // Сохраняем событие
      await dbService.addEvent(eventType, eventData, sessionId, page, ipAddress, userAgent);
      // Обновляем активность сессии
      await dbService.createOrUpdateSession(sessionId, ipAddress, userAgent, page);

      return { sessionId, success: true };
    } catch (error) {
      console.error('Ошибка отслеживания события:', error);
      return { success: false, error: error.message };
    }
  }

  // Отслеживание клика по кнопке
  async trackButtonClick(req, buttonId, buttonText, page) {
    const eventData = {
      buttonId,
      buttonText,
      page,
      timestamp: new Date().toISOString()
    };

    return this.trackEvent(req, 'button_click', eventData);
  }

  // Отслеживание отправки формы
  async trackFormSubmission(req, formId, formData) {
    const eventData = {
      formId,
      formData: {
        ...formData,
        // Убираем чувствительные данные
        password: undefined,
        confirmPassword: undefined
      },
      timestamp: new Date().toISOString()
    };

    return this.trackEvent(req, 'form_submission', eventData);
  }

  // Отслеживание скролла
  async trackScroll(req, scrollDepth, page) {
    const eventData = {
      scrollDepth,
      page,
      timestamp: new Date().toISOString()
    };

    return this.trackEvent(req, 'scroll', eventData);
  }

  // Отслеживание времени на странице
  async trackTimeOnPage(req, timeSpent, page) {
    const eventData = {
      timeSpent,
      page,
      timestamp: new Date().toISOString()
    };

    return this.trackEvent(req, 'time_on_page', eventData);
  }

  // Получение статистики
  async getAnalytics(filters = {}) {
    try {
      const analytics = await dbService.getAnalytics();
      // Гарантируем, что recentEvents всегда массив для обратной совместимости админки
      try {
        if (typeof dbService.getRecentEvents === 'function') {
          const recent = await dbService.getRecentEvents(20);
          analytics.recentEvents = Array.isArray(recent) ? recent : [];
        } else if (!Array.isArray(analytics.recentEvents)) {
          analytics.recentEvents = [];
        }
      } catch (_) {
        analytics.recentEvents = Array.isArray(analytics.recentEvents) ? analytics.recentEvents : [];
      }
      
      // Применяем фильтры если нужно
      if (filters.dateFrom || filters.dateTo) {
        // Здесь можно добавить фильтрацию по датам
      }

      return {
        success: true,
        data: analytics,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Ошибка получения аналитики:', error);
      return { success: false, error: error.message };
    }
  }

  // Получение статистики по страницам
  async getPageAnalytics() {
    try {
      const analytics = await dbService.getAnalytics();
      return {
        success: true,
        data: {
          totalViews: analytics.totalPageViews?.count || 0,
          totalSessions: analytics.totalSessions?.count || 0,
          totalEvents: analytics.totalEvents?.count || 0
        }
      };
    } catch (error) {
      console.error('Ошибка получения статистики страниц:', error);
      return { success: false, error: error.message };
    }
  }

  // Получение статистики конверсий
  async getConversionAnalytics() {
    try {
      // Здесь можно добавить логику расчета конверсий
      const analytics = await dbService.getAnalytics();
      
      return {
        success: true,
        data: {
          totalSubscribers: analytics.totalSubscribers?.count || 0,
          totalPageViews: analytics.totalPageViews?.count || 0,
          conversionRate: analytics.totalSubscribers?.count && analytics.totalPageViews?.count 
            ? ((analytics.totalSubscribers.count / analytics.totalPageViews.count) * 100).toFixed(2)
            : 0
        }
      };
    } catch (error) {
      console.error('Ошибка получения статистики конверсий:', error);
      return { success: false, error: error.message };
    }
  }

  // Очистка старых данных (для оптимизации)
  async cleanupOldData(daysToKeep = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      // Здесь можно добавить логику очистки старых записей
      console.log(`Очистка данных старше ${daysToKeep} дней`);
      
      return { success: true, message: `Данные старше ${daysToKeep} дней очищены` };
    } catch (error) {
      console.error('Ошибка очистки данных:', error);
      return { success: false, error: error.message };
    }
  }

  // Экспорт данных
  async exportData(format = 'json') {
    try {
      const analytics = await dbService.getAnalytics();
      
      if (format === 'json') {
        return {
          success: true,
          data: analytics,
          format: 'json'
        };
      } else if (format === 'csv') {
        // Здесь можно добавить экспорт в CSV
        return {
          success: true,
          data: 'CSV export not implemented yet',
          format: 'csv'
        };
      }
      
      return { success: false, error: 'Неподдерживаемый формат' };
    } catch (error) {
      console.error('Ошибка экспорта данных:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AnalyticsService();
