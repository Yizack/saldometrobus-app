import { writeFileSync } from "fs";

try {
  const result = await fetch("https://saldometrobus.yizack.com/mibus/rutas.json");
  const response = await result.text();
  const rutas = JSON.parse(response);
  writeFileSync("./assets/rutas.json", response);
  console.info("Rutas MiBus:", rutas.length);
}
catch (error) {
  console.warn(error);
}
