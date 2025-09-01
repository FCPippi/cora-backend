import { Test, TestingModule } from '@nestjs/testing';
import { BoilerplateService } from './boilerplate.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  mockTestBoilerplateUserDto,
  mockTestBoilerplateUsers,
} from './boilerplate-user.mock';

describe('BoilerplateService', () => {
  let service: BoilerplateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoilerplateService, PrismaService],
    }).compile();

    service = module.get<BoilerplateService>(BoilerplateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "Hello World!"', () => {
    const result = service.getHello();
    expect(result).toBe('Hello World!');
  });

  it('should return the MockUser', async () => {
    jest
      .spyOn(prisma.user, 'findMany')
      .mockResolvedValue(mockTestBoilerplateUsers);
    const result = await service.getMethod();
    expect(result).toEqual(mockTestBoilerplateUsers);
  });

  it('sould not find any user', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);

    try {
      await service.getMethod();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      if (error instanceof HttpException) {
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(error.getResponse()).toEqual('No users found');
      }
    }
  });

  it('should delete an user if it exists', async () => {
    jest
      .spyOn(prisma.user, 'findUnique')
      .mockResolvedValue(mockTestBoilerplateUserDto);
    jest
      .spyOn(prisma.user, 'delete')
      .mockResolvedValue(mockTestBoilerplateUserDto);
    const result = await service.deleteMethod(mockTestBoilerplateUserDto.user_id);
    expect(result).toBe(HttpStatus.NO_CONTENT);
  });

  it('should throw NOT_FOUND if user does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    await expect(
      service.deleteMethod(mockTestBoilerplateUserDto.user_id),
    ).rejects.toThrow('User does not exist');
  });
});
