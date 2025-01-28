/*
  Warnings:

  - Added the required column `type` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApiError" AS ENUM ('DNS', 'STATUS', 'TIMEOUT');

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "resolved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "screenshot" TEXT,
ADD COLUMN     "type" "ApiError" NOT NULL;
