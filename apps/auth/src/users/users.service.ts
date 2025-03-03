import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { CreateUserRequest } from "./dtos/create-user-request";
import { UsersRepositry } from "./users.repositry";
import { User, UserSchema } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt'
import { throwError } from "rxjs";

@Injectable()
export class UsersService {

    constructor(private usersRespositry: UsersRepositry){}

    async createUser (request: CreateUserRequest) {

        await this.validateCreateUserRequest(request)

        const user = await this.usersRespositry.create({
            ...request,
            password: await bcrypt.hash(request.password, 10)
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


    async validateUser(email: string, password: string) {

        try{
            const user = await this.usersRespositry.findOne({ email })

            const passwordIsValid = await bcrypt.compare(password, user.password)

            if(!passwordIsValid){
                throw new UnauthorizedException('Credentials are not valid')
            }

            // const { passwor, ...rest } = user

            return user

        }catch(err){

        }

    }


    async getUser(getUserArgs: Partial<User>) {
        return await this.usersRespositry.findOne({ getUserArgs })
    }

}