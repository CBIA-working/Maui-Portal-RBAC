-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "FullName" TEXT NOT NULL,
    "StudentId" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTasks" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "StudentTasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TasksToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TasksToUser_AB_unique" ON "_TasksToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TasksToUser_B_index" ON "_TasksToUser"("B");

-- AddForeignKey
ALTER TABLE "StudentTasks" ADD CONSTRAINT "StudentTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTasks" ADD CONSTRAINT "StudentTasks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TasksToUser" ADD CONSTRAINT "_TasksToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TasksToUser" ADD CONSTRAINT "_TasksToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
