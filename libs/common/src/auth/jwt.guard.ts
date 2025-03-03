import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable, tap } from "rxjs";
import { AUTH_SERVICE } from "./services";
import { log } from "console";

export class jwtGuard implements CanActivate {
 
    constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy){
    }

    private logger = new Logger(jwtGuard.name)

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const authentication = this.getAuthentication(context)

        

        this.logger.log("Now validating the user...")
        return this.authClient.send('validate_user', {
            Authentication: authentication
        })
        .pipe(
            tap((res) => {
                this.logger.log("Received the res after validate_user: ", res)
                this.addUser(res, context)
            }
            ),
            catchError(() => {
                throw new UnauthorizedException()
            })
        )
        

        

    }
    

    getAuthentication(context: ExecutionContext) {
        
        let authentication: string | null = null

        if(context.getType() === 'http'){
            authentication = context.switchToHttp().getRequest().cookies?.Authentication
        }else if (context.getType() === 'rpc') {
            authentication = context.switchToRpc().getData().Authentication
        }

        this.logger.log("This is the authentication to be sent: ", authentication)  

        if(!authentication){
            throw new UnauthorizedException('Now value was proided for authentication')
        }

        return authentication
    }

    addUser(user: any, context: ExecutionContext) {

        if(context.getType() === 'rpc') {
            context.switchToRpc().getData().user = user
        } else if (context.getType() === 'http'){
            context.switchToHttp().getRequest().user = user
        }

    }

}