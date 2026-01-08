-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('electric', 'diesel', 'petrol');

-- CreateEnum
CREATE TYPE "BookingState" AS ENUM ('PICKED_UP', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Car" (
    "carId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "horsePower" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "carTypeId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

-- CreateTable
CREATE TABLE "CarType" (
    "typeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "CarType_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingId" SERIAL NOT NULL,
    "state" "BookingState" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "renterId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("bookingId")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType"("typeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;
