import FindManyEventoService from "../../services/evento/findMany-evento-service.js";

export default class FindManyEventoController {
  async handle(req, reply) {
    const service = new FindManyEventoService();
    const eventos = await service.execute();

    return reply.status(200).send(
      eventos.map((element) => ({
        ...element,
        horarioInicioEvento:
          element.horarioInicioEvento.toLocaleTimeString("pt-BR"),
      }))
    );
  }
}
