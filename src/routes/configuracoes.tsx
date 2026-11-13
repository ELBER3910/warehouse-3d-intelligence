import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/configuracoes");

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Configurações · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
