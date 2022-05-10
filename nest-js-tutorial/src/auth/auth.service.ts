import {ForbiddenException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import * as argon from 'argon2';
import {AuthDto} from "./dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()

export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        if (!user) {
            throw new ForbiddenException('Incorrect Credentials');
        }

        const pswMatches = await argon.verify(user.hash, dto.password);

        if (!pswMatches) {
            throw new ForbiddenException('Incorrect Credentials');
        }

        return this.signInToken(user.id, user.email);
    }

    async signup(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                //select what fields you want to send a user
                // select:{
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // }
            });

            return this.signInToken(user.id, user.email);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                //if prisma finds duplication in unique field
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

   async signInToken(userId: number, email: string): Promise<{ access_token: string }> {

        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        });

        return {
            access_token: token
        }
    }

}
