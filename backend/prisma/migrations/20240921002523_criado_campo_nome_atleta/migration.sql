/*
  Warnings:

  - Added the required column `nomeAtleta` to the `atleta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atleta" ADD COLUMN     "nomeAtleta" VARCHAR(100) NOT NULL;
