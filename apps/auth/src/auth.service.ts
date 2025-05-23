import { Injectable } from '@nestjs/common';
import { User } from './users/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { sesClient } from 'apps/notification/src/ses.config';
import { IdentityType, ListIdentitiesCommand, VerifyEmailIdentityCommand } from '@aws-sdk/client-ses';

interface TokenPayload {
  userId: string
}

@Injectable()
export class AuthService { // in login here, we set the token in the cookie of the response header
  
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ){}
  
  getHello(): string {
    return 'Hello World!';
  }

  async login(user: User, response: Response) {

    const { email, password } = user;

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString()
    }

    const expires = new Date()

    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const token = this.jwtService.sign(tokenPayload)

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires 
    })

  }

}



