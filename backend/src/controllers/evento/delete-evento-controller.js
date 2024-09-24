import { z } from "zod";
import DeleteEventoService from "../../services/evento/delete-evento-service.js";

export default class DeleteEventoController {
  async handle(req, reply) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });
    const { id } = paramsSchema.parse(req.params);
    const service = new DeleteEventoService();
    await service.execute({ id });
    return reply.status(200).send();
  }
}
