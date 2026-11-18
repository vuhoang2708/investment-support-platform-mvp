export const MANDATORY_DISCLAIMER =
  'Mọi phân tích chỉ mang tính tham khảo; nhà đầu tư tự cân nhắc khẩu vị rủi ro và tham vấn chuyên gia độc lập.';

export const PLATFORM_META = {
  title: 'Nền Tảng Hỗ Trợ Tư Vấn Đầu Tư Top-Down & Event Radar',
  subtitle: 'Khung phân tích nhân quả 4 lớp & Cơ chế chống mù sự kiện 1–3 tháng tới',
  version: 'Demo MVP v1.0',
  advisorContext: {
    advisorName: 'Tâm',
    role: 'Chuyên viên tư vấn đầu tư (YSVN)',
    workflowGoal:
      'Kết nối phân tích Top-Down 4 lớp (Thể chế VN -> Vĩ mô Mỹ/VN -> Ngành -> Cổ phiếu) với Radar sự kiện 1–3 tháng để phân tách khuyến nghị theo từng nhóm khẩu vị khách hàng.',
  },
  institutionalRiskPremium: {
    label: 'Phần bù rủi ro thể chế',
    estimatedRange: '+1.8% – +2.5% / năm',
    compositeScore: 64,
    maxScore: 100,
    stance: 'Thận trọng có chọn lọc',
    note: 'Cộng trực tiếp vào chi phí vốn (Ke) hoặc ngưỡng chiết khấu định giá khi đánh giá doanh nghiệp phụ thuộc đất đai, tín dụng và phê duyệt đầu tư công.',
  },
  dataFreshnessNote:
    'Bộ dữ liệu minh họa phục vụ Demo MVP (giả định mốc tham chiếu tháng 10–11/2025 để tái hiện kịch bản thực tế giữa tín hiệu FOMC/US 10Y và kỳ Review ETF 13/11).',
  disclaimer: MANDATORY_DISCLAIMER,
};

