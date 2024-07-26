-- CreateTable
CREATE TABLE "CourseProgram" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "ProgramId" INTEGER NOT NULL,

    CONSTRAINT "CourseProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseProgram" ADD CONSTRAINT "CourseProgram_ProgramId_fkey" FOREIGN KEY ("ProgramId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgram" ADD CONSTRAINT "CourseProgram_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
