import type { ReactNode } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SubNav } from "@/components/layout/sub-nav"
import { subNavs } from "@/lib/navigation"

export default function FinancementLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Financement"
        description="Gestion des financements, des organismes et des remboursements."
      />
      <SubNav items={subNavs.financement} />
      <div className="rounded-xl border bg-card p-4 sm:p-6">{children}</div>
    </div>
  )
}
