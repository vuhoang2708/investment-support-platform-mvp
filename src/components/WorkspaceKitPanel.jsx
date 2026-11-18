import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  CalendarClock,
  Check,
  Copy,
  FileCode2,
  FileSpreadsheet,
  FolderGit2,
  Sparkles,
  Workflow,
} from 'lucide-react';

const STARTER_PROMPT = `Chạy phân tích đầu tư tuần này theo đúng GEMINI.md:
1. Dùng skill macro-fomc-analyst để cập nhật Lớp 1 (4 biến số thể chế VN -> Phần bù rủi ro thể chế) và Lớp 2 (FOMC, BLS CPI/PPI, US 10Y Yield, DXY -> tỷ giá USD/VND & VN-Index).
2. Dùng skill event-radar-etf-agm để quét lịch sự kiện 1–3 tháng tới trong public/sample-events.csv (hoặc Google Sheets), đặc biệt kiểm tra kỳ Review ETF 13/11, Nghị quyết ĐHCĐ chưa thực hiện và tiến độ dự án Dung Quất 2.
3. Nếu phát hiện xung đột giữa tín hiệu vĩ mô và dòng tiền ngắn hạn, gắn cờ CONFLICT ALERT và tách riêng khuyến nghị tham khảo cho 3 nhóm: Nhóm A (1–4 tuần), Nhóm B (3–12 tháng), Nhóm C (12+ tháng), kèm giả định nền, kịch bản thay thế, nguồn và tuyên bố miễn trừ trách nhiệm.`;

const GEMINI_MD_SNIPPET = `# Quy Tắc Workspace Tư Vấn Đầu Tư Top-Down & Event Radar (GEMINI.md)
- Vai trò: Portfolio Manager hỗ trợ Advisor (Tâm - YSVN), trung thực, định lượng rủi ro, không cam kết lợi nhuận.
- Khung Top-Down 4 lớp bắt buộc:
  1. Thể chế VN (4 biến số -> Phần bù rủi ro thể chế: +1.8% – +2.5%)
  2. Vĩ mô Mỹ & VN (FOMC, BLS CPI/PPI, US 10Y, DXY, USD/VND, NHNN, VN-Index)
  3. Ngành / Lĩnh vực
  4. Doanh nghiệp / Catalyst (Nghị quyết ĐHCĐ chưa thực hiện, vận hành dự án mới)
- Lập luận chuẩn: Giả định nền -> Chuỗi nhân quả -> >=1 Kịch bản thay thế -> Độ tin cậy & Nguồn.
- Chống mù sự kiện: Luôn quét Radar 1–3 tháng; gắn CONFLICT ALERT nếu vĩ mô trái chiều ETF/dòng tiền và tách 3 nhóm khách hàng (A: 1–4T, B: 3–12T, C: 12+T).`;

const SKILL_PROMPTS_SNIPPET = `# Kích hoạt lẻ từng Skill khi cần đối chiếu nhanh:
1) Skill Macro Lớp 1-2:
   "Áp dụng skill macro-fomc-analyst: nếu US 10Y vượt 4.5% sau BLS CPI, chuỗi truyền dẫn sang tỷ giá USD/VND, OMO NHNN và định giá VN-Index thay đổi thế nào?"

2) Skill Event Radar 1-3 tháng:
   "Áp dụng skill event-radar-etf-agm: đọc public/sample-events.csv, lọc toàn bộ sự kiện có macro_conflict=YES và xuất bảng hành động cho Nhóm A, B, C."`;

const WORKSPACE_MODULES = [
  {
    id: 'mod-gemini',
    title: 'GEMINI.md (Project Instructions)',
    path: 'GEMINI.md',
    icon: FileCode2,
    description:
      'Thay thế việc dán lại prompt dài mỗi tuần trên Claude. Tự động ép Agent đi đúng khung Top-Down 4 lớp, 4 biến thể chế VN và miễn trừ trách nhiệm.',
  },
  {
    id: 'mod-macro-skill',
    title: 'Skill 1: macro-fomc-analyst',
    path: '.agents/skills/macro-fomc-analyst/SKILL.md',
    icon: Sparkles,
    description:
      'Chuẩn hóa quy trình đọc FOMC, BLS CPI/PPI, US 10Y (lãi suất phi rủi ro), DXY và truy vết chuỗi nhân quả sang tỷ giá USD/VND & VN-Index.',
  },
  {
    id: 'mod-radar-skill',
    title: 'Skill 2: event-radar-etf-agm',
    path: '.agents/skills/event-radar-etf-agm/SKILL.md',
    icon: Workflow,
    description:
      'Quét cửa sổ 1–3 tháng (ETF 13/11, Nghị quyết ĐHCĐ chưa làm, vận hành nhà máy mới), phát hiện CONFLICT ALERT và tách lời khuyên theo kỳ hạn.',
  },
  {
    id: 'mod-subagents',
    title: 'Subagents & Scheduled Tasks',
    path: 'Antigravity Multi-Agent + Scheduler',
    icon: CalendarClock,
    description:
      'Chạy song song Macro Agent, Event & Flow Agent, Sector Agent rồi gom về Support Tổng; hẹn lịch quét tự động trước họp FOMC / ngày công bố CPI.',
  },
  {
    id: 'mod-sheets',
    title: 'Google Sheets CSV / MCP',
    path: 'public/sample-events.csv · Google Sheets',
    icon: FileSpreadsheet,
    description:
      'Advisor chỉ cần cập nhật bảng Google Sheets quen thuộc (thêm kỳ review ETF hay ĐHCĐ mới). Dashboard nạp trực tiếp CSV chuẩn UTF-8 BOM hoặc nối MCP.',
  },
];

