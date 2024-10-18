import { z } from "zod";
import DeleteAtletaService from "../../services/atleta/delete-atleta-service.js";

export default class DeleteAtletaController {
    async handle(req, reply) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const service = new DeleteAtletaService();
        const { id } = paramsSchema.parse(req.params);
        await service.execute({ id });
        return reply.status(200).send("Atleta excluido com sucesso!");
    }
}
