import { Module } from '@nestjs/common';
import { CarTypeController } from './car-type.controller';
import { CarTypeService } from './car-type.service';

@Module({
  controllers: [CarTypeController],
  providers: [CarTypeService]
})
export class CarTypeModule {}
