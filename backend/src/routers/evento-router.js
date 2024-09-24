import CreateEventoController from "../controllers/evento/create-evento-controller.js";
import DeleteEventoController from "../controllers/evento/delete-evento-controller.js";
import FindManyEventoController from "../controllers/evento/findMany-evento-controller.js";
import isAutenticate from "../middlewares/isAutenticate.js";

export default async function eventoRouter(app) {
  //ROTA PARA CRIAÇÃO DO EVENTO
  const createEventoController = new CreateEventoController();
  app.post(
    "/cadastrarEvento",
    { preHandler: isAutenticate },
    async (request, reply) => {
      await createEventoController.handle(request, reply);
    }
  );

  //ROTA PARA BUSCAR TODOS OS EVENTOS CADASTRADOS
  const findManyEventoController = new FindManyEventoController();
  app.get(
    "/findEventos",
    { preHandler: isAutenticate },
    async (request, reply) => {
      await findManyEventoController.handle(request, reply);
    }
  );

  //ROTA PARA APAGAR EVENTO
  const deleteEventoController = new DeleteEventoController();
  app.delete(
    "/deletarProduto/:id",
    {
      preHandler: isAutenticate,
    },
    async (request, reply) => {
      await deleteEventoController.handle(request, reply);
    }
  );
}
