/*
  Warnings:

  - Changed the type of `StudentId` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `PhoneNumber` on the `Trip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "StudentId",
ADD COLUMN     "StudentId" INTEGER NOT NULL,
DROP COLUMN "PhoneNumber",
ADD COLUMN     "PhoneNumber" INTEGER NOT NULL;
