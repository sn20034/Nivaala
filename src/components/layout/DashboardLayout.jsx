import { Outlet, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Navbar from './Navbar';
import Sidebar, { MobileTabBar } from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { STUDENT_NAV, ADMIN_NAV } from '@/routes/routePaths';

export default function DashboardLayout() {
  const { isStudent, isAdmin } = useAuth();
  const nav = isStudent ? STUDENT_NAV : isAdmin ? ADMIN_NAV : [];
  const title = isStudent ? 'Student' : 'Admin';

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar nav={nav} title={title} />
        <main className="min-w-0 flex-1 px-4 py-6 pb-28 sm:px-6 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileTabBar nav={nav} />
    </div>
  );
}
