/*
  Warnings:

  - You are about to drop the `RecipeOnIngredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeOnIngredients" DROP CONSTRAINT "RecipeOnIngredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeOnIngredients" DROP CONSTRAINT "RecipeOnIngredients_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredientIds" INTEGER[];

-- DropTable
DROP TABLE "RecipeOnIngredients";
