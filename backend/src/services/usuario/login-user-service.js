import pkg from "bcryptjs";
const { compareSync } = pkg;
import GenericError from "../../errors/generic-error.js";
import db from "../../lib/db.js";

export default class LoginUserService {
  async execute({ email, senha }) {
    const user = await db.usuario.findUnique({ where: { email } });
    if (!user) {
      throw new GenericError(404, "Usuário ou senha estão incorretos. ");
    }

    const compararSenha = compareSync(senha, user.senha);
    if (!compararSenha) {
      throw new GenericError(404, "Usuário ou senha estão incorretos.");
    }

    return user;
  }
}
