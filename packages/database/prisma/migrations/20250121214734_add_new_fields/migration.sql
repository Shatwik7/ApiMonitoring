/*
  Warnings:

  - You are about to drop the column `description` on the `API` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "API" DROP COLUMN "description",
ADD COLUMN     "domainExpiration" BOOLEAN,
ADD COLUMN     "request_timeout" INTEGER,
ADD COLUMN     "sslExpiration" BOOLEAN,
ADD COLUMN     "statusCode" INTEGER;

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "statusCode" DROP NOT NULL;
