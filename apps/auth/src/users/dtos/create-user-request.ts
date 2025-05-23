import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../schemas/user.schema";


export class CreateUserRequest {

    @IsString()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsEnum(UserRole)
    @IsOptional()
    role ?: UserRole

}