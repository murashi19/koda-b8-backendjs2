import * as noteService from "../services/notes.service.js";

export async function getAllNotes(req, res) {
  const notes = await noteService.getAllNotes();

  res.json(notes);
}
