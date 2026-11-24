import { Link } from 'react-router-dom';

export default function Button({
  children, variant = 'primary', size = 'md', to, href,
  type = 'button', className = '', loading = false, disabled, ...props
}) {
  const variants = {
    primary: 'btn-primary',
    dark: 'btn-dark',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-pill bg-danger text-white hover:brightness-110',
    success: 'btn-pill bg-success text-white hover:brightness-110',
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  const cls = `${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </>
  );

  if (to) return <Link to={to} className={cls} {...props}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{content}</a>;
  return (
    <button type={type} className={cls} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
