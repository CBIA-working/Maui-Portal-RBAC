/*
  Warnings:

  - Added the required column `page` to the `PageData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PageData" ADD COLUMN     "page" TEXT NOT NULL;
