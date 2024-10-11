import GenericError from "../../errors/generic-error.js";
import db from "../../lib/db.js";

export default class UpdateEventoService {
    async execute({
        id,
        nomeEvento,
        local,
        quantidadeEquipes,
        tipoEvento,
        dataInicial,
        dataFinal,
        horarioInicioEvento,
    }) {
        await db.evento.update({
            where: {
                id,
            },
            data: {
                nomeEvento,
                local,
                quantidadeEquipes,
                tipoEvento,
                dataInicial,
                dataFinal,
                horarioInicioEvento,
            },
        });
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const dataFormatada = dataAtual.toISOString().split("T")[0];
        const dataInicialFormatada = dataInicial.toISOString().split("T")[0];

        if (dataInicialFormatada < dataFormatada) {
            throw new GenericError(404, "A data inicial não pode ser menor que hoje.");
        }

        if (dataFinal < dataInicial) {
            throw new GenericError(404, "A data final deve ser maior que a data inicio.");
        }
    }
}
