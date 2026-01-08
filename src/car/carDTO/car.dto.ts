import {IsEmail, IsString, MinLength, IsOptional} from "class-validator"

enum FuelType {
  electric='electric',
  diesel='diesel',
  petrol='petrol'
}


export class CarDTO{
    @IsString()
    name:string

    @IsString()
    fuelType:FuelType
    
    @IsString()
    horsePower:string
    @IsString()
    licensePlate:string

    @IsString()
    info:string

    @IsString()
    ownerId:number

    @IsString()
    carType:number
}