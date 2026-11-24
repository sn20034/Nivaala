import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Input, Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { validators } from '@/utils/validators';
import { ROUTES } from '@/routes/routePaths';

export default function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: { role: 'STUDENT' },
  });
  const role = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await signup({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role,
        hostelName: data.hostelName,
        city: data.city,
      });
      toast.success(`Welcome to Nivaala, ${user.boxName}!`);
      navigate(user.role === 'ADMIN' ? ROUTES.ADMIN.DASHBOARD : ROUTES.STUDENT.DASHBOARD);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full name"
        name="fullName"
        placeholder="Your name"
        {...register('fullName', { validate: validators.required('Enter your full name') })}
        error={errors.fullName?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Phone"
          name="phone"
          placeholder="10-digit mobile"
          {...register('phone', { validate: validators.phone() })}
          error={errors.phone?.message}
        />
        <Select label="I am a..." name="role" {...register('role')}>
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Hostel Owner</option>
        </Select>
      </div>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        {...register('email', { validate: validators.email() })}
        error={errors.email?.message}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="At least 6 characters"
        {...register('password', { validate: validators.password() })}
        error={errors.password?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Hostel / PG name"
          name="hostelName"
          placeholder="Sunrise Hostel"
          {...register('hostelName', { validate: validators.required('Enter your hostel / PG name') })}
          error={errors.hostelName?.message}
        />
        <Input
          label="City"
          name="city"
          placeholder="Pune"
          {...register('city', { validate: validators.required('Enter your city') })}
          error={errors.city?.message}
        />
      </div>
      <Button type="submit" className="w-full" loading={loading}>Create account →</Button>
      <p className="text-center text-xs text-muted">
        By signing up you agree to Nivaala's terms. We'll never share your details.
      </p>
    </form>
  );
}
