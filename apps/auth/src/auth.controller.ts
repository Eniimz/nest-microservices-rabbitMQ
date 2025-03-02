import { Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '../current-user.decorator';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response //passsthrough: true => gives us the usual nestjs response structure
  ) {
    return this.authService.getHello();
  }
}
