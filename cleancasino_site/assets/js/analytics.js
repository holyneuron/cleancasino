// CleanCasino Analytics - Фронтенд трекинг
class CleanCasinoAnalytics {
  constructor() {
    // Если сайт на GitHub Pages, укажите адрес внешнего API-бэкенда
    const defaultApi = '/api/analytics';
    const externalApi = window.CC_API_BASE || localStorage.getItem('CC_API_BASE');
    this.apiBase = externalApi ? (externalApi.replace(/\/$/, '') + '/api/analytics') : defaultApi;
    this.sessionId = this.getSessionId();
    this.pageStartTime = Date.now();
    this.scrollDepth = 0;
    this.maxScrollDepth = 0;
    this.isTracking = true;
    
    this.init();
  }

  // Инициализация аналитики
  init() {
    if (!this.isTracking) return;

    // Отслеживаем загрузку страницы
    this.trackPageView();
    
    // Отслеживаем клики по кнопкам
    this.trackButtonClicks();
    
    // Отслеживаем отправку форм
    this.trackFormSubmissions();
    
    // Отслеживаем скролл
    this.trackScroll();
    
    // Отслеживаем время на странице при уходе
    this.trackTimeOnPage();
    
    // Отслеживаем видимость страницы
    this.trackPageVisibility();
  }

  // Получение или создание sessionId
  getSessionId() {
    let sessionId = localStorage.getItem('cc_session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('cc_session_id', sessionId);
    }
    return sessionId;
  }

  // Генерация уникального ID
  generateSessionId() {
    return 'cc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Получение текущей страницы
  getCurrentPage() {
    return window.location.pathname || '/';
  }

  // Отправка данных на сервер
  async sendData(endpoint, data) {
    try {
      const response = await fetch(this.apiBase + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка отправки аналитики:', error);
      return { success: false, error: error.message };
    }
  }

  // Отслеживание просмотра страницы
  async trackPageView() {
    const page = this.getCurrentPage();
    const result = await this.sendData('/pageview', { page });
    
    if (result.success) {
      console.log('📊 Страница отслежена:', page);
    }
  }

  // Отслеживание кликов по кнопкам
  trackButtonClicks() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      
      // Проверяем, является ли элемент кнопкой или ссылкой
      if (target.matches('button, .btn, a[href], input[type="submit"]')) {
        const buttonId = target.id || target.className || target.tagName;
        const buttonText = target.textContent?.trim() || target.value || '';
        const page = this.getCurrentPage();
        
        this.sendData('/button-click', {
          buttonId,
          buttonText,
          page
        });
        
        console.log('🎯 Клик отслежен:', buttonId, buttonText);
      }
    });
  }

  // Отслеживание отправки форм
  trackFormSubmissions() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      const formId = form.id || form.className || 'unknown_form';
      
      // Собираем данные формы (без паролей)
      const formData = {};
      const formElements = form.elements;
      
      for (let element of formElements) {
        if (element.name && element.type !== 'password') {
          formData[element.name] = element.value;
        }
      }
      
      this.sendData('/form-submission', {
        formId,
        formData
      });
      
      console.log('📝 Форма отслежена:', formId);
    });
  }

  // Отслеживание скролла
  trackScroll() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
        
        // Отправляем только если скролл увеличился
        if (scrollDepth > this.maxScrollDepth) {
          this.maxScrollDepth = scrollDepth;
          
          this.sendData('/scroll', {
            scrollDepth,
            page: this.getCurrentPage()
          });
          
          console.log('📜 Скролл отслежен:', scrollDepth + '%');
        }
      }, 100);
    });
  }

  // Отслеживание времени на странице
  trackTimeOnPage() {
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - this.pageStartTime;
      const page = this.getCurrentPage();
      
      // Используем sendBeacon для надежной отправки при закрытии страницы
      if (navigator.sendBeacon) {
        const data = JSON.stringify({
          timeSpent,
          page
        });
        
        navigator.sendBeacon(this.apiBase + '/time-on-page', data);
      } else {
        // Fallback для старых браузеров
        this.sendData('/time-on-page', {
          timeSpent,
          page
        });
      }
      
      console.log('⏱️ Время на странице:', Math.round(timeSpent / 1000) + 'с');
    });
  }

  // Отслеживание видимости страницы
  trackPageVisibility() {
    let hiddenTime = 0;
    let isHidden = false;
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isHidden = true;
        hiddenTime = Date.now();
      } else {
        if (isHidden) {
          const timeHidden = Date.now() - hiddenTime;
          console.log('👁️ Страница была скрыта:', Math.round(timeHidden / 1000) + 'с');
          isHidden = false;
        }
      }
    });
  }

  // Отслеживание кастомного события
  async trackCustomEvent(eventType, eventData = {}) {
    const result = await this.sendData('/event', {
      eventType,
      eventData: {
        ...eventData,
        page: this.getCurrentPage(),
        timestamp: new Date().toISOString()
      }
    });
    
    if (result.success) {
      console.log('🎯 Кастомное событие отслежено:', eventType);
    }
    
    return result;
  }

  // Отслеживание конверсии (подписки)
  async trackConversion(email, telegram = null) {
    return this.trackCustomEvent('conversion', {
      type: 'subscription',
      email,
      telegram
    });
  }

  // Отслеживание взаимодействия с элементами
  trackElementInteraction(selector, eventType = 'click') {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.addEventListener(eventType, () => {
        this.trackCustomEvent('element_interaction', {
          selector,
          eventType,
          elementText: element.textContent?.trim() || '',
          elementId: element.id || '',
          elementClass: element.className || ''
        });
      });
    });
  }

  // Получение статистики (для админа)
  async getStats() {
    try {
      const response = await fetch(this.apiBase + '/stats');
      return await response.json();
    } catch (error) {
      console.error('Ошибка получения статистики:', error);
      return { success: false, error: error.message };
    }
  }

  // Включение/выключение трекинга
  setTracking(enabled) {
    this.isTracking = enabled;
    console.log('📊 Трекинг:', enabled ? 'включен' : 'выключен');
  }

  // Очистка данных сессии
  clearSession() {
    localStorage.removeItem('cc_session_id');
    this.sessionId = this.getSessionId();
    console.log('🔄 Сессия очищена');
  }
}

// Инициализация аналитики при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  window.ccAnalytics = new CleanCasinoAnalytics();
  
  // Глобальные функции для использования в других скриптах
  window.trackEvent = (eventType, eventData) => {
    if (window.ccAnalytics) {
      return window.ccAnalytics.trackCustomEvent(eventType, eventData);
    }
  };
  
  window.trackConversion = (email, telegram) => {
    if (window.ccAnalytics) {
      return window.ccAnalytics.trackConversion(email, telegram);
    }
  };
});

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CleanCasinoAnalytics;
}
