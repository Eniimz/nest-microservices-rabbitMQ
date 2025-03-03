import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RmqModule } from '@app/common/rmq/rmq.module';

@Module({
  imports: [
  
  ConfigModule.forRoot({  //for configuration of envs
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      JWT_SECRET: Joi.string().required(), // Add JWT_SECRET to validation schema
      JWT_EXPIRATION: Joi.string().required(),
    }),
    envFilePath: './apps/auth/.env'
  }),  
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => {
    const secret = configService.get<string>('JWT_SECRET');
    const expiration = configService.get<string>('JWT_EXPIRATION');

    console.log('JWT Secret:', secret); // Debugging: Log the secret
    console.log('JWT Expiration:', expiration); // Debugging: Log the expiration

      return {secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`
      }}
    },
    inject: [ConfigService]
  }),
  UsersModule, 
  DatabaseModule,
  RmqModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,   
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
