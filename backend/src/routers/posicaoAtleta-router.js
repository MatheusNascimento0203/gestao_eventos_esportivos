import CreatePosicaoAtletaController from "../controllers/posicaoAtleta/create-posicao-atleta-controller.js";
import FindManyPosicaoAtletaController from "../controllers/posicaoAtleta/findMany-posicaoAtleta-controller.js";
import isAutenticate from "../middlewares/isAutenticate.js";

export default async function posicaoAtletaRouter(app) {
  const createPosicaoAtletaController = new CreatePosicaoAtletaController();
  app.post(
    "/cadastrarPosicaoAtleta",
    {
      preHandle: isAutenticate,
    },

    async (req, reply) => {
      await createPosicaoAtletaController.handle(req, reply);
    }
  );

  const findManyPosicoesAtleta = new FindManyPosicaoAtletaController();
  app.get(
    "/findManyPosicoesAtleta",
    {
      preHandle: isAutenticate,
    },
    async (req, reply) => {
      await findManyPosicoesAtleta.handle(req, reply);
    }
  );
}
