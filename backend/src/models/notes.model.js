import { readData } from "../lib/storage.js";

export async function getAllNotes() {
  return await readData();
}
