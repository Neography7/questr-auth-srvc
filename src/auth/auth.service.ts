import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
      ) {}

    async createToken (user: any, remember: boolean = false) {

        const payload = { sub: user.id, username: user.username, email: user.email };
        const expiresIn = (remember ? '30d' : '3h');

        return {
            accessToken: await this.jwtService.signAsync(payload, { expiresIn }),
        };
    }

    async verifyToken (token: string): Promise<any> {

        try {

            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: process.env.JWT_SECRET }
            );

            return payload;

        } catch (error) {

            return false;

        }

    }

}
