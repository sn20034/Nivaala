import { useState } from 'react';
import { Printer, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Select } from '@/components/ui/Input';
import Table from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import { useFetch } from '@/hooks/useFetch';
import { orderService } from '@/services/orderService';
import { planService } from '@/services/planService';
import { formatCurrency, formatDate } from '@/utils/dateHelpers';
import { ORDER_STATUS, MEAL_LABELS } from '@/utils/constants';

const COLUMNS = [
  { key: 'id', label: 'Order' },
  { key: 'boxName', label: 'Box name' },
  { key: 'meals', label: 'Meals' },
  { key: 'hostel', label: 'Hostel' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Update' },
];

const STATUSES = Object.values(ORDER_STATUS);

export default function Orders() {
  const { data: orders, refetch } = useFetch(() => orderService.getAdminOrders(), [], []);
  const { data: plans } = useFetch(() => planService.getPlans(), [], []);
  const [labelModal, setLabelModal] = useState(false);

  const planName = (id) => plans?.find((p) => p.id === id)?.name || id;

  const updateStatus = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      toast.success(`Status updated to "${status}".`);
      refetch();
    } catch {
      toast.error('Could not update status.');
    }
  };

  const renderRow = (order) => (
    <tr key={order.id}>
      <td className="px-4 py-3 text-xs font-mono">{order.id}</td>
      <td className="px-4 py-3 font-semibold">{order.boxName}</td>
      <td className="px-4 py-3 text-sm">{order.mealTypes.map((m) => MEAL_LABELS[m]).join(' + ')}</td>
      <td className="px-4 py-3 text-sm">{order.hostelName}, {order.room}</td>
      <td className="px-4 py-3 text-sm">{formatCurrency(order.total)}</td>
      <td className="px-4 py-3">
        <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Preparing' ? 'warning' : 'brand'}>
          {order.status}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="py-1.5 text-xs">
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </td>
    </tr>
  );

  // Packing labels — one card per non-delivered order
  const activeOrders = (orders || []).filter((o) => o.status !== 'Delivered');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tightest">Orders</h1>
          <p className="text-muted">Update delivery status and print packing labels.</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setLabelModal(true)}><Printer size={14} /> Packing labels</Button>
      </div>

      <Table columns={COLUMNS} data={orders || []} renderRow={renderRow} empty={<p className="py-8 text-center text-muted">No orders yet.</p>} />

      {/* Packing labels modal */}
      <Modal open={labelModal} onClose={() => setLabelModal(false)} title="Packing labels" size="lg">
        <p className="mb-4 text-sm text-muted">Each label shows the student's name for the box. Print and stick.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {activeOrders.map((order) => (
            <div key={order.id} className="rounded-card border-2 border-dashed border-maroon/40 bg-gradient-to-br from-maroon to-maroon.dark p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide2 text-maroon.gold">Nivaala</span>
                <span className="veg-dot border-maroon.gold"><span className="block h-2 w-2 rounded-full bg-maroon.gold" /></span>
              </div>
              <p className="mt-3 text-xs text-white/60">For</p>
              <p className="font-display text-2xl font-extrabold text-maroon.gold">{order.boxName}</p>
              <p className="mt-1 text-sm text-white/70">{order.mealTypes.map((m) => MEAL_LABELS[m]).join(' + ')}</p>
              <p className="mt-2 text-xs text-white/50">{order.hostelName} · Room {order.room}</p>
            </div>
          ))}
          {activeOrders.length === 0 && <p className="text-muted">No active orders to label.</p>}
        </div>
        <Button className="mt-4 w-full" onClick={() => window.print()}><Printer size={16} /> Print labels</Button>
      </Modal>
    </div>
  );
}
