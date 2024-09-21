import db from "../../lib/db.js";

export default class FindManyAtletaService {
  async execute() {
    const atletas = db.atleta.findMany({
      orderBy: {
        nomeAtleta: "asc",
      },
      include: { equipe: true, posicao: true },
    });
    console.log(atletas);

    return atletas;
  }
}
