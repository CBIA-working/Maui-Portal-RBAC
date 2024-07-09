-- DropForeignKey
ALTER TABLE "CulturalEvent" DROP CONSTRAINT "CulturalEvent_userId_fkey";

-- CreateTable
CREATE TABLE "_CulturalEventToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CulturalEventToUser_AB_unique" ON "_CulturalEventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CulturalEventToUser_B_index" ON "_CulturalEventToUser"("B");

-- AddForeignKey
ALTER TABLE "_CulturalEventToUser" ADD CONSTRAINT "_CulturalEventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CulturalEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CulturalEventToUser" ADD CONSTRAINT "_CulturalEventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
