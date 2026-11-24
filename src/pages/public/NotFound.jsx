import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/routes/routePaths';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-4 text-center dark:bg-ink">
      <p className="font-display text-7xl font-extrabold tracking-tightest gradient-text">404</p>
      <h1 className="mt-4 font-display text-2xl font-extrabold">Yeh page toh banaya hi nahi.</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist. Let's get you home.</p>
      <Button className="mt-6" to={ROUTES.HOME}><HomeIcon size={16} /> Back to home</Button>
    </div>
  );
}
