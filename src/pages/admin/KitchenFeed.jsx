import { useState } from 'react';
import { Plus, Trash2, Video, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { useFetch } from '@/hooks/useFetch';
import { kitchenService } from '@/services/kitchenService';
import { KitchenClipCard } from '@/components/cards';

export default function KitchenFeed() {
  const { data: clips, refetch } = useFetch(() => kitchenService.getClips(), [], []);
  const { data: trail, refetch: refetchTrail } = useFetch(() => kitchenService.getTrail(), [], []);
  const [clipForm, setClipForm] = useState({ title: '', duration: '0:30', isLive: false });
  const [trailForm, setTrailForm] = useState({ time: '', label: '' });

  // UI-only — no actual create API. Just demo the interface.
  const addClip = (e) => {
    e?.preventDefault();
    if (!clipForm.title.trim()) return;
    toast.success('Clip added (UI demo only — backend not connected).');
    setClipForm({ title: '', duration: '0:30', isLive: false });
  };

  const addTrail = (e) => {
    e?.preventDefault();
    if (!trailForm.time.trim() || !trailForm.label.trim()) return;
    toast.success('Trail entry added (UI demo only).');
    setTrailForm({ time: '', label: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Kitchen Feed</h1>
        <p className="text-muted">Manage kitchen clips and the daily trail. (UI only — backend pending.)</p>
      </div>

      {/* Upload clip */}
      <div className="card-surface p-5">
        <h3 className="mb-4 flex items-center gap-2 font-bold"><Video size={18} /> Upload / add clip</h3>
        <form onSubmit={addClip} className="grid gap-3 sm:grid-cols-3">
          <Input label="Title" value={clipForm.title} onChange={(e) => setClipForm((f) => ({ ...f, title: e.target.value }))} placeholder="Washing vegetables — 06:00" />
          <Input label="Duration" value={clipForm.duration} onChange={(e) => setClipForm((f) => ({ ...f, duration: e.target.value }))} placeholder="1:24" />
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={clipForm.isLive} onChange={(e) => setClipForm((f) => ({ ...f, isLive: e.target.checked }))} />
              Mark as LIVE
            </label>
          </div>
          <div className="sm:col-span-3">
            <Button type="submit" size="sm"><Plus size={16} /> Add clip</Button>
          </div>
        </form>
      </div>

      {/* Existing clips */}
      <div className="card-surface p-5">
        <h3 className="mb-4 font-bold">Current clips</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(clips || []).map((clip) => (
              <KitchenClipCard key={clip.id} clip={clip} />
            ))}
          </div>
      </div>

      {/* Trail entries */}
      <div className="card-surface p-5">
        <h3 className="mb-4 flex items-center gap-2 font-bold"><Clock size={18} /> Daily trail entries</h3>
        <form onSubmit={addTrail} className="mb-4 grid gap-3 sm:grid-cols-2">
          <Input label="Time" value={trailForm.time} onChange={(e) => setTrailForm((f) => ({ ...f, time: e.target.value }))} placeholder="06:00" />
          <Input label="Label" value={trailForm.label} onChange={(e) => setTrailForm((f) => ({ ...f, label: e.target.value }))} placeholder="Vegetables washed" />
          <div className="sm:col-span-2">
            <Button type="submit" size="sm"><Plus size={16} /> Add trail entry</Button>
          </div>
        </form>
        <div className="space-y-2">
          {(trail || []).map((entry, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-cream-border p-3 dark:border-ink-border">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">{entry.time}</span>
              <span className="text-sm">{entry.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
