import { useState, useMemo } from 'react';
import { Search, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import Drawer from '@/components/ui/Drawer';
import { Input, Select } from '@/components/ui/Input';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { adminService } from '@/services/adminService';
import { planService } from '@/services/planService';
import { formatDate } from '@/utils/dateHelpers';

const COLUMNS = [
  { key: 'name', label: 'Student' },
  { key: 'hostel', label: 'Hostel' },
  { key: 'plan', label: 'Plan' },
  { key: 'meals', label: 'Meals left' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

export default function Students() {
  const { data: students, refetch } = useFetch(() => adminService.getStudents(), [], []);
  const { data: plans } = useFetch(() => planService.getPlans(), [], []);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const [hostelFilter, setHostelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);

  const hostels = useMemo(() => {
    const set = new Set((students || []).map((s) => s.hostelName));
    return ['ALL', ...Array.from(set)];
  }, [students]);

  const filtered = useMemo(() => {
    return (students || []).filter((s) => {
      const matchQuery = !debouncedQuery ||
        s.fullName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchHostel = hostelFilter === 'ALL' || s.hostelName === hostelFilter;
      const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
      return matchQuery && matchHostel && matchStatus;
    });
  }, [students, debouncedQuery, hostelFilter, statusFilter]);

  const toggleStatus = async (student) => {
    const newStatus = student.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    try {
      await adminService.updateStudentStatus(student.id, newStatus);
      toast.success(`${student.fullName} ${newStatus === 'ACTIVE' ? 'activated' : 'paused'}.`);
      refetch();
      if (selected?.id === student.id) setSelected({ ...student, status: newStatus });
    } catch {
      toast.error('Could not update status.');
    }
  };

  const planName = (id) => plans?.find((p) => p.id === id)?.name || id;

  const renderRow = (s) => (
    <tr key={s.id} className="cursor-pointer hover:bg-cream-border/30 dark:hover:bg-ink-border/30" onClick={() => setSelected(s)}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#F04A23] text-xs font-bold text-white">
            {s.fullName.charAt(0)}
          </span>
          <div>
            <p className="font-semibold">{s.fullName}</p>
            <p className="text-xs text-muted">{s.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{s.hostelName}</td>
      <td className="px-4 py-3 text-sm">{planName(s.planId)}</td>
      <td className="px-4 py-3 text-sm">{s.mealsLeft}</td>
      <td className="px-4 py-3">
        <Badge variant={s.status === 'ACTIVE' ? 'success' : 'warning'}>{s.status}</Badge>
      </td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant={s.status === 'ACTIVE' ? 'ghost' : 'outline'} onClick={() => toggleStatus(s)}>
          {s.status === 'ACTIVE' ? <><UserX size={14} /> Pause</> : <><UserCheck size={14} /> Activate</>}
        </Button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Students</h1>
        <p className="text-muted">Search, filter, and manage student accounts.</p>
      </div>

      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input placeholder="Search by name or email" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
        </div>
        <Select value={hostelFilter} onChange={(e) => setHostelFilter(e.target.value)}>
          {hostels.map((h) => <option key={h} value={h}>{h === 'ALL' ? 'All hostels' : h}</option>)}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PAUSED">Paused</option>
        </Select>
      </div>

      <Table columns={COLUMNS} data={filtered} renderRow={renderRow} empty={<p className="py-8 text-center text-muted">No students match these filters.</p>} />

      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Student detail">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-[#F04A23] text-lg font-bold text-white">
                {selected.fullName.charAt(0)}
              </span>
              <div>
                <p className="font-bold">{selected.fullName}</p>
                <p className="text-sm text-muted">{selected.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Row label="Phone" value={selected.phone} />
              <Row label="Hostel" value={selected.hostelName} />
              <Row label="City" value={selected.city} />
              <Row label="Plan" value={planName(selected.planId)} />
              <Row label="Meals left" value={selected.mealsLeft} />
              <Row label="Joined" value={formatDate(selected.joinedAt)} />
              <Row label="Status" value={<Badge variant={selected.status === 'ACTIVE' ? 'success' : 'warning'}>{selected.status}</Badge>} />
            </div>
            <Button className="w-full" variant={selected.status === 'ACTIVE' ? 'danger' : 'success'} onClick={() => toggleStatus(selected)}>
              {selected.status === 'ACTIVE' ? 'Pause student' : 'Activate student'}
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-cream-border py-2 dark:border-ink-border">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
