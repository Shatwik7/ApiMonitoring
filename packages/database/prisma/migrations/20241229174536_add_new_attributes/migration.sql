/*
  Warnings:

  - You are about to drop the column `severity` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH');

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_apiId_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_userId_fkey";

-- AlterTable
ALTER TABLE "API" ADD COLUMN     "lastLive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "live" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "method" "HttpMethod" NOT NULL DEFAULT 'GET';

-- AlterTable
ALTER TABLE "APICheck" ADD COLUMN     "live" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "severity";

-- DropTable
DROP TABLE "Alert";
