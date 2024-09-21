import { z } from "zod";
import CreateAtletaService from "../../services/atleta/create-atleta-service.js";

export default class CreateAtletaController {
  async handle(req, reply) {
    const bodySchema = z.object({
      idEquipe: z.number().int(),
      idPosicao: z.number().int(),
      nomeAtleta: z.string().min(5).max(100),
      CPF: z
        .string()
        .min(11, { message: "O campo CPF precisa de 11 dígitos." })
        .max(15),
      RG: z.string().min(5).max(20),
      idade: z.number().int(),
      contato: z.string().min(11).max(15),
      dataNascimento: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return new Date(arg);
        }
        return arg;
      }, z.date()),
      observacaoJogador: z.string().min(5).max(500),
    });
    const data = bodySchema.parse(req.body);
    const service = new CreateAtletaService();
    await service.execute(data);
    return reply.status(201).send();
  }
}
