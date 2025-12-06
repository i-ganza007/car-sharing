import {IsEmail, IsString, MinLength, IsOptional} from "class-validator"

export class SignUp{
    @IsEmail()
    @IsString()
    email:string

    @IsString()
    @MinLength(1)
    password:string

    @IsOptional()
    @IsString()
    first_name?:string
    
    @IsOptional()
    @IsString()
    last_name?:string
}

export class LogIn{
    @IsEmail()
    @IsString()
    email:string

    @IsString()
    @MinLength(1)
    password:string
}