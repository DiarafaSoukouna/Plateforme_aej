"use client"

import { FileSpreadsheet, FileText, Download } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  exportToCsv,
  exportToExcel,
  exportToPdf,
  type ExportColumn,
} from "@/lib/export"

export type ReportColumn = ExportColumn & {
  align?: "right"
  format?: (value: any, row: Record<string, any>) => string
  total?: boolean
}

export type ReportSummary = { label: string; value: string }

export function ReportView({
  title,
  description,
  filename,
  columns,
  rows,
  summary,
}: {
  title: string
  description?: string
  filename: string
  columns: ReportColumn[]
  rows: Record<string, any>[]
  summary?: ReportSummary[]
}) {
  const exportColumns: ExportColumn[] = columns.map((c) => ({
    key: c.key,
    label: c.label,
  }))

  const hasTotals = columns.some((c) => c.total)

  function display(col: ReportColumn, row: Record<string, any>) {
    const value = row[col.key]
    return col.format ? col.format(value, row) : String(value ?? "")
  }

  function totalFor(col: ReportColumn) {
    if (!col.total) return ""
    const sum = rows.reduce((s, r) => s + (Number(r[col.key]) || 0), 0)
    return col.format ? col.format(sum, {}) : String(sum)
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              exportToCsv(`${filename}.csv`, exportColumns, rows)
              toast.success("Export CSV téléchargé.")
            }}
          >
            <Download className="size-4" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              exportToExcel(`${filename}.xls`, exportColumns, rows)
              toast.success("Export Excel téléchargé.")
            }}
          >
            <FileSpreadsheet className="size-4" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToPdf(title, exportColumns, rows)}
          >
            <FileText className="size-4" />
            PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {summary && summary.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border bg-muted/30 p-4"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((c) => (
                  <TableHead
                    key={c.key}
                    className={
                      c.align === "right"
                        ? "text-right font-semibold whitespace-nowrap"
                        : "font-semibold whitespace-nowrap"
                    }
                  >
                    {c.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((c) => (
                    <TableCell
                      key={c.key}
                      className={
                        c.align === "right"
                          ? "text-right whitespace-nowrap"
                          : "whitespace-nowrap"
                      }
                    >
                      {display(c, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {hasTotals ? (
              <TableFooter>
                <TableRow className="bg-muted/40 font-semibold hover:bg-muted/40">
                  {columns.map((c, idx) => (
                    <TableCell
                      key={c.key}
                      className={c.align === "right" ? "text-right" : ""}
                    >
                      {idx === 0 ? "Total" : totalFor(c)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
