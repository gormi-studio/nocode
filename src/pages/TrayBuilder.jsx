import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, Sparkles, ArrowRight, Info, RotateCcw,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
const MATERIALS = [
  { id: 'natural', name: '천연가죽', en: 'natural leather', price: 89000, desc: '고급스러운 질감이 특징이나 습기·직사광선 관리가 필요합니다.', note: '관리 여건이 되고 질감을 중시하는 경우' },
  { id: 'synthetic', name: '합성가죽', en: 'synthetic leather', price: 49000, desc: '물세척이 간편해 매일 사용하는 작업대에도 부담 없는 소재입니다.', note: '습기 많은 환경, 매일 사용하는 경우' },
];
const COLORS = [
  { id: 'camel', name: '카멜', en: 'camel brown', hex: '#B07A4A' },
  { id: 'charcoal', name: '차콜', en: 'charcoal', hex: '#3C3A38' },
  { id: 'burgundy', name: '버건디', en: 'burgundy', hex: '#6E2A32' },
  { id: 'ivory', name: '아이보리', en: 'ivory', hex: '#E3D6BF' },
  { id: 'orange', name: '선셋 오렌지', en: 'sunset orange', hex: '#D84E0B' },
  { id: 'sage', name: '세이지', en: 'sage green', hex: '#8A9576' },
];
const TOOLBOX = { id: 'toolbox', name: '도구함', en: 'attached tool box', price: 32000 };
const MODULES = [
  { id: 'roll', name: '롤빗 정리대', en: 'roll brush holder', price: 18000 },
  { id: 'scissors', name: '가위 정리대', en: 'scissors holder', price: 22000 },
  { id: 'brush', name: '브러쉬 홀더', en: 'brush holder', price: 16000 },
  { id: 'clip', name: '핀·클립 트레이', en: 'clip tray', price: 12000 },
];
const PRESET = { material: 'synthetic', color: 'camel', toolbox: true, modules: ['scissors', 'brush'] };
const won = (n) => n.toLocaleString('ko-KR') + '원';
export default function TrayBuilder() {
  const [material, setMaterial] = useState('synthetic');
  const [color, setColor] = useState('camel');
  const [hasToolbox, setHasToolbox] = useState(false);
  const [modules, setModules] = useState([]);
  const selectedMaterial = MATERIALS.find((m) => m.id === material);
  const selectedColor = COLORS.find((c) => c.id === color);
  const total = useMemo(() => {
    let t = selectedMaterial.price;
    if (hasToolbox) t += TOOLBOX.price;
    modules.forEach((mid) => {
      const mod = MODULES.find((m) => m.id === mid);
      if (mod) t += mod.price;
    });
    return t;
  }, [selectedMaterial, hasToolbox, modules]);
  const toggleModule = (id) => {
    setModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };
  const applyPreset = () => {
    setMaterial(PRESET.material);
    setColor(PRESET.color);
    setHasToolbox(PRESET.toolbox);
    setModules(PRESET.modules);
  };
  const resetAll = () => {
    setMaterial('synthetic');
    setColor('orange');
    setHasToolbox(false);
    setModules([]);
  };
  const moduleSwatch = {
    roll: '#c98a4e',
    scissors: '#7a7570',
    brush: '#b06a3a',
    clip: '#8a9576',
  };
  return (
    <div className="w-full">
      <section className="w-full bg-[#F2F1EE] overflow-hidden relative">
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#A97C3F]/12 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 md:pt-16">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A97C3F]/10 text-[#A97C3F] text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> 커스텀 트레이 빌더
            </span>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-[#1E1B18] mt-5 leading-tight">
              소재부터 모듈까지<br />직접 조합해 보세요
            </h1>
            <p className="mt-5 text-[#4F4A40] leading-relaxed">
              소재 → 색상 → 도구함 → 모듈 4단계로 구성하며 실시간 미리보기와 예상 가격을 확인합니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full pb-20 bg-[#F2F1EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* preset banner */}
          <div className="mb-8 rounded-3xl bg-[#1E1B18] text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-[#A97C3F]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#D9BE93]" />
              </div>
              <div>
                <p className="font-serif-kr font-bold">많이 선택한 구성으로 시작하기</p>
                <p className="text-sm text-white/60">합성가죽 · 카멜 · 도구함 + 가위/브러쉬 정리</p>
              </div>
            </div>
            <button
              onClick={applyPreset}
              className="px-5 py-2.5 rounded-xl bg-white text-[#1E1B18] font-semibold hover:bg-[#E2DFD6] active:scale-95 transition-all"
            >
              이 구성 적용
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* STEPS */}
            <div className="space-y-6">
              {/* STEP 1 */}
              <div className="rounded-3xl bg-white border border-[#DAD6CC] p-6">
                <StepTitle n="01" title="소재 선택" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {MATERIALS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      className={`text-left rounded-2xl border-2 p-4 transition-all ${
                        material === m.id ? 'border-[#A97C3F] bg-[#A97C3F]/5' : 'border-[#DAD6CC] hover:border-[#A97C3F]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif-kr font-bold text-[#1E1B18]">{m.name}</span>
                        {material === m.id && <Check className="w-5 h-5 text-[#A97C3F]" />}
                      </div>
                      <p className="text-xs text-[#5C574C] mt-2 leading-relaxed">{m.desc}</p>
                      <p className="text-sm font-semibold text-[#A97C3F] mt-2">{won(m.price)}</p>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#948A76] flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  천연가죽은 습기·직사광선 관리가 필요합니다. 매일 물세척이 필요한 환경에는 합성가죽을 권장합니다.
                </p>
              </div>
              {/* STEP 2 */}
              <div className="rounded-3xl bg-white border border-[#DAD6CC] p-6">
                <StepTitle n="02" title="색상 선택" />
                <div className="flex flex-wrap gap-3 mt-4">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      className="flex flex-col items-center gap-1.5"
                      aria-label={c.name}
                    >
                      <span
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          color === c.id ? 'border-[#1E1B18] scale-110' : 'border-[#D6D1C4]'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className={`text-xs ${color === c.id ? 'text-[#1E1B18] font-semibold' : 'text-[#948A76]'}`}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* STEP 3 */}
              <div className="rounded-3xl bg-white border border-[#DAD6CC] p-6">
                <StepTitle n="03" title="도구함 추가" />
                <button
                  onClick={() => setHasToolbox((v) => !v)}
                  className={`w-full text-left rounded-2xl border-2 p-4 mt-4 transition-all flex items-center justify-between ${
                    hasToolbox ? 'border-[#A97C3F] bg-[#A97C3F]/5' : 'border-[#DAD6CC] hover:border-[#A97C3F]/40'
                  }`}
                >
                  <div>
                    <span className="font-serif-kr font-bold text-[#1E1B18]">도구함 포함</span>
                    <p className="text-xs text-[#5C574C] mt-1">자주 쓰는 도구를 한 곳에 모아두는 별도 함</p>
                    <p className="text-sm font-semibold text-[#A97C3F] mt-1">+ {won(TOOLBOX.price)}</p>
                  </div>
                  <span
                    className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                      hasToolbox ? 'bg-[#A97C3F] justify-end' : 'bg-[#D6D1C4] justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white" />
                  </span>
                </button>
              </div>
              {/* STEP 4 */}
              <div className="rounded-3xl bg-white border border-[#DAD6CC] p-6">
                <StepTitle n="04" title="모듈 조합" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {MODULES.map((mod) => {
                    const on = modules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`text-left rounded-2xl border-2 p-4 transition-all ${
                          on ? 'border-[#A97C3F] bg-[#A97C3F]/5' : 'border-[#DAD6CC] hover:border-[#A97C3F]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1E1B18]">{mod.name}</span>
                          {on && <Check className="w-4 h-4 text-[#A97C3F]" />}
                        </div>
                        <p className="text-sm font-semibold text-[#A97C3F] mt-2">+ {won(mod.price)}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* PREVIEW / SUMMARY */}
            <div className="lg:sticky lg:top-24 h-fit space-y-6">
              <div className="rounded-3xl bg-[#EBE9E3]/70 border border-[#DCD8CE] p-6 shadow-[0_20px_60px_-30px_rgba(169,124,63,0.3)]">
                <p className="font-serif-kr font-bold text-[#1E1B18] mb-4">실시간 미리보기</p>
                {/* CSS preview */}
                <div className="rounded-2xl bg-gradient-to-b from-[#EBE9E3] to-[#E6E3DC] p-6 flex items-center justify-center">
                  <div
                    className="w-full max-w-xs aspect-[3/2] rounded-2xl relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),0_10px_25px_-10px_rgba(0,0,0,0.3)] transition-colors duration-500"
                    style={{ backgroundColor: selectedColor.hex }}
                  >
                    {material === 'natural' && (
                      <div className="absolute inset-0 rounded-2xl opacity-20 mix-blend-overlay"
                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0 1px, transparent 1px 4px)' }} />
                    )}
                    <div className="absolute inset-2 rounded-xl border border-black/10" />
                    {/* modules slots */}
                    <div className="absolute inset-4 flex flex-wrap gap-2 items-start content-start">
                      {modules.map((mid) => (
                        <span
                          key={mid}
                          className="rounded-md shadow-inner"
                          style={{ backgroundColor: moduleSwatch[mid], width: '28%', height: '38%', opacity: 0.85 }}
                        />
                      ))}
                    </div>
                    {hasToolbox && (
                      <span className="absolute -right-2 -bottom-2 w-10 h-10 rounded-lg bg-[#433E36] shadow-lg" />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#948A76]">
                  <span
                    className="w-3 h-3 rounded-full border border-[#D6D1C4]"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  {selectedMaterial.name} · {selectedColor.name}
                  {hasToolbox && ' · 도구함'}
                  {modules.length > 0 && ` · 모듈 ${modules.length}종`}
                </div>
              </div>
              {/* Summary */}
              <div className="rounded-3xl bg-[#1E1B18] text-white p-6">
                <p className="text-white/60 text-sm mb-1">예상 구성 가격</p>
                <p className="font-serif-kr text-3xl font-bold text-[#D9BE93]">{won(total)}</p>
                <div className="mt-4 space-y-1.5 text-sm text-white/70 border-t border-white/10 pt-4">
                  <div className="flex justify-between"><span>{selectedMaterial.name}</span><span>{won(selectedMaterial.price)}</span></div>
                  {hasToolbox && <div className="flex justify-between"><span>도구함</span><span>{won(TOOLBOX.price)}</span></div>}
                  {modules.map((mid) => {
                    const mod = MODULES.find((m) => m.id === mid);
                    return <div key={mid} className="flex justify-between"><span>{mod.name}</span><span>{won(mod.price)}</span></div>;
                  })}
                </div>
                <div className="mt-5 flex gap-2">
                  <Link
                    to="/support"
                    className="flex-1 px-5 py-3 rounded-xl bg-[#A97C3F] text-white text-center font-semibold hover:bg-[#7D5D2E] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    구성 문의하기 <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={resetAll}
                    className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="초기화"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/40">
                  커스텀 제작 상품은 단순 변심에 의한 교환·반품이 제한될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function StepTitle({ n, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif-kr text-2xl font-bold text-[#A97C3F]">{n}</span>
      <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">{title}</h3>
    </div>
  );
}