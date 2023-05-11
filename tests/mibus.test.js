import { MIBUS } from "~/utils/mibus.js";
import rutas from "~/assets/rutas.json";

describe("utils: MIBUS", () => {
  it("getRutas() - returns all routes", () => {
    const result = MIBUS.getRutas();
    expect(result).toEqual(rutas);
  });

  it("getRutas(\"Complementaria\") - returns complement routes", () => {
    const result = MIBUS.getRutas("Complementaria");
    const complementaria = rutas.filter(ruta => ruta.type === "Complementaria");
    expect(result).toEqual(complementaria);
  });

  it("getRutas(\"Invalid\") - returns empty array", () => {
    const result = MIBUS.getRutas("InvalidType");
    expect(result).toEqual([]);
  });

  it("getRuta(\"Invalid\") - returns undefined", () => {
    const result = MIBUS.getRuta("InvalidId");
    expect(result).toBeUndefined();
  });

  it("getRuta(\"C640\") - returns C640 route", () => {
    const result = MIBUS.getRuta("C640");
    const route = rutas.find(ruta => ruta.route_id === "C640");
    expect(result).toEqual(route);
  });
});
