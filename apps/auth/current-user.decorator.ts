import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const getCurrentUserContext = (context: ExecutionContext) => {

    if(context.getType() === 'http'){
        return context.switchToHttp().getRequest().user
    }

    if(context.getType() === 'rpc'){
        return context.switchToRpc().getData().user
    }

}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserContext(context)
)