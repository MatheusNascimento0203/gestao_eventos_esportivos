import { z } from "zod";
import FindEventoService from "../../services/evento/find-evento-service.js";

export default class FindEventoController {
  async handle(reply, req) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });
    const { id } = paramsSchema.parse(req.params);
    const service = new FindEventoService();
    const evento = await service.execute({ id });

    reply.status(200).send(
      evento.map((element) => ({
        ...element,
        horarioInicioEvento:
          element.horarioInicioEvento.toLocaleTimeString("pt-BR"),
      }))
    );
  }
}
