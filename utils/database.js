import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { defineCustomElement } from "jeep-sqlite/dist/components/jeep-sqlite";

const TABLE = {
  tarjetas: `
    CREATE TABLE IF NOT EXISTS tarjetas (
      nombre TEXT,
      numero TEXT PRIMARY KEY,
      saldo TEXT,
      estado TEXT,
      fecha TEXT,
      fecha_added TEXT,
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

    await SQLite.executeSet([
      { statement: TABLE.tarjetas, values: [] },
      { statement: TABLE.movimientos, values: [] }
    ]);

    return new Database(SQLite);
  }

  // Tarjetas
  async insertTarjeta (tarjeta) {
    const { nombre, numero, saldo, estado, fecha, fecha_added, tipo } = tarjeta;
    const values = [nombre, numero, saldo, estado, fecha, fecha_added, tipo];
    const statement = "INSERT INTO tarjetas VALUES (?, ?, ?, ?, ?, ?, ?)";
    const { changes } = await this.run(statement, values);
    return changes;
  }

  async getTarjeta (numero) {
    const statement = `SELECT * FROM tarjetas WHERE numero = '${numero}'`;
    const { values } = await this.query(statement);
    let tarjeta = {};
    if (values.length) {
      tarjeta = values[0];
      if (tarjeta.tipo === "Tarjeta Normal al Portador b") {
        tarjeta.tipo = STRINGS.get("tarjeta_normal");
      }
      else if (tarjeta.tipo === "Tarjeta Rapipass") {
        tarjeta.tipo = STRINGS.get("tarjeta_rapipass");
      }
      if (tarjeta.estado === "Contrato Activo") {
        tarjeta.estado = STRINGS.get("contrato_activo");
      }
    }
    return tarjeta;
  }

  async getTarjetas () {
    const statement = "SELECT * FROM tarjetas ORDER BY fecha_added DESC";
    const { values } = await this.query(statement);
    if (values.length) {
      values.forEach((tarjeta) => {
        if (tarjeta.tipo === "Tarjeta Normal al Portador b") {
          tarjeta.tipo = STRINGS.get("tarjeta_normal");
        }
        else if (tarjeta.tipo === "Tarjeta Rapipass") {
          tarjeta.tipo = STRINGS.get("tarjeta_rapipass");
        }
        if (tarjeta.estado === "Contrato Activo") {
          tarjeta.estado = STRINGS.get("contrato_activo");
        }
      });
    }
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
    const statements = [
      `DELETE FROM tarjetas WHERE numero = '${numero}'`,
      `DELETE FROM movimientos WHERE numero = '${numero}'`
    ];

    return this.execute(statements);
  }

  deleteAll () {
    const statements = [
      "DELETE FROM tarjetas",
      "DELETE FROM movimientos"
    ];
    console.info("Deleting all data");

    return this.execute(statements);
  }

  // Movimientos
  insertMovimientos (tarjeta) {
    const statements = [];
    const { numero, movimientos } = tarjeta;
    let size = movimientos.movimiento.length;
    if (!size) {
      return false;
    };
    while (size--) {
      const movimiento = movimientos.movimiento[size];
      const fecha = convertToTime(movimientos.fecha_hora[size]);
      const monto = movimientos.monto[size];
      const saldo = movimientos.saldo_tarjeta[size];
      const statement = "INSERT INTO movimientos VALUES (?, ?, ?, ?, ?)";
      const values = [numero, movimiento, fecha, monto, saldo];
      statements.push({ statement, values });
    }
    return this.execute(statements);
  }

  async getMovimientos (numero) {
    const statement = `SELECT * FROM movimientos WHERE numero = '${numero}' ORDER BY fecha DESC`;
    const { values } = await this.query(statement);
    if (values.length) {
      const tipos = {
        uso: {
          text: "Uso",
          translation: STRINGS.get("uso")
        },
        carga: {
          text: "Carga",
          translation: STRINGS.get("carga")
        },
        online: {
          text: "Transacción de Carga de Monedero con #RA",
          translation: STRINGS.get("carga_online")
        },
        trasera: {
          text: "Puerta Trasera",
          translation: STRINGS.get("puerta_trasera")
        }
      };
      values.forEach((mov) => {
        const tipo = mov.movimiento;
        if (tipo === tipos.uso.text || tipo === tipos.trasera.text) {
          mov.movimiento = tipo === tipos.uso.text ? tipos.uso.translation : tipos.trasera.translation;
          if (Number(mov.monto) > 0) {
            mov.sign = "-";
            mov.color = "danger";
          }
          else {
            mov.color = "warning";
          }
        }
        else if (tipo === tipos.carga.text || tipo === tipos.online.text) {
          mov.movimiento = tipo === tipos.carga.text ? tipos.carga.translation : tipos.online.translation;
          mov.sign = "+";
          mov.color = "success";
        }
      });
    }
    return values;
  }

  // Base methods
  query (statement) {
    return this.SQLite.query(statement);
  }

  run (statement, values) {
    return this.SQLite.run(statement, values);
  }

  execute (statement) {
    if (typeof statement === "string") {
      return this.SQLite.execute(statement);
    }
    else if (Array.isArray(statement)) {
      const set = [];
      statement.forEach((item) => {
        if (typeof item === "string") {
          set.push({ statement: item, values: [] });
        }
        else if (typeof item === "object") {
          set.push(item);
        }
      });
      return this.SQLite.executeSet(set);
    }
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
