import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/recebimento");

export const Route = createFileRoute("/recebimento")({
  head: () => ({
    meta: [
      { title: "Recebimento · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Recebimento · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
