import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

const TABLE = {
  tarjetas_table: `
    CREATE TABLE tarjetas (
      nombre TEXT,
      numero TEXT PRIMARY KEY,
      saldo TEXT,
      estado TEXT,
      fecha KEY_FECHA,
      tipo TEXT)`,
  movimientos_table: `
    CREATE TABLE movimientos (
      numero TEXT,
      movimiento TEXT,
      fecha TEXT,
      monto TEXT,
      saldo TEXT)`
};

export class Database {
  constructor (database, SQLite = new SQLiteDBConnection()) {
    this.SQLite = SQLite;
    this.database = database;
  }

  static async Setup (database) {
    const connection = new SQLiteConnection(CapacitorSQLite);
    const exists = await connection.isConnection(database);
    let SQLite = null;
    if (!exists) {
      SQLite = await connection.createConnection(database, false, "no-encryption", 1);
      this.SQLite = SQLite;
      await this.query(TABLE.tarjetas_table);
      await this.query(TABLE.movimientos_table);
    }
    return new Database(database, SQLite);
  }

  // Tarjetas
  getTarjetas () {
    return this.use(() => {
      const statement = "SELECT * FROM tarjetas ORDER BY fecha DESC";
      return this.query(statement);
    });
  }

  insertTarjeta (tarjeta) {
    return this.use(() => {
      const { nombre, numero, saldo, estado, fecha, tipo } = tarjeta;
      const statement = `INSERT INTO tarjetas VALUES ('${nombre}', '${numero}', '${saldo}', '${estado}', '${fecha}', '${tipo}')`;
      return this.query(statement);
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
  query (statement) {
    return this.use(() => {
      return this.SQLite.query(statement);
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

export const DB = await Database.Setup("saldometrobus");
