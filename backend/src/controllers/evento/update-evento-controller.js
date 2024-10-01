import { z } from "zod";
import UpdateEventoService from "../../services/evento/update-evento-service.js";

export default class UpdateEventoController {
  async handle(req, reply) {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    });
    const bodySchema = z.object({
      nomeEvento: z.string().min(5).max(100),
      local: z.string().min(5).max(100),
      quantidadeEquipes: z.number().int(),
      tipoEvento: z.string().min(5).max(30),
      dataInicial: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return new Date(arg);
        }
        return arg;
      }, z.date()),
      dataFinal: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return new Date(arg);
        }
        return arg;
      }, z.date()),
      horarioInicioEvento: z.coerce.date(),
    });
    const data = bodySchema.parse(req.body);
    const { id } = paramsSchema.parse(req.params);
    const service = new UpdateEventoService();
    await service.execute({ id, ...data });
    return reply.status(200).send();
  }
}
