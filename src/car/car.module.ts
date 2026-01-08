import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CarController],
  providers: [CarService],})
export class CarModule {}
