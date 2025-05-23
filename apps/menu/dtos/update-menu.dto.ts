// src/menu/dto/update-menu-item.dto.ts
import { 
    IsString, 
    IsNumber, 
    IsBoolean, 
    IsArray, 
    IsOptional, 
    IsPositive,
    MinLength,
    MaxLength,
    IsNotEmpty
  } from 'class-validator';
  import { PartialType } from '@nestjs/mapped-types';
  import { CreateMenuItemDto } from './menu.dto';
  
  export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
    // All fields inherited from CreateMenuItemDto are now optional
    // Additional custom validations can be added here
  
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsOptional()
    name?: string;
  
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
  
    @IsBoolean()
    @IsOptional()
    isAvailable?: boolean;
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
  }