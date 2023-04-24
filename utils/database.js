import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

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

const database = "saldometrobus.db";

class Database {
  constructor (SQLite = new SQLiteDBConnection()) {
    this.SQLite = SQLite;
  }

  async setup () {
    const connection = new SQLiteConnection(CapacitorSQLite);

    if (!CAPACITOR.isNative()) {
      const { defineCustomElement } = await import("jeep-sqlite/dist/components/jeep-sqlite");
      defineCustomElement(window);
      const jeep = document.createElement("jeep-sqlite");
      document.body.appendChild(jeep);
      await customElements.whenDefined("jeep-sqlite");
      await connection.initWebStore();
    }

    const ret = await connection.checkConnectionsConsistency();
    const isConn = (await connection.isConnection(database)).result;

    if (ret.result && isConn) {
      this.SQLite = await connection.retrieveConnection(database);
    }
    else {
      this.SQLite = await connection.createConnection(database, false, "no-encryption", 1);
    }

    await this.open();

    await this.execute([
      { statement: TABLE.tarjetas, values: [] },
      { statement: TABLE.movimientos, values: [] }
    ]);
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
        tarjeta.tipo = t("tarjeta_normal");
      }
      else if (tarjeta.tipo === "Tarjeta Rapipass") {
        tarjeta.tipo = t("tarjeta_rapipass");
      }
      if (tarjeta.estado === "Contrato Activo") {
        tarjeta.estado = t("contrato_activo");
      }
    }
    return tarjeta;
  }

  async tarjetaExists (numero) {
    const tarjeta = await this.getTarjeta(numero);
    return Boolean(tarjeta.numero);
  }

  async getTarjetas () {
    const statement = "SELECT * FROM tarjetas ORDER BY fecha_added ASC";
    const { values } = await this.query(statement);
    if (values.length) {
      values.forEach((tarjeta) => {
        if (tarjeta.tipo === "Tarjeta Normal al Portador b") {
          tarjeta.tipo = t("tarjeta_normal");
        }
        else if (tarjeta.tipo === "Tarjeta Rapipass") {
          tarjeta.tipo = t("tarjeta_rapipass");
        }
        if (tarjeta.estado === "Contrato Activo") {
          tarjeta.estado = t("contrato_activo");
        }
      });
    }
    return values;
  }

  async updateTarjeta (tarjeta) {
    const { numero, saldo, estado, fecha, tipo } = tarjeta;
    const statement = `UPDATE tarjetas SET saldo = '${saldo}', estado = '${estado}', fecha = '${fecha}', tipo = '${tipo}' WHERE numero = '${numero}'`;
    const { changes } = await this.execute(statement);
    console.info(`Updated: ${numero}`);
    return changes;
  }

  async updateNombreTarjeta (numero, nombre) {
    const statement = `UPDATE tarjetas SET nombre = '${nombre}' WHERE numero = '${numero}'`;
    console.info(`Edited: ${numero}`);
    const { changes } = await this.execute(statement);
    return changes;
  }

  existsTarjeta (numero) {
    const statement = `SELECT * FROM tarjetas WHERE numero = '${numero}'`;
    return this.query(statement);
  }

  async deleteTarjeta (numero) {
    const statements = [
      `DELETE FROM tarjetas WHERE numero = '${numero}'`,
      `DELETE FROM movimientos WHERE numero = '${numero}'`
    ];

    console.info(`Deleted: ${numero}`);

    const { changes } = await this.execute(statements);
    return changes;
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
    const statement = `SELECT * FROM movimientos WHERE numero = '${numero}' ORDER BY fecha DESC, saldo ASC`;
    const { values } = await this.query(statement);
    if (values.length) {
      const tipos = {
        uso: {
          text: "Uso",
          translation: t("uso")
        },
        carga: {
          text: "Carga",
          translation: t("carga")
        },
        online: {
          text: "Transacción de Carga de Monedero con #RA",
          translation: t("carga_online")
        },
        trasera: {
          text: "Puerta Trasera",
          translation: t("puerta_trasera")
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

  deleteMovimientos (numero) {
    const statement = `DELETE FROM movimientos WHERE numero = '${numero}'`;
    return this.execute(statement);
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

  async open () {
    await this.SQLite.open().then(() => {
      console.info("Database opened");
    });
  }

  async close () {
    await this.SQLite.close().then(() => {
      console.info("Database closed");
    });
  }
}

export const DB = new Database();
