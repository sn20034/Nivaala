// All route paths as constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MENU: '/menu',
  KITCHEN: '/kitchen',
  PLANS: '/plans',
  HOSTELS: '/hostels',
  HOW_IT_WORKS: '/how-it-works',
  ORDER: '/order',
  UNAUTHORIZED: '/unauthorized',

  STUDENT: {
    DASHBOARD: '/student/dashboard',
    SKIP_PAUSE: '/student/skip-pause',
    PLAN: '/student/plan',
    ORDERS: '/student/orders',
    PROFILE: '/student/profile',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STUDENTS: '/admin/students',
    SKIPS: '/admin/skips',
    MENU: '/admin/menu',
    PLANS: '/admin/plans',
    ORDERS: '/admin/orders',
    KITCHEN_FEED: '/admin/kitchen-feed',
    HOSTELS: '/admin/hostels',
    FEEDBACK: '/admin/feedback',
  },
};

export const STUDENT_NAV = [
  { label: 'Dashboard', path: ROUTES.STUDENT.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Skip / Pause', path: ROUTES.STUDENT.SKIP_PAUSE, icon: 'CalendarOff' },
  { label: 'My Plan', path: ROUTES.STUDENT.PLAN, icon: 'CreditCard' },
  { label: 'Orders', path: ROUTES.STUDENT.ORDERS, icon: 'Package' },
  { label: 'Profile', path: ROUTES.STUDENT.PROFILE, icon: 'User' },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Students', path: ROUTES.ADMIN.STUDENTS, icon: 'Users' },
  { label: 'Skips', path: ROUTES.ADMIN.SKIPS, icon: 'CalendarOff' },
  { label: 'Menu', path: ROUTES.ADMIN.MENU, icon: 'Utensils' },
  { label: 'Plans', path: ROUTES.ADMIN.PLANS, icon: 'CreditCard' },
  { label: 'Orders', path: ROUTES.ADMIN.ORDERS, icon: 'Package' },
  { label: 'Kitchen Feed', path: ROUTES.ADMIN.KITCHEN_FEED, icon: 'Video' },
  { label: 'Hostels', path: ROUTES.ADMIN.HOSTELS, icon: 'Building2' },
  { label: 'Feedback', path: ROUTES.ADMIN.FEEDBACK, icon: 'MessageSquare' },
];
