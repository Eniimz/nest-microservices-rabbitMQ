import { IsNotEmpty, IsString } from "class-validator";


export class CreateUserRequest {

    @IsString()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}