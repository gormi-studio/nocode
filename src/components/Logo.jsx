export default function Logo({ variant = 'default', className = '' }) {
  const inverted = variant === 'inverted';
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-serif-kr font-extrabold text-2xl tracking-tight ${
          inverted ? 'text-white' : 'text-[#1E1B18]'
        }`}
      >
        고르미
      </span>
      <span
        className={`text-[11px] font-semibold tracking-[0.2em] mt-0.5 ${
          inverted ? 'text-white/60' : 'text-[#948A76]'
        }`}
      >
        GORMI
      </span>
    </span>
  );
}
