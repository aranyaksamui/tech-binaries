/*
  Warnings:

  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `image` VARCHAR(128) NOT NULL;
