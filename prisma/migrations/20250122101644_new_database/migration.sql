/*
  Warnings:

  - You are about to drop the `postcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `postcategory` DROP FOREIGN KEY `postCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `postcategory` DROP FOREIGN KEY `postCategory_userId_fkey`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `postId` INTEGER NULL;

-- DropTable
DROP TABLE `postcategory`;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
