import { Injectable } from '@nestjs/common';
import { User } from './users/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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

  login(user: User, response: Response) {

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



