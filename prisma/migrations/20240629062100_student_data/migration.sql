/*
  Warnings:

  - You are about to drop the `Accomodation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accomodation" DROP CONSTRAINT "Accomodation_userId_fkey";

-- DropTable
DROP TABLE "Accomodation";

-- CreateTable
CREATE TABLE "viewAccomodation" (
    "id" SERIAL NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "buildingName" TIMESTAMP(3) NOT NULL,
    "floor" TEXT NOT NULL,
    "isSingleOccupancy" BOOLEAN NOT NULL,
    "numberOfRoommates" INTEGER NOT NULL,
    "roommateNames" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "viewAccomodation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "viewAccomodation" ADD CONSTRAINT "viewAccomodation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
