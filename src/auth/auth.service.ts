import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import {BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {SignUp,LogIn} from '../user/custom.dto' 
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
    constructor(private userService:UserService,private prismaService:PrismaService,private jwtService:JwtService,private configService:ConfigService){}

    async validate(cred:LogIn){
        console.log('a')
        console.log('Email received:', cred?.email)
        console.log('Password received:', cred?.password ? '***' : 'undefined')
        
        if (!cred?.email || !cred?.password) {
            throw new BadRequestException('Email and password are required')
        }
        
        try {
            const existing_user = await this.prismaService.user.findUnique({
                where:{
                    email: cred.email
                }
            })

            console.log('b')
            if(!existing_user){
                throw new BadRequestException('Email not matching')
            }
            console.log('c')
            const key = this.configService.get<string>('HASHING_KEY') 
            console.log('d')
            const matching:boolean = await argon2.verify(existing_user.password, cred.password, {
                secret: key ? Buffer.from(key) : undefined
            })
            console.log('e')
            if(!matching){
                throw new BadRequestException('Password not matching')
            }
            console.log('f')
            return existing_user

        } catch (error) {
            throw new HttpException(error?.message,HttpStatus.BAD_REQUEST)
        }
    }

    async register(cred:SignUp){
        const existing_user = await this.prismaService.user.findUnique({
            where:{
                email:cred.email
            }
        })
        if(existing_user){
            throw new ForbiddenException({message:"User already exists"})
        }
        const hashingKey = this.configService.get<string>('HASHING_KEY');
        const hashed_pass = await argon2.hash(cred.password, {
            secret: hashingKey ? Buffer.from(hashingKey) : undefined
        });
        return this.userService.signUp({...cred,password:hashed_pass})
    }

    async login(cred:LogIn){
        // Get user to include id in token
        const user = await this.prismaService.user.findUnique({
            where: { email: cred.email }
        });
        
        if (!user) {
            throw new BadRequestException('User not found');
        }
        
        // Sign token with user id and email, NOT password
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.sign(payload)
        };
    }
}