import { Module } from '@nestjs/common';
import { BoilerplateController } from './boilerplate.controller';
import { BoilerplateService } from './boilerplate.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BoilerplateController],
  providers: [BoilerplateService, PrismaService],
})
export class BoilerplateModule {}
