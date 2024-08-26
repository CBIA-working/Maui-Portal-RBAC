/*
  Warnings:

  - You are about to drop the column `AdminId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_AdminId_fkey";

-- DropIndex
DROP INDEX "Message_studentId_AdminId_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "AdminId",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "sender" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
