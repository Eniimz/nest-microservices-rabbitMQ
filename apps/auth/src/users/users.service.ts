import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateUserRequest } from "./dtos/create-user-request";
import { UsersRepositry } from "./users.repositry";
import { User } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(private usersRespositry: UsersRepositry){}

    async createUser (request: CreateUserRequest) {

        await this.validateCreateUserRequest(request)

        const user = await this.usersRespositry.create({
            ...request,
            passowrd: await bcrypt.hash(request.password, 10)
        })

        return user

    }


    private async validateCreateUserRequest(request: CreateUserRequest) {
        
        let user: User | null = null;

        try{

            user = await this.usersRespositry.findOne({email: request.email})
        }catch(err){

        }

        if(user){
            throw new UnprocessableEntityException('Email already exists')
        }

    }

}