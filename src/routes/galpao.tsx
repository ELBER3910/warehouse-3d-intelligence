import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { MousePointerClick, Move3d, ZoomIn, X } from "lucide-react";
import { AISLES, TOTAL_RACKS, TOTAL_POSITIONS, type StoragePosition } from "@/lib/warehouse-layout";

const Warehouse3D = lazy(() => import("@/components/warehouse/Warehouse3D"));

export const Route = createFileRoute("/galpao")({
  head: () => ({
    meta: [
      { title: "Galpão 3D · Warehouse 3D Intelligence" },
      { name: "description", content: "Gêmeo digital 3D do galpão com 6 corredores, 24 estantes e 960 posições." },
      { property: "og:title", content: "Galpão 3D · Warehouse 3D Intelligence" },
      { property: "og:description", content: "Gêmeo digital 3D do galpão com seleção interativa de posições." },
    ],
  }),
  component: GalpaoPage,
});

const Loading = () => <div className="grid h-full place-items-center eyebrow">Carregando gêmeo digital…</div>;

function GalpaoPage() {
  const [sel, setSel] = useState<StoragePosition | null>(null);
  return (
    <div className="-m-4 md:-m-8 relative h-[calc(100vh-4rem)] overflow-hidden">
      <ClientOnly fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          <Warehouse3D selected={sel?.index ?? null} onSelect={setSel} />
        </Suspense>
      </ClientOnly>

      <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap gap-2 md:inset-x-6 md:top-6">
        {[["Corredores", AISLES], ["Estantes", TOTAL_RACKS], ["Posições", TOTAL_POSITIONS]].map(([l, v]) => (
          <div key={l} className="panel px-4 py-2">
            <div className="eyebrow">{l}</div>
            <div className="font-display text-xl font-bold">{v}</div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 hidden gap-4 panel px-4 py-2 text-xs text-muted-foreground sm:flex md:bottom-6 md:left-6">
        <span className="flex items-center gap-1.5"><Move3d className="size-3.5 text-primary" /> Arraste para girar</span>
        <span className="flex items-center gap-1.5"><ZoomIn className="size-3.5 text-primary" /> Role para zoom</span>
        <span className="flex items-center gap-1.5"><MousePointerClick className="size-3.5 text-primary" /> Clique numa posição</span>
      </div>

      {sel && (
        <div className="absolute bottom-3 right-3 w-[min(20rem,calc(100%-1.5rem))] panel p-5 glow md:bottom-6 md:right-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="eyebrow">Posição selecionada</div>
              <div className="font-mono text-lg font-semibold text-primary">{sel.address}</div>
            </div>
            <button onClick={() => setSel(null)} className="text-muted-foreground hover:text-foreground" aria-label="Fechar"><X className="size-4" /></button>
          </div>
          <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
            {[["Corr.", sel.aisle], ["Est.", sel.rack], ["Pos.", sel.bay], ["Nível", sel.level]].map(([k, v]) => (
              <div key={k} className="rounded-md border border-border bg-background/40 py-2"><dt className="eyebrow !text-[0.6rem]">{k}</dt><dd className="font-display font-bold">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-4 flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
            <span className="text-muted-foreground">Situação</span>
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-success" />Disponível</span>
          </div>
        </div>
      )}
    </div>
  );
}
