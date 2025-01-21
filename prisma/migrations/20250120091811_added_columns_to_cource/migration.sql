/*
  Warnings:

  - Made the column `thumbnailUrl` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "duration" TEXT NOT NULL DEFAULT '6 months',
ADD COLUMN     "instructor" TEXT NOT NULL DEFAULT 'Harkirat Singh',
ALTER COLUMN "thumbnailUrl" SET NOT NULL;
