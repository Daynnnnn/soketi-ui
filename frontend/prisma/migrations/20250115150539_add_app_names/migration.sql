/*
  Warnings:

  - Added the required column `name` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "App_key_idx";

-- AlterTable
ALTER TABLE "App" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "App_name_idx" ON "App"("name");
