import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout, DashboardLayout } from '@/components/layout';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './routePaths';

// Public pages
const Home = lazy(() => import('@/pages/public/Home'));
const Login = lazy(() => import('@/pages/public/Login'));
const Signup = lazy(() => import('@/pages/public/Signup'));
const Menu = lazy(() => import('@/pages/public/Menu'));
const Kitchen = lazy(() => import('@/pages/public/Kitchen'));
const Plans = lazy(() => import('@/pages/public/Plans'));
const Hostels = lazy(() => import('@/pages/public/Hostels'));
const HowItWorks = lazy(() => import('@/pages/public/HowItWorks'));
const Order = lazy(() => import('@/pages/public/Order'));
const NotFound = lazy(() => import('@/pages/public/NotFound'));
const Unauthorized = lazy(() => import('@/pages/public/Unauthorized'));

// Student pages
const StudentDashboard = lazy(() => import('@/pages/student/Dashboard'));
const SkipPause = lazy(() => import('@/pages/student/SkipPause'));
const MyPlan = lazy(() => import('@/pages/student/MyPlan'));
const StudentOrders = lazy(() => import('@/pages/student/Orders'));
const StudentProfile = lazy(() => import('@/pages/student/Profile'));

// Admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminStudents = lazy(() => import('@/pages/admin/Students'));
const AdminSkips = lazy(() => import('@/pages/admin/Skips'));
const MenuManager = lazy(() => import('@/pages/admin/MenuManager'));
const PlansManager = lazy(() => import('@/pages/admin/PlansManager'));
const AdminOrders = lazy(() => import('@/pages/admin/Orders'));
const KitchenFeed = lazy(() => import('@/pages/admin/KitchenFeed'));
const AdminHostels = lazy(() => import('@/pages/admin/Hostels'));
const AdminFeedback = lazy(() => import('@/pages/admin/Feedback'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-3 border-brand-500 border-t-transparent" />
    </div>
  );
}

export default function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Routes location={location}>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.KITCHEN} element={<Kitchen />} />
          <Route path={ROUTES.PLANS} element={<Plans />} />
          <Route path={ROUTES.HOSTELS} element={<Hostels />} />
          <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
          <Route path={ROUTES.ORDER} element={<Order />} />
          <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        </Route>

        {/* Student */}
        <Route element={<ProtectedRoute role="STUDENT"><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.STUDENT.DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.STUDENT.SKIP_PAUSE} element={<SkipPause />} />
          <Route path={ROUTES.STUDENT.PLAN} element={<MyPlan />} />
          <Route path={ROUTES.STUDENT.ORDERS} element={<StudentOrders />} />
          <Route path={ROUTES.STUDENT.PROFILE} element={<StudentProfile />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute role="ADMIN"><DashboardLayout /></ProtectedRoute>}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN.STUDENTS} element={<AdminStudents />} />
          <Route path={ROUTES.ADMIN.SKIPS} element={<AdminSkips />} />
          <Route path={ROUTES.ADMIN.MENU} element={<MenuManager />} />
          <Route path={ROUTES.ADMIN.PLANS} element={<PlansManager />} />
          <Route path={ROUTES.ADMIN.ORDERS} element={<AdminOrders />} />
          <Route path={ROUTES.ADMIN.KITCHEN_FEED} element={<KitchenFeed />} />
          <Route path={ROUTES.ADMIN.HOSTELS} element={<AdminHostels />} />
          <Route path={ROUTES.ADMIN.FEEDBACK} element={<AdminFeedback />} />
        </Route>

        {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}
