// Mock request handlers — simulate the Spring Boot REST API.
import { loadDB, saveDB, genId, delay } from './mockDb';
import { evaluateSkipStatus } from '@/utils/cutoffRules';
import { todayISO, addDaysISO } from '@/utils/dateHelpers';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

function getDB() { return loadDB(); }
function setDB(db) { saveDB(db); }

function findByEmail(db, email) {
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export const mockHandlers = {
  // AUTH
  async signup({ fullName, phone, email, password, role, hostelName, city }) {
    await delay();
    const db = getDB();
    if (findByEmail(db, email)) throw { response: { status: 409, data: { message: 'Email already registered' } } };
    const user = {
      id: genId('u'), fullName, phone, email, password, role,
      boxName: fullName.split(' ')[0], hostelName: hostelName || '', city: city || '',
      room: '', address: '', parentContact: '', notifications: { whatsapp: true, email: false, parentUpdates: false },
      planId: null, credits: 0, createdAt: todayISO(),
    };
    db.users.push(user);
    setDB(db);
    const token = `mock-jwt-${user.id}`;
    const { password: _pw, ...safeUser } = user;
    return { token, user: safeUser };
  },

  async login({ email, password }) {
    await delay();
    const db = getDB();
    const user = findByEmail(db, email);
    if (!user || user.password !== password) {
      throw { response: { status: 401, data: { message: 'Invalid email or password' } } };
    }
    const token = `mock-jwt-${user.id}`;
    const { password: _pw, ...safeUser } = user;
    return { token, user: safeUser };
  },

  async me(token) {
    await delay(200);
    const db = getDB();
    const userId = token?.replace('mock-jwt-', '');
    const user = db.users.find((u) => u.id === userId);
    if (!user) throw { response: { status: 401, data: { message: 'Unauthorized' } } };
    const { password: _pw, ...safeUser } = user;
    return safeUser;
  },

  // MENU
  async getMenu({ day, mealType }) {
    await delay(300);
    const db = getDB();
    if (day && mealType) return db.menu[day]?.[mealType] || [];
    if (day) return Object.values(db.menu[day] || {}).flat();
    return db.menu;
  },

  async adminCreateMenuItem(item) {
    await delay();
    const db = getDB();
    const day = item.day || 'MON';
    const mealType = item.mealType || 'LUNCH';
    if (!db.menu[day]) db.menu[day] = {};
    if (!db.menu[day][mealType]) db.menu[day][mealType] = [];
    const newItem = { ...item, id: genId('m') };
    db.menu[day][mealType].push(newItem);
    setDB(db);
    return newItem;
  },

  async adminUpdateMenuItem(id, updates) {
    await delay();
    const db = getDB();
    for (const day of Object.keys(db.menu)) {
      for (const mt of Object.keys(db.menu[day])) {
        const idx = db.menu[day][mt].findIndex((m) => m.id === id);
        if (idx >= 0) {
          db.menu[day][mt][idx] = { ...db.menu[day][mt][idx], ...updates };
          setDB(db);
          return db.menu[day][mt][idx];
        }
      }
    }
    throw { response: { status: 404 } };
  },

  async adminDeleteMenuItem(id) {
    await delay();
    const db = getDB();
    for (const day of Object.keys(db.menu)) {
      for (const mt of Object.keys(db.menu[day])) {
        const idx = db.menu[day][mt].findIndex((m) => m.id === id);
        if (idx >= 0) {
          db.menu[day][mt].splice(idx, 1);
          setDB(db);
          return { id };
        }
      }
    }
    throw { response: { status: 404 } };
  },

  // PLANS
  async getPlans() {
    await delay(200);
    return getDB().plans;
  },

  async adminCreatePlan(plan) {
    await delay();
    const db = getDB();
    const newPlan = { ...plan, id: genId('plan') };
    db.plans.push(newPlan);
    setDB(db);
    return newPlan;
  },

  async adminUpdatePlan(id, updates) {
    await delay();
    const db = getDB();
    const idx = db.plans.findIndex((p) => p.id === id);
    if (idx < 0) throw { response: { status: 404 } };
    db.plans[idx] = { ...db.plans[idx], ...updates };
    setDB(db);
    return db.plans[idx];
  },

  async adminDeletePlan(id) {
    await delay();
    const db = getDB();
    db.plans = db.plans.filter((p) => p.id !== id);
    setDB(db);
    return { id };
  },

  // ORDERS
  async createOrder({ planId, mealTypes, startDate, address, hostelName, room, boxName, note, paymentMethod }) {
    await delay();
    const db = getDB();
    const plan = db.plans.find((p) => p.id === planId);
    const order = {
      id: genId('ord'), studentId: 'u-stu-1', planId, mealTypes, startDate,
      address, hostelName, room, boxName, note, paymentMethod,
      status: 'Preparing', total: plan?.price || 0, createdAt: todayISO(),
    };
    db.orders.unshift(order);
    // Assign plan to student if trial/subscription
    const student = db.users.find((u) => u.id === 'u-stu-1');
    if (student) { student.planId = planId; student.credits = (student.credits || 0) + 0; }
    setDB(db);
    return order;
  },

  async getStudentOrders() {
    await delay(300);
    return getDB().orders.filter((o) => o.studentId === 'u-stu-1');
  },

  async getAdminOrders() {
    await delay(300);
    return getDB().orders;
  },

  async updateOrderStatus(id, status) {
    await delay();
    const db = getDB();
    const order = db.orders.find((o) => o.id === id);
    if (!order) throw { response: { status: 404 } };
    order.status = status;
    setDB(db);
    return order;
  },

  // SKIPS
  async getStudentSkips() {
    await delay(300);
    return getDB().skips.filter((s) => s.studentId === 'u-stu-1').sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async createSkip({ fromDate, toDate, meals, reason, note }) {
    await delay();
    const db = getDB();
    const status = evaluateSkipStatus(fromDate);
    const from = new Date(fromDate + 'T00:00:00');
    const to = new Date(toDate + 'T00:00:00');
    const days = Math.round((to - from) / 86400000) + 1;
    const creditMeals = status === 'CONFIRMED' ? Math.max(0, days) * meals.length : 0;
    const skip = {
      id: genId('sk'), studentId: 'u-stu-1', fromDate, toDate, meals, reason, note,
      status, creditMeals, createdAt: todayISO(),
    };
    db.skips.unshift(skip);
    if (status === 'CONFIRMED') {
      const student = db.users.find((u) => u.id === 'u-stu-1');
      if (student) student.credits = (student.credits || 0) + creditMeals;
    }
    setDB(db);
    return skip;
  },

  async cancelSkip(id) {
    await delay();
    const db = getDB();
    const skip = db.skips.find((s) => s.id === id);
    if (!skip) throw { response: { status: 404 } };
    skip.status = 'CANCELLED';
    if (skip.creditMeals > 0) {
      const student = db.users.find((u) => u.id === 'u-stu-1');
      if (student) student.credits = Math.max(0, (student.credits || 0) - skip.creditMeals);
    }
    setDB(db);
    return skip;
  },

  async getAdminSkips({ date } = {}) {
    await delay(300);
    const db = getDB();
    let skips = db.skips.filter((s) => s.status !== 'CANCELLED');
    if (date) {
      skips = skips.filter((s) => s.fromDate <= date && s.toDate >= date);
    }
    return skips;
  },

  // STUDENT
  async getProfile() {
    await delay(200);
    const db = getDB();
    const user = db.users.find((u) => u.id === 'u-stu-1');
    const { password, ...safe } = user;
    return safe;
  },

  async updateProfile(updates) {
    await delay();
    const db = getDB();
    const idx = db.users.findIndex((u) => u.id === 'u-stu-1');
    if (idx < 0) throw { response: { status: 404 } };
    db.users[idx] = { ...db.users[idx], ...updates };
    setDB(db);
    const { password, ...safe } = db.users[idx];
    return safe;
  },

  async getStudentPlan() {
    await delay(200);
    const db = getDB();
    const user = db.users.find((u) => u.id === 'u-stu-1');
    const plan = db.plans.find((p) => p.id === user?.planId) || db.plans[0];
    const renewalDate = addDaysISO(todayISO(), 15);
    return { ...plan, renewalDate, credits: user?.credits || 0 };
  },

  async getCredits() {
    await delay(200);
    const db = getDB();
    const user = db.users.find((u) => u.id === 'u-stu-1');
    return { credits: user?.credits || 0 };
  },

  async submitFeedback({ orderId, rating, comment, type = 'RATING' }) {
    await delay();
    const db = getDB();
    const fb = {
      id: genId('fb'), orderId, studentId: 'u-stu-1', studentName: 'Aarav Sharma',
      rating, comment, status: 'OPEN', type, createdAt: todayISO(),
    };
    db.feedback.unshift(fb);
    setDB(db);
    return fb;
  },

  // KITCHEN
  async getClips() {
    await delay(200);
    return getDB().clips;
  },

  async getTrail() {
    await delay(200);
    return getDB().trail;
  },

  async getAunties() {
    await delay(200);
    return getDB().aunties;
  },

  // HOSTELS
  async submitLead({ hostelName, ownerName, phone, students, monthlyMessCost, city }) {
    await delay();
    const db = getDB();
    const lead = {
      id: genId('lead'), hostelName, ownerName, phone,
      students: Number(students), monthlyMessCost: Number(monthlyMessCost),
      city, status: 'NEW', createdAt: todayISO(),
    };
    db.leads.unshift(lead);
    setDB(db);
    return lead;
  },

  async getAdminLeads() {
    await delay(300);
    return getDB().leads;
  },

  // ADMIN
  async getDashboardStats() {
    await delay(300);
    const db = getDB();
    const activeStudents = db.students.filter((s) => s.status === 'ACTIVE').length;
    const tomSkips = db.skips.filter((s) => s.fromDate === addDaysISO(todayISO(), 1) && s.status === 'CONFIRMED').length;
    return {
      todayMeals: activeStudents * 2,
      activeStudents,
      skipsTomorrow: tomSkips,
      revenueThisMonth: 124500,
      avgRating: 4.8,
      complaintsOpen: db.feedback.filter((f) => f.status === 'OPEN' && f.type === 'COMPLAINT').length,
      mealsPerDay: [48, 52, 50, 55, 60, 58, 62],
      skipTrend: [2, 4, 3, 5, 6, 8, 3],
    };
  },

  async getKitchenSheet({ date }) {
    await delay(300);
    const db = getDB();
    const target = date || addDaysISO(todayISO(), 1);
    const daySkips = db.skips.filter((s) => s.fromDate <= target && s.toDate >= target && s.status === 'CONFIRMED');
    const lunchSkips = daySkips.filter((s) => s.meals.includes('LUNCH')).length;
    const dinnerSkips = daySkips.filter((s) => s.meals.includes('DINNER')).length;
    const total = db.students.filter((s) => s.status === 'ACTIVE').length;
    return {
      date: target,
      lunchCount: Math.max(0, total - lunchSkips),
      dinnerCount: Math.max(0, total - dinnerSkips),
      skippedCount: lunchSkips + dinnerSkips,
    };
  },

  async getStudents() {
    await delay(300);
    return getDB().students;
  },

  async updateStudentStatus(id, status) {
    await delay();
    const db = getDB();
    const student = db.students.find((s) => s.id === id);
    if (!student) throw { response: { status: 404 } };
    student.status = status;
    setDB(db);
    return student;
  },

  async getAdminFeedback() {
    await delay(300);
    return getDB().feedback;
  },

  async resolveFeedback(id) {
    await delay();
    const db = getDB();
    const fb = db.feedback.find((f) => f.id === id);
    if (!fb) throw { response: { status: 404 } };
    fb.status = 'RESOLVED';
    setDB(db);
    return fb;
  },
};

export const IS_MOCK = USE_MOCK;
