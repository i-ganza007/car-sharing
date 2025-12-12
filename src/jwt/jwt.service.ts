import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import {customExtractor} from './custom.extractor'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([customExtractor]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || configService.get<string>('JWT_SECRET') 
        });
    }

    async validate(payload: any) {
        console.log('JWT Strategy validate called!');
        console.log('Payload received:', payload);
        return payload;
    }
}