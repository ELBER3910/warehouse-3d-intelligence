import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

const m = getModule("/separacao");

export const Route = createFileRoute("/separacao")({
  head: () => ({
    meta: [
      { title: "Separação · Warehouse 3D Intelligence" },
      { name: "description", content: m.description },
      { property: "og:title", content: "Separação · Warehouse 3D Intelligence" },
      { property: "og:description", content: m.description },
    ],
  }),
  component: () => <ModulePage module={m} />,
});
