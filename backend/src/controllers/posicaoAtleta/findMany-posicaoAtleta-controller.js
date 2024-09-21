import FindManyPosicaoAtletaService from "../../services/posicaoAtleta/findMany-posicaoAtleta-service.js";

export default class FindManyPosicaoAtletaController {
  async handle(req, reply) {
    const service = new FindManyPosicaoAtletaService();
    const posicoesAtleta = await service.execute();
    return reply.status(200).send(posicoesAtleta);
  }
}
