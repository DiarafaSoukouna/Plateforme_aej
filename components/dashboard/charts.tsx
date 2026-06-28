"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  financementParMois,
  projetsParRegion,
  repartitionAvis,
} from "@/lib/mock-data"

const GREEN = "oklch(0.52 0.13 150)"
const ORANGE = "oklch(0.7 0.17 52)"
const PIE_COLORS = [
  "oklch(0.52 0.13 150)",
  "oklch(0.7 0.17 52)",
  "oklch(0.62 0.1 180)",
  "oklch(0.6 0.12 25)",
]

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid oklch(0.9 0.01 150)",
  fontSize: 12,
}

export function FinancementChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={financementParMois} margin={{ left: -16, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GREEN} stopOpacity={0.35} />
            <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="mois" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number) => [`${v} M FCFA`, "Montant"]}
        />
        <Area
          type="monotone"
          dataKey="montant"
          stroke={GREEN}
          strokeWidth={2}
          fill="url(#fin)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ProjetsRegionChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={projetsParRegion} margin={{ left: -16, right: 8, top: 8 }}>
        <XAxis dataKey="region" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "oklch(0.96 0.01 150)" }}
          formatter={(v: number) => [v, "Projets"]}
        />
        <Bar dataKey="projets" fill={ORANGE} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function AvisChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Pie
          data={repartitionAvis}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
        >
          {repartitionAvis.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
