import { Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '../current-user.decorator';
import { User } from './users/schemas/user.schema';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import JwtAuthGuard from './guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {

  protected logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //the checking if user exists and password validation is done through here
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response, //passthrough: true => gives us the usual nestjs response structure
    @Req() req: any,
  ) {
    this.logger.log("User logged in successfully: ", req.user)
    await this.authService.login(user, response);
    
    response.send(user)
  }

  @Get()
  testCheck(@Req() req: any) {
    try{
      this.logger.log("Auth controller is working: ", req.user)
      return "working in auth controller"
    } catch(err) {
        this.logger.log("Error in auth controller", err)
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    this.logger.log("Received the message, for validating, now validating")
    return user
  }
}
