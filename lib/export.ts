export type ExportColumn = { key: string; label: string }

function escapeCsv(value: unknown): string {
  const s = value == null ? "" : String(value)
  if (/[",\n;]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function exportToCsv(
  filename: string,
  columns: ExportColumn[],
  rows: Record<string, any>[],
) {
  const header = columns.map((c) => escapeCsv(c.label)).join(";")
  const lines = rows.map((row) =>
    columns.map((c) => escapeCsv(row[c.key])).join(";"),
  )
  const csv = "\uFEFF" + [header, ...lines].join("\n")
  triggerDownload(csv, filename, "text/csv;charset=utf-8;")
}

export function exportToJson(filename: string, rows: Record<string, any>[]) {
  triggerDownload(
    JSON.stringify(rows, null, 2),
    filename,
    "application/json",
  )
}

// Export "Excel" simple via fichier .xls (HTML table), ouvert par Excel/LibreOffice
export function exportToExcel(
  filename: string,
  columns: ExportColumn[],
  rows: Record<string, any>[],
) {
  const head = columns.map((c) => `<th>${c.label}</th>`).join("")
  const body = rows
    .map(
      (row) =>
        `<tr>${columns
          .map((c) => `<td>${row[c.key] ?? ""}</td>`)
          .join("")}</tr>`,
    )
    .join("")
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"/></head><body><table border="1"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></body></html>`
  triggerDownload(html, filename, "application/vnd.ms-excel")
}

// Export PDF simple via fenêtre d'impression du navigateur
export function exportToPdf(
  title: string,
  columns: ExportColumn[],
  rows: Record<string, any>[],
) {
  const head = columns.map((c) => `<th>${c.label}</th>`).join("")
  const body = rows
    .map(
      (row) =>
        `<tr>${columns
          .map((c) => `<td>${row[c.key] ?? ""}</td>`)
          .join("")}</tr>`,
    )
    .join("")
  const win = window.open("", "_blank")
  if (!win) return
  win.document.write(`<html><head><title>${title}</title>
    <style>
      body{font-family:system-ui,sans-serif;padding:24px;color:#1a2e22}
      h1{font-size:18px;color:#2f7d4f}
      table{width:100%;border-collapse:collapse;margin-top:16px;font-size:12px}
      th,td{border:1px solid #d4ddd6;padding:6px 8px;text-align:left}
      th{background:#eaf3ec}
    </style></head><body>
    <h1>${title}</h1>
    <table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
    <script>window.onload=function(){window.print()}</script>
    </body></html>`)
  win.document.close()
}
