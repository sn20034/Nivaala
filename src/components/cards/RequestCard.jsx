import { Calendar, Clock, XCircle, CheckCircle, Pause, X } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDate } from '@/utils/dateHelpers';
import { MEAL_LABELS, SKIP_STATUS } from '@/utils/constants';

const STATUS_CONFIG = {
  CONFIRMED: { variant: 'success', icon: CheckCircle, label: 'Confirmed' },
  TOO_LATE: { variant: 'warning', icon: Clock, label: 'Too late' },
  CANCELLED: { variant: 'default', icon: XCircle, label: 'Cancelled' },
};

export default function RequestCard({ request, onCancel }) {
  const cfg = STATUS_CONFIG[request.status] || STATUS_CONFIG.CONFIRMED;
  const Icon = cfg.icon;
  const isRange = request.fromDate !== request.toDate;

  return (
    <div className="card-surface p-5 text-textBase dark:text-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
            {isRange ? <Pause size={18} /> : <Calendar size={18} />}
          </div>
          <div>
            <p className="font-semibold">
              {isRange
                ? `${formatDate(request.fromDate)} – ${formatDate(request.toDate)}`
                : formatDate(request.fromDate)}
            </p>
            <p className="text-sm text-muted">
              {request.meals.map((m) => MEAL_LABELS[m]).join(' + ')}
              {request.reason && ` · ${request.reason}`}
            </p>
            {request.note && <p className="mt-1 text-xs text-muted italic">"{request.note}"</p>}
          </div>
        </div>
        <Badge variant={cfg.variant}>
          <Icon size={12} /> {cfg.label}
        </Badge>
      </div>

      {request.status === SKIP_STATUS.CONFIRMED && request.creditMeals > 0 && (
        <p className="mt-3 rounded-xl bg-success/10 px-3 py-2 text-sm text-success">
          {request.creditMeals} meal credit{request.creditMeals > 1 ? 's' : ''} carried forward
        </p>
      )}
      {request.status === SKIP_STATUS.TOO_LATE && (
        <p className="mt-3 rounded-xl bg-amber-400/10 px-3 py-2 text-sm text-amber-600 dark:text-amber-400">
          Requested after cut-off — food was already being prepared. No refund for this one.
        </p>
      )}

      {request.status !== SKIP_STATUS.CANCELLED && onCancel && (
        <div className="mt-3 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => onCancel(request.id)}>
            <X size={14} /> Cancel skip / Resume
          </Button>
        </div>
      )}
    </div>
  );
}
