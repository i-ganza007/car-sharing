import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import {SignUp,LogIn} from './custom.dto' 
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private config: ConfigService){}

    async signUp(signUp:SignUp){
        try {
            const user = await this.prisma.user.create({
                data:{
                    email:signUp.email,
                    password:signUp.password,
                    last_name:signUp.last_name,
                    first_name:signUp.first_name
                }
            });
            return user;    
        } catch (error) {
            throw new BadRequestException({error})
        }
    }

    async getAllUsers(){
        return await this.prisma.user.findMany()
    }

    async getUser(id){
        return await this.prisma.user.findUnique({
                where:{
                    id:id
                }
            })
    }

    async deleteUser(id){
        return await this.prisma.user.delete({
            where:{
                id:id
            }
        })
    }
}