import db from "../../lib/db.js";

export default class DeleteEquipeService {
  async execute({ id }) {
    await db.equipe.delete({
      where: {
        id,
      },
    });
  }
}
