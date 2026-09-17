import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import FallbackImg from '@/components/FallbackImg';
import {
  TRAY_CART_RENDER,
  TRAY_HYBRID_CABINET, TRAY_HYBRID_BOX,
  TRAY_WOOD_CABINET, TRAY_WOOD_BOX,
  TRAY_STAINLESS_CABINET, TRAY_STAINLESS_BOX,
  TRAY_HOLDER_RACK, TRAY_FUR_SWATCH,
} from '@/data/fixtures';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const MATERIALS = [
  {
    id: 'wood', name: '우드', cabinet: TRAY_WOOD_CABINET, box: TRAY_WOOD_BOX,
    colors: [
      { id: 'pink', name: '핑크', hex: '#e8a3aa' },
      { id: 'white', name: '화이트', hex: '#f2f0e9' },
      { id: 'black', name: '블랙', hex: '#222222' },
      { id: 'green', name: '그린', hex: '#558275' },
      { id: 'blue', name: '블루', hex: '#5c8fbd' },
    ],
  },
  {
    id: 'hybrid', name: '하이브리드', cabinet: TRAY_HYBRID_CABINET, box: TRAY_HYBRID_BOX,
    colors: [
      { id: 'white', name: '화이트', hex: '#f1efe8' },
      { id: 'silver', name: '실버', hex: '#aaaaaa' },
    ],
  },
  {
    id: 'stainless', name: '스테인리스', cabinet: TRAY_STAINLESS_CABINET, box: TRAY_STAINLESS_BOX,
    colors: [
      { id: 'silver', name: '실버', hex: '#aaaaaa' },
    ],
  },
];

const FUR_COLORS = [
  { id: 'white', name: '화이트', hex: '#eeeeee' },
  { id: 'ivory', name: '아이보리', hex: '#eadfce' },
  { id: 'ashbrown', name: '애쉬브라운', hex: '#9e8d85' },
  { id: 'pink', name: '핑크', hex: '#eca6bb' },
  { id: 'silver', name: '실버', hex: '#c9c9ce' },
  { id: 'red', name: '레드', hex: '#d71920' },
  { id: 'lightpurple', name: '연퍼플', hex: '#bfa4e8' },
  { id: 'ashpurple', name: '애쉬퍼플', hex: '#88738d' },
  { id: 'deeppurple', name: '진퍼플', hex: '#684777' },
  { id: 'mint', name: '민트', hex: '#75c7c0' },
  { id: 'blue', name: '블루', hex: '#418bce' },
  { id: 'black', name: '블랙', hex: '#171717' },
];

const HOLDER_COLORS = [
  { id: 'white', name: '화이트', hex: '#f0f0ed' },
  { id: 'yellow', name: '옐로우', hex: '#f4ce3d' },
  { id: 'pink', name: '핑크', hex: '#e98ca7' },
  { id: 'orange', name: '오렌지', hex: '#f47628' },
  { id: 'mint', name: '민트', hex: '#78bdb5' },
  { id: 'green', name: '그린', hex: '#267863' },
  { id: 'blue', name: '블루', hex: '#4c8bc8' },
  { id: 'purple', name: '퍼플', hex: '#8551b8' },
  { id: 'black', name: '블랙', hex: '#171717' },
];

function OptionButton({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left border rounded transition-colors ${
        selected ? 'border-2 border-black' : 'border border-[#ddd] hover:border-[#888]'
      } bg-white ${className}`}
    >
      {children}
    </button>
  );
}

function ColorSwatch({ selected, onClick, hex, name }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-[7px] w-14">
      <span
        className={`block w-10 h-10 rounded-full border border-black/10 ${selected ? 'outline outline-2 outline-black outline-offset-[3px]' : ''}`}
        style={{ backgroundColor: hex }}
      />
      <span className="block text-xs text-[#555] whitespace-nowrap">{name}</span>
    </button>
  );
}

function OptionSection({ n, title, children }) {
  return (
    <div className="mb-[34px]">
      <h3 className="flex items-center gap-[18px] text-[22px] font-bold tracking-[-0.04em] mb-4">
        <span className="text-[21px] font-bold">{n}</span> {title}
      </h3>
      {children}
    </div>
  );
}

export default function TrayBuilder() {
  const [material, setMaterial] = useState('hybrid');
  const [mainColor, setMainColor] = useState('white');
  const [toolBox, setToolBox] = useState(true);
  const [scissorHolder, setScissorHolder] = useState(true);
  const [furColor, setFurColor] = useState('white');
  const [holderColor, setHolderColor] = useState('white');
  const [rollBrushHolder, setRollBrushHolder] = useState(true);

  const selectedMaterial = MATERIALS.find((m) => m.id === material);

  const handleMaterialSelect = (id) => {
    const mat = MATERIALS.find((m) => m.id === id);
    setMaterial(id);
    setMainColor(mat.colors[0].id);
  };

  // Filename ready for per-combination product renders once the brand
  // supplies them; none exist yet, so FallbackImg falls back to the real
  // per-material cabinet render below in the meantime.
  let previewFile = `/images/tray-builder/tray-${material}-${mainColor}`;
  if (toolBox) previewFile += '-toolbox';
  if (scissorHolder) previewFile += `-holder-${holderColor}-${furColor}`;
  if (rollBrushHolder) previewFile += '-rollbrush';
  previewFile += '.png';

  return (
    <div className="w-full">
      <section className="w-full bg-white overflow-hidden relative">
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-12 pb-10 md:pt-16">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">커스텀 트레이 빌더</p>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">
              소재부터 롤빗꽂이까지<br />직접 조합해 보세요
            </h1>
            <p className="mt-5 text-[#575757] leading-[1.6]">
              소재 → 색상 → 도구함 → 가위꽂이 → 롤빗꽂이 순서로 구성하며 실시간 미리보기를 확인합니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="w-[min(1440px,calc(100%-80px))] mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_620px] gap-12 lg:gap-[100px] items-start">
            {/* PREVIEW */}
            <div className="lg:sticky lg:top-20 min-h-[420px] lg:min-h-[760px] flex items-center justify-center">
              <FallbackImg
                src={BASE + previewFile}
                fallback={selectedMaterial.cabinet || TRAY_CART_RENDER}
                alt="트레이 미리보기"
                className="block w-[min(540px,90%)] max-h-[720px] object-contain mix-blend-multiply"
              />
            </div>
            {/* OPTIONS */}
            <div className="w-full">
              <OptionSection n="01" title="소재 선택">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {MATERIALS.map((m) => (
                    <OptionButton
                      key={m.id}
                      selected={material === m.id}
                      onClick={() => handleMaterialSelect(m.id)}
                      className="h-[120px] sm:h-[190px] p-[18px] flex flex-row sm:flex-col items-center justify-center gap-2.5"
                    >
                      <img src={m.box} alt={m.name} className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] object-contain mix-blend-multiply flex-shrink-0" />
                      <strong className="text-[17px] font-semibold">{m.name}</strong>
                    </OptionButton>
                  ))}
                </div>
              </OptionSection>

              <OptionSection n="02" title="색상 선택">
                <div className="flex flex-wrap gap-3">
                  {selectedMaterial.colors.map((c) => (
                    <OptionButton
                      key={c.id}
                      selected={mainColor === c.id}
                      onClick={() => setMainColor(c.id)}
                      className="min-w-[180px] h-[58px] px-5 flex items-center gap-3.5 text-[16px]"
                    >
                      <span className="w-8 h-8 rounded-full border border-[#ddd] flex-shrink-0" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </OptionButton>
                  ))}
                </div>
              </OptionSection>

              <OptionSection n="03" title="도구함">
                <div className="grid grid-cols-2 gap-3.5 max-w-full sm:max-w-[434px]">
                  <OptionButton selected={toolBox} onClick={() => setToolBox(true)} className="h-[52px] flex items-center justify-center text-[16px] font-medium">
                    있음
                  </OptionButton>
                  <OptionButton selected={!toolBox} onClick={() => setToolBox(false)} className="h-[52px] flex items-center justify-center text-[16px] font-medium">
                    없음
                  </OptionButton>
                </div>
              </OptionSection>

              <OptionSection n="04" title="가위꽂이">
                <img src={TRAY_HOLDER_RACK} alt="가위꽂이함" className="w-full max-w-[280px] h-auto object-contain mix-blend-multiply mb-4" />
                <div className="grid grid-cols-2 gap-3.5 max-w-full sm:max-w-[434px]">
                  <OptionButton selected={scissorHolder} onClick={() => setScissorHolder(true)} className="h-[52px] flex items-center justify-center text-[16px] font-medium">
                    있음
                  </OptionButton>
                  <OptionButton selected={!scissorHolder} onClick={() => setScissorHolder(false)} className="h-[52px] flex items-center justify-center text-[16px] font-medium">
                    없음
                  </OptionButton>
                </div>

                {scissorHolder && (
                  <div className="mt-[22px]">
                    <div>
                      <h4 className="flex items-center gap-2 text-[17px] font-bold mb-3.5">
                        <img src={TRAY_FUR_SWATCH} alt="" className="w-6 h-6 rounded object-cover flex-shrink-0" />
                        밍크털 색상
                      </h4>
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-x-4 gap-y-4 sm:w-[440px]">
                        {FUR_COLORS.map((c) => (
                          <ColorSwatch key={c.id} selected={furColor === c.id} onClick={() => setFurColor(c.id)} hex={c.hex} name={c.name} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-7">
                      <h4 className="text-[17px] font-bold mb-3.5">가위꽂이함 색상</h4>
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-x-4 gap-y-4 sm:w-[440px]">
                        {HOLDER_COLORS.map((c) => (
                          <ColorSwatch key={c.id} selected={holderColor === c.id} onClick={() => setHolderColor(c.id)} hex={c.hex} name={c.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </OptionSection>

              <OptionSection n="05" title="롤빗꽂이">
                <div className="grid grid-cols-2 gap-3.5 max-w-full sm:max-w-[434px]">
                  <OptionButton selected={rollBrushHolder} onClick={() => setRollBrushHolder(true)} className="h-[52px] flex items-center justify-center text-[16px] font-medium">
                    있음
                  </OptionButton>
                  <OptionButton selected={!rollBrushHolder} onClick={() => setRollBrushHolder(false)} className="h-[52px] flex items-center justify-center text-[16px] font-medium">
                    없음
                  </OptionButton>
                </div>
              </OptionSection>

              <div className="flex justify-end mt-11">
                <Link
                  to="/support"
                  className="inline-flex items-center justify-center min-w-[260px] w-full sm:w-auto h-[54px] px-9 rounded-full bg-black text-white font-bold hover:bg-[#333333] active:scale-[0.98] transition-all"
                >
                  구매 문의하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
