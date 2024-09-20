import CreateEventoController from "../controllers/evento/create-evento-controller.js";
import isAutenticate from "../middlewares/isAutenticate.js";

export default async function eventoRouter(app) {
  //ROTA PARA CRIAÇÃO DE USUÁRIO
  const createEventoController = new CreateEventoController();
  app.post(
    "/cadastrarEvento",
    { preHandler: isAutenticate },
    async (request, reply) => {
      await createEventoController.handle(request, reply);
    }
  );
}
