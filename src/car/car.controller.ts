import { Controller,Get,Param,Delete, Patch ,Post, Body, ParseIntPipe} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDTO } from './carDTO/car.dto';

@Controller('cars')
export class CarController {
    constructor(private carService:CarService){}

    @Get()
    async getAllCars(){
        return await this.carService.getAllCars()
    }

    @Get(":id")
    async getUniqueCar(@Param("id",ParseIntPipe) id:number){
        return await this.carService.UniqueCar(id)
    }

    @Post()
    async createCar(@Body() body:CarDTO){
        return await this.carService.createCar(body)
    }

    @Delete(":id")
    async deleteCar(@Param("id",ParseIntPipe) id:number){
        return await this.carService.deleteCar(id)
    }

    @Patch(":id")
    async updateCar(@Param("id",ParseIntPipe) id:number){
        return await this.carService.updateCar(id)
    }

}
