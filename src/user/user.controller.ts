import { Body, Controller, Delete, Get, Param ,ParseIntPipe,Post, UsePipes} from '@nestjs/common';
import {ValidationPipe} from "@nestjs/common"
import {SignUp,LogIn} from './custom.dto' 
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }
   
    // Transform to number
    @Get(":id")
    getUser(@Param('id',ParseIntPipe) id:string){
        return this.userService.getUser(id)
    }

    @Delete(":id")
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id)
    }

    @Post('signup')
    @UsePipes(new ValidationPipe({transform:true}))
    signUp(@Body() signUpInputs:SignUp){
        return this.userService.signUp(signUpInputs)
    }

    // @Post('signin')
    // @UsePipes(new ValidationPipe())
    // LogIn(@Body() logInputs:LogIn){
    //     return this.userService.LogIn(logInputs)
    // }
    

}
