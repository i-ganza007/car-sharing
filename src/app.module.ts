import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { CarModule } from './car/car.module';
import { CarTypeModule } from './car-type/car-type.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule, 
    UserModule, 
    BookingModule, 
    CarModule, 
    CarTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
