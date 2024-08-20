/*
  Warnings:

  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdminUserTokenToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRoles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodGroup` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietaryPreference` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactName` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactNumber` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactRelation` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fname` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lname` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "_AdminUserTokenToUser" DROP CONSTRAINT "_AdminUserTokenToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminUserTokenToUser" DROP CONSTRAINT "_AdminUserTokenToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserRoles" DROP CONSTRAINT "_UserRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRoles" DROP CONSTRAINT "_UserRoles_B_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "dietaryPreference" TEXT NOT NULL,
ADD COLUMN     "dob" TEXT NOT NULL,
ADD COLUMN     "emergencyContactName" TEXT NOT NULL,
ADD COLUMN     "emergencyContactNumber" TEXT NOT NULL,
ADD COLUMN     "emergencyContactRelation" TEXT NOT NULL,
ADD COLUMN     "fname" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "lname" TEXT NOT NULL,
ADD COLUMN     "token" TEXT;

-- DropTable
DROP TABLE "AdminUser";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "_AdminUserTokenToUser";

-- DropTable
DROP TABLE "_UserRoles";
