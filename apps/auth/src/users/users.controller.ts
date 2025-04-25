import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserRequest } from "./dtos/create-user-request";
import { UsersService } from "./users.service";

@Controller('auth/users')
export class UsersController {

    constructor(private usersService: UsersService){}
    
    @Post()
    async createUser (@Body() request: CreateUserRequest){
        return this.usersService.createUser(request)
    }

}