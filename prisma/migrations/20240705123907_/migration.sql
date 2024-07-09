-- CreateTable
CREATE TABLE "Student_Events" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Student_Events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student_Events" ADD CONSTRAINT "Student_Events_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Events" ADD CONSTRAINT "Student_Events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "CulturalEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
