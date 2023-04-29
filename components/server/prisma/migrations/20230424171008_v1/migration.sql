-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "accountCreated" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniBrand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "MiniBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniBrandTag" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "MiniBrandTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniBrandType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "MiniBrandType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniBrandSeries" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "MiniBrandSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MiniBrandToMiniBrandTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MiniBrandToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MiniBrandTag_value_key" ON "MiniBrandTag"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MiniBrandType_value_key" ON "MiniBrandType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MiniBrandSeries_value_key" ON "MiniBrandSeries"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_MiniBrandToMiniBrandTag_AB_unique" ON "_MiniBrandToMiniBrandTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MiniBrandToMiniBrandTag_B_index" ON "_MiniBrandToMiniBrandTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MiniBrandToUser_AB_unique" ON "_MiniBrandToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MiniBrandToUser_B_index" ON "_MiniBrandToUser"("B");

-- AddForeignKey
ALTER TABLE "MiniBrand" ADD CONSTRAINT "MiniBrand_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MiniBrandType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniBrand" ADD CONSTRAINT "MiniBrand_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "MiniBrandSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiniBrandToMiniBrandTag" ADD CONSTRAINT "_MiniBrandToMiniBrandTag_A_fkey" FOREIGN KEY ("A") REFERENCES "MiniBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiniBrandToMiniBrandTag" ADD CONSTRAINT "_MiniBrandToMiniBrandTag_B_fkey" FOREIGN KEY ("B") REFERENCES "MiniBrandTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiniBrandToUser" ADD CONSTRAINT "_MiniBrandToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MiniBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiniBrandToUser" ADD CONSTRAINT "_MiniBrandToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
