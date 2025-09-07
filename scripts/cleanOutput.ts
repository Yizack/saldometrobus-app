import { rmSync } from "node:fs";

const public_path = "./.output/public/";

try {
  const dirs = ["assets"];
  dirs.map(d => rmSync(public_path + d + "/", { recursive: true }));
  console.info(`Cleaned: ${dirs.join(", ")}`);
}
catch (e) {
  console.warn(e);
}
