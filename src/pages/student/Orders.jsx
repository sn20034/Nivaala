import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';
import { useFetch } from '@/hooks/useFetch';
import { orderService } from '@/services/orderService';
import { studentService } from '@/services/studentService';
import { formatCurrency, formatDate } from '@/utils/dateHelpers';
import { ORDER_STATUS } from '@/utils/constants';

const STATUS_FLOW = ['Preparing', 'Packed', 'Out for delivery', 'Delivered'];

export default function Orders() {
  const { data: orders, loading, refetch } = useFetch(() => orderService.getStudentOrders(), [], []);
  const [ratingModal, setRatingModal] = useState(null);
  const [complaintModal, setComplaintModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitRating = async () => {
    setSubmitting(true);
    try {
      await studentService.submitFeedback({ orderId: ratingModal.id, rating, comment, type: 'RATING' });
      toast.success('Thanks for your feedback!');
      setRatingModal(null);
      setComment('');
      setRating(5);
    } catch {
      toast.error('Could not submit rating.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitComplaint = async () => {
    setSubmitting(true);
    try {
      await studentService.submitFeedback({ orderId: complaintModal.id, rating: 2, comment, type: 'COMPLAINT' });
      toast.success('Complaint submitted. We\'ll look into it.');
      setComplaintModal(null);
      setComment('');
    } catch {
      toast.error('Could not submit complaint.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusIndex = (status) => STATUS_FLOW.indexOf(status);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tightest">Orders</h1>
        <p className="text-muted">Your order history, ratings, and complaints.</p>
      </div>

      {loading ? (
        <p className="text-muted">Loading orders…</p>
      ) : (orders || []).length === 0 ? (
        <p className="py-12 text-center text-muted">No orders yet. Start a trial to see your first box here.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const idx = statusIndex(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-surface p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.mealTypes.join(' + ')}</p>
                    <p className="text-sm text-muted">{formatDate(order.startDate)} · {formatCurrency(order.total)}</p>
                    {order.note && <p className="mt-1 text-xs text-muted italic">"{order.note}"</p>}
                  </div>
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'brand'}>{order.status}</Badge>
                </div>

                {/* Status timeline */}
                <div className="mt-4 flex items-center">
                  {STATUS_FLOW.map((step, i) => (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          i <= idx ? 'bg-success text-white' : 'bg-cream-border text-muted dark:bg-ink-border'
                        }`}>
                          {i + 1}
                        </div>
                        <span className="hidden text-[10px] font-medium sm:block">{step}</span>
                      </div>
                      {i < STATUS_FLOW.length - 1 && (
                        <div className={`mx-1 h-0.5 flex-1 rounded-full ${i < idx ? 'bg-success' : 'bg-cream-border dark:bg-ink-border'}`} />
                      )}
                    </div>
                  ))}
                </div>

                {order.status === 'Delivered' && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setRatingModal(order)}>
                      <Star size={14} /> Rate
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setComplaintModal(order)}>
                      <MessageSquare size={14} /> Complaint
                    </Button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Rating modal */}
      <Modal open={!!ratingModal} onClose={() => setRatingModal(null)} title="Rate your meal">
        <p className="mb-3 text-sm text-muted">How was your meal on {ratingModal && formatDate(ratingModal.startDate)}?</p>
        <div className="mb-4 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}>
              <Star size={28} className={n <= rating ? 'fill-brand-500 text-brand-500' : 'text-cream-border dark:text-ink-border'} />
            </button>
          ))}
        </div>
        <Textarea label="Comment (optional)" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Dal bilkul maa jaisa tha!" />
        <div className="mt-4 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setRatingModal(null)}>Cancel</Button>
          <Button className="flex-1" loading={submitting} onClick={submitRating}><Send size={14} /> Submit</Button>
        </div>
      </Modal>

      {/* Complaint modal */}
      <Modal open={!!complaintModal} onClose={() => setComplaintModal(null)} title="File a complaint">
        <p className="mb-3 text-sm text-muted">Tell us what went wrong. We take every complaint seriously.</p>
        <Textarea label="What happened?" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Roti thodi zyada thick thi aaj..." rows={5} />
        <div className="mt-4 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setComplaintModal(null)}>Cancel</Button>
          <Button variant="danger" className="flex-1" loading={submitting} onClick={submitComplaint}><Send size={14} /> Submit complaint</Button>
        </div>
      </Modal>
    </div>
  );
}
