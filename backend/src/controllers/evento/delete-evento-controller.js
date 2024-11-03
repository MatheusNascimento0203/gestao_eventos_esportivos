import { z } from "zod";
import DeleteEventoService from "../../services/evento/delete-evento-service.js";

export default class DeleteEventoController {
    async handle(req, reply) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });
        const { id } = paramsSchema.parse(req.params);
        const service = new DeleteEventoService();
        try {
            await service.execute({ id });
            return reply.status(200).send();
        } catch (error) {
            if (error.message.includes("Existe uma equipe vinculada a este evento.")) {
                return reply.status(404).send({ error: error.message });
            }
        }
    }
}
