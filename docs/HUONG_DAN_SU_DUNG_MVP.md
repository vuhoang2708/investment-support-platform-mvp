# Hướng Dẫn Sử Dụng & Trải Nghiệm Demo MVP
## Nền Tảng Hỗ Trợ Tư Vấn Đầu Tư Top-Down 4 Lớp & Event Radar (Antigravity Edition)

---

## 1. Liên Kết Truy Cập Nhanh

- **Web Demo Trực Tuyến (Live trên Vercel):**  
  https://investment-support-platform-mvp.vercel.app
- **Kho Mã Nguồn & Bộ Khung Antigravity (GitHub):**  
  https://github.com/vuhoang2708/investment-support-platform-mvp

> **Lưu ý dữ liệu:** Phiên bản Web Demo sử dụng bộ dữ liệu mô phỏng (giả định bối cảnh tháng 10–11 để tái hiện trực quan xung đột giữa tín hiệu vĩ mô FOMC/US 10Y và kỳ cơ cấu ETF ngày 13/11). Mọi nội dung chỉ mang tính tham khảo phương pháp luận, không phải khuyến nghị mua/bán cụ thể.

---

## 2. Yêu Cầu Ban Đầu & Mức Độ Đáp Ứng Trên MVP

Tài liệu này và bản Demo MVP được xây dựng trực tiếp từ bài toán thực tế, `Project Instructions` trên Claude và thói quen vận hành của Chuyên viên tư vấn (Advisor):

| Yêu cầu / Nỗi đau ban đầu (Advisor) | Giải pháp tương ứng trên bản Demo MVP & Antigravity Kit |
| :--- | :--- |
| **1. Bản đồ dẫn truyền Top-Down 4 lớp & Bối cảnh thể chế VN:** Giữ đúng vai trò Portfolio Manager, phân tích từ *(1) Thể chế - chính trị vĩ mô VN → (2) Kinh tế vĩ mô → (3) Ngành → (4) Cổ phiếu*, quy đổi 4 biến số thể chế thành *Phần bù rủi ro thể chế*, nêu rõ giả định, chuỗi nhân quả, kịch bản thay thế, độ tin cậy và miễn trừ trách nhiệm. | Tích hợp trọn vẹn ở **Tab 1 (Bản Đồ Dẫn Truyền 4 Lớp)** trên Web Demo và được đóng gói nguyên bản thành bộ quy tắc nền trong tệp **`GEMINI.md`** của kho Antigravity. |
| **2. Chống "mù sự kiện" (ví dụ tháng 10–11):** Tránh lỗi chỉ nhìn FED/lãi suất phi rủi ro ép giảm định giá mà bỏ sót kỳ cơ cấu quỹ ETF (`13/11`), kế hoạch vận hành dự án mới hoặc Nghị quyết ĐHCĐ chưa thực hiện trong 1–3 tháng tới. | Tích hợp ở **Tab 2 (Radar Sự Kiện 1–3 Tháng)** với cơ chế gắn cờ **`CONFLICT ALERT`** tự động khi tín hiệu vĩ mô ngược chiều dòng tiền sự kiện ngắn hạn. |
| **3. Mô hình Đa Tác Nhân + Cá nhân hóa khách hàng:** Chia mỗi Agent riêng quan tâm một vấn đề, có **1 Agent Support Tổng** và Chuyên viên tư vấn là **Người Quan Sát Tổng**, từ đó tách khuyến nghị theo khung thời gian nắm giữ của từng nhóm khách hàng. | Tích hợp ở **Tab 3 (Đa Tác Nhân & Khách Hàng)** với 3 Agent chuyên trách (`Macro`, `Event & Flow`, `Sector & Stock`) → `Support Tổng` → `Người Quan Sát Tổng` và bộ chuyển **Nhóm A (1–4 tuần) / Nhóm B (3–12 tháng) / Nhóm C (12+ tháng)**. |
| **4. Ưu tiên giải pháp hơn ngồi code & tận dụng Google Sheets:** Hiện đang chạy tay lịch 1 tuần/lần trên Claude Project (tốn hạn mức `usage`), chưa nối được nguồn tin từ CTCK, Sở giao dịch và DN niêm yết; quen dùng Google Sheets và muốn tránh lập trình phức tạp. | Web Demo hỗ trợ **nạp trực tiếp Google Sheets (Publish CSV) / file `.csv`** ngay ở Tab 2; phần tự động hóa khi chạy thật sử dụng **Antigravity (`GEMINI.md` + 2 Skills + Scheduled Tasks)** để AI tự xử lý thay cho việc tự code thủ công. |

---

