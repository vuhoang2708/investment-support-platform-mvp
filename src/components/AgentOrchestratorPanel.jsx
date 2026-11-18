import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Eye,
  FileText,
  Layers,
  ShieldAlert,
  UserCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { AGENT_ANALYSES, CLIENT_PROFILES, MANDATORY_DISCLAIMER } from '../data/platformData';

const CLIENT_KEY_BY_ID = {
  'client-group-a': 'short',
  'client-group-b': 'medium',
  'client-group-c': 'long',
};

const ROLE_STYLES = {
  specialist: {
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    label: 'Agent Chuyên Trách',
    icon: Bot,
  },
  synthesizer: {
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    label: 'Support Tổng',
    icon: Cpu,
  },
  observer: {
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    label: 'Người Quan Sát Tổng',
    icon: UserCheck,
  },
};

export default function AgentOrchestratorPanel({ activeClientKey, onSelectClientKey }) {
  const [selectedAgentId, setSelectedAgentId] = useState(
    AGENT_ANALYSES.find((a) => a.id === 'agent-synthesizer')?.id || AGENT_ANALYSES[0]?.id
  );

  const specialists = AGENT_ANALYSES.filter((a) => a.roleType === 'specialist');
  const synthesizer = AGENT_ANALYSES.find((a) => a.roleType === 'synthesizer');
  const observer = AGENT_ANALYSES.find((a) => a.roleType === 'observer');

  const activeAgent =
    AGENT_ANALYSES.find((agent) => agent.id === selectedAgentId) || AGENT_ANALYSES[0];

  const activeRoleMeta = ROLE_STYLES[activeAgent?.roleType] || ROLE_STYLES.specialist;
  const ActiveRoleIcon = activeRoleMeta.icon;

  return (
    <div className="space-y-6">
      {/* Section 1: Multi-Agent Orchestrator Diagram + Inspector */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 ring-1 ring-inset ring-indigo-600/20">
              Mô Hình Đa Tác Nhân · Human-in-the-Loop
            </span>
            <span className="text-xs text-slate-500">
              Nhấp vào từng nút tác nhân để xem đầu ra phân tích &amp; cảnh báo điểm mù
            </span>
          </div>
          <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">
            Kiến Trúc 3 Agent Chuyên Trách &rarr; 1 Support Tổng &rarr; Người Quan Sát Tổng (Advisor)
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Visual Hierarchy Diagram */}
          <div className="space-y-3 lg:col-span-6">
            {/* Tier 1: 3 Specialist Agents */}
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Tầng 1 · 3 Agent Chuyên Trách (Chạy song song)
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {specialists.map((agent) => {
                  const isSelected = agent.id === activeAgent?.id;
                  const isConflict = agent.id === 'agent-event-flow';
                  return (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                          : isConflict
                            ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
                            : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <Bot
                            className={`h-4 w-4 ${
                              isSelected ? 'text-blue-600' : 'text-slate-500'
                            }`}
                          />
                          {isConflict && (
                            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-900">
                              CONFLICT
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-xs font-bold leading-snug text-slate-900">
                          {agent.agentName}
                        </h3>
                      </div>
                      <p className="mt-2 text-[11px] font-medium text-slate-500">{agent.status}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                <ArrowDown className="h-3.5 w-3.5 text-blue-600" />
                Hợp nhất tín hiệu &amp; đối chiếu xung đột
              </div>
            </div>

            {/* Tier 2: Support Tong (Portfolio Synthesizer) */}
            {synthesizer && (
              <div>
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Tầng 2 · Support Tổng (Portfolio Synthesizer)
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAgentId(synthesizer.id)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                    synthesizer.id === activeAgent?.id
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-600'
                      : 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-indigo-700" />
                      <span className="text-sm font-bold text-slate-900">
                        {synthesizer.agentName}
                      </span>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-indigo-800 ring-1 ring-indigo-200">
                      {synthesizer.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600">{synthesizer.headline}</p>
                </button>
              </div>
            )}

            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                <ArrowDown className="h-3.5 w-3.5 text-emerald-600" />
                Trình duyệt &amp; kiểm chứng trước khi trao đổi khách hàng
              </div>
            </div>

            {/* Tier 3: Human Observer (Tam / Advisor) */}
            {observer && (
              <div>
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Tầng 3 · Trạm Kiểm Soát Của Chuyên Viên Tư Vấn
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAgentId(observer.id)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                    observer.id === activeAgent?.id
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600'
                      : 'border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-emerald-700" />
                      <span className="text-sm font-bold text-slate-900">
                        {observer.agentName}
                      </span>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      {observer.confidence}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600">{observer.headline}</p>
                </button>
              </div>
            )}
          </div>

          {/* Right: Active Agent Inspector */}
          {activeAgent && (
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 pb-3.5">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <ActiveRoleIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${activeRoleMeta.badge}`}
                        >
                          {activeRoleMeta.label}
                        </span>
                        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                          {activeAgent.status}
                        </span>
                      </div>
                      <h3 className="mt-1 text-base font-bold text-slate-900">
                        {activeAgent.agentName}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-800 ring-1 ring-slate-200">
                    {activeAgent.confidence}
                  </span>
                </div>

                {/* Focus Layers */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <Layers className="h-3.5 w-3.5" />
                    Phạm vi phụ trách:
                  </span>
                  {(activeAgent.focusLayers || []).map((layer, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200"
                    >
                      {layer}
                    </span>
                  ))}
                </div>

                {/* Headline */}
                <div className="mt-3.5 rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Kết luận trọng tâm
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-snug text-slate-900">
                    {activeAgent.headline}
                  </p>
                </div>

                {/* Key Findings */}
                <div className="mt-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Chi tiết lập luận &amp; bằng chứng
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {(activeAgent.keyFindings || []).map((finding, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2.5 text-xs leading-relaxed text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Blind Spot Warning */}
                {activeAgent.blindSpotWarning && (
                  <div className="mt-3.5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="h-4 w-4 text-amber-700" />
                      Cảnh báo điểm mù &amp; giới hạn
                    </div>
                    <p className="mt-1 leading-relaxed">{activeAgent.blindSpotWarning}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {activeAgent.source}
                </span>
                <span className="flex items-center gap-1 font-mono tabular-nums">
                  <Clock className="h-3.5 w-3.5" />
                  {activeAgent.timestamp}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Personalized Client Segments Comparison Matrix */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Cá nhân hóa tư vấn theo kỳ hạn nắm giữ
              </span>
            </div>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
              Cùng Một Tín Hiệu FOMC vs ETF 13/11 — Ba Khuyến Nghị Khác Nhau
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Chọn nhóm khách hàng để đồng bộ khung hành động ưu tiên trên toàn bộ Dashboard.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {CLIENT_PROFILES.map((profile) => {
            const clientKey = CLIENT_KEY_BY_ID[profile.id] || 'short';
            const isSelected = clientKey === activeClientKey;

            return (
              <div
                key={profile.id}
                onClick={() => onSelectClientKey(clientKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectClientKey(clientKey);
                  }
                }}
                className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {profile.code}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                      {profile.holdingHorizon}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-sm font-bold text-slate-900">{profile.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{profile.riskAppetite}</p>

                  <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Lập trường cốt lõi
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-slate-900">
                      {profile.coreStance}
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs leading-relaxed text-amber-950">
                    <span className="font-bold">Phản ứng FOMC vs ETF 13/11: </span>
                    {profile.fomcVsEtfReaction}
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <div className="font-bold text-emerald-800">Nên ưu tiên:</div>
                      <ul className="mt-1 space-y-1 text-slate-700">
                        {(profile.recommendedFocus || []).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="font-bold text-rose-800">Cần tránh:</div>
                      <ul className="mt-1 space-y-1 text-slate-700">
                        {(profile.avoidList || []).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200/80 pt-2.5 text-[11px] text-slate-500">
                  <div className="flex items-start gap-1.5">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>{profile.disclaimer || MANDATORY_DISCLAIMER}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
