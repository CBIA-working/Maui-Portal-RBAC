/*
  Warnings:

  - You are about to drop the column `userId` on the `AdminUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CulturalEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GoingAwayForm` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PasswordResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `viewAccomodation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminUser" DROP CONSTRAINT "AdminUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "GoingAwayForm" DROP CONSTRAINT "GoingAwayForm_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "viewAccomodation" DROP CONSTRAINT "viewAccomodation_userId_fkey";

-- AlterTable
ALTER TABLE "AdminUser" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "CulturalEvent" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "GoingAwayForm" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "viewAccomodation" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_QuestionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GoingAwayFormToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_viewAccomodationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PasswordResetTokenToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AdminUserTokenToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FileToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToUser_AB_unique" ON "_QuestionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToUser_B_index" ON "_QuestionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GoingAwayFormToUser_AB_unique" ON "_GoingAwayFormToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GoingAwayFormToUser_B_index" ON "_GoingAwayFormToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_viewAccomodationToUser_AB_unique" ON "_viewAccomodationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_viewAccomodationToUser_B_index" ON "_viewAccomodationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PasswordResetTokenToUser_AB_unique" ON "_PasswordResetTokenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PasswordResetTokenToUser_B_index" ON "_PasswordResetTokenToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminUserTokenToUser_AB_unique" ON "_AdminUserTokenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminUserTokenToUser_B_index" ON "_AdminUserTokenToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FileToUser_AB_unique" ON "_FileToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToUser_B_index" ON "_FileToUser"("B");

-- AddForeignKey
ALTER TABLE "_QuestionToUser" ADD CONSTRAINT "_QuestionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToUser" ADD CONSTRAINT "_QuestionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoingAwayFormToUser" ADD CONSTRAINT "_GoingAwayFormToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GoingAwayForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoingAwayFormToUser" ADD CONSTRAINT "_GoingAwayFormToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_viewAccomodationToUser" ADD CONSTRAINT "_viewAccomodationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_viewAccomodationToUser" ADD CONSTRAINT "_viewAccomodationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "viewAccomodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PasswordResetTokenToUser" ADD CONSTRAINT "_PasswordResetTokenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PasswordResetToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PasswordResetTokenToUser" ADD CONSTRAINT "_PasswordResetTokenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminUserTokenToUser" ADD CONSTRAINT "_AdminUserTokenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminUserTokenToUser" ADD CONSTRAINT "_AdminUserTokenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToUser" ADD CONSTRAINT "_FileToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToUser" ADD CONSTRAINT "_FileToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
