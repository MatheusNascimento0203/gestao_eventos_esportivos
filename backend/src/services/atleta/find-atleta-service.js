import db from "../../lib/db.js";

export default class FindAtletaService {
    async execute({ id }) {
        const atleta = await db.atleta.findUnique({
            where: {
                id,
            },
            include: {
                equipe: true,
                posicao: true,
            },
        });
        return atleta;
    }
}
