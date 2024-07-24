/*
  Warnings:

  - Added the required column `sortOrder` to the `Faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faq" ADD COLUMN     "sortOrder" INTEGER NOT NULL;
