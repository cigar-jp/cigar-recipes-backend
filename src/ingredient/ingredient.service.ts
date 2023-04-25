import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ingredient } from '@prisma/client';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  getIngredients(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
