import type { ReactNode } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SubNav } from "@/components/layout/sub-nav"
import { subNavs } from "@/lib/navigation"

export default function AutresLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Autres paramétrages"
        description="Référentiels techniques : types d'emploi, types d'entreprise et indicateurs."
      />
      <SubNav items={subNavs.autres} />
      <div className="rounded-xl border bg-card p-4 sm:p-6">{children}</div>
    </div>
  )
}
