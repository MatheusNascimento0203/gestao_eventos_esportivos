import FindManyUserService from "../../services/usuario/findMany-user-service.js";

export default class FindManyUserController {
  async handle(req, reply) {
    const service = new FindManyUserService();
    const users = await service.execute();
    return reply.status(200).send(users);
  }
}
