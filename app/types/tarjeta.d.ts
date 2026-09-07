export {};

declare global {
  interface TarjetaAPI {
    nombre: string;
    numero: string;
    email: string;
  }

  interface TarjetaScrapper {
    numero: string;
    saldo: string;
    estado: string;
    fecha: string;
    tipo: string;
    movimientos: MovimientoScrapper[];
  }

  interface MovimientoScrapper {
    transaccion: string;
    tipo: string;
    fecha_hora: string;
    monto: string;
    saldo_tarjeta: string;
    lugar: string;
  }

  interface MovimientoDB {
    id: string;
    movimiento: string;
    fecha: string;
    color: string;
    sign: string;
    monto: string;
    saldo: string;
    transaccion: string;
    lugar: string;
  }

  interface TarjetaDB {
    estado: string;
    fecha: string;
    fecha_added: string;
    nombre: string;
    numero: string;
    saldo: string;
    tipo: string;
    movimientos: MovimientoDB[];
  }
}
