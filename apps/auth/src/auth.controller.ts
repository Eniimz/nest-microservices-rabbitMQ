import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '../current-user.decorator';
import { User } from './users/schemas/user.schema';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) //the checking if user exists and password validation is done throgh here
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response//passsthrough: true => gives us the usual nestjs response structure
  ) {
    return this.authService.login(user, response);
  }
}
