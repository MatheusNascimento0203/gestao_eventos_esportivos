import db from "../../lib/db.js";
import GenericError from "../../errors/generic-error.js";

export default class CreateEventoService {
  async execute({
    nomeEvento,
    local,
    quantidadeEquipes,
    tipoEvento,
    dataInicial,
    dataFinal,
    horarioInicioEvento,
  }) {
    const evento = await db.evento.create({
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

    if (dataFinal < dataInicial) {
      throw new GenericError("A data final deve ser maior que a data inicio.");
    }

    return evento;
  }
}
