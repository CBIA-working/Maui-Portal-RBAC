-- CreateTable
CREATE TABLE "AdminRole" (
    "id" SERIAL NOT NULL,
    "RoleId" INTEGER NOT NULL,
    "AdminId" INTEGER NOT NULL,

    CONSTRAINT "AdminRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToAdmin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToAdmin_AB_unique" ON "_RoleToAdmin"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToAdmin_B_index" ON "_RoleToAdmin"("B");

-- AddForeignKey
ALTER TABLE "AdminRole" ADD CONSTRAINT "AdminRole_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminRole" ADD CONSTRAINT "AdminRole_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToAdmin" ADD CONSTRAINT "_RoleToAdmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToAdmin" ADD CONSTRAINT "_RoleToAdmin_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
