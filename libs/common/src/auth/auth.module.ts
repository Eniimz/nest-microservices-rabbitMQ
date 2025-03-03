import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as cookieParser from 'cookie-parser'
import { jwtGuard } from "./jwt.guard";
import { RmqModule } from "../rmq/rmq.module";
import { AUTH_SERVICE } from "./services";


@Module({
    imports: [RmqModule.register({ name : AUTH_SERVICE })],
    providers: [],
    exports: [RmqModule]
})

export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*')
    }
}