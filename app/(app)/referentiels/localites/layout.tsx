import type { ReactNode } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { SubNav } from "@/components/layout/sub-nav"
import { subNavs } from "@/lib/navigation"

export default function LocalitesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Localités"
        description="Découpage géographique et niveaux de localités."
      />
      <SubNav items={subNavs.localites} />
      <div className="rounded-xl border bg-card p-4 sm:p-6">{children}</div>
    </div>
  )
}
