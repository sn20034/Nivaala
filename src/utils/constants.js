// Central app constants

export const APP_NAME = 'Nivaala';
export const APP_TAGLINE = 'Dekho, phir khao.';

// Skip cut-off: students must skip before 9:00 PM the previous day to get a credit.
export const SKIP_CUTOFF_HOUR = 21; // 9 PM
export const SKIP_CUTOFF_LABEL = '9:00 PM';

// Mock meal rate used to calculate credit previews.
export const MOCK_MEAL_RATE = 80; // INR per meal

export const MEAL_TYPES = ['LUNCH', 'DINNER'];
export const MEAL_LABELS = { LUNCH: 'Lunch', DINNER: 'Dinner' };

export const WEEK_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const WEEK_DAY_LABELS = {
  MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday',
  THU: 'Thursday', FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday',
};

export const SKIP_REASONS = ['Going home', 'Exam', 'Sick', 'Other'];

export const SKIP_STATUS = {
  CONFIRMED: 'CONFIRMED',
  TOO_LATE: 'TOO_LATE',
  CANCELLED: 'CANCELLED',
};

export const ORDER_STATUS = {
  PREPARING: 'Preparing',
  PACKED: 'Packed',
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered',
};

export const ROLES = { STUDENT: 'STUDENT', ADMIN: 'ADMIN' };

export const PAYMENT_METHODS = {
  UPI: 'UPI',
  COD: 'Cash on delivery',
  ONLINE: 'Pay online',
};

export const WHATSAPP_LINK = import.meta.env.VITE_WHATSAPP_LINK || 'https://wa.me/';

// Delivery time windows (shown across the app)
export const DELIVERY_WINDOWS = {
  LUNCH: '12:00 PM – 1:30 PM',
  DINNER: '7:00 PM – 8:30 PM',
};
