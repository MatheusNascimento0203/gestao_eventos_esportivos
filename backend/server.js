//RESPONSÁVEL PELA CRIAÇÃO DO SERVIDOR
import fastify from "fastify";
import userRouter from "./src/routers/user-router.js";
import cors from "@fastify/cors";

//INICIANDO O APP
const app = fastify();

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
