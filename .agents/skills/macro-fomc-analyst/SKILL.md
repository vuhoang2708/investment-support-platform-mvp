---
name: macro-fomc-analyst
description: Phân tích vĩ mô Top-Down Lớp 1 và Lớp 2 từ biên bản FOMC, số liệu lạm phát BLS CPI/PPI, lợi suất US 10Y và chỉ số DXY, truy vết chuỗi nhân quả tác động tới tỷ giá USD/VND và định giá VN-Index tại Việt Nam.
---

# Kỹ Năng Phân Tích Vĩ Mô FOMC & Top-Down Lớp 1–2 (`macro-fomc-analyst`)

Kỹ năng này chuẩn hóa quy trình cho **Macro Agent** (hoặc cố vấn đầu tư) đánh giá bối cảnh quốc tế và truyền dẫn sang thị trường Việt Nam theo đúng chuẩn `GEMINI.md`.

## Khi nào sử dụng
- Trước/sau các kỳ họp **FOMC (Ủy ban Thị trường Mở Liên bang Mỹ)** hoặc khi có biên bản họp (`FOMC Minutes`).
- Khi Cục Thống kê Lao động Mỹ (**BLS**) công bố **CPI** (Chỉ số giá tiêu dùng) hoặc **PPI** (Chỉ số giá sản xuất).
- Khi **US 10Y Yield** (lợi suất trái phiếu Chính phủ Mỹ 10 năm) hoặc **DXY** biến động mạnh ảnh hưởng tới tỷ giá `USD/VND`.
- Khi cần cập nhật đầu vào Lớp 1 & Lớp 2 cho danh mục đầu tư tại Việt Nam.

---

## Quy trình thực hiện từng bước

### Bước 1: Thu thập & Xác thực Chỉ báo Vĩ mô Mỹ
Kiểm tra và ghi rõ **giá trị, nguồn, thời điểm công bố** cho 4 chỉ báo trọng yếu:
1. **Biên bản FOMC / Lộ trình FED (`Fed Funds Rate` & `Dot Plot`):** Tín hiệu diều hâu (`hawkish`) hay bồ câu (`dovish`), số lần cắt/giữ lãi suất dự kiến.
2. **Lạm phát Mỹ (`BLS CPI / Core CPI / PPI`):** So với kỳ vọng (`consensus`) và xu hướng 3 tháng gần nhất.
3. **Lợi suất `US 10Y Yield`:** Sử dụng làm **thước đo tham chiếu lãi suất phi rủi ro (`Risk-Free Rate Proxy`)** toàn cầu; đánh giá áp lực lên tỷ suất chiết khấu định giá cổ phiếu.
4. **Chỉ số `DXY`:** Đo lường sức mạnh đồng USD và xu hướng dòng vốn rút/vào thị trường mới nổi (`EM` / `Frontier`).

> Nếu không có dữ liệu trực tiếp trong phiên, đánh dấu rõ `[CẦN CẬP NHẬT NGUỒN THỰC]` hoặc ghi rõ nguồn dữ liệu từ `src/data/platformData.js` (nếu đang chạy demo).

### Bước 2: Đánh giá Lớp 1 — Thể chế & Phần bù rủi ro tại Việt Nam
Đối chiếu tác động ngoại sinh với **4 biến số rủi ro thể chế nội địa**:
1. **Chu kỳ nhân sự & chuyển giao điều hành:** Mức độ ổn định chính sách và tâm lý ra quyết định.
2. **Phân bổ nguồn lực (Đất đai / Tín dụng / Đầu tư công):** Room tín dụng NHNN và tiến độ tháo gỡ pháp lý dự án.
3. **Tốc độ giải ngân & thực thi chính sách:** Tốc độ giải ngân đầu tư công thực tế và hiệu quả kích thích tổng cầu.
4. **Minh bạch & kiểm chứng thông tin:** Mức độ rõ ràng của thông điệp điều hành và số liệu vĩ mô.

-> Tổng hợp thành đánh giá **Phần bù rủi ro thể chế** (`Thấp / Trung bình / Cao` + nhận định xu hướng).

### Bước 3: Truy vết Kênh Truyền Dẫn sang Lớp 2 (Việt Nam & VN-Index)
Xây dựng chuỗi nhân quả rõ ràng từ Mỹ về Việt Nam:
- **Kênh Tỷ giá (`USD/VND`):** Áp lực chênh lệch lãi suất `USD - VND` -> khả năng NHNN can thiệp (phát hành tín phiếu `T-bills`, bán ngoại tệ giao ngay, hay giữ nguyên lãi suất điều hành).
- **Kênh Thanh khoản & Lãi suất nội địa:** Lãi suất liên ngân hàng qua đêm -> chi phí vốn của nhóm Ngân hàng và Doanh nghiệp.
- **Kênh Dòng vốn ngoại & Định giá (`P/E`, `P/B` VN-Index):** `US 10Y Yield` tăng + `Phần bù rủi ro thể chế` -> tăng chi phí vốn chủ sở hữu (`Cost of Equity`), thu hẹp định giá chấp nhận được của `VN-Index`.

### Bước 4: Kiểm tra Xung đột Ngắn hạn & Tổng hợp Đầu ra
Trước khi kết luận, chuyển tín hiệu Lớp 1–2 sang đối chiếu với `event-radar-etf-agm` để xem trong 1–3 tháng tới có sự kiện dòng tiền cục bộ nào (như ETF review) đi ngược xu hướng vĩ mô hay không.

---

## Định dạng Đầu ra Bắt buộc

Mỗi bản phân tích từ skill này phải trình bày đủ 6 mục sau:
1. **Bảng dữ liệu đầu vào:** Chỉ số | Giá trị mới nhất | Nguồn | Thời điểm.
2. **Giả định nền:** 2–3 giả định chính đang giữ cố định.
3. **Chuỗi nhân quả (Lớp 1 & Lớp 2):** `Sự kiện gốc -> Kênh truyền dẫn -> Tác động tới Tỷ giá / NHNN / VN-Index`.
4. **Đánh giá Phần bù rủi ro thể chế:** Tóm tắt theo 4 biến số thể chế Việt Nam.
5. **Kịch bản thay thế (tối thiểu 1 kịch bản):** Điều kiện kích hoạt + hướng dịch chuyển tác động.
6. **Mức độ tin cậy & Giới hạn:** Đánh giá `Cao / Trung bình / Thấp` + nhắc miễn trừ trách nhiệm tư vấn.
