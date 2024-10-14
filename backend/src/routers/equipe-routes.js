import CreateEquipeController from "../controllers/equipe/create-equipe-controller.js";
import DeleteEquipeController from "../controllers/equipe/delete-equipe-controller.js";
import FindEquipeController from "../controllers/equipe/find-equipe-controller.js";
import FindManyEquipeController from "../controllers/equipe/findMany-equipe-controller.js";
import UpdateEquipeController from "../controllers/equipe/update-equipe-controller.js";
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

    const findEquipeController = new FindEquipeController();
    app.get(
        "/findEquipe/:id",
        {
            preHandler: isAutenticate,
        },
        async (req, reply) => {
            await findEquipeController.handle(req, reply);
        }
    );

    const deleteEquipeController = new DeleteEquipeController();
    app.delete(
        "/deletarEquipe/:id",
        {
            preHandler: isAutenticate,
        },
        async (req, reply) => {
            await deleteEquipeController.handle(req, reply);
        }
    );

    const updateEquipeController = new UpdateEquipeController();
    app.put(
        "/updateEquipe/:id",
        {
            preHandler: isAutenticate,
        },
        async (req, reply) => {
            await updateEquipeController.handle(req, reply);
        }
    );
}
