/*
  Warnings:

  - You are about to drop the column `DietaryPreference` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `EmergencyContactName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `EmergencyContactNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `EmergencyContactRelation` on the `User` table. All the data in the column will be lost.
  - Added the required column `dietaryPreference` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactRelation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "DietaryPreference",
DROP COLUMN "EmergencyContactName",
DROP COLUMN "EmergencyContactNumber",
DROP COLUMN "EmergencyContactRelation",
ADD COLUMN     "dietaryPreference" TEXT NOT NULL,
ADD COLUMN     "emergencyContactName" TEXT NOT NULL,
ADD COLUMN     "emergencyContactNumber" TEXT NOT NULL,
ADD COLUMN     "emergencyContactRelation" TEXT NOT NULL;
