import { Test, TestingModule } from '@nestjs/testing';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
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
    it('should create a module successfully', async () => {
      // Arrange
      mockModuleService.create.mockResolvedValue(mockModule);

      // Act
      const result = await controller.create(mockCreateModuleDto);

      // Assert
      expect(result).toEqual(mockModule);
      expect(mockModuleService.create).toHaveBeenCalledWith(
        mockCreateModuleDto,
      );
      expect(mockModuleService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if service create fails', async () => {
      // Arrange
      const error = new Error('Service error');
      mockModuleService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(mockCreateModuleDto)).rejects.toThrow(
        error,
      );
      expect(mockModuleService.create).toHaveBeenCalledWith(
        mockCreateModuleDto,
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

    it('should throw an error if service findAll fails', async () => {
      // Arrange
      const error = new Error('Service error');
      mockModuleService.findAll.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findAll()).rejects.toThrow(error);
      expect(mockModuleService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
