import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "out");

function buildApp() {
  execFileSync("npm", ["run", "build"], {
    cwd: projectRoot,
    stdio: "pipe",
    encoding: "utf8",
  });
}

function readOutFile(relativePath) {
  return readFileSync(path.join(outDir, relativePath), "utf8");
}

function readLocalizedPage(locale) {
  const candidates = [`${locale}.html`, path.join(locale, "index.html")];
  const match = candidates.find((candidate) => existsSync(path.join(outDir, candidate)));

  assert.ok(match, `Missing exported page for locale ${locale}`);

  return readOutFile(match);
}

test("static export includes localized home pages and a pt-BR root redirect", () => {
  buildApp();

  assert.match(readLocalizedPage("pt-BR"), /Servicos brasileiros na Australia/i);
  assert.match(readLocalizedPage("en"), /Brazilian services in Australia/i);
  assert.match(readLocalizedPage("es"), /Servicios brasileños en Australia/i);

  assert.match(readOutFile("index.html"), /\/pt-BR/);
});
