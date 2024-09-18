-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sobrenome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "senha" VARCHAR(45) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);
