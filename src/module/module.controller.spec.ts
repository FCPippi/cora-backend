import { Test, TestingModule } from '@nestjs/testing';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { UnauthorizedException, HttpException } from '@nestjs/common';
import { mockCreateModuleDto, mockModule, mockModules } from './module.mock';

describe('ModuleController', () => {
  let controller: ModuleController;

  const mockModuleService = {
    create: jest.fn(),
    findAll: jest.fn(),
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

  describe('create', () => {
    const userId = 'test-user-id';

    it('should create a module successfully', async () => {
      // Arrange
      mockModuleService.create.mockResolvedValue(mockModule);

      // Act
      const result = await controller.create(mockCreateModuleDto, userId);

      // Assert
      expect(result).toEqual(mockModule);
      expect(mockModuleService.create).toHaveBeenCalledWith(
        mockCreateModuleDto,
        userId,
      );
      expect(mockModuleService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException when userId is not provided', async () => {
      // Act & Assert
      await expect(
        controller.create(mockCreateModuleDto, undefined),
      ).rejects.toThrow(UnauthorizedException);
      await expect(
        controller.create(mockCreateModuleDto, undefined),
      ).rejects.toThrow('User ID is required in x-user-id header');
      expect(mockModuleService.create).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when userId is empty string', async () => {
      // Act & Assert
      await expect(controller.create(mockCreateModuleDto, '')).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(controller.create(mockCreateModuleDto, '')).rejects.toThrow(
        'User ID is required in x-user-id header',
      );
      expect(mockModuleService.create).not.toHaveBeenCalled();
    });

    it('should throw HttpException if service create fails', async () => {
      // Arrange
      const serviceError = new Error('Service error');
      mockModuleService.create.mockRejectedValue(serviceError);

      // Act & Assert
      await expect(
        controller.create(mockCreateModuleDto, userId),
      ).rejects.toThrow(HttpException);
      expect(mockModuleService.create).toHaveBeenCalledWith(
        mockCreateModuleDto,
        userId,
      );
      expect(mockModuleService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all modules', async () => {
      // Arrange
      mockModuleService.findAll.mockResolvedValue(mockModules);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockModules);
      expect(mockModuleService.findAll).toHaveBeenCalledWith();
      expect(mockModuleService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no modules exist', async () => {
      // Arrange
      mockModuleService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(mockModuleService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if service findAll fails', async () => {
      // Arrange
      const serviceError = new Error('Service error');
      mockModuleService.findAll.mockRejectedValue(serviceError);

      // Act & Assert
      await expect(controller.findAll()).rejects.toThrow(HttpException);
      expect(mockModuleService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
