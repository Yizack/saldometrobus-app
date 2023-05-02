import rutas from "~/assets/rutas.json";

class RutasMiBus {
  getRutas (name = "") {
    if (!name) {
      return rutas;
    }
    return rutas.filter(ruta => ruta.type === name);
  }

  getRuta (id = "") {
    return rutas.find(ruta => ruta.route_id === id);
  }
}

export const MIBUS = new RutasMiBus();
