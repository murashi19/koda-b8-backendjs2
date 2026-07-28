import * as noteModel from "../models/notes.model.js";

export async function getAllNotes() {
  return await noteModel.getAllNotes();
}
