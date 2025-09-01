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

  describe('deleteMethod', () => {
    it('should return HttpStatus.NO_CONTENT if user was deleted', async () => {
      jest
        .spyOn(boilerplateService, 'deleteMethod')
        .mockResolvedValue(HttpStatus.NO_CONTENT);

      const result = await boilerplateController.deleteMethod(
        mockTestBoilerplateUserDto.user_id,
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
        await boilerplateController.deleteMethod(mockTestBoilerplateUserDto.user_id);
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
