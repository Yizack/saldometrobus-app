import { execSync } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { version } = require("./../package.json");

const tag = execSync(`git tag -l v${version}`).toString();
if (!tag) {
  console.info(`v${version}`);
  execSync("pnpm app:version");
  execSync("pnpm trapeze");
  console.info("Trapeze: updated native files");
  execSync("git add .");
  execSync(`git commit -m "chore(release): v${version}"`);
  console.info(`commit - "chore(release): v${version}"`);
  execSync(`git tag v${version}`);
  console.info(`tag - "v${version}"`);
}
else {
  console.info("Tag already exists");
}
