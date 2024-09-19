import db from "../../lib/db.js";

export default class FindManyUserService {
  async execute() {
    const users = db.usuario.findMany({
      orderBy: { dataCadastro: "desc" },
    });
    return users;
  }
}
