import { AuthService } from './auth.service';
import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, Response, RegisterRequest, LoginRequest, ValidateTokenRequest } from '../../proto/auth.pb';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { Metadata } from '@grpc/grpc-js';
import * as i18next from 'i18next';

@Controller()
export class AuthController {
    
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService ) {}

    @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
    async login(data: LoginDto): Promise<Response> { 

        const userLogin = await this.userService.login(data);

        if (userLogin.error)
            return userLogin

        const user = userLogin.data.user

        const jwt = await this.authService.createToken(user)

        return { 
            error: false, 
            message: i18next.t('callback.LOGIN_SUCCESS'), 
            status: 200, 
            data: { 
                token: jwt.accessToken, 
                username: user.username, 
                nickname: user.nickname, 
                userID: user.id, 
                email: user.email, 
                avatar: user.avatar 
            } 
        };
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
    async register(data: RegisterDto): Promise<Response> { 

        const userRegister = await this.userService.register(data);

        if (userRegister.error)
            return userRegister

        const user = userRegister.data.user

        const jwt = await this.authService.createToken(user)

        return { 
            error: false, 
            message: i18next.t('callback.REGISTER_SUCCESS'), 
            status: 200, 
            data: { 
                token: jwt.accessToken, 
                username: user.username, 
                nickname: user.nickname, 
                userID: user.id, 
                email: user.email 
            } 
        };
        
    }    
    
    @GrpcMethod(AUTH_SERVICE_NAME, 'ValidateToken')
    async validateToken(data: ValidateTokenRequest): Promise<Response> { 

        const payload = await this.authService.verifyToken(data.token)

        if (!payload)
            return { error: true, message: i18next.t('callback.TOKEN_NOT_VALID'), status: 400 };

        const getUser = await this.userService.getUser({id: payload.sub})

        if (!getUser)
            return { error: true, message: i18next.t('callback.TOKEN_NOT_VALID'), status: 400 };

        const user = getUser.data.user;

        return { 
            error: false, 
            message: i18next.t('callback.TOKEN_VALID'), 
            status: 200, 
            data: { 
                token: data.token, 
                username: user.username, 
                nickname: user.nickname, 
                userID: payload.sub, 
                email: user.email, 
                avatar: user.avatar 
            }  
        };
        
    }
    
    @GrpcMethod(AUTH_SERVICE_NAME, 'TokenRenew')
    async tokenRenew(data: ValidateTokenRequest): Promise<Response> { 

        const payload = await this.authService.verifyToken(data.token)

        if (!payload)
            return { error: true, message: i18next.t('callback.TOKEN_NOT_VALID'), status: 400 };

        const user = { userID: payload.sub, username: payload.username, email: payload.email }

        const jwt = await this.authService.createToken(user)

        return { 
            error: false, 
            message: i18next.t('callback.TOKEN_VALID'), 
            status: 200, 
            data: { 
                token: data.token, 
                username: payload.username, 
                nickname: payload.nickname, 
                userID: payload.sub, 
                email: payload.email, 
                avatar: payload.avatar 
            }  
        };
        
    }
} 