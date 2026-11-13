import { describe, expect, it } from "vitest";
import { AISLES, TOTAL_RACKS, TOTAL_POSITIONS, buildPositions } from "./warehouse-layout";

describe("estrutura do galpão", () => {
  it("tem 6 corredores, 24 estantes e 960 posições", () => {
    expect(AISLES).toBe(6);
    expect(TOTAL_RACKS).toBe(24);
    expect(TOTAL_POSITIONS).toBe(960);
    const p = buildPositions();
    expect(p).toHaveLength(960);
    expect(new Set(p.map((x) => x.address)).size).toBe(960);
  });
});
