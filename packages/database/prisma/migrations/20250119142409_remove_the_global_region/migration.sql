/*
  Warnings:

  - The values [global] on the enum `Region` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Region_new" AS ENUM ('europe', 'americas', 'asia', 'oceania');
ALTER TABLE "APICheck" ALTER COLUMN "region" DROP DEFAULT;
ALTER TABLE "APICheck" ALTER COLUMN "region" TYPE "Region_new" USING ("region"::text::"Region_new");
ALTER TYPE "Region" RENAME TO "Region_old";
ALTER TYPE "Region_new" RENAME TO "Region";
DROP TYPE "Region_old";
COMMIT;

-- AlterTable
ALTER TABLE "APICheck" ALTER COLUMN "region" DROP DEFAULT;
