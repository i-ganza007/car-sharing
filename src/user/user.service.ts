import { BadRequestException, Injectable} from '@nestjs/common';
import {SignUp,LogIn} from './custom.dto' 
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import {customExtractor} from '../jwt/custom.extractor'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private config: ConfigService,private jwtSignService:JwtService){}

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

    async getLoggedInUser(req:Request){
        const token = customExtractor(req)
        const res =  this.jwtSignService.verify(token)
        console.log(res)
        return await this.prisma.user.findUnique({
            where:{
                email:res?.email
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