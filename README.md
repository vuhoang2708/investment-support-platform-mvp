# Nền Tảng Hỗ Trợ Tư Vấn Đầu Tư Top-Down & Event Radar (Demo MVP)

Hệ thống mẫu (Demo MVP) minh họa cách chuyển đổi bộ quy trình tư vấn đầu tư chuyên nghiệp sang **Google Antigravity Workspace**, kết hợp khung phân tích **Top-Down 4 lớp**, **Phần bù rủi ro thể chế Việt Nam**, và **Cơ chế Chống Mù Sự Kiện (Event Radar 1–3 tháng)** trên một giao diện Web Dashboard trực quan.

---

## 1. Bài toán thực tế được giải quyết

1. **Chuẩn hóa quy trình phân tích Top-Down 4 lớp:** Không bỏ sót yếu tố Thể chế Việt Nam (4 biến số định lượng hóa quy thành phần bù rủi ro thể chế) khi kết nối với vĩ mô Mỹ (FOMC, BLS CPI/PPI, US 10Y, DXY), ngành và doanh nghiệp.
2. **Chống mù sự kiện ngắn hạn (`Event Blindness`):** Tránh tình trạng chỉ nhìn phân tích vĩ mô dài hạn mà bỏ quên các nhịp dòng tiền thực tế trong 1–3 tháng tới (ví dụ: kỳ review ETF ngày `13/11`, Nghị quyết ĐHCĐ chưa thực hiện, mốc đưa dự án/nhà máy mới vào vận hành).
3. **Phân tách khuyến nghị theo khẩu vị & thời gian nắm giữ:** Cùng một sự kiện xung đột (vĩ mô thận trọng vs. dòng tiền ETF mua ròng), hệ thống tách rõ hướng tiếp cận cho 3 nhóm khách hàng: **Ngắn hạn (1–4 tuần)**, **Trung/Dài hạn (3–12 tháng)** và **Tích sản phòng thủ (12+ tháng)**.

---

## 2. Kiến trúc Kết nối Antigravity -> Web Dashboard

```text
[Nguồn dữ liệu: FOMC / BLS / Google Sheets / CSV]
                     │
                     ▼
      [Antigravity Workspace Rules]
      ├── GEMINI.md (Quy tắc Top-Down 4 lớp, Thể chế VN, Chuỗi nhân quả, Giới hạn)
      └── .agents/skills/
          ├── macro-fomc-analyst/SKILL.md (Lớp 1–2: FOMC, CPI/PPI, US 10Y, DXY -> VN)
          └── event-radar-etf-agm/SKILL.md (Radar 1–3 tháng: ETF, ĐHCĐ, Dự án & Xung đột)
                     │
                     ▼
   [Điều phối Đa Tác Tử & Tự Động Hóa]
   ├── Macro Agent (Vĩ mô Mỹ & Việt Nam)
   ├── Event & Flow Agent (Radar ETF / ĐHCĐ / Dự án)
   ├── Sector & Stock Agent (Ngành & Doanh nghiệp đại diện)
   ├── Support Tổng (Portfolio Synthesizer — tổng hợp xung đột & 3 nhóm NĐT)
   ├── Scheduled Tasks (Quét định kỳ lịch FOMC, BLS CPI/PPI & Radar sự kiện)
   └── Google Sheets MCP / CSV Sync (Đọc & cập nhật bảng lịch sự kiện sống)
                     │
                     ▼
        [Web Dashboard (Vite + React + Tailwind)]
        ├── Khung Top-Down 4 lớp & Phần bù rủi ro thể chế
        ├── Chuỗi nhân quả (Giả định -> Kênh truyền dẫn -> Kịch bản thay thế)
        ├── Bảng Radar Sự Kiện 1–3 tháng & Cảnh báo Xung Đột (CONFLICT ALERT)
        ├── Ma trận Tác tử & Khuyến nghị tách theo 3 Nhóm Khách Hàng
        └── Nhập / Xuất CSV chuẩn UTF-8 BOM từ Google Sheets
```

---

## 3. Cấu trúc Thư mục Dự án