## 3. Kiến Trúc Cốt Lõi Của Nền Tảng

Hệ thống chuyển đổi quy trình hỏi đáp thủ công rời rạc trên chat thành mô hình vận hành **Đa tác nhân có cấu trúc (`Multi-Agent` + `Human-in-the-Loop`)**:

1. **Khung Phân Tích Top-Down 4 Lớp:**
   - **Lớp 1 — Thể chế & Chính trị vĩ mô Việt Nam:** Đánh giá 4 biến số định lượng được (*chu kỳ nhân sự sau Đại hội Đảng, phân bổ nguồn lực đất đai & tín dụng, tốc độ giải ngân & thực thi chính sách, minh bạch & kiểm chứng thông tin*) và quy đổi thành **Phần bù rủi ro thể chế** (`+1.8% – +2.5%`).
   - **Lớp 2 — Kinh tế vĩ mô Mỹ & Việt Nam:** Theo dõi lộ trình lãi suất FED (`FOMC`), lạm phát Mỹ (`BLS CPI/PPI`), lợi suất trái phiếu Mỹ 10 năm (`US 10Y Yield`), chỉ số `DXY`, tỷ giá `USD/VND`, điều hành của `NHNN` và định giá `VN-Index`.
   - **Lớp 3 — Ngành / Lĩnh vực:** Đánh giá độ nhạy lãi suất/tỷ giá và động lực từng ngành (Ngân hàng, Bất động sản KCN, Bán lẻ, Thép/VLXD, Hạ tầng).
   - **Lớp 4 — Cổ phiếu / Doanh nghiệp đại diện:** Đối chiếu chất xúc tác (`catalyst`) riêng như dự án mới sắp vận hành và Nghị quyết ĐHCĐ chưa thực hiện.
2. **Cơ chế Chống Mù Sự Kiện (`Event Radar 1–3 Tháng`):** Tự động gắn cờ **Cảnh báo Xung đột (`CONFLICT ALERT`)** khi tín hiệu vĩ mô trung hạn đi ngược dòng tiền kỹ thuật ngắn hạn (ví dụ: US 10Y neo cao nhưng ETF sắp giải ngân mua ròng vào ngày 13/11).
3. **Luồng Điều Phối Tác Nhân:**
   - **3 Agent chuyên trách:** `Macro Agent` (Vĩ mô) · `Event & Flow Agent` (Radar ETF/ĐHCĐ/Dự án) · `Sector & Stock Agent` (Ngành & DN).
   - **1 Agent Support Tổng:** Tổng hợp báo cáo, phát hiện điểm mù và tách khuyến nghị theo 3 nhóm kỳ hạn nắm giữ của khách hàng.
   - **Người Quan Sát Tổng (Chuyên viên tư vấn):** Kiểm tra lần cuối, điều chỉnh theo bối cảnh thực tế của từng khách hàng trước khi tư vấn.

---

## 4. Hướng Dẫn Trải Nghiệm 4 Tab Trên Web Demo

Truy cập đường dẫn: https://investment-support-platform-mvp.vercel.app

### Bước 0: Chọn Nhóm Khách Hàng Đang Tư Vấn (Thanh trên cùng)
Ở góc trên bên phải, chuyển đổi qua lại giữa 3 nhóm khách hàng để quan sát hệ thống tự động đổi góc nhìn cho cùng một sự kiện:
- **Nhóm A (1–4 tuần):** Giao dịch ngắn hạn, nhạy với dòng tiền ETF và tin sự kiện.
- **Nhóm B (3–12 tháng):** Nắm giữ trung/dài hạn theo tiến độ dự án và Nghị quyết ĐHCĐ.
- **Nhóm C (12+ tháng):** Tích sản phòng thủ, ưu tiên cổ tức và biên an toàn.

### Tab 1 — Bản Đồ Dẫn Truyền 4 Lớp (`Top-Down Causal Map`)
- Bấm chọn từng tầng từ **L1 → L2 → L3 → L4** để xem chi tiết các biến số, chỉ số vĩ mô, triển vọng ngành và mã minh họa mô phỏng.
- Kéo xuống phần **Chuỗi Dẫn Truyền Nhân Quả**, bấm từng kịch bản để xem cấu trúc lập luận chuẩn: *Sự kiện gốc → Kênh truyền dẫn → Tác động → Giả định nền → Kịch bản thay thế → Mức độ tin cậy*.

