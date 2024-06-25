/*
  Warnings:

  - You are about to drop the column `GoingFormFilled` on the `GoingAwayForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoingAwayForm" DROP COLUMN "GoingFormFilled",
ALTER COLUMN "StudentId" SET DATA TYPE TEXT;
