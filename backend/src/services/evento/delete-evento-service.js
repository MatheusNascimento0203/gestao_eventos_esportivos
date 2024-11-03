import GenericError from "../../errors/generic-error.js";
import db from "../../lib/db.js";

export default class DeleteEventoService {
    async execute({ id }) {
        const dependenteEquipe = await db.equipe.findMany({
            where: {
                idEvento: id,
            },
        });

        if (dependenteEquipe.length > 0) {
            throw new GenericError(404, "Existe uma equipe vinculada a este evento.");
        }

        await db.evento.delete({
            where: {
                id,
            },
        });
    }
}
