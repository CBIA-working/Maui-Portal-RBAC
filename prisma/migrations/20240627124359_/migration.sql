/*
  Warnings:

  - You are about to drop the `PageData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `AdminUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CulturalEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GoingAwayForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CulturalEvent" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GoingAwayForm" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PasswordResetToken" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PageData";

-- DropTable
DROP TABLE "Test";

-- AddForeignKey
ALTER TABLE "CulturalEvent" ADD CONSTRAINT "CulturalEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoingAwayForm" ADD CONSTRAINT "GoingAwayForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
