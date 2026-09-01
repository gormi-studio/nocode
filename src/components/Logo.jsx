import { Scissors } from 'lucide-react';

export default function Logo({ variant = 'default', className = '' }) {
  const inverted = variant === 'inverted';
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          inverted ? 'bg-white/10' : 'bg-[#D84E0B]/10'
        }`}
      >
        <Scissors className={`w-4 h-4 ${inverted ? 'text-[#f0a97e]' : 'text-[#D84E0B]'}`} />
      </span>
      <span
        className={`font-serif-kr font-bold text-xl leading-none tracking-tight ${
          inverted ? 'text-white' : 'text-[#2A211C]'
        }`}
      >
        고르미
      </span>
    </span>
  );
}
