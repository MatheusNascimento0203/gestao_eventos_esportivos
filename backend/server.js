//RESPONSÁVEL PELA CRIAÇÃO DO SERVIDOR
import fastify from "fastify";
import userRouter from "./src/routers/user-router.js";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import GenericError from "./src/errors/generic-error.js";
import { fastifyJwt } from "@fastify/jwt";

//INICIANDO O APP
const app = fastify();

//REGISTRANDO E UTILIZANDO JWT
app.register(fastifyJwt, {
  secret: process.env.SECRET,
});

console.log("Valor da SECRET:", process.env.SECRET);
//TRATAMENTO DE ERROS
app.setErrorHandler((error, req, reply) => {
  // console.log(error);

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.flatten().fieldErrors,
    });
  }

  if (error instanceof GenericError) {
    return reply.status(error.status).send({
      message: error.message,
    });
  }

  return reply.status(500).send({
    message: "Error do servidor.",
  });
});

//REGISTRANDO ROTAS
app.register(cors, { origin: "*" });
app.register(userRouter);

//CRIANDO O SERVIDOR
const startServer = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Servidor Iniciado");
  } catch (error) {
    console.log(error);
  }
};

startServer();

export default app;
