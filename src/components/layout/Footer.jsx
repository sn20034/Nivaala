import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { ROUTES } from '@/routes/routePaths';
import { WHATSAPP_LINK } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="border-t border-cream-border bg-cream-surface dark:border-ink-border dark:bg-ink-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src="/images/WhatsApp_Image_2026-11-20_at_1.10.44_AM.jpeg" alt="Nivaala" className="h-10 w-10 rounded-2xl object-cover" />
              <span className="font-display text-xl font-extrabold tracking-tightest">Nivaala</span>
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Hostel ka khana, ab ghar jaisa. Aur sab dikhta hai.
            </p>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-border text-muted hover:border-brand-400 hover:text-brand-600 dark:border-ink-border" aria-label="Social link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide2 text-muted">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to={ROUTES.MENU} className="hover:text-brand-600 dark:hover:text-brand-400">Weekly Menu</Link></li>
              <li><Link to={ROUTES.KITCHEN} className="hover:text-brand-600 dark:hover:text-brand-400">Our Kitchen</Link></li>
              <li><Link to={ROUTES.PLANS} className="hover:text-brand-600 dark:hover:text-brand-400">Plans & Pricing</Link></li>
              <li><Link to={ROUTES.HOSTELS} className="hover:text-brand-600 dark:hover:text-brand-400">For Hostels</Link></li>
              <li><Link to={ROUTES.HOW_IT_WORKS} className="hover:text-brand-600 dark:hover:text-brand-400">How it works</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide2 text-muted">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} className="text-muted" /> +91 90000 00000</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-muted" /> hello@nivaala.in</li>
              <li className="flex items-center gap-2"><MapPin size={14} className="text-muted" /> Pune, Maharashtra</li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide2 text-muted">Compliance</h4>
            <div className="mt-3 rounded-2xl border border-cream-border p-3 dark:border-ink-border">
              <p className="text-xs text-muted">FSSAI Licence No.</p>
              <p className="font-mono text-sm font-bold">FSSAI-XXXXXXXXXX</p>
              <p className="mt-1 text-xs text-muted">Placeholder — replace with real licence number.</p>
            </div>
            <a href={WHATSAPP_LINK} className="mt-3 inline-block text-sm font-semibold text-success hover:underline">
              Join WhatsApp menu →
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-border pt-6 dark:border-ink-border">
          <p className="text-center text-xs text-muted">
            © {new Date().getFullYear()} Nivaala. Made with care in India. Dekho, phir khao.
          </p>
        </div>
      </div>
    </footer>
  );
}
