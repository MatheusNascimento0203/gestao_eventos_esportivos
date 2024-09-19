import CreateUserController from "../controllers/create-user-controller.js";
import FindManyUserController from "../controllers/usuario/findMany-user-controller.js";
import LoginUserController from "../controllers/usuario/login-user-controller.js";
import isAutenticate from "../middlewares/isAutenticate.js";

export default async function userRouter(app) {
  //ROTA PARA CRIAÇÃO DE USUÁRIO
  const createUserController = new CreateUserController();
  app.post("/user", async (request, reply) => {
    await createUserController.handle(request, reply);
  });
  //ROTA PARA LOGAR NO SISTEMA
  const loginUserController = new LoginUserController();
  app.post("/user/acess", async (request, reply) => {
    await loginUserController.handle(request, reply, app);
  });

  //ROTA PARA BUSCAR TODOS OS USUÁRIOS CADASTRADOS
  const findManyUserController = new FindManyUserController();
  app.get(
    "/user/findUsers",
    { preHandler: isAutenticate },
    async (request, reply) => {
      await findManyUserController.handle(request, reply);
    }
  );
}
