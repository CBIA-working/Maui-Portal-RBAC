/*
  Warnings:

  - You are about to drop the column `signedUp` on the `StudentEvents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentEvents" DROP COLUMN "signedUp";

-- CreateTable
CREATE TABLE "StudentAccomodation" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "accomodationId" INTEGER NOT NULL,

    CONSTRAINT "StudentAccomodation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentAccomodation" ADD CONSTRAINT "StudentAccomodation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAccomodation" ADD CONSTRAINT "StudentAccomodation_accomodationId_fkey" FOREIGN KEY ("accomodationId") REFERENCES "viewAccomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
