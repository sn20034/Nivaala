import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input, Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { hostelService } from '@/services/hostelService';
import { validators } from '@/utils/validators';

export default function HostelLeadForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await hostelService.submitLead(data);
      toast.success("Got it! We'll call you within 24 hours.");
      reset();
    } catch (err) {
      toast.error('Could not submit. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Hostel name" name="hostelName" placeholder="Sunrise Hostel" {...register('hostelName', { validate: validators.required() })} error={errors.hostelName?.message} />
        <Input label="Owner name" name="ownerName" placeholder="Mr. Verma" {...register('ownerName', { validate: validators.required() })} error={errors.ownerName?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Phone" name="phone" placeholder="10-digit mobile" {...register('phone', { validate: validators.phone() })} error={errors.phone?.message} />
        <Input label="City" name="city" placeholder="Pune" {...register('city', { validate: validators.required() })} error={errors.city?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Number of students" name="students" type="number" placeholder="40" {...register('students', { validate: validators.required() })} error={errors.students?.message} />
        <Input label="Current monthly mess cost" name="monthlyMessCost" type="number" placeholder="3500" {...register('monthlyMessCost', { validate: validators.required() })} error={errors.monthlyMessCost?.message} />
      </div>
      <Button type="submit" className="w-full" loading={loading}>Partner with Nivaala →</Button>
    </form>
  );
}
