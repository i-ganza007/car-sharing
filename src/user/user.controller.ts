import {Controller, Delete, Get, Param ,ParseIntPipe, UseGuards,Req} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("loggedIn")
    getLoggedInUser(@Req() req:Request){
        return this.userService.getLoggedInUser(req)
    }
   
    // Transform to number
    @UseGuards(AuthGuard('jwt'))
    @Get(":id")
    getUser(@Param('id',ParseIntPipe) id:string){
        return this.userService.getUser(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id)
    }

}
