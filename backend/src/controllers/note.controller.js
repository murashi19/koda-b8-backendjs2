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
  if (!title || !content) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: true,
      message: "The field cannot be empty ",
    });
  }
  const newNote = await noteModel.create({
    userId: req.user.id,
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
  const updateNote = await noteModel.update(
    req.params.id,
    req.user.id,
    req.body,
  );
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
  const note = await noteModel.delete(req.params.id, req.user.id);
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
