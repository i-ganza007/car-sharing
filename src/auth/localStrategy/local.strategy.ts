import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import {LogIn} from '../../user/custom.dto' 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
            usernameField:'email'
        })
    }

    async validate(data:LogIn) {
        const user = this.authService.validate(data)
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}