import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient, USER_SERVICE_NAME, CreateUserRequest, ValidateUserRequest, Response, GetUserByIDReqest } from '../../proto/user.pb';
import { Observable, lastValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import * as i18next from 'i18next';

@Injectable()
export class UserService implements OnModuleInit {

  private userService: UserServiceClient;

  @Inject(USER_SERVICE_NAME) 
  private client: ClientGrpc 
  
  public onModuleInit(): void {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public async getUser(data: GetUserByIDReqest): Promise<any> {
    const userServiceResponse = await lastValueFrom(this.userService.getUserById(data, this.metadata()))
    return userServiceResponse;
  }

  public async login(data: ValidateUserRequest): Promise<any> {
    const userServiceResponse = await lastValueFrom(this.userService.validateUser(data, this.metadata()))
    
    return userServiceResponse;
  }

  public async register(data: CreateUserRequest): Promise<any> {

    const userServiceResponse = await lastValueFrom(this.userService.createUser(data, this.metadata()));
    
    return userServiceResponse;

  }

  public metadata(): Metadata {
    const metadata = new Metadata();
    const lang = (i18next as any).language;
    metadata.add('Language', lang);
    return metadata;
  }

}