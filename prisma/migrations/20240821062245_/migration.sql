/*
  Warnings:

  - Added the required column `pageName` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "pageName" TEXT NOT NULL;
