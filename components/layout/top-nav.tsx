"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"
import { useAuth } from "@/components/auth-provider"
import { useSettings } from "@/components/settings-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

function sectionActive(pathname: string, item: { href?: string; children?: { href: string }[] }) {
  if (item.href) return isActive(pathname, item.href)
  return item.children?.some((c) => isActive(pathname, c.href)) ?? false
}

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { settings } = useSettings()
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleLogout() {
    logout()
    router.push("/login")
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
    : "U"

  return (
    <header className="sticky top-0 z-40 border-b bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icon.png"
            alt={settings.appShortName}
            width={36}
            height={36}
            className="rounded-md"
          />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold">{settings.appShortName}</span>
            <span className="text-[10px] text-sidebar-foreground/70">
              {settings.tagline}
            </span>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent",
                    sectionActive(pathname, item) &&
                      "bg-sidebar-accent text-sidebar-primary",
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link
                        href={child.href}
                        className={cn(
                          isActive(pathname, child.href) &&
                            "bg-accent/10 font-medium text-accent",
                        )}
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent",
                  isActive(pathname, item.href!) &&
                    "bg-sidebar-accent text-sidebar-primary",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-1.5 py-1 transition-colors hover:bg-sidebar-accent">
              <Avatar className="size-8">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-tight md:block">
                <p className="text-xs font-semibold">{user?.name}</p>
                <p className="text-[10px] text-sidebar-foreground/70">
                  {user?.role}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profil">
                  <User className="size-4" />
                  Profil & configuration
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="size-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bouton menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation mobile */}
      {mobileOpen ? (
        <nav className="border-t border-sidebar-border px-4 py-3 lg:hidden">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent",
                      isActive(pathname, item.href) && "bg-sidebar-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div>
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase text-sidebar-foreground/60">
                      {item.label}
                    </p>
                    <ul className="ml-2 space-y-0.5">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent",
                              isActive(pathname, child.href) &&
                                "bg-sidebar-accent text-sidebar-primary",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