export const TOP_DOWN_LAYERS = [
  {
    id: 'layer-1',
    layerNumber: 1,
    name: 'Thể chế - Chính trị vĩ mô Việt Nam',
    shortName: 'Thể chế VN',
    badge: 'Lớp 1 · Nền tảng định giá',
    summary:
      'Đo lường các biến số thể chế đặc thù tại Việt Nam và quy đổi thành "Phần bù rủi ro thể chế" trong mô hình chiết khấu định giá và phân bổ tỷ trọng.',
    coreMetric: {
      name: 'Phần bù rủi ro thể chế',
      value: '+1.8% – +2.5%',
      status: 'Cần theo dõi chặt',
    },
    variables: [
      {
        id: 'var-personnel-cycle',
        name: 'Chu kỳ nhân sự sau Đại hội Đảng',
        score: 68,
        weight: '30%',
        status: 'Chuyển tiếp nhạy cảm',
        description:
          'Mức độ ổn định bộ máy ra quyết định ở cấp bộ, ngành và địa phương ảnh hưởng trực tiếp tới tốc độ ký duyệt thủ tục đầu tư và cấp phép dự án.',
        signal: 'Tâm lý thận trọng trong phê duyệt hồ sơ mới có dấu hiệu cải thiện dần nhưng chưa đồng đều giữa các địa phương.',
      },
      {
        id: 'var-resource-allocation',
        name: 'Phân bổ nguồn lực đất đai & tín dụng',
        score: 62,
        weight: '25%',
        status: 'Phân hóa mạnh',
        description:
          'Khả năng tiếp cận hạn mức tăng trưởng tín dụng (room tín dụng) và tháo gỡ pháp lý quỹ đất sạch cho bất động sản khu công nghiệp, nhà ở và hạ tầng.',
        signal: 'Ưu tiên dòng vốn vào sản xuất, xuất khẩu, hạ tầng và các doanh nghiệp đầu ngành có bảng cân đối lành mạnh.',
      },
      {
        id: 'var-policy-execution',
        name: 'Tốc độ giải ngân & thực thi chính sách',
        score: 58,
        weight: '25%',
        status: 'Cải thiện chậm hơn kỳ vọng',
        description:
          'Độ trễ giữa ban hành nghị quyết/luật mới (Đất đai, Nhà ở, Kinh doanh BĐS) với tiến độ giải ngân đầu tư công thực tế trên công trường.',
        signal: 'Áp lực tăng tốc giải ngân quý IV thường tạo nhịp hỗ trợ cho nhóm VLXD và nhà thầu hạ tầng.',
      },
      {
        id: 'var-info-transparency',
        name: 'Minh bạch & kiểm chứng thông tin',
        score: 66,
        weight: '20%',
        status: 'Rủi ro nhiễu thông tin cao',
        description:
          'Tần suất tin đồn thị trường liên quan đến thanh tra, trái phiếu doanh nghiệp hoặc thay đổi nhân sự cấp cao làm tăng biên độ biến động ngắn hạn.',
        signal: 'Bắt buộc đối chiếu công bố thông tin chính thức (HOSE/HNX/ĐHCĐ) trước khi hành động theo tin đồn.',
      },
    ],
    source: 'Tổng hợp khung thể chế nội bộ & Cổng thông tin Chính phủ / Bộ Tài chính',
    timestamp: '2025-10-28 08:30 ICT',
  },
  {
    id: 'layer-2',
    layerNumber: 2,
    name: 'Kinh tế vĩ mô Mỹ & Việt Nam',
    shortName: 'Vĩ mô Mỹ & VN',
    badge: 'Lớp 2 · Thanh khoản & Lãi suất',
    summary:
      'Theo dõi mặt bằng lãi suất phi rủi ro toàn cầu (US 10Y, lộ trình FED/FOMC) và áp lực truyền dẫn sang tỷ giá USD/VND, chính sách điều hành NHNN và định giá VN-Index.',
    coreMetric: {
      name: 'Áp lực lãi suất phi rủi ro & tỷ giá',
      value: 'Trung bình - Cao',
      status: 'US 10Y & DXY neo cao',
    },
    indicators: [
      {
        id: 'ind-fomc',
        name: 'Lộ trình lãi suất FED (FOMC Rate Path)',
        currentValue: '4.50% – 4.75% (Kỳ vọng giảm chậm)',
        trend: 'Thận trọng hơn (Higher for longer tái xuất hiện)',
        impact: 'Giữ chi phí vốn USD ở mức cao, làm chậm dòng vốn ngoại chủ động quay lại thị trường mới nổi.',
        source: 'Federal Reserve / CME FedWatch',
      },
      {
        id: 'ind-bls',
        name: 'Lạm phát Mỹ (BLS CPI / PPI)',
        currentValue: 'CPI lõi 3.2% YoY · PPI ổn định vùng 2.3%',
        trend: 'Hạ nhiệt không đều ở nhóm dịch vụ',
        impact: 'Mỗi kỳ công bố BLS CPI nóng hơn dự báo đều kích hoạt nhịp tăng tức thời của DXY và US 10Y.',
        source: 'U.S. Bureau of Labor Statistics (BLS)',
      },
      {
        id: 'ind-dxy',
        name: 'Chỉ số sức mạnh đồng USD (DXY)',
        currentValue: '104.8 điểm',
        trend: 'Tăng trong ngắn hạn',
        impact: 'Gây áp lực lên các đồng tiền châu Á, thu hẹp dư địa nới lỏng thêm lãi suất điều hành tại Việt Nam.',
        source: 'ICE / Bloomberg Terminal Snapshot',
      },
      {
        id: 'ind-us10y',
        name: 'Lợi suất Trái phiếu Chính phủ Mỹ 10 năm (US 10Y Yield)',
        currentValue: '4.35% (Neo chuẩn lãi suất phi rủi ro)',
        trend: 'Neo cao',
        impact: 'Làm giảm sức hấp dẫn tương đối của tỷ suất lợi nhuận cổ phiếu (Earnings Yield Gap) tại Việt Nam.',
        source: 'U.S. Department of the Treasury',
      },
      {
        id: 'ind-fx-vn',
        name: 'Tỷ giá USD/VND & Chính sách NHNN',
        currentValue: '25,320 VND/USD · OMO linh hoạt',
        trend: 'Áp lực cục bộ cuối năm',
        impact: 'NHNN ưu tiên ổn định tỷ giá qua phát hành tín phiếu / điều tiết thanh khoản liên ngân hàng thay vì hạ thêm lãi suất điều hành.',
        source: 'Ngân hàng Nhà nước Việt Nam (NHNN)',
      },
      {
        id: 'ind-vnindex',
        name: 'VN-Index & Mặt bằng định giá P/E',
        currentValue: '1,255 điểm · P/E forward ~11.8x',
        trend: 'Đi ngang tích lũy, phân hóa thanh khoản',
        impact: 'Định giá tổng thể không đắt nhưng thiếu động lực bứt phá diện rộng nếu khối ngoại tiếp tục bán ròng trước các mốc sự kiện kỹ thuật.',
        source: 'HOSE / FiinPro Snapshot',
      },
    ],
    source: 'FED, BLS, U.S. Treasury, NHNN, HOSE',
    timestamp: '2025-10-28 08:30 ICT',
  },
  {
    id: 'layer-3',
    layerNumber: 3,
    name: 'Ngành / Lĩnh vực trọng tâm',
    shortName: 'Ngành / Lĩnh vực',
    badge: 'Lớp 3 · Phân bổ dòng tiền',
    summary:
      'Đánh giá độ nhạy của từng nhóm ngành trước biến động vĩ mô (lãi suất, tỷ giá, đầu tư công) và các catalyst riêng trong 1–3 tháng tới.',
    coreMetric: {
      name: 'Nhóm ngành ưu tiên chọn lọc',
      value: 'Thép/VLXD · BĐS KCN · Bán lẻ',
      status: 'Phân hóa theo câu chuyện riêng',
    },
    sectors: [
      {
        id: 'sec-bank',
        name: 'Ngân hàng',
        outlook: 'Trung tính - Tích cực chọn lọc',
        macroSensitivity: 'Nhạy cao với NIM, room tín dụng và thanh khoản OMO của NHNN.',
        catalyst: 'Tăng trưởng tín dụng cuối năm & hưởng lợi dòng tiền mua ròng khi ETF cơ cấu nhóm vốn hóa lớn.',
        keyRisk: 'Áp lực nợ xấu tiềm ẩn khi một số phân khúc bất động sản dân cư phục hồi chậm.',
      },
      {
        id: 'sec-ip',
        name: 'Bất động sản Khu công nghiệp (KCN)',
        outlook: 'Khả quan',
        macroSensitivity: 'Hưởng lợi xu hướng dịch chuyển FDI nhưng nhạy với tiến độ phê duyệt pháp lý đất đai (Lớp 1).',
        catalyst: 'Ký mới biên bản ghi nhớ (MOU) bàn giao đất và cập nhật tiến độ tháo gỡ quy hoạch.',
        keyRisk: 'Độ trễ bàn giao mặt bằng sạch nếu thủ tục hành chính địa phương kéo dài.',
      },
      {
        id: 'sec-retail',
        name: 'Bán lẻ & Tiêu dùng',
        outlook: 'Phục hồi phân hóa',
        macroSensitivity: 'Phụ thuộc sức mua nội địa, chi phí tài chính và tỷ giá nhập khẩu thiết bị.',
        catalyst: 'Mùa cao điểm tiêu dùng quý IV & tối ưu chi phí vận hành tại các chuỗi dẫn đầu.',
        keyRisk: 'Biên lợi nhuận gộp bị co hẹp nếu cạnh tranh giá quay trở lại.',
      },
      {
        id: 'sec-steel',
        name: 'Thép / Vật liệu xây dựng (VLXD)',
        outlook: 'Tích cực theo điểm rơi công suất',
        macroSensitivity: 'Chịu tác động kép từ giá nguyên liệu thế giới, thuế phòng vệ thương mại và tiến độ giải ngân đầu tư công.',
        catalyst: 'Điểm rơi đưa nhà máy / dây chuyền công suất mới (như dự án Dung Quất 2) vào vận hành thương mại.',
        keyRisk: 'Áp lực thép nhập khẩu giá rẻ từ Trung Quốc và khấu hao giai đoạn đầu chạy thử.',
      },
      {
        id: 'sec-infra',
        name: 'Hạ tầng & Xây lắp công',
        outlook: 'Theo dõi tiến độ giải ngân',
        macroSensitivity: 'Liên kết trực tiếp với biến số tốc độ thực thi chính sách ở Lớp 1.',
        catalyst: 'Nghiệm thu khối lượng giải ngân đầu tư công cao điểm 2 tháng cuối năm.',
        keyRisk: 'Biên lợi nhuận mỏng và rủi ro chậm thanh toán công nợ.',
      },
    ],
    source: 'Báo cáo phân tích ngành YSVN & Tổng cục Thống kê (GSO)',
    timestamp: '2025-10-28 08:30 ICT',
  },
  {
    id: 'layer-4',
    layerNumber: 4,
    name: 'Cổ phiếu / Doanh nghiệp đại diện (Mã minh họa mô phỏng)',
    shortName: 'Cổ phiếu / DN',
    badge: 'Lớp 4 · Doanh nghiệp & Catalyst',
    summary:
      'Ánh xạ từ 3 lớp trên xuống doanh nghiệp cụ thể, đối chiếu thêm Nghị quyết ĐHCĐ chưa thực hiện và lịch vận hành dự án mới. Lưu ý: Các mã dưới đây chỉ dùng minh họa mô phỏng cho Demo MVP, không phải khuyến nghị mua/bán.',
    coreMetric: {
      name: 'Tiêu chí lọc doanh nghiệp',
      value: 'Catalyst 1–3T + Sức khỏe tài chính',
      status: '4 mã minh họa mô phỏng',
    },
    stocks: [
      {
        ticker: 'HPG',
        companyName: 'Tập đoàn Hòa Phát (Minh họa mô phỏng)',
        sector: 'Thép / VLXD',
        simulationNote: 'Mã minh họa mô phỏng',
        valuationNote: 'P/B ~1.5x · Chiết khấu chịu ảnh hưởng phần bù rủi ro thể chế & lãi suất toàn cầu.',
        catalysts: [
          'Kế hoạch đưa phân kỳ dự án Dung Quất 2 vào vận hành chạy thử / thương mại trong 1–3 tháng tới.',
          'Hưởng lợi nếu dòng tiền ETF cơ cấu rổ vốn hóa lớn ngày 13/11 giải ngân.',
        ],
        risks: [
          'Khấu hao & chi phí lãi vay tăng trong giai đoạn đầu vận hành dự án mới.',
          'Rủi ro giá HRC khu vực suy yếu nếu nhu cầu xây dựng Trung Quốc chưa hồi phục.',
        ],
        horizonFit: 'Phù hợp theo dõi trung/dài hạn (3–12 tháng); ngắn hạn cần lưu ý nhiễu động cơ cấu ETF 13/11.',
      },
      {
        ticker: 'VCB',
        companyName: 'Ngân hàng Vietcombank (Minh họa mô phỏng)',
        sector: 'Ngân hàng',
        simulationNote: 'Mã minh họa mô phỏng',
        valuationNote: 'P/B ~2.8x · Tài sản phòng thủ đầu ngành, nhạy trực tiếp với kỳ vọng dòng tiền ETF.',
        catalysts: [
          'Rà soát Nghị quyết ĐHCĐ năm nay chưa thực hiện liên quan đến phương án tăng vốn / chia cổ tức cổ phiếu.',
          'Tâm điểm dòng tiền mua ròng kỹ thuật từ các quỹ ETF tham chiếu rổ VN30 / FTSE trong kỳ 13/11.',
        ],
        risks: [
          'Biên lãi ròng (NIM) chịu áp lực nếu mặt bằng lãi suất huy động tăng nhẹ theo tỷ giá.',
          'Biến động kỹ thuật ngắn hạn sau khi kết thúc phiên cơ cấu ETF.',
        ],
        horizonFit: 'Trụ giữ nhịp danh mục phòng thủ (12+ tháng) và đối tượng quan sát dòng tiền ngắn hạn dịp 13/11.',
      },
      {
        ticker: 'MWG',
        companyName: 'Thế Giới Di Động (Minh họa mô phỏng)',
        sector: 'Bán lẻ & Tiêu dùng',
        simulationNote: 'Mã minh họa mô phỏng',
        valuationNote: 'Định giá phản ánh kỳ vọng tái cấu trúc lợi nhuận chuỗi bách hóa & điện máy.',
        catalysts: [
          'Mùa cao điểm tiêu dùng cuối năm & theo dõi tiến độ thực hiện các mục tiêu ĐHCĐ (tối ưu mạng lưới, kế hoạch vốn tại công ty con).',
          'Có thể nằm trong rổ biến động tỷ trọng của quỹ chỉ số kỳ tháng 11.',
        ],
        risks: [
          'Áp lực tỷ giá USD/VND ảnh hưởng giá vốn hàng công nghệ nhập khẩu.',
          'Biến động tâm lý khối ngoại khi US 10Y neo cao.',
        ],
        horizonFit: 'Phù hợp nhóm trung hạn (3–12 tháng) nếu xác nhận biên lợi nhuận ròng tiếp tục cải thiện.',
      },
      {
        ticker: 'KBC',
        companyName: 'Tổng Công ty Phát triển Đô thị Kinh Bắc (Minh họa mô phỏng)',
        sector: 'Bất động sản KCN',
        simulationNote: 'Mã minh họa mô phỏng',
        valuationNote: 'Chiết khấu cao do rủi ro chậm pháp lý (biến số Lớp 1: phân bổ nguồn lực đất đai).',
        catalysts: [
          'Theo dõi Nghị quyết ĐHCĐ năm nay về kế hoạch tăng vốn / triển khai dự án KCN mới chưa hoàn tất.',
          'Kỳ vọng bàn giao đất cho khách thuê FDI lớn trong 1–3 tháng tới.',
        ],
        risks: [
          'Phụ thuộc mạnh vào tốc độ phê duyệt thủ tục đất đai và giải ngân hạ tầng địa phương (Lớp 1).',
          'Độ trễ ghi nhận doanh thu thực tế so với kế hoạch.',
        ],
        horizonFit: 'Nhạy cảm cao với rủi ro thể chế — chỉ phù hợp nhà đầu tư chấp nhận biến động và theo dõi chặt mốc pháp lý.',
      },
    ],
    source: 'Tổng hợp BCTC, Nghị quyết ĐHCĐ công bố công khai & kịch bản mô phỏng MVP',
    timestamp: '2025-10-28 08:30 ICT',
  },
];

