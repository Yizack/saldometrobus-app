export {};

declare global {
  type Locale = "en" | "es";
  interface SaldometrobusTarjeta {
    fecha_added: string;
    nombre: string;
    numero: string;
    saldo: string;
    estado: string;
    fecha: string;
    tipo: string;
    movimientos: SaldometrobusMovimiento[];
  }
  interface SaldometrobusMovimiento {
    transaccion: string;
    tipo: string;
    fecha_hora: string;
    monto: string;
    saldo_tarjeta: string;
    lugar: string;
  }
}
