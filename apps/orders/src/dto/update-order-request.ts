import { IsNotEmpty, IsString } from "class-validator";

export class updateOrderRequest {

    @IsString()
    @IsNotEmpty()
    id: string

} 