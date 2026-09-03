/**
 * Package the plugin into an installable rssh zip.
 *
 * No build step: the plugin is one hand-written index.html plus the static
 * preview the manager shows. Zipping straight from source keeps this repo
 * dependency-free apart from jszip itself.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import JSZip from "jszip";

const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, "manifest.json"), "utf8"));

const zip = new JSZip();
zip.file("manifest.json", JSON.stringify(manifest, null, 2));
zip.file("index.html", readFileSync(join(root, "index.html"), "utf8"));
zip.file(manifest.preview, readFileSync(join(root, manifest.preview), "utf8"));

mkdirSync(join(root, "dist"), { recursive: true });
const out = join(root, "dist", `${manifest.id}-${manifest.version}.zip`);
const buf = await zip.generateAsync({
  type: "nodebuffer",
  compression: "DEFLATE",
  compressionOptions: { level: 9 },
});
writeFileSync(out, buf);
console.log(`${out} (${buf.length} bytes)`);
