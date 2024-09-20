/*
  Warnings:

  - Added the required column `nomeEquipe` to the `equipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipe" ADD COLUMN     "nomeEquipe" VARCHAR(100) NOT NULL;
