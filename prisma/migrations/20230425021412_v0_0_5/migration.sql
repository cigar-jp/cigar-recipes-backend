/*
  Warnings:

  - Changed the type of `genre` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('meat', 'fish', 'salad');

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "genre",
ADD COLUMN     "genre" "Genre" NOT NULL;
