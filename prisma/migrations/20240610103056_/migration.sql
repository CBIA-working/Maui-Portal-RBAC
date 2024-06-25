/*
  Warnings:

  - Added the required column `GoingFormFilled` to the `GoingAwayForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoingAwayForm" ADD COLUMN     "GoingFormFilled" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "stream" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
