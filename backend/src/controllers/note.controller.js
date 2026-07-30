import noteModel from "../models/notes.model.js";
import { constants } from "node:http2";

export async function getAllNotes(req, res) {
  const notes = await noteModel.getAllNotes();

  return res.json({
    success: true,
    message: "Lists Notes",
    data: notes,
  });
}

export async function createNotes(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!title || !content) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: true,
      message: "The field cannot be empty ",
    });
  }
  const newNote = await noteModel.create({
    userId: userId,
    title: title,
    content: content,
  });
  res.status(constants.HTTP_STATUS_CREATED).json({
    success: true,
    mesage: "Note berhasil ditambahkan",
    result: newNote,
  });
}

export async function updateNotes(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const updateNote = await noteModel.update(id, userId, req.body);
  if (!updateNote)
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      message: "Note not found",
    });
  res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "Note berhasil di update",
    result: updateNote,
  });
}

export const destroy = async (req, res) => {
  const id = req.params.id;
  const note = await noteModel.delete(id);
  if (!note)
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      message: "Note not found",
    });
  res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "Note Berhasil dihapus",
    result: note,
  });
};
