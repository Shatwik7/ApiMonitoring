-- CreateEnum
CREATE TYPE "Region" AS ENUM ('global', 'europe', 'americas', 'asia', 'oceania');

-- AlterTable
ALTER TABLE "API" ADD COLUMN     "lastCheck" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nextCheck" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "APICheck" ADD COLUMN     "region" "Region" NOT NULL DEFAULT 'global';

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "notifyByCall" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "API_nextCheck_idx" ON "API"("nextCheck");
