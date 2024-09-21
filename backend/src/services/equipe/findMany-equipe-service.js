import db from "../../lib/db.js";

export default class FindManyEquipeService {
  async execute() {
    const equipes = await db.equipe.findMany({
      include: { evento: true },
      orderBy: {
        nomeEquipe: "asc",
      },
    });

    return equipes;
  }
}
