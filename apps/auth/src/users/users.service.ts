import { Injectable, Logger, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { CreateUserRequest } from "./dtos/create-user-request";
import { UsersRepositry } from "./users.repositry";
import { User, UserRole, UserSchema } from "./schemas/user.schema";
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor(private usersRespositry: UsersRepositry){}

    private readonly logger = new Logger(UsersService.name)

    async createUser (request: CreateUserRequest) {

        const userData  = {
            ...request,
            role: request.role ?? UserRole.CUSTOMER
        }

        this.logger.log('Creating user in the repository..')

        const user = await this.usersRespositry.create({
            ...userData,
            password: await bcryptjs.hash(request.password, 10)
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

            this.logger.log('Getting the user from the repository..')

            const user = await this.usersRespositry.findOne({ email })

            this.logger.log('User fetched from the repository', user)
            
            const passwordIsValid = await bcryptjs.compare(password, user.password)

            this.logger.log('Password validation result', passwordIsValid)

            if(!passwordIsValid){
                throw new UnauthorizedException('Credentials are not valid')
            }

            // const { passwor, ...rest } = user

            this.logger.log('User validated successfully', user)

            return user

        }catch(err){
            this.logger.log("Error in validating user", err)
        }

    }


    async getUser(getUserArgs: Partial<User>) {
        return await this.usersRespositry.findOne(getUserArgs)
    }

}