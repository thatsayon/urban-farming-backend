/*
  Warnings:

  - Added the required column `description` to the `Produce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produce" ADD COLUMN     "certificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL;
