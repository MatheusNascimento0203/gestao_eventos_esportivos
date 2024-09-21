import { z } from "zod";
import CreatePosicaoAtletaService from "../../services/posicaoAtleta/create-posicao-atleta-service.js";

export default class CreatePosicaoAtletaController {
  async handle(req, reply) {
    const bodySchema = z.object({
      nomePosicao: z.string().min(5).max(60),
    });
    const data = bodySchema.parse(req.body);
    const service = new CreatePosicaoAtletaService();
    await service.execute(data);
    return reply.status(201).send();
  }
}
