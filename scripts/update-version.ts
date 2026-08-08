import { writeFile } from "node:fs/promises";
import pkg from "../package.json" with { type: "json" };

const version = pkg.version;

const generateVersionCode = (v: string) => {
  const [major, minor, patch] = v.split(".");
  return parseInt(major ?? "0") * 1000000 + parseInt(minor ?? "0") * 1000 + parseInt(patch ?? "0");
};

await writeFile("config.yaml", `platforms:
  android:
    versionName: ${version}
    versionCode: ${generateVersionCode(version)}
`).catch((e) => {
  console.warn(e);
  process.exit(1);
});

console.info("config.yaml created");
