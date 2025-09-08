import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  mockModule,
  mockModuleResponseDto,
  mockModuleResponseNoContentsDto,
} from './module.mock';
import { mockContentResponseDto } from '../content/content.mock';

describe('ModuleService', () => {
  let service: ModuleService;

  const mockPrismaService = {
    module: {
      findUnique: jest.fn(),
    },
    content: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getModuleById', () => {
    it('should return a module with contents if it exists', async () => {
      const moduleId = 'test-module-id';

      mockPrismaService.module.findUnique.mockResolvedValue(mockModule);
      mockPrismaService.content.findMany.mockResolvedValue([
        mockContentResponseDto,
      ]);

      const result = await service.getModuleById(moduleId);

      expect(result).toEqual(mockModuleResponseDto);
      expect(mockPrismaService.module.findUnique).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
      expect(mockPrismaService.content.findMany).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
    });

    it('should return a module with empty contents array when no contents exist', async () => {
      const moduleId = 'test-module-id';

      mockPrismaService.module.findUnique.mockResolvedValue(mockModule);
      mockPrismaService.content.findMany.mockResolvedValue([]);

      const result = await service.getModuleById(moduleId);

      expect(result).toEqual(mockModuleResponseNoContentsDto);
      expect(mockPrismaService.module.findUnique).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
      expect(mockPrismaService.content.findMany).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
    });

    it('should return BadRequestException when module does not exist', async () => {
      const moduleId = 'non-existent-module-id';

      mockPrismaService.module.findUnique.mockResolvedValue(null);

      await expect(service.getModuleById(moduleId)).rejects.toThrow(
        'Module not found',
      );
      expect(mockPrismaService.module.findUnique).toHaveBeenCalledWith({
        where: { module_id: moduleId },
      });
      expect(mockPrismaService.content.findMany).not.toHaveBeenCalled();
    });
  });
});
