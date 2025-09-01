import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { BoilerplateUserDto } from './dtos/boilerplate-user.dto';

@Injectable()
export class BoilerplateService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getMethod(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async postMethod({ name, email }: BoilerplateUserDto): Promise<HttpStatus> {
    let user: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    user = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return HttpStatus.CREATED;
  }

  async deleteMethod(id: string): Promise<HttpStatus> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.delete({
      where: { id: id },
    });
    return HttpStatus.NO_CONTENT;
  }
}
