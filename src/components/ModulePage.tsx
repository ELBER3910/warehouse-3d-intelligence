import { Database, Layers } from "lucide-react";
import type { ModuleDef } from "@/lib/modules";

export function ModulePage({ module: m }: { module: ModuleDef }) {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg border border-border bg-secondary text-primary">
          <m.icon className="size-6" />
        </div>
        <div>
          <div className="eyebrow">{m.group}</div>
          <h1 className="text-2xl font-bold md:text-3xl">{m.label}</h1>
          <p className="mt-1 text-muted-foreground">{m.description}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-6 md:col-span-2">
          <div className="eyebrow mb-4 flex items-center gap-2"><Layers className="size-3.5" /> Funcionalidades previstas</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {m.features.map((f) => (
              <div key={f} className="flex items-center gap-3 rounded-md border border-border bg-background/40 px-4 py-3 text-sm">
                <span className="size-1.5 rounded-full bg-primary glow" /> {f}
              </div>
            ))}
          </div>
        </div>
        <div className="panel flex flex-col items-center justify-center p-6 text-center">
          <Database className="size-8 text-primary" />
          <div className="mt-3 font-display font-semibold">Nenhum registro</div>
          <p className="mt-1 text-sm text-muted-foreground">Módulo pronto para receber dados na próxima etapa.</p>
        </div>
      </div>
    </div>
  );
}
