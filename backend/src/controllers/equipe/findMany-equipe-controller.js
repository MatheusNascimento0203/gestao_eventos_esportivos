import FindManyEquipeService from "../../services/equipe/findMany-equipe-service.js";

export default class FindManyEquipeController {
  async handle(req, reply) {
    const service = new FindManyEquipeService();
    const equipes = await service.execute();
    // Função para transformar BigInt em string
    const serializeBigInt = (obj) => {
      return JSON.parse(
        JSON.stringify(obj, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
    };

    // Serializar o resultado antes de enviar
    const serializedEquipes = serializeBigInt(equipes);

    return reply.status(200).send(serializedEquipes);
  }
}
