import { Scissors } from 'lucide-react';

export default function Logo({ variant = 'default', className = '' }) {
  const inverted = variant === 'inverted';
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          inverted ? 'bg-white/10' : 'bg-[#A97C3F]/10'
        }`}
      >
        <Scissors className={`w-4 h-4 ${inverted ? 'text-[#D9BE93]' : 'text-[#A97C3F]'}`} />
      </span>
      <span
        className={`font-serif-kr font-bold text-xl leading-none tracking-tight ${
          inverted ? 'text-white' : 'text-[#1E1B18]'
        }`}
      >
        고르미
      </span>
    </span>
  );
}
