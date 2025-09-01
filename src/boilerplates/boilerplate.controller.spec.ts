import { Test, TestingModule } from '@nestjs/testing';
import { BoilerplateController } from './boilerplate.controller';
import { BoilerplateService } from './boilerplate.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  mockTestBoilerplateUserDto,
  mockTestBoilerplateUsers,
} from './boilerplate-user.mock';

describe('BoilerplateController', () => {
  let boilerplateController: BoilerplateController;
  let boilerplateService: BoilerplateService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [BoilerplateController],
      providers: [BoilerplateService, PrismaService],
    }).compile();

    boilerplateController = testModule.get<BoilerplateController>(
      BoilerplateController,
    );
    boilerplateService = testModule.get<BoilerplateService>(BoilerplateService);
  });

  describe('getHello', () => {
    it('should say "Hello World!"', () => {
      jest
        .spyOn(boilerplateService, 'getHello')
        .mockReturnValue('Hello World!');

      expect(boilerplateController.getHello()).toMatch('Hello World!');
    });
  });

  describe('getMethod', () => {
    it('should return all users', async () => {
      jest
        .spyOn(boilerplateService, 'getMethod')
        .mockResolvedValue(mockTestBoilerplateUsers);

      const result = await boilerplateController.getMethod();
      expect(result).toEqual(mockTestBoilerplateUsers);
    });
  });

  describe('postMethod', () => {
    it("should return HttpStatus.CREATED if user doesn't exist", async () => {
      jest
        .spyOn(boilerplateService, 'postMethod')
        .mockResolvedValue(HttpStatus.CREATED);

      const validBoilerplateUserDto = {
        ...mockTestBoilerplateUserDto,
        name: mockTestBoilerplateUserDto.name ?? undefined,
      };
      const result = await boilerplateController.postMethod(
        validBoilerplateUserDto,
      );
      expect(result).toBe(HttpStatus.CREATED);
    });

    it('should return HttpStatus.CONFLICT if user already exists', async () => {
      jest
        .spyOn(boilerplateService, 'postMethod')
        .mockRejectedValue(
          new HttpException('User already exists', HttpStatus.CONFLICT),
        );

      try {
        const validBoilerplateUserDto = {
          ...mockTestBoilerplateUserDto,
          name: mockTestBoilerplateUserDto.name ?? undefined,
        };
        await boilerplateController.postMethod(validBoilerplateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        if (error instanceof HttpException) {
          expect(error.getStatus()).toBe(HttpStatus.CONFLICT);
          expect(error.getResponse()).toEqual('User already exists');
        }
      }
    });
  });

  describe('deleteMethod', () => {
    it('should return HttpStatus.NO_CONTENT if user was deleted', async () => {
      jest
        .spyOn(boilerplateService, 'deleteMethod')
        .mockResolvedValue(HttpStatus.NO_CONTENT);

      const result = await boilerplateController.deleteMethod(
        mockTestBoilerplateUserDto.id,
      );
      expect(result).toBe(HttpStatus.NO_CONTENT);
    });

    it('should return HttpStatus.NOT_FOUND if user does not exist', async () => {
      jest
        .spyOn(boilerplateService, 'deleteMethod')
        .mockRejectedValue(
          new HttpException('User does not exist', HttpStatus.NOT_FOUND),
        );

      try {
        await boilerplateController.deleteMethod(mockTestBoilerplateUserDto.id);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        if (error instanceof HttpException) {
          expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
          expect(error.getResponse()).toEqual('User does not exist');
        }
      }
    });
  });
});
