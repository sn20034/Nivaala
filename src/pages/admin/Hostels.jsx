import { useState } from 'react';
import { Building2, Phone, Users } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import { Select } from '@/components/ui/Input';
import { useFetch } from '@/hooks/useFetch';
import { hostelService } from '@/services/hostelService';
import { formatDate, formatCurrency } from '@/utils/dateHelpers';

const COLUMNS = [
  { key: 'hostel', label: 'Hostel' },
  { key: 'owner', label: 'Owner' },
  { key: 'phone', label: 'Phone' },
  { key: 'students', label: 'Students' },
  { key: 'cost', label: 'Mess cost/mo' },
  { key: 'city', label: 'City' },
  { key: 'status', label: 'Status' },
];

const STATUS_VARIANTS = {
  NEW: 'warning',
  CONTACTED: 'brand',
  PILOT: 'brand',
  ONBOARDED: 'success',
};

const PIPELINE = ['NEW', 'CONTACTED', 'PILOT', 'ONBOARDED'];

export default function Hostels() {
  const { data: leads } = useFetch(() => hostelService.getAdminLeads(), [], []);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = (leads || []).filter((l) => statusFilter === 'ALL' || l.status === statusFilter);

  const renderRow = (lead) => (
    <tr key={lead.id}>
      <td className="px-4 py-3 font-semibold">{lead.hostelName}</td>
      <td className="px-4 py-3 text-sm">{lead.ownerName}</td>
      <td className="px-4 py-3 text-sm">{lead.phone}</td>
      <td className="px-4 py-3 text-sm">{lead.students}</td>
      <td className="px-4 py-3 text-sm">{formatCurrency(lead.monthlyMessCost)}</td>
      <td className="px-4 py-3 text-sm">{lead.city}</td>
      <td className="px-4 py-3">
        <Badge variant={STATUS_VARIANTS[lead.status]}>{lead.status}</Badge>
      </td>
    </tr>
  );

  const counts = PIPELINE.map((s) => ({
    status: s,
    count: (leads || []).filter((l) => l.status === s).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Hostels</h1>
        <p className="text-muted">B2B leads and hostel contracts pipeline.</p>
      </div>

      {/* Pipeline summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {counts.map(({ status, count }) => (
          <div key={status} className="card-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide2 text-muted">{status}</p>
            <p className="mt-1 text-2xl font-extrabold">{count}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3">
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-auto">
          <option value="ALL">All statuses</option>
          {PIPELINE.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>

      <Table columns={COLUMNS} data={filtered} renderRow={renderRow} empty={<p className="py-8 text-center text-muted">No leads in this stage.</p>} />
    </div>
  );
}
