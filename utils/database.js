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
      saldo TEXT,
      lugar TEXT,
      transaccion TEXT)`
};

const ALTER = {
  lugar: "ALTER TABLE movimientos ADD lugar TEXT",
  transaccion: "ALTER TABLE movimientos ADD transaccion TEXT"
};

class Database {
  constructor (SQLite = new SQLiteDBConnection()) {
    this.SQLite = SQLite;
  }

  async setup (database) {
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

    try {
      await this.query("SELECT lugar, transaccion FROM movimientos limit 1");
    }
    catch (e) {
      console.warn(e);
      await this.execute([ALTER.lugar, ALTER.transaccion]);
    }
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
    const statement = "SELECT * FROM tarjetas WHERE numero = ?";
    const { values } = await this.query(statement, [numero]);
    let tarjeta = {};
    if (values.length) {
      tarjeta = values[0];
      switch (tarjeta.tipo) {
        case "Tarjeta Normal al Portador b":
          tarjeta.tipo = t("tarjeta_normal");
          break;
        case "Tarjeta Rapipass":
          tarjeta.tipo = t("tarjeta_rapipass");
          break;
        case "Tarjeta Escolar":
        case "Escolar 505":
          tarjeta.tipo = t("tarjeta_escolar");
          break;
        case "Tarjeta Jubilado":
        case "Jubilado":
          tarjeta.tipo = t("tarjeta_jubilado");
          break;
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
        switch (tarjeta.tipo) {
          case "Tarjeta Normal al Portador b":
            tarjeta.tipo = t("tarjeta_normal");
            break;
          case "Tarjeta Rapipass":
            tarjeta.tipo = t("tarjeta_rapipass");
            break;
          case "Tarjeta Escolar":
          case "Escolar 505":
            tarjeta.tipo = t("tarjeta_escolar");
            break;
          case "Tarjeta Jubilado":
          case "Jubilado":
            tarjeta.tipo = t("tarjeta_jubilado");
            break;
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
    const statement = "UPDATE tarjetas SET saldo = ?, estado = ?, fecha = ?, tipo = ? WHERE numero = ?";
    const { changes } = await this.run(statement, [saldo, estado, fecha, tipo, numero]);
    console.info(`Updated: ${numero}`);
    return changes;
  }

  async updateNombreTarjeta (numero, nombre) {
    const statement = "UPDATE tarjetas SET nombre = ? WHERE numero = ?";
    const { changes } = await this.run(statement, [nombre, numero]);
    console.info(`Edited: ${numero}`);
    return changes;
  }

  async deleteTarjeta (numero) {
    const set = [
      { statement: "DELETE FROM tarjetas WHERE numero = ?", values: [numero] },
      { statement: "DELETE FROM movimientos WHERE numero = ?", values: [numero] }
    ];

    const { changes } = await this.execute(set);
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
    let size = movimientos.length;
    if (!size) {
      return false;
    }
    while (size--) {
      const movimiento = movimientos[size].tipo;
      const fecha = convertToTime(movimientos[size].fecha_hora);
      const monto = movimientos[size].monto;
      const saldo = movimientos[size].saldo_tarjeta;
      const lugar = movimientos[size].lugar;
      const transaccion = movimientos[size].transaccion;
      const statement = "INSERT INTO movimientos VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [numero, movimiento, fecha, monto, saldo, lugar, transaccion];
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
    const statement = "DELETE FROM movimientos WHERE numero = ?";
    return this.run(statement, [numero]);
  }

  // Base methods
  query (statement, values) {
    return this.SQLite.query(statement, values);
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
