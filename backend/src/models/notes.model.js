import { readData, writeData } from "../lib/storage.js";

const fileName = "notes.json";

export default class NoteModels {
  static async getAllNotes(userId) {
    const notes = await readData(fileName);
    return notes.filter((n) => !n.isDeleted && userId === n.userId);
  }

  static async create(data) {
    const notes = await readData(fileName);
    let lastId = notes.length > 0 ? Math.max(...notes.map((u) => u.id)) : 0;
    const newNote = {
      id: lastId + 1,
      userId: data.userId,
      title: data.title,
      content: data.content,
      isPinned: false,
      isArchived: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    await writeData(fileName, notes);
    return newNote;
  }

  static async update(id, userId, data) {
    const notes = await readData(fileName);
    const note = notes.find((u) => u.id == parseInt(id) && n.userId === userId);
    if (note) {
      ((note.title = data.title ?? note.title),
        (note.content = data.content ?? note.content),
        (note.isPinned = data.isPinned ?? note.isPinned),
        (note.isArchived = data.isArchived ?? note.isArchived),
        (note.isDeleted = data.isDeleted ?? note.isDeleted),
        (note.createdAt = data.createdAt ?? note.createdAt),
        (note.updatedAt = new Date().toISOString()));
      await writeData(fileName, notes);
    }
    return note;
  }

  static async delete(id, userId) {
    const notes = await readData(fileName);
    const index = notes.findIndex(
      (note) => note.id === parseInt(id) && n.userId === userId,
    );

    if (index === -1) {
      return null;
    }

    notes[index] = {
      ...notes[index],
      isDeleted: true,
      updatedAt: new Date().toISOString(),
    };

    await writeData(fileName, notes);

    return notes[index];
  }
}
