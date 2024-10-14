import db from "../../lib/db.js";

export default class FindEquipeService {
    async execute({ id }) {
        const equipe = await db.equipe.findUnique({
            where: {
                id,
            },
            include: {
                evento: true,
            },
        });
        console.log(equipe);

        return equipe;
    }
}