```text
Invesment-support-platform/
├── GEMINI.md                                      # Antigravity Workspace Rules (chuyển từ Claude Project Instructions)
├── README.md                                      # Tài liệu hướng dẫn kiến trúc & vận hành
├── .agents/
│   └── skills/
│       ├── macro-fomc-analyst/SKILL.md            # Skill phân tích FOMC, BLS, US 10Y, DXY -> VN
│       └── event-radar-etf-agm/SKILL.md           # Skill quét Radar sự kiện 1–3 tháng & gắn cờ xung đột
├── public/
│   └── sample-events.csv                          # Dữ liệu mẫu Radar sự kiện (chuẩn UTF-8 BOM mở tốt trên Excel)
├── src/
│   ├── data/
│   │   └── platformData.js                        # Dữ liệu mô phỏng Top-Down 4 lớp, chuỗi nhân quả, sự kiện & 3 nhóm NĐT
│   ├── components/                                # Các thành phần giao diện Dashboard
│   ├── App.jsx                                    # Giao diện chính của Demo MVP
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## 4. Hướng dẫn Cài đặt & Chạy Local

### Yêu cầu môi trường
- Node.js phiên bản 18 trở lên và `npm`.

### Các bước chạy trên máy cá nhân
```bash
# 1. Cài đặt thư viện phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển (Local Dev Server)
npm run dev

# 3. Đóng gói bản sản xuất (Production Build)
npm run build
```

Sau khi chạy `npm run dev`, mở địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`) để xem Web Dashboard.

---

## 5. Cách sử dụng với Antigravity & Google Sheets CSV

### A. Mở trực tiếp trong Google Antigravity
1. Clone hoặc mở thư mục dự án trong Antigravity.
2. Antigravity sẽ tự động nạp `GEMINI.md` làm quy tắc nền và nhận diện 2 kỹ năng tại `.agents/skills/`.
3. Có thể yêu cầu Antigravity chạy các tác vụ mẫu như:
   - *"Áp dụng skill `macro-fomc-analyst`, phân tích tác động nếu US 10Y Yield tăng và FOMC giữ lãi suất cao tới tỷ giá USD/VND và VN-Index."*
   - *"Áp dụng skill `event-radar-etf-agm`, quét `public/sample-events.csv`, chỉ ra các sự kiện xung đột với vĩ mô và đề xuất góc nhìn cho Nhóm A, B, C."*

### B. Nạp dữ liệu sự kiện tùy chỉnh từ Google Sheets (CSV)
1. Trên Google Sheets, giữ nguyên cấu trúc các cột chuẩn tương tự tệp mẫu `public/sample-events.csv`:
   `event_date`, `category`, `title`, `affected_tickers`, `horizon_impact`, `signal_direction`, `macro_conflict`, `source`, `updated_at` (hoặc tải file mẫu trực tiếp từ Dashboard để làm khuôn).
2. Xuất file từ Google Sheets dưới dạng **CSV (`.csv`)**.
3. Trên giao diện Web Dashboard, chọn **Tải lên CSV sự kiện** để nạp dữ liệu mới vào bảng Event Radar và đối chiếu cảnh báo xung đột ngay trên trình duyệt.
4. Nếu nâng cấp lên bản kết nối trực tiếp, gắn **Google Sheets MCP** trong Antigravity để agent đọc/ghi trực tiếp bảng tính thay cho bước xuất CSV thủ công, kết hợp **Scheduled Tasks** (tác vụ định kỳ) để tự động rà soát lịch FOMC và sự kiện mỗi tuần.

---

## 6. Giới hạn & Miễn trừ trách nhiệm

- Mọi số liệu, mã cổ phiếu minh họa và kịch bản trong bản Demo MVP nhằm mục đích **trình diễn cấu trúc phân tích và quy trình hỗ trợ tư vấn**.
- Hệ thống **không cam kết hiệu suất đầu tư hay đưa ra lời khuyên mua/bán chắc chắn**. Nhà đầu tư cần tự đánh giá khẩu vị rủi ro, khả năng chịu lỗ và tham vấn chuyên gia tài chính độc lập trước khi ra quyết định.
