"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { NavLeaf } from "@/lib/navigation"

export function SubNav({ items }: { items: NavLeaf[] }) {
  const pathname = usePathname()
  return (
    <div className="overflow-x-auto">
      <nav className="inline-flex gap-1 rounded-lg border bg-card p-1">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
