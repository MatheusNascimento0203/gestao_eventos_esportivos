import z, { object } from "zod";
import dayjs from "dayjs";
import CreateEventoService from "../../services/evento/create-evento-service.js";

export default class CreateEventoController {
  async handle(req, reply) {
    const bodySchema = object({
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
      horarioInicioEvento: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return dayjs(arg, "HH:mm:ss").toDate();
        }
        return arg;
      }, z.date()),
    });
    const data = bodySchema.parse(req.body);
    const service = new CreateEventoService();
    await service.execute(data);
    return reply.status(201).send();
  }
}
