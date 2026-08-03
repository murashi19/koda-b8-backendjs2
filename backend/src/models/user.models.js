import db from "../lib/db.js";
export default class UserModel {
  static async getAll() {
    const { rows } = await db.query(`
      SELECT * FROM users ORDER BY id ASC`);
    return rows;
  }

  static async getById(id) {
    const { rows } = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return rows[0];
  }

  static async getByEmail(email) {
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return rows[0];
  }

  static async create(data) {
    const { rows } = await db.query(
      `INSERT INTO users (name, email, password, phone) VALUES
      ($1, $2, $3, $4) RETURNING *
      `,
      [data.name, data.email, data.password, data.phone],
    );
    return rows[0];
  }

  static async update(id, data) {
    const { rows } = await db.query(
      `
      UPDATE users
      SET
          name = $1,
          email = $2,
          password = $3,
          phone = $4
      WHERE id = $5
      RETURNING *
      `,
      [data.name, data.email, data.password, data.phone, id],
    );

    return rows[0];
  }

  static async delete(id) {
    const { rows } = await db.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    return rows[0];
  }
}
