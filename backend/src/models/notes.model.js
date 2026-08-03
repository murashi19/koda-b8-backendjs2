import db from "../lib/db.js";

export default class NoteModels {
  static async getAllNotes(userId) {
    const { rows } = await db.query(
      `SELECT id, user_id, title, content, is_pinned, is_archived, is_deleted, created_at, updated_at
      FROM notes
      WHERE user_id = $1 AND is_deleted = false
      ORDER BY id ASC`,
      [userId],
    );
    return rows;
  }

  static async create(data) {
    const { rows } = await db.query(
      `INSERT INTO notes (user_id, title, content, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [data.userId, data.title, data.content, data.createdAt, data.updatedAt],
    );
    return rows[0];
  }

  static async update(id, userId, data) {
    const { rows } = await db.query(
      `UPDATE notes
      SET
          title = COALESCE($1, title),
          content = COALESCE($2, content),
          is_pinned = COALESCE($3, is_pinned),
          is_archived = COALESCE($4, is_archived),
          is_deleted = COALESCE($5, is_deleted),
          updated_at = now()
      WHERE id = $6 AND user_id = $7
      RETURNING *
      `,
      [
        data.title,
        data.content,
        data.isPinned,
        data.isArchived,
        data.isDeleted,
        parseInt(id),
        userId,
      ],
    );
    return rows[0];
  }

  static async delete(id, userId) {
    const { rows } = await db.query(
      `UPDATE notes
      SET
          is_deleted = true,
          updated_at = now()
      WHERE id = $1 AND user_id = $2
      RETURNING *
      `,
      [parseInt(id), userId],
    );

    return rows[0];
  }
}
