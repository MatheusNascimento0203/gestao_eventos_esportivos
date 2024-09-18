import db from "../../lib/db.js";
import GenericError from "../../errors/generic-error.js";
import pkg from "bcryptjs";
const { hashSync } = pkg;

export default class CreateUserService {
  async execute({ nome, sobrenome, email, senha }) {
    const user = await db.usuario.findUnique({ where: { email } });
    if (user) {
      throw new GenericError(409, "Email- já existente.");
    }
    //CRIPTOGRAFANDO A SENHA
    const passwordHash = hashSync(senha, 8);

    await db.usuario.create({
      data: {
        nome,
        sobrenome,
        email,
        senha: passwordHash,
      },
    });
  }
}
