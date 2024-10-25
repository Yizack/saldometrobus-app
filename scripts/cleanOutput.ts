import { readdirSync, unlinkSync, rmSync } from "fs";

const public_path = "./.output/public/";
const nuxt_path = public_path + "_app/";

const regex = [/jeep-sqlite.*.js/, /web.*.js/];

try {
  const files = readdirSync(nuxt_path).filter(f => regex.find(r => r.test(f)));
  files.map(f => unlinkSync(nuxt_path + f));

  const dirs = ["assets"];
  dirs.map(d => rmSync(public_path + d + "/", { recursive: true }));
  console.info(`Cleaned: ${files.join(", ") + ", " + dirs.join(", ")}`);
}
catch (e) {
  console.warn(e);
}
