export default async function isAutenticate(req, reply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    reply.code(401).send({ error: "Usuário não autorizado." });
  }
}
