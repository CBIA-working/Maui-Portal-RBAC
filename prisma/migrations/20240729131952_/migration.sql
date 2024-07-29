/*
  Warnings:

  - You are about to drop the column `agreement` on the `viewAccomodation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "viewAccomodation" DROP COLUMN "agreement",
ADD COLUMN     "agreement1" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "agreement2" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "agreement3" BOOLEAN NOT NULL DEFAULT false;
