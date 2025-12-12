import { Controller,Get,Param,Delete, Patch ,Post, Body} from '@nestjs/common';

@Controller('cars')
export class CarController {
    constructor(){}

    @Get()
    async getAllCars(){

    }

    @Get(":id")
    async getUniqueCar(@Param("id") id:string){

    }

    @Post()
    async createCar(@Body() body){
        
    }

    @Delete(":id")
    async deleteCar(@Param("id") id:string){

    }

    @Patch(":id")
    async updateCar(@Param("id") id:string){

    }

}
