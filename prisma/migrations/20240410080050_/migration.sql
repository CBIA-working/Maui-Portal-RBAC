/*
  Warnings:

  - You are about to drop the `homePage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "homePage";

-- CreateTable
CREATE TABLE "PageData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PageData_pkey" PRIMARY KEY ("id")
);
