// Estrutura física do galpão (configuração, não dados operacionais).
export const AISLES = 6;
export const RACKS_PER_AISLE = 4;
export const BAYS_PER_RACK = 10;
export const LEVELS_PER_RACK = 4;

export const BAY_W = 1.2;
export const LEVEL_H = 1.5;
export const RACK_DEPTH = 1.1;
export const AISLE_PITCH = 5.2;
export const RACK_GAP = 1.6;
export const RACK_LEN = BAYS_PER_RACK * BAY_W;

export const TOTAL_RACKS = AISLES * RACKS_PER_AISLE;
export const TOTAL_POSITIONS = TOTAL_RACKS * BAYS_PER_RACK * LEVELS_PER_RACK;

export interface StoragePosition {
  index: number;
  aisle: number;
  rack: number;
  bay: number;
  level: number;
  address: string;
  x: number;
  y: number;
  z: number;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function positionAddress(aisle: number, rack: number, bay: number, level: number) {
  return `C${pad(aisle)}-E${pad(rack)}-P${pad(bay)}-N${level}`;
}

export function rackOrigin(aisle: number, rack: number) {
  const totalZ = RACKS_PER_AISLE * RACK_LEN + (RACKS_PER_AISLE - 1) * RACK_GAP;
  const x = (aisle - (AISLES - 1) / 2) * AISLE_PITCH;
  const z = -totalZ / 2 + rack * (RACK_LEN + RACK_GAP);
  return { x, z };
}

export function buildPositions(): StoragePosition[] {
  const list: StoragePosition[] = [];
  for (let a = 0; a < AISLES; a++)
    for (let r = 0; r < RACKS_PER_AISLE; r++) {
      const o = rackOrigin(a, r);
      for (let b = 0; b < BAYS_PER_RACK; b++)
        for (let l = 0; l < LEVELS_PER_RACK; l++)
          list.push({
            index: list.length,
            aisle: a + 1,
            rack: a * RACKS_PER_AISLE + r + 1,
            bay: b + 1,
            level: l + 1,
            address: positionAddress(a + 1, a * RACKS_PER_AISLE + r + 1, b + 1, l + 1),
            x: o.x,
            y: l * LEVEL_H + 0.55,
            z: o.z + b * BAY_W + BAY_W / 2,
          });
    }
  return list;
}