function CopyCodeCard({ id, title, badge, content, copiedId, onCopy }) {
  const isCopied = copiedId === id;
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900">{title}</span>
          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
            {badge}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onCopy(id, content)}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition ${
            isCopied
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Sao chép
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}

export default function WorkspaceKitPanel() {
  const [copiedId, setCopiedId] = useState('');

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? '' : prev));
      }, 2200);
    } catch {
      // Fallback copy via temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? '' : prev));
      }, 2200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Before vs After Workflow Comparison */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              Chuyển đổi quy trình cho Chuyên viên Tư vấn (Tâm - YSVN)
            </span>
          </div>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
            Từ Chat Claude Thủ Công Hằng Tuần Sang Antigravity Workspace Kit
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-11">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cách làm cũ · Chat Claude rời rạc
            </div>
            <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-slate-600">
              <li>Mỗi tuần phải nhắc lại ngữ cảnh Top-Down 4 lớp và thể chế Việt Nam.</li>
              <li>
                Dễ bị &ldquo;mù sự kiện&rdquo;: AI phân tích vĩ mô (FOMC/US 10Y) rất hay nhưng quên
                mất lịch Review ETF 13/11 hoặc Nghị quyết ĐHCĐ sắp chạy.
              </li>
              <li>
                Trả về 1 khuyến nghị chung chung, chưa tách riêng cho khách ngắn hạn (1–4 tuần) vs
                tích sản (12+ tháng).
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center lg:col-span-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
              <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
            </div>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Cách mới · Google Antigravity + Web Dashboard
            </div>
            <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-slate-800">
              <li>
                <strong>GEMINI.md</strong> khóa cứng 4 lớp Top-Down, 4 biến thể chế và yêu cầu trích
                nguồn + kịch bản thay thế.
              </li>
              <li>
                <strong>2 Skills chuyên biệt</strong> tự động đối chiếu vĩ mô với Google Sheets /
                CSV sự kiện 1–3 tháng để bật cờ <strong>CONFLICT ALERT</strong>.
              </li>
              <li>
                <strong>Subagents + Scheduled Tasks</strong> tổng hợp báo cáo định kỳ, Tâm chỉ kiểm
                duyệt ở vai trò <em>Người Quan Sát Tổng</em>.
              </li>
            </ul>
          </div>
        </div>

        {/* 5 Workspace Modules */}
        <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {WORKSPACE_MODULES.map((mod) => {
            const Icon = mod.icon || Bot;
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                    <p className="font-mono text-[10px] text-blue-700">{mod.path}</p>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{mod.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Copyable Templates */}
      <section className="space-y-4">
        <CopyCodeCard
          id="starter-prompt"
          title="Prompt Khởi Chạy Chu Kỳ Tuần Cho Tâm (1-Click Copy)"
          badge="Antigravity Chat / Scheduled Task"
          content={STARTER_PROMPT}
          copiedId={copiedId}
          onCopy={handleCopy}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CopyCodeCard
            id="gemini-md"
            title="Tóm Tắt Quy Tắc Cốt Lõi Trong GEMINI.md"
            badge="GEMINI.md"
            content={GEMINI_MD_SNIPPET}
            copiedId={copiedId}
            onCopy={handleCopy}
          />
          <CopyCodeCard
            id="skill-prompts"
            title="Lệnh Gọi Nhanh Từng Skill Chuyên Biệt"
            badge=".agents/skills/*"
            content={SKILL_PROMPTS_SNIPPET}
            copiedId={copiedId}
            onCopy={handleCopy}
          />
        </div>
      </section>
    </div>
  );
}
