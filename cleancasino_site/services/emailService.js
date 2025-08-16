const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  // Инициализация транспорта для отправки email
  initTransporter() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true для 465, false для других портов
      auth: {
        user: process.env.EMAIL_USER || 'neuron.holy@gmail.com',
        pass: process.env.EMAIL_PASS || 'your_app_password_here'
      }
    });

    // Проверка подключения
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Ошибка подключения к SMTP:', error);
      } else {
        console.log('✅ SMTP сервер готов к отправке');
      }
    });
  }

  // Отправка уведомления о новом подписчике
  async sendNewSubscriberNotification(subscriberData) {
    const { email, telegram, consent, ipAddress } = subscriberData;
    
    const subject = '🎰 Новый подписчик CleanCasino';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">🎰 CleanCasino</h1>
          <p style="margin: 10px 0 0 0;">Новый подписчик присоединился к проекту!</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; margin-top: 0;">📧 Информация о подписчике</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Telegram:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${telegram || 'Не указан'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Согласие на рассылку:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${consent ? '✅ Да' : '❌ Нет'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">IP адрес:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${ipAddress || 'Не определен'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Время регистрации:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('ru-RU')}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-left: 4px solid #2196F3;">
            <p style="margin: 0; color: #1976D2;">
              <strong>💡 Подсказка:</strong> Не забудьте добавить этого пользователя в вашу CRM систему 
              или список рассылки для дальнейшего взаимодействия.
            </p>
          </div>
        </div>
        
        <div style="padding: 15px; background: #f0f0f0; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">
            Это автоматическое уведомление от системы CleanCasino.<br>
            Время отправки: ${new Date().toLocaleString('ru-RU')}
          </p>
        </div>
      </div>
    `;

    return this.sendEmail(process.env.EMAIL_USER, subject, html);
  }

  // Отправка приветственного письма подписчику
  async sendWelcomeEmail(subscriberData) {
    const { email, telegram } = subscriberData;
    
    const subject = '🎰 Добро пожаловать в CleanCasino!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px;">🎰 CleanCasino</h1>
          <p style="margin: 15px 0 0 0; font-size: 18px;">Добро пожаловать в честное казино будущего!</p>
        </div>
        
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #333; margin-top: 0;">Спасибо за интерес к нашему проекту!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Мы рады приветствовать вас в сообществе CleanCasino! Вы присоединились к проекту, 
            который стремится изменить представление об онлайн-казино, сделав их прозрачными, 
            честными и технологичными.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">🎯 Что вас ждет:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>Ранний доступ</strong> к бета-версии платформы</li>
              <li><strong>Эксклюзивные новости</strong> о развитии проекта</li>
              <li><strong>Специальные бонусы</strong> для первых участников</li>
              <li><strong>Возможность влиять</strong> на развитие проекта</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            Мы будем держать вас в курсе всех важных событий и новостей проекта. 
            Ожидайте первое письмо с обновлениями уже скоро!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://cleancasino.com" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">
              🚀 Перейти на сайт
            </a>
          </div>
        </div>
        
        <div style="padding: 20px; background: #f0f0f0; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">
            Если вы не подписывались на рассылку, просто проигнорируйте это письмо.<br>
            Для отписки от рассылки ответьте на это письмо с темой "Отписаться".
          </p>
        </div>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Отправка отчета о статистике
  async sendAnalyticsReport(analyticsData) {
    const subject = '📊 Отчет по статистике CleanCasino';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">📊 Статистика CleanCasino</h1>
          <p style="margin: 10px 0 0 0;">Еженедельный отчет</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; margin-top: 0;">📈 Основные показатели</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; color: #667eea;">👥 Подписчики</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #333;">
                ${analyticsData.totalSubscribers?.count || 0}
              </p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; color: #667eea;">👁️ Просмотры</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #333;">
                ${analyticsData.totalPageViews?.count || 0}
              </p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; color: #667eea;">🎯 События</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #333;">
                ${analyticsData.totalEvents?.count || 0}
              </p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
              <h3 style="margin: 0; color: #667eea;">🔄 Сессии</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #333;">
                ${analyticsData.totalSessions?.count || 0}
              </p>
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">📅 Период отчета</h3>
            <p style="color: #666; margin: 0;">
              ${new Date().toLocaleDateString('ru-RU')} - ${new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
        
        <div style="padding: 15px; background: #f0f0f0; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">
            Отчет сгенерирован автоматически системой CleanCasino.<br>
            Время создания: ${new Date().toLocaleString('ru-RU')}
          </p>
        </div>
      </div>
    `;

    return this.sendEmail(process.env.EMAIL_USER, subject, html);
  }

  // Основной метод отправки email
  async sendEmail(to, subject, html, text = '') {
    if (!this.transporter) {
      throw new Error('SMTP транспортер не инициализирован');
    }

    const mailOptions = {
      from: `"CleanCasino" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email отправлен: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Ошибка отправки email:', error);
      throw error;
    }
  }

  // Проверка конфигурации email
  checkConfig() {
    const required = ['EMAIL_USER', 'EMAIL_PASS'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.warn(`⚠️ Отсутствуют переменные окружения: ${missing.join(', ')}`);
      return false;
    }
    
    return true;
  }
}

module.exports = new EmailService();
