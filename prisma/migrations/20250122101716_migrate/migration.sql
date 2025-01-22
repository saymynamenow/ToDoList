/*
  Warnings:

  - You are about to drop the column `postId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_postId_fkey`;

-- DropIndex
DROP INDEX `category_postId_fkey` ON `category`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `postId`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
