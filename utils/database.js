import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { defineCustomElement } from "jeep-sqlite/dist/components/jeep-sqlite";

const TABLE = {
  tarjetas_table: `
    CREATE TABLE IF NOT EXISTS tarjetas (
      nombre TEXT,
      numero TEXT PRIMARY KEY,
      saldo TEXT,
      estado TEXT,
      fecha KEY_FECHA,
      tipo TEXT)`,
  movimientos_table: `
    CREATE TABLE IF NOT EXISTS movimientos (
      numero TEXT,
      movimiento TEXT,
      fecha TEXT,
      monto TEXT,
      saldo TEXT)`
};

class Database {
  constructor (database, SQLite = new SQLiteDBConnection()) {
    this.SQLite = SQLite;
    this.database = database;
    this.query(TABLE.tarjetas_table);
    this.query(TABLE.movimientos_table);
  }

  static async Setup (database) {
    const connection = new SQLiteConnection(CapacitorSQLite);

    if (!CAPACITOR.isNative()) {
      defineCustomElement(window);
      const jeep = document.createElement("jeep-sqlite");
      document.body.appendChild(jeep);
      await customElements.whenDefined('jeep-sqlite');
      await connection.initWebStore();
    }
    
    const SQLite = await connection.createConnection(database, false, "no-encryption", 1);
    return new Database(database, SQLite);
  }

  // Tarjetas
  getTarjetas () {
    return this.use(async () => {
      const statement = "SELECT * FROM tarjetas ORDER BY fecha DESC";
      const { values } = await this.query(statement);
      return values;
    });
  }

  insertTarjeta (tarjeta) {
    return this.use(async () => {
      const { nombre, numero, saldo, estado, fecha, tipo } = tarjeta;
      const values = [ nombre, numero, saldo, estado, fecha, tipo ];
      const statement = "INSERT INTO tarjetas VALUES (?, ?, ?, ?, ?, ?);";
      return this.query(statement, values);
    });
  }

  getTarjeta (numero) {
    return this.use(() => {
      const statement = `SELECT * FROM tarjetas WHERE numero = '${numero}'`;
      return this.query(statement);
    });
  }

  updateTarjeta (tarjeta) {
    return this.use(() => {
      const { nombre, numero, saldo, estado, fecha, tipo } = tarjeta;
      const statement = `UPDATE tarjetas SET nombre = '${nombre}', saldo = '${saldo}', estado = '${estado}', fecha = '${fecha}', tipo = '${tipo}' WHERE numero = '${numero}'`;
      return this.query(statement);
    });
  }

  updateNombreTarjeta (numero, nombre) {
    return this.use(() => {
      const statement = `UPDATE tarjetas SET nombre = '${nombre}' WHERE numero = '${numero}'`;
      return this.query(statement);
    });
  }

  existsTarjeta (numero) {
    return this.use(() => {
      const statement = `SELECT * FROM tarjetas WHERE numero = '${numero}'`;
      return this.query(statement);
    });
  }

  deleteTarjeta (numero) {
    const statements = [
      `DELETE FROM tarjetas WHERE numero = '${numero}'`,
      `DELETE FROM movimientos WHERE numero = '${numero}'`
    ];

    const results = [];

    statements.forEach((statement) => {
      this.use(async () => {
        results.push(await this.query(statement));
      });
    });

    return results;
  }

  // Movimientos
  insertMovimientos (movimientos) {
    return this.use(() => {
      const { numero, movimiento, fecha, monto, saldo } = movimientos;
      const statement = `INSERT INTO movimientos VALUES ('${numero}', '${movimiento}', '${fecha}', '${monto}', '${saldo}')`;
      return this.query(statement);
    });
  }

  getMovimientos (numero) {
    return this.use(() => {
      const statement = `SELECT * FROM movimientos WHERE numero = '${numero}' ORDER BY fecha DESC`;
      return this.query(statement);
    });
  }

  // Base methods
  query (statement, values) {
    return this.use(() => {
      return this.SQLite.query(statement, values);
    });
  }

  async open () {
    await this.SQLite.open();
  }

  async close () {
    await this.SQLite.close();
  }

  async use (callback) {
    await this.open();
    const result = await callback();
    await this.close();
    return result;
  }
}

export const DB = await Database.Setup("saldometrobus.db");
