-- CreateTable
CREATE TABLE "AdminStudent" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "AdminId" INTEGER NOT NULL,

    CONSTRAINT "AdminStudent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminStudent" ADD CONSTRAINT "AdminStudent_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminStudent" ADD CONSTRAINT "AdminStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
