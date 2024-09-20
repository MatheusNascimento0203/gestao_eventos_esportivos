-- CreateTable
CREATE TABLE "evento" (
    "id" SERIAL NOT NULL,
    "nomeEvento" VARCHAR(100) NOT NULL,
    "local" VARCHAR(100) NOT NULL,
    "quantidadeEquipes" SMALLINT NOT NULL,
    "tipoEvento" VARCHAR(30) NOT NULL,
    "dataInicial" DATE NOT NULL,
    "dataFinal" DATE NOT NULL,
    "horarioInicioEvento" TIME NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipe" (
    "id" SERIAL NOT NULL,
    "idEvento" INTEGER NOT NULL,
    "quantidadeAtletas" SMALLINT NOT NULL,
    "nomePresidente" VARCHAR(60) NOT NULL,
    "treinador" VARCHAR(60) NOT NULL,
    "quantidadeTitulos" SMALLINT NOT NULL,
    "nomeSede" VARCHAR(60) NOT NULL,
    "contato" BIGINT NOT NULL,
    "dataFundacao" DATE NOT NULL,
    "observacaoEquipe" VARCHAR(500) NOT NULL,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posicaoAtleta" (
    "id" SMALLSERIAL NOT NULL,
    "nomePosicao" VARCHAR(60) NOT NULL,

    CONSTRAINT "posicaoAtleta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atleta" (
    "id" SERIAL NOT NULL,
    "idEquipe" INTEGER NOT NULL,
    "idPosicao" INTEGER NOT NULL,
    "CPF" BIGINT NOT NULL,
    "RG" VARCHAR(20) NOT NULL,
    "idade" SMALLINT NOT NULL,
    "contato" BIGINT NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "observacaoJogador" VARCHAR(500) NOT NULL,

    CONSTRAINT "atleta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipe" ADD CONSTRAINT "equipe_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atleta" ADD CONSTRAINT "atleta_idEquipe_fkey" FOREIGN KEY ("idEquipe") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atleta" ADD CONSTRAINT "atleta_idPosicao_fkey" FOREIGN KEY ("idPosicao") REFERENCES "posicaoAtleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
