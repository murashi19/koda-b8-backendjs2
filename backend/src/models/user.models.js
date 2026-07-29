import { read } from "node:fs";
import { readData, writeData } from "../lib/storage.js";

const filepath = "users.json";

export default class UserModel {
  static async getAll() {
    return await readData(filepath);
  }

  static async getById(id) {
    const users = await readData(filepath);
    return users.find((u) => u.id == parseInt(id));
  }

  static async getByEmail(email) {
    const users = await readData(filepath);
    return users.find((u) => u.email == email);
  }

  static async create(data) {
    const users = await readData(filepath);

    let lastId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newUser = {
      id: lastId + 1,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };
    users.push(newUser);
    await writeData(filepath, users);
    return newUser;
  }

  static async update(id, data) {
    const users = await readData(filepath);
    const user = users.find((u) => u.id == parseInt(id));
    if (user) {
      ((user.name = data.name || user.name),
        (user.email = data.email || user.email),
        (user.password = data.password || user.password),
        (user.phone = data.phone || user.phone));
      await writeData(filepath, users);
    }
    return user;
  }

  static async delete(id) {
    const users = await readData(filepath);
    const index = users.findIndex((u) => u.id == parseInt(id));
    if (index != -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }
}
