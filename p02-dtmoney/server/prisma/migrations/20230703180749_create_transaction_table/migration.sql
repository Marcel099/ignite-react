-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "type" VARCHAR(8) NOT NULL,
    "category" VARCHAR(32) NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
