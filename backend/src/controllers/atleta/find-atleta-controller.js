import { z } from "zod";
import FindAtletaService from "../../services/atleta/find-atleta-service.js";

export default class FindAtletaController {
    async handle(req, reply) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const { id } = paramsSchema.parse(req.params);
        const service = new FindAtletaService();
        const atleta = await service.execute({ id });

        if (!atleta) {
            return reply.status(404).send("Atleta não encontrado!");
        }

        return reply.status(200).send({
            ...atleta,
        });
    }
}
