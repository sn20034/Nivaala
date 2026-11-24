import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { NameBoxCard } from '@/components/cards';
import { useAuth } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { studentService } from '@/services/studentService';
import { validators } from '@/utils/validators';

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-cream-border p-4 dark:border-ink-border">
      <div>
        <p className="font-medium text-sm text-textBase dark:text-white">{label}</p>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition-colors ${checked ? 'bg-success' : 'bg-cream-border dark:bg-ink-border'}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { data: profile, refetch } = useFetch(() => studentService.getProfile(), [], null);
  const [loading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState(profile?.notifications || { whatsapp: true, email: false, parentUpdates: true });
  const [boxNamePreview, setBoxNamePreview] = useState(profile?.boxName || '');
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profile || {},
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updated = await studentService.updateProfile({
        ...data,
        notifications: notifs,
      });
      updateUser(updated);
      toast.success('Profile saved!');
      refetch();
    } catch {
      toast.error('Could not save profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="text-muted">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Profile</h1>
        <p className="text-muted">Your details — and the name that goes on your box.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Box name highlight — solid maroon with live preview */}
        <div
          className="grid items-center gap-6 rounded-card p-6 text-white sm:grid-cols-2"
          style={{ background: 'linear-gradient(135deg, #7F1521, #5E0F18)' }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide2" style={{ color: '#FFD27A' }}>Name on the box</p>
            <input
              type="text"
              defaultValue={profile.boxName}
              {...register('boxName', { validate: validators.required('Enter a name for your box') })}
              onChange={(e) => setBoxNamePreview(e.target.value)}
              placeholder="Aarav"
              className="mt-2 w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-[#FFD27A] focus:outline-none focus:ring-2 focus:ring-[#FFD27A]/40"
            />
            {errors.boxName?.message && (
              <p className="mt-1 text-xs text-red-300">{errors.boxName.message}</p>
            )}
            <p className="mt-2 font-hand text-base" style={{ color: '#FFD27A' }}>Yeh naam tumhare dabbe pe likha aayega.</p>
          </div>
          {/* Live preview */}
          <div className="mx-auto w-full max-w-[200px]">
            <NameBoxCard name={boxNamePreview || 'Your name'} note="Aaj ka khana, ghar jaisa." rotate={3} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" name="fullName" defaultValue={profile.fullName} {...register('fullName', { validate: validators.required() })} error={errors.fullName?.message} />
          <Input label="Phone" name="phone" defaultValue={profile.phone} {...register('phone', { validate: validators.phone() })} error={errors.phone?.message} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Hostel / PG name" name="hostelName" defaultValue={profile.hostelName} {...register('hostelName')} />
          <Input label="Room" name="room" defaultValue={profile.room} {...register('room')} />
        </div>

        <Input label="Address" name="address" defaultValue={profile.address} {...register('address')} placeholder="Full delivery address" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Parent contact" name="parentContact" defaultValue={profile.parentContact} {...register('parentContact')} placeholder="Parent's phone for updates" />
          <Input label="City" name="city" defaultValue={profile.city} {...register('city')} />
        </div>

        <Textarea label="Note preference for the kitchen" name="notePreference" defaultValue={profile.notePreference} {...register('notePreference')} placeholder="No onion-garlic, extra ghee, etc." />

        {/* Notification toggles */}
        <div>
          <h3 className="mb-3 font-bold text-textBase dark:text-white">Notifications</h3>
          <div className="space-y-3">
            <Toggle
              label="WhatsApp updates"
              description="Daily menu and delivery alerts"
              checked={notifs.whatsapp}
              onChange={(v) => setNotifs((n) => ({ ...n, whatsapp: v }))}
            />
            <Toggle
              label="Email updates"
              description="Invoices and announcements"
              checked={notifs.email}
              onChange={(v) => setNotifs((n) => ({ ...n, email: v }))}
            />
            <Toggle
              label="Parent updates"
              description="Send weekly menu and kitchen clips to your parent"
              checked={notifs.parentUpdates}
              onChange={(v) => setNotifs((n) => ({ ...n, parentUpdates: v }))}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={loading}>Save profile →</Button>
        </div>
      </form>
    </div>
  );
}
