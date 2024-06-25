/*
  Warnings:

  - You are about to drop the column `pdf` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "pdf",
ADD COLUMN     "image" TEXT;
