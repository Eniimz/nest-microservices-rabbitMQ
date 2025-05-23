import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../../enums/user-enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {} 
    //reflector is used to get the roles value from the controller

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user = req.user;
        
        console.log("The user obj in roles guard: ", user)

        if (!requiredRoles.includes(user.role)) {
            // ❌ Role not allowed → throw custom error
            throw new ForbiddenException(`Access denied: You need role(s): ${requiredRoles.join(', ')}`);
        }

        return true;
    }
}