import { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  Filter,
  Link2,
  RefreshCw,
  RotateCcw,
  Search,
  Upload,
} from 'lucide-react';
import {
  normalizeGoogleSheetsCsvUrl,
  parseEventsCsv,
  serializeEventsToCsv,
} from '../utils/csvParser';

const HORIZON_META = {
  short: {
    label: 'Nhóm A · Giao dịch ngắn hạn (1–4 tuần)',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  medium: {
    label: 'Nhóm B · Nắm giữ trung/dài hạn (3–12 tháng)',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  long: {
    label: 'Nhóm C · Tích sản phòng thủ (12+ tháng)',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
};

export default function EventRadarPanel({
  events,
  activeClientKey,
  dataSourceInfo,
  onEventsImported,
  onResetDefault,
}) {
  const [onlyConflicts, setOnlyConflicts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventIds, setExpandedEventIds] = useState({});

  const [sheetsUrl, setSheetsUrl] = useState('');
  const [isLoadingSource, setIsLoadingSource] = useState(false);
  const [importFeedback, setImportFeedback] = useState(null);
  const fileInputRef = useRef(null);

  const categories = useMemo(() => {
    const set = new Set();
    (events || []).forEach((evt) => {
      if (evt.category) set.add(evt.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [events]);

  const conflictCount = useMemo(
    () => (events || []).filter((evt) => Boolean(evt.conflictAlert)).length,
    [events]
  );

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (events || []).filter((evt) => {
      if (onlyConflicts && !evt.conflictAlert) return false;
      if (selectedCategory !== 'ALL' && evt.category !== selectedCategory) return false;
      if (!q) return true;

      const haystack = [
        evt.title,
        evt.category,
        evt.summary,
        evt.source,
        evt.date,
        ...(evt.affectedTickers || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [events, onlyConflicts, selectedCategory, searchQuery]);

  const toggleExpandEvent = (id) => {
    setExpandedEventIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoadingSource(true);
    setImportFeedback(null);
    try {
      const text = await file.text();
      const parsed = parseEventsCsv(text);
      onEventsImported(parsed, {
        mode: 'csv-upload',
        label: `Tệp CSV: ${file.name}`,
      });
      setImportFeedback({
        type: 'success',
        message: `Đã nạp thành công ${parsed.length} sự kiện từ tệp "${file.name}".`,
      });
    } catch (err) {
      setImportFeedback({
        type: 'error',
        message: err?.message || 'Không thể đọc tệp CSV. Vui lòng kiểm tra định dạng UTF-8.',
      });
    } finally {
      setIsLoadingSource(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLoadSampleCsv = async () => {
    setIsLoadingSource(true);
    setImportFeedback(null);
    try {
      const response = await fetch('/sample-events.csv', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Không tải được /sample-events.csv`);
      }
      const text = await response.text();
      const parsed = parseEventsCsv(text);
      onEventsImported(parsed, {
        mode: 'sample-csv',
        label: 'public/sample-events.csv',
      });
      setImportFeedback({
        type: 'success',
        message: `Đã nạp lại ${parsed.length} sự kiện từ tệp mẫu public/sample-events.csv.`,
      });
    } catch (err) {
      setImportFeedback({
        type: 'error',
        message: err?.message || 'Lỗi khi nạp tệp /sample-events.csv.',
      });
    } finally {
      setIsLoadingSource(false);
    }
  };

  const handleFetchGoogleSheets = async (e) => {
    e.preventDefault();
    const trimmed = sheetsUrl.trim();
    if (!trimmed) {
      setImportFeedback({
        type: 'error',
        message: 'Vui lòng dán đường dẫn Google Sheets "Publish to Web (CSV)" hoặc link CSV.',
      });
      return;
    }

    const normalizedUrl = normalizeGoogleSheetsCsvUrl(trimmed);
    setIsLoadingSource(true);
    setImportFeedback(null);

    try {
      const response = await fetch(normalizedUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} khi truy xuất Google Sheets.`);
      }
      const text = await response.text();
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        throw new Error(
          'Liên kết trả về trang HTML thay vì CSV (thường do Sheet đang ở chế độ riêng tư). Hãy dùng: Tệp -> Chia sẻ -> Xuất bản lên web -> chọn định dạng CSV (.csv).'
        );
      }
      const parsed = parseEventsCsv(text);
      onEventsImported(parsed, {
        mode: 'google-sheets',
        label: 'Google Sheets Live CSV',
      });
      setImportFeedback({
        type: 'success',
        message: `Đã đồng bộ ${parsed.length} sự kiện trực tiếp từ Google Sheets CSV.`,
      });
    } catch (err) {
      setImportFeedback({
        type: 'error',
        message: `${
          err?.message || 'Lỗi kết nối/CORS khi tải Google Sheets.'
        } Mẹo dự phòng: Trong Google Sheets chọn Tệp -> Tải xuống -> Giá trị được phân tách bằng dấu phẩy (.csv) rồi tải lên ở nút bên dưới.`,
      });
    } finally {
      setIsLoadingSource(false);
    }
  };

  const handleDownloadTemplateCsv = () => {
    const csvContent = serializeEventsToCsv(events);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'event-radar-template-utf8.csv';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    onResetDefault();
    setSelectedCategory('ALL');
    setOnlyConflicts(false);
    setSearchQuery('');
    setImportFeedback({
      type: 'info',
      message: 'Đã khôi phục bộ dữ liệu mặc định của Demo MVP.',
    });
  };

  const activeHorizonMeta = HORIZON_META[activeClientKey] || HORIZON_META.short;

  return (
    <div className="space-y-6">
      {/* Section 1: Live Google Sheets / CSV Importer Box */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-600/20">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Nguồn Dữ Liệu Sống · Google Sheets &amp; CSV
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 tabular-nums">
                <Database className="h-3 w-3 text-slate-500" />
                {events.length} sự kiện đã nạp · {dataSourceInfo.label}
              </span>
            </div>
            <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">
              Cổng Nạp Lịch Sự Kiện 1–3 Tháng (Chống Mù Sự Kiện)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Nạp trực tiếp từ Google Sheets (Publish to Web CSV) hoặc tải file `.csv` chuẩn UTF-8
              (hỗ trợ ĐHCĐ, Review ETF, dự án mới vận hành, FOMC/BLS).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadTemplateCsv}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              Tải CSV mẫu (UTF-8 BOM)
            </button>
            <button
              type="button"
              onClick={handleLoadSampleCsv}
              disabled={isLoadingSource}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoadingSource ? 'animate-spin' : ''}`} />
              Tải lại file CSV mẫu (sample-events.csv)
            </button>
            {dataSourceInfo.mode !== 'default' && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Khôi phục dữ liệu mặc định
              </button>
            )}
          </div>
        </div>

        {/* Google Sheets URL Form + Local CSV File Upload */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <form onSubmit={handleFetchGoogleSheets} className="space-y-2 lg:col-span-8">
            <label
              htmlFor="gsheets-csv-url"
              className="block text-xs font-semibold text-slate-700"
            >
              Dán link Google Sheets &ldquo;Publish to Web (CSV)&rdquo;
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="gsheets-csv-url"
                  type="url"
                  value={sheetsUrl}
                  onChange={(e) => setSheetsUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingSource}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {isLoadingSource ? 'Đang nạp...' : 'Nạp Google Sheets'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Trên Google Sheets: vào <strong>Tệp &rarr; Chia sẻ &rarr; Xuất bản lên web</strong>{' '}
              &rarr; chọn <strong>Giá trị được phân tách bằng dấu phẩy (.csv)</strong>.
            </p>
          </form>

          <div className="flex flex-col justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-3.5 lg:col-span-4">
            <div>
              <p className="text-xs font-semibold text-slate-800">Hoặc tải tệp `.csv` từ máy</p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Hỗ trợ chuẩn RFC-4180, dấu phẩy trong ngoặc kép &amp; UTF-8 BOM.
              </p>
            </div>
            <div className="mt-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-file-upload"
              />
              <label
                htmlFor="csv-file-upload"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100"
              >
                <Upload className="h-3.5 w-3.5 text-blue-600" />
                Chọn tệp CSV sự kiện...
              </label>
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        {importFeedback && (
          <div
            className={`mt-3 rounded-lg border px-3.5 py-2.5 text-xs font-medium ${
              importFeedback.type === 'error'
                ? 'border-rose-200 bg-rose-50 text-rose-800'
                : importFeedback.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-blue-200 bg-blue-50 text-blue-800'
            }`}
          >
            {importFeedback.message}
          </div>
        )}
      </section>

      {/* Section 2: Filter Bar + Event Cards */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyConflicts(false)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                !onlyConflicts
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setOnlyConflicts(true)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                onlyConflicts
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Chỉ cảnh báo xung đột ({conflictCount})
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Lọc theo nhóm sự kiện"
                className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-8 pr-8 text-xs font-medium text-slate-700 focus:border-blue-600 focus:outline-none sm:w-auto"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'Tất cả nhóm sự kiện' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã CP (HPG, VCB) hoặc sự kiện..."
                className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Active Client Group Notice */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3.5 py-2 text-xs text-slate-600">
          <span>
            Đang làm nổi bật hành động khuyến nghị cho:{' '}
            <strong className="text-slate-900">{activeHorizonMeta.label}</strong>
          </span>
          <span className="font-mono text-[11px] text-slate-500 tabular-nums">
            Hiển thị {filteredEvents.length} / {events.length} sự kiện
          </span>
        </div>

        {/* Event Cards */}
        {filteredEvents.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Không có sự kiện nào khớp bộ lọc hiện tại.
            </p>
            <button
              type="button"
              onClick={() => {
                setOnlyConflicts(false);
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-3 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {filteredEvents.map((evt) => {
              const isExpanded = Boolean(expandedEventIds[evt.id]);
              const activeAdvice =
                evt.horizonAdvice?.[activeClientKey] ||
                evt.horizonAdvice?.short ||
                'Chưa có ghi chú riêng cho kỳ hạn này.';

              return (
                <article
                  key={evt.id}
                  className={`rounded-xl border p-4 transition-all sm:p-5 ${
                    evt.conflictAlert
                      ? 'border-amber-300 bg-amber-50/30 shadow-sm ring-1 ring-amber-200/70'
                      : 'border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white tabular-nums">
                          <Calendar className="h-3 w-3" />
                          {evt.date}
                        </span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          {evt.windowLabel}
                        </span>
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          {evt.category}
                        </span>
                        {evt.conflictAlert && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white">
                            <AlertTriangle className="h-3 w-3" />
                            CONFLICT ALERT
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {evt.summary}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-1.5 lg:items-end">
                      <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                        {evt.impactDirection}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{evt.layer}</span>
                    </div>
                  </div>

                  {/* Conflict Alert Callout */}
                  {evt.conflictAlert && evt.conflictDetail && (
                    <div className="mt-3 rounded-lg border border-amber-300 bg-amber-100/70 px-3.5 py-2.5 text-xs leading-relaxed text-amber-950">
                      {evt.conflictDetail}
                    </div>
                  )}

                  {/* Affected Tickers */}
                  {Array.isArray(evt.affectedTickers) && evt.affectedTickers.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500">
                        Mã / Nhóm ảnh hưởng (minh họa):
                      </span>
                      {evt.affectedTickers.map((ticker) => (
                        <span
                          key={ticker}
                          className="rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-800"
                        >
                          {ticker}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlighted Active Client Group Advice */}
                  <div className="mt-3.5 rounded-xl border border-blue-200 bg-white p-3.5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${activeHorizonMeta.badgeClass}`}
                      >
                        Khuyến nghị ưu tiên · {activeHorizonMeta.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExpandEvent(evt.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                      >
                        {isExpanded ? (
                          <>
                            Thu gọn 3 nhóm
                            <ChevronUp className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            Xem cả 3 nhóm khách hàng
                            <ChevronDown className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-800 sm:text-sm">
                      {activeAdvice}
                    </p>

                    {/* Expanded 3-Horizon Comparison */}
                    {isExpanded && (
                      <div className="mt-3 grid grid-cols-1 gap-2.5 border-t border-slate-100 pt-3 md:grid-cols-3">
                        {(['short', 'medium', 'long']).map((key) => (
                          <div
                            key={key}
                            className={`rounded-lg border p-2.5 text-xs ${
                              key === activeClientKey
                                ? 'border-blue-400 bg-blue-50/50'
                                : 'border-slate-200 bg-slate-50/60'
                            }`}
                          >
                            <div className="font-bold text-slate-900">
                              {HORIZON_META[key].label}
                            </div>
                            <p className="mt-1 leading-relaxed text-slate-600">
                              {evt.horizonAdvice?.[key] || 'Chưa có dữ liệu.'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Provenance Footer */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    <span>Nguồn: {evt.source}</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <span>Tin cậy: {evt.confidence}</span>
                      <span className="font-mono tabular-nums">Cập nhật: {evt.timestamp}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
