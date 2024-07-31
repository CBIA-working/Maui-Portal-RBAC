-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "TripName" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "DepartureDate" TIMESTAMP(3) NOT NULL,
    "ReturnDate" TIMESTAMP(3) NOT NULL,
    "FullName" TEXT NOT NULL,
    "StudentId" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Purpose" TEXT NOT NULL,
    "GoingFormFilled" BOOLEAN NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTrip" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "StudentTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TripToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TripToUser_AB_unique" ON "_TripToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TripToUser_B_index" ON "_TripToUser"("B");

-- AddForeignKey
ALTER TABLE "StudentTrip" ADD CONSTRAINT "StudentTrip_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTrip" ADD CONSTRAINT "StudentTrip_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
