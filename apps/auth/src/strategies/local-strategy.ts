import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UsersService } from "../users/users.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService){
        super({ usernameField: 'email' })
    }

    private readonly logger = new Logger(LocalStrategy.name)

    validate(email: string, password: string) {
        
        this.logger.log(`Validating user with email: ${email} and password: ${password}`)
        return this.usersService.validateUser(email, password)
    }

}