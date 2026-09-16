import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check, Ban, ThumbsUp } from 'lucide-react';
import { CurationSet } from '@/api/entities';
import Reveal from '@/components/Reveal';
const QUESTIONS = [
  {
    q: '주로 어디에서 작업하시나요?',
    options: [
      { label: '고정된 매장 (혼자 운영)', type: 'solo' },
      { label: '이동·출장이 잦은 환경', type: 'mobile' },
      { label: '집에서 개인적으로', type: 'home' },
    ],
  },
  {
    q: '사용하는 도구는 몇 종인가요?',
    options: [
      { label: '7종 이상 (종류별 정리 필요)', type: 'solo' },
      { label: '4~6종 (챙겨 다니는 편)', type: 'mobile' },
      { label: '2~3종 (기본 도구)', type: 'home' },
    ],
  },
  {
    q: '무엇을 더 중요하게 생각하세요?',
    options: [
      { label: '좁은 공간의 정리 효율', type: 'solo' },
      { label: '이동할 때의 휴대성', type: 'mobile' },
      { label: '처음이라 다루기 쉬움', type: 'home' },
    ],
  },
  {
    q: '미용 경험은 어느 정도인가요?',
    options: [
      { label: '현직 1인 원장', type: 'solo' },
      { label: '출장·프리랜서 미용사', type: 'mobile' },
      { label: '입문자 / 일반 소비자', type: 'home' },
    ],
  },
];
export default function Curation() {
  const [sets, setSets] = useState([]);
  const [step, setStep] = useState(-1);
  const [scores, setScores] = useState({ solo: 0, mobile: 0, home: 0 });
  const [result, setResult] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await CurationSet.paging({ page: 1, limit: 10, sort: 'id' });
        setSets(res.data.data);
      } catch (e) { console.error(e); }
    })();
  }, []);
  const answer = (type) => {
    const nextScores = { ...scores, [type]: scores[type] + 1 };
    setScores(nextScores);
    if (step + 1 >= QUESTIONS.length) {
      const best = Object.entries(nextScores).sort((a, b) => b[1] - a[1])[0][0];
      const matched = sets.find((s) => s.targetType === best);
      setResult(matched || null);
      setStep(QUESTIONS.length);
    } else {
      setStep(step + 1);
    }
  };
  const restart = () => {
    setStep(-1);
    setScores({ solo: 0, mobile: 0, home: 0 });
    setResult(null);
  };
  return (
    <div className="w-full bg-white">
      <section className="w-full bg-black text-white overflow-hidden relative">
        <img
          src="https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/70" />
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-14 pb-16 md:pt-20">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} /> 추천 구성 · 진단 퀴즈
            </p>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold tracking-tight leading-[1.2]">
              몇 가지 질문으로<br />맞는 세트를 찾아드려요
            </h1>
            <p className="mt-5 text-[#CCCCCC] leading-[1.6] max-w-2xl">
              작업 공간·이동 빈도·사용 도구 수에 따라<br />
              1인 미용실용 · 출장미용용 · 홈케어용 세트를 안내합니다.<br />
              숙련자라면 진단 대신 개별 커스터마이징도 선택할 수 있습니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-6">
          {step === -1 && (
            <Reveal>
              <div className="rounded-[24px] bg-[#F7F7F7] p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-black" strokeWidth={1.75} />
                </div>
                <h2 className="font-serif-kr text-2xl md:text-3xl font-bold text-black leading-[1.2]">진단을 시작해 볼까요?</h2>
                <p className="mt-4 text-[#575757] leading-[1.6]">4개의 간단한 질문에 답하면 상황에 맞는 구성을 추천해 드립니다.</p>
                <button
                  onClick={() => setStep(0)}
                  className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors"
                >
                  진단 시작 <ArrowRight className="w-4 h-4" />
                </button>
                <div className="mt-6">
                  <Link to="/tray-builder" className="text-sm text-[#767676] hover:text-black">
                    이미 구성이 정해졌다면? 커스텀 트레이로 바로 이동
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
          {step >= 0 && step < QUESTIONS.length && (
            <div className="rounded-[24px] bg-[#F7F7F7] p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-[#A97C3F]">Q{step + 1} / {QUESTIONS.length}</span>
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="text-sm text-[#767676] hover:text-black flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.75} /> 이전
                  </button>
                )}
              </div>
              <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-[#A97C3F] rounded-full transition-all duration-500" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
              </div>
              <h2 className="font-serif-kr text-2xl font-bold text-black mb-6 leading-[1.2]">{QUESTIONS[step].q}</h2>
              <div className="space-y-3">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answer(opt.type)}
                    className="w-full text-left rounded-[16px] bg-white p-4 hover:bg-black hover:text-white transition-colors font-medium text-black flex items-center justify-between group"
                  >
                    {opt.label}
                    <ArrowRight className="w-4 h-4 text-[#767676] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === QUESTIONS.length && (
            <Reveal>
              {result ? (
                <div className="rounded-[24px] bg-[#F7F7F7] overflow-hidden">
                  <div className="bg-black text-white p-8">
                    <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-2">추천 구성</p>
                    <h2 className="font-serif-kr text-3xl font-bold leading-[1.2]">{result.name}</h2>
                    <p className="mt-3 text-[#CCCCCC] leading-[1.6]">{result.summary}</p>
                    <p className="mt-4 font-serif-kr text-2xl font-bold text-white">
                      {Number(result.price || 0).toLocaleString('ko-KR')}원
                    </p>
                  </div>
                  <div className="p-8">
                    <p className="text-[#575757] leading-[1.6]">{result.contextCopy}</p>
                    {Array.isArray(result.items) && (
                      <div className="mt-6">
                        <p className="font-semibold text-black mb-3">구성 예시</p>
                        <div className="flex flex-wrap gap-2">
                          {result.items.map((it, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-full bg-white text-sm text-[#575757]">{it}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      <div className="rounded-[16px] bg-white p-5">
                        <p className="font-semibold text-black mb-3 flex items-center gap-2"><ThumbsUp className="w-4 h-4 text-black" strokeWidth={1.75} /> 추천 상황</p>
                        <ul className="space-y-2">
                          {(result.recommendSituations || []).map((s, i) => (
                            <li key={i} className="text-sm text-[#575757] flex items-start gap-2"><Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" strokeWidth={1.75} /> {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[16px] bg-white p-5">
                        <p className="font-semibold text-black mb-3 flex items-center gap-2"><Ban className="w-4 h-4 text-black" strokeWidth={1.75} /> 예외 상황</p>
                        <ul className="space-y-2">
                          {(result.exceptSituations || []).map((s, i) => (
                            <li key={i} className="text-sm text-[#575757] flex items-start gap-2"><Ban className="w-4 h-4 text-black mt-0.5 flex-shrink-0" strokeWidth={1.75} /> {s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <Link to="/tray-builder" className="flex-1 inline-flex items-center justify-center h-12 px-6 rounded-full bg-black text-white text-center font-semibold hover:bg-[#333333] transition-colors">
                        세부 커스터마이징
                      </Link>
                      <Link to="/support" className="flex-1 inline-flex items-center justify-center h-12 px-6 rounded-full border border-black text-black text-center font-semibold hover:bg-black hover:text-white transition-colors">
                        이 구성 문의
                      </Link>
                      <button onClick={restart} className="inline-flex items-center justify-center h-12 px-4 rounded-full bg-white text-[#575757] hover:bg-[#E5E5E5] transition-colors gap-1.5">
                        <RotateCcw className="w-4 h-4" strokeWidth={1.75} /> 다시
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[24px] bg-[#F7F7F7] p-10 text-center">
                  <h2 className="font-serif-kr text-2xl font-bold text-black leading-[1.2]">추천 구성을 불러오는 중입니다</h2>
                  <button onClick={restart} className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors">다시 진단하기</button>
                </div>
              )}
            </Reveal>
          )}
          {/* all sets */}
          {sets.length > 0 && (
            <div className="mt-14">
              <h3 className="font-serif-kr text-2xl font-bold text-black mb-6 text-center leading-[1.2]">전체 추천 세트</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {sets.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.08}>
                    <div className="h-full rounded-[20px] bg-[#F7F7F7] p-6">
                      <span className="text-xs font-semibold text-[#A97C3F]">
                        {s.targetType === 'solo' ? '1인 미용실용' : s.targetType === 'mobile' ? '출장미용용' : '홈케어용'}
                      </span>
                      <h4 className="font-serif-kr text-lg font-bold text-black mt-2 mb-2 leading-[1.3]">{s.name}</h4>
                      <p className="text-sm text-[#575757] leading-[1.5] line-clamp-3">{s.summary}</p>
                      <p className="mt-3 font-bold text-black">{Number(s.price || 0).toLocaleString('ko-KR')}원</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}