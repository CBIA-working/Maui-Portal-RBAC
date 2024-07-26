/*
  Warnings:

  - You are about to drop the column `date` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Program` table. All the data in the column will be lost.
  - Added the required column `batch` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "time",
ADD COLUMN     "batch" TEXT NOT NULL;
