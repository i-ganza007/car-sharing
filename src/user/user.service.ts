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
            const existing_user = await this.prisma.user.findUnique({
                where:{
                    email:signUp.email
                }
            })
            if(existing_user){
                throw new ForbiddenException({message:"User already exists"})
            }
            const hashingKey = this.config.get<string>('HASHING_KEY');
            const hashed_pass = await argon2.hash(signUp.password, {
                secret: hashingKey ? Buffer.from(hashingKey) : undefined
            });
            const user = await this.prisma.user.create({
                data:{
                    email:signUp.email,
                    password:hashed_pass,
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