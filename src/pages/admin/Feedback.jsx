import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useFetch } from '@/hooks/useFetch';
import { adminService } from '@/services/adminService';
import { formatDate } from '@/utils/dateHelpers';

export default function Feedback() {
  const { data: feedback, refetch } = useFetch(() => adminService.getFeedback(), [], []);

  const resolve = async (id) => {
    try {
      await adminService.resolveFeedback(id);
      toast.success('Feedback resolved.');
      refetch();
    } catch {
      toast.error('Could not resolve.');
    }
  };

  const ratings = (feedback || []).filter((f) => f.type === 'RATING');
  const complaints = (feedback || []).filter((f) => f.type === 'COMPLAINT');

  const Card = ({ item }) => (
    <div className="card-surface p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.type === 'COMPLAINT' ? 'bg-danger/15 text-danger' : 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400'}`}>
            {item.type === 'COMPLAINT' ? <MessageSquare size={18} /> : <Star size={18} />}
          </div>
          <div>
            <p className="font-semibold">{item.studentName}</p>
            <p className="text-xs text-muted">{formatDate(item.createdAt)} · Order {item.orderId}</p>
          </div>
        </div>
        <Badge variant={item.status === 'OPEN' ? 'warning' : 'success'}>{item.status}</Badge>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < item.rating ? 'fill-brand-500 text-brand-500' : 'text-cream-border dark:text-ink-border'} />
        ))}
      </div>
      <p className="mt-2 text-sm text-textBase dark:text-white">"{item.comment}"</p>
      {item.status === 'OPEN' && (
        <div className="mt-3 flex justify-end">
          <Button size="sm" variant="success" onClick={() => resolve(item.id)}>
            <CheckCircle size={14} /> Resolve
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Feedback</h1>
        <p className="text-muted">Ratings and complaints. Resolve what's open.</p>
      </div>

      <div>
        <h3 className="mb-3 font-bold">Complaints ({complaints.length})</h3>
        {complaints.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {complaints.map((c) => <Card key={c.id} item={c} />)}
          </div>
        ) : (
          <p className="py-6 text-center text-muted">No complaints. All clear!</p>
        )}
      </div>

      <div>
        <h3 className="mb-3 font-bold">Ratings ({ratings.length})</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {ratings.map((r) => <Card key={r.id} item={r} />)}
        </div>
      </div>
    </div>
  );
}
