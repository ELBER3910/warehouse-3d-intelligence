import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/expedicao");

export const Route = createFileRoute("/expedicao")({
  head: () => ({
    meta: [
      { title: "Expedição · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Expedição · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
