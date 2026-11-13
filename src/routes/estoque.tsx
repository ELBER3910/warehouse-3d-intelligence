import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/estoque");

export const Route = createFileRoute("/estoque")({
  head: () => ({
    meta: [
      { title: "Estoque · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Estoque · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
