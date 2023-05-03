/*
  Warnings:

  - You are about to drop the `_MiniBrandToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MiniBrandToUser" DROP CONSTRAINT "_MiniBrandToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MiniBrandToUser" DROP CONSTRAINT "_MiniBrandToUser_B_fkey";

-- DropTable
DROP TABLE "_MiniBrandToUser";

-- CreateTable
CREATE TABLE "CollectedMinibrand" (
    "id" SERIAL NOT NULL,
    "minibrandId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateCollected" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CollectedMinibrand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectedMinibrand_userId_minibrandId_key" ON "CollectedMinibrand"("userId", "minibrandId");

-- AddForeignKey
ALTER TABLE "CollectedMinibrand" ADD CONSTRAINT "CollectedMinibrand_minibrandId_fkey" FOREIGN KEY ("minibrandId") REFERENCES "MiniBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectedMinibrand" ADD CONSTRAINT "CollectedMinibrand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
