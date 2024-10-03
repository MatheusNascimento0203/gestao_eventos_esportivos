import { z } from "zod";
import DeleteEquipeService from "../../services/equipe/delete-equipe-service.js";

export default class DeleteEquipeController {
  async handle(req, reply) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });
    const { id } = paramsSchema.parse(req.params);
    const service = new DeleteEquipeService();
    await service.execute({ id });
    return reply.status(200).send();
  }
}
