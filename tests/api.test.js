import { jest } from "@jest/globals";
import { API } from "~/utils/api.js";

beforeEach(() => {
  jest.clearAllMocks();
  global.CAPACITOR = {
    doPost: jest.fn(),
    doGet: jest.fn()
  };
});

describe("utils: API", () => {
  it("userLogin(payload) - successful user login", async () => {
    const payload = {
      email: "testemail",
      password: "testpassword"
    };
    const expectedResponse = {
      email: "testemail",
      nombre: "testnombre",
      token: "testtoken"
    };
    const mockPost = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doPost = mockPost;
    const response = await API.userLogin(payload);
    expect(mockPost).toHaveBeenCalledWith(API.loginURL, payload);
    expect(response).toEqual(expectedResponse);
  });

  it("userRegistro(payload) - successful user registration", async () => {
    const payload = {
      email: "testemail",
      nombre: "tetnombre",
      password: "testpassword"
    };
    const expectedResponse = {
      email: "testemail",
      nombre: "testnombre",
      token: "testtoken"
    };
    const mockPost = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doPost = mockPost;
    const response = await API.userRegistro(payload);
    expect(mockPost).toHaveBeenCalledWith(API.registroURL, payload);
    expect(response).toEqual(expectedResponse);
  });

  it("userPassUpdate(payload) - successful user password update", async () => {
    const payload = {
      email: "testemail",
      password: "testpassword",
      new_password: "testnewpassword"
    };
    const expectedResponse = {
      error: false
    };
    const mockPost = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doPost = mockPost;
    const response = await API.userPassUpdate(payload);
    expect(mockPost).toHaveBeenCalledWith(API.updateURL, payload);
    expect(response).toEqual(expectedResponse);
  });

  it("addTarjeta(payload) - successful card addition", async () => {
    const payload = {
      nombre: "testnombre",
      numero: "testnumero",
      email: "testemail",
      token: "testtoken"
    };
    const expectedResponse = {
      error: false
    };
    const mockPost = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doPost = mockPost;
    const response = await API.addTarjeta(payload);
    expect(mockPost).toHaveBeenCalledWith(API.addTarjetaURL, payload);
    expect(response).toEqual(expectedResponse);
  });

  it("getTarjetas(payload) - successful all cards retrieval", async () => {
    const payload = {
      email: "testemail",
      token: "testtoken"
    };
    const expectedResponse = [{
      nombre: "testnombre",
      numero: "testnumero",
      fecha_added: "testfechaadded"
    }];
    const mockPost = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doPost = mockPost;
    const response = await API.getTarjetas(payload);
    expect(mockPost).toHaveBeenCalledWith(API.getTarjetasURL, payload);
    expect(response).toEqual(expectedResponse);
  });

  it("getTarjetaAPI(32581515) - successful api card retrieval", async () => {
    const numero = "32581515";
    const expectedResponse = {
      status: "ok",
      tarjeta: {
        numero: "32581515",
        ksi: "BIJDCFBH19670183082790515547",
        saldo: "1.80",
        estado: "Contrato Activo",
        fecha: "07/11/2022 15:08",
        tipo: "Tarjeta Rapipass",
        movimientos: []
      }
    };
    const mockGet = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doGet = mockGet;
    const response = await API.getTarjetaAPI(numero);
    expect(mockGet).toHaveBeenCalledWith(`${API.tarjetasAPI}/${numero}`);
    expect(response.tarjeta).toEqual(expectedResponse.tarjeta);
  });

  it("getTarjetaAPI(\"Invalid\") - invalid card number", async () => {
    const numero = "Invalid";
    const expectedResponse = {
      error: false,
      status: "error",
      code: 400,
      message: "Número de tarjeta no válido"
    };
    const error = {
      error: true,
      error_key: "error_tarjeta_unknown"
    };
    const mockGet = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doGet = mockGet;
    const response = await API.getTarjetaAPI(numero);
    expect(mockGet).toHaveBeenCalledWith(`${API.tarjetasAPI}/${numero}`);
    expect(response).toEqual(error);
  });

  it("getTarjetaAPI() - error", async () => {
    const numero = "";
    const expectedResponse = {
      error: true,
      error_key: "error"
    };
    const mockGet = jest.fn().mockResolvedValue(expectedResponse);
    CAPACITOR.doGet = mockGet;
    const response = await API.getTarjetaAPI(numero);
    expect(mockGet).toHaveBeenCalledWith(`${API.tarjetasAPI}/${numero}`);
    expect(response).toEqual(expectedResponse);
  });
});
