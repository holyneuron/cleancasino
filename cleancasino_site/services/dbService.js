const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class DatabaseService {
  constructor() {
    this.dbPath = process.env.DB_PATH || './data/cleancasino.db';
    this.db = null;
  }

  // Инициализация базы данных
  initDatabase() {
    // Создаем папку data если её нет
    const dataDir = path.dirname(this.dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('Ошибка подключения к базе данных:', err);
      } else {
        console.log('✅ База данных подключена');
        this.createTables();
      }
    });
  }

  // Создание таблиц
  createTables() {
    const queries = [
      // Таблица для email подписчиков
      `CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        telegram TEXT,
        consent BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT
      )`,

      // Таблица для аналитики посещений
      `CREATE TABLE IF NOT EXISTS page_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page TEXT NOT NULL,
        session_id TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        referrer TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Таблица для событий (клики, конверсии)
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        event_data TEXT,
        session_id TEXT NOT NULL,
        page TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Таблица для сессий
      `CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        first_page TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    queries.forEach((query, index) => {
      this.db.run(query, (err) => {
        if (err) {
          console.error(`Ошибка создания таблицы ${index + 1}:`, err);
        } else {
          console.log(`✅ Таблица ${index + 1} создана/проверена`);
        }
      });
    });
  }

  // Добавление подписчика
  addSubscriber(email, telegram = null, consent = true, ipAddress = null, userAgent = null) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT OR REPLACE INTO subscribers (email, telegram, consent, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      this.db.run(query, [email, telegram, consent ? 1 : 0, ipAddress, userAgent], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, email, telegram, consent });
        }
      });
    });
  }

  // Получение всех подписчиков
  getSubscribers() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM subscribers ORDER BY created_at DESC';
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Добавление просмотра страницы
  addPageView(page, sessionId, ipAddress = null, userAgent = null, referrer = null) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO page_views (page, session_id, ip_address, user_agent, referrer)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      this.db.run(query, [page, sessionId, ipAddress, userAgent, referrer], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, page, sessionId });
        }
      });
    });
  }

  // Добавление события
  addEvent(eventType, eventData, sessionId, page = null, ipAddress = null, userAgent = null) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO events (event_type, event_data, session_id, page, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      this.db.run(query, [eventType, JSON.stringify(eventData), sessionId, page, ipAddress, userAgent], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, eventType, sessionId });
        }
      });
    });
  }

  // Создание или обновление сессии
  createOrUpdateSession(sessionId, ipAddress = null, userAgent = null, page = null) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT OR REPLACE INTO sessions (session_id, ip_address, user_agent, first_page, last_activity)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      
      this.db.run(query, [sessionId, ipAddress, userAgent, page], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ sessionId, ipAddress, userAgent });
        }
      });
    });
  }

  // Получение статистики
  getAnalytics() {
    return new Promise((resolve, reject) => {
      const queries = {
        totalSubscribers: 'SELECT COUNT(*) as count FROM subscribers',
        totalPageViews: 'SELECT COUNT(*) as count FROM page_views',
        totalEvents: 'SELECT COUNT(*) as count FROM events',
        totalSessions: 'SELECT COUNT(*) as count FROM sessions',
        pageViewsByPage: `
          SELECT page, COUNT(*) as count 
          FROM page_views 
          GROUP BY page 
          ORDER BY count DESC
        `,
        eventsByType: `
          SELECT event_type, COUNT(*) as count 
          FROM events 
          GROUP BY event_type 
          ORDER BY count DESC
        `,
        eventsByPage: `
          SELECT page, COUNT(*) as count
          FROM events
          WHERE page IS NOT NULL
          GROUP BY page
          ORDER BY count DESC
        `,
        recentSubscribers: `
          SELECT email, telegram, created_at 
          FROM subscribers 
          ORDER BY created_at DESC 
          LIMIT 10
        `,
        recentEvents: `
          SELECT event_type, event_data, page, created_at 
          FROM events 
          ORDER BY created_at DESC 
          LIMIT 20
        `,
        recentSessions: `
          SELECT session_id, first_page, started_at, last_activity
          FROM sessions
          ORDER BY last_activity DESC
          LIMIT 20
        `,
        timeOnPageEvents: `
          SELECT page, event_data, created_at
          FROM events
          WHERE event_type = 'time_on_page'
          ORDER BY created_at DESC
          LIMIT 1000
        `
      };
      
      const results = {};
      const arrayKeys = new Set(['pageViewsByPage', 'eventsByType', 'eventsByPage', 'recentSubscribers', 'recentEvents', 'recentSessions', 'timeOnPageEvents']);
      const entries = Object.entries(queries);
      let remaining = entries.length;

      entries.forEach(([key, sql]) => {
        const isArray = arrayKeys.has(key);
        const handler = (err, data) => {
          if (err) {
            console.error(`Ошибка запроса ${key}:`, err);
          } else {
            results[key] = data || (isArray ? [] : { count: 0 });
          }
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        };

        if (isArray) {
          this.db.all(sql, [], handler);
        } else {
          this.db.get(sql, [], handler);
        }
      });
    });
  }

  // Получение последних событий отдельным методом (используется админкой)
  getRecentEvents(limit = 20) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT event_type, event_data, page, created_at
        FROM events
        ORDER BY created_at DESC
        LIMIT ?
      `;
      this.db.all(query, [limit], (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    });
  }

  // Закрытие соединения с базой данных
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Ошибка закрытия базы данных:', err);
        } else {
          console.log('База данных закрыта');
        }
      });
    }
  }
}

module.exports = new DatabaseService();

