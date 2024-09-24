import db from "../../lib/db.js";

export default class DeleteEventoService {
  async execute({ id }) {
    await db.evento.delete({
      where: {
        id,
      },
    });
  }
}
