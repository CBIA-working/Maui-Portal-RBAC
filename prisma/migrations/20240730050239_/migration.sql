/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `Faq` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Faq" DROP COLUMN "sortOrder",
ADD COLUMN     "order" INTEGER;