export const CAUSAL_CHAINS = [
  {
    id: 'chain-fomc-us10y-vn',
    title: 'Lãi suất Mỹ neo cao -> Áp lực tỷ giá & chiết khấu định giá VN-Index',
    layerScope: 'Lớp 2 -> Lớp 3 & 4',
    rootEvent: 'FED/FOMC giữ giọng điệu thận trọng sau số liệu BLS CPI/PPI dịch vụ dai dẳng; US 10Y giữ quanh 4.35%.',
    transmissionChannels: [
      'Chênh lệch lãi suất USD – VND duy trì dương khiến DXY giữ vùng 104–105 và tạo áp lực lên tỷ giá USD/VND.',
      'NHNN ưu tiên hút thanh khoản OMO / tín phiếu để ổn định tỷ giá, hạn chế kỳ vọng giảm thêm lãi suất trong nước.',
      'Lãi suất phi rủi ro Mỹ tăng làm giảm mức độ hấp dẫn tương đối của cổ phiếu mới nổi, thúc đẩy quỹ chủ động nước ngoài thu hẹp tỷ trọng.',
    ],
    impact:
      'Tăng chi phí vốn chuẩn (Ke) trong mô hình DCF; nhóm cổ phiếu định giá cao hoặc nhạy lãi suất gặp áp lực chốt lời khi thiếu dòng tiền mới.',
    assumptions: [
      'Lạm phát Mỹ (PCE/CPI lõi) không giảm nhanh dưới 2.6% trong 2 tháng tới.',
      'NHNN tiếp tục giữ ưu tiên ổn định tỷ giá dưới biên độ kiểm soát thay vì nới lỏng bằng mọi giá.',
    ],
    alternativeScenario:
      'Nếu BLS CPI & bảng lương phi nông nghiệp (NFP) hạ nhiệt mạnh bất ngờ, US 10Y lùi về dưới 4.0%, áp lực tỷ giá VN giải tỏa nhanh và nhóm Ngân hàng/Chứng khoán sẽ hồi phục định giá sớm.',
    confidence: 'Cao (78%)',
    confidenceLevel: 'high',
    source: 'FED FOMC Minutes, BLS CPI Release, NHNN Market Operations',
    timestamp: '2025-10-28 08:30 ICT',
  },
  {
    id: 'chain-etf-conflict',
    title: 'Review rổ ETF 13/11 -> Dòng tiền mua ròng kỹ thuật đối đầu áp lực vĩ mô',
    layerScope: 'Radar Sự kiện -> Lớp 4',
    rootEvent:
      'Kỳ công bố danh mục & cơ cấu rổ chỉ số ETF quý diễn ra vào 13/11 với dự báo mua ròng tập trung vào nhóm vốn hóa lớn.',
    transmissionChannels: [
      'Các quỹ ETF thụ động bắt buộc giải ngân mua ròng theo tỷ trọng chỉ số mới bất chấp quan điểm vĩ mô ngắn hạn.',
      'Dòng tiền đầu cơ nội địa thường giao dịch đón đầu (front-running) trước ngày chốt danh mục 1–2 tuần, tạo lực cầu kỹ thuật.',
      'Tuy nhiên, ngay sau ngày chốt cơ cấu, lực cầu kỹ thuật rút đi khiến giá cổ phiếu quay lại phản ánh áp lực lãi suất phi rủi ro US 10Y.',
    ],
    impact:
      'Xung đột trực diện (CONFLICT ALERT): Giá cổ phiếu vốn hóa lớn có thể tăng ngắn hạn trong 1–2 tuần đầu tháng 11 dù khung vĩ mô Lớp 2 vẫn thận trọng — dễ gây "mù sự kiện" nếu tư vấn chỉ nhìn vĩ mô mà bỏ qua lịch ETF.',
    assumptions: [
      'Quy mô dòng vốn vào/ra các quỹ ETF tham chiếu không bị rút ròng đột biến ngay trước ngày 13/11.',
      'Thanh khoản khớp lệnh trung bình phiên duy trì đủ hấp thụ lệnh tái cơ cấu ATC.',
    ],
    alternativeScenario:
      'Nếu khối ngoại chủ động bán ròng đối ứng mạnh hơn lượng mua ròng của ETF thụ động, giá cổ phiếu có thể chỉ đi ngang hoặc tạo râu nến trên trong phiên ATC cơ cấu.',
    confidence: 'Trung bình - Cao (72%)',
    confidenceLevel: 'medium-high',
    source: 'Lịch công bố rổ chỉ số ETF định kỳ & thống kê giao dịch khối ngoại HOSE',
    timestamp: '2025-10-28 09:00 ICT',
  },
  {
    id: 'chain-institutional-premium',
    title: 'Biến số thể chế VN -> Phần bù rủi ro thể chế (+1.8% – +2.5%) & phân hóa doanh nghiệp',
    layerScope: 'Lớp 1 -> Lớp 3 & 4',
    rootEvent:
      'Chuyển tiếp chu kỳ nhân sự sau Đại hội Đảng kết hợp độ trễ phân bổ quỹ đất, room tín dụng và tốc độ giải ngân đầu tư công.',
    transmissionChannels: [
      'Cơ quan thực thi địa phương thận trọng trong phê duyệt thủ tục mới khiến vòng quay vốn của các dự án BĐS và hạ tầng kéo dài.',
      'Doanh nghiệp tư nhân đầu ngành có sẵn quỹ đất sạch hoặc dự án đã hoàn tất pháp lý (như giai đoạn vận hành nhà máy mới) chiếm ưu thế vượt trội.',
      'Nhiễu thông tin thị trường làm gia tăng biên độ định giá chiết khấu ở nhóm cổ phiếu thiếu minh bạch.',
    ],
    impact:
      'Nhà phân tích cộng thêm "Phần bù rủi ro thể chế" (+1.8% đến +2.5%) vào tỷ suất chiết khấu, đồng thời ưu tiên doanh nghiệp có Nghị quyết ĐHCĐ rõ ràng và tiến độ dự án kiểm chứng được.',
    assumptions: [
      'Không phát sinh biến cố pháp lý bất ngờ làm gián đoạn chuỗi cung ứng tín dụng liên ngân hàng.',
      'Tiến độ giải ngân đầu tư công quý IV đạt tối thiểu 85–90% kế hoạch năm.',
    ],
    alternativeScenario:
      'Nếu cơ chế tháo gỡ pháp lý dự án đồng loạt được thông qua nhanh hơn dự kiến, phần bù rủi ro thể chế thu hẹp về vùng +1.2%, kích hoạt định giá lại (re-rating) mạnh cho nhóm BĐS KCN và Ngân hàng.',
    confidence: 'Trung bình - Cao (70%)',
    confidenceLevel: 'medium-high',
    source: 'Cổng thông tin Chính phủ, Bộ KH&ĐT, Công bố thông tin ĐHCĐ doanh nghiệp',
    timestamp: '2025-10-28 08:45 ICT',
  },
  {
    id: 'chain-corporate-catalysts',
    title: 'Nghị quyết ĐHCĐ chưa thực hiện & Vận hành dự án mới -> Điểm rơi lợi nhuận 1–3 tháng tới',
    layerScope: 'Lớp 4 (Doanh nghiệp)',
    rootEvent:
      'Doanh nghiệp bước vào giai đoạn hoàn tất các cam kết ĐHCĐ đầu năm (tăng vốn, chia cổ tức, M&A) hoặc đưa nhà máy quy mô lớn (như Dung Quất 2) vào vận hành.',
    transmissionChannels: [
      'Các nghị quyết ĐHCĐ chưa thực hiện thường dồn lịch triển khai vào 2 tháng cuối năm để kịp khóa sổ năm tài chính.',
      'Dự án lớn bắt đầu chạy thử / phát sinh doanh thu giúp thị trường định giá lại công suất tương lai trước khi số liệu BCTC chính thức phản ánh hết.',
    ],
    impact:
      'Tạo động lực tăng trưởng độc lập tương đối với biến động lãi suất ngắn hạn, đặc biệt có giá trị với danh mục nắm giữ trung/dài hạn (3–12 tháng).',
    assumptions: [
      'Doanh nghiệp không công bố hoãn tiến độ hoặc điều chỉnh giảm kế hoạch tại kỳ họp bất thường.',
      'Công suất chạy thử đạt ngưỡng ổn định kỹ thuật và có đầu ra tiêu thụ tương ứng.',
    ],
    alternativeScenario:
      'Nếu dự án chậm tiến độ 1–2 quý hoặc kế hoạch tăng vốn bị dời sang năm sau, cổ phiếu sẽ mất catalyst ngắn hạn và chịu áp lực điều chỉnh theo mặt bằng chung thị trường.',
    confidence: 'Trung bình (65%)',
    confidenceLevel: 'medium',
    source: 'Nghị quyết ĐHCĐ công bố thông khai HOSE/HNX & Báo cáo tiến độ dự án',
    timestamp: '2025-10-28 09:15 ICT',
  },
];

