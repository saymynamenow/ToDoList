/*
  Warnings:

  - Added the required column `deadLine` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `deadLine` DATETIME(3) NOT NULL;
