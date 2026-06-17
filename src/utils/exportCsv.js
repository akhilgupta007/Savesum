const CSV_MIME_TYPE = 'text/csv;charset=utf-8;';

const escapeCsvValue = (value) => {
  if (value === null || value === undefined) {
    return '""';
  }

  const normalizedValue = value instanceof Date
    ? value.toISOString()
    : typeof value === 'object'
      ? JSON.stringify(value)
      : String(value);

  return `"${normalizedValue.replace(/"/g, '""')}"`;
};

export const buildCsvContent = (rows = []) => {
  return rows
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');
};

export const downloadCsv = (filename, rows = []) => {
  if (typeof window === 'undefined') {
    return;
  }

  const csvContent = buildCsvContent(rows);
  const blob = new Blob(['\uFEFF', csvContent], { type: CSV_MIME_TYPE });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
};