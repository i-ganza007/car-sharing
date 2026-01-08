import {Controller, Delete, Get, Param ,ParseIntPipe, UseGuards,Req} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Get("loggedIn")
    getLoggedInUser(@Req() req:Request){
        return this.userService.getLoggedInUser(req)
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

}
