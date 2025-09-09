import { Test, TestingModule } from '@nestjs/testing';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { BadRequestException } from '@nestjs/common';
import {
  mockModuleResponseDto,
  mockRecentModulesCardResponseDto,
} from './module.mock';

describe('ModuleController', () => {
  let controller: ModuleController;

  const mockModuleService = {
    create: jest.fn(),
    findAll: jest.fn(),
    getModuleById: jest.fn(),
    getRecentModules: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleController],
      providers: [
        {
          provide: ModuleService,
          useValue: mockModuleService,
        },
      ],
    }).compile();

    controller = module.get<ModuleController>(ModuleController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getModuleById', () => {
    const returnModuleId = 'test-mock-response-id';

    it('should return a module if it exists', async () => {
      mockModuleService.getModuleById.mockResolvedValue(mockModuleResponseDto);

      const result = await controller.getModuleById(returnModuleId);

      expect(result).toEqual(mockModuleResponseDto);
    });

    it('should throw BadRequestException if no module is found', async () => {
      mockModuleService.getModuleById.mockRejectedValue(
        new BadRequestException('Module not found'),
      );

      await expect(controller.getModuleById(returnModuleId)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockModuleService.getModuleById).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentModules', () => {
    it('should return an array of recent modules', async () => {
      mockModuleService.getRecentModules.mockResolvedValue(
        mockRecentModulesCardResponseDto,
      );

  const result = await controller.getPopularModules();

      expect(result).toEqual(mockRecentModulesCardResponseDto);
      expect(mockModuleService.getRecentModules).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no recent modules are found', async () => {
      mockModuleService.getRecentModules.mockResolvedValue([]);

  const result = await controller.getPopularModules();

      expect(result).toEqual([]);
      expect(mockModuleService.getRecentModules).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if service throws', async () => {
      mockModuleService.getRecentModules.mockRejectedValue(
        new BadRequestException('No recent modules found'),
      );

  await expect(controller.getPopularModules()).rejects.toThrow(
        BadRequestException,
      );
      expect(mockModuleService.getRecentModules).toHaveBeenCalledTimes(1);
    });
  });
});
