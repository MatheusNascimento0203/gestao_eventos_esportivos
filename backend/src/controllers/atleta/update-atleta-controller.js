import { z } from "zod";
import UpdateAtletaService from "../../services/atleta/update-atleta-service.js";

export default class UpdateAtletaController {
    async handle(req, reply) {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });
        const bodySchema = z.object({
            idEquipe: z.number().int(),
            idPosicao: z.number().int(),
            nomeAtleta: z.string().min(5).max(100),
            CPF: z.string().min(11, { message: "O campo CPF precisa de 11 dígitos." }).max(15),
            RG: z.string().min(5).max(20),
            idade: z.number().int(),
            contato: z.string().min(11).max(15),
            dataNascimento: z.preprocess((arg) => {
                if (typeof arg === "string") {
                    return new Date(arg);
                }
                return arg;
            }, z.date()),
            observacaoJogador: z.string().min(5).max(500),
        });
        const service = new UpdateAtletaService();
        const { id } = paramsSchema.parse(req.params);
        const atleta = bodySchema.parse(req.body);
        await service.execute({ id, ...atleta });
        reply.status(200).send("Atleta editado com sucesso.");
    }
}
