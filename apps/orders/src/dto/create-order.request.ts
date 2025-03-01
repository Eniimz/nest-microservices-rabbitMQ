import { IsNotEmpty, IsPhoneNumber, IsPositive, IsString } from "class-validator";


export class CreateOrderRequest {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsPositive()
    price: string

    @IsPhoneNumber()
    phoneNumber: string
}