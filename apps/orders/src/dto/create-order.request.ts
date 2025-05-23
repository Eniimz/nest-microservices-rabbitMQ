import { 
    IsString, 
    IsArray, 
    IsNumber, 
    IsNotEmpty, 
    ValidateNested,
    IsOptional,
    IsEnum,
    IsPositive
  } from 'class-validator';
  import { OrderStatus } from '../types/order.types';
  
  export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;          
  
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number;         
  
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()          
    quantity: number;  
    
    @IsOptional()
    @IsString()
    driverId ?: string;
  }
  
  export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;        // Or get from JWT in service layer
  
    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in array
    items: OrderItemDto[]; // Array of ordered items
  
    @IsOptional()
    status : OrderStatus;  // Defaults to 'pending' (handled in schema)
  }