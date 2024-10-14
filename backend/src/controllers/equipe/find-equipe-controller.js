import { z } from "zod";
import FindEquipeService from "../../services/equipe/find-equipe-service.js";

export default class FindEquipeController {
    async handle(req, reply) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const service = new FindEquipeService();
        const { id } = paramsSchema.parse(req.params);
        const equipe = await service.execute({ id });

        console.log(equipe);

        if (!equipe) {
            return reply.status(404).send({ error: "Equipe não encontrada." });
        }

        return reply.status(200).send({
            ...equipe,
        });
    }
}
