// src/menu/dto/create-menu-item.dto.ts
import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;          // e.g., "Margherita Pizza"

  @IsNumber()
  @IsPositive()         // Ensures price > 0
  price: number;         // e.g., 10.99

  @IsBoolean()
  isAvailable : boolean; 

  @IsArray()
  @IsString({ each: true })
  tags : string[];      // e.g., ["vegetarian", "spicy"]
}   