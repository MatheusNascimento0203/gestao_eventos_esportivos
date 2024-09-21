//RESPONSÁVEL PELA CRIAÇÃO DO SERVIDOR
import fastify from "fastify";
import userRouter from "./src/routers/user-router.js";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import GenericError from "./src/errors/generic-error.js";
import { fastifyJwt } from "@fastify/jwt";
import dotenv from "dotenv";
import eventoRouter from "./src/routers/evento-router.js";
import equipeRouter from "./src/routers/equipe-routes.js";
import posicaoAtletaRouter from "./src/routers/posicaoAtleta-router.js";
import atletaRouter from "./src/routers/atleta-router.js";

dotenv.config();

//INICIANDO O APP
const app = fastify();

//REGISTRANDO E UTILIZANDO JWT
app.register(fastifyJwt, {
  secret: process.env.SECRET,
});

//TRATAMENTO DE ERROS
app.setErrorHandler((error, req, reply) => {
  console.log(error);

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
app.register(eventoRouter);
app.register(equipeRouter);
app.register(posicaoAtletaRouter);
app.register(atletaRouter);
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
