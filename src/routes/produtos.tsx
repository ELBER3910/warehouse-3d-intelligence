import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/produtos");

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Produtos · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
