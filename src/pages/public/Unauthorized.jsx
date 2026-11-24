import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/routes/routePaths';
import { useAuth } from '@/context/AuthContext';

export default function Unauthorized() {
  const { isAuthenticated, isStudent, isAdmin } = useAuth();
  const home = isAdmin ? ROUTES.ADMIN.DASHBOARD : isStudent ? ROUTES.STUDENT.DASHBOARD : ROUTES.HOME;
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-4 text-center dark:bg-ink">
      <ShieldAlert size={48} className="text-danger" />
      <h1 className="mt-4 font-display text-2xl font-extrabold">You can't be here.</h1>
      <p className="mt-2 text-muted">This area is for a different role. Head back to your dashboard.</p>
      <Button className="mt-6" to={home}>Go to my dashboard</Button>
    </div>
  );
}
