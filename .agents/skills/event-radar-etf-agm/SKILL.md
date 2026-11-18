---
name: event-radar-etf-agm
description: Quét lịch sự kiện 1–3 tháng tới (kỳ review ETF, nghị quyết ĐHCĐ chưa thực hiện, mốc vận hành dự án) từ Google Sheets hoặc public/sample-events.csv, phát hiện xung đột với tín hiệu vĩ mô và ánh xạ khuyến nghị theo khung thời gian nắm giữ của từng nhóm khách hàng.
---

# Kỹ Năng Radar Sự Kiện & Chống Mù Sự Kiện (`event-radar-etf-agm`)

Kỹ năng này chuẩn hóa quy trình cho **Event & Flow Agent** nhằm đảm bảo tư vấn đầu tư không bị "mù sự kiện" khi chỉ dựa vào phân tích vĩ mô dài hạn.

## Khi nào sử dụng
- Trước mỗi tuần/tháng giao dịch hoặc khi chuẩn bị bản tin tư vấn cho 3 nhóm khách hàng.
- Khi cần rà soát **cửa sổ 1–3 tháng tới** cho các sự kiện: Review rổ chỉ số ETF, Nghị quyết ĐHCĐ năm hiện tại chưa thực hiện, hoặc mốc vận hành dự án/nhà máy mới.
- Khi cần đọc, kiểm tra hoặc cập nhật dữ liệu sự kiện từ **Google Sheets** hoặc tệp **`public/sample-events.csv`**.

---

## Quy trình thực hiện từng bước

### Bước 1: Nạp & Chuẩn hóa Nguồn Dữ Liệu Sự Kiện
1. **Nguồn ưu tiên:** Nếu workspace đã kết nối **Google Sheets MCP**, đọc trực tiếp sheet lịch sự kiện hiện hành của đội ngũ tư vấn.
2. **Nguồn cục bộ / Demo:** Nếu chạy ngoại tuyến hoặc demo, đọc tệp `public/sample-events.csv` (hoặc tệp CSV người dùng mới tải lên trên Dashboard).
3. **Kiểm tra cấu trúc cột tối thiểu:**
   - `event_date` (Ngày dự kiến, định dạng `YYYY-MM-DD`)
   - `category` (Nhóm: `ETF Review`, `ĐHCĐ chưa thực hiện`, `Vận hành dự án`, `Vĩ mô Mỹ`, `Chính sách VN`)
   - `title` (Tên sự kiện)
   - `affected_tickers` (Nhóm ngành / mã đại diện chịu tác động)
   - `horizon_impact` (Khung tác động: `Ngắn hạn`, `Trung hạn`, `Dài hạn`)
   - `signal_direction` (Hướng dòng tiền/tác động: `Tích cực`, `Trung lập`, `Áp lực`)
   - `macro_conflict` (`YES` / `NO` — có xung đột với tín hiệu vĩ mô Lớp 1–2 hay không)
   - `source` & `updated_at` (Nguồn kiểm chứng & thời điểm cập nhật)

> **Lưu ý mã hóa UTF-8:** Mọi tệp `.csv` chứa tiếng Việt xuất ra cho người dùng mở trên Excel **BẮT BUỘC** có tiền tố UTF-8 BOM (`\uFEFF`) để không lỗi dấu tiếng Việt.

### Bước 2: Quét Lọc 3 Nhóm Sự Kiện Cốt Lõi (Cửa sổ 1–3 tháng tới)
Phân loại rõ các sự kiện sắp diễn ra trong 30–90 ngày tới:
1. **Lịch Review rổ chỉ số ETF:** Ví dụ kỳ cơ cấu quý (như mốc `13/11`), ước lượng quy mô mua/bán ròng dự kiến và cổ phiếu vốn hóa lớn hưởng lợi/chịu áp lực ngắn hạn.
2. **Nghị quyết ĐHCĐ năm nay chưa thực hiện:** Kiểm tra các kế hoạch đã được thông qua nhưng chưa hoàn tất (chia cổ tức tiền mặt/cổ phiếu, phát hành tăng vốn, thoái vốn, M&A) có khả năng dồn thực hiện vào các tháng cuối kỳ.
3. **Tiến độ vận hành dự án / nhà máy mới:** Đánh dấu mốc nghiệm thu, chạy thử (`trial run`) hoặc vận hành thương mại (`commercial operation` — ví dụ mở rộng công suất thép/KCN) tạo điểm rơi doanh thu mới.

### Bước 3: Đối Chiếu Chéo & Gắn Cờ Xung Đột (`CONFLICT ALERT`)
So sánh danh sách sự kiện vừa quét với kết quả từ `macro-fomc-analyst` (Lớp 1–2):
- Nếu vĩ mô đang phát tín hiệu **Thận trọng / Áp lực** (ví dụ: FOMC giữ lãi suất cao, US 10Y tăng, tỷ giá căng) **NHƯNG** một sự kiện ngắn hạn (như ETF review mua ròng ngày 13/11) tạo **Lực đẩy dòng tiền ngắn hạn (`Tích cực`)**:
  - Gắn ngay cờ **`CONFLICT ALERT`**.
  - Ghi rõ chuỗi nhân quả đối nghịch: đâu là **lực kỹ thuật ngắn hạn (1–4 tuần)** và đâu là **áp lực nền trung hạn (3–12 tháng)**.

### Bước 4: Ánh Xạ Khuyến Nghị Theo 3 Nhóm Khách Hàng
Tuyệt đối **không đưa 1 lời khuyên chung cho mọi khách hàng**. Phải tách rõ hành động tham khảo cho 3 nhóm:

1. **Nhóm A — Giao dịch ngắn hạn (1–4 tuần):**
   - Tập trung vào dòng tiền sự kiện, thanh khoản và điểm rơi kỹ thuật (ví dụ: tận dụng nhịp đẩy giá quanh ngày ETF review `13/11`, tuân thủ kỷ luật quản trị rủi ro ngắn hạn).
2. **Nhóm B — Nắm giữ trung/dài hạn (3–12 tháng):**
   - Không chạy theo nhiễu động ETF 1–2 phiên; tập trung vào tiến độ thực hiện Nghị quyết ĐHCĐ, mốc vận hành dự án mới và sức chống chịu biên lợi nhuận trước tỷ giá/lãi suất.
3. **Nhóm C — Tích sản phòng thủ (12+ tháng):**
   - Chỉ giải ngân từng phần khi giá chiết khấu đủ sâu đã phản ánh phần bù rủi ro thể chế và mặt bằng lãi suất phi rủi ro mới; ưu tiên doanh nghiệp đầu ngành ít đòn bẩy ngoại tệ.

### Bước 5: Cập nhật Lại Bảng Theo Dõi & Miễn Trừ Trách Nhiệm
- Nếu có sự kiện mới hoặc thay đổi tiến độ, đề xuất cập nhật dòng tương ứng vào Google Sheets (khi có xác nhận của người dùng) hoặc xuất bản CSV mới chuẩn UTF-8 BOM.
- Đính kèm đầy đủ tuyên bố miễn trừ trách nhiệm: không cam kết hiệu suất mua/bán; nhà đầu tư tự cân nhắc khẩu vị rủi ro và tham vấn chuyên gia độc lập.
