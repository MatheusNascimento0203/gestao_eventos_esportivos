import { z } from "zod";
import FindEventoService from "../../services/evento/find-evento-service.js";

export default class FindEventoController {
  async handle(req, reply) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });
    const { id } = paramsSchema.parse(req.params);
    const service = new FindEventoService();
    const evento = await service.execute({ id });

    if (!evento) {
      return reply.status(404).send({ error: "Evento não encontrado" });
    }

    reply.status(200).send({
      ...evento,
      horarioInicioEvento:
        evento.horarioInicioEvento.toLocaleTimeString("pt-BR"),
    });
  }
}
