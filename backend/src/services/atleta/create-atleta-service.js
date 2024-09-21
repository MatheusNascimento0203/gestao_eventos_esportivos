import db from "../../lib/db.js";

export default class CreateAtletaService {
  async execute({
    idEquipe,
    idPosicao,
    nomeAtleta,
    CPF,
    RG,
    idade,
    contato,
    dataNascimento,
    observacaoJogador,
  }) {
    const atleta = await db.atleta.create({
      data: {
        idEquipe,
        idPosicao,
        nomeAtleta,
        CPF,
        RG,
        idade,
        contato,
        dataNascimento,
        observacaoJogador,
      },
    });
    return atleta;
  }
}
