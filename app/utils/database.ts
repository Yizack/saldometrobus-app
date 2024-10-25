import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection, type capSQLiteSet } from "@capacitor-community/sqlite";

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
  SQLite: SQLiteDBConnection;
  constructor (SQLite: SQLiteDBConnection = new SQLiteDBConnection(CONST.database, false, CapacitorSQLite)) {
    this.SQLite = SQLite;
  }

  async setup (database: string) {
    const connection = new SQLiteConnection(CapacitorSQLite);

    if (!CAPACITOR.isNative()) {
      const { defineCustomElement } = await import("jeep-sqlite/dist/components/jeep-sqlite");
      defineCustomElement();
      const jeep = document.createElement("jeep-sqlite");
      document.body.appendChild(jeep);
      await customElements.whenDefined("jeep-sqlite");
      await connection.initWebStore();
    }

    const ret = await connection.checkConnectionsConsistency();
    const isConn = (await connection.isConnection(database, false)).result;

    if (ret.result && isConn) {
      this.SQLite = await connection.retrieveConnection(database, false);
    }
    else {
      this.SQLite = await connection.createConnection(database, false, "no-encryption", 1, false);
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
  async insertTarjeta (tarjeta: SaldometrobusTarjeta) {
    const { nombre, numero, saldo, estado, fecha, fecha_added, tipo } = tarjeta;
    const values = [nombre, numero, saldo, estado, fecha, fecha_added, tipo];
    const statement = "INSERT INTO tarjetas VALUES (?, ?, ?, ?, ?, ?, ?)";
    const { changes } = await this.run(statement, values);
    return changes?.changes ?? 0;
  }

  async getTarjeta (numero: number) {
    const statement = "SELECT * FROM tarjetas WHERE numero = ?";
    const { values } = await this.query(statement, [numero]);
    let tarjeta = {} as SaldometrobusTarjeta;
    if (values && values.length) {
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

  async tarjetaExists (numero: number) {
    const tarjeta = await this.getTarjeta(numero);
    return Boolean(tarjeta.numero);
  }

  async getTarjetas () {
    const statement = "SELECT * FROM tarjetas ORDER BY fecha_added ASC";
    const { values } = await this.query(statement);
    if (values && values.length) {
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
    return values as SaldometrobusTarjeta[];
  }

  async updateTarjeta (tarjeta: SaldometrobusTarjeta) {
    const { numero, saldo, estado, fecha, tipo } = tarjeta;
    const statement = "UPDATE tarjetas SET saldo = ?, estado = ?, fecha = ?, tipo = ? WHERE numero = ?";
    const { changes } = await this.run(statement, [saldo, estado, fecha, tipo, numero]);
    console.info(`Updated: ${numero}`);
    return changes?.changes ?? 0;
  }

  async updateNombreTarjeta (numero: number, nombre: string) {
    const statement = "UPDATE tarjetas SET nombre = ? WHERE numero = ?";
    const { changes } = await this.run(statement, [nombre, numero]);
    console.info(`Edited: ${numero}`);
    return changes?.changes ?? 0;
  }

  async deleteTarjeta (numero: number) {
    const set = [
      { statement: "DELETE FROM tarjetas WHERE numero = ?", values: [numero] },
      { statement: "DELETE FROM movimientos WHERE numero = ?", values: [numero] }
    ];

    const executed = await this.execute(set);
    return executed?.changes;
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
  insertMovimientos (tarjeta: SaldometrobusTarjeta) {
    const statements = [];
    const { numero, movimientos } = tarjeta;
    let size = movimientos.length;
    if (!size) {
      return false;
    }
    while (size--) {
      const obj = movimientos[size];
      if (!obj) continue;
      const movimiento = obj.tipo;
      const fecha = convertToTime(obj.fecha_hora);
      const monto = obj.monto;
      const saldo = obj.saldo_tarjeta;
      const lugar = obj.lugar;
      const transaccion = obj.transaccion;
      const statement = "INSERT INTO movimientos VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [numero, movimiento, fecha, monto, saldo, lugar, transaccion];
      statements.push({ statement, values });
    }
    return this.execute(statements);
  }

  async getMovimientos (numero: number) {
    const statement = `SELECT * FROM movimientos WHERE numero = '${numero}' ORDER BY fecha DESC, saldo ASC`;
    const { values } = await this.query(statement);
    if (values && values.length) {
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

  deleteMovimientos (numero: string) {
    const statement = "DELETE FROM movimientos WHERE numero = ?";
    return this.run(statement, [numero]);
  }

  // Base methods
  query (statement: string, values?: unknown[]) {
    return this.SQLite.query(statement, values);
  }

  run (statement: string, values?: unknown[]) {
    return this.SQLite.run(statement, values);
  }

  execute (statement: string | unknown[]) {
    if (typeof statement === "string") {
      return this.SQLite.execute(statement);
    }
    else if (Array.isArray(statement)) {
      const set = [] as capSQLiteSet[];
      statement.forEach((item) => {
        if (typeof item === "string") {
          set.push({ statement: item, values: [] });
        }
        else if (typeof item === "object") {
          if (!item) return;
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
