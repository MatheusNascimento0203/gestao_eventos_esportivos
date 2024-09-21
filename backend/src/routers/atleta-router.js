import CreateAtletaController from "../controllers/atleta/create-atleta-controller.js";
import FindManyAtletaController from "../controllers/atleta/findMany-atleta-controller.js";
import isAutenticate from "../middlewares/isAutenticate.js";

export default async function atletaRouter(app) {
  const createAtletaController = new CreateAtletaController();
  app.post(
    "/cadastrarAtleta",
    {
      preHandler: isAutenticate,
    },
    async (req, reply) => {
      await createAtletaController.handle(req, reply);
    }
  );
  const findManyAtletaControler = new FindManyAtletaController();
  app.get(
    "/findManyAtletas",
    {
      preHandler: isAutenticate,
    },
    async (req, reply) => {
      await findManyAtletaControler.handle(req, reply);
    }
  );
}
