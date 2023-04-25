import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getIngredients();
  }
}
