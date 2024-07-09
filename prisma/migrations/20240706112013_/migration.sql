/*
  Warnings:

  - Changed the type of `keyDates` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "keyDates",
ADD COLUMN     "keyDates" TIMESTAMP(3) NOT NULL;
