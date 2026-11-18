/**
 * RFC-4180 CSV parser & serializer with UTF-8 BOM support for Vietnamese Excel compatibility.
 */

export function parseCsvRows(rawText) {
  if (typeof rawText !== 'string') {
    return [];
  }

  // Strip UTF-8 BOM if present
  const text = rawText.replace(/^\uFEFF/, '');
  if (!text.trim()) {
    return [];
  }

  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      currentRow.push(currentField);
      currentField = '';
    } else if (char === '\r') {
      if (nextChar === '\n') {
        i += 1;
      }
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else if (char === '\n') {
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Flush final field/row if non-empty or trailing comma exists
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  // Filter out completely blank trailing lines
  return rows.filter((row) => row.some((cell) => cell.trim() !== ''));
}

function normalizeHeaderKey(header) {
  return String(header || '')
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
}

function parseConflictFlag(rawValue) {
  const val = String(rawValue || '').trim().toLowerCase();
  return ['yes', 'y', 'true', '1', 'có', 'co', 'conflict'].includes(val);
}

function parseTickers(rawTickers) {
  const raw = String(rawTickers || '').trim();
  if (!raw) return [];
  return raw
    .split(/[;|,]+/)
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);
}

function mapCategoryDisplay(rawCategory) {
  const cat = String(rawCategory || '').trim();
  if (!cat) return 'Sự kiện khác';
  const lower = cat.toLowerCase();
  if (lower === 'etf review') return 'Dòng tiền ETF / Chỉ số';
  if (lower === 'đhcđ chưa thực hiện') return 'Nghị quyết ĐHCĐ';
  if (lower === 'vận hành dự án') return 'Vận hành dự án doanh nghiệp';
  if (lower === 'chính sách vn') return 'Thể chế & Vĩ mô VN';
  return cat;
}

function deriveLayerLabel(category) {
  const lower = String(category || '').toLowerCase();
  if (lower.includes('etf')) return 'Radar Sự kiện · Lớp 4';
  if (lower.includes('vĩ mô mỹ') || lower.includes('fomc') || lower.includes('cpi')) {
    return 'Lớp 2 · Vĩ mô Mỹ & VN';
  }
  if (lower.includes('chính sách') || lower.includes('thể chế')) {
    return 'Lớp 1 & Lớp 2';
  }
  if (lower.includes('đhcđ') || lower.includes('dự án')) {
    return 'Lớp 4 · Doanh nghiệp';
  }
  return 'Radar Sự kiện 1–3 tháng';
}

/**
 * Parses CSV text into normalized Event Radar items matching UPCOMING_EVENTS schema.
 */
