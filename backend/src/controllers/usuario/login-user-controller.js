import z from "zod";
import LoginUserService from "../../services/usuario/login-user-service.js";

export default class LoginUserController {
  async handle(req, reply, app) {
    const bodySchema = z.object({
      email: z.string().email(),
      senha: z.string().min(8).max(15),
    });

    const data = bodySchema.parse(req.body);
    const service = new LoginUserService();
    const user = await service.execute(data);
    const token = app.jwt.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "1d",
      }
    );
    return reply.status(200).send({ user, token });
  }
}
