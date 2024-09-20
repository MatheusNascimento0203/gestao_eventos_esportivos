import db from "../../lib/db.js";

export default class FindManyEquipeService {
  async execute() {
    const equipes = await db.equipe.findMany({
      orderBy: {
        nomeEquipe: "asc",
      },
    });
    console.log(equipes);

    return equipes;
  }
}
