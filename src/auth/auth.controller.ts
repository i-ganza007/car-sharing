import { Controller,Post,UsePipes,Body, UseGuards, Res } from "@nestjs/common";
import {ValidationPipe} from "@nestjs/common"
import {SignUp,LogIn} from '../user/custom.dto' 
import { AuthService } from "./auth.service";
import { Response } from 'express';
import { AuthGuard } from "@nestjs/passport";
@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService) {}

    @Post('signup')
    @UsePipes(new ValidationPipe({transform:true}))
    signUp(@Body() signUpInputs:SignUp){
        return this.authService.register(signUpInputs)
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Body() loginCred:LogIn,@Res({passthrough:true}) res:Response){
        // User is already validated by LocalStrategy, no need to validate again
        let sec_key = await this.authService.login(loginCred) 
        res.cookie('user_cookie',sec_key.access_token)
        return { message: 'Success Login', access_token: sec_key.access_token }
    }


}