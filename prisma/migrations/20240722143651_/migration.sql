/*
  Warnings:

  - Added the required column `time` to the `KeyProgramDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KeyProgramDate" ADD COLUMN     "time" TEXT NOT NULL;
