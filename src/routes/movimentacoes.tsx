import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/movimentacoes");

export const Route = createFileRoute("/movimentacoes")({
  head: () => ({
    meta: [
      { title: "Movimentações · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Movimentações · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
