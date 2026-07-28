import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const notesPath = path.join(dirname, "../../data/notes.json");

export async function readData() {
  const data = await fs.readFile(notesPath, "utf-8");
  return JSON.parse(data);
}

export async function writeData(data) {
  await fs.writeFile(notesPath, JSON.stringify(data, null, 2), "utf-8");
}
