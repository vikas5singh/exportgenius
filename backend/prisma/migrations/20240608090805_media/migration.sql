/*
  Warnings:

  - Added the required column `scheduledDate` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledTime` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `media` ADD COLUMN `scheduledDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `scheduledTime` VARCHAR(191) NOT NULL;
