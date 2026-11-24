import { useState, useMemo } from 'react';
import { Printer, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import Table from '@/components/ui/Table';
import { useFetch } from '@/hooks/useFetch';
import { skipPauseService } from '@/services/skipPauseService';
import { formatDate, todayISO, addDaysISO } from '@/utils/dateHelpers';
import { MEAL_LABELS, SKIP_STATUS } from '@/utils/constants';

const COLUMNS = [
  { key: 'student', label: 'Student' },
  { key: 'dates', label: 'Dates' },
  { key: 'meals', label: 'Meals' },
  { key: 'reason', label: 'Reason' },
  { key: 'credit', label: 'Credits' },
  { key: 'status', label: 'Status' },
];

export default function Skips() {
  const [date, setDate] = useState(addDaysISO(todayISO(), 1));
  const { data: skips, refetch } = useFetch(() => skipPauseService.getAdminSkips(date), [date], []);

  const filtered = useMemo(() => {
    return (skips || []).filter((s) => s.status !== SKIP_STATUS.CANCELLED);
  }, [skips]);

  const lunchSkips = filtered.filter((s) => s.meals.includes('LUNCH')).length;
  const dinnerSkips = filtered.filter((s) => s.meals.includes('DINNER')).length;

  const renderRow = (s) => (
    <tr key={s.id}>
      <td className="px-4 py-3 text-sm font-medium">{s.studentId}</td>
      <td className="px-4 py-3 text-sm">
        {s.fromDate === s.toDate ? formatDate(s.fromDate) : `${formatDate(s.fromDate)} – ${formatDate(s.toDate)}`}
      </td>
      <td className="px-4 py-3 text-sm">{s.meals.map((m) => MEAL_LABELS[m]).join(' + ')}</td>
      <td className="px-4 py-3 text-sm">{s.reason}</td>
      <td className="px-4 py-3 text-sm">{s.creditMeals}</td>
      <td className="px-4 py-3">
        <Badge variant={s.status === 'CONFIRMED' ? 'success' : 'warning'}>
          {s.status === 'CONFIRMED' ? 'Confirmed' : 'Too late'}
        </Badge>
      </td>
    </tr>
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tightest">Skips</h1>
          <p className="text-muted">All skip/pause requests. Filter by date and print the daily list.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint}><Printer size={14} /> Print</Button>
      </div>

      {/* Date filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10 w-auto" />
        </div>
        <div className="flex gap-2">
          <Badge variant="warning">Lunch skips: {lunchSkips}</Badge>
          <Badge variant="warning">Dinner skips: {dinnerSkips}</Badge>
        </div>
      </div>

      {/* Printable daily list */}
      <div className="card-surface p-5 print:shadow-none">
        <h3 className="mb-4 font-bold">Daily skip list — {formatDate(date)}</h3>
        <Table columns={COLUMNS} data={filtered} renderRow={renderRow} empty={<p className="py-8 text-center text-muted">No skips for this date.</p>} />
      </div>
    </div>
  );
}
