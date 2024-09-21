import FindManyAtletaService from "../../services/atleta/findMany-atleta-service.js";

export default class FindManyAtletaController {
  async handle(req, reply) {
    const service = new FindManyAtletaService();
    const atletas = await service.execute();
    console.log(atletas);

    return reply.status(200).send(atletas);
  }
}
