import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../../data");

function getFilePath(filename) {
  return path.join(filePath, filename);
}
export async function readData(filename) {
  try {
    const path = getFilePath(filename);
    const data = await fs.readFile(path, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeData(filename, data) {
  try {
    const path = getFilePath(filename);
    await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    throw new Error("Gagal menulis data ke file storage: " + error.message);
  }
}
