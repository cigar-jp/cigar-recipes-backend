import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  getRecipes(): Promise<Recipe[]> {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  getRecipeById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Recipe> {
    return this.recipeService.getRecipeById(id);
  }

  @Post()
  createRecipe(
    @Req() req: Request,
    @Body() dto: CreateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe(req.user.id, dto);
  }

  @Patch(':id')
  updateRecipe(
    @Req() req: Request,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.updateRecipe(req.user.id, recipeId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteRecipeById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) recipeId: number,
  ): Promise<void> {
    return this.recipeService.deleteRecipeById(req.user.id, recipeId);
  }
}
