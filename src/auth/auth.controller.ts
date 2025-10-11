import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AccessTokenDto } from './dtos/access-token.dto';
import { AuthenticatedUserDto } from './dtos/authenticated-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AccessTokenDto> {
    return this.authService.login(loginDto);
  }

  @Get('token')
  async validateToken(@Headers('authorization') authHeader: string): Promise<AuthenticatedUserDto> {
    const token = authHeader?.replace('Bearer ', '');
    return this.authService.validateToken(token);
  }
}