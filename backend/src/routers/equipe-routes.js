import CreateEquipeController from "../controllers/equipe/create-equipe-controller.js";
import FindManyEquipeController from "../controllers/equipe/findMany-equipe-controller.js";
import isAutenticate from "../middlewares/isAutenticate.js";

export default async function equipeRouter(app) {
  //ROTA PARA CRIAÇÃO DA EQUIPE
  const createEquipeController = new CreateEquipeController();
  app.post(
    "/cadastrarEquipe",
    {
      preHandler: isAutenticate,
    },
    async (req, reply) => {
      await createEquipeController.handle(req, reply);
    }
  );

  const findManyEquipeController = new FindManyEquipeController();
  app.get(
    "/findEquipes",
    {
      preHandler: isAutenticate,
    },
    async (req, reply) => {
      await findManyEquipeController.handle(req, reply);
    }
  );
}
