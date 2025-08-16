const { createClient } = require('@supabase/supabase-js');

class SupabaseDatabaseService {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!this.supabaseUrl || !this.supabaseServiceKey) {
      throw new Error('SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY не заданы');
    }
    this.client = createClient(this.supabaseUrl, this.supabaseServiceKey, {
      auth: { persistSession: false },
    });
  }

  initDatabase() {}
  createTables() {}

  async addSubscriber(email, telegram = null, consent = true, ipAddress = null, userAgent = null) {
    const { data, error } = await this.client
      .from('subscribers')
      .upsert({ email, telegram, consent, ip_address: ipAddress, user_agent: userAgent }, { onConflict: 'email' })
      .select('email, telegram, consent')
      .single();
    if (error) throw error;
    return data;
  }

  async getSubscribers() {
    const { data, error } = await this.client
      .from('subscribers')
      .select('email, telegram, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async addPageView(page, sessionId, ipAddress = null, userAgent = null, referrer = null) {
    const { data, error } = await this.client
      .from('page_views')
      .insert({ page, session_id: sessionId, ip_address: ipAddress, user_agent: userAgent, referrer })
      .select('id')
      .single();
    if (error) throw error;
    return data;
  }

  async addEvent(eventType, eventData, sessionId, page = null, ipAddress = null, userAgent = null) {
    const { data, error } = await this.client
      .from('events')
      .insert({ event_type: eventType, event_data: eventData, session_id: sessionId, page, ip_address: ipAddress, user_agent: userAgent })
      .select('id')
      .single();
    if (error) throw error;
    return data;
  }

  async createOrUpdateSession(sessionId, ipAddress = null, userAgent = null, page = null) {
    const { data, error } = await this.client
      .from('sessions')
      .upsert({ session_id: sessionId, ip_address: ipAddress, user_agent: userAgent, first_page: page, last_activity: new Date().toISOString() }, { onConflict: 'session_id' })
      .select('session_id')
      .single();
    if (error) throw error;
    return data;
  }

  async getAnalytics() {
    // Counts
    const [subCnt, pvCnt, evCnt, sessCnt] = await Promise.all([
      this.client.from('subscribers').select('*', { count: 'exact', head: true }),
      this.client.from('page_views').select('*', { count: 'exact', head: true }),
      this.client.from('events').select('*', { count: 'exact', head: true }),
      this.client.from('sessions').select('*', { count: 'exact', head: true }),
    ]);

    const totalSubscribers = { count: subCnt.count || 0 };
    const totalPageViews = { count: pvCnt.count || 0 };
    const totalEvents = { count: evCnt.count || 0 };
    const totalSessions = { count: sessCnt.count || 0 };

    // Lists and aggregates
    const [recentSubscribersRes, recentEventsRes, pageViewsByPageRes, eventsByTypeRes, timeOnPageRes] = await Promise.all([
      this.client.from('subscribers').select('email, telegram, created_at').order('created_at', { ascending: false }).limit(10),
      this.client.from('events').select('event_type, event_data, page, created_at').order('created_at', { ascending: false }).limit(20),
      this.client.from('vw_page_views_by_page').select('page, count').order('count', { ascending: false }),
      this.client.from('vw_events_by_type').select('event_type, count').order('count', { ascending: false }),
      this.client.from('events').select('page, event_data, created_at').eq('event_type', 'time_on_page').order('created_at', { ascending: false }).limit(1000),
    ]);

    const data = {
      totalSubscribers,
      totalPageViews,
      totalEvents,
      totalSessions,
      recentSubscribers: recentSubscribersRes.data || [],
      recentEvents: recentEventsRes.data || [],
      pageViewsByPage: pageViewsByPageRes.data || [],
      eventsByType: eventsByTypeRes.data || [],
      timeOnPageEvents: timeOnPageRes.data || [],
    };

    return data;
  }

  async getRecentEvents(limit = 20) {
    const { data, error } = await this.client
      .from('events')
      .select('event_type, event_data, page, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  close() {}
}

module.exports = new SupabaseDatabaseService();


