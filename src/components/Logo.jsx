export default function Logo({ variant = 'default', className = '' }) {
  const inverted = variant === 'inverted';
  return (
    <span
      className={`font-serif-kr font-extrabold text-2xl leading-none tracking-tight ${
        inverted ? 'text-white' : 'text-[#1E1B18]'
      } ${className}`}
    >
      고르미
    </span>
  );
}
