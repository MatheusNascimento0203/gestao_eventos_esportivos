import z from "zod";
import CreateUserService from "../services/usuario/create-user-service.js";

export default class CreateUserController {
  async handle(req, res) {
    const bodySchema = z.object({
      nome: z.string().min(5).max(100),
      sobrenome: z.string().max(50),
      email: z.string().email(),
      senha: z.string().min(8).max(15),
    });
    const data = bodySchema.parse(req.body);
    const service = new CreateUserService();
    await service.execute(data);
    return res.status(201).send();
  }
}
