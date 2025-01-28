/*
  Warnings:

  - Added the required column `statusCode` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EMAIL', 'SMS', 'PUSH');

-- AlterTable
ALTER TABLE "API" ADD COLUMN     "notifyByCall" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifyByEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyBySMS" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "statusCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "type" "NotificationType" NOT NULL;
