import { writeFileSync } from "fs";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const result = await fetch("https://www.mibus.com.pa/wp-content/uploads/web-maps/routes.js");
const response = await result.text();
const routes = JSON.parse(response.replace("const datamap = ", "").replace(";", ""));
console.info("Rutas MiBus: ", routes.length);
writeFileSync("./assets/rutas.json", JSON.stringify(routes));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
