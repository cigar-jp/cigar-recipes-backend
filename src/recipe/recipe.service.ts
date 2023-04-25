import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Genre, Recipe } from '@prisma/client';

type FilterParams = {
  name?: string;
  nameKana?: string;
  genre?: Genre;
  price?: number;
  kcal?: number;
};

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  getRecipes(filters: FilterParams): Promise<Recipe[]> {
    // TODO: priceとkcalのフィルターを実装する
    const { name, nameKana, genre } = filters;
    // const { name, nameKana, genre, price, kcal } = filters;

    const recipes = this.prisma.recipe.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          nameKana ? { nameKana: { contains: nameKana } } : {},
          genre ? { genre: { equals: genre } } : {},
          // price ? { price: { lte: price } } : {},
          // kcal ? { kcal: { lte: kcal } } : {},
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return recipes;
  }

  getRecipeById(id: number): Promise<Recipe> {
    return this.prisma.recipe.findFirst({
      where: {
        id,
      },
    });
  }

  createRecipe(userId: number, dto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.prisma.recipe.create({
      data: {
        userId,
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

    if (!recipe || recipe.userId !== userId)
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

    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('You are not allowed to delete this recipe');

    await this.prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
  }
}