export const UPCOMING_EVENTS = [
  {
    id: 'evt-etf-review-1311',
    date: '2025-11-13',
    windowLabel: 'Trong 2–3 tuần tới',
    title: 'Review rổ chỉ số ETF quý (13/11)',
    category: 'Dòng tiền ETF / Chỉ số',
    layer: 'Radar Sự kiện · Lớp 4',
    impactDirection: 'Tích cực ngắn hạn (Dòng tiền) vs Thận trọng (Vĩ mô)',
    conflictAlert: true,
    conflictDetail:
      'CONFLICT ALERT: Quỹ ngoại/ETF dự kiến mua ròng lượng lớn cổ phiếu vốn hóa lớn (VCB, HPG, nhóm VN30) theo quy tắc rổ chỉ số, trái ngược với tín hiệu thận trọng từ lãi suất phi rủi ro Mỹ (US 10Y 4.35%) và kỳ vọng FOMC.',
    affectedTickers: ['VCB', 'HPG', 'MWG'],
    summary:
      'Sự kiện trọng tâm chống "mù sự kiện" tháng 10–11: tách bạch lực mua kỹ thuật của ETF thụ động khỏi xu hướng vĩ mô trung hạn để không tư vấn nhầm điểm vào/ra cho từng nhóm khách hàng.',
    horizonAdvice: {
      short: 'Nhóm A (1–4 tuần): Theo dõi lực cầu đón đầu trước 13/11, ưu tiên chốt lời từng phần vào phiên cơ cấu thay vì mua đuổi giá cao.',
      medium: 'Nhóm B (3–12 tháng): Không dùng nhịp tăng kỹ thuật của ETF để nâng tỷ trọng quá mức; chờ nhịp cân bằng sau cơ cấu để giải ngân theo nền tảng.',
      long: 'Nhóm C (12+ tháng): Giữ nguyên kỷ luật tích sản, bỏ qua nhiễu động giá ngắn hạn quanh phiên ATC 13/11.',
    },
    source: 'Lịch công bố rổ chỉ số ETF & dữ liệu mô phỏng HOSE',
    confidence: 'Cao (82%)',
    timestamp: '2025-10-28 09:00 ICT',
  },
  {
    id: 'evt-fomc-nov',
    date: '2025-11-07',
    windowLabel: 'Trong 1–2 tuần tới',
    title: 'Họp FOMC & công bố lộ trình lãi suất FED',
    category: 'Vĩ mô Mỹ',
    layer: 'Lớp 2 · Vĩ mô Mỹ & VN',
    impactDirection: 'Thận trọng / Biến động cao',
    conflictAlert: false,
    conflictDetail: '',
    affectedTickers: ['VCB', 'MWG', 'HPG', 'KBC'],
    summary:
      'Cuộc họp FOMC quyết định lãi suất điều hành và phát đi thông điệp Dot Plot / họp báo của Chủ tịch FED về nhịp cắt giảm lãi suất các quý tới.',
    horizonAdvice: {
      short: 'Nhóm A (1–4 tuần): Hạ đòn bẩy margin trước giờ công bố biên bản họp báo; tránh mở vị thế lớn ngay sát sự kiện.',
      medium: 'Nhóm B (3–12 tháng): Đánh giá phản ứng của US 10Y & DXY trong 2–3 phiên sau họp để điều chỉnh chi phí vốn tham chiếu.',
      long: 'Nhóm C (12+ tháng): Tận dụng nhịp rung lắc quá mức (nếu có) để tích lũy doanh nghiệp đầu ngành có cổ tức tiền mặt ổn định.',
    },
    source: 'Federal Reserve FOMC Calendar',
    confidence: 'Cao (85%)',
    timestamp: '2025-10-28 08:30 ICT',
  },
  {
    id: 'evt-dung-quat-2',
    date: '2025-12-15',
    windowLabel: '1–3 tháng tới',
    title: 'Kế hoạch đưa dự án mới / nhà máy Dung Quất 2 vào vận hành (1–3 tháng tới)',
    category: 'Vận hành dự án doanh nghiệp',
    layer: 'Lớp 4 · Doanh nghiệp',
    impactDirection: 'Tích cực trung/dài hạn (Catalyst công suất)',
    conflictAlert: false,
    conflictDetail: '',
    affectedTickers: ['HPG'],
    summary:
      'Mốc theo dõi tiến độ chạy thử nóng và vận hành thương mại phân kỳ đầu của dự án nhà máy mới, đóng vai trò điểm rơi mở rộng công suất thép cuộn cán nóng (HRC).',
    horizonAdvice: {
      short: 'Nhóm A (1–4 tuần): Chỉ giao dịch theo nhịp dòng tiền và tin xác nhận tiến độ thực tế; lưu ý áp lực chi phí khấu hao ban đầu.',
      medium: 'Nhóm B (3–12 tháng): Catalyst cốt lõi cần theo sát; tích lũy từng phần khi xác nhận thông số vận hành đạt kế hoạch.',
      long: 'Nhóm C (12+ tháng): Củng cố vị thế cạnh tranh quy mô dài hạn nếu tỷ lệ nợ/vốn chủ sở hữu duy trì trong ngưỡng an toàn.',
    },
    source: 'Báo cáo thường niên & Cập nhật tiến độ dự án doanh nghiệp (Minh họa)',
    confidence: 'Trung bình - Cao (74%)',
    timestamp: '2025-10-28 09:10 ICT',
  },
  {
    id: 'evt-agm-resolutions',
    date: '2025-11-28',
    windowLabel: '1–2 tháng tới',
    title: 'Rà soát Nghị quyết ĐHCĐ năm nay chưa thực hiện (chia cổ tức / tăng vốn / M&A)',
    category: 'Nghị quyết ĐHCĐ',
    layer: 'Lớp 4 · Quản trị & Catalyst',
    impactDirection: 'Phân hóa mạnh theo tiến độ thực thi',
    conflictAlert: false,
    conflictDetail: '',
    affectedTickers: ['VCB', 'KBC', 'MWG'],
    summary:
      'Tổng rà soát các nội dung đã được ĐHCĐ thông qua từ đầu năm nhưng chưa chốt ngày thực hiện (trả cổ tức, phát hành tăng vốn, thoái vốn/M&A công ty con) trước hạn cuối năm.',
    horizonAdvice: {
      short: 'Nhóm A (1–4 tuần): Quan sát thanh khoản bất thường gắn với ngày chốt quyền; tránh tin đồn chưa có văn bản HOSE/VSDC.',
      medium: 'Nhóm B (3–12 tháng): Ưu tiên các doanh nghiệp giữ đúng cam kết ĐHCĐ, loại bỏ mã chậm tiến độ kéo dài nhiều năm.',
      long: 'Nhóm C (12+ tháng): Đánh giá kỷ luật quản trị và lịch sử thực thi lời hứa của ban lãnh đạo đối với cổ đông.',
    },
    source: 'Kho Nghị quyết ĐHCĐ công bố công khai trên HOSE/HNX',
    confidence: 'Trung bình - Cao (72%)',
    timestamp: '2025-10-28 09:15 ICT',
  },
  {
    id: 'evt-bls-cpi',
    date: '2025-11-12',
    windowLabel: 'Trong 2 tuần tới',
    title: 'Công bố chỉ số lạm phát CPI / PPI Hoa Kỳ (BLS)',
    category: 'Vĩ mô Mỹ',
    layer: 'Lớp 2 · Vĩ mô Mỹ & VN',
    impactDirection: 'Rủi ro biến động tỷ giá & US 10Y',
    conflictAlert: false,
    conflictDetail: '',
    affectedTickers: ['VCB', 'MWG', 'HPG'],
    summary:
      'Số liệu lạm phát Mỹ công bố ngay trước ngày Review ETF 13/11 một ngày — dễ khuếch đại biên độ giằng co giữa lực bán theo vĩ mô và lực mua kỹ thuật từ ETF.',
    horizonAdvice: {
      short: 'Nhóm A (1–4 tuần): Rất nhạy cảm vì rơi sát ngày 13/11; chuẩn bị sẵn kịch bản quản trị rủi ro hai chiều.',
      medium: 'Nhóm B (3–12 tháng): Dùng làm dữ liệu kiểm chứng giả định lạm phát hạ nhiệt trong chuỗi nhân quả Lớp 2.',
      long: 'Nhóm C (12+ tháng): Không phản ứng theo một kỳ dữ liệu đơn lẻ, theo dõi xu hướng 3 tháng bình quân.',
    },
    source: 'U.S. Bureau of Labor Statistics (BLS)',
    confidence: 'Cao (88%)',
    timestamp: '2025-10-28 08:35 ICT',
  },
  {
    id: 'evt-nhnn-public-investment',
    date: '2025-12-05',
    windowLabel: '1–2 tháng tới',
    title: 'Kỳ điều hành tỷ giá NHNN & cao điểm giải ngân đầu tư công cuối năm',
    category: 'Thể chế & Vĩ mô VN',
    layer: 'Lớp 1 & Lớp 2',
    impactDirection: 'Giằng co: Thanh khoản thận trọng vs Giải ngân hạ tầng tăng tốc',
    conflictAlert: false,
    conflictDetail: '',
    affectedTickers: ['HPG', 'VCB', 'KBC'],
    summary:
      'Theo dõi nhịp điều tiết OMO/tín phiếu của NHNN trước áp lực ngoại tệ cuối năm song song với số liệu giải ngân vốn đầu tư công tháng 11–12 của Bộ Tài chính.',
    horizonAdvice: {
      short: 'Nhóm A (1–4 tuần): Theo dõi lãi suất liên ngân hàng qua đêm để nhận diện độ căng thanh khoản ngắn hạn.',
      medium: 'Nhóm B (3–12 tháng): Ưu tiên nhóm VLXD, hạ tầng hưởng lợi trực tiếp nếu tỷ lệ giải ngân tăng tốc rõ rệt.',
      long: 'Nhóm C (12+ tháng): Cập nhật lại biến số "Tốc độ giải ngân & thực thi chính sách" trong Phần bù rủi ro thể chế.',
    },
    source: 'Ngân hàng Nhà nước (NHNN) & Bộ Tài chính',
    timestamp: '2025-10-28 08:40 ICT',
  },
];

