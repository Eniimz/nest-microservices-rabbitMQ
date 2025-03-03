import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "@app/common";
import { UsersController } from "./users.controller";
import { UsersRepositry } from "./users.repositry";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: User.name,  schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepositry],
    exports: [UsersService, UsersRepositry]
    
})

export class UsersModule {}