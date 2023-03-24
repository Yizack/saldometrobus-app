import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { defineCustomElement } from "jeep-sqlite/dist/components/jeep-sqlite";

const TABLE = {
  tarjetas: `
    CREATE TABLE IF NOT EXISTS tarjetas (
      nombre TEXT,
      numero TEXT PRIMARY KEY,
      saldo TEXT,
      estado TEXT,
      fecha KEY_FECHA,
      tipo TEXT)`,
  movimientos: `
    CREATE TABLE IF NOT EXISTS movimientos (
      numero TEXT,
      movimiento TEXT,
      fecha TEXT,
      monto TEXT,
      saldo TEXT)`
};

class Database {
  constructor (SQLite = new SQLiteDBConnection()) {
    this.SQLite = SQLite;
  }

  static async Setup (database) {
    const connection = new SQLiteConnection(CapacitorSQLite);

    if (!CAPACITOR.isNative()) {
      defineCustomElement(window);
      const jeep = document.createElement("jeep-sqlite");
      document.body.appendChild(jeep);
      await customElements.whenDefined("jeep-sqlite");
      await connection.initWebStore();
    }

    const ret = await connection.checkConnectionsConsistency();
    const isConn = (await connection.isConnection(database)).result;

    let SQLite = new SQLiteDBConnection();
    if (ret.result && isConn) {
      SQLite = await connection.retrieveConnection(database);
    }
    else {
      SQLite = await connection.createConnection(database, false, "no-encryption", 1);
    }

    await SQLite.open().then(() => {
      console.info("Opening database");
    });

    await SQLite.execute(TABLE.tarjetas);
    await SQLite.execute(TABLE.movimientos);

    if (!CAPACITOR.isNative()) {
      await SQLite.execute("DELETE FROM tarjetas");
      await SQLite.execute("DELETE FROM movimientos");
    }

    return new Database(SQLite);
  }

  // Tarjetas
  async insertTarjeta (tarjeta) {
    const { nombre, numero, saldo, estado, fecha, tipo } = tarjeta;
    const values = [nombre, numero, saldo, estado, fecha, tipo];
    const statement = "INSERT INTO tarjetas VALUES (?, ?, ?, ?, ?, ?)";
    const { changes } = await this.run(statement, values);
    return changes;
  }

  getTarjeta (numero) {
    const statement = `SELECT * FROM tarjetas WHERE numero = '${numero}'`;
    return this.query(statement);
  }

  async getTarjetas () {
    const statement = "SELECT * FROM tarjetas ORDER BY fecha DESC";
    const { values } = await this.query(statement);
    return values;
  }

  updateTarjeta (tarjeta) {
    const { nombre, numero, saldo, estado, fecha, tipo } = tarjeta;
    const statement = `UPDATE tarjetas SET nombre = '${nombre}', saldo = '${saldo}', estado = '${estado}', fecha = '${fecha}', tipo = '${tipo}' WHERE numero = '${numero}'`;
    return this.query(statement);
  }

  updateNombreTarjeta (numero, nombre) {
    const statement = `UPDATE tarjetas SET nombre = '${nombre}' WHERE numero = '${numero}'`;
    return this.query(statement);
  }

  existsTarjeta (numero) {
    const statement = `SELECT * FROM tarjetas WHERE numero = '${numero}'`;
    return this.query(statement);
  }

  deleteTarjeta (numero) {
    // TODO: use execSet
    const statements = [
      `DELETE FROM tarjetas WHERE numero = '${numero}'`,
      `DELETE FROM movimientos WHERE numero = '${numero}'`
    ];

    const results = [];

    statements.forEach(async (statement) => {
      results.push(await this.execute(statement));
    });

    return results;
  }

  // Movimientos
  insertMovimientos (movimientos) {
    const { numero, movimiento, fecha, monto, saldo } = movimientos;
    const statement = `INSERT INTO movimientos VALUES ('${numero}', '${movimiento}', '${fecha}', '${monto}', '${saldo}')`;
    return this.query(statement);
  }

  getMovimientos (numero) {
    const statement = `SELECT * FROM movimientos WHERE numero = '${numero}' ORDER BY fecha DESC`;
    return this.query(statement);
  }

  // Base methods
  query (statement) {
    return this.SQLite.query(statement);
  }

  run (statement, values) {
    return this.SQLite.run(statement, values);
  }

  execute (statement) {
    return this.SQLite.execute(statement);
  }

  async close () {
    console.info("Closing database");
    await this.SQLite.close();
  }
}

// eslint-disable-next-line import/no-mutable-exports
let DB = new Database();
(async () => {
  DB = await Database.Setup("saldometrobus.db");
})();

export { DB };
