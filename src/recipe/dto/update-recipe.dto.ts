import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nameKana: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  // @IsString()
  // @IsOptional()
  // ingredients: RecipeOnIngredients[];
}
