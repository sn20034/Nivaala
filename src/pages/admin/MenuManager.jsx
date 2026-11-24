import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import SmartImage from '@/components/ui/SmartImage';
import { useFetch } from '@/hooks/useFetch';
import { menuService } from '@/services/menuService';
import { WEEK_DAYS, WEEK_DAY_LABELS, MEAL_TYPES, MEAL_LABELS } from '@/utils/constants';
import { mealImage } from '@/data/images';

export default function MenuManager() {
  const { data: fullMenu, refetch, loading } = useFetch(() => menuService.getMenu({}), [], {});
  const [day, setDay] = useState('MON');
  const [mealType, setMealType] = useState('LUNCH');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', spiceLevel: 'MEDIUM', tags: '', isSpecial: false });
  const [saving, setSaving] = useState(false);

  const meals = fullMenu?.[day]?.[mealType] || [];

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', description: '', spiceLevel: 'MEDIUM', tags: '', isSpecial: false });
    setModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, spiceLevel: item.spiceLevel, tags: item.tags?.join(', '), isSpecial: item.isSpecial });
    setModal(true);
  };

  const save = async (e) => {
    e?.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        day, mealType,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        imageUrl: '',
      };
      if (editing) {
        await menuService.adminUpdateMenuItem(editing.id, payload);
        toast.success('Menu item updated.');
      } else {
        await menuService.adminCreateMenuItem(payload);
        toast.success('Menu item added.');
      }
      setModal(false);
      refetch();
    } catch {
      toast.error('Could not save.');
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm('Delete this menu item?')) return;
    try {
      await menuService.adminDeleteMenuItem(id);
      toast.success('Deleted.');
      refetch();
    } catch {
      toast.error('Could not delete.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tightest">Menu Manager</h1>
          <p className="text-muted">Add, edit, and schedule weekly menu items.</p>
        </div>
        <Button size="sm" onClick={openNew}><Plus size={16} /> Add item</Button>
      </div>

      {/* Day + meal type selectors */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1 overflow-x-auto rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface no-scrollbar">
          {WEEK_DAYS.map((d) => (
            <button key={d} onClick={() => setDay(d)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${day === d ? 'bg-gradient-to-br from-brand-500 to-[#F04A23] text-white' : 'text-muted'}`}>
              {WEEK_DAY_LABELS[d].slice(0, 3)}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-full border border-cream-border bg-cream-surface p-1 dark:border-ink-border dark:bg-ink-surface">
          {MEAL_TYPES.map((mt) => (
            <button key={mt} onClick={() => setMealType(mt)} className={`rounded-full px-6 py-2 text-sm font-semibold ${mealType === mt ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'text-muted'}`}>
              {MEAL_LABELS[mt]}
            </button>
          ))}
        </div>
      </div>

      {/* Items list */}
      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : meals.length === 0 ? (
        <p className="py-8 text-center text-muted">No items for {WEEK_DAY_LABELS[day]} {MEAL_LABELS[mealType]}. Add one.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {meals.map((item) => (
            <div key={item.id} className="card-surface flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <SmartImage
                  src={item.imageUrl || mealImage(item.name).src}
                  alt={item.name}
                  aspect="1/1"
                  className="h-12 w-12 shrink-0 overflow-hidden rounded-xl"
                />
                <span className="veg-dot" />
                <div>
                  <p className="font-semibold">{item.name} {item.isSpecial && <Badge variant="brand" className="ml-1">Special</Badge>}</p>
                  <p className="text-sm text-muted">{item.description}</p>
                  <p className="text-xs text-muted">{item.spiceLevel} · {item.tags?.join(', ')}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(item)} className="rounded-full p-2 text-muted hover:bg-cream-border dark:hover:bg-ink-border"><Pencil size={16} /></button>
                <button onClick={() => del(item.id)} className="rounded-full p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit menu item' : 'Add menu item'}>
        <form onSubmit={save} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Dal Tadka" />
          <Input label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Slow-cooked toor dal" />
          <Select label="Spice level" value={form.spiceLevel} onChange={(e) => setForm((f) => ({ ...f, spiceLevel: e.target.value }))}>
            <option value="MILD">Mild</option>
            <option value="MEDIUM">Medium</option>
            <option value="SPICY">Spicy</option>
            <option value="SWEET">Sweet</option>
          </Select>
          <Input label="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="protein, classic" />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.isSpecial} onChange={(e) => setForm((f) => ({ ...f, isSpecial: e.target.checked }))} />
            Today's special
          </label>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1" loading={saving}>{editing ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
