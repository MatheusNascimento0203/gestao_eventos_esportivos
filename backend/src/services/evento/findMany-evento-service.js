import db from "../../lib/db.js";

export default class FindManyEventoService {
  async execute() {
    const eventos = await db.evento.findMany({
      orderBy: { nomeEvento: "asc" },
    });
    return eventos;
  }
}
