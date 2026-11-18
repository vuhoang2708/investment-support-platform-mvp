import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  GitBranch,
  Globe,
  Landmark,
  Layers,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { CAUSAL_CHAINS, PLATFORM_META, TOP_DOWN_LAYERS } from '../data/platformData';

const LAYER_ICONS = {
  1: Landmark,
  2: Globe,
  3: Layers,
  4: Building2,
};

function getScoreColor(score) {
  if (score >= 66) return 'bg-amber-500';
  if (score >= 60) return 'bg-blue-600';
  return 'bg-emerald-600';
}

function getConfidenceBadge(level) {
  if (level === 'high') {
    return 'bg-emerald-50 text-emerald-800 border-emerald-200';
  }
  if (level === 'medium-high') {
    return 'bg-blue-50 text-blue-800 border-blue-200';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

export default function TopDownCausalMap() {
  const [selectedLayerId, setSelectedLayerId] = useState(TOP_DOWN_LAYERS[0]?.id || 'layer-1');
  const [selectedChainId, setSelectedChainId] = useState(CAUSAL_CHAINS[1]?.id || CAUSAL_CHAINS[0]?.id);

  const activeLayer =
    TOP_DOWN_LAYERS.find((layer) => layer.id === selectedLayerId) || TOP_DOWN_LAYERS[0];
  const activeChain =
    CAUSAL_CHAINS.find((chain) => chain.id === selectedChainId) || CAUSAL_CHAINS[0];

  const ActiveLayerIcon = LAYER_ICONS[activeLayer?.layerNumber] || Layers;

  return (
    <div className="space-y-6">
      {/* Section 1: 4-Layer Top-Down Framework */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/15">
                Khung Top-Down 4 Lớp
              </span>
              <span className="text-xs text-slate-500">
                Chọn từng tầng từ trên xuống dưới để xem biến số &amp; tác động định giá
              </span>
            </div>
            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">
              Bản Đồ Dẫn Truyền Từ Thể Chế Việt Nam Đến Cổ Phiếu
            </h2>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-900">
            <span className="font-semibold">Phần bù rủi ro thể chế hiện tại:</span>{' '}
            <span className="font-mono font-bold tabular-nums">
              {PLATFORM_META.institutionalRiskPremium.estimatedRange}
            </span>
          </div>
        </div>

        {/* Stepped 4-Layer Selector */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">
          {TOP_DOWN_LAYERS.map((layer, index) => {
            const Icon = LAYER_ICONS[layer.layerNumber] || Layers;
            const isSelected = layer.id === activeLayer?.id;

            return (
              <div key={layer.id} className="relative flex items-stretch">
                <button
                  type="button"
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`group flex w-full flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200/80 text-slate-700 group-hover:bg-slate-300'
                        }`}
                      >
                        L{layer.layerNumber}
                      </span>
                      <Icon
                        className={`h-4 w-4 ${
                          isSelected ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                    </div>
                    <p className="mt-2.5 text-xs font-medium text-slate-500">{layer.badge}</p>
                    <h3 className="mt-0.5 text-sm font-bold text-slate-900">{layer.shortName}</h3>
                  </div>

                  <div className="mt-3 border-t border-slate-200/70 pt-2.5">
                    <p className="text-[11px] text-slate-500">{layer.coreMetric?.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-800 tabular-nums">
                      {layer.coreMetric?.value}
                    </p>
                  </div>
                </button>

                {index < TOP_DOWN_LAYERS.length - 1 && (
                  <div className="hidden items-center justify-center px-1 text-slate-300 md:flex">
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Layer Detail Panel */}
        {activeLayer && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <ActiveLayerIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                      {activeLayer.badge}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                      {activeLayer.coreMetric?.status}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                    {activeLayer.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {activeLayer.summary}
                  </p>
                </div>
              </div>

              <div className="shrink-0 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs">
                <div className="font-medium text-slate-500">{activeLayer.coreMetric?.name}</div>
                <div className="mt-0.5 text-sm font-bold text-slate-900 tabular-nums">
                  {activeLayer.coreMetric?.value}
                </div>
              </div>
            </div>

            {/* Layer 1: 4 Institutional Variables */}
            {Array.isArray(activeLayer.variables) && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                  {activeLayer.variables.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                          <span className="mt-1 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                            {item.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-slate-500">Trọng số</span>
                          <div className="text-sm font-bold text-blue-700 tabular-nums">
                            {item.weight}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Chỉ số áp lực rủi ro</span>
                          <span className="font-mono font-bold text-slate-900 tabular-nums">
                            {item.score}/100
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all ${getScoreColor(item.score)}`}
                            style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                          />
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                      <div className="mt-2.5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
                        <span className="font-semibold text-slate-900">Tín hiệu: </span>
                        {item.signal}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-950 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-bold">Quy đổi thành Phần bù rủi ro thể chế: </span>
                    <span>{PLATFORM_META.institutionalRiskPremium.note}</span>
                  </div>
                  <span className="shrink-0 rounded-md bg-white px-2.5 py-1 font-mono font-bold text-amber-900 ring-1 ring-amber-300 tabular-nums">
                    Điểm tổng hợp: {PLATFORM_META.institutionalRiskPremium.compositeScore}/
                    {PLATFORM_META.institutionalRiskPremium.maxScore}
                  </span>
                </div>
              </div>
            )}

            {/* Layer 2: Macro Indicators */}
            {Array.isArray(activeLayer.indicators) && (
              <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
                {activeLayer.indicators.map((ind) => {
                  const isUs10y = ind.id === 'ind-us10y';
                  return (
                    <div
                      key={ind.id}
                      className={`flex flex-col justify-between rounded-xl border bg-white p-4 shadow-sm ${
                        isUs10y ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{ind.name}</h4>
                          {isUs10y && (
                            <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-900">
                              Risk-Free Proxy
                            </span>
                          )}
                        </div>
                        <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2">
                          <div className="text-xs font-bold text-blue-900 tabular-nums">
                            {ind.currentValue}
                          </div>
                          <div className="mt-0.5 text-[11px] font-medium text-slate-600">
                            Xu hướng: {ind.trend}
                          </div>
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{ind.impact}</p>
                      </div>
                      <div className="mt-3 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                        Nguồn: {ind.source}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Layer 3: Sectors */}
            {Array.isArray(activeLayer.sectors) && (
              <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                {activeLayer.sectors.map((sec) => (
                  <div
                    key={sec.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{sec.name}</h4>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800 ring-1 ring-blue-200">
                        {sec.outlook}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-slate-800">Độ nhạy vĩ mô: </span>
                        <span className="text-slate-600">{sec.macroSensitivity}</span>
                      </div>
                      <div className="rounded-lg bg-emerald-50/70 p-2.5 text-emerald-950">
                        <span className="font-semibold">Catalyst 1–3T: </span>
                        {sec.catalyst}
                      </div>
                      <div className="rounded-lg bg-rose-50/70 p-2.5 text-rose-950">
                        <span className="font-semibold">Rủi ro chính: </span>
                        {sec.keyRisk}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Layer 4: Representative Simulation Stocks */}
            {Array.isArray(activeLayer.stocks) && (
              <div className="mt-4 space-y-3.5">
                <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-xs text-indigo-900">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-indigo-700" />
                  <span>
                    <strong>Lưu ý minh họa mô phỏng:</strong> Các mã cổ phiếu bên dưới chỉ dùng để
                    trình diễn cách nối khung Top-Down 4 lớp với Nghị quyết ĐHCĐ và lịch dự án,{' '}
                    <strong>không phải khuyến nghị mua/bán</strong>.
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {activeLayer.stocks.map((stock) => (
                    <div
                      key={stock.ticker}
                      className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-slate-900 px-2 py-0.5 font-mono text-sm font-bold text-white">
                                {stock.ticker}
                              </span>
                              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 ring-1 ring-indigo-200">
                                {stock.simulationNote || 'Mã minh họa mô phỏng'}
                              </span>
                            </div>
                            <h4 className="mt-1.5 text-sm font-bold text-slate-900">
                              {stock.companyName}
                            </h4>
                            <p className="text-xs text-slate-500">Ngành: {stock.sector}</p>
                          </div>
                        </div>

                        <p className="mt-2.5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
                          <span className="font-semibold text-slate-900">Định giá: </span>
                          {stock.valuationNote}
                        </p>

                        <div className="mt-3 space-y-2 text-xs">
                          <div>
                            <p className="font-semibold text-emerald-800">
                              Chất xúc tác (Catalysts):
                            </p>
                            <ul className="mt-1 list-disc space-y-1 pl-4 text-slate-600">
                              {(stock.catalysts || []).map((cat, idx) => (
                                <li key={idx}>{cat}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-semibold text-rose-800">Rủi ro cần theo dõi:</p>
                            <ul className="mt-1 list-disc space-y-1 pl-4 text-slate-600">
                              {(stock.risks || []).map((risk, idx) => (
                                <li key={idx}>{risk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-slate-100 pt-2.5 text-xs text-slate-700">
                        <span className="font-semibold text-slate-900">Độ khớp kỳ hạn: </span>
                        {stock.horizonFit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Layer Provenance Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Nguồn: {activeLayer.source}
              </span>
              <span className="flex items-center gap-1.5 font-mono tabular-nums">
                <Clock className="h-3.5 w-3.5" />
                Cập nhật: {activeLayer.timestamp}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Interactive Causal Chains */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              Yêu cầu lập luận chuẩn mực
            </span>
          </div>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
            Chuỗi Dẫn Truyền Nhân Quả (Giả định &rarr; Kênh truyền dẫn &rarr; Kịch bản thay thế)
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Mỗi nhận định bắt buộc truy vết rõ sự kiện gốc, giả định nền, kịch bản trái chiều và độ
            tin cậy.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Chain Selector List */}
          <div className="space-y-2.5 lg:col-span-4">
            {CAUSAL_CHAINS.map((chain) => {
              const isSelected = chain.id === activeChain?.id;
              const isConflict = chain.id === 'chain-etf-conflict';
              return (
                <button
                  key={chain.id}
                  type="button"
                  onClick={() => setSelectedChainId(chain.id)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[11px] font-semibold text-blue-700">
                      {chain.layerScope}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getConfidenceBadge(
                        chain.confidenceLevel
                      )}`}
                    >
                      {chain.confidence}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-slate-900">
                    {chain.title}
                  </h3>
                  {isConflict && (
                    <div className="mt-2 inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                      <AlertTriangle className="h-3 w-3" />
                      CONFLICT ALERT · Chống mù sự kiện
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Chain Visual Diagram */}
          {activeChain && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 lg:col-span-8">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3.5">
                <div>
                  <span className="text-xs font-semibold text-blue-700">
                    Phạm vi: {activeChain.layerScope}
                  </span>
                  <h3 className="mt-0.5 text-base font-bold text-slate-900 sm:text-lg">
                    {activeChain.title}
                  </h3>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getConfidenceBadge(
                    activeChain.confidenceLevel
                  )}`}
                >
                  Tin cậy: {activeChain.confidence}
                </span>
              </div>

              {/* Step-by-Step Visual Transmission Flow */}
              <div className="mt-4 space-y-3">
                {/* Step 1: Root Event */}
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    1. Sự kiện gốc (Trigger)
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-900">{activeChain.rootEvent}</p>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="h-4 w-4 text-blue-500" />
                </div>

                {/* Step 2: Transmission Channels */}
                <div className="rounded-xl border border-blue-200 bg-white p-3.5 shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    2. Kênh truyền dẫn từng bước
                  </div>
                  <div className="mt-2.5 space-y-2.5">
                    {(activeChain.transmissionChannels || []).map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="h-4 w-4 text-blue-500" />
                </div>

                {/* Step 3: Specific Impact */}
                <div
                  className={`rounded-xl border p-3.5 shadow-sm ${
                    activeChain.id === 'chain-etf-conflict'
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-emerald-200 bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-800">
                    <TrendingUp className="h-3.5 w-3.5" />
                    3. Tác động cụ thể lên danh mục &amp; định giá
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-900">
                    {activeChain.impact}
                  </p>
                </div>
              </div>

              {/* Assumptions & Alternative Scenario */}
              <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Giả định nền (Assumptions)
                  </div>
                  <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-slate-600">
                    {(activeChain.assumptions || []).map((assumption, idx) => (
                      <li key={idx}>{assumption}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                    <ArrowRight className="h-4 w-4 text-amber-700" />
                    Kịch bản thay thế (Nếu giả định vỡ)
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-amber-950/90">
                    {activeChain.alternativeScenario}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
                <span>Nguồn: {activeChain.source}</span>
                <span className="font-mono tabular-nums">Cập nhật: {activeChain.timestamp}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
