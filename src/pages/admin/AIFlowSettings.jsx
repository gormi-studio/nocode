import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, MessageSquare, Image as ImageIcon, Video, Music, AudioLines,
  Languages, Loader2, Check, AlertCircle,
} from 'lucide-react';
import { aiflowClients } from '@/lib/aiflow';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
function featureIcon(feature) {
  switch (feature) {
    case 'chat': return MessageSquare;
    case 'image': return ImageIcon;
    case 'video': return Video;
    case 'audio': return Music;
    case 'sfx': return AudioLines;
    case 'translate': return Languages;
    default: return Sparkles;
  }
}
function formatModelLabel(id) {
  const s = String(id || '');
  const lower = s.toLowerCase();
  const provider = lower.startsWith('claude')
    ? 'Anthropic'
    : lower.startsWith('gpt') || lower.startsWith('o1') || lower.startsWith('o3') || lower.startsWith('o4')
      ? 'OpenAI'
      : lower.startsWith('gemini') || lower.startsWith('veo')
        ? 'Google'
        : 'AI';
  const label = s
    .replace(/(\d)-(\d)/g, '$1.$2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Gpt/g, 'GPT')
    .replace(/\bpreview\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return `${label || id} (${provider})`;
}
export default function AIFlowSettings() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const client = aiflowClients[0];
        client.setAdminToken(localStorage.getItem('access_token'));
        const { modules: mods } = await client.admin.listModules();
        setModules(mods || []);
        const init = {};
        (mods || []).forEach((m) => {
          init[m.moduleId] = {
            systemPrompt: m.systemPrompt || '',
            model: (m.defaults && m.defaults[m.feature]) || '',
          };
        });
        setDrafts(init);
      } catch (err) {
        if (err?.status === 401) {
          navigate('/admin/login', { replace: true });
          return;
        }
        setError(err?.status === 403 ? '관리자 권한이 필요합니다.' : err?.message || '설정을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);
  const save = async (mod) => {
    setSavingId(mod.moduleId);
    setSavedId(null);
    setError('');
    try {
      const client = aiflowClients[0];
      client.setAdminToken(localStorage.getItem('access_token'));
      const draft = drafts[mod.moduleId];
      await client.admin.updateConfig({
        moduleId: mod.moduleId,
        systemPrompt: draft.systemPrompt,
        defaults: { [mod.feature]: draft.model || undefined },
      });
      setSavedId(mod.moduleId);
      setTimeout(() => setSavedId(null), 2500);
    } catch (err) {
      setError(err?.message || '저장에 실패했습니다.');
    } finally {
      setSavingId(null);
    }
  };
  const updateDraft = (moduleId, patch) => {
    setDrafts((prev) => ({ ...prev, [moduleId]: { ...prev[moduleId], ...patch } }));
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#a98c5b]">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#D84E0B]" />
        AI 모듈 설정을 불러오는 중…
      </div>
    );
  }
  if (error && modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#a98c5b]">
        <AlertCircle className="w-8 h-8 mb-3 text-red-500" />
        {error}
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#D84E0B]/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#D84E0B]" />
        </div>
        <div>
          <h2 className="font-serif-kr text-2xl font-bold text-[#2A211C]">AI 설정</h2>
          <p className="text-sm text-[#a98c5b]">각 AI 기능의 시스템 프롬프트와 기본 모델을 관리합니다.</p>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}
      <Tabs defaultValue={modules[0] ? String(modules[0].moduleId) : ''} className="w-full">
        <TabsList className="flex flex-wrap gap-2 bg-transparent p-0 h-auto mb-6">
          {modules.map((m) => {
            const Icon = featureIcon(m.feature);
            const title = m.useCaseName || m.title || m.feature;
            return (
              <TabsTrigger
                key={m.moduleId}
                value={String(m.moduleId)}
                title={m.feature + (m.useCase && m.useCase !== 'default' ? ` · ${m.useCase}` : '')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#eadfce] bg-white data-[state=active]:bg-[#D84E0B] data-[state=active]:text-white data-[state=active]:border-[#D84E0B]"
              >
                <Icon className="w-4 h-4" />
                <span className="truncate max-w-[140px]">{title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {modules.map((m) => {
          const Icon = featureIcon(m.feature);
          const draft = drafts[m.moduleId] || { systemPrompt: '', model: '' };
          const models = m.models || [];
          const title = m.useCaseName || m.title || m.feature;
          return (
            <TabsContent key={m.moduleId} value={String(m.moduleId)}>
              <div className="rounded-2xl bg-white border border-[#eadfce] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#D84E0B]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D84E0B]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-kr font-bold text-[#2A211C]">{title}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F7F1E8] text-[#8B5E3C]">{m.feature}</span>
                    {m.useCase && m.useCase !== 'default' && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F7F1E8] text-[#8B5E3C]">{m.useCase}</span>
                    )}
                  </div>
                </div>
                <div className="h-px bg-[#f0e8da] mb-5" />
                <label className="block text-sm font-semibold text-[#4a3f36] mb-2">시스템 프롬프트</label>
                <textarea
                  value={draft.systemPrompt}
                  onChange={(e) => updateDraft(m.moduleId, { systemPrompt: e.target.value })}
                  rows={9}
                  className="w-full px-4 py-3 rounded-xl border border-[#e0d3bd] focus:border-[#D84E0B] focus:ring-2 focus:ring-[#D84E0B]/20 outline-none bg-[#FBF7F0] text-sm leading-relaxed resize-y"
                  placeholder="이 AI 기능의 역할과 응답 방식을 정의하세요."
                />
                <p className="text-xs text-[#a98c5b] mt-1.5">{draft.systemPrompt.length}자 · AI가 항상 참고하는 지침입니다.</p>
                <label className="block text-sm font-semibold text-[#4a3f36] mt-5 mb-2">기본 모델</label>
                <select
                  value={draft.model || ''}
                  onChange={(e) => updateDraft(m.moduleId, { model: e.target.value })}
                  disabled={models.length <= 1}
                  className="w-full px-4 py-3 rounded-xl border border-[#e0d3bd] focus:border-[#D84E0B] outline-none bg-white text-sm disabled:opacity-60"
                >
                  {draft.model && !models.includes(draft.model) && (
                    <option value={draft.model}>{formatModelLabel(draft.model)}</option>
                  )}
                  {models.map((mm) => (
                    <option key={mm} value={mm}>{formatModelLabel(mm)}</option>
                  ))}
                </select>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => save(m)}
                    disabled={savingId === m.moduleId}
                    className="px-6 py-2.5 rounded-xl bg-[#D84E0B] text-white font-semibold hover:bg-[#b8420a] disabled:opacity-60 active:scale-95 transition-all flex items-center gap-2"
                  >
                    {savingId === m.moduleId ? <><Loader2 className="w-4 h-4 animate-spin" /> 저장 중…</> : '저장'}
                  </button>
                  {savedId === m.moduleId && (
                    <span className="text-sm text-green-700 flex items-center gap-1"><Check className="w-4 h-4" /> 저장되었습니다</span>
                  )}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}