export const AGENT_ANALYSES = [
  {
    id: 'agent-macro',
    agentName: 'Macro Agent - Vĩ mô Mỹ & VN',
    roleType: 'specialist',
    focusLayers: ['Lớp 1: Thể chế VN', 'Lớp 2: Vĩ mô Mỹ & VN'],
    status: 'Cập nhật mới nhất',
    headline: 'US 10Y neo 4.35% & Phần bù rủi ro thể chế (+1.8%–+2.5%) đòi hỏi chiết khấu chặt',
    confidence: 'Cao (78%)',
    keyFindings: [
      'BLS CPI dịch vụ và lộ trình FOMC khiến kỳ vọng hạ lãi suất nhanh giảm xuống; DXY giữ vùng 104.8 gây sức ép tỷ giá USD/VND.',
      'Tại Việt Nam, 4 biến số thể chế (chu kỳ nhân sự, đất đai/tín dụng, giải ngân đầu tư công, minh bạch thông tin) quy đổi thành phần bù rủi ro thể chế +1.8% đến +2.5%.',
      'Khuyến nghị mặt bằng chung ở góc độ vĩ mô thuần túy: giữ tỷ trọng tiền mặt dự phòng hợp lý, không mở rộng margin khi tỷ giá chưa hạ nhiệt.',
    ],
    blindSpotWarning: 'Nếu chỉ nhìn Lớp 1–2 sẽ dễ bỏ qua lực mua kỹ thuật ngắn hạn từ kỳ Review ETF ngày 13/11.',
    source: 'FED, BLS, NHNN, Khung thể chế Lớp 1',
    timestamp: '2025-10-28 08:45 ICT',
  },
  {
    id: 'agent-event-flow',
    agentName: 'Event & Flow Agent - Radar ETF/ĐHCĐ/Dự án',
    roleType: 'specialist',
    focusLayers: ['Radar Sự kiện 1–3 tháng', 'Lớp 4: Catalyst'],
    status: 'Phát hiện xung đột (CONFLICT ALERT)',
    headline: 'Cảnh báo xung đột: Kỳ Review ETF 13/11 tạo lực mua ròng lớn đối lập tín hiệu thận trọng từ FED/US 10Y',
    confidence: 'Cao (80%)',
    keyFindings: [
      'CONFLICT ALERT ngày 13/11: Dòng vốn ETF thụ động dự kiến mua ròng nhóm vốn hóa lớn (VCB, HPG, rổ VN30) ngay sau ngày công bố BLS CPI (12/11).',
      'Doanh nghiệp có 2 nhóm catalyst cần rà soát sát trong 1–3 tháng tới: (1) Dự án lớn đi vào vận hành (Dung Quất 2), (2) Nghị quyết ĐHCĐ năm nay chưa thực hiện (cổ tức/tăng vốn/M&A).',
      'Bắt buộc gắn mọi cảnh báo sự kiện với khung thời gian nắm giữ của từng nhóm khách hàng để tránh tư vấn lệch pha.',
    ],
    blindSpotWarning: 'Rủi ro bull-trap (bẫy tăng giá) ngay sau phiên cơ cấu ETF nếu khách hàng ngắn hạn vào trễ sát ngày 13/11.',
    source: 'Lịch ETF định kỳ, Kho Nghị quyết ĐHCĐ, Lịch BLS/FOMC',
    timestamp: '2025-10-28 09:00 ICT',
  },
  {
    id: 'agent-sector-stock',
    agentName: 'Sector & Stock Agent - Ngành & DN',
    roleType: 'specialist',
    focusLayers: ['Lớp 3: Ngành / Lĩnh vực', 'Lớp 4: Cổ phiếu minh họa'],
    status: 'Hoàn tất đối chiếu',
    headline: 'Phân hóa rõ giữa doanh nghiệp có dự án sắp vận hành (HPG) và nhóm nhạy thủ tục đất đai (KBC)',
    confidence: 'Trung bình - Cao (73%)',
    keyFindings: [
      'Ngành Thép/VLXD có điểm tựa từ tiến độ dự án công suất mới (Dung Quất 2) và mùa giải ngân đầu tư công cuối năm.',
      'Ngành Ngân hàng (VCB) đóng vai trò neo giữ danh mục phòng thủ và tâm điểm giải ngân kỹ thuật dịp Review ETF 13/11.',
      'BĐS KCN (KBC) có tiềm năng FDI nhưng chịu chiết khấu trực tiếp từ phần bù rủi ro thể chế về tiến độ giải phóng mặt bằng và cấp phép.',
    ],
    blindSpotWarning: 'Các mã cổ phiếu trong bản demo mang tính minh họa phương pháp luận Top-Down, không thay thế phân tích định giá chuyên sâu từng thời điểm.',
    source: 'BCTC công bố công khai & Mô hình 4 lớp',
    timestamp: '2025-10-28 09:15 ICT',
  },
  {
    id: 'agent-synthesizer',
    agentName: 'Support Tổng (Portfolio Synthesizer)',
    roleType: 'synthesizer',
    focusLayers: ['Tổng hợp 4 lớp + Radar Sự kiện + 3 Nhóm Khách hàng'],
    status: 'Đã dung hòa xung đột',
    headline: 'Cùng một bộ tín hiệu FOMC vs ETF 13/11 nhưng hành động phải tách làm 3 kịch bản theo kỳ hạn nắm giữ',
    confidence: 'Cao (79%)',
    keyFindings: [
      'Không đưa ra một khuyến nghị chung cho toàn bộ khách hàng khi Vĩ mô (thận trọng) và Dòng tiền ETF 13/11 (mua ròng ngắn hạn) đang đi ngược chiều.',
      'Nhóm A (1–4 tuần) khai thác nhịp dòng tiền trước 13/11 nhưng chốt kỷ luật; Nhóm B (3–12 tháng) chờ nhịp cân bằng sau cơ cấu để gom theo catalyst Dung Quất 2 / ĐHCĐ; Nhóm C (12+ tháng) giữ nguyên tích sản phòng thủ.',
      'Mọi kịch bản đều kèm sẵn giả định, phương án thay thế và thông điệp miễn trừ trách nhiệm bắt buộc.',
    ],
    blindSpotWarning: 'Cần xác nhận lại tỷ trọng tiền mặt và mức chịu đựng biến động thực tế của từng khách hàng trước khi gửi bản tin.',
    source: 'Hợp nhất Macro Agent + Event & Flow Agent + Sector & Stock Agent',
    timestamp: '2025-10-28 09:20 ICT',
  },
  {
    id: 'agent-observer',
    agentName: 'Người quan sát tổng (Tâm / Advisor)',
    roleType: 'observer',
    focusLayers: ['Kiểm soát chất lượng & Ký duyệt tư vấn (Human-in-the-Loop)'],
    status: 'Chờ Tâm kiểm tra & điều chỉnh trước khi trao đổi khách hàng',
    headline: 'Trạm kiểm soát cuối của chuyên viên tư vấn: đối chiếu bối cảnh thực tế khách hàng & chống lệ thuộc AI',
    confidence: 'Human-in-the-Loop',
    keyFindings: [
      'Kiểm tra lại xem các sự kiện mới phát sinh trong tuần (lịch ETF, tin đồn nhân sự, công văn ĐHCĐ mới) đã được nạp vào bảng sự kiện hay chưa.',
      'Đối chiếu góc nhìn khác biệt giữa Macro Agent và Event & Flow Agent để chủ động giải thích cho khách hàng thay vì lúng túng khi giá đi ngược tin vĩ mô.',
      'Đảm bảo mọi trao đổi với khách hàng luôn giữ nguyên lưu ý rủi ro: phân tích chỉ mang tính tham khảo, không cam kết lợi nhuận.',
    ],
    blindSpotWarning: 'Chuyên viên tư vấn (Tâm) chịu trách nhiệm xác minh lại số liệu gốc trước khi gửi khuyến nghị cá nhân hóa.',
    source: 'Quy trình kiểm soát nội bộ của Advisor (Tâm - YSVN)',
    timestamp: '2025-10-28 09:25 ICT',
  },
];

