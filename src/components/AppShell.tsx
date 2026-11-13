import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Warehouse, CircleDot } from "lucide-react";
import { MODULES } from "@/lib/modules";
import { cn } from "@/lib/utils";

const GROUPS = ["Visão geral", "Cadastros", "Operações", "Gestão"] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const current = MODULES.find((m) => m.to === pathname);

  return (
    <div className="flex min-h-screen">
      {open && <div className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <div className="grid size-9 place-items-center rounded-md bg-gradient-primary text-primary-foreground glow">
            <Warehouse className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold tracking-wide text-foreground">WAREHOUSE 3D</div>
            <div className="eyebrow !text-[0.6rem] !text-primary">Intelligence</div>
          </div>
          <button className="ml-auto text-muted-foreground lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X className="size-5" /></button>
        </div>
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
          {GROUPS.map((g) => (
            <div key={g}>
              <div className="eyebrow mb-2 px-3">{g}</div>
              <ul className="space-y-0.5">
                {MODULES.filter((m) => m.group === g).map((m) => {
                  const active = pathname === m.to;
                  return (
                    <li key={m.to}>
                      <Link to={m.to} onClick={() => setOpen(false)} className={cn(
                        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}>
                        {active && <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary glow" />}
                        <m.icon className={cn("size-4", active ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                        {m.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-sidebar-border px-5 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CircleDot className="size-3 text-success" /> Lovable Cloud conectado
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-8">
          <button className="text-muted-foreground lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu className="size-5" /></button>
          <div>
            <div className="eyebrow">WMS · Digital Twin</div>
            <div className="font-display text-base font-semibold">{current?.label ?? "Warehouse 3D"}</div>
          </div>
          <div className="ml-auto hidden items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-success" /> Galpão principal
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
