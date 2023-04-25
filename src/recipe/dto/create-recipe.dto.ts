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
  genre: 'meat' | 'fish' | 'salad';

  // @IsString()
  // @IsOptional()
  // ingredients: RecipeOnIngredients[];
}