export const CLIENT_PROFILES = [
  {
    id: 'client-group-a',
    code: 'Nhóm A',
    name: 'Nhóm A: Giao dịch ngắn hạn (1–4 tuần)',
    holdingHorizon: '1–4 tuần',
    riskAppetite: 'Trung bình - Cao · Ưu tiên kỷ luật cắt lỗ & dòng tiền sự kiện',
    coreStance: 'Tận dụng nhịp ETF 13/11 có kiểm soát · Chốt chủ động',
    fomcVsEtfReaction:
      'Dù tín hiệu FOMC/US 10Y giữ thái độ thận trọng, lực mua ròng kỹ thuật từ Review ETF 13/11 có thể kéo giá nhóm vốn hóa lớn tăng trong 1–2 tuần. Nhóm A có thể giao dịch ngắn theo dòng tiền này nhưng bắt buộc hạ đòn bẩy trước ngày công bố BLS CPI (12/11) và chốt lời dần vào phiên cơ cấu 13/11.',
    recommendedFocus: [
      'Theo sát thanh khoản rổ vốn hóa lớn (VCB, HPG minh họa) trước kỳ chốt danh mục ETF 13/11.',
      'Giữ tỷ trọng giao dịch ngắn hạn tối đa 30–40% NAV, đặt ngưỡng cắt lỗ cứng 4–5%.',
      'Không bình quân giá xuống nếu BLS CPI (12/11) hoặc FOMC làm US 10Y vọt vượt 4.5%.',
    ],
    avoidList: [
      'Tránh mua đuổi vào cuối phiên cơ cấu ATC ngày 13/11 khi lực cầu thụ động sắp kết thúc.',
      'Tránh sử dụng margin cao qua các đêm công bố dữ liệu BLS CPI / FOMC.',
    ],
    disclaimer: MANDATORY_DISCLAIMER,
  },
  {
    id: 'client-group-b',
    code: 'Nhóm B',
    name: 'Nhóm B: Nắm giữ trung/dài hạn (3–12 tháng)',
    holdingHorizon: '3–12 tháng',
    riskAppetite: 'Trung bình · Tập trung catalyst doanh nghiệp & định giá hợp lý',
    coreStance: 'Không đuổi sóng ETF · Gom chọn lọc theo catalyst dự án & ĐHCĐ',
    fomcVsEtfReaction:
      'Không bị cuốn theo biến động tăng ngắn hạn của kỳ Review ETF 13/11. Thay vào đó, tận dụng các nhịp rung lắc do tin FOMC / US 10Y sau ngày 13/11 để giải ngân từng phần vào các doanh nghiệp có catalyst vận hành dự án mới (như Dung Quất 2) hoặc chuẩn bị hoàn tất Nghị quyết ĐHCĐ chưa thực hiện.',
    recommendedFocus: [
      'Ưu tiên cổ phiếu có điểm rơi công suất/lợi nhuận trong 1–3 quý tới và ít phụ thuộc vào tin đồn pháp lý.',
      'Tính đủ Phần bù rủi ro thể chế (+1.8%–+2.5%) khi xác định vùng mua hợp lý.',
      'Giải ngân chia 3 đợt gắn với tiến độ xác nhận vận hành dự án và ổn định tỷ giá USD/VND.',
    ],
    avoidList: [
      'Không mua dồn 1 lần trong nhịp hưng phấn kỹ thuật trước ngày 13/11.',
      'Hạn chế tỷ trọng cao ở doanh nghiệp liên tục trì hoãn Nghị quyết ĐHCĐ nhiều năm liền.',
    ],
    disclaimer: MANDATORY_DISCLAIMER,
  },
  {
    id: 'client-group-c',
    code: 'Nhóm C',
    name: 'Nhóm C: Tích sản phòng thủ (12+ tháng)',
    holdingHorizon: '12+ tháng',
    riskAppetite: 'Thận trọng · Ưu tiên bảo toàn vốn, cổ tức tiền mặt & bảng cân đối sạch',
    coreStance: 'Kỷ luật tích sản định kỳ · Bỏ qua nhiễu ETF 13/11',
    fomcVsEtfReaction:
      'Kỳ Review ETF 13/11 chỉ là nhiễu động cung cầu ngắn hạn, không làm thay đổi giá trị nội tại 12+ tháng. Nhóm C duy trì lịch tích sản đều đặn, đặt tiêu chuẩn cao hơn về biên an toàn do US 10Y neo quanh 4.35% và phần bù rủi ro thể chế tại Việt Nam còn hiện hữu.',
    recommendedFocus: [
      'Tập trung doanh nghiệp đầu ngành có dòng tiền tự do dương, nợ vay ròng thấp và cổ tức tiền mặt ổn định.',
      'So sánh tỷ suất cổ tức + tăng trưởng bền vững với mặt bằng lãi suất tiết kiệm & US 10Y.',
      'Giữ dự phòng tiền mặt 20–30% để sẵn sàng mua thêm nếu vĩ mô toàn cầu tạo nhịp chiết khấu sâu.',
    ],
    avoidList: [
      'Không giao dịch lướt sóng theo tin đồn ETF hay các đợt rung lắc CPI hàng tháng.',
      'Tránh cổ phiếu đòn bẩy nợ cao hoặc phụ thuộc hoàn toàn vào phê duyệt đất đai ngắn hạn.',
    ],
    disclaimer: MANDATORY_DISCLAIMER,
  },
];
