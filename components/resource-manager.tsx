"use client"

import { useMemo, useState, type ReactNode } from "react"
import { Plus, Pencil, Trash2, Search, Download } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { exportToCsv } from "@/lib/export"

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "date"
  | "select"
  | "textarea"

export type FieldOption = { label: string; value: string }

export type Field = {
  key: string
  label: string
  type?: FieldType
  options?: FieldOption[]
  required?: boolean
  placeholder?: string
  // Affichage dans le tableau
  hideInTable?: boolean
  badge?: boolean
  render?: (row: Record<string, any>) => ReactNode
}

export type ResourceManagerProps = {
  title: string
  description?: string
  singular: string
  fields: Field[]
  initialData: Record<string, any>[]
  exportable?: boolean
}

let idCounter = 100000

export function ResourceManager({
  title,
  description,
  singular,
  fields,
  initialData,
  exportable = true,
}: ResourceManagerProps) {
  const [rows, setRows] = useState<Record<string, any>[]>(
    initialData.map((r) => ({ ...r, id: r.id ?? ++idCounter })),
  )
  const [query, setQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Record<string, any> | null>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [deleteTarget, setDeleteTarget] = useState<Record<string, any> | null>(
    null,
  )

  const tableFields = fields.filter((f) => !f.hideInTable)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((row) =>
      fields.some((f) =>
        String(row[f.key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    )
  }, [rows, query, fields])

  function openCreate() {
    setEditing(null)
    const blank: Record<string, any> = {}
    fields.forEach((f) => (blank[f.key] = ""))
    setForm(blank)
    setDialogOpen(true)
  }

  function openEdit(row: Record<string, any>) {
    setEditing(row)
    setForm({ ...row })
    setDialogOpen(true)
  }

  function handleSubmit() {
    const missing = fields.find((f) => f.required && !String(form[f.key] ?? "").trim())
    if (missing) {
      toast.error(`Le champ « ${missing.label} » est obligatoire.`)
      return
    }
    if (editing) {
      setRows((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...r, ...form } : r)),
      )
      toast.success(`${singular} modifié(e) avec succès.`)
    } else {
      setRows((prev) => [{ ...form, id: ++idCounter }, ...prev])
      toast.success(`${singular} ajouté(e) avec succès.`)
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    toast.success(`${singular} supprimé(e).`)
    setDeleteTarget(null)
  }

  function handleExport() {
    exportToCsv(
      `${title.replace(/\s+/g, "_").toLowerCase()}.csv`,
      tableFields.map((f) => ({ key: f.key, label: f.label })),
      filtered,
    )
    toast.success("Export CSV téléchargé.")
  }

  function renderCell(field: Field, row: Record<string, any>) {
    if (field.render) return field.render(row)
    const value = row[field.key]
    if (field.badge && value) {
      return <Badge variant="secondary">{String(value)}</Badge>
    }
    return value === "" || value == null ? (
      <span className="text-muted-foreground">—</span>
    ) : (
      String(value)
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {exportable ? (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="size-4" />
              Exporter
            </Button>
          ) : null}
          <Button size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          className="pl-8"
        />
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {tableFields.map((f) => (
                  <TableHead key={f.key} className="whitespace-nowrap font-semibold">
                    {f.label}
                  </TableHead>
                ))}
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={tableFields.length + 1}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Aucune donnée
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id}>
                    {tableFields.map((f) => (
                      <TableCell key={f.key} className="whitespace-nowrap">
                        {renderCell(f, row)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => openEdit(row)}
                          aria-label="Modifier"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(row)}
                          aria-label="Supprimer"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} enregistrement{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Dialog création / édition */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? `Modifier ${singular.toLowerCase()}` : `Ajouter ${singular.toLowerCase()}`}
            </DialogTitle>
            <DialogDescription>
              Renseignez les informations ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {fields.map((f) => (
              <div key={f.key} className="grid gap-2">
                <Label htmlFor={f.key}>
                  {f.label}
                  {f.required ? <span className="text-destructive"> *</span> : null}
                </Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.key}
                    value={form[f.key] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                  />
                ) : f.type === "select" ? (
                  <Select
                    value={form[f.key] ? String(form[f.key]) : ""}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, [f.key]: v }))
                    }
                  >
                    <SelectTrigger id={f.key}>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={f.key}
                    type={f.type === "number" ? "number" : f.type === "email" ? "email" : f.type === "date" ? "date" : "text"}
                    value={form[f.key] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation suppression */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L&apos;enregistrement sera
              définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
