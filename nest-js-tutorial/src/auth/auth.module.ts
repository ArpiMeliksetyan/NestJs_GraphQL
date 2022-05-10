import {Module} from '@nestjs/common'
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PrismaModule} from "../prisma/prisma.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy";

@Module({
    // due to import auth have access to prisma
    imports: [PrismaModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule{}
