import { Body, Controller, Delete, Get, Param ,ParseIntPipe,Post, UsePipes} from '@nestjs/common';

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

    // @Post('signup')
    // @UsePipes(new ValidationPipe({transform:true}))
    // signUp(@Body() signUpInputs:SignUp){
    //     return this.userService.signUp(signUpInputs)
    // }

}
