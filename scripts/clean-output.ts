import { rm } from "node:fs/promises";

const public_path = "./.output/public/";

const dirs = ["assets"];

for (const d of dirs) {
  await rm(public_path + d + "/", { recursive: true, force: true });
}

console.info(`Cleaned: ${dirs.join(", ")}`);
