import db from "../../lib/db.js";

export default class FindManyPosicaoAtletaService {
  async execute() {
    const posicoesAtleta = db.posicaoAtleta.findMany({
      orderBy: { nomePosicao: "asc" },
    });
    return posicoesAtleta;
  }
}
