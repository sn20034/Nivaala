import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = forwardRef(function Input(
  { label, error, type = 'text', className = '', id, ...props }, ref
) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-textBase dark:text-white">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`input-base ${error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});

export const PasswordInput = forwardRef(function PasswordInput(
  { label, error, id, ...props }, ref
) {
  const [show, setShow] = useState(false);
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-textBase dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={show ? 'text' : 'password'}
          className={`input-base pr-12 ${error ? 'border-danger' : ''}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-textBase dark:hover:text-white"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, error, children, id, ...props }, ref
) {
  const selectId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-textBase dark:text-white">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`input-base appearance-none ${error ? 'border-danger' : ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, id, ...props }, ref
) {
  const textareaId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-textBase dark:text-white">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={`input-base resize-none ${error ? 'border-danger' : ''}`}
        rows={3}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});
