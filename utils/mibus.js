import rutas from "~/assets/rutas.json";

class RutasMiBus {
  getRutas (name = "") {
    if (!name) {
      return rutas;
    }
    return rutas.filter(ruta => ruta.type === name);
  }
}

export const MIBUS = new RutasMiBus();
