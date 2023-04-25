import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  getRecipes(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getRecipeById(id: number): Promise<Recipe> {
    return this.prisma.recipe.findFirst({
      where: {
        id,
      },
    });
  }

  createRecipe(userId: number, dto: CreateRecipeDto): Promise<Recipe> {
    if (!userId)
      throw new ForbiddenException('You are not allowed to create a recipe');

    const recipe = this.prisma.recipe.create({
      data: {
        ...dto,
      },
    });
    return recipe;
  }

  async updateRecipe(
    userId: number,
    recipeId: number,
    dto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe || !userId)
      throw new ForbiddenException('You are not allowed to update this recipe');

    return this.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteRecipeById(userId: number, recipeId: number): Promise<void> {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe || !userId)
      throw new ForbiddenException('You are not allowed to delete this recipe');

    await this.prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
  }
}
