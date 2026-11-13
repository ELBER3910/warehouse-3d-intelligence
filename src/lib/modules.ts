import {
  LayoutDashboard, Box, Package, Boxes, MapPin, PackageCheck, ArrowDownToLine,
  ListChecks, Truck, ArrowLeftRight, FileBarChart, Settings, type LucideIcon,
} from "lucide-react";

export interface ModuleDef {
  to: "/" | "/galpao" | "/produtos" | "/estoque" | "/enderecamento" | "/recebimento" | "/armazenagem" | "/separacao" | "/expedicao" | "/movimentacoes" | "/relatorios" | "/configuracoes";
  label: string;
  icon: LucideIcon;
  group: "Visão geral" | "Cadastros" | "Operações" | "Gestão";
  description: string;
  features: string[];
}

export const MODULES: ModuleDef[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Visão geral", description: "Indicadores operacionais do galpão.", features: [] },
  { to: "/galpao", label: "Galpão 3D", icon: Box, group: "Visão geral", description: "Gêmeo digital tridimensional do armazém.", features: [] },
  { to: "/produtos", label: "Produtos", icon: Package, group: "Cadastros", description: "Cadastro de SKUs, dimensões, unidades e códigos de barras.", features: ["Cadastro de SKU e EAN", "Dimensões e peso", "Unidades de medida", "Categorias e classes ABC"] },
  { to: "/estoque", label: "Estoque", icon: Boxes, group: "Cadastros", description: "Saldos por produto, lote, validade e posição.", features: ["Saldo por SKU", "Controle de lote e validade", "Bloqueios e reservas", "Inventário cíclico"] },
  { to: "/enderecamento", label: "Endereçamento", icon: MapPin, group: "Cadastros", description: "Estrutura de corredores, estantes, níveis e posições.", features: ["Corredores e estantes", "Níveis e posições", "Capacidade por posição", "Etiquetas de endereço"] },
  { to: "/recebimento", label: "Recebimento", icon: PackageCheck, group: "Operações", description: "Entrada de mercadorias, conferência e notas fiscais.", features: ["Agendamento de docas", "Conferência cega", "Vínculo com NF-e", "Divergências"] },
  { to: "/armazenagem", label: "Armazenagem", icon: ArrowDownToLine, group: "Operações", description: "Put-away com sugestão inteligente de endereço.", features: ["Sugestão de endereço", "Tarefas de put-away", "Confirmação por leitura", "Regras por família"] },
  { to: "/separacao", label: "Separação", icon: ListChecks, group: "Operações", description: "Picking por onda, pedido ou zona.", features: ["Ondas de separação", "Rotas otimizadas", "Picking por zona", "Conferência de itens"] },
  { to: "/expedicao", label: "Expedição", icon: Truck, group: "Operações", description: "Consolidação, carregamento e saída de cargas.", features: ["Montagem de carga", "Romaneio", "Controle de docas", "Rastreio de saída"] },
  { to: "/movimentacoes", label: "Movimentações", icon: ArrowLeftRight, group: "Gestão", description: "Histórico e transferências entre posições.", features: ["Transferências internas", "Histórico auditável", "Ajustes de estoque", "Atualização em tempo real"] },
  { to: "/relatorios", label: "Relatórios", icon: FileBarChart, group: "Gestão", description: "Análises de ocupação, giro e produtividade.", features: ["Ocupação por corredor", "Giro de estoque", "Produtividade", "Exportação"] },
  { to: "/configuracoes", label: "Configurações", icon: Settings, group: "Gestão", description: "Usuários, permissões e parâmetros do sistema.", features: ["Usuários e perfis", "Permissões (RLS)", "Parâmetros do galpão", "Integrações"] },
];

export const getModule = (to: ModuleDef["to"]) => MODULES.find((m) => m.to === to)!;