### Tab 2 — Radar Sự Kiện & Google Sheets (`Event Radar`)
- Xem danh sách sự kiện 1–3 tháng tới kèm thẻ cảnh báo đỏ **`CONFLICT ALERT`** ở sự kiện Review ETF ngày 13/11.
- Lọc nhanh theo *Chỉ cảnh báo xung đột*, *Nhóm sự kiện*, hoặc tìm theo mã cổ phiếu minh họa (`VCB`, `HPG`, `MWG`, `KBC`).
- **Thử tính năng nạp dữ liệu từ Google Sheets / CSV:**
  1. Bấm **Tải CSV mẫu (UTF-8 BOM)** để mở thử bằng Excel hoặc nhập vào Google Sheets (hỗ trợ đầy đủ dấu tiếng Việt).
  2. Muốn nối Google Sheets cá nhân: vào Google Sheets của bạn → chọn **Tệp (File) → Chia sẻ (Share) → Xuất bản lên web (Publish to web)** → chọn định dạng **Giá trị được phân tách bằng dấu phẩy (.csv)** → copy đường dẫn và dán vào ô **Nạp Google Sheets** trên web.
  3. Hoặc bấm **Chọn tệp CSV sự kiện...** để tải trực tiếp file `.csv` từ máy lên bảng Radar.

### Tab 3 — Đa Tác Nhân & Khách Hàng (`Multi-Agent & Client Fit`)
- Bấm chọn từng tác nhân trong sơ đồ để xem góc nhìn độc lập và cảnh báo điểm mù riêng của từng Agent.
- So sánh trực tiếp 3 cột hành động cho **Nhóm A / Nhóm B / Nhóm C** trước cùng một cặp sự kiện *FOMC vs Review ETF 13/11*.

### Tab 4 — Khung Antigravity (`Antigravity Workspace Kit`)
- Xem cách chuyển đổi từ *Project Instructions* trên Claude sang bộ tệp cấu hình gốc của Antigravity (`GEMINI.md` và 2 kỹ năng trong `.agents/skills/`).
- Có sẵn nút **Sao chép** cho mẫu `GEMINI.md` và câu lệnh khởi chạy mẫu (`Starter Prompt`) để dùng ngay trên máy cá nhân.

---

## 5. Hướng Dẫn Đưa Về Máy Chạy Thật Với Antigravity (4 Bước)

Để dùng khung này cho công việc tư vấn hàng ngày (thay vì chạy tay trên Claude Project):

1. **Tải mã nguồn về máy:**
   - Mở trang GitHub `https://github.com/vuhoang2708/investment-support-platform-mvp`, bấm **Code → Download ZIP** và giải nén vào một thư mục trên máy (hoặc chạy `git clone https://github.com/vuhoang2708/investment-support-platform-mvp.git`).
2. **Mở Project trong Antigravity:**
   - Mở ứng dụng **Antigravity** → chọn mục **Projects** ở thanh bên trái → trỏ vào thư mục vừa tải.
   - Antigravity sẽ tự động đọc tệp `GEMINI.md` ở thư mục gốc làm bộ quy tắc nền (Vai trò, Top-Down 4 lớp, Phần bù rủi ro thể chế, Chống mù sự kiện, Miễn trừ trách nhiệm).
3. **Kiểm tra 2 Skills dựng sẵn:**
   - Mở mục **Skills & Customizations** bên thanh trái để xem 2 quy trình chuẩn đã đóng gói:
     - `macro-fomc-analyst`: Phân tích biên bản FOMC, BLS CPI/PPI, US 10Y, DXY và truy vết tác động sang Việt Nam.
     - `event-radar-etf-agm`: Quét bảng sự kiện `public/sample-events.csv` (hoặc Google Sheets), phát hiện xung đột với vĩ mô và xuất khuyến nghị tách riêng cho 3 nhóm khách hàng.
4. **Thực hành vận hành tự động hóa:**
   - Mở mục **Scheduled Tasks** (hoặc gõ `/schedule` trong khung chat) để hẹn lịch tự động rà soát lịch sự kiện 1–3 tháng định kỳ hàng tuần.
   - Dùng `@` (**Mentions**) để đính kèm các file ghi chú `.md` cũ hoặc bảng CSV sự kiện mới rồi yêu cầu Antigravity tổng hợp bằng nhiều `Subagents` song song.

---

## 6. Miễn Trừ Trách Nhiệm

Tài liệu này phục vụ mục đích hướng dẫn sử dụng bản Demo MVP và khung phương pháp luận phân tích. Mọi thông tin và lập luận từ hệ thống chỉ mang tính chất tham khảo hỗ trợ quyết định; nhà đầu tư cần tự cân nhắc khẩu vị rủi ro cá nhân, tỷ trọng vốn và tham vấn chuyên gia tài chính độc lập trước khi thực hiện giao dịch.
