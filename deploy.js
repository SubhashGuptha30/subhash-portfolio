import { execSync } from "child_process";
import { rmSync } from "fs";
import { join } from "path";

const distPath = join(process.cwd(), "dist");

try {
  // 1. Delete the dist directory
  console.log("Removing old dist directory...");
  rmSync(distPath, { recursive: true, force: true });
  console.log("Old dist directory removed.");

  // 2. Run the build command
  console.log("Building the project...");
  execSync("npm run build:domain", { stdio: "inherit" });
  console.log("Project built successfully.");

  // 3. Add the dist directory to git
  console.log("Adding dist directory to git...");
  execSync("git add -f dist", { stdio: "inherit" });
  console.log("dist directory added.");

  // 4. Commit the changes
  console.log("Committing changes...");
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: "inherit" });
  console.log("Changes committed.");

  // 5. Push the dist directory to the gh-pages branch
  console.log("Pushing to gh-pages...");
  execSync("git subtree push --prefix dist origin gh-pages", {
    stdio: "inherit",
  });
  console.log("Deployment successful!");
} catch (error) {
  console.error("Deployment failed:", error);
  process.exit(1);
}
