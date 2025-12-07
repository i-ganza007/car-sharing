import { Module } from "@nestjs/common";
import { JwtStrategy } from "./jwt.service";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        NestJwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET || configService.get<string>('JWT_SECRET') || 'fallback-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy],
    exports: [NestJwtModule, JwtStrategy]
})
export class JwtModule {}