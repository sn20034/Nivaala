// All API endpoint URLs in one place. Replace mock with Spring Boot REST API.
export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    ME: '/auth/me',
  },
  MENU: {
    LIST: '/menu', // ?day=&mealType=
    ADMIN_CREATE: '/admin/menu',
    ADMIN_UPDATE: (id) => `/admin/menu/${id}`,
    ADMIN_DELETE: (id) => `/admin/menu/${id}`,
  },
  PLANS: {
    LIST: '/plans',
    ADMIN_CREATE: '/admin/plans',
    ADMIN_UPDATE: (id) => `/admin/plans/${id}`,
    ADMIN_DELETE: (id) => `/admin/plans/${id}`,
  },
  ORDERS: {
    CREATE: '/orders',
    STUDENT_LIST: '/student/orders',
    ADMIN_LIST: '/admin/orders',
    ADMIN_STATUS: (id) => `/admin/orders/${id}/status`,
  },
  SKIPS: {
    STUDENT_LIST: '/student/skips',
    CREATE: '/student/skips',
    DELETE: (id) => `/student/skips/${id}`,
    ADMIN_LIST: '/admin/skips', // ?date=
  },
  STUDENT: {
    PROFILE: '/student/profile',
    PLAN: '/student/plan',
    CREDITS: '/student/credits',
    FEEDBACK: '/student/feedback',
  },
  KITCHEN: {
    CLIPS: '/kitchen/clips',
    TRAIL: '/kitchen/trail', // ?date=
    AUNTIES: '/kitchen/aunties',
  },
  HOSTELS: {
    LEADS: '/hostels/leads',
    ADMIN_LEADS: '/admin/hostel-leads',
  },
  ADMIN: {
    DASHBOARD_STATS: '/admin/dashboard-stats',
    STUDENTS: '/admin/students',
    STUDENT_STATUS: (id) => `/admin/students/${id}/status`,
    FEEDBACK: '/admin/feedback',
    KITCHEN_SHEET: '/admin/kitchen-sheet', // ?date=
  },
};
