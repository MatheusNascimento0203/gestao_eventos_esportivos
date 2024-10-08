import db from "../../lib/db.js";

export default class FindEventoService {
  async execute({ id }) {
    const evento = db.evento.findUnique({
      where: {
        id,
      },
    });
    return evento;
  }
}
