import db from "../../lib/db.js";

export default class DeleteAtletaService {
    async execute({ id }) {
        await db.atleta.delete({
            where: {
                id,
            },
        });
    }
}
