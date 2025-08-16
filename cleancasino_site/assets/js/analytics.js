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
    this.queueKey = 'cc_analytics_queue';
    this.queueFlushIntervalMs = 10000;
    this.supabaseUrl = (window.CC_SUPABASE_URL || localStorage.getItem('CC_SUPABASE_URL') || '').replace(/\/$/, '');
    this.supabaseAnonKey = window.CC_SUPABASE_ANON_KEY || localStorage.getItem('CC_SUPABASE_ANON_KEY') || '';
    this.directSupabaseEnabled = !!(this.supabaseUrl && this.supabaseAnonKey);
    
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

    // Периодический флеш очереди и попытка немедленной отправки
    setInterval(() => this.flushQueue(), this.queueFlushIntervalMs);
    this.flushQueue();
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
      // Сохраняем событие в локальную очередь для повторной отправки
      try {
        const raw = localStorage.getItem(this.queueKey) || '[]';
        const queue = JSON.parse(raw);
        queue.push({ endpoint, data, ts: Date.now() });
        localStorage.setItem(this.queueKey, JSON.stringify(queue));
      } catch (_) {}
      return { success: false, error: error.message };
    }
  }

  // Фоновая отправка очереди из localStorage
  async flushQueue() {
    try {
      const raw = localStorage.getItem(this.queueKey) || '[]';
      const queue = JSON.parse(raw);
      if (!Array.isArray(queue) || queue.length === 0) return;
      const remaining = [];
      for (const item of queue) {
        let delivered = false;
        // Попытка отправки напрямую в Supabase REST, если настроено
        if (this.directSupabaseEnabled) {
          try {
            const mapped = this.mapEndpointToSupabase(item.endpoint, item.data);
            if (mapped) {
              const ok = await this.sendToSupabase(mapped.table, mapped.payload);
              delivered = ok;
            }
          } catch (_) {}
        }
        // Фоллбек: отправка через наш API
        if (!delivered) {
          try {
            const res = await fetch(this.apiBase + item.endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(item.data)
            });
            delivered = res.ok;
          } catch (_) {}
        }
        if (!delivered) remaining.push(item);
      }
      localStorage.setItem(this.queueKey, JSON.stringify(remaining));
    } catch (_) {}
  }

  // Отправка строки в таблицу Supabase REST
  async sendToSupabase(table, payload) {
    try {
      const res = await fetch(`${this.supabaseUrl}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.supabaseAnonKey,
          'Authorization': `Bearer ${this.supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (_) {
      return false;
    }
  }

  // Маппинг эндпоинтов в таблицы Supabase
  mapEndpointToSupabase(endpoint, data) {
    const ua = navigator.userAgent || '';
    const ref = document.referrer || null;
    const page = this.getCurrentPage();
    if (endpoint === '/pageview') {
      return { table: 'page_views', payload: { page: data.page || page, session_id: this.sessionId, ip_address: null, user_agent: ua, referrer: ref } };
    }
    if (endpoint === '/button-click') {
      return { table: 'events', payload: { event_type: 'button_click', event_data: { buttonId: data.buttonId, buttonText: data.buttonText, page: data.page || page, timestamp: new Date().toISOString() }, session_id: this.sessionId, page: data.page || page, ip_address: null, user_agent: ua } };
    }
    if (endpoint === '/form-submission') {
      return { table: 'events', payload: { event_type: 'form_submission', event_data: { formId: data.formId, formData: data.formData, timestamp: new Date().toISOString() }, session_id: this.sessionId, page, ip_address: null, user_agent: ua } };
    }
    if (endpoint === '/scroll') {
      return { table: 'events', payload: { event_type: 'scroll', event_data: { scrollDepth: data.scrollDepth, page: data.page || page, timestamp: new Date().toISOString() }, session_id: this.sessionId, page: data.page || page, ip_address: null, user_agent: ua } };
    }
    if (endpoint === '/time-on-page') {
      return { table: 'events', payload: { event_type: 'time_on_page', event_data: { timeSpent: data.timeSpent, page: data.page || page, timestamp: new Date().toISOString() }, session_id: this.sessionId, page: data.page || page, ip_address: null, user_agent: ua } };
    }
    if (endpoint === '/event') {
      const eventType = data.eventType || 'custom';
      const eventData = data.eventData || {};
      return { table: 'events', payload: { event_type: eventType, event_data: eventData, session_id: this.sessionId, page: eventData.page || page, ip_address: null, user_agent: ua } };
    }
    return null;
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
    const sendTime = () => {
      const timeSpent = Date.now() - this.pageStartTime;
      const page = this.getCurrentPage();
      const payload = { timeSpent, page };
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(this.apiBase + '/time-on-page', blob);
      } else {
        this.sendData('/time-on-page', payload);
      }
      console.log('⏱️ Время на странице:', Math.round(timeSpent / 1000) + 'с');
    };

    // Периодическая отправка каждые 15 секунд, чтобы не терять данные
    this.timeInterval = setInterval(() => {
      sendTime();
    }, 15000);

    // Отправка при скрытии страницы (уйти в фон)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        sendTime();
      }
    });

    // Финальная отправка при закрытии/перезагрузке
    window.addEventListener('beforeunload', () => {
      try { clearInterval(this.timeInterval); } catch (_) {}
      sendTime();
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
