import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      {/* Spacer for mobile WhatsApp bar */}
      <div className="h-14 sm:hidden" aria-hidden />
    </div>
  );
}
