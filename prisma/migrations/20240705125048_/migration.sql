/*
  Warnings:

  - You are about to drop the `Student_Events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student_Events" DROP CONSTRAINT "Student_Events_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Student_Events" DROP CONSTRAINT "Student_Events_studentId_fkey";

-- DropTable
DROP TABLE "Student_Events";

-- CreateTable
CREATE TABLE "StudentEvents" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "signedUp" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StudentEvents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentEvents" ADD CONSTRAINT "StudentEvents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvents" ADD CONSTRAINT "StudentEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "CulturalEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
