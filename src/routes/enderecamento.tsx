import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/enderecamento");

export const Route = createFileRoute("/enderecamento")({
  head: () => ({
    meta: [
      { title: "Endereçamento · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Endereçamento · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
