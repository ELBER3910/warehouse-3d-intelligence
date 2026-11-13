import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Grid3x3, SquareDashed, Layers, Gauge, ArrowRight, Box } from "lucide-react";
import { AISLES, TOTAL_RACKS, TOTAL_POSITIONS } from "@/lib/warehouse-layout";
import { MODULES } from "@/lib/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Warehouse 3D Intelligence" },
      { name: "description", content: "WMS com gêmeo digital 3D: indicadores de ocupação, posições e pallets do galpão." },
      { property: "og:title", content: "Warehouse 3D Intelligence" },
      { property: "og:description", content: "WMS com gêmeo digital 3D para gestão de galpões logísticos." },
    ],
  }),
  component: Dashboard,
});

// Valores operacionais permanecem zerados até a conexão com o banco de dados.
const occupied = 0;
const KPIS = [
  { label: "Produtos cadastrados", value: 0, icon: Package, hint: "Aguardando cadastro" },
  { label: "Posições ocupadas", value: occupied, icon: Grid3x3, hint: `de ${TOTAL_POSITIONS}` },
  { label: "Posições disponíveis", value: TOTAL_POSITIONS - occupied, icon: SquareDashed, hint: "Capacidade livre" },
  { label: "Pallets armazenados", value: 0, icon: Layers, hint: "Aguardando recebimento" },
];

function Dashboard() {
  const pct = Math.round((occupied / TOTAL_POSITIONS) * 100);
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <div className="eyebrow">Centro de operações</div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard operacional</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{k.label}</span>
              <k.icon className="size-4 text-primary" />
            </div>
            <div className="mt-3 font-display text-4xl font-bold tabular-nums">{k.value.toLocaleString("pt-BR")}</div>
            <div className="mt-1 text-xs text-muted-foreground">{k.hint}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel p-6">
          <div className="flex items-center justify-between"><span className="eyebrow">Ocupação do galpão</span><Gauge className="size-4 text-primary" /></div>
          <div className="relative mx-auto mt-6 grid size-44 place-items-center rounded-full" style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--muted) 0)` }}>
            <div className="grid size-36 place-items-center rounded-full bg-card">
              <div className="text-center"><div className="font-display text-4xl font-bold">{pct}%</div><div className="eyebrow">ocupado</div></div>
            </div>
          </div>
        </div>

        <div className="panel p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Ocupação por corredor</span>
            <Link to="/galpao" className="flex items-center gap-1 text-sm text-primary hover:underline"><Box className="size-4" /> Abrir galpão 3D</Link>
          </div>
          <div className="mt-6 space-y-3">
            {Array.from({ length: AISLES }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-10 font-mono text-xs text-muted-foreground">C{String(i + 1).padStart(2, "0")}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-primary" style={{ width: "0%" }} /></div>
                <span className="w-24 text-right font-mono text-xs text-muted-foreground">0 / {TOTAL_POSITIONS / AISLES}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
            {[["Corredores", AISLES], ["Estantes", TOTAL_RACKS], ["Posições", TOTAL_POSITIONS]].map(([l, v]) => (
              <div key={l}><div className="font-display text-2xl font-bold">{v}</div><div className="eyebrow">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="eyebrow mb-3">Módulos</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {MODULES.filter((m) => m.to !== "/").map((m) => (
            <Link key={m.to} to={m.to} className="panel group flex items-center gap-3 p-4 transition-colors hover:border-primary">
              <m.icon className="size-5 text-primary" />
              <span className="text-sm font-medium">{m.label}</span>
              <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
