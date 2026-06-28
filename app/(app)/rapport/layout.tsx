import type { ReactNode } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SubNav } from "@/components/layout/sub-nav"
import { subNavs } from "@/lib/navigation"

export default function RapportLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Rapports"
        description="Génération et consultation des rapports de la plateforme."
      />
      <SubNav items={subNavs.rapport} />
      {children}
    </div>
  )
}
