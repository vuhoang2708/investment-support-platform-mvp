import { useState } from 'react';
import {
  AlertTriangle,
  Bot,
  CalendarRange,
  Compass,
  FolderKanban,
  Layers,
  ShieldAlert,
  Users,
} from 'lucide-react';
import {
  CLIENT_PROFILES,
  MANDATORY_DISCLAIMER,
  PLATFORM_META,
  UPCOMING_EVENTS,
} from './data/platformData';
import TopDownCausalMap from './components/TopDownCausalMap';
import EventRadarPanel from './components/EventRadarPanel';
import AgentOrchestratorPanel from './components/AgentOrchestratorPanel';
import WorkspaceKitPanel from './components/WorkspaceKitPanel';

const TABS = [
  {
    id: 'causal-map',
    label: 'Bản Đồ Dẫn Truyền 4 Lớp',
    shortLabel: 'Top-Down 4 Lớp',
    icon: Layers,
  },
  {
    id: 'event-radar',
    label: 'Radar Sự Kiện & Google Sheets',
    shortLabel: 'Radar Sự Kiện',
    icon: CalendarRange,
  },
  {
    id: 'multi-agent',
    label: 'Đa Tác Nhân & Khách Hàng',
    shortLabel: 'Đa Tác Nhân',
    icon: Bot,
  },
  {
    id: 'workspace-kit',
    label: 'Khung Antigravity',
    shortLabel: 'Antigravity Kit',
    icon: FolderKanban,
  },
];

const CLIENT_OPTIONS = [
  { key: 'short', code: 'Nhóm A', horizon: '1–4 tuần', profileId: 'client-group-a' },
  { key: 'medium', code: 'Nhóm B', horizon: '3–12 tháng', profileId: 'client-group-b' },
  { key: 'long', code: 'Nhóm C', horizon: '12+ tháng', profileId: 'client-group-c' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('causal-map');
  const [activeClientKey, setActiveClientKey] = useState('short');
  const [events, setEvents] = useState(UPCOMING_EVENTS);
  const [dataSourceInfo, setDataSourceInfo] = useState({
    mode: 'default',
    label: 'Dữ liệu mô phỏng MVP',
  });

  const activeClientOption =
    CLIENT_OPTIONS.find((opt) => opt.key === activeClientKey) || CLIENT_OPTIONS[0];
  const activeClientProfile =
    CLIENT_PROFILES.find((p) => p.id === activeClientOption.profileId) || CLIENT_PROFILES[0];

  const conflictEventsCount = events.filter((evt) => Boolean(evt.conflictAlert)).length;

  const handleEventsImported = (newEvents, sourceMeta) => {
    setEvents(newEvents);
    setDataSourceInfo(sourceMeta);
  };

  const handleResetDefaultEvents = () => {
    setEvents(UPCOMING_EVENTS);
    setDataSourceInfo({
      mode: 'default',
      label: 'Dữ liệu mô phỏng MVP',
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Top Institutional Header & Command Context Bar */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Top Row: Title + Institutional Badges */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                <Compass className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-800 ring-1 ring-inset ring-indigo-600/20">
                    Demo MVP
                  </span>
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-900 ring-1 ring-inset ring-amber-600/20 tabular-nums">
                    Phần bù rủi ro thể chế: +1.8% – +2.5%
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {PLATFORM_META.advisorContext.advisorName} · {PLATFORM_META.advisorContext.role}
                  </span>
                </div>
                <h1 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  {PLATFORM_META.title}
                </h1>
                <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">{PLATFORM_META.subtitle}</p>
              </div>
            </div>

            {/* Quick Client Group Switcher */}
            <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2">
              <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <Users className="h-3.5 w-3.5 text-blue-600" />
                Nhóm Khách Hàng Đang Tư Vấn
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {CLIENT_OPTIONS.map((opt) => {
                  const isActive = opt.key === activeClientKey;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setActiveClientKey(opt.key)}
                      className={`rounded-lg px-2.5 py-1.5 text-left transition ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.code}</div>
                      <div
                        className={`text-[10px] tabular-nums ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {opt.horizon}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Persistent CONFLICT ALERT Banner */}
          <div className="mt-4 flex flex-col gap-2.5 rounded-xl border border-amber-300 bg-amber-50/90 px-4 py-3 text-xs text-amber-950 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div className="leading-relaxed">
                <span className="mr-1.5 inline-flex items-center rounded bg-rose-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  CONFLICT ALERT ({conflictEventsCount})
                </span>
                <strong>Chống mù sự kiện tháng 10–11:</strong> Vĩ mô (FOMC / US 10Y{' '}
                <span className="font-mono font-bold tabular-nums">4.35%</span>) giữ stance thận
                trọng, nhưng <strong>Review ETF 13/11</strong> tạo lực mua ròng kỹ thuật nhóm vốn
                hóa lớn &rarr; bắt buộc tách khuyến nghị theo kỳ hạn nắm giữ!{' '}
                <span className="font-semibold text-amber-900">
                  ({activeClientProfile?.code}: {activeClientProfile?.coreStance})
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('event-radar')}
                className="rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-[11px] font-bold text-amber-900 transition hover:bg-amber-100"
              >
                Mở Radar Sự Kiện
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('multi-agent')}
                className="rounded-lg bg-amber-900 px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-amber-800"
              >
                So sánh 3 Nhóm NĐT
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav
            aria-label="Điều hướng phân hệ Dashboard"
            className="mt-4 -mb-4 flex gap-1 overflow-x-auto scrollbar-thin"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {tab.id === 'event-radar' && (
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 tabular-nums">
                      {events.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'causal-map' && <TopDownCausalMap />}

        {activeTab === 'event-radar' && (
          <EventRadarPanel
            events={events}
            activeClientKey={activeClientKey}
            dataSourceInfo={dataSourceInfo}
            onEventsImported={handleEventsImported}
            onResetDefault={handleResetDefaultEvents}
          />
        )}

        {activeTab === 'multi-agent' && (
          <AgentOrchestratorPanel
            activeClientKey={activeClientKey}
            onSelectClientKey={setActiveClientKey}
          />
        )}

        {activeTab === 'workspace-kit' && <WorkspaceKitPanel />}
      </main>

      {/* Persistent Institutional Disclaimer & Data Freshness Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-2 font-medium text-slate-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>{MANDATORY_DISCLAIMER}</span>
          </div>
          <div className="text-[11px] text-slate-500 lg:text-right">
            {PLATFORM_META.dataFreshnessNote}
          </div>
        </div>
      </footer>
    </div>
  );
}
