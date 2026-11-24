import { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { useFetch } from '@/hooks/useFetch';
import { planService } from '@/services/planService';
import { formatCurrency } from '@/utils/dateHelpers';

export default function PlansManager() {
  const { data: plans, refetch, loading } = useFetch(() => planService.getPlans(), [], []);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', price: 0, mealsCount: 0, billingCycle: 'MONTHLY', features: '', isPopular: false });

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', price: 0, mealsCount: 0, billingCycle: 'MONTHLY', features: '', isPopular: false });
    setModal(true);
  };

  const openEdit = (plan) => {
    setEditing(plan);
    setForm({ name: plan.name, price: plan.price, mealsCount: plan.mealsCount, billingCycle: plan.billingCycle, features: plan.features?.join('\n'), isPopular: plan.isPopular });
    setModal(true);
  };

  const save = async (e) => {
    e?.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        mealsCount: Number(form.mealsCount),
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
      };
      if (editing) {
        await planService.adminUpdatePlan(editing.id, payload);
        toast.success('Plan updated.');
      } else {
        await planService.adminCreatePlan(payload);
        toast.success('Plan created.');
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
    if (!confirm('Delete this plan?')) return;
    try {
      await planService.adminDeletePlan(id);
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
          <h1 className="font-display text-2xl font-extrabold tracking-tightest">Plans Manager</h1>
          <p className="text-muted">Create and manage plans and pricing.</p>
        </div>
        <Button size="sm" onClick={openNew}><Plus size={16} /> Add plan</Button>
      </div>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {(plans || []).map((plan) => (
            <div key={plan.id} className="card-surface p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{plan.name}</h3>
                    {plan.isPopular && <Badge variant="brand"><Star size={10} /> Popular</Badge>}
                  </div>
                  <p className="text-2xl font-extrabold">{formatCurrency(plan.price)}</p>
                  <p className="text-sm text-muted">{plan.mealsCount} meals · {plan.billingCycle}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(plan)} className="rounded-full p-2 text-muted hover:bg-cream-border dark:hover:bg-ink-border"><Pencil size={16} /></button>
                  <button onClick={() => del(plan.id)} className="rounded-full p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {plan.features?.slice(0, 3).map((f) => <li key={f} className="text-xs text-muted">• {f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit plan' : 'Add plan'}>
        <form onSubmit={save} className="space-y-4">
          <Input label="Plan name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Trial Pack" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Price (₹)" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            <Input label="Meals count" type="number" value={form.mealsCount} onChange={(e) => setForm((f) => ({ ...f, mealsCount: e.target.value }))} />
          </div>
          <Select label="Billing cycle" value={form.billingCycle} onChange={(e) => setForm((f) => ({ ...f, billingCycle: e.target.value }))}>
            <option value="ONE_TIME">One time</option>
            <option value="MONTHLY">Monthly</option>
            <option value="WEEKLY">Weekly</option>
          </Select>
          <Textarea label="Features (one per line)" value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))} placeholder="5 meals — lunch or dinner your call&#10;Delivered with your name" rows={5} />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.isPopular} onChange={(e) => setForm((f) => ({ ...f, isPopular: e.target.checked }))} />
            Mark as "Most Popular"
          </label>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit" className="flex-1" loading={saving}>{editing ? 'Save' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
