# Báo Cáo Kiểm Thử Nghiệm Thu (UAT) & Hồ Sơ Phát Hành — Demo MVP

- **Ngày thực hiện:** 2026-11-18 (GMT+7) — Cập nhật bản sạch PII (`ed7b509`)
- **Mục tiêu:** Xây dựng Demo MVP Nền tảng Hỗ trợ Tư vấn Đầu tư Top-Down 4 lớp & Event Radar 1–3 tháng tới (Phương án 2: Interactive Web MVP + Bộ nạp CSV/Google Sheets + Bộ khung Antigravity), đẩy lên GitHub, triển khai Live lên Vercel và kiểm chứng ẩn danh hóa 100% thông tin cá nhân/đơn vị công tác.
- **Trạng thái nghiệm thu:** **Live done (PASS 100% — 0 PII trên Live, GitHub, Drive & Docs)**

---

## 1. Thông Tin Phát Hành (Release Manifest)

| Hạng mục | Giá trị kiểm chứng |
| :--- | :--- |
| **GitHub Repository** | `https://github.com/vuhoang2708/investment-support-platform-mvp` |
| **Source Commit SHA (deployed clean PII)** | `ed7b509e94dc92af91568d882ec9eb3624195253` |
| **Vercel Project** | `vuhoang2708s-projects/investment-support-platform-mvp` |
| **Vercel Production Alias** | `https://investment-support-platform-mvp.vercel.app` |
| **Vercel Deployment URL (Mới nhất)** | `https://investment-support-platform-6lpxju8fz-vuhoang2708s-projects.vercel.app` |
| **Vercel Deployment ID (Mới nhất)** | `dpl_AHvJ25rd8avK7H9sCkeUFKFFhMu3` |
| **Google Drive PDF (Public Reader, đã cập nhật sạch)** | `14p4twv16B5ZJYtrG8SRKVQ3s8jNYndht` (`https://drive.google.com/file/d/14p4twv16B5ZJYtrG8SRKVQ3s8jNYndht/view?usp=drivesdk`) |
| **Lệnh Rollback (nếu cần)** | `npx vercel rollback dpl_AHvJ25rd8avK7H9sCkeUFKFFhMu3` |

---

## 2. Kiểm Chứng Môi Trường Cục Bộ (`Local done`)

- **Cô lập Git:** `git rev-parse --show-toplevel` = `C:/Users/vu.hoang/.gemini/antigravity/scratch/Invesment-support-platform` (độc lập hoàn toàn khỏi thư mục cha `.gemini`).
- **Build & Đóng gói:** `npm run build` thoát mã `0` (`1583 modules transformed`), tạo `dist/index.html`, `dist/sample-events.csv`, và assets JS/CSS.
- **Chuẩn UTF-8 & BOM:**
  - `public/sample-events.csv`: UTF-8 **có BOM** (`\xef\xbb\xbf`) giúp Microsoft Excel và Google Sheets mở tiếng Việt đúng dấu.
  - Toàn bộ mã nguồn (`src/*.js`, `src/*.jsx`, `GEMINI.md`, `README.md`, `.agents/skills/*/SKILL.md`): UTF-8 **không BOM**, không lỗi ký tự thay thế (`\uFFFD`).
- **Kiểm thử Parser CSV (`src/utils/csvParser.js`):** Đọc đủ `6/6` sự kiện từ `public/sample-events.csv`, xử lý đúng trường có dấu phẩy nằm trong ngoặc kép, nhận diện đúng `macro_conflict === 'YES'` cho kỳ Review ETF `13/11`.
- **Browser UAT Cục Bộ (`http://127.0.0.1:4173/`):**
  - Desktop (`1280x800`) và Mobile (`390x844`): **PASS 6/6** kiểm tra (`0` console errors, `0` pageerrors, `0` failed requests, không tràn ngang trên mobile).
  - Bằng chứng ảnh lưu tại: `UAT/local/`

---

## 3. Kiểm Chứng Môi Trường Thật (`Live done`)

- **Kiểm tra HTTP Route Manifest trên Production Alias:**
  - `GET https://investment-support-platform-mvp.vercel.app/` -> `200 OK` (`text/html; charset=utf-8`, `560` bytes)
  - `GET https://investment-support-platform-mvp.vercel.app/sample-events.csv` -> `200 OK` (`text/csv; charset=utf-8`, `4281` bytes)
- **Browser UAT trên URL Production (`https://investment-support-platform-mvp.vercel.app/`):**
  - Tải trang ban đầu: Hiển thị đầy đủ tiêu đề, huy hiệu `Phần bù rủi ro thể chế: +1.8% – +2.5%`, biểu ngữ `CONFLICT ALERT (1)`, thanh chuyển 3 Nhóm Khách Hàng (`Nhóm A`, `Nhóm B`, `Nhóm C`), và tuyên bố miễn trừ trách nhiệm bắt buộc ở chân trang.
  - Tab 2 (`Radar Sự Kiện & Google Sheets`): Bấm `Tải lại file CSV mẫu (sample-events.csv)` trả về `HTTP 200`, hiển thị đúng `6 / 6` sự kiện.
  - Tab 3 (`Đa Tác Nhân & Khách Hàng`) & Tab 4 (`Khung Antigravity`): Hiển thị đầy đủ kiến trúc 3 Agent chuyên trách → 1 Support Tổng → Người quan sát tổng, và bộ khung `GEMINI.md` + 2 Skills mẫu.
  - Console / Network: `0` console errors, `0` uncaught pageerrors, `0` failed requests.
  - Bằng chứng ảnh lưu tại: `UAT/live/`
