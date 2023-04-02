import { readdirSync, unlinkSync } from "fs";

const path = "./.output/public/_app/";
const regex = [/jeep-sqlite.*.js/, /web.*.js/];

const files = readdirSync(path).filter(f => regex.find(r => r.test(f)));
files.map(f => unlinkSync(path + f));

console.info(`Cleaned: ${files.join(", ")}`);
