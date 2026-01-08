import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarDTO } from './carDTO/car.dto';

@Injectable()
export class CarService {
    constructor(private prismaService:PrismaService){}

    async getAllCars(){
        let results = await this.prismaService.car.findMany()
        return results
    }

    async createCar(body:CarDTO){
        try {
            let result = await this.prismaService.car.create({
                data:{
                    name:body.name,
                    fuelType:body.fuelType,
                    horsePower:body.horsePower,
                    licensePlate: body.licensePlate,
                    info:body.info,
                    ownerId:body.ownerId,
                    carType:body.carType
                }
            })
            return result
        } catch (error) {
            throw new HttpException({
                name:error.name,
                more:error.message
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async UniqueCar(id:number){

    }

    async deleteCar(id:number){

    }

    async updateCar(id:number){

    }
}
