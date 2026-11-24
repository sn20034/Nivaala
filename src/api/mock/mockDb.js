// Mock database with seed data + localStorage persistence.
// Shapes match the Spring Boot API contract exactly.

const DB_KEY = 'nivaala_mock_db';

const SEED = {
  users: [
    {
      id: 'u-stu-1', fullName: 'Aarav Sharma', email: 'student@nivaala.com',
      phone: '9876543210', password: '123456', role: 'STUDENT',
      boxName: 'Aarav', hostelName: 'Sunrise Hostel', city: 'Pune',
      room: '204', address: 'Sunrise Hostel, Baner Road, Pune',
      parentContact: '9123456780',
      notifications: { whatsapp: true, email: false, parentUpdates: true },
      planId: 'plan-two-meals',
      credits: 2,
      createdAt: '2026-11-01',
    },
    {
      id: 'u-admin-1', fullName: 'Nivaala Admin', email: 'admin@nivaala.com',
      phone: '9876500000', password: '123456', role: 'ADMIN',
      boxName: '', hostelName: '', city: 'Pune',
      createdAt: '2026-11-01',
    },
  ],
  plans: [
    {
      id: 'plan-trial', name: 'Trial Pack', price: 399, mealsCount: 5,
      billingCycle: 'ONE_TIME', isPopular: false,
      features: ['5 meals — lunch or dinner your call', 'Delivered with your name on the box', 'Pause anytime', 'No commitment'],
    },
    {
      id: 'plan-single', name: 'Single Meal', price: 2200, mealsCount: 30,
      billingCycle: 'MONTHLY', isPopular: false,
      features: ['30 meals — lunch OR dinner', 'One meal daily', 'Pause / skip anytime', 'Meal credits carried forward'],
    },
    {
      id: 'plan-two-meals', name: 'Two Meals', price: 3900, mealsCount: 60,
      billingCycle: 'MONTHLY', isPopular: true,
      features: ['Lunch + dinner daily', '60 meals a month', 'Pause / skip anytime', 'Meal credits carried forward', 'Priority delivery'],
    },
    {
      id: 'plan-weekly', name: 'Weekly Subscription', price: 1050, mealsCount: 14,
      billingCycle: 'WEEKLY', isPopular: false,
      features: ['14 meals a week', 'Lunch + dinner', 'Flexible weekly billing', 'Pause anytime'],
    },
  ],
  addons: [
    { id: 'add-roti', name: 'Extra Roti (2 pcs)', price: 15 },
    { id: 'add-sweet', name: 'Sweet Dish', price: 40 },
    { id: 'add-curd', name: 'Curd (150g)', price: 25 },
    { id: 'add-festival', name: 'Festival Special', price: 60 },
  ],
  menu: {
    MON: {
      LUNCH: [
        { id: 'm-l1', name: 'Dal Tadka', description: 'Slow-cooked toor dal with golden tempering', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein', 'classic'], isSpecial: false },
        { id: 'm-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'm-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'm-l4', name: 'Aloo Gobi', description: 'Aloo gobi with jeera and haldi', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
        { id: 'm-l5', name: 'Kadhi', description: 'Punjabi kadhi with pakoras', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['classic'], isSpecial: false },
        { id: 'm-l6', name: 'Seasonal Special: Gajar Halwa', description: 'Winter special — slow-cooked carrot halwa', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'SWEET', tags: ['seasonal', 'sweet'], isSpecial: true },
      ],
      DINNER: [
        { id: 'm-d1', name: 'Dal Fry', description: 'Home-style dal fry', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 'm-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'm-d3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'm-d4', name: 'Paneer Bhurji', description: 'Scrambled paneer with onion-tomato', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein', 'sabzi'], isSpecial: false },
        { id: 'm-d5', name: 'Khichdi', description: 'Moong dal khichdi with ghee', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['comfort'], isSpecial: false },
      ],
    },
    TUE: {
      LUNCH: [
        { id: 't-l1', name: 'Chana Dal', description: 'Thick chana dal with masala', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 't-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 't-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 't-l4', name: 'Bhindi Masala', description: 'Crispy bhindi with spices', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
        { id: 't-l5', name: 'Kadhi', description: 'Punjabi kadhi with pakoras', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['classic'], isSpecial: false },
      ],
      DINNER: [
        { id: 't-d1', name: 'Moong Dal', description: 'Light moong dal with cumin', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['protein'], isSpecial: false },
        { id: 't-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 't-d3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 't-d4', name: 'Mix Veg', description: 'Seasonal mixed vegetables', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
      ],
    },
    WED: {
      LUNCH: [
        { id: 'w-l1', name: 'Dal Makhani', description: 'Creamy dal makhani, slow-cooked', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein', 'classic'], isSpecial: false },
        { id: 'w-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'w-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'w-l4', name: 'Matar Paneer', description: 'Matar paneer in tomato gravy', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein', 'sabzi'], isSpecial: false },
        { id: 'w-l5', name: 'Kadhi', description: 'Punjabi kadhi with pakoras', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['classic'], isSpecial: false },
      ],
      DINNER: [
        { id: 'w-d1', name: 'Dal Tadka', description: 'Slow-cooked toor dal with tempering', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 'w-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'w-d3', name: 'Jeera Rice', description: 'Jeera rice with ghee', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'w-d4', name: 'Aloo Matar', description: 'Aloo matar in onion gravy', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
      ],
    },
    THU: {
      LUNCH: [
        { id: 'th-l1', name: 'Rajma', description: 'Punjabi rajma in thick gravy', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein', 'classic'], isSpecial: false },
        { id: 'th-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'th-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'th-l4', name: 'Gobi Sabzi', description: 'Gobi with turmeric and jeera', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
        { id: 'th-l5', name: 'Kadhi', description: 'Punjabi kadhi with pakoras', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['classic'], isSpecial: false },
      ],
      DINNER: [
        { id: 'th-d1', name: 'Chana Dal', description: 'Thick chana dal', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 'th-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'th-d3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'th-d4', name: 'Soyabean Sabzi', description: 'Nutri soyabean sabzi', imageUrl: '', mealType: 'DINNER', spiceLevel: 'SPICY', tags: ['sabzi'], isSpecial: false },
      ],
    },
    FRI: {
      LUNCH: [
        { id: 'f-l1', name: 'Dal Fry', description: 'Home-style dal fry', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 'f-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'f-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'f-l4', name: 'Palak Paneer', description: 'Paneer in creamy palak gravy', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['protein', 'sabzi'], isSpecial: false },
        { id: 'f-l5', name: 'Kadhi', description: 'Punjabi kadhi with pakoras', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['classic'], isSpecial: false },
      ],
      DINNER: [
        { id: 'f-d1', name: 'Dal Makhani', description: 'Creamy dal makhani', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 'f-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'f-d3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'f-d4', name: 'Chole', description: 'Punjabi chole', imageUrl: '', mealType: 'DINNER', spiceLevel: 'SPICY', tags: ['protein', 'sabzi'], isSpecial: false },
      ],
    },
    SAT: {
      LUNCH: [
        { id: 's-l1', name: 'Chole', description: 'Punjabi chole with bhatura-style masala', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'SPICY', tags: ['protein', 'weekend'], isSpecial: true },
        { id: 's-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 's-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 's-l4', name: 'Aloo Paratha', description: 'Stuffed aloo paratha with butter', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MEDIUM', tags: ['weekend'], isSpecial: false },
        { id: 's-l5', name: 'Curd', description: 'Fresh curd', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['side'], isSpecial: false },
      ],
      DINNER: [
        { id: 's-d1', name: 'Dal Tadka', description: 'Toor dal tempering', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 's-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 's-d3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 's-d4', name: 'Mix Veg', description: 'Seasonal mixed vegetables', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
      ],
    },
    SUN: {
      LUNCH: [
        { id: 'su-l1', name: 'Khichdi', description: 'Moong dal khichdi with ghee — Sunday comfort', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['comfort', 'weekend'], isSpecial: true },
        { id: 'su-l2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'su-l3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'su-l4', name: 'Curd', description: 'Fresh curd', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['side'], isSpecial: false },
        { id: 'su-l5', name: 'Papad', description: 'Roasted papad', imageUrl: '', mealType: 'LUNCH', spiceLevel: 'MILD', tags: ['side'], isSpecial: false },
      ],
      DINNER: [
        { id: 'su-d1', name: 'Rajma', description: 'Punjabi rajma', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['protein'], isSpecial: false },
        { id: 'su-d2', name: 'Roti (4 pcs)', description: 'Fresh phulka rotis', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'su-d3', name: 'Rice', description: 'Steamed basmati rice', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MILD', tags: ['staple'], isSpecial: false },
        { id: 'su-d4', name: 'Aloo Gobi', description: 'Aloo gobi with jeera', imageUrl: '', mealType: 'DINNER', spiceLevel: 'MEDIUM', tags: ['sabzi'], isSpecial: false },
      ],
    },
  },
  aunties: [
    { id: 'a1', name: 'Sunita Aunty', region: 'Lucknow, UP', years: 22, story: 'Bahut saalon se main roti belti hoon. Nivaala ke kitchen mein har sabzi mere haath se banti hai — jaise ghar mein.', imageUrl: '' },
    { id: 'a2', name: 'Lata Aunty', region: 'Pune, MH', years: 18, story: 'Dal ka ratio sabse important hai. Bahut log pani zyada daal dete hain. Humara dal chamakta hai, patla nahi.', imageUrl: '' },
    { id: 'a3', name: 'Geeta Aunty', region: 'Indore, MP', years: 15, story: 'Spice ko balance karna koi seekh sakta hai, par pyaar se khana banana — woh nahi. Yahi Nivaala hai.', imageUrl: '' },
  ],
  clips: [
    { id: 'c1', title: 'Washing vegetables — 06:00', thumbnail: '', duration: '1:24', isLive: true },
    { id: 'c2', title: 'Dal simmering — 09:45', thumbnail: '', duration: '2:10', isLive: false },
    { id: 'c3', title: 'Roti on the tava — 10:30', thumbnail: '', duration: '1:48', isLive: false },
    { id: 'c4', title: 'Packing with names — 11:00', thumbnail: '', duration: '1:12', isLive: false },
    { id: 'c5', title: 'Out for delivery — 12:30', thumbnail: '', duration: '0:58', isLive: false },
  ],
  trail: [
    { time: '06:00', label: 'Vegetables washed' },
    { time: '09:30', label: 'Cooking begins' },
    { time: '11:00', label: 'Packed with your name' },
    { time: '12:30', label: 'Delivered warm' },
  ],
  orders: [
    { id: 'ord-1', studentId: 'u-stu-1', planId: 'plan-two-meals', mealTypes: ['LUNCH','DINNER'], startDate: '2026-11-01', address: 'Sunrise Hostel, Baner Road, Pune', hostelName: 'Sunrise Hostel', room: '204', boxName: 'Aarav', note: 'Thoda extra ghee daal diya', paymentMethod: 'UPI', status: 'Delivered', total: 3900, createdAt: '2026-11-01' },
    { id: 'ord-2', studentId: 'u-stu-1', planId: 'plan-two-meals', mealTypes: ['LUNCH','DINNER'], startDate: '2026-11-15', address: 'Sunrise Hostel, Baner Road, Pune', hostelName: 'Sunrise Hostel', room: '204', boxName: 'Aarav', note: '', paymentMethod: 'UPI', status: 'Delivered', total: 3900, createdAt: '2026-11-15' },
    { id: 'ord-3', studentId: 'u-stu-1', planId: 'plan-two-meals', mealTypes: ['LUNCH','DINNER'], startDate: '2026-11-18', address: 'Sunrise Hostel, Baner Road, Pune', hostelName: 'Sunrise Hostel', room: '204', boxName: 'Aarav', note: 'Aaj dinner zyada spicy mat banana', paymentMethod: 'UPI', status: 'Preparing', total: 3900, createdAt: '2026-11-20' },
  ],
  skips: [
    { id: 'sk-1', studentId: 'u-stu-1', fromDate: '2026-11-10', toDate: '2026-11-12', meals: ['LUNCH','DINNER'], reason: 'Going home', note: 'Diwali ghar ja raha hoon', status: 'CONFIRMED', creditMeals: 6, createdAt: '2026-11-08' },
    { id: 'sk-2', studentId: 'u-stu-1', fromDate: '2026-11-16', toDate: '2026-11-16', meals: ['DINNER'], reason: 'Exam', note: 'Exam revision', status: 'TOO_LATE', creditMeals: 0, createdAt: '2026-11-16' },
  ],
  students: [
    { id: 'u-stu-1', fullName: 'Aarav Sharma', email: 'student@nivaala.com', phone: '9876543210', hostelName: 'Sunrise Hostel', planId: 'plan-two-meals', status: 'ACTIVE', city: 'Pune', joinedAt: '2026-11-01', mealsLeft: 58 },
    { id: 'u-stu-2', fullName: 'Priya Iyer', email: 'priya@example.com', phone: '9812345678', hostelName: 'Green PG', planId: 'plan-single', status: 'ACTIVE', city: 'Pune', joinedAt: '2026-11-05', mealsLeft: 28 },
    { id: 'u-stu-3', fullName: 'Rohan Das', email: 'rohan@example.com', phone: '9800011222', hostelName: 'Sunrise Hostel', planId: 'plan-two-meals', status: 'PAUSED', city: 'Pune', joinedAt: '2026-11-10', mealsLeft: 12 },
    { id: 'u-stu-4', fullName: 'Sneha Patel', email: 'sneha@example.com', phone: '9898989898', hostelName: 'Hill View PG', planId: 'plan-weekly', status: 'ACTIVE', city: 'Pune', joinedAt: '2026-11-12', mealsLeft: 14 },
    { id: 'u-stu-5', fullName: 'Karan Mehta', email: 'karan@example.com', phone: '9765432100', hostelName: 'Green PG', planId: 'plan-trial', status: 'ACTIVE', city: 'Pune', joinedAt: '2026-11-15', mealsLeft: 3 },
  ],
  leads: [
    { id: 'lead-1', hostelName: 'Sunrise Hostel', ownerName: 'Mr. Verma', phone: '9090909090', students: 40, monthlyMessCost: 3500, city: 'Pune', status: 'CONTACTED', createdAt: '2026-11-05' },
    { id: 'lead-2', hostelName: 'Green PG', ownerName: 'Mrs. Kaur', phone: '8080808080', students: 25, monthlyMessCost: 3000, city: 'Pune', status: 'PILOT', createdAt: '2026-11-10' },
    { id: 'lead-3', hostelName: 'Hill View PG', ownerName: 'Mr. Singh', phone: '7070707070', students: 35, monthlyMessCost: 3200, city: 'Pune', status: 'NEW', createdAt: '2026-11-15' },
  ],
  feedback: [
    { id: 'fb-1', orderId: 'ord-1', studentId: 'u-stu-1', studentName: 'Aarav Sharma', rating: 5, comment: 'Dal bilkul maa jaisa tha!', status: 'RESOLVED', type: 'RATING', createdAt: '2026-11-02' },
    { id: 'fb-2', orderId: 'ord-2', studentId: 'u-stu-1', studentName: 'Aarav Sharma', rating: 4, comment: 'Roti thodi zyada thick thi aaj', status: 'OPEN', type: 'COMPLAINT', createdAt: '2026-11-16' },
    { id: 'fb-3', orderId: 'ord-1', studentId: 'u-stu-2', studentName: 'Priya Iyer', rating: 5, comment: 'Best hostel food ever. Seriously.', status: 'OPEN', type: 'RATING', createdAt: '2026-11-06' },
  ],
  testimonials: [
    { id: 't1', name: 'Aarav, Sunrise Hostel', text: 'Pehli baar mess ka khana khaake ghar yaad nahi aaya. And the name on the box — chef\'s kiss.', rating: 5 },
    { id: 't2', name: 'Priya, Green PG', text: 'Mummy ko ab roz tension nahi. Woh dekh sakti hain kitchen ka video. Aur mujhe bhi accha khana milta hai.', rating: 5 },
    { id: 't3', name: 'Rohan, Sunrise Hostel', text: 'Skip feature saves my money. Jab ghar jaata hoon, tiffin pause, credit milta hai. Fair.', rating: 4 },
  ],
};

export function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const fresh = structuredClone(SEED);
  saveDB(fresh);
  return fresh;
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDB() {
  localStorage.removeItem(DB_KEY);
  return loadDB();
}

// Simulate latency
export function delay(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

export function genId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
