-- CreateTable
CREATE TABLE "KeyProgramDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "KeyProgramDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentKeyProgramDate" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "keyProgramDateId" INTEGER NOT NULL,

    CONSTRAINT "StudentKeyProgramDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeyProgramDateToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KeyProgramDateToUser_AB_unique" ON "_KeyProgramDateToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KeyProgramDateToUser_B_index" ON "_KeyProgramDateToUser"("B");

-- AddForeignKey
ALTER TABLE "StudentKeyProgramDate" ADD CONSTRAINT "StudentKeyProgramDate_keyProgramDateId_fkey" FOREIGN KEY ("keyProgramDateId") REFERENCES "KeyProgramDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentKeyProgramDate" ADD CONSTRAINT "StudentKeyProgramDate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeyProgramDateToUser" ADD CONSTRAINT "_KeyProgramDateToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "KeyProgramDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeyProgramDateToUser" ADD CONSTRAINT "_KeyProgramDateToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
