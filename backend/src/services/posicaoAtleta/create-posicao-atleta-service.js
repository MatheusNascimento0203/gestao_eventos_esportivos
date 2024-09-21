import db from "../../lib/db.js";

export default class CreatePosicaoAtletaService {
  async execute({ nomePosicao }) {
    const posicaoAtleta = db.posicaoAtleta.create({
      data: {
        nomePosicao,
      },
    });
    return posicaoAtleta;
  }
}
