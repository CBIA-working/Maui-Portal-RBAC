-- CreateTable
CREATE TABLE "Marker" (
    "id" SERIAL NOT NULL,
    "position" JSONB NOT NULL,
    "label" TEXT NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "Marker_pkey" PRIMARY KEY ("id")
);
