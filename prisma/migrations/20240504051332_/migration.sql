-- CreateTable
CREATE TABLE "CulturalEvent" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "signedUp" BOOLEAN NOT NULL,

    CONSTRAINT "CulturalEvent_pkey" PRIMARY KEY ("id")
);
