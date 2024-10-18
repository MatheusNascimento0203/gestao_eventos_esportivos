import CreateAtletaController from "../controllers/atleta/create-atleta-controller.js";
import DeleteAtletaController from "../controllers/atleta/delete-atleta-controller.js";
import FindAtletaController from "../controllers/atleta/find-atleta-controller.js";
import FindManyAtletaController from "../controllers/atleta/findMany-atleta-controller.js";
import UpdateAtletaController from "../controllers/atleta/update-atleta-controller.js";
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

    const findAtletaController = new FindAtletaController();
    app.get(
        "/findAtleta/:id",
        {
            preHandler: isAutenticate,
        },

        async (req, reply) => {
            await findAtletaController.handle(req, reply);
        }
    );

    const deleteAtletaController = new DeleteAtletaController();
    app.delete(
        "/deleteAtleta/:id",
        {
            preHandler: isAutenticate,
        },

        async (req, reply) => {
            await deleteAtletaController.handle(req, reply);
        }
    );

    const updateAtletaController = new UpdateAtletaController();
    app.put(
        "/updateAtleta/:id",
        {
            preHandler: isAutenticate,
        },

        async (req, reply) => {
            await updateAtletaController.handle(req, reply);
        }
    );
}
