/*
  Warnings:

  - You are about to alter the column `CPF` on the `atleta` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(15)`.
  - You are about to alter the column `contato` on the `atleta` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "atleta" ALTER COLUMN "CPF" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "contato" SET DATA TYPE VARCHAR(15);
