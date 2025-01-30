/*
  Warnings:

  - A unique constraint covering the columns `[order,moduleId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order,courseId]` on the table `Module` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_moduleId_idx";

-- CreateIndex
CREATE INDEX "Lesson_order_idx" ON "Lesson"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_order_moduleId_key" ON "Lesson"("order", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_order_courseId_key" ON "Module"("order", "courseId");
