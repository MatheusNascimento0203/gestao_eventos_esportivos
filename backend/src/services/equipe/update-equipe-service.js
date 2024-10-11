import db from "../../lib/db.js";

export default class UpdateEquipeService {
    async execute({
        id,
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
        await db.equipe.update({
            where: {
                id,
            },
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
    }
}
