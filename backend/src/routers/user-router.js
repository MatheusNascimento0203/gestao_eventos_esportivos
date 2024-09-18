import CreateUserController from "../controllers/create-user-controller.js";

export default async function userRouter(app) {
  const createUserController = new CreateUserController();

  // Usando uma arrow function para garantir o contexto correto
  app.post("/user", async (request, reply) => {
    try {
      await createUserController.handle(request, reply);
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });
}
