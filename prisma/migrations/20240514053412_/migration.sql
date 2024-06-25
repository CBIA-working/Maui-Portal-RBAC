-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "StudentId" INTEGER NOT NULL,
    "QuestionAsked" TEXT,
    "Date" TIMESTAMP(3) NOT NULL,
    "Answer" TEXT,
    "Solved" BOOLEAN NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
