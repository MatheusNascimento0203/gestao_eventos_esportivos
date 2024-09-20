import FindManyEventoService from "../../services/evento/findMany-evento-service.js";

export default class FindManyEventoController {
  async handle(req, reply) {
    const service = new FindManyEventoService();
    const eventos = await service.execute();
    console.log(eventos);

    return reply.status(200).send(eventos);
  }
}
