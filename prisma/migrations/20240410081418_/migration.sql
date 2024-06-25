/*
  Warnings:

  - The primary key for the `PageData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PageData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[page]` on the table `PageData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PageData" DROP CONSTRAINT "PageData_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PageData_pkey" PRIMARY KEY ("page");

-- CreateIndex
CREATE UNIQUE INDEX "PageData_page_key" ON "PageData"("page");
