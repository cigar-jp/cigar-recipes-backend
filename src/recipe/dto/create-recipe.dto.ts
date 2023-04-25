import { Genre } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nameKana: string;

  @IsString()
  @IsNotEmpty()
  genre: Genre;

  // @IsString()
  // @IsOptional()
  // ingredients: RecipeOnIngredients[];
}
