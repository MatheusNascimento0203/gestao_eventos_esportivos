import { object, z } from "zod";
import CreateEquipeService from "../../services/equipe/create-equipe-services.js";

export default class CreateEquipeController {
  async handle(req, reply) {
    const bodySchema = object({
      idEvento: z.number().int(),
      nomeEquipe: z.string().min(5).max(100),
      quantidadeAtletas: z.number().int().min(-32768).max(32767),
      nomePresidente: z.string().min(5).max(60),
      treinador: z.string().min(5).max(60),
      quantidadeTitulos: z.number().int().min(-32768).max(32767),
      nomeSede: z.string().min(5).max(60),
      contato: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return BigInt(arg);
        }
        return arg;
      }, z.bigint()),
      dataFundacao: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return new Date(arg);
        }
        return arg;
      }, z.date()),
      observacaoEquipe: z.string().min(5).max(500),
    });
    const data = bodySchema.parse(req.body);
    const service = new CreateEquipeService();
    await service.execute(data);
    return reply.status(201).send();
  }
}
