import { z } from "zod";
import UpdateEquipeService from "../../services/equipe/update-equipe-service.js";

export default class UpdateEquipeController {
    async handle(req, reply) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });
        const bodySchema = z.object({
            idEvento: z.number().int(),
            nomeEquipe: z.string().min(5).max(100),
            quantidadeAtletas: z.number().int().min(-32768).max(32767),
            nomePresidente: z.string().min(5).max(60),
            treinador: z.string().min(5).max(60),
            quantidadeTitulos: z.number().int().min(-32768).max(32767),
            nomeSede: z.string().min(5).max(60),
            contato: z.string().min(11).max(15),
            dataFundacao: z.preprocess((arg) => {
                if (typeof arg === "string") {
                    return new Date(arg);
                }
                return arg;
            }, z.date()),
            observacaoEquipe: z.string().min(5).max(500),
        });

        const data = bodySchema.parse(req.body);
        const { id } = paramsSchema.parse(req.params);
        const service = new UpdateEquipeService();
        await service.execute({ id, ...data });
        return reply.status(200).send("Equipe editada com sucesso!");
    }
}
