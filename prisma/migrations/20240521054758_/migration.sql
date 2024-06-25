-- CreateTable
CREATE TABLE "GoingAwayForm" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "DepartureDate" TIMESTAMP(3) NOT NULL,
    "ReturnDate" TIMESTAMP(3) NOT NULL,
    "GoingFormFilled" BOOLEAN NOT NULL,
    "FullName" TEXT NOT NULL,
    "StudentId" INTEGER NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Purpose" TEXT NOT NULL,

    CONSTRAINT "GoingAwayForm_pkey" PRIMARY KEY ("id")
);
