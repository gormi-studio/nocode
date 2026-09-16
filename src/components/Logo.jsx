export default function Logo({ variant = 'default', className = '' }) {
  const inverted = variant === 'inverted';
  return (
    <span
      className={`font-serif-kr font-bold text-2xl leading-none tracking-tight ${
        inverted ? 'text-white' : 'text-black'
      } ${className}`}
    >
      고르미
    </span>
  );
}
