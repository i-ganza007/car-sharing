import { Controller,Post,UsePipes,Body, UseGuards, Res } from "@nestjs/common";
import {ValidationPipe} from "@nestjs/common"
import {SignUp,LogIn} from '../user/custom.dto' 
import { AuthService } from "./auth.service";
import { Response } from 'express';
@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService) {}

    @Post('signup')
    @UsePipes(new ValidationPipe({transform:true}))
    signUp(@Body() signUpInputs:SignUp){
        return this.authService.register(signUpInputs)
    }

    @Post('login')
    async login(@Body() loginCred:LogIn,@Res({passthrough:true}) res:Response){
        console.log('1')
        let user = await this.authService.validate(loginCred)
        console.log('2')
        if(user){
            let sec_key = await this.authService.login(loginCred) 
            res.cookie('user_cookie',sec_key.access_token)
            return 'Success Login'
        }
        console.log('3')
    }


}