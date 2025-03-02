import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
  ConfigModule.forRoot({  //for configuration of envs
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
    }),
    envFilePath: './apps/auth/.env'
  }),  
  UsersModule, 
  DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
