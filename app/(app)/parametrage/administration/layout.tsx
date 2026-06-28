import type { ReactNode } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SubNav } from "@/components/layout/sub-nav"
import { subNavs } from "@/lib/navigation"

export default function AdministrationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Administration"
        description="Gestion des utilisateurs, rôles, permissions et structure organisationnelle."
      />
      <SubNav items={subNavs.administration} />
      <div className="rounded-xl border bg-card p-4 sm:p-6">{children}</div>
    </div>
  )
}
