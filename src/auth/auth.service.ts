import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { AccessTokenDto } from './dtos/access-token.dto';
import { AuthenticatedUserDto } from './dtos/authenticated-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto): Promise<AccessTokenDto> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // For now, we'll do a simple password check (in production, use bcrypt)
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate simple token (in production, use JWT)
    const access_token = `user_${user.user_id}_${Date.now()}`;

    return {
      access_token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
        profile_picture: user.profile_picture,
      },
    };
  }

  async validateToken(token: string): Promise<AuthenticatedUserDto> {
    if (!token || !token.startsWith('user_')) {
      throw new UnauthorizedException('Invalid token');
    }

    // Extract user_id from token (simple implementation)
    const parts = token.split('_');
    if (parts.length < 2) {
      throw new UnauthorizedException('Invalid token');
    }

    const userId = parts[1];
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      profile_picture: user.profile_picture,
    };
  }
}