export function parseEventsCsv(rawText) {
  const matrix = parseCsvRows(rawText);
  if (matrix.length < 2) {
    throw new Error(
      'Tệp CSV không đủ dữ liệu (cần ít nhất 1 dòng tiêu đề cột và 1 dòng sự kiện).'
    );
  }

  const headers = matrix[0].map(normalizeHeaderKey);
  const titleIndex = headers.indexOf('title');
  const dateIndex = headers.indexOf('event_date');

  if (titleIndex === -1 && dateIndex === -1) {
    throw new Error(
      'Thiếu cột bắt buộc (`event_date` hoặc `title`). Vui lòng dùng đúng mẫu cột của sample-events.csv.'
    );
  }

  const events = [];

  for (let rowIdx = 1; rowIdx < matrix.length; rowIdx += 1) {
    const row = matrix[rowIdx];
    const record = {};
    headers.forEach((key, colIdx) => {
      if (key) {
        record[key] = (row[colIdx] ?? '').trim();
      }
    });

    const title = record.title || `Sự kiện #${rowIdx}`;
    const eventDate = record.event_date || 'Chưa rõ ngày';
    const rawCategory = record.category || '';
    const category = mapCategoryDisplay(rawCategory);
    const conflictAlert = parseConflictFlag(record.macro_conflict);
    const signalDirection = record.signal_direction || 'Trung lập';
    const horizonImpact = record.horizon_impact || '1–3 tháng tới';
    const summary =
      record.summary ||
      `${title} — Khung tác động: ${horizonImpact}. Tín hiệu: ${signalDirection}.`;

    const shortAdvice =
      record.horizon_short ||
      'Nhóm A (1–4 tuần): Theo dõi sát thanh khoản, tin tức chính thức và quản trị đòn bẩy trước ngày sự kiện.';
    const mediumAdvice =
      record.horizon_medium ||
      'Nhóm B (3–12 tháng): Đối chiếu tác động sự kiện với nền tảng ngành và Phần bù rủi ro thể chế trước khi giải ngân.';
    const longAdvice =
      record.horizon_long ||
      'Nhóm C (12+ tháng): Giữ kỷ luật tích sản dài hạn; tránh phản ứng theo nhiễu động ngắn hạn.';

    events.push({
      id: `csv-evt-${rowIdx}-${eventDate}`,
      date: eventDate,
      windowLabel: horizonImpact,
      title,
      category,
      rawCategory: rawCategory || category,
      layer: deriveLayerLabel(rawCategory || category),
      impactDirection: `${signalDirection} (${horizonImpact})`,
      conflictAlert,
      conflictDetail: conflictAlert
        ? `CONFLICT ALERT: ${summary}`
        : '',
      affectedTickers: parseTickers(record.affected_tickers),
      summary,
      horizonAdvice: {
        short: shortAdvice,
        medium: mediumAdvice,
        long: longAdvice,
      },
      source: record.source || 'Google Sheets / CSV người dùng nhập',
      confidence: record.confidence || 'Dữ liệu nạp từ CSV (Cần Advisor xác minh)',
      timestamp: record.updated_at || 'Vừa nạp từ CSV',
      isImported: true,
    });
  }

  if (events.length === 0) {
    throw new Error('Không tìm thấy dòng sự kiện hợp lệ nào trong tệp CSV.');
  }

  return events;
}

/**
 * Normalizes a pasted Google Sheets URL to a CSV export endpoint when possible.
 */
export function normalizeGoogleSheetsCsvUrl(inputUrl) {
  const trimmed = String(inputUrl || '').trim();
  if (!trimmed) return '';

  // Convert .../pubhtml to .../pub?output=csv
  if (trimmed.includes('/pubhtml')) {
    return trimmed.replace(/\/pubhtml.*$/, '/pub?output=csv');
  }

  // Convert standard .../edit... to .../export?format=csv (works if sheet is public/anyone with link)
  const match = trimmed.match(
    /^(https:\/\/docs\.google\.com\/spreadsheets\/d\/[^/]+)\/edit(?:[?#].*)?$/
  );
  if (match) {
    const gidMatch = trimmed.match(/[?#&]gid=(\d+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `${match[1]}/export?format=csv${gidParam}`;
  }

  return trimmed;
}

function escapeCsvCell(value) {
  const str = String(value ?? '');
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Serializes events into RFC-4180 CSV with UTF-8 BOM (\uFEFF) for Vietnamese Excel compatibility.
 */
export function serializeEventsToCsv(events) {
  const header = [
    'event_date',
    'category',
    'title',
    'affected_tickers',
    'horizon_impact',
    'signal_direction',
    'macro_conflict',
    'source',
    'updated_at',
    'summary',
    'horizon_short',
    'horizon_medium',
    'horizon_long',
    'confidence',
  ];

  const lines = [header.join(',')];

  (events || []).forEach((evt) => {
    const row = [
      evt.date || '',
      evt.rawCategory || evt.category || '',
      evt.title || '',
      Array.isArray(evt.affectedTickers) ? evt.affectedTickers.join('; ') : '',
      evt.windowLabel || '',
      evt.impactDirection || '',
      evt.conflictAlert ? 'YES' : 'NO',
      evt.source || '',
      evt.timestamp || '',
      evt.summary || '',
      evt.horizonAdvice?.short || '',
      evt.horizonAdvice?.medium || '',
      evt.horizonAdvice?.long || '',
      evt.confidence || '',
    ].map(escapeCsvCell);

    lines.push(row.join(','));
  });

  return `\uFEFF${lines.join('\r\n')}`;
}
