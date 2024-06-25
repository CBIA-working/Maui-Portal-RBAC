/*
  Warnings:

  - You are about to drop the column `image` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "image",
ADD COLUMN     "pdf" TEXT;
