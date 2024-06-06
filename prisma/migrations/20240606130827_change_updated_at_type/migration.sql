/*
  Warnings:

  - The `updated_at` column on the `Request` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);
