import z from "zod";
import CreateUserService from "../../services/usuario/create-user-service.js";

export default class CreateUserController {
  async handle(req, reply) {
    const bodySchema = z.object({
      nome: z.string().min(5).max(100),
      sobrenome: z.string().max(50),
      email: z.string().email(),
      senha: z
        .string()
        .min(8, { message: "O tamanho mínimo da senha precisa ser 8 dígitos." })
        .max(15, {
          message: "O tamanho máximo da senha precisa ser até 15 dígitos.",
        }),
    });
    const data = bodySchema.parse(req.body);
    const service = new CreateUserService();
    await service.execute(data);
    return reply.status(201).send();
  }
}
