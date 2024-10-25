import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { $fetch } from "ofetch";

const rutasDir = fileURLToPath(new URL("./../app/assets", import.meta.url));

const response = await $fetch("https://saldometrobus.yizack.com/mibus/rutas.json").catch((e) => {
  console.warn(e);
  process.exit(1);
});

await writeFile(`${rutasDir}/rutas.json`, JSON.stringify(response)).catch((e) => {
  console.warn(e);
  process.exit(1);
});

console.info("Rutas MiBus:", response.length);
