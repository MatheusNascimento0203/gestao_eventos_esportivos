import GenericError from "../../errors/generic-error.js";
import db from "../../lib/db.js";

export default class CreateEquipeService {
  async execute({
    idEvento,
    nomeEquipe,
    quantidadeAtletas,
    nomePresidente,
    treinador,
    quantidadeTitulos,
    nomeSede,
    contato,
    dataFundacao,
    observacaoEquipe,
  }) {
    const equipe = await db.equipe.create({
      data: {
        idEvento,
        nomeEquipe,
        quantidadeAtletas,
        nomePresidente,
        treinador,
        quantidadeTitulos,
        nomeSede,
        contato,
        dataFundacao,
        observacaoEquipe,
      },
    });

    return equipe;
  }
}
