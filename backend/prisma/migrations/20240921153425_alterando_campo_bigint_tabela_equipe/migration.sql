/*
  Warnings:

  - You are about to alter the column `contato` on the `equipe` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "equipe" ALTER COLUMN "contato" SET DATA TYPE VARCHAR(15);
