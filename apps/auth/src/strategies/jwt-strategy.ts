import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { prototype } from "events";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Types } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    protected logger = new Logger(JwtStrategy.name)


    constructor(
        configService: ConfigService,
        protected usersService: UsersService
    ){
        
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.Authentication
                }
            ]),
            secretOrKey: configService.get('JWT_SECRET')!
        })
    }

    async validate({ userId }: { userId: string }) { //called implicitly after token extraction and comparison

        this.logger.log("Now getting the user from the db through userId: ", userId)

        try{
            return await this.usersService.getUser({
                _id: new Types.ObjectId(userId)
            })
        }catch(err){
            throw new UnauthorizedException()
        }
    }
}