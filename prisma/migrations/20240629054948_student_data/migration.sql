-- CreateTable
CREATE TABLE "Accomodation" (
    "id" SERIAL NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "buildingName" TIMESTAMP(3) NOT NULL,
    "floor" TEXT NOT NULL,
    "isSingleOccupancy" BOOLEAN NOT NULL,
    "numberOfRoommates" INTEGER NOT NULL,
    "roommateNames" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
