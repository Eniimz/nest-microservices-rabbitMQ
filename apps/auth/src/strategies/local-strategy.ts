import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UsersService } from "../users/users.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService){
        super({ usernameField: 'email' })
    }

    validate(email: string, password: string) {
        return this.usersService.validateUser(email, password)
    }

}