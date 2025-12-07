import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "src/jwt/jwt.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./localStrategy/local.strategy";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule,
        ConfigModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule {}