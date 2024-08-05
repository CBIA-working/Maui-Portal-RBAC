-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "PhoneNumber" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "OrientationFile" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "OrientationPdf" TEXT NOT NULL,

    CONSTRAINT "OrientationFile_pkey" PRIMARY KEY ("id")
);
