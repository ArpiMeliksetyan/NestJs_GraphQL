import {Controller, Get, Patch, Req, UseGuards} from '@nestjs/common';
import {User} from '@prisma/client';
import {JwtGuard} from "../auth/guard";
import {GetUser} from "../auth/decorator";
import {PrismaService} from "../prisma/prisma.service";


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private prisma: PrismaService) {

    }


    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string) {
        console.log(email);
        return user;
    }

    @Patch()
    editUser(){}
}
