import { execSync } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { version } = require("./../package.json");


const tag = execSync(`git tag -l v${version}`).toString();
if (!tag) {
  console.log(`v${version}`);
  execSync("npm run changelog");
  execSync("git add .");
  execSync(`git commit -m "chore: release v${version}"`);
  execSync(`git tag v${version}`);
}
else {
  console.info("Tag already exists");
}
