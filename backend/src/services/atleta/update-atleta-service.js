import db from "../../lib/db.js";

export default class UpdateAtletaService {
    async execute({ id, idEquipe, idPosicao, nomeAtleta, CPF, RG, idade, contato, dataNascimento, observacaoJogador }) {
        const atleta = await db.atleta.update({
            where: {
                id,
            },
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
