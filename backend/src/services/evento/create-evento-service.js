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
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    const dataFormatada = dataAtual.toISOString().split("T")[0];
    const dataInicialFormatada = dataInicial.toISOString().split("T")[0];

    if (dataInicialFormatada < dataFormatada) {
      throw new GenericError(
        404,
        "A data inicial não pode ser menor que hoje."
      );
    }

    if (dataFinal < dataInicial) {
      throw new GenericError(
        404,
        "A data final deve ser maior que a data inicio."
      );
    }

    return evento;
  }
